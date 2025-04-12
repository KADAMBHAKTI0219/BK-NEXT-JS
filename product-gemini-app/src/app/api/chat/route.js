import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(req) {
  try {
    const { message, userId, sessionMemory = [] } = await req.json();
    const session = await getServerSession(authOptions);

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    let prompt = "";
    const { db } = await connectToDatabase();

    if (session && session.user.id === userId) {
      // Update session memory with current message
      const updatedMemory = [
        ...sessionMemory,
        { role: "user", content: message },
      ];

      // Fetch stored chat history and purchases for context
      const chats = await db
        .collection("chats")
        .find({ userId })
        .sort({ timestamp: -1 })
        .limit(20)
        .toArray();
      const purchases = await db
        .collection("purchases")
        .find({ userId })
        .toArray();

      // Build context (kept minimal, used only if relevant)
      let context = "";
      if (chats.length > 0 || purchases.length > 0) {
        context = "Background context (use only if relevant to the current question):\n";
        if (chats.length > 0) {
          context += "Previous chats include: " + chats
            .map((chat) => `${chat.message}`)
            .join(", ") + "\n";
        }
        if (purchases.length > 0) {
          context += "Past purchases: " + purchases
            .map((p) => `${p.productName}`)
            .join(", ") + "\n";
        }
      }

      // Focus prompt on the current message
      prompt = `${context}Current question: "${message}". Respond directly to this question only, using background context only if it directly relates to the question. Keep the response concise and relevant.`;

      console.log("Generated prompt:", prompt); // Debug prompt
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // Update session memory with bot response
      updatedMemory.push({ role: "assistant", content: text });

      // Store the current message and response
      await db.collection("chats").insertOne({
        userId,
        message,
        reply: text,
        timestamp: new Date(),
      });

      return NextResponse.json({ reply: text, sessionMemory: updatedMemory });
    } else {
      prompt = `The user is not logged in. Respond to: "${message}" with a generic answer.`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      return NextResponse.json({ reply: text, sessionMemory: [{ role: "assistant", content: text }] });
    }
  } catch (error) {
    console.error("Error in /api/chat:", error);
    if (error.name === "MongoServerError") {
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
    if (error.name === "GoogleGenerativeAIError") {
      return NextResponse.json({ error: "AI service error" }, { status: 502 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}