import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";

function IntegrationSettings() {
  const [selectedBot, setSelectedBot] = useState(null);
  const [customization, setCustomization] = useState({
    primaryColor: '#3b82f6',
    position: 'right',
    initialMessage: 'Hello! How can I help you today?',
    botName: 'AI Assistant'
  });
  
  // Mock chatbot data
  const chatbots = [
    { id: 1, name: "Customer Support Bot" },
    { id: 2, name: "Sales Assistant" }
  ];

  // Generate code snippets based on customization
  const generateHTMLSnippet = () => {
    return `<script
  src="https://evolveai.com/chatbot/${selectedBot?.id}"
  data-position="${customization.position}"
  data-color="${customization.primaryColor}"
  data-name="${customization.botName}"
  data-message="${customization.initialMessage}"
></script>`;
  };

  const generateReactSnippet = () => {
    return `import { EvolveAIChat } from '@evolveai/react';

function App() {
  return (
    <EvolveAIChat
      botId="${selectedBot?.id}"
      position="${customization.position}"
      primaryColor="${customization.primaryColor}"
      botName="${customization.botName}"
      initialMessage="${customization.initialMessage}"
    />
  );
}`;
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Integration Settings</h1>
        <p className="text-gray-600">Configure and integrate your chatbots across different platforms</p>
      </div>

      {/* Select Chatbot */}
      <Card>
        <CardHeader>
          <CardTitle>Select Chatbot</CardTitle>
        </CardHeader>
        <CardContent>
          <select
            value={selectedBot?.id || ''}
            onChange={(e) => setSelectedBot(chatbots.find(bot => bot.id === Number(e.target.value)))}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select a chatbot</option>
            {chatbots.map(bot => (
              <option key={bot.id} value={bot.id}>{bot.name}</option>
            ))}
          </select>
        </CardContent>
      </Card>

      {selectedBot && (
        <>
          {/* Customization Options */}
          <Card>
            <CardHeader>
              <CardTitle>Customize Appearance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Primary Color
                </label>
                <div className="flex items-center space-x-2">
                  <Input
                    type="color"
                    value={customization.primaryColor}
                    onChange={(e) => setCustomization(prev => ({
                      ...prev,
                      primaryColor: e.target.value
                    }))}
                    className="w-16 h-8"
                  />
                  <Input
                    type="text"
                    value={customization.primaryColor}
                    onChange={(e) => setCustomization(prev => ({
                      ...prev,
                      primaryColor: e.target.value
                    }))}
                    className="w-32"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Widget Position
                </label>
                <select
                  value={customization.position}
                  onChange={(e) => setCustomization(prev => ({
                    ...prev,
                    position: e.target.value
                  }))}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="right">Bottom Right</option>
                  <option value="left">Bottom Left</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bot Name
                </label>
                <Input
                  value={customization.botName}
                  onChange={(e) => setCustomization(prev => ({
                    ...prev,
                    botName: e.target.value
                  }))}
                  placeholder="Enter bot name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Initial Message
                </label>
                <Input
                  value={customization.initialMessage}
                  onChange={(e) => setCustomization(prev => ({
                    ...prev,
                    initialMessage: e.target.value
                  }))}
                  placeholder="Enter initial message"
                />
              </div>
            </CardContent>
          </Card>

          {/* Integration Code */}
          <Card>
            <CardHeader>
              <CardTitle>Integration Code</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* HTML Integration */}
              <div>
                <h3 className="text-lg font-medium mb-2">HTML Script Tag</h3>
                <div className="relative">
                  <pre className="bg-gray-50 p-4 rounded-md text-sm overflow-x-auto">
                    {generateHTMLSnippet()}
                  </pre>
                  <button
                    onClick={() => copyToClipboard(generateHTMLSnippet())}
                    className="absolute top-2 right-2 p-2 bg-white rounded-md border shadow-sm hover:bg-gray-50"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
                      <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
                    </svg>
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Add this script tag to your HTML page just before the closing &lt;/body&gt; tag.
                </p>
              </div>

              {/* React Integration */}
              <div>
                <h3 className="text-lg font-medium mb-2">React Component</h3>
                <div className="relative">
                  <pre className="bg-gray-50 p-4 rounded-md text-sm overflow-x-auto">
                    {generateReactSnippet()}
                  </pre>
                  <button
                    onClick={() => copyToClipboard(generateReactSnippet())}
                    className="absolute top-2 right-2 p-2 bg-white rounded-md border shadow-sm hover:bg-gray-50"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
                      <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
                    </svg>
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Install our React package: <code className="bg-gray-100 px-2 py-1 rounded">npm install @evolveai/react</code>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Integration Guide */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Start Guide</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    1
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium">Choose Integration Method</h4>
                    <p className="text-gray-600">Select between HTML script tag or React component based on your tech stack.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    2
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium">Customize Appearance</h4>
                    <p className="text-gray-600">Adjust the color, position, and messaging to match your brand.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    3
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium">Test Integration</h4>
                    <p className="text-gray-600">Test the chatbot in a development environment before going live.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Advanced Settings */}
          <Alert className="bg-yellow-50 border-yellow-200">
            <AlertDescription className="text-yellow-800">
              Need more customization options? Check out our <a href="/docs" className="underline">advanced integration guide</a> for custom styling, events, and callbacks.
            </AlertDescription>
          </Alert>
        </>
      )}
    </div>
  );
}

export default IntegrationSettings;