import { NextResponse } from "next/server";

export function middleware(req) {
    return NextResponse.rewrite(new URL('/about', req.url));
}
