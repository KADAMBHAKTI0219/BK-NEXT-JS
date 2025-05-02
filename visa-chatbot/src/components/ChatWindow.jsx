"use client"
import React, { useEffect, useRef, useState } from 'react';
import InputBox from './InputBox';
import MessageBubble from './MessageBubble';
import SuggestedQuestions from './SuggestedQuestions';

const ChatWindow = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(true);
    const [showSavedMessage, setShowSavedMessage] = useState(false);
    const messagesEndRef = useRef(null);

    // Load chat history from localStorage only on client side
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedMessages = localStorage.getItem('chatHistory');
            if (savedMessages) {
                setMessages(JSON.parse(savedMessages));
            }
        }
    }, []);

    // Save messages to localStorage whenever they change
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('chatHistory', JSON.stringify(messages));
        }
    }, [messages]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = async (customMessage) => {
        const msg = customMessage || input;
        if (!msg.trim()) return;

        const userMessage = { sender: "user", text: msg };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: msg, pastChats: messages }),
            });

            const data = await res.json();
            const botMessage = { sender: "bot", text: data.reply };
            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error(error);
            setMessages((prev) => [...prev, { sender: "bot", text: "Sorry, something went wrong!" }]);
        }

        setLoading(false);
    };

    const clearChat = () => {
        if (window.confirm("Are you sure you want to clear all chat history?")) {
            setMessages([]);
            if (typeof window !== 'undefined') {
                localStorage.removeItem('chatHistory');
            }
        }
    };

    const saveChat = () => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('chatHistory', JSON.stringify(messages));
            setShowSavedMessage(true);
            setTimeout(() => setShowSavedMessage(false), 2000); // Hide message after 2 seconds
        }
    };

    const toggleChat = () => setIsOpen(!isOpen);
    const toggleSuggestions = () => setShowSuggestions(!showSuggestions);

    return (
        <>
            {/* Floating Chat Bubble Button */}
            <button
                onClick={toggleChat}
                className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 animate-pulse"
            >
                {isOpen ? "✖" : "💬"}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-24 right-6 w-96 max-h-2/3 bg-white bg-opacity-95 rounded-2xl shadow-xl overflow-hidden flex flex-col border border-gray-200">
                    {/* Header with Gradient and Buttons */}
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-3 flex justify-between items-center">
                        <h2 className="text-lg font-semibold flex items-center gap-2">
                            Visa Chatbot
                        </h2>
                        <div className="flex gap-2">
                            <button
                                onClick={saveChat}
                                className="text-sm bg-white text-blue-600 px-2 py-1 rounded-full hover:bg-gray-200 transition"
                            >
                                Save Chat
                            </button>
                            <button
                                onClick={clearChat}
                                className="text-sm bg-white text-blue-600 px-2 py-1 rounded-full hover:bg-gray-200 transition"
                            >
                                Clear
                            </button>
                        </div>
                    </div>

                    {/* Saved Confirmation Message */}
                    {showSavedMessage && (
                        <div className="bg-green-100 text-green-800 text-center text-sm py-1">
                            Chat history saved!
                        </div>
                    )}

                    {/* Messages Area */}
                    <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                        {messages.length === 0 && (
                            <div className="text-center text-gray-500 mb-4">Ask me about visas!</div>
                        )}
                        {messages.map((msg, idx) => (
                            <MessageBubble key={idx} sender={msg.sender} text={msg.text} />
                        ))}
                        {loading && <MessageBubble sender="bot" text="Typing..." />}
                        <div ref={messagesEndRef} />
                    </div>

                    {showSuggestions && (
                        <SuggestedQuestions 
                            onSelect={(q) => handleSend(q)} 
                            onToggle={toggleSuggestions}
                        />
                    )}
                    {!showSuggestions && (
                        <button
                            onClick={toggleSuggestions}
                            className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-4 py-2 text-sm rounded-b-2xl hover:from-indigo-600 hover:to-blue-600 transition-all"
                        >
                            Show Suggestions
                        </button>
                    )}
                    <InputBox input={input} setInput={setInput} handleSend={() => handleSend()} />
                </div>
            )}

        </>
    );
};

export default ChatWindow;