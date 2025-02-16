import React from 'react';

const RecentActivity = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
      <p className="text-gray-600 mb-2">
        Stay updated with the latest activities and changes in your account.
      </p>
      <ul className="list-disc list-inside text-gray-600">
        <li>Logged in from a new device</li>
        <li>Updated profile information</li>
        <li>Completed a new transaction</li>
      </ul>
    </div>
  );
};

export default RecentActivity;
