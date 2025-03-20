import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req) {
  try {
    await connectToDatabase();

    const { email, password } = await req.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return Response.json({ error: "User already exists" }, { status: 400 });
    }

    const newUser = new User({ email, password });
    await newUser.save();

    return Response.json({ message: "User created successfully" }, { status: 201 });
  } catch (error) {
    return Response.json({ error: "Error creating user" }, { status: 500 });
  }
}
