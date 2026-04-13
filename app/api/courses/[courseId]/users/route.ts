import { NextRequest, NextResponse } from "next/server";
import {
  db,
  enrollUser,
  publicUser,
  SESSION_COOKIE,
  usersForCourse,
} from "@/lib/kambaz-store";

export async function GET(
  _req: NextRequest,
  ctx: { params: Promise<{ courseId: string }> }
) {
  const { courseId } = await ctx.params;
  const id = decodeURIComponent(courseId);
  return NextResponse.json(usersForCourse(id));
}

export async function POST(
  req: NextRequest,
  ctx: { params: Promise<{ courseId: string }> }
) {
  const uid = req.cookies.get(SESSION_COOKIE)?.value;
  if (!uid) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { courseId } = await ctx.params;
  const cid = decodeURIComponent(courseId);
  if (!db.courses.some((c) => String(c._id) === cid)) {
    return NextResponse.json({ message: "Course not found" }, { status: 404 });
  }
  const body = (await req.json()) as Record<string, unknown>;
  const newUser: Record<string, unknown> = {
    ...body,
    _id: crypto.randomUUID(),
  };
  db.users.push(newUser);
  enrollUser(String(newUser._id), cid);
  return NextResponse.json(publicUser(newUser));
}
