import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface Chatbot {
  id: number;
  name: string;
  status: 'active' | 'inactive';
  interactions: number;
  responseRate: string;
  created: string;
}

const ChatbotManagement: React.FC = () => {
  const [selectedChatbot, setSelectedChatbot] = useState<Chatbot | null>(null);
  const [chatbots] = useState<Chatbot[]>([
    {
      id: 1,
      name: 'Customer Support',
      status: 'active',
      interactions: 1234,
      responseRate: '95%',
      created: '2024-03-15'
    },
    {
      id: 2,
      name: 'Sales Assistant',
      status: 'inactive',
      interactions: 856,
      responseRate: '92%',
      created: '2024-03-14'
    }
  ]);

  const renderChatbotDetails = () => {
    if (!selectedChatbot) return null;

    return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Chatbot Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Name</Label>
                <div className="font-medium">{selectedChatbot.name}</div>
              </div>
              <div>
                <Label>Status</Label>
                <div className="font-medium capitalize">{selectedChatbot.status}</div>
              </div>
              <div>
                <Label>Interactions</Label>
                <div className="font-medium">{selectedChatbot.interactions}</div>
              </div>
              <div>
                <Label>Response Rate</Label>
                <div className="font-medium">{selectedChatbot.responseRate}</div>
              </div>
              <div>
                <Label>Created On</Label>
                <div className="font-medium">{selectedChatbot.created}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Chatbot Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {chatbots.map(chatbot => (
              <div
                key={chatbot.id}
                onClick={() => setSelectedChatbot(chatbot)}
                className={`p-4 border rounded-md cursor-pointer ${selectedChatbot?.id === chatbot.id ? 'bg-blue-50 border-blue-300' : 'border-gray-300 hover:bg-gray-50'}`}
              >
                <div className="font-medium">{chatbot.name}</div>
                <div className="text-sm text-gray-500 capitalize">{chatbot.status}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      {renderChatbotDetails()}
    </div>
  );
};

export default ChatbotManagement;
