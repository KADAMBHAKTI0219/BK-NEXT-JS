import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// MongoDB connection (singleton with pooling)
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  console.error("MONGODB_URI is not defined");
  throw new Error("MONGODB_URI is not defined");
}
const client = new MongoClient(mongoUri, { maxPoolSize: 10 });
const dbName = "visaChatbot";
const collectionName = "chatHistory";

let cachedDb = null;
async function connectToMongo() {
  if (cachedDb) return cachedDb;
  await client.connect();
  cachedDb = client.db(dbName);
  console.log("Connected to MongoDB");
  return cachedDb;
}

const visaSystemPrompt = `
You are a friendly and professional visa assistant chatbot designed for website visitors new to visas. Your role is to answer visa-related questions (e.g., application processes, requirements, processing times, status checks, immigration advice) in a clear, concise, and polite tone. Follow these guidelines:
- For questions requiring lists (e.g., documents, steps, or requirements), use a strict point-wise format with each item on a new line, starting with "- " (e.g., - Item 1\n- Item 2). Ensure no extra text runs into the list unless it’s a brief intro or follow-up.
- For general or open-ended questions, provide a conversational, narrative response without lists, using simple language.
- If the user provides fragmented messages (e.g., "Canada" followed by "student"), combine them to understand the full context (e.g., "student visa for Canada") and respond accordingly.
- Avoid vague responses like "It depends." Instead, give a clear, beginner-friendly answer with a simple example, and if more details are needed, ask the user a specific question (e.g., "For example, a US tourist visa costs $160. Which visa are you interested in?").
- Avoid technical jargon; explain terms simply if needed.
- If the user asks something unrelated to visas, gently redirect to visa topics or give a brief, polite response.
- Use past conversation context to make answers relevant, but do not repeat previous responses unless asked.
- If the user asks about their previous questions (e.g., "What did I ask?" or "What was my last question?"), summarize their most recent question or list their recent questions in a concise format (e.g., "You asked: What documents do I need for a US tourist visa?").
- Keep responses short and engaging, like a helpful friend explaining things.
Always aim to be accurate, approachable, and helpful.
`;

export async function POST(req) {
  try {
    const { message, pastChats } = await req.json();

    if (!message) {
      console.log("No message provided");
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    console.log("Received message:", message);

    // Connect to MongoDB
    const db = await connectToMongo();
    const collection = db.collection(collectionName);

    // Fetch recent chat history (limit to 5 interactions)
    console.log("Fetching chat history...");
    let chatHistory = pastChats || (await collection.find({}).sort({ timestamp: -1 }).limit(5).toArray());
    console.log("Chat history fetched:", chatHistory.length, "entries");

    // Generate reply
    console.log("Generating reply...");
    const historyPrompt = chatHistory
      .map((chat) => `User: ${chat.message || ""}\nAssistant: ${chat.reply || ""}`)
      .join("\n");

    const fullPrompt = `${visaSystemPrompt}\n\nPrevious Conversation:\n${historyPrompt}\n\nUser: ${message}`;

    let text;
    try {
      const result = await model.generateContent(fullPrompt);
      const response = await result.response;
      text = response.text();
    } catch (geminiError) {
      console.error("Gemini API error:", geminiError.message);
      throw new Error("Failed to generate response from Gemini API");
    }

    // Sanitize response, preserving list format
    text = text.replace(/(\*\*|__|_)/g, "").replace(/^\s*-\s+/gim, "- ");
    console.log("Generated reply:", text);

    // Store new chat in MongoDB
    const newChat = { message, reply: text, timestamp: new Date() };
    const insertResult = await collection.insertOne(newChat);
    console.log("Inserted new chat, ID:", insertResult.insertedId);

    // Update in-memory chat history
    chatHistory.push(newChat);
    if (chatHistory.length > 5) chatHistory.shift(); // Keep only 5 latest in memory

    return NextResponse.json({ reply: text, pastChats: chatHistory });
  } catch (error) {
    console.error("Error in POST handler:", error.message, error.stack);
    return NextResponse.json({ error: "Something went wrong: " + error.message }, { status: 500 });
  }
}

// Clean up MongoDB connection on server shutdown
process.on("SIGTERM", async () => {
  if (cachedDb) {
    console.log("Closing MongoDB connection...");
    await client.close();
    console.log("MongoDB connection closed");
  }
});