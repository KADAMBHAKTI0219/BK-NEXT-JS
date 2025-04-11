import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(req) {
  try {
    const { message, userId } = await req.json();
    const session = await getServerSession(authOptions);

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    let prompt = message;

    // Check if user is authenticated and matches the provided userId
    if (session && session.user.id === userId) {
      const { db } = await connectToDatabase();
      const purchases = await db
        .collection("purchases")
        .find({ userId })
        .toArray();

      if (purchases.length > 0) {
        const purchaseList = purchases
          .map((p) => `${p.productName} (Purchased on ${new Date(p.purchaseDate).toLocaleDateString()})`)
          .join(", ");
        prompt = `The user has previously purchased: ${purchaseList}. Provide a response to the following message tailored to their purchase history: "${message}"`;
      } else {
        prompt = `The user has no purchase history. Provide a generic response to: "${message}"`;
      }
    } else {
      prompt = `The user is not logged in. Provide a generic response to: "${message}"`;
    }

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return NextResponse.json({ reply: text });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}