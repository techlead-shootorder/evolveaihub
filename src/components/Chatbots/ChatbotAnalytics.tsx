import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function ChatbotAnalytics() {
  // Time range filter state
  const [timeRange, setTimeRange] = useState('7d');

  // Mock data
  const conversationData = [
    { date: '2024-03-01', conversations: 145, successRate: 88, avgResponseTime: 1.2 },
    { date: '2024-03-02', conversations: 132, successRate: 92, avgResponseTime: 1.1 },
    { date: '2024-03-03', conversations: 156, successRate: 85, avgResponseTime: 1.3 },
    { date: '2024-03-04', conversations: 178, successRate: 90, avgResponseTime: 1.0 },
    { date: '2024-03-05', conversations: 165, successRate: 87, avgResponseTime: 1.2 },
    { date: '2024-03-06', conversations: 189, successRate: 91, avgResponseTime: 1.1 },
    { date: '2024-03-07', conversations: 192, successRate: 89, avgResponseTime: 1.2 },
  ];

  const topQueries = [
    { query: "How do I reset my password?", count: 45 },
    { query: "What are your business hours?", count: 38 },
    { query: "How much does it cost?", count: 32 },
    { query: "Do you offer refunds?", count: 28 },
    { query: "Where are you located?", count: 25 },
  ];

  // Calculate summary metrics
  const totalConversations = conversationData.reduce((sum, day) => sum + day.conversations, 0);
  const avgSuccessRate = (conversationData.reduce((sum, day) => sum + day.successRate, 0) / conversationData.length).toFixed(1);
  const avgResponseTime = (conversationData.reduce((sum, day) => sum + day.avgResponseTime, 0) / conversationData.length).toFixed(2);

  // Simple Bar Chart Component
  const SimpleBarChart = ({ data, dataKey, height = 200, maxValue = null }) => {
    const values = data.map(item => item[dataKey]);
    const max = maxValue || Math.max(...values);
    const width = 100 / data.length;

    return (
      <svg width="100%" height={height} className="mt-4">
        {data.map((item, index) => {
          const barHeight = (item[dataKey] / max) * (height - 30);
          return (
            <g key={index} transform={`translate(${index * width}%, 0)`}>
              <rect
                x={`${width * 0.2}%`}
                y={height - barHeight}
                width={`${width * 0.6}%`}
                height={barHeight}
                fill="#3b82f6"
                className="hover:opacity-80"
              />
              <text
                x={`${width * 0.5}%`}
                y={height - 10}
                textAnchor="middle"
                className="text-xs"
              >
                {item.date.slice(-2)}
              </text>
            </g>
          );
        })}
      </svg>
    );
  };

  // Simple Line Chart Component
  const SimpleLineChart = ({ data, dataKey, height = 200, maxValue = null }) => {
    const values = data.map(item => item[dataKey]);
    const max = maxValue || Math.max(...values);
    const min = Math.min(...values);
    const range = max - min;
    
    const points = data.map((item, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = ((item[dataKey] - min) / range) * (height - 40);
      return `${x},${height - y - 20}`;
    }).join(' ');

    return (
      <svg width="100%" height={height} className="mt-4">
        <polyline
          points={points}
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2"
        />
        {data.map((item, index) => {
          const x = (index / (data.length - 1)) * 100;
          const y = ((item[dataKey] - min) / range) * (height - 40);
          return (
            <g key={index}>
              <circle
                cx={`${x}%`}
                cy={height - y - 20}
                r="3"
                fill="#3b82f6"
              />
              <text
                x={`${x}%`}
                y={height - 5}
                textAnchor="middle"
                className="text-xs"
              >
                {item.date.slice(-2)}
              </text>
            </g>
          );
        })}
      </svg>
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header with time range filter */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Chatbot Analytics</h1>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="p-2 border rounded-md bg-white"
        >
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
          <option value="90d">Last 90 Days</option>
        </select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Conversations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalConversations}</div>
            <p className="text-sm text-green-500">+12% from last period</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Success Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgSuccessRate}%</div>
            <p className="text-sm text-green-500">+2.3% from last period</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Avg. Response Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgResponseTime}s</div>
            <p className="text-sm text-green-500">-0.1s from last period</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Conversations Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <SimpleBarChart data={conversationData} dataKey="conversations" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Success Rate Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <SimpleLineChart data={conversationData} dataKey="successRate" maxValue={100} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Response Time Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <SimpleLineChart data={conversationData} dataKey="avgResponseTime" />
          </CardContent>
        </Card>

        {/* Top Queries */}
        <Card>
          <CardHeader>
            <CardTitle>Top User Queries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topQueries.map((query, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{query.query}</span>
                  <div className="flex items-center">
                    <span className="font-medium mr-2">{query.count}</span>
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{
                          width: `${(query.count / topQueries[0].count) * 100}%`
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Stats Table */}
      <Card>
        <CardHeader>
          <CardTitle>Conversation Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Conversations
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Success Rate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Avg. Response Time
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {conversationData.map((day, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {day.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {day.conversations}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {day.successRate}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {day.avgResponseTime}s
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ChatbotAnalytics;