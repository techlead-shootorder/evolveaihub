// "use client";

// import React from 'react';
// import { useChat } from '../context/ChatContext';

// export default function ChatHeader() {
//   const { botId } = useChat();
  
//   return (
//     <div className="p-4 border-b border-gray-800">
//       <div className="max-w-3xl mx-auto flex items-center justify-between">
//         <h1 className="text-white text-lg font-medium">
//           {botId ? `Chatting with ${botId} Bot` : 'Oasis Assistant'}
//         </h1>
//         <div className="flex items-center space-x-1">
//           <div className="h-2 w-2 bg-green-500 rounded-full"></div>
//           <span className="text-green-500 text-sm">Online</span>
//         </div>
//       </div>
//     </div>
//   );
// }

import React from "react";
import { Sun } from "lucide-react";

const ChatHeader = () => {
  return (
    <div className="flex items-center justify-end bg-gray-900 p-4 border-b border-gray-800">
      {/* Theme Toggle Icon */}
      <button className="text-yellow-500 hover:text-yellow-400 p-2">
        <Sun size={20} />
      </button>

      {/* Divider */}
      <div className="w-px h-6 bg-gray-600 mx-4"></div>

      {/* Sign-in Button */}
      <button className="bg-red-400 text-white font-medium px-4 py-2 rounded-full hover:bg-red-500">
        Sign in
      </button>
    </div>
  );
};

export default ChatHeader;