"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Render form only on client to avoid hydration mismatches
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
        body: JSON.stringify({ message: input }),
      });
  
      const data = await res.json(); // Parse JSON response
  
      if (res.ok) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
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
   <div className="bg-gradient-to-bl from-blue-200 to-purple-200">
     <div className="flex flex-col min-h-screen max-w-2xl mx-auto p-4  rounded-lg shadow-lg">
    <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-600 to-purple-950 mb-4 text-center">
      Gemini Chatbot
    </h1>
  
      <div className="flex-1 overflow-y-auto mb-4 p-4 border rounded-lg bg-white shadow-sm">
        {messages.length === 0 && (
          <p className="text-gray-500 text-center italic">
            Start the conversation...
          </p>
        )}
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-3 p-3 rounded-lg max-w-[70%] ${
              msg.role === "user"
                ? "bg-blue-500 text-white ml-auto rounded-br-none"
                : "bg-white text-gray-800 mr-auto rounded-bl-none shadow-md"
            }`}
          >
            <strong>{msg.role === "user" ? "You" : "Bot"}:</strong> {msg.content}
          </div>
        ))}
        {isLoading && (
          <p className="text-gray-500 italic">Bot is typing...</p>
        )}
      </div>
      {isClient ? (
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            Send
          </button>
        </form>
      ) : (
        <div className="h-12" /> // Placeholder to avoid layout shift
      )}
    </div>
   </div>
  );
}