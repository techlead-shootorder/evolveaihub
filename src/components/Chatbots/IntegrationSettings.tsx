import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import Image from 'next/image';

function IntegrationSettings({ userDetails, chatbotData }) {
  const [selectedBot, setSelectedBot] = useState(null);
  const [customization, setCustomization] = useState({
    id: '',
    logo: null,
    primaryColor: '',
    secondaryColor: '',
    poistion: '',
    botName: '',
    chatbotId: '',
    domain: '',
    pills: [], // Initialize as an array
    initialMessage: 'Hello! How can I help you today?',
    subText: '',
    phone: '',
  });
  const [integrationData, setIntegrationData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [logoToBeRemoved, setLogoToBeRemoved] = useState(false);

  // LocalStorage key for the logos array
  const STORAGE_KEY = 'chatbot_logos';

  // Helper functions for localStorage operations with array of objects
  const getLogosFromStorage = () => {
    try {
      const logosString = localStorage.getItem(STORAGE_KEY);
      return logosString ? JSON.parse(logosString) : [];
    } catch (error) {
      console.error('Error parsing logos from localStorage:', error);
      return [];
    }
  };

  const saveLogosToStorage = (logosArray) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(logosArray));
    } catch (error) {
      console.error('Error saving logos to localStorage:', error);
    }
  };

  // Update customization when a bot is selected
  useEffect(() => {
    if (selectedBot) {
      // Merge default customization with bot-specific settings if they exist
      setCustomization(prev => ({
        ...prev,
        primaryColor: selectedBot.primaryColor || prev.primaryColor,
        position: selectedBot.position || prev?.position,
        initialMessage: selectedBot.initialMessage || prev.initialMessage,
        botName: selectedBot.botName || prev.botName
      }));
    }
  }, [selectedBot]);

  const addPill = () => {
    setCustomization(prev => ({
      ...prev,
      pills: [...(prev.pills || []), ''] // Add a new empty pill
    }));
  };

  const updatePill = (index, value) => {
    setCustomization(prev => {
      const updatedPills = [...prev.pills];
      updatedPills[index] = value;
      return { ...prev, pills: updatedPills };
    });
  };

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
  };

  const handleBotSelect = (e) => {
    const selectedId = e.target.value;
    const selected = chatbotData?.find(bot => bot.id == selectedId);
    console.log("selected bot", selected);
    setSelectedBot(selected);
    setCustomization((prev) => {
      return {
        ...prev,
        chatbotId: selectedId
      }
    });
    
    // Reset logo removal flag when changing bots
    setLogoToBeRemoved(false);
  };

  // Get logo for a specific chatbot from localStorage array
  const getLogoByChatbotId = (chatbotId) => {
    if (!chatbotId) return null;
    
    const logos = getLogosFromStorage();
    const logoEntry = logos.find(item => item.chatbotId === chatbotId);
    return logoEntry ? logoEntry.imagePath : null;
  };

  // Save logo to localStorage array
  const saveLogoToLocalStorage = async () => {
    if (!logoFile || !selectedBot?.id) return null;
    
    return new Promise((resolve, reject) => {
      try {
        const reader = new FileReader();
        reader.onloadend = () => {
          const logoData = reader.result;
          
          // Get current logos array
          const logos = getLogosFromStorage();
          
          // Check if there's already a logo for this chatbot
          const existingIndex = logos.findIndex(item => item.chatbotId === selectedBot.id);
          
          if (existingIndex >= 0) {
            // Update existing entry
            logos[existingIndex].imagePath = logoData;
          } else {
            // Add new entry
            logos.push({
              chatbotId: selectedBot.id,
              imagePath: logoData
            });
          }
          
          // Save updated array back to localStorage
          saveLogosToStorage(logos);
          
          resolve(logoData);
        };
        reader.onerror = () => {
          reject(new Error('Failed to read file'));
        };
        reader.readAsDataURL(logoFile);
      } catch (error) {
        console.error('Error saving logo to localStorage:', error);
        reject(error);
      }
    });
  };

  // Remove logo from localStorage array
  const removeLogoFromLocalStorage = (chatbotId) => {
    if (!chatbotId) return;
    
    const logos = getLogosFromStorage();
    const updatedLogos = logos.filter(item => item.chatbotId !== chatbotId);
    
    saveLogosToStorage(updatedLogos);
  };

  // Handle file upload
  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        alert('Please upload a valid image file (JPEG, PNG, GIF, or WEBP)');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size exceeds 5MB limit');
        return;
      }

      setLogoFile(file);
      setLogoToBeRemoved(false);
      
      // Create a preview URL for the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    setCustomization(prev => ({
      ...prev,
      logo: null,
    }));
    setLogoFile(null);
    setLogoPreview(null);
    setLogoToBeRemoved(true);
  };

  useEffect(() => {
    // check if integration data exist
    const isIntegrationDataExist = async (chatbotId) => {
      try {
        const response = await fetch(`/api/customize/get?chatbotId=${chatbotId}`)
        const data = await response.json();
        console.log("integration data", data);
        if (data) {
          setCustomization((prev) => {
            return {
              ...prev,
              id: data.id,
              logo: data.logo,
              primaryColor: data.primaryColor,
              secondaryColor: data.secondaryColor,
              chatbotId: data.chatbotId,
              domain: data.domain,
              pills: data.pills,
              initialMessage: data.initialMessage,
              subText: data.subText,
              phone: data.phone
            }
          });
          
          // Check for logo in localStorage first
          const localLogo = getLogoByChatbotId(chatbotId);
          if (localLogo) {
            setLogoPreview(localLogo);
          } else if (data.logo) {
            // Fallback to any existing logo URL from the API
            setLogoPreview(data.logo);
          }
          
          setIntegrationData(data);
        }
        else {
          setIntegrationData(null);
          setCustomization((prev) => {
            return {
              ...prev,
              id: '',
              logo: null,
              primaryColor: '',
              secondaryColor: '',
              chatbotId: selectedBot.id,
              domain: '',
              pills: [], // Initialize as an array
              initialMessage: 'Hello! How can I help you today?',
              subText: '',
              phone: '',
            }
          });
          
          // Still check localStorage for a logo
          const localLogo = getLogoByChatbotId(chatbotId);
          if (localLogo) {
            setLogoPreview(localLogo);
          } else {
            setLogoPreview(null);
          }
          
          console.log("failed to fetch integration data", data);
        }
      }
      catch (error) {
        console.log("error getting integration", error);
      }
    }

    if (selectedBot) {
      isIntegrationDataExist(selectedBot?.id);
    }
  }, [selectedBot, setSelectedBot]);

  const handleAppearance = async () => {
    setLoading(true);

    try {
      let logoUrl = customization.logo;
      
      if (logoToBeRemoved && selectedBot?.id) {
        // Remove logo from localStorage if user clicked Remove
        removeLogoFromLocalStorage(selectedBot.id);
        logoUrl = null;
      } else if (logoFile && selectedBot?.id) {
        // Save to localStorage and get back the dataURL
        logoUrl = await saveLogoToLocalStorage();
      } else if (!logoFile && !logoToBeRemoved) {
        // Use existing logo from localStorage if available
        logoUrl = getLogoByChatbotId(selectedBot.id);
      }
     
      // Prepare data with possibly new logo URL or null if removed
      const dataToSubmit = {
        ...customization,
        logo: logoUrl // This will be a data URL or null
      };

      // if integration data exist update the data if not post the data
      const endpoint = integrationData 
        ? '/api/customize/update' 
        : '/api/customize/create';
      
      const method = integrationData ? 'PATCH' : 'POST';

      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSubmit)
      });

      const result = await response.json();
      
      if (response.ok) {
        setLoading(false);
        // Update the customization state with the saved logo URL
        setCustomization(prev => ({
          ...prev,
          logo: logoUrl
        }));
        
        // Reset the removal flag after successful save
        setLogoToBeRemoved(false);
        
        alert(integrationData ? 'Data Updated' : 'Data Created');
      } else {
        setLoading(false);
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
      alert('Error: ' + error.message);
    }
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
            onChange={handleBotSelect}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select a chatbot</option>
            {chatbotData?.map(bot => (
              <option key={bot.id} value={bot.id}>{bot.botName}</option>
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

              {/* Domain */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Domain
                </label>
                <Input
                  value={customization.domain}
                  onChange={(e) => setCustomization(prev => ({
                    ...prev,
                    domain: e.target.value
                  }))}
                  placeholder="example.com"
                />
              </div>

              {/* DNS Record */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  DNS Record
                </label>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-300 shadow-lg">
                    <thead>
                      <tr className="bg-gray-200 text-left">
                        <th className="px-4 py-2 border">Type</th>
                        <th className="px-4 py-2 border">Name</th>
                        <th className="px-4 py-2 border">TTL</th>
                        <th className="px-4 py-2 border">Current Value</th>
                        <th className="px-4 py-2 border">New Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border">
                        <td className="px-4 py-2 border">A</td>
                        <td className="px-4 py-2 border">@</td>
                        <td className="px-4 py-2 border">60 mins</td>
                        <td className="px-4 py-2 border">76.223.105.230</td>
                        <td className="px-4 py-2 border">23.227.38.65</td>
                      </tr>
                      <tr className="border">
                        <td className="px-4 py-2 border">CNAME</td>
                        <td className="px-4 py-2 border">
                          <input
                            type="text"
                            placeholder="Enter Name"
                            className="px-2 py-1 border rounded-md w-full"
                          />
                        </td>
                        <td className="px-4 py-2 border">60 mins</td>
                        <td className="px-4 py-2 border">chatlx.com</td>
                        <td className="px-4 py-2 border">shops.chatlx.com</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

              </div>

              {/* Upload Logo Section - Now using localStorage with array of objects */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Logo
                </label>
                {!logoPreview ? (
                  <div className="flex items-center space-x-2">
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/gif,image/webp"
                      onChange={handleUpload}
                      className="hidden"
                      id="logoUpload"
                    />
                    <label
                      htmlFor="logoUpload"
                      className="cursor-pointer p-2 bg-blue-500 text-white rounded-md"
                    >
                      Upload
                    </label>
                    <span className="text-sm text-gray-500">
                      JPEG, PNG, GIF, WEBP (max 5MB)
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-4">
                    <Image src={logoPreview} alt="Logo" width={64} height={64} className="w-16 h-16 object-cover rounded-md border" />
                    <button
                      onClick={handleRemove}
                      className="p-2 bg-red-500 text-white rounded-md"
                      disabled={loading}
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Primary Color */}
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

              {/* Secondary Color */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Secondary Color
                </label>
                <div className="flex items-center space-x-2">
                  <Input
                    type="color"
                    value={customization.secondaryColor}
                    onChange={(e) => setCustomization(prev => ({
                      ...prev,
                      secondaryColor: e.target.value
                    }))}
                    className="w-16 h-8"
                  />
                  <Input
                    type="text"
                    value={customization.secondaryColor}
                    onChange={(e) => setCustomization(prev => ({
                      ...prev,
                      secondaryColor: e.target.value
                    }))}
                    className="w-32"
                  />
                </div>
              </div>


              {/* Initial Message */}
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

              {/* SubText */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subtext
                </label>
                <Input
                  value={customization.subText}
                  onChange={(e) => setCustomization(prev => ({
                    ...prev,
                    subText: e.target.value
                  }))}
                  placeholder="Enter Subtext"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <Input
                  value={customization.phone}
                  onChange={(e) => setCustomization(prev => ({
                    ...prev,
                    phone: e.target.value
                  }))}
                  placeholder="Enter Phone"
                />
              </div>

              {/* Pills */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pills
                </label>
                {customization.pills.map((pill, index) => (
                  <Input
                    key={index}
                    value={pill}
                    onChange={(e) => updatePill(index, e.target.value)}
                    placeholder={`Pill ${index + 1}`}
                    className="w-full mb-2"
                  />
                ))}
                <button
                  type="button"
                  onClick={addPill}
                  className="mt-2 p-2 bg-blue-500 text-white rounded"
                  disabled={loading}
                >
                  Add Pill
                </button>
              </div>

              {/* Done Button */}
              <button
                className={`p-2 text-white rounded-md ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500'}`}
                onClick={handleAppearance}
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Save Settings'}
              </button>

            </CardContent>
          </Card>

          {/* Advanced Settings Alert */}
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