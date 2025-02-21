import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";

function ProfileSettings( {userDetails} ) {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    company: 'Acme Inc',
    phone: '+1 (555) 123-4567',
    timezone: 'UTC-5',
    notifications: {
      email: true,
      browser: true,
      updates: true,
      newsletter: false
    },
    twoFactorEnabled: false
  });

  const handleInputChange = (field, value) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationChange = (field) => {
    setProfile(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [field]: !prev.notifications[field]
      }
    }));
  };

  const TabButton = ({ id, label }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`px-4 py-2 font-medium rounded-md transition-colors ${
        activeTab === id
          ? 'bg-blue-100 text-blue-600'
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      {label}
    </button>
  );

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

  const renderProfileTab = () => (

    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <Input
                value={capitalizeFirstLetter(userDetails?.fullName)}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter your full name"
                disabled={!isEditing}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <Input
                type="email"
                value={userDetails.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter your email"
                disabled={!isEditing}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company
              </label>
              <Input
                value={userDetails.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                placeholder="Enter your company name"
                disabled={!isEditing}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <Input
                value={userDetails.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="Enter your phone number"
                disabled={!isEditing}
              />
            </div>

            <div className="pt-4 flex justify-end">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Edit Profile
                </button>
              ) : (
                <div className="space-x-4">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-900"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time Zone
              </label>
              <select
                value={profile.timezone}
                onChange={(e) => handleInputChange('timezone', e.target.value)}
                className="w-full p-2 border rounded-md"
                disabled={!isEditing}
              >
                <option value="UTC-8">Pacific Time (UTC-8)</option>
                <option value="UTC-5">Eastern Time (UTC-5)</option>
                <option value="UTC+0">UTC</option>
                <option value="UTC+1">Central European Time (UTC+1)</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderNotificationsTab = () => (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Email Notifications</h4>
              <p className="text-sm text-gray-500">Receive chatbot performance updates via email</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={profile.notifications.email}
                onChange={() => handleNotificationChange('email')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Browser Notifications</h4>
              <p className="text-sm text-gray-500">Get real-time alerts in your browser</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={profile.notifications.browser}
                onChange={() => handleNotificationChange('browser')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Product Updates</h4>
              <p className="text-sm text-gray-500">Stay informed about new features and improvements</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={profile.notifications.updates}
                onChange={() => handleNotificationChange('updates')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderSecurityTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Password
              </label>
              <Input
                type="password"
                placeholder="Enter your current password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <Input
                type="password"
                placeholder="Enter your new password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <Input
                type="password"
                placeholder="Confirm your new password"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Update Password
              </button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Two-Factor Authentication</h4>
                <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={profile.twoFactorEnabled}
                  onChange={() => handleInputChange('twoFactorEnabled', !profile.twoFactorEnabled)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {profile.twoFactorEnabled && (
              <Alert className="bg-blue-50 border-blue-200">
                <AlertDescription className="text-blue-800">
                  Two-factor authentication is enabled. Use an authenticator app to generate codes.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-red-600">Danger Zone</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              onClick={() => {
                if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                  console.log('Delete account');
                }
              }}
            >
              Delete Account
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Profile Settings</h1>
        <p className="text-gray-600">Manage your account settings and preferences</p>
      </div>

      <div className="mb-6 flex space-x-4 border-b">
        <TabButton id="profile" label="Profile" />
        <TabButton id="notifications" label="Notifications" />
        <TabButton id="security" label="Security" />
      </div>

      {activeTab === 'profile' && renderProfileTab()}
      {activeTab === 'notifications' && renderNotificationsTab()}
      {activeTab === 'security' && renderSecurityTab()}
    </div>
  );
}

export default ProfileSettings;