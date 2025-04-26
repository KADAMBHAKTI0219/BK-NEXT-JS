import { NextResponse } from "next/server";

export async function GET(request) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized', { status: 401 });
  }
  console.log('Cron job running!');
  return NextResponse.json({ success: true });
}

// export async function GET() {
//   console.log('Cron job running!');
  
//   return NextResponse.json({ success: true });
// }