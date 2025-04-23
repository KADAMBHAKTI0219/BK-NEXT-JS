"use client";
import React, { useState, useEffect } from "react";
import { IoLogoWechat } from "react-icons/io5";
import { AiFillCloseCircle } from "react-icons/ai";

const Chatbot = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load chats from localStorage
  useEffect(() => {
    if (isChatOpen) {
      const storedChats = JSON.parse(localStorage.getItem("ecommerceChats") || "[]");
      setChats(storedChats);
    }
  }, [isChatOpen]);

  // Handle sending a message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage = { message, reply: null, timestamp: new Date().toISOString() };
    const updatedChats = [...chats, userMessage];
    setChats(updatedChats);
    localStorage.setItem("ecommerceChats", JSON.stringify(updatedChats));
    setMessage("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, pastChats: updatedChats }),
      });
      const data = await res.json();
      const newChats = [...updatedChats, { message: null, reply: data.reply || "No response", timestamp: new Date().toISOString() }];
      setChats(newChats);
      localStorage.setItem("ecommerceChats", JSON.stringify(newChats));
    } catch (error) {
      console.error("Error:", error);
      const newChats = [...updatedChats, { message: null, reply: "Error: Could not get a response", timestamp: new Date().toISOString() }];
      setChats(newChats);
      localStorage.setItem("ecommerceChats", JSON.stringify(newChats));
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-full shadow-xl hover:scale-105 transition-transform"
      >
        {isChatOpen ? <AiFillCloseCircle size={32} /> : <IoLogoWechat size={32} />}
      </button>
      {isChatOpen && (
        <div className="fixed bottom-20 right-6 w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col max-h-96">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-bold p-4 text-center rounded-t-2xl">
            E-commerce Assistant
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            {chats.map((chat, index) => (
              <div key={index} className="mb-3">
                {chat.message && (
                  <div className="text-right">
                    <span className="inline-block bg-blue-100 text-blue-800 p-2 rounded-lg text-sm">
                      {chat.message} <br />
                    
                    </span>
                  </div>
                )}
                {chat.reply && (
                  <div className="text-left">
                    <span className="inline-block bg-gray-100 text-gray-800 p-2 rounded-lg text-sm whitespace-pre-line">
                      {chat.reply} <br />
                     
                    </span>
                  </div>
                )}
              </div>
            ))}
            {isLoading && <div className="text-center text-gray-500 text-sm">Loading...</div>}
          </div>
          <div className="p-4 border-t border-gray-200">
            <form onSubmit={handleSendMessage}>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask about products, orders, etc..."
                  className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-sm disabled:opacity-50"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;