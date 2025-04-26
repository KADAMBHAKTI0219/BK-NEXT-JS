import { NextResponse } from "next/server";

export async function GET(request) {
  if (!process.env.CRON_SECRET) {
    console.error("CRON_SECRET not set");
    return new NextResponse("Server Configuration Error", { status: 500 });
  }

  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    console.warn(`Unauthorized access attempt at ${new Date().toISOString()}`);
    return new NextResponse("Unauthorized", { status: 401 });
  }

  console.log(`Cron job running! Triggered at ${new Date().toISOString()}`);
  return NextResponse.json({ success: true });
}