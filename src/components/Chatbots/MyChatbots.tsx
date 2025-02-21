import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

function MyChatbots({userDetails}) {
  const [selectedChatbot, setSelectedChatbot] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
   const [chatbotData, setChatBotData] = useState(null);

   useEffect(() => {
       const fetchChatbot = async () => {
         try {
           const res = await fetch(`/api/getChatbot?id=${userDetails.id}`);
           const data = await res.json();
           console.log("chatbot data", data)
           setChatBotData(data);
         } catch (error) {
           console.log("Error fetching chatbot:", error);
         }
       };
   
       fetchChatbot(); // Call the async function inside useEffect
     }, []);

  // Mock data - replace with API call
  const [chatbots] = useState([
    {
      id: 1,
      name: "Customer Support Bot",
      description: "24/7 customer service assistant",
      status: "active",
      lastActive: "2024-03-15",
      totalConversations: 1234,
      successRate: "92%",
      type: "Support",
      created: "2024-02-01"
    },
    {
      id: 2,
      name: "Sales Assistant",
      description: "Product recommendations and sales support",
      status: "inactive",
      lastActive: "2024-03-14",
      totalConversations: 856,
      successRate: "88%",
      type: "Sales",
      created: "2024-02-15"
    }
  ]);

  // Status badge component
  const StatusBadge = ({ status }) => (
    <span className={`
      px-2 py-1 rounded-full text-xs font-medium
      ${status === 'active' 
        ? 'bg-green-100 text-green-800' 
        : 'bg-gray-100 text-gray-800'}
    `}>
      {status}
    </span>
  );

  // Quick stats component
  const QuickStats = ({ icon, label, value }) => (
    <div className="flex items-center space-x-2">
      {icon}
      <div>
        <div className="text-sm text-gray-500">{label}</div>
        <div className="font-medium">{value}</div>
      </div>
    </div>
  );

  const handleDelete = (botId) => {
    if (window.confirm('Are you sure you want to delete this chatbot?')) {
      console.log('Deleting bot:', botId);
      // Add delete API call here
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">My Chatbots</h1>
        <a
          href="/dashboard/create"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Create New Chatbot
        </a>
      </div>

      {/* Quick Tips Alert */}
      <Alert className="bg-blue-50 border-blue-200">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          className="h-4 w-4 text-blue-600"
        >
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="16" x2="12" y2="12"/>
          <line x1="12" y1="8" x2="12" y2="8"/>
        </svg>
        <AlertDescription className="text-blue-800">
          Tip: Keep your chatbots active and regularly update their training data for better performance.
        </AlertDescription>
      </Alert>

      {/* Chatbots Grid */}
      <div className="grid gap-6">
        {chatbotData && chatbotData.length > 0 &&  chatbotData.map((bot) => (
          <Card 
            key={bot.id}
            className={`transition-shadow hover:shadow-md ${
              selectedChatbot?.id === bot.id ? 'ring-2 ring-blue-500' : ''
            }`}
          >
            <CardContent className="p-6">
              <div className="grid md:grid-cols-4 gap-6">
                {/* Bot Info */}
                <div className="md:col-span-2">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{bot.botName}</h3>
                      <p className="text-sm text-gray-500">{bot.companyDescription}</p>
                    </div>
                    <StatusBadge status={bot?.status ? bot?.status : 'null'} />
                  </div>
                  <div className="mt-4 text-sm text-gray-500">
                    Created on {new Date(bot.createdAt).toLocaleDateString()}
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="space-y-3">
                  <QuickStats
                    icon={
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-gray-400">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                      </svg>
                    }
                    label="Total Conversations"
                    // value={bot.totalConversations.toLocaleString()}
                    value={0}
                  />
                  <QuickStats
                    icon={
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-gray-400">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                        <polyline points="22 4 12 14.01 9 11.01"/>
                      </svg>
                    }
                    label="Success Rate"
                    value={bot?.successRate ? bot?.successRate : 'null'}
                  />
                  <QuickStats
                    icon={
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-gray-400">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                      </svg>
                    }
                    label="Last Active"
                    value={new Date(bot?.lastActive ? bot.lastActive : 'null').toLocaleDateString()}
                  />
                </div>

                {/* Actions */}
                <div className="flex md:flex-col justify-end space-y-2">
                  <button 
                    onClick={() => window.location.href = `/dashboard/edit/${bot.id}`}
                    className="w-full px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
                  >
                    Edit Chatbot
                  </button>
                  <button 
                    onClick={() => window.location.href = `/dashboard/analytics/${bot.id}`}
                    className="w-full px-3 py-2 text-sm bg-purple-50 text-purple-600 rounded-md hover:bg-purple-100 transition-colors"
                  >
                    View Analytics
                  </button>
                  <button 
                    onClick={() => setSelectedChatbot(bot)}
                    className="w-full px-3 py-2 text-sm bg-gray-50 text-gray-600 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    Integration
                  </button>
                  <button 
                    onClick={() => handleDelete(bot.id)}
                    className="w-full px-3 py-2 text-sm bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {/* Training Info */}
              {selectedChatbot?.id === bot.id && (
                <div className="mt-6 p-4 bg-gray-50 rounded-md">
                  <h4 className="font-medium mb-2">Integration Details</h4>
                  <div className="bg-gray-100 p-3 rounded text-sm font-mono">
                    {`<script src="https://evolveai.com/chatbot/${bot.id}"></script>`}
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Copy this code snippet and paste it into your website's HTML to integrate the chatbot.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {chatbots.length === 0 && (
        <div className="text-center py-12">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No chatbots yet</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating a new chatbot.</p>
          <div className="mt-6">
            <a
              href="/dashboard/create"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Create New Chatbot
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyChatbots;