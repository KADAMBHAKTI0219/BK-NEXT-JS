import { NextResponse } from "next/server";
import { authClient } from "@/lib/auth-client";

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");

    if (!code) {
      return NextResponse.json({ error: "Authorization code missing" }, { status: 400 });
    }

    const response = await authClient.handleCallback({ code });

    if (!response.success) {
      return NextResponse.json({ error: response.error }, { status: 401 });
    }
S
    return NextResponse.redirect(new URL("/dashboard", request.url));
  } catch (error) {
    return NextResponse.json({ error: "OAuth callback failed", details: error.message }, { status: 500 });
  }
}
