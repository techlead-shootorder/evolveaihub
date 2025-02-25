"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useParams } from 'next/navigation';

type Message = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

interface ChatContextType {
  messages: Message[];
  sendMessage: (message: string) => void;
  isLoading: boolean;
  botId: string | null;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const params = useParams();
  const botId = params?.botId as string || null;
  console.log("testing bot id", botId);
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch initial welcome message
  useEffect(() => {
    const fetchChatbotConfig = async () => {
    //   try {
    //     // Use the botId in the API request
    //     const response = await fetch(`/api/chatbot/config?botId=${botId}`);
        
    //     if (response.ok) {
    //       const config = await response.json();
          
    //       if (config.welcomeMessage) {
    //         setMessages([{ role: 'assistant', content: config.welcomeMessage }]);
    //       } else {
    //         setMessages([{ 
    //           role: 'system', 
    //           content: `
    //             <div class="welcome-message">
    //               <h1 class="text-purple-600 text-5xl font-semibold mb-4">Hello, there</h1>
    //               <p class="text-lg mb-10">You are in the good hands of science.</p>
    //               <div class="flex flex-wrap gap-3 justify-center">
    //                 <button class="bg-gray-800 hover:bg-gray-700 text-gray-300 py-2 px-4 rounded-full">IVF myths debunked</button>
    //                 <button class="bg-gray-800 hover:bg-gray-700 text-gray-300 py-2 px-4 rounded-full">AMH test results</button>
    //                 <button class="bg-gray-800 hover:bg-gray-700 text-gray-300 py-2 px-4 rounded-full">Low sperm count</button>
    //                 <button class="bg-gray-800 hover:bg-gray-700 text-gray-300 py-2 px-4 rounded-full">IVF success rates</button>
    //                 <button class="bg-gray-800 hover:bg-gray-700 text-gray-300 py-2 px-4 rounded-full">Medical tests before IVF</button>
    //               </div>
    //             </div>
    //           `
    //         }]);
    //       }
    //     } else {
    //       // Default welcome message if config fetch fails
    //       setMessages([{ 
    //         role: 'system', 
    //         content: `
    //           <div class="welcome-message">
    //             <h1 class="text-purple-600 text-5xl font-semibold mb-4">Hello, there</h1>
    //             <p class="text-lg mb-10">You are in the good hands of science.</p>
    //             <div class="flex flex-wrap gap-3 justify-center">
    //               <button class="bg-gray-800 hover:bg-gray-700 text-gray-300 py-2 px-4 rounded-full">IVF myths debunked</button>
    //               <button class="bg-gray-800 hover:bg-gray-700 text-gray-300 py-2 px-4 rounded-full">AMH test results</button>
    //               <button class="bg-gray-800 hover:bg-gray-700 text-gray-300 py-2 px-4 rounded-full">Low sperm count</button>
    //               <button class="bg-gray-800 hover:bg-gray-700 text-gray-300 py-2 px-4 rounded-full">IVF success rates</button>
    //               <button class="bg-gray-800 hover:bg-gray-700 text-gray-300 py-2 px-4 rounded-full">Medical tests before IVF</button>
    //             </div>
    //           </div>
    //         `
    //       }]);
    //     }
    //   } catch (error) {
    //     console.error('Error fetching chatbot config:', error);
    //     // Default welcome message if an error occurs
    //     setMessages([{ 
    //       role: 'system', 
    //       content: `
    //         <div class="welcome-message">
    //           <h1 class="text-purple-600 text-5xl font-semibold mb-4">Hello, there</h1>
    //           <p class="text-lg mb-10">You are in the good hands of science.</p>
    //           <div class="flex flex-wrap gap-3 justify-center">
    //             <button class="bg-gray-800 hover:bg-gray-700 text-gray-300 py-2 px-4 rounded-full">IVF myths debunked</button>
    //             <button class="bg-gray-800 hover:bg-gray-700 text-gray-300 py-2 px-4 rounded-full">AMH test results</button>
    //             <button class="bg-gray-800 hover:bg-gray-700 text-gray-300 py-2 px-4 rounded-full">Low sperm count</button>
    //             <button class="bg-gray-800 hover:bg-gray-700 text-gray-300 py-2 px-4 rounded-full">IVF success rates</button>
    //             <button class="bg-gray-800 hover:bg-gray-700 text-gray-300 py-2 px-4 rounded-full">Medical tests before IVF</button>
    //           </div>
    //         </div>
    //       `
    //     }]);
    //   }
    // };

    try {
        const response = await fetch(`/api/chatbot/config?botId=${botId}`);
        if (!response.ok) throw new Error('Failed to fetch chatbot config');
        const config = await response.json();
        setMessages([{ role: 'assistant', content: config.welcomeMessage || 'Hello! How can I assist you?' }]);
      } catch (error) {
        console.log("Error fetching config:", error);
        setMessages([{ role: 'assistant', content: 'Hello! How can I assist you?' }]);
      }
    }
    
    fetchChatbotConfig();
  }, [botId]); // Add botId as a dependency

  const sendMessage = async (message: string) => {
    if (!message.trim() || isLoading) {
      return;
    }
   
    const userMessage = { role: 'user', content: message };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    
    try {
      const allMessages = [...messages, userMessage];
      
      const response = await fetch('/api/chatbot/openai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: allMessages.map(msg => ({
            role: msg.role,
            content: msg.content
          })),
          id: botId // Include botId in the request body
        }),
      });
      
      if (!response.ok) {
        throw new Error('API response error: ' + response.statusText);
      }
      
      const data = await response.json();
      
      if (data.choices && data.choices[0] && data.choices[0].message) {
        const botResponse = data.choices[0].message.content;
        setMessages((prev) => [...prev, { role: 'assistant', content: botResponse }]);
      } else {
        throw new Error('Invalid response format from API');
      }
    } catch (error) {
      console.error('Error in chat flow:', error);
      setMessages((prev) => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error processing your request. Please try again later.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ChatContext.Provider value={{ messages, sendMessage, isLoading, botId }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}