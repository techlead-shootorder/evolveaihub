import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface MyChatbotsProps {
  userDetails: any;
  onPreview: (botId: string) => void; // Changed to string
}

function MyChatbots({ userDetails, onPreview }: MyChatbotsProps) {
  const [chatbotData, setChatbotData] = useState<any[]>([]);

  useEffect(() => {
    const fetchChatbot = async () => {
      try {
        const res = await fetch(`/api/getChatbot?id=${userDetails.id}`);
        const data = await res.json();
        setChatbotData(data);
      } catch (error) {
        console.log("Error fetching chatbot:", error);
      }
    };
    fetchChatbot();
  }, [userDetails.id]);

  const handleDelete = (botId: string) => {
    if (window.confirm('Are you sure you want to delete this chatbot?')) {
      console.log('Deleting bot:', botId);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">My Chatbots</h1>
        <a href="/dashboard/create" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Create New Chatbot
        </a>
      </div>
      <Alert><AlertDescription>Tip: Keep your chatbots active.</AlertDescription></Alert>
      <div className="grid gap-6">
        {chatbotData.length > 0 ? (
          chatbotData.map((bot) => (
            <Card key={bot.id}>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="md:col-span-2">
                    <h3 className="text-lg font-semibold">{bot.botName}</h3>
                    <p className="text-sm text-gray-500">{bot.companyDescription}</p>
                  </div>
                  <div className="flex md:flex-col justify-end space-y-2">
                    <button onClick={() => onPreview(bot.id)} className="w-full px-3 py-2 bg-green-50 text-green-600 rounded-md">
                      Preview
                    </button>
                    <button className="w-full px-3 py-2 bg-blue-50 text-blue-600 rounded-md">Edit</button>
                    <button onClick={() => handleDelete(bot.id)} className="w-full px-3 py-2 bg-red-50 text-red-600 rounded-md">
                      Delete
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div>No chatbots yet.</div>
        )}
      </div>
    </div>
  );
}

export default MyChatbots;