// pages/admin/analytics/chatbots.tsx
import React from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ChatbotAnalyticsPage = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Chatbot Analytics</h1>
          <p className="text-gray-600">Chatbot performance metrics</p>
        </div>

        {/* Chatbot Analytics Content */}
      </div>
    </AdminLayout>
  );
};

export default ChatbotAnalyticsPage;