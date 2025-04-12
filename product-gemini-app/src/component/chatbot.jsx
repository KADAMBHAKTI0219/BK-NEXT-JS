"use client";

import React, { useEffect, useState } from "react";
import { IoLogoWechat } from "react-icons/io5";
import { AiFillCloseCircle } from "react-icons/ai";
import { FaHistory, FaTrash } from "react-icons/fa";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

const ChatBot = () => {
  const { data: session } = useSession();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [sessionMemory, setSessionMemory] = useState([]);

  useEffect(() => {
    setIsClient(true);
    console.log("Session in ChatBot:", session);
  }, [session]);

  const fetchChatHistory = async () => {
    if (!session) {
      setChatHistory([{ role: "assistant", content: "Please log in to view history" }]);
      return;
    }

    try {
      const res = await fetch("/api/chats", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        const validData = data.map((msg) => ({
          ...msg,
          timestamp: msg.timestamp ? new Date(msg.timestamp).toISOString() : new Date().toISOString(),
        }));
        setChatHistory(validData);
      } else {
        setChatHistory([{ role: "assistant", content: `Error: ${data.error || `HTTP ${res.status}`}` }]);
      }
    } catch (error) {
      console.error("Fetch error in fetchChatHistory:", error);
      setChatHistory([{ role: "assistant", content: "Error: Failed to fetch chat history" }]);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, userId: session?.user?.id || null, sessionMemory }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
        setSessionMemory(data.sessionMemory);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: `Error: ${data.error}` },
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `Error: Failed to connect to the server.` },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChats = async () => {
    if (!session) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Please log in to clear chat history" },
      ]);
      return;
    }

    if (!window.confirm("Are you sure you want to clear all chat history?")) {
      return;
    }

    try {
      const res = await fetch("/api/clear-chats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        setChatHistory([]);
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.message },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: `Error: ${data.message || data.error}` },
        ]);
      }
    } catch (error) {
      console.error("Error clearing chats:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Error: Failed to clear chat history" },
      ]);
    }
  };

  return (
    <div>
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-10 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-3 rounded-full shadow-xl hover:scale-105 transition-transform"
      >
        {isChatOpen ? <AiFillCloseCircle /> : <IoLogoWechat />}
      </button>

      {isChatOpen && (
        <div className="fixed bottom-24 right-10 w-[90%] max-w-md bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col max-h-[80vh]">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-bold p-4 text-center flex justify-between items-center">
            <span>Gemini Chatbot</span>
            <div className="flex gap-2">
              {session && (
                <>
                  <button
                    onClick={() => {
                      setShowHistory(!showHistory);
                      if (!showHistory) fetchChatHistory();
                    }}
                    className="text-sm bg-blue-700 px-2 py-1 rounded-lg hover:bg-blue-800"
                    disabled={isLoading}
                    title="View chat history"
                  >
                    <FaHistory />
                  </button>
                  <button
                    onClick={handleClearChats}
                    className="text-sm bg-yellow-500 px-2 py-1 rounded-lg hover:bg-yellow-600"
                    disabled={isLoading}
                    title="Clear all chat history"
                  >
                    <FaTrash />
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {showHistory ? (
              <>
                {chatHistory.length === 0 ? (
                  <p className="text-gray-500 text-center italic text-lg">
                    No chat history available.
                  </p>
                ) : (
                  chatHistory.map((msg, index) => (
                    <div
                      key={index}
                      className={`mb-3 p-2 rounded-lg max-w-[70%] ${
                        msg.role === "user"
                          ? "bg-blue-500 text-white ml-auto rounded-br-none"
                          : "bg-gray-100 text-gray-800 mr-auto rounded-bl-none shadow-sm text-lg"
                      }`}
                    >
                      <strong className="text-lg">
                        {msg.role === "user" ? "You" : "Bot"}:
                      </strong>{" "}
                      <span className="text-lg">{msg.content}</span>
                      <div className="text-xs text-gray-400 mt-1">
                        {msg.timestamp && !isNaN(new Date(msg.timestamp).getTime())
                          ? new Date(msg.timestamp).toLocaleString()
                          : "Unknown time"}
                      </div>
                    </div>
                  ))
                )}
              </>
            ) : (
              <>
                {messages.length === 0 && (
                  <p className="text-gray-500 text-center italic text-lg">
                    {session
                      ? "Start the conversation..."
                      : "Please log in to get personalized responses."}
                  </p>
                )}
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`mb-3 p-2 rounded-lg max-w-[70%] ${
                      msg.role === "user"
                        ? "bg-blue-500 text-white ml-auto rounded-br-none"
                        : "bg-gray-100 text-gray-800 mr-auto rounded-bl-none shadow-sm text-lg"
                    }`}
                  >
                    <strong className="text-lg">
                      {msg.role === "user" ? "You" : "Bot"}:
                    </strong>{" "}
                    <span className="text-lg">{msg.content}</span>
                  </div>
                ))}
                {isLoading && (
                  <p className="text-gray-500 italic text-lg">Bot is typing...</p>
                )}
              </>
            )}
          </div>

          {isClient && !showHistory && (
            <form
              onSubmit={handleSendMessage}
              className="flex items-center gap-2 border-t p-3 bg-white"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200 text-lg"
                disabled={isLoading}
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-lg"
                disabled={isLoading}
              >
                Send
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatBot;