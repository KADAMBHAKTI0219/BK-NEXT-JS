import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// In-memory store for chat history (in a real app, use a database)
let chatHistory = [];

export async function POST(req) {
  try {
    const { message, pastChats } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // Update chat history with past chats from the client
    chatHistory = pastChats || [];

    // Create a prompt with chat history for context
    const historyPrompt = chatHistory
      .map(chat => `User: ${chat.message || ""}\nAssistant: ${chat.reply || ""}`)
      .join("\n");
    const prompt = `You are an e-commerce assistant. Use the following chat history for context:\n${historyPrompt}\nAnswer in plain text without Markdown formatting (e.g., no ** or *). Focus on e-commerce topics like products, orders, or shipping. User message: ${message}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    // Sanitize the response to remove any Markdown characters
    text = text.replace(/(\*\*|__|\*|_)/g, "");

    // Add the new interaction to chat history
    chatHistory.push({ message, reply: text });

    return NextResponse.json({ reply: text, updatedChats: chatHistory });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Could not process your request. Please try again." }, { status: 500 });
  }
}