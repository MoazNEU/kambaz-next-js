import { NextRequest, NextResponse } from "next/server";
import {
  findUserByCredentials,
  publicUser,
  SESSION_COOKIE,
} from "@/lib/kambaz-store";

export async function POST(req: NextRequest) {
  const body = (await req.json()) as { username?: string; password?: string };
  const u = findUserByCredentials(
    String(body.username ?? ""),
    String(body.password ?? "")
  );
  if (!u) {
    return NextResponse.json(
      { message: "Unable to login. Try again later." },
      { status: 401 }
    );
  }
  const res = NextResponse.json(publicUser(u));
  res.cookies.set(SESSION_COOKIE, String(u._id), {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
