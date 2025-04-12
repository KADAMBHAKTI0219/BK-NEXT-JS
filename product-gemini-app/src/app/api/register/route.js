import { connectToDatabase } from "@/lib/mongodb";
import bcrypt from "bcryptjs"; // Assuming you switched to bcryptjs
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    const { db } = await connectToDatabase();

    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const userId = uuidv4();

    await db.collection("users").insertOne({
      email,
      password: hashedPassword,
      userId,
    });

    await db.collection("purchases").insertMany([
      {
        userId,
        productName: "Laptop",
        purchaseDate: new Date("2025-01-01"),
      },
      {
        userId,
        productName: "Headphones",
        purchaseDate: new Date("2025-02-01"),
      },
    ]);
    

    return NextResponse.json({ message: "User registered and purchases seeded" });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}