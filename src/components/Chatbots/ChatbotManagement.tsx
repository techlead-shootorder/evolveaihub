import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Activity, Power, MessageCircle, Calendar } from 'lucide-react';

interface Chatbot {
  id: number;
  name: string;
  status: 'active' | 'inactive';
  interactions: number;
  responseRate: string;
  created: string;
  description?: string;
  lastActive?: string;
}

interface ChatbotCardProps {
  chatbot: Chatbot;
  isSelected: boolean;
  onClick: () => void;
}

const ChatbotCard: React.FC<ChatbotCardProps> = ({ chatbot, isSelected, onClick }) => {
  const getStatusColor = (status: string) => {
    return status === 'active' ? 'text-green-600 bg-green-50' : 'text-gray-600 bg-gray-50';
  };

  return (
    <div
      onClick={onClick}
      className={`p-4 border rounded-lg cursor-pointer transition-all ${
        isSelected ? 'bg-blue-50 border-blue-300 shadow-sm' : 'border-gray-200 hover:bg-gray-50'
      }`}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-lg">{chatbot.name}</h3>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${getStatusColor(chatbot.status)}`}>
            {chatbot.status}
          </span>
        </div>
        <div className="text-right text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <MessageCircle size={14} />
            {chatbot.interactions.toLocaleString()} interactions
          </div>
        </div>
      </div>
    </div>
  );
};

const ChatbotDetails: React.FC<{ chatbot: Chatbot }> = ({ chatbot }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>Chatbot Details</span>
          <span className={`px-2 py-1 text-sm rounded-full ${
            chatbot.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}>
            {chatbot.status}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label className="text-gray-500">Name</Label>
              <div className="font-medium text-lg">{chatbot.name}</div>
            </div>
            <div>
              <Label className="text-gray-500">Interactions</Label>
              <div className="font-medium flex items-center gap-2">
                <Activity size={16} className="text-blue-500" />
                {chatbot.interactions.toLocaleString()}
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <Label className="text-gray-500">Response Rate</Label>
              <div className="font-medium flex items-center gap-2">
                <Power size={16} className="text-green-500" />
                {chatbot.responseRate}
              </div>
            </div>
            <div>
              <Label className="text-gray-500">Created On</Label>
              <div className="font-medium flex items-center gap-2">
                <Calendar size={16} className="text-gray-500" />
                {formatDate(chatbot.created)}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ChatbotManagement: React.FC = () => {
  const [selectedChatbot, setSelectedChatbot] = useState<Chatbot | null>(null);
  const [chatbots] = useState<Chatbot[]>([
    {
      id: 1,
      name: 'Customer Support',
      status: 'active',
      interactions: 1234,
      responseRate: '95%',
      created: '2024-03-15',
      description: 'Main customer support chatbot',
      lastActive: '2024-03-22'
    },
    {
      id: 2,
      name: 'Sales Assistant',
      status: 'inactive',
      interactions: 856,
      responseRate: '92%',
      created: '2024-03-14',
      description: 'Sales and product inquiry chatbot',
      lastActive: '2024-03-21'
    }
  ]);

  const handleChatbotSelect = useCallback((chatbot: Chatbot) => {
    setSelectedChatbot(chatbot);
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Your Chatbots</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {chatbots.map(chatbot => (
              <ChatbotCard
                key={chatbot.id}
                chatbot={chatbot}
                isSelected={selectedChatbot?.id === chatbot.id}
                onClick={() => handleChatbotSelect(chatbot)}
              />
            ))}
          </div>
        </CardContent>
      </Card>
      
      {selectedChatbot && <ChatbotDetails chatbot={selectedChatbot} />}
    </div>
  );
};

export default ChatbotManagement;