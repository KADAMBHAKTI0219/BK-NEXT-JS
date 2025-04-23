import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// In-memory store for chat history (reset on server restart)
let chatHistory = [];

export async function POST(req) {
  try {
    const { message, pastChats } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // Update chat history with past chats from the client
    chatHistory = pastChats || [];

    // Check for thanks response
    if (/thank|thanks/i.test(message)) {
      chatHistory.push({ message, reply: "You're welcome! 😊" });
      return NextResponse.json({ reply: "You're welcome! 😊", updatedChats: chatHistory });
    }

    // Create a prompt with chat history for context
    const historyPrompt = chatHistory
      .map((chat) => `User: ${chat.message || ""}\nAssistant: ${chat.reply || ""}`)
      .join("\n");
    const prompt = `
      You are a visa assistant for small children and uneducated users. Use the following chat history to remember past messages and understand the user's intent:
      ${historyPrompt}
      Answer in plain text without Markdown formatting (e.g., no ** or *). Focus only on visa-related topics like types (tourist, work, student), applications, requirements, or regulations for different countries. Understand queries even if they have grammar mistakes, misspellings, or are fragmented. If the user sends single-word or very short messages (e.g., "i want" followed by "student visa"), combine them with the chat history to understand the full intent (e.g., "I want a student visa") and respond with exactly one meaningful, complete sentence that moves the conversation forward. Use a friendly, conversational tone with an emoji (e.g., "Got it! 😊") and, when asking about the country, include example countries like "USA, Canada, UK, Australia, Germany, etc." before asking a follow-up question (e.g., "Got it! 😊 Are you looking for info on how to apply for a student visa to a specific country? For example—USA, Canada, UK, Australia, Germany, etc.? Let me know where you’re planning to study, and I can give you the exact steps and requirements."). Use the chat history to maintain context and avoid repeating generic explanations if the topic is already established. Use very simple, clear language as if explaining to a small child. Always respond in English, even if the user's message is in another language.
      User message: ${message}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    // Sanitize response to remove Markdown characters
    text = text.replace(/(\*\*|__|\*|_)/g, "");

    // Add the original message and response to chat history
    chatHistory.push({ message, reply: text });

    return NextResponse.json({ reply: text, updatedChats: chatHistory });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Could not process your request. Please try again.", updatedChats: chatHistory }, { status: 500 });
  }
}