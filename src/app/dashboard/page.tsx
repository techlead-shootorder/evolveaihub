"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


import DashboardContent from '@/components/Dashboard/DashboardContent';
import CreateChatbotForm from '@/components/Chatbots/CreateChatbotForm';
import ChatbotAnalytics from '@/components/Chatbots/ChatbotAnalytics';
import MyChatbots from '@/components/Chatbots/MyChatbots';
import IntegrationSettings from '@/components/Chatbots/IntegrationSettings';
import ProfileSettings from '@/components/Dashboard/ProfileSettings';
import SubscriptionManagement from '@/components/Dashboard/SubscriptionManagement';
import ChatbotPreview from '@/components/Chatbots/ChatbotPreview';
import { signOut } from "next-auth/react";

import { useSession } from "next-auth/react";

// SVG Icons Component
const Icons = {
  Dashboard: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect x="3" y="3" width="7" height="7"></rect>
      <rect x="14" y="3" width="7" height="7"></rect>
      <rect x="14" y="14" width="7" height="7"></rect>
      <rect x="3" y="14" width="7" height="7"></rect>
    </svg>
  ),
  Bot: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect x="3" y="11" width="18" height="10" rx="2"></rect>
      <circle cx="12" cy="5" r="2"></circle>
      <path d="M12 7v4"></path>
      <line x1="8" y1="16" x2="8" y2="16"></line>
      <line x1="16" y1="16" x2="16" y2="16"></line>
    </svg>
  ),
};

const Support = () => <div>Support Center</div>;

interface UserData {
  id?: string;
  email?: string;
  password?: string;
  createdAt?: string;
}

const DashboardLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activePage, setActivePage] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [chatbotCreated, setChatbotCreated] = useState(false);
  const router = useRouter();


  const { data: session, status } = useSession();


  //  window.location.reload();
  // Navigation Items - Move outside component or memoize if needed
  const mainNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Icons.Dashboard },
    { id: 'chatbots', label: 'My Chatbots', icon: Icons.Bot },
    { id: 'create', label: 'Create New Chatbot', icon: Icons.Bot },
    { id: 'analytics', label: 'Chatbot Analytics', icon: Icons.Dashboard },
    { id: 'integration', label: 'Integration Settings', icon: Icons.Dashboard },
  ];

  const bottomNavItems = [
    { id: 'profile', label: 'Profile Settings', icon: Icons.Dashboard },
    { id: 'subscription', label: 'Subscription', icon: Icons.Dashboard },
    { id: 'support', label: 'Support', icon: Icons.Dashboard },
    // { id: 'logout', label: 'Logout', icon: Icons.Dashboard },
  ];

  useEffect(() => {
    const checkAuth = async () => {
      // Wait until session is loaded
      if (status === "loading") return;

      // Get user data from localStorage (for manual login)
      const userData = JSON.parse(localStorage.getItem("userData") ?? "{}") as UserData;
        
      // If neither session nor userData exists, redirect to login
      if (!userData?.id && !session) {
        // console.log("Redirecting to login...");
        router.push("/login");
      } else {
        setIsAuthenticated(true);
      }
       
    }


    checkAuth();
  }, [session, status]);

  const handleLogout = () => {
    signOut();
    setIsAuthenticated(false);
    localStorage.removeItem("userData");
    router.push("/login");
  };

  const handleNavigation = (itemId: string) => {
    if (itemId === 'logout') {
      handleLogout();
      return;
    }
    setActivePage(itemId);
  };

  const NavItem = ({ item, isBottom = false }) => (
    <button
      onClick={() => handleNavigation(item.id)}
      className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${activePage === item.id
        ? 'bg-blue-100 text-blue-600'
        : 'text-gray-600 hover:bg-gray-100'
        } ${isBottom ? 'mt-1' : 'mb-1'}`}
    >
      <item.icon />
      {!isCollapsed && <span className={`ml-3 `}>{item.label}</span>}
    </button>
  );

  const renderComponent = () => {
    if (!isAuthenticated) return null;

    if (chatbotCreated) {
      return <ChatbotPreview />;
    }

    const components = {
      dashboard: <DashboardContent setActivePage={setActivePage} />,
      chatbots: <MyChatbots />,
      create: <CreateChatbotForm onCreate={() => setChatbotCreated(true)} />,
      analytics: <ChatbotAnalytics />,
      integration: <IntegrationSettings />,
      profile: <ProfileSettings />,
      subscription: <SubscriptionManagement />,
      support: <Support />,
    };

    return components[activePage] || <DashboardContent />;
  };

  if (!isAuthenticated) {
    return null;
  }


  return (
    <div className="min-h-screen bg-gray-50 flex">

      <aside
        className={`bg-white border-r border-gray-200 transition-all duration-300 flex flex-col ${isCollapsed ? 'w-16' : 'w-64'
          } fixed h-full`}
      >
        <div className="h-16 border-b flex items-center justify-between px-4">
          {!isCollapsed && <span className="text-xl font-bold">EvolveAI</span>}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isCollapsed ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            )}
          </button>
        </div>

        <div className="flex-1 flex flex-col justify-between p-4 overflow-y-auto">
          <div className="space-y-1">
            {mainNavItems.map((item) => (
              <NavItem key={item.id} item={item} />
            ))}
          </div>

          <div className="border-t pt-4">
            {bottomNavItems.map((item) => (
              <NavItem key={item.id} item={item} isBottom />
            ))}
          </div>
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
            Logout
          </button>
        </div>
      </aside>

      <div className={`flex-1 ${isCollapsed ? 'ml-16' : 'ml-64'} transition-all duration-300`}>
        <header className="h-16 bg-white border-b border-gray-200 fixed top-0 right-0 left-0 z-10 flex items-center justify-between px-6" style={{ marginLeft: isCollapsed ? '4rem' : '16rem' }}>
          <h1 className="text-xl font-semibold text-gray-800">
            {mainNavItems.concat(bottomNavItems).find(item => item.id === activePage)?.label || 'Dashboard'}
          </h1>
        </header>

        <main className="p-6 mt-16">
          {renderComponent()}

          {/* <button onClick={() => {
            setIsAuthenticated(false);
            signOut()
          }} className="bg-red-500 text-white px-4 py-2 rounded">
            Logout
          </button> */}
          <div>

          </div>
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;