import { useState, useEffect, useRef } from 'react';

const ChatbotPreview = () => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    const fetchChatbotConfig = async () => {
      console.log('[Chatbot] Fetching chatbot configuration...');
      try {
        const response = await fetch('/api/chatbot/config');
        console.log('[Chatbot] Config response status:', response.status);
        
        if (response.ok) {
          const config = await response.json();
          console.log('[Chatbot] Received config:', config);
          
          if (config.welcomeMessage) {
            console.log('[Chatbot] Setting welcome message:', config.welcomeMessage);
            setMessages([{ role: 'assistant', content: config.welcomeMessage }]);
          } else {
            console.log('[Chatbot] No welcome message in config, using default');
            setMessages([{ role: 'assistant', content: 'Hello! How can I help you today?' }]);
          }
        } else {
          console.warn('[Chatbot] Failed to fetch config, status:', response.status);
          setMessages([{ role: 'assistant', content: 'Hello! How can I help you today?' }]);
        }
      } catch (error) {
        console.error('[Chatbot] Error fetching chatbot config:', error);
        setMessages([{ role: 'assistant', content: 'Hello! How can I help you today?' }]);
      }
    };
    
    fetchChatbotConfig();
  }, []);
  
  useEffect(() => {
    console.log('[Chatbot] Messages updated, scrolling to bottom');
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const sendMessage = async () => {
    if (!input.trim() || isLoading) {
      console.log('[Chatbot] Send blocked - input empty or loading in progress');
      return;
    }
   
    const userMessage = { role: 'user', content: input };
    console.log('[Chatbot] Adding user message:', userMessage);
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      console.log('[Chatbot] Preparing request to OpenAI API');
      const allMessages = [...messages, userMessage];
      console.log('[Chatbot] Full message history being sent:', allMessages);
      
      console.log('[Chatbot] Sending request to /api/chatbot/openai');
      const response = await fetch('/api/chatbot/openai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: allMessages.map(msg => ({
            role: msg.role,
            content: msg.content
          }))
        }),
      });
      
      console.log('[Chatbot] Received response, status:', response.status);
      
      if (!response.ok) {
        console.error('[Chatbot] OpenAI API error response:', response.status, response.statusText);
        throw new Error('OpenAI API response error: ' + response.statusText);
      }
      
      const data = await response.json();
      console.log('[Chatbot] Parsed response data:', data);
      
      if (data.choices && data.choices[0] && data.choices[0].message) {
        const botResponse = data.choices[0].message.content;
        console.log('[Chatbot] Extracted bot response:', botResponse);
        setMessages((prev) => [...prev, { role: 'assistant', content: botResponse }]);
      } else {
        console.error('[Chatbot] Invalid response format:', data);
        throw new Error('Invalid response format from OpenAI API');
      }
    } catch (error) {
      console.error('[Chatbot] Error in OpenAI chat flow:', error);
      setMessages((prev) => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error processing your request. Please try again later.' 
      }]);
    } finally {
      console.log('[Chatbot] Request complete, resetting loading state');
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
              className={`p-3 rounded-lg max-w-xs ${
                msg.role === 'user' 
                  ? 'bg-blue-500 text-white ml-auto' 
                  : 'bg-gray-200 mr-auto'
              }`}
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
            className={`p-2 rounded-r-lg transition-colors ${
              isLoading || !input.trim() 
                ? 'bg-blue-300 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
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