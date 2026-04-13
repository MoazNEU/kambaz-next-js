import { NextRequest, NextResponse } from "next/server";
import { db, publicUser, SESSION_COOKIE } from "@/lib/kambaz-store";

export async function POST(req: NextRequest) {
  const body = (await req.json()) as Record<string, unknown>;
  const username = String(body.username ?? "");
  if (db.users.some((u) => u.username === username)) {
    return NextResponse.json(
      { message: "Username already taken" },
      { status: 400 }
    );
  }
  const newUser: Record<string, unknown> = {
    ...body,
    _id: crypto.randomUUID(),
    role: body.role ?? "STUDENT",
    section: body.section ?? "S101",
  };
  db.users.push(newUser);
  const res = NextResponse.json(publicUser(newUser));
  res.cookies.set(SESSION_COOKIE, String(newUser._id), {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
