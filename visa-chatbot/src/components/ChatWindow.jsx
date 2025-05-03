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
    const [clearStatus, setClearStatus] = useState({ message: "", isError: false });
    const messagesEndRef = useRef(null);

    // Track which messages are new (not in original DB)
    const [newMessageIds, setNewMessageIds] = useState([]);

    // Fetch initial messages from database
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await fetch("/api/chat", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ message: "", pastChats: [] }),
                });
                const data = await res.json();
                if (data.pastChats) {
                    const formattedMessages = data.pastChats.flatMap(chat => [
                        { sender: "user", text: chat.message, id: chat._id, isStored: true },
                        { sender: "bot", text: chat.reply, id: chat._id, isStored: true }
                    ]);
                    setMessages(formattedMessages);
                }
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };
        fetchMessages();
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = async (customMessage) => {
        let msg;
    
            if (typeof customMessage === 'string') {
                msg = customMessage.trim();
            } else if (typeof input === 'string') {
                msg = input.trim();
            } else {
                console.error("Invalid message type");
                return;
            }

            if (!msg) return;
        const userMessage = { sender: "user", text: msg, isStored: false };
        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    message: msg, 
                    pastChats: messages.filter(m => m.isStored).map(m => ({ 
                        message: m.text,
                        _id: m.id 
                    }))
                }),
            });

            const data = await res.json();
            const botMessage = { 
                sender: "bot", 
                text: data.reply, 
                id: data.pastChats?.[data.pastChats.length - 1]?._id,
                isStored: false
            };
            setMessages(prev => [...prev, botMessage]);
            setNewMessageIds(prev => [...prev, botMessage.id]);
        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, { 
                sender: "bot", 
                text: "Sorry, something went wrong!",
                isStored: false
            }]);
        }

        setLoading(false);
    };

    const clearAllChats = async () => {
        if (window.confirm("Are you sure you want to clear ALL chats? This cannot be undone.")) {
            try {
                // Clear frontend first (for instant UI update)
                setMessages([]);
                setNewMessageIds([]);
    
                // Clear all chats from the database
                const res = await fetch("/api/clear", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ clearAll: true }), // Tell backend to clear everything
                });
    
                if (res.ok) {
                    setClearStatus({ 
                        message: "All chats cleared successfully", 
                        isError: false 
                    });
                } else {
                    const errorData = await res.json();
                    setClearStatus({ 
                        message: errorData.error || "Failed to clear chats from database", 
                        isError: true 
                    });
                }
            } catch (error) {
                setClearStatus({ 
                    message: "Network error while clearing chats", 
                    isError: true 
                });
            }
    
            setTimeout(() => setClearStatus({ message: "", isError: false }), 3000);
        }
    };
    const toggleChat = () => setIsOpen(!isOpen);
    const toggleSuggestions = () => setShowSuggestions(!showSuggestions);

    return (
        <>
            <button
                onClick={toggleChat}
                className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 animate-pulse"
            >
                {isOpen ? "✖" : "💬"}
            </button>

            {isOpen && (
                <div className="fixed bottom-24 right-6 w-96 max-h-2/3 bg-white bg-opacity-95 rounded-2xl shadow-xl overflow-hidden flex flex-col border border-gray-200">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-3 flex justify-between items-center">
                        <h2 className="text-lg font-semibold">Visa Chatbot</h2>
                        <div className="flex gap-2">
                            <button
                                onClick={clearAllChats}
                                className="text-sm bg-white text-blue-600 px-2 py-1 rounded-full hover:bg-gray-200 transition"
                            >
                                Clear New Chats
                            </button>
                        </div>
                    </div>

                    {clearStatus.message && (
                        <div className={`text-center text-sm py-1 ${
                            clearStatus.isError ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
                        }`}>
                            {clearStatus.message}
                        </div>
                    )}

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

                    {showSuggestions ? (
                        <SuggestedQuestions 
                            onSelect={handleSend} 
                            onToggle={toggleSuggestions}
                        />
                    ) : (
                        <button
                            onClick={toggleSuggestions}
                            className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-4 py-2 text-sm rounded-b-2xl hover:from-indigo-600 hover:to-blue-600 transition-all"
                        >
                            Show Suggestions
                        </button>
                    )}
                    
                    <InputBox 
                        input={input} 
                        setInput={setInput} 
                        handleSend={handleSend} 
                    />
                </div>
            )}
        </>
    );
};

export default ChatWindow;