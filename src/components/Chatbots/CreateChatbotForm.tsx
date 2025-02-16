import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import ChatbotPreview from '@/components/Chatbots/ChatbotPreview';

function CreateChatbotForm({ onCreate }) {
  const [step, setStep] = useState(1);
  const [mounted, setMounted] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState({
    // Company Information
    companyName: '',
    companyDescription: '',
    industry: '',
    location: '',
    operatingHours: '',
    contactInfo: {
      email: '',
      phone: '',
      address: ''
    },

    // Services
    services: [{
      name: '',
      description: ''
    }],
    pricing: '',
    serviceAreas: '',

    // Bot Settings
    botName: '',
    welcomeMessage: '',
    fallbackMessage: '',
    personality: 'professional',

    // Training Data
    faqs: [{
      question: '',
      answer: ''
    }],
    policies: {
      returns: '',
      privacy: '',
      terms: ''
    }
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleInputChange = (field, value, index?, subfield?) => {
    setFormData(prev => {
      const newData = { ...prev };
      
      if (index !== undefined && subfield) {
        // Handle array of objects (services, FAQs)
        newData[field][index][subfield] = value;
      } else if (field.includes('.')) {
        // Handle nested objects (contactInfo, policies)
        const [parent, child] = field.split('.');
        newData[parent] = { ...newData[parent], [child]: value };
      } else {
        // Handle top-level fields
        newData[field] = value;
      }
      
      return newData;
    });

    // Clear error when user types
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      const result = await response.json();
      if (response.ok) {
        setShowPreview(true);
        if (onCreate) onCreate(); // Call the onCreate callback from parent
      } else {
        alert('Error creating chatbot: ' + result.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert('Error creating chatbot: ' + (error as Error).message);
    }
  };

  const addArrayItem = (field: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], 
        field === 'services' ? { name: '', description: '' } :
        field === 'faqs' ? { question: '', answer: '' } : {}
      ]
    }));
  };

  const removeArrayItem = (field: string, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const validateStep = (currentStep: number) => {
    const newErrors = {};

    switch (currentStep) {
      case 1: // Company Info
        if (!formData.companyName) newErrors['companyName'] = 'Required';
        if (!formData.companyDescription) newErrors['companyDescription'] = 'Required';
        if (!formData.contactInfo.email) newErrors['contactInfo.email'] = 'Required';
        break;
      case 2: // Services
        if (!formData.services.length) newErrors['services'] = 'Add at least one service';
        break;
      case 3: // Bot Settings
        if (!formData.botName) newErrors['botName'] = 'Required';
        if (!formData.welcomeMessage) newErrors['welcomeMessage'] = 'Required';
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const renderCompanyInfoStep = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Company Name*</label>
        <Input
          value={formData.companyName}
          onChange={(e) => handleInputChange('companyName', e.target.value)}
          className={errors['companyName'] ? 'border-red-500' : ''}
          placeholder="Enter company name"
        />
        {errors['companyName'] && <p className="text-red-500 text-sm mt-1">{errors['companyName']}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Company Description*</label>
        <textarea
          value={formData.companyDescription}
          onChange={(e) => handleInputChange('companyDescription', e.target.value)}
          className={`w-full p-2 border rounded-md ${errors['companyDescription'] ? 'border-red-500' : ''}`}
          rows={4}
          placeholder="Describe your company, products, and services"
        />
        {errors['companyDescription'] && <p className="text-red-500 text-sm mt-1">{errors['companyDescription']}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Industry</label>
        <Input
          value={formData.industry}
          onChange={(e) => handleInputChange('industry', e.target.value)}
          placeholder="e.g., Technology, Healthcare, Retail"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Contact Information</label>
        <Input
          type="email"
          value={formData.contactInfo.email}
          onChange={(e) => handleInputChange('contactInfo.email', e.target.value)}
          className={`mb-2 ${errors['contactInfo.email'] ? 'border-red-500' : ''}`}
          placeholder="Email*"
        />
        {errors['contactInfo.email'] && <p className="text-red-500 text-sm mt-1">{errors['contactInfo.email']}</p>}
        <Input
          type="tel"
          value={formData.contactInfo.phone}
          onChange={(e) => handleInputChange('contactInfo.phone', e.target.value)}
          className="mb-2"
          placeholder="Phone number"
        />
        <textarea
          value={formData.contactInfo.address}
          onChange={(e) => handleInputChange('contactInfo.address', e.target.value)}
          className="w-full p-2 border rounded-md"
          placeholder="Business address"
        />
      </div>
    </div>
  );

  const renderServicesStep = () => (
    <div className="space-y-4">
      {formData.services.map((service, index) => (
        <div key={index} className="p-4 border rounded-md">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Service {index + 1}</h3>
            {index > 0 && (
              <button
                type="button"
                onClick={() => removeArrayItem('services', index)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            )}
          </div>
          <Input
            value={service.name}
            onChange={(e) => handleInputChange('services', e.target.value, index, 'name')}
            className="mb-2"
            placeholder="Service name"
          />
          <textarea
            value={service.description}
            onChange={(e) => handleInputChange('services', e.target.value, index, 'description')}
            className="w-full p-2 border rounded-md"
            placeholder="Service description"
          />
        </div>
      ))}
      <button
        type="button"
        onClick={() => addArrayItem('services')}
        className="text-blue-500 hover:text-blue-700"
      >
        + Add Another Service
      </button>
    </div>
  );

  const renderBotSettingsStep = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Bot Name*</label>
        <Input
          value={formData.botName}
          onChange={(e) => handleInputChange('botName', e.target.value)}
          className={errors['botName'] ? 'border-red-500' : ''}
          placeholder="Name your chatbot"
        />
        {errors['botName'] && <p className="text-red-500 text-sm mt-1">{errors['botName']}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Welcome Message*</label>
        <textarea
          value={formData.welcomeMessage}
          onChange={(e) => handleInputChange('welcomeMessage', e.target.value)}
          className={`w-full p-2 border rounded-md ${errors['welcomeMessage'] ? 'border-red-500' : ''}`}
          placeholder="Initial message shown to users"
        />
        {errors['welcomeMessage'] && <p className="text-red-500 text-sm mt-1">{errors['welcomeMessage']}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Personality</label>
        <select
          value={formData.personality}
          onChange={(e) => handleInputChange('personality', e.target.value)}
          className="w-full p-2 border rounded-md"
        >
          <option value="professional">Professional</option>
          <option value="friendly">Friendly</option>
          <option value="casual">Casual</option>
        </select>
      </div>
    </div>
  );

  const renderReviewStep = () => (
    <div className="space-y-4">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-medium mb-4">Review Information</h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-500">Company Details</h4>
            <p><strong>Name:</strong> {formData.companyName}</p>
            <p><strong>Industry:</strong> {formData.industry}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Services</h4>
            {formData.services.map((service, index) => (
              <div key={index}>
                <p><strong>{service.name}</strong></p>
                <p className="text-sm">{service.description}</p>
              </div>
            ))}
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Bot Settings</h4>
            <p><strong>Name:</strong> {formData.botName}</p>
            <p><strong>Personality:</strong> {formData.personality}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (step) {
      case 1:
        return renderCompanyInfoStep();
      case 2:
        return renderServicesStep();
      case 3:
        return renderBotSettingsStep();
      case 4:
        return renderReviewStep();
      default:
        return null;
    }
  };

  if (showPreview) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <Card>
          <CardHeader>
            <CardTitle>Test Your Chatbot: {formData.botName}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-gray-600">Your chatbot has been created successfully! You can test it below.</p>
            <ChatbotPreview />
          </CardContent>
          <CardFooter className="flex justify-between">
            <button
              type="button"
              onClick={() => setShowPreview(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-900"
            >
              Back to Editor
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              onClick={() => {
                // Navigate to dashboard or chatbots page
                if (onCreate) onCreate();
              }}
            >
              Go to Dashboard
            </button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Create AI Chatbot</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="mb-6">
            <div className="flex justify-between">
              {[1, 2, 3, 4].map((num) => (
                <div
                  key={num}
                  className={`flex items-center ${num < step ? 'text-blue-600' : num === step ? 'text-blue-600' : 'text-gray-400'}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                    num <= step ? 'border-blue-600 bg-blue-50' : 'border-gray-300'
                  }`}>
                    {num}
                  </div>
                  {num < 4 && <div className={`w-full h-1 mx-2 ${num < step ? 'bg-blue-600' : 'bg-gray-300'}`} />}
                </div>
              ))}
            </div>
          </div>

          {renderCurrentStep()}
        </CardContent>

        <CardFooter className="flex justify-between">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 text-gray-600 hover:text-gray-900"
            >
              Back
            </button>
          )}
          
          <button
            type="button"
            onClick={() => {
              if (validateStep(step)) {
                if (step < 4) {
                  setStep(step + 1);
                } else {
                  handleSubmit(); // Call the form submission function
                }
              }
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {step === 4 ? 'Create Chatbot' : 'Next'}
          </button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default CreateChatbotForm;