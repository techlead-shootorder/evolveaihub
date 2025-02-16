import React from 'react';

const UserProfile = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">User Profile</h2>
      <p className="text-gray-600 mb-2">
        View and update your personal information and account settings.
      </p>
      <ul className="list-disc list-inside text-gray-600">
        <li>Name: John Doe</li>
        <li>Email: johndoe@example.com</li>
        <li>Member since: January 2021</li>
      </ul>
    </div>
  );
};

export default UserProfile;
// Start Generation Here
