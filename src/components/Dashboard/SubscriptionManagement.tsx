import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

function SubscriptionManagement() {
  const [showBillingForm, setShowBillingForm] = useState(false);
  const [activeTab, setActiveTab] = useState('plans');

  // Mock subscription data
  const [subscription] = useState({
    currentPlan: 'professional',
    status: 'active',
    billingCycle: 'monthly',
    nextBilling: '2024-04-15',
    usage: {
      chatbots: 8,
      interactions: 24521,
      storage: 5.2
    },
    paymentMethod: {
      type: 'card',
      last4: '4242',
      expiry: '12/24'
    }
  });

  // Subscription plans
  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: 29,
      features: [
        '3 Chatbots',
        '5,000 interactions/month',
        'Basic analytics',
        'Email support'
      ],
      limits: {
        chatbots: 3,
        interactions: 5000,
        storage: 1
      }
    },
    {
      id: 'professional',
      name: 'Professional',
      price: 99,
      features: [
        '10 Chatbots',
        '50,000 interactions/month',
        'Advanced analytics',
        'Priority support',
        'Custom branding'
      ],
      limits: {
        chatbots: 10,
        interactions: 50000,
        storage: 10
      }
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 299,
      features: [
        'Unlimited Chatbots',
        '500,000 interactions/month',
        'Custom analytics',
        '24/7 Support',
        'API Access',
        'Custom features'
      ],
      limits: {
        chatbots: Infinity,
        interactions: 500000,
        storage: 100
      }
    }
  ];

  // Mock billing history
  const billingHistory = [
    {
      id: 'inv-001',
      date: '2024-03-01',
      amount: 99,
      status: 'paid',
      description: 'Professional Plan - Monthly'
    },
    {
      id: 'inv-002',
      date: '2024-02-01',
      amount: 99,
      status: 'paid',
      description: 'Professional Plan - Monthly'
    }
  ];

  const UsageProgressBar = ({ current, limit, label }) => (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>{label}</span>
        <span>{current} / {limit === Infinity ? '∞' : limit}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all"
          style={{
            width: `${Math.min((current / limit) * 100, 100)}%`,
            backgroundColor: (current / limit) > 0.9 ? '#ef4444' : '#2563eb'
          }}
        />
      </div>
    </div>
  );

  const renderCurrentPlan = () => (
    <div className="space-y-6">
      {/* Current Plan Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold capitalize">{subscription.currentPlan} Plan</h3>
                <p className="text-gray-500">
                  {subscription.billingCycle === 'monthly' ? 'Monthly' : 'Annual'} billing
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                subscription.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {subscription.status}
              </span>
            </div>

            <div className="flex items-center text-sm text-gray-500">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4 mr-2">
                <path d="M21 10H3M5 6l4 4-4 4"/>
              </svg>
              Next billing date: {new Date(subscription.nextBilling).toLocaleDateString()}
            </div>

            <Alert className="bg-blue-50 border-blue-200">
              <AlertDescription className="text-blue-800">
                Your next bill will be ${plans.find(p => p.id === subscription.currentPlan)?.price} on {new Date(subscription.nextBilling).toLocaleDateString()}
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>

      {/* Usage Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <UsageProgressBar
            current={subscription.usage.chatbots}
            limit={plans.find(p => p.id === subscription.currentPlan)?.limits.chatbots}
            label="Chatbots"
          />
          <UsageProgressBar
            current={subscription.usage.interactions}
            limit={plans.find(p => p.id === subscription.currentPlan)?.limits.interactions}
            label="Monthly Interactions"
          />
          <UsageProgressBar
            current={subscription.usage.storage}
            limit={plans.find(p => p.id === subscription.currentPlan)?.limits.storage}
            label="Storage (GB)"
          />
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6 mr-2">
                <rect x="2" y="5" width="20" height="14" rx="2"/>
                <line x1="2" y1="10" x2="22" y2="10"/>
              </svg>
              <span>•••• {subscription.paymentMethod.last4}</span>
              <span className="ml-2 text-gray-500">Expires {subscription.paymentMethod.expiry}</span>
            </div>
            <button
              onClick={() => setShowBillingForm(true)}
              className="text-blue-600 hover:text-blue-700"
            >
              Update
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPlans = () => (
    <div className="grid md:grid-cols-3 gap-6">
      {plans.map((plan) => (
        <Card 
          key={plan.id}
          className={`${
            plan.id === subscription.currentPlan ? 'ring-2 ring-blue-500' : ''
          }`}
        >
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold">{plan.name}</h3>
              <div className="mt-2">
                <span className="text-3xl font-bold">${plan.price}</span>
                <span className="text-gray-500">/month</span>
              </div>
            </div>

            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button
              className={`w-full py-2 px-4 rounded-md ${
                plan.id === subscription.currentPlan
                  ? 'bg-gray-100 text-gray-600 cursor-default'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
              disabled={plan.id === subscription.currentPlan}
            >
              {plan.id === subscription.currentPlan ? 'Current Plan' : 'Upgrade'}
            </button>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderBillingHistory = () => (
    <Card>
      <CardHeader>
        <CardTitle>Billing History</CardTitle>
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
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {billingHistory.map((invoice) => (
                <tr key={invoice.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(invoice.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {invoice.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${invoice.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      invoice.status === 'paid'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                    <button className="text-blue-600 hover:text-blue-700">
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Subscription</h1>
        <p className="text-gray-600">Manage your subscription and billing preferences</p>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-6 flex space-x-4 border-b">
        {['plans', 'billing', 'usage'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium border-b-2 -mb-px capitalize ${
              activeTab === tab
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'plans' && renderPlans()}
        {activeTab === 'billing' && (
          <>
            {renderCurrentPlan()}
            {renderBillingHistory()}
          </>
        )}
        {activeTab === 'usage' && (
          <Card>
            <CardHeader>
              <CardTitle>Usage Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <UsageProgressBar
                current={subscription.usage.chatbots}
                limit={plans.find(p => p.id === subscription.currentPlan)?.limits.chatbots}
                label="Chatbots"
              />
              <UsageProgressBar
                current={subscription.usage.interactions}
                limit={plans.find(p => p.id === subscription.currentPlan)?.limits.interactions}
                label="Monthly Interactions"
              />
              <UsageProgressBar
                current={subscription.usage.storage}
                limit={plans.find(p => p.id === subscription.currentPlan)?.limits.storage}
                label="Storage (GB)"
              />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default SubscriptionManagement;