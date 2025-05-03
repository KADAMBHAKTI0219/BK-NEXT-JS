import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) throw new Error("MONGODB_URI missing");
const client = new MongoClient(mongoUri);
const dbName = "visaChatbot";
const collectionName = "chatHistory";

export async function POST(req) {
  let clientConnected = false;

  try {
    await client.connect();
    clientConnected = true;
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Get the current time and calculate cutoff time (24 hours ago)
    const cutoffTime = new Date(Date.now() - 24 * 60 * 60 * 1000);

    // Delete only messages newer than 24 hours
    const deleteResult = await collection.deleteMany({
      timestamp: { $gt: cutoffTime }
    });

    return NextResponse.json({
      message: `Cleared ${deleteResult.deletedCount} recent chats`,
      preserved: `Kept all messages older than 24 hours`
    });

  } catch (error) {
    return NextResponse.json({ 
      error: "Clear failed: " + error.message 
    }, { status: 500 });
  } finally {
    if (clientConnected) await client.close();
  }
}