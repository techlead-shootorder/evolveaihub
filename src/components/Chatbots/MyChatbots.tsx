import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {useRouter} from 'next/navigation';

interface MyChatbotsProps {
  userDetails: any;
  onPreview: (botId: number) => void; // Add callback prop
  chatbotData: any;
  setActivePage: any;
}

function MyChatbots({ userDetails, onPreview, chatbotData, setActivePage }: MyChatbotsProps) {
   
  const router = useRouter();
   
  const handleDelete = (botId: number) => {
    if (window.confirm('Are you sure you want to delete this chatbot?')) {
      console.log('Deleting bot:', botId);
      // Add API call to delete chatbot
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">My Chatbots</h1>
        <a
          // href="/dashboard/create"
          onClick={()=>setActivePage("create")}
          className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Create New Bot
        </a>
      </div>

      <Alert className="bg-blue-50 border-blue-200">
        <AlertDescription className="text-blue-800">
          Tip: Keep your chatbots active and regularly update their training data for better performance.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6">
        {chatbotData && chatbotData.length > 0 ? (
          chatbotData.map((bot) => (
            <Card key={bot?.id} className="transition-shadow hover:shadow-md">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="md:col-span-2">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{bot.botName}</h3>
                        <p className="text-sm text-gray-500">{bot.companyDescription}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${bot.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {bot.status}
                      </span>
                    </div>
                    <div className="mt-4 text-sm text-gray-500">
                      Created on {new Date(bot.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="flex md:flex-col justify-end space-y-2">
                    <button
                      // onClick={() => onPreview(bot?.id)} // Use callback
                      onClick={()=>{
                        // router.push(`/chatlx/${bot?.id}`)
                        window.open(`/chatlx/${bot?.id}`, '_blank');
                      }}
                      className="w-full px-3 py-2 text-sm bg-green-50 text-green-600 rounded-md hover:bg-green-100 transition-colors"
                    >
                      Preview
                    </button>
                    <button
                      onClick={() => (window.location.href = `/dashboard/edit/${bot?.id}`)}
                      className="w-full px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
                    >
                      Edit Chatbot
                    </button>
                    <button
                      onClick={() => handleDelete(bot?.id)}
                      className="w-full px-3 py-2 text-sm bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-12">
            <h3 className="mt-2 text-sm font-medium text-gray-900">No chatbots yet</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating a new chatbot.</p>
            <div className="mt-6">
              <a
                // href="/dashboard/create"
                onClick={()=> setActivePage('create')}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Create New Chatbot
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyChatbots;