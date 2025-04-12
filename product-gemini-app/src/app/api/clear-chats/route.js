import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { connectToDatabase } from "@/lib/mongodb";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized: Please log in" },
        { status: 401 }
      );
    }

    const { db } = await connectToDatabase();
    const userId = session.user.id; // Fixed typo
    console.log("Clearing chat history for userId:", userId); // Debug log

    const result = await db.collection("chats").deleteMany({ userId });
    console.log("Deleted chat count:", result.deletedCount); // Debug log

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: "No chat history found to clear" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "Chat history cleared successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error clearing chat history:", error);
    return NextResponse.json(
      { message: "Failed to clear chat history" },
      { status: 500 }
    );
  }
}