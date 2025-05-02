import { serialize } from 'cookie';
import { NextResponse } from 'next/server';

export async function POST() {
  const cookie = serialize('auth_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0,
    path: '/',
  });

  return NextResponse.json({ message: 'Logged out' }, {
    status: 200,
    headers: { 'Set-Cookie': cookie },
  });
}