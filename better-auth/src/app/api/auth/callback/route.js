import { auth } from "@/lib/auth";

export async function GET(req) {
  return auth.handleCallback(req);
}
