import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { connectToDatabase } from "@/lib/mongodb";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      console.log("Unauthorized access to /api/chats");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { db } = await connectToDatabase();
    const userId = session.user.id;
    console.log("Fetching chats for userId:", userId);

    const chats = await db
      .collection("chats")
      .find({ userId })
      .sort({ timestamp: 1 })
      .limit(50)
      .toArray();

    console.log("Raw chats from DB:", chats);

    if (!chats || chats.length === 0) {
      console.log("No chats found for userId:", userId);
      return NextResponse.json([]);
    }

    const formattedChats = chats.flatMap((chat) => [
      { role: "user", content: chat.message, timestamp: chat.timestamp },
      { role: "assistant", content: chat.reply, timestamp: chat.timestamp },
    ]);

    console.log("Formatted chats:", formattedChats);
    return NextResponse.json(formattedChats);
  } catch (error) {
    console.error("Error fetching chat history:", error);
    return NextResponse.json({ error: "Failed to fetch chat history" }, { status: 500 });
  }
}