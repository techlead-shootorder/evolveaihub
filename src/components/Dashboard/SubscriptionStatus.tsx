import React from 'react';

const SubscriptionStatus = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Subscription Status</h2>
      <p className="text-gray-600 mb-2">
        Check your current subscription status and manage your plan.
      </p>
      <ul className="list-disc list-inside text-gray-600">
        <li>Current Plan: Premium</li>
        <li>Renewal Date: 2023-12-31</li>
        <li>Status: Active</li>
      </ul>
    </div>
  );
};

export default SubscriptionStatus;
