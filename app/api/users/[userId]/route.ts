import { NextRequest, NextResponse } from "next/server";
import { db, publicUser, SESSION_COOKIE } from "@/lib/kambaz-store";

export async function GET(
  _req: NextRequest,
  ctx: { params: Promise<{ userId: string }> }
) {
  const { userId } = await ctx.params;
  const id = decodeURIComponent(userId);
  const u = db.users.find((x) => String(x._id) === id);
  if (!u) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }
  return NextResponse.json(publicUser(u));
}

export async function PUT(
  req: NextRequest,
  ctx: { params: Promise<{ userId: string }> }
) {
  const uid = req.cookies.get(SESSION_COOKIE)?.value;
  if (!uid) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { userId } = await ctx.params;
  const id = decodeURIComponent(userId);
  const i = db.users.findIndex((x) => String(x._id) === id);
  if (i < 0) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }
  const body = (await req.json()) as Record<string, unknown>;
  const { password, ...rest } = body;
  db.users[i] = { ...db.users[i], ...rest, _id: id };
  if (password !== undefined) {
    db.users[i].password = password;
  }
  return NextResponse.json(publicUser(db.users[i]));
}

export async function DELETE(
  req: NextRequest,
  ctx: { params: Promise<{ userId: string }> }
) {
  const uid = req.cookies.get(SESSION_COOKIE)?.value;
  if (!uid) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { userId } = await ctx.params;
  const id = decodeURIComponent(userId);
  const i = db.users.findIndex((x) => String(x._id) === id);
  if (i < 0) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }
  db.users.splice(i, 1);
  db.enrollments = db.enrollments.filter((e) => String(e.user) !== id);
  return NextResponse.json({ ok: true });
}
