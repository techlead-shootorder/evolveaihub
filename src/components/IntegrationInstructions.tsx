// components/IntegrationInstructions.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface IntegrationInstructionsProps {
  chatbotId: string;
  domains: Domain[];
}

export const IntegrationInstructions: React.FC<IntegrationInstructionsProps> = ({
  chatbotId,
  domains
}) => {
  return (
    <div className="space-y-6">
      {/* Domain Verification */}
      <Card>
        <CardHeader>
          <CardTitle>Verify Your Domain</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <input
                type="text"
                placeholder="Enter your domain (e.g., example.com)"
                className="flex-1 mr-4 px-4 py-2 border rounded-md"
              />
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
                Add Domain
              </button>
            </div>

            {/* Domains List */}
            <div className="space-y-2">
              {domains.map((domain) => (
                <div
                  key={domain.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
                >
                  <div className="flex items-center">
                    <span className="text-gray-700">{domain.domain}</span>
                    {domain.isVerified ? (
                      <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        Verified
                      </span>
                    ) : (
                      <span className="ml-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                        Pending
                      </span>
                    )}
                  </div>
                  <button className="text-red-600 hover:text-red-700">
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Integration Code */}
      <Card>
        <CardHeader>
          <CardTitle>Add to Your Website</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className="mb-4 bg-blue-50 border-blue-200">
            <AlertDescription className="text-blue-800">
              Add this code to your website's HTML just before the closing &lt;/body&gt; tag
            </AlertDescription>
          </Alert>

          <div className="relative">
            <pre className="bg-gray-50 p-4 rounded-md overflow-x-auto">
              {generateChatbotScript(chatbotId, domains[0]?.domain || '')}
            </pre>
            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  generateChatbotScript(chatbotId, domains[0]?.domain || '')
                );
              }}
              className="absolute top-2 right-2 p-2 bg-white rounded-md border shadow-sm hover:bg-gray-50"
            >
              Copy
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-100 rounded-lg p-8 relative min-h-[400px]">
            {/* Add ChatbotPreview component here */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

