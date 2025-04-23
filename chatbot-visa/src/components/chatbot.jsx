"use client";
import React, { useState, useEffect, useRef } from "react";
import { IoLogoWechat } from "react-icons/io5";
import { AiFillCloseCircle } from "react-icons/ai";

const Chatbot = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);

  // Define visa query keywords for buttons
  const visaQueries = [
    "Student visa",
    "Tourist visa",
    "Work visa",
    "USA visa",
    "How get visa",
    "Visa cost",
  ];

  // Load chats from localStorage
  useEffect(() => {
    if (isChatOpen) {
      const storedChats = JSON.parse(localStorage.getItem("visaChats") || "[]");
      setChats(storedChats);
    }
  }, [isChatOpen]);

  // Auto-scroll to latest message when chats or isLoading changes
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chats, isLoading]);

  // Save chats to localStorage
  useEffect(() => {
    if (chats.length > 0) {
      localStorage.setItem("visaChats", JSON.stringify(chats));
    }
  }, [chats]);

  // Handle sending a message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage = { message, reply: null, timestamp: new Date().toISOString() };
    const updatedChats = [...chats, userMessage];
    setChats(updatedChats);
    localStorage.setItem("visaChats", JSON.stringify(updatedChats));
    setMessage("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, pastChats: updatedChats }),
      });
      const data = await res.json();
      const newChats = [
        ...updatedChats,
        { message: null, reply: data.reply || "No response", timestamp: new Date().toISOString() },
      ];
      setChats(newChats);
      localStorage.setItem("visaChats", JSON.stringify(newChats));
    } catch (error) {
      console.error("Error:", error);
      const newChats = [
        ...updatedChats,
        { message: null, reply: "Error: Could not get a response", timestamp: new Date().toISOString() },
      ];
      setChats(newChats);
      localStorage.setItem("visaChats", JSON.stringify(newChats));
    } finally {
      setIsLoading(false);
    }
  };

  // Handle button clicks for predefined visa queries
  const handleKeywordClick = (keyword) => {
    setMessage(keyword);
  };

  return (
    <div>
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-8 right-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-full shadow-xl hover:scale-105 transition-transform"
      >
        {isChatOpen ? <AiFillCloseCircle size={32} /> : <IoLogoWechat size={32} />}
      </button>
      {isChatOpen && (
        <div className="fixed bottom-24 right-12 w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col max-h-96">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-bold p-4 text-center rounded-t-2xl">
            Visa Assistant
          </div>
          <div
            ref={chatContainerRef}
            className="flex-1 p-4 overflow-y-auto bg-gray-50 scroll-smooth"
            style={{ scrollBehavior: "smooth" }}
          >
            {chats.length === 0 ? (
              <p className="text-gray-500 text-center text-sm">
                Ask about visas! Try buttons below or type questions like "how get visa."
              </p>
            ) : (
              chats.map((chat, index) => (
                <div key={index} className="mb-3">
                  {chat.message && (
                    <div className="text-right">
                      <span className="inline-block bg-blue-100 text-blue-800 p-2 rounded-lg text-sm">
                        {chat.message}
                      </span>
                    </div>
                  )}
                  {chat.reply && (
                    <div className="text-left">
                      <span className="inline-block bg-gray-100 text-gray-800 p-2 rounded-lg text-sm whitespace-pre-line">
                        {chat.reply}
                      </span>
                    </div>
                  )}
                </div>
              ))
            )}
            {isLoading && <div className="text-center text-gray-500 text-sm">Typing...</div>}
          </div>
          <div className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
            <div className="flex flex-wrap gap-2 mb-3">
              {visaQueries.map((query, index) => (
                <button
                  key={index}
                  onClick={() => handleKeywordClick(query)}
                  className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-600"
                >
                  {query}
                </button>
              ))}
            </div>
            <form onSubmit={handleSendMessage}>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask about visas..."
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