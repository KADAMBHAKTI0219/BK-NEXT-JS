"use client";

import React, { useEffect, useState } from "react";
import { IoLogoWechat } from "react-icons/io5";
import { AiFillCloseCircle } from "react-icons/ai";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

const ChatBot = () => {
  const { data: session } = useSession();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

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
        body: JSON.stringify({ message: input, userId: session?.user?.id }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.reply },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `Error: ${data.error || "Could not get a response from the server."}`,
          },
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Error: ${error.message || "Failed to connect to the server."}`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* Floating Button */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-10 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-3 rounded-full shadow-xl hover:scale-105 transition-transform"
      >
        {isChatOpen ? <AiFillCloseCircle /> : <IoLogoWechat />}
      </button>

      {/* Gemini Chat Card */}
      {isChatOpen && (
        <div className="fixed bottom-24 right-10 w-[90%] max-w-md bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col max-h-[80vh]">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-bold p-4 text-center flex justify-between items-center">
            <span>Gemini Chatbot</span>
            {session ? (
              <button
                onClick={() => signOut()}
                className="text-sm bg-red-500 px-2 py-1 rounded-lg hover:bg-red-600"
              >
                Logout
              </button>
            ) : (
              <Link href="/login" className="text-sm bg-green-500 px-2 py-1 rounded-lg hover:bg-green-600">
                Login
              </Link>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-4">
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
                <strong className="text-lg">{msg.role === "user" ? "You" : "Bot"}:</strong>{" "}
                <span className="text-lg">{msg.content}</span>
              </div>
            ))}
            {isLoading && (
              <p className="text-gray-500 italic text-lg">Bot is typing...</p>
            )}
          </div>

          {isClient && (
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