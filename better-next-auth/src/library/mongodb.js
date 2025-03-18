import { MongoClient } from "mongodb";

const url = process.env.MONGODB_URL;
let client;

if (!url) {
  throw new Error("Please define the MONGODB_URI environment variable.");
}

export async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(url);
    await client.connect();
  }
  return client.db(process.env.MONGODB_DB);
}