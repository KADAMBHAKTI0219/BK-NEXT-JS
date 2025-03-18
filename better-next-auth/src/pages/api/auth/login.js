import { compare } from "bcryptjs";
import { signToken } from "@/utils/jwt";
import { connectToDB } from "@/utils/db";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  const { email, password } = req.body;

  const db = await connectToDB();
  const user = await db.collection("users").findOne({ email });

  if (!user || !(await compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = signToken({ id: user._id, email: user.email });
  res.status(200).json({ token });
}