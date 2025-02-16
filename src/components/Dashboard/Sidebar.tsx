"use client"
import React from 'react';
import { useRouter } from 'next/navigation';

const SideBar = () => {
  const router = useRouter(); // Use useRouter instead of useNavigate

  return (
    <div className="w-64 h-full bg-gray-800 text-white">
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <ul className="space-y-4">
          <li>
            <button onClick={() => router.push('/overview')} className="hover:text-gray-300">
              Overview
            </button>
          </li>
          <li>
            <button onClick={() => router.push('/performance-metrics')} className="hover:text-gray-300">
              Performance Metrics
            </button>
          </li>
          <li>
            <button onClick={() => router.push('/recent-activity')} className="hover:text-gray-300">
              Recent Activity
            </button>
          </li>
          <li>
            <button onClick={() => router.push('/chatbot-management')} className="hover:text-gray-300">
              Chatbot Management
            </button>
          </li>
          <li>
            <button onClick={() => router.push('/help-support')} className="hover:text-gray-300">
              Help & Support
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;