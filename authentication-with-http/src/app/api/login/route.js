import { serialize } from 'cookie';
import { NextResponse } from 'next/server';

// Example: POST /api/login
export async function POST(request) {
  try {
    const { email, password } = await request.json();

    const response = await fetch('http://localhost:5000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const { token } = await response.json();

    const cookie = serialize('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24,
      path: '/',
    });

    // Return response with Set-Cookie header
    return NextResponse.json({ message: 'Login successful' }, {
      status: 200,
      headers: { 'Set-Cookie': cookie },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
