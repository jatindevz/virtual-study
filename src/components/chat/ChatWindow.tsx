"use client";

import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import type { Socket } from "socket.io-client";
import type { ChatMessage } from "@/types/chat";

type SocketType = ReturnType<typeof io>;

export default function ChatWindow() {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [message, setMessage] = useState("");
    const socketRef = useRef<SocketType | null>(null);
    const [userId] = useState(() => Math.random().toString(36).slice(2, 10));
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        socketRef.current = io("http://localhost:3001");

        socketRef.current.on("message", (data: ChatMessage) => {
            setMessages(prev => [...prev, data]);
        });

        return () => {
            socketRef.current?.disconnect();
        };
    }, []);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = () => {
        if (message.trim() && socketRef.current) {
            const msg: ChatMessage = {
                type: "user",
                senderId: userId,
                content: message,
                timestamp: new Date().toISOString(),
            };

            socketRef.current.emit("message", msg);
            setMessages(prev => [...prev, msg]);
            setMessage("");
        }
    };

    const renderMessage = (msg: ChatMessage, idx: number) => {
        if (msg.type === "system") {
            return (
                <div
                    key={idx}
                    className="text-center text-sm text-gray-400 italic"
                >
                    {msg.content}
                </div>
            );
        }

        const isMe = msg.senderId === userId;

        return (
            <div
                key={idx}
                className={`flex ${isMe ? "justify-end" : "justify-start"} w-full`}
            >
                <div
                    className={`px-4 py-3 rounded-lg shadow-md max-w-[75%] ${isMe ? "bg-primary text-black" : "bg-gray-100 text-black"
                        }`}
                >
                    <p className="text-sm">{msg.content}</p>
                    <span className="text-xs text-gray-500 block mt-1">
                        {new Date(msg.timestamp).toLocaleTimeString()}
                    </span>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 to-blue-200">
            <div className="w-full max-w-xl bg-white rounded-lg shadow-lg border border-gray-300 flex flex-col">
                {/* Header */}
                <div className="px-6 py-4 flex items-center border-b border-gray-200">
                    <div className="flex items-center space-x-2">
                        <img src="/avatar1.png" alt="Avatar" className="w-8 h-8 rounded-full" />
                        <img src="/avatar2.png" alt="Avatar" className="w-8 h-8 rounded-full" />
                        <img src="/avatar3.png" alt="Avatar" className="w-8 h-8 rounded-full" />
                    </div>
                    <div className="ml-auto text-right">
                        <h2 className="text-lg font-bold">Team Unicorns</h2>
                        <p className="text-sm text-gray-500">Last seen 45 minutes ago</p>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                    {messages.map(renderMessage)}
                    <div ref={chatEndRef} />
                </div>

                {/* Input */}
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        sendMessage();
                    }}
                    className="flex items-center gap-2 px-6 py-4 border-t border-gray-200"
                >
                    <input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="flex-1 bg-gray-100 text-black px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Type your message..."
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-blue-600 transition"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
}
