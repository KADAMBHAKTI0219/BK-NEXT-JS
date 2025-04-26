import { NextResponse } from "next/server";

export async function GET(request) {
  if (!process.env.CRON_SECRET) {
    return new NextResponse('Server Configuration Error', { status: 500 });
  }

  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    console.log('Cron job running!');
    // Add actual cron job logic here
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Cron job failed:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}