"use client";

import React, { useEffect, useRef } from 'react';
import { useChat } from '../context/ChatContext';

export default function ChatArea() {
    const { messages, isLoading } = useChat();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    console.log("messages", messages)

    const topics = [
        "IVF myths debunked",
        "AMH test results",
        // "Low sperm count",
        "IVF success rates",
        "Medical tests before IVF"
    ];

    return (
        <div className="flex-1 overflow-y-auto p-4">
            <div className="max-w-3xl mx-auto">
                {messages && messages.length > 1 ? messages.map((message, index) => (
                    index != 0 && <div
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
                )) : (
                <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
                    <h1 className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500">
                        Hello, there
                    </h1>
                    <p className="mt-3 text-lg text-gray-300">
                        You are in the good hands of science.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-4 justify-center">
                        {topics.map((topic, index) => (
                            <span
                                key={index}
                                className="px-4 py-2 bg-gray-800 text-gray-300 rounded-full text-sm cursor-pointer"
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