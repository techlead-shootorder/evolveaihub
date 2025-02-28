"use client";

import React, { useEffect, useRef } from 'react';
import { useChat } from '../context/ChatContext';

export default function ChatArea() {
    const { messages, isLoading, integration, sendMessage, currentChatId } = useChat();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handlePills = (e) => {
        sendMessage(e.target.innerText);
    }

    // Show welcome screen if this is a new chat with only the welcome message
    const isNewChat = messages.length === 1 && messages[0].role === 'assistant';

    return (
        <div className="flex-1 overflow-y-auto p-4">
            <div className="max-w-3xl mx-auto">
                {!isNewChat ? (
                    // Regular chat view
                    messages.map((message, index) => (
                      index != 0 &&  <div
                            key={index}
                            className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}
                        >
                            {message.role === 'user' ? (
                                <div className="inline-block bg-purple-700 rounded-lg p-3 text-white max-w-md">
                                    {message.content}
                                </div>
                            ) : (
                                <div
                                    className="inline-block bg-gray-800 rounded-lg p-3 text-white max-w-md"
                                    dangerouslySetInnerHTML={{ __html: message.content }}
                                />
                            )}
                        </div>
                    ))
                ) : (
                    // Welcome screen for new chat
                    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-white p-6">
                        <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500 text-center">
                            {integration?.initialMessage || "Welcome to Shootorder Assistant"}
                        </h1>
                        <p className="mt-3 text-lg text-gray-300">
                            {integration?.subText || "Ask me anything about our services"}
                        </p>
                        {/* {messages[0] && (
                            <div className="mt-4 bg-gray-800 rounded-lg p-3 text-white">
                                {messages[0].content}
                            </div>
                        )} */}
                        <div className="mt-6 flex flex-wrap gap-4 justify-center">
                            {integration?.pills && Array.isArray(integration.pills) && integration.pills.length > 0 && 
                                integration.pills.map((topic, index) => (
                                <span
                                    key={index}
                                    className="px-4 py-2 bg-gray-800 text-gray-300 rounded-full text-sm cursor-pointer hover:bg-gray-700"
                                    onClick={handlePills}
                                >
                                    {topic}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {isLoading && (
                    <div className="mb-4 text-left">
                        <div className="inline-block bg-gray-800 rounded-lg p-3 text-white">
                            <div className="flex space-x-2">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>
        </div>
    );
}