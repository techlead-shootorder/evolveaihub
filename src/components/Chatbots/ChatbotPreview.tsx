import { useState, useEffect, useRef } from 'react';

interface ChatbotPreviewProps {
  userDetails?: any;
  botId?: string;
  onPreview?: (botId: string) => void;
}

const ChatbotPreview: React.FC<ChatbotPreviewProps> = ({userDetails, botId }) => {
  // console.log("testing botid", botId)
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [leadId, setLeadId] = useState<string | null>(null); // String for UUID
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchChatbotConfig = async () => {
      try {
        const response = await fetch(`/api/chatbot/config?botId=${botId}`);
        if (!response.ok) throw new Error('Failed to fetch chatbot config');
        const config = await response.json();
        setMessages([{ role: 'assistant', content: config.welcomeMessage || 'Hello! How can I assist you?' }]);
      } catch (error) {
        console.error("Error fetching config:", error);
        setMessages([{ role: 'assistant', content: 'Hello! How can I assist you?' }]);
      }
    };
    fetchChatbotConfig();
  }, [botId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chatbot/openai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage], id: botId, leadId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `API error: ${response.status}`);
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.choices[0].message.content }]);
      setLeadId(data.leadId);
    } catch (error) {
      console.error("Error in sendMessage:", error);
      setMessages((prev) => [...prev, { role: 'assistant', content: `Error: ${error.message}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="h-64 overflow-y-auto p-4">
        <div className="space-y-3">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg max-w-xs ${msg.role === 'user' ? 'bg-blue-500 text-white ml-auto' : 'bg-gray-200 mr-auto'}`}
            >
              {msg.content}
            </div>
          ))}
          {isLoading && (
            <div className="bg-gray-200 p-3 rounded-lg max-w-xs mr-auto">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="border-t p-3">
        <div className="flex">
          <input
            type="text"
            className="flex-1 border rounded-l-lg p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            disabled={isLoading}
          />
          <button
            className={`p-2 rounded-r-lg ${isLoading || !input.trim() ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPreview;