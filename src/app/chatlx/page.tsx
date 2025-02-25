import React from 'react';
import { ChatProvider } from './context/ChatContext';
import Sidebar from './components/SideBar';
import ChatArea from './components/ChatArea';
import MessageInput from './components/MessageInput';
import ChatHeader from './components/ChatHeader';

export default function ChatPage() {
  return (
    <ChatProvider>
      <div className="flex h-screen bg-gray-900 text-white">
        <Sidebar />
        <div className="flex flex-col flex-1 h-full">
          <ChatHeader/>
          <ChatArea />
          <MessageInput />
        </div>
      </div>
    </ChatProvider>
  );
}