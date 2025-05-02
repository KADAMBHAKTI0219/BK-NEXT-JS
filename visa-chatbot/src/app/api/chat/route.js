import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// MongoDB connection (use your MongoDB URI from environment variables)
const mongoUri = process.env.MONGODB_URI;
const client = new MongoClient(mongoUri);
const dbName = "visaChatbot";
const collectionName = "chatHistory"; 

const visaSystemPrompt = `
You are a friendly and professional visa assistant chatbot designed for website visitors who are new to visas. Your role is to answer visa-related questions (e.g., application processes, requirements, processing times, status checks, immigration advice) in a clear, concise, and polite tone. Follow these guidelines:
- For questions requiring lists (e.g., documents, steps, or requirements), use a strict point-wise format with each item on a new line, starting with "- " (e.g., - Item 1\n- Item 2). Ensure no extra text runs into the list unless it’s a brief intro or follow-up.
- For general or open-ended questions, provide a conversational, narrative response without lists, using simple language.
- Avoid vague or conditional responses like "It depends" or "That depends on several factors." Instead, give a clear, beginner-friendly answer with a simple example, and if more details are needed, ask the user a specific question to guide them (e.g., "For example, a US tourist visa costs $160. Which visa are you interested in?").
- Avoid technical jargon; explain terms simply if needed.
- If the user asks something unrelated to visas, gently redirect to visa topics or give a brief, polite response.
- Use past conversation context to make answers relevant, but do not repeat previous responses unless asked.
- Keep responses short and engaging, like a helpful friend explaining things.
Always aim to be accurate, approachable, and helpful.
`;

export async function POST(req) {
  try {
    const { message, pastChats } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // Connect to MongoDB
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Fetch chat history from MongoDB (or use provided pastChats for session continuity)
    let chatHistory = pastChats || (await collection.find({}).toArray());

    // Build history prompt
    const historyPrompt = chatHistory
      .map((chat) => `User: ${chat.message || ""}\nAssistant: ${chat.reply || ""}`)
      .join("\n");

    // Combine system prompt, history, and new message
    const fullPrompt = `${visaSystemPrompt}\n\nPrevious Conversation:\n${historyPrompt}\n\nUser: ${message}`;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    let text = response.text();

    // Sanitize response to remove Markdown characters (keeps - for lists)
    text = text.replace(/(\*\*|__|_)/g, "");

    // Store new chat in MongoDB
    const newChat = { message, reply: text, timestamp: new Date() };
    await collection.insertOne(newChat);

    // Update in-memory chat history for response
    chatHistory.push(newChat);

    // Close MongoDB connection
    await client.close();

    return NextResponse.json({ reply: text, pastChats: chatHistory });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}