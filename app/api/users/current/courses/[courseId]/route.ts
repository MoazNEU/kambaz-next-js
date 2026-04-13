import { NextRequest, NextResponse } from "next/server";
import {
  db,
  enrollUser,
  unenrollUser,
  SESSION_COOKIE,
} from "@/lib/kambaz-store";

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
  enrollUser(uid, cid);
  return NextResponse.json({ ok: true });
}

export async function DELETE(
  req: NextRequest,
  ctx: { params: Promise<{ courseId: string }> }
) {
  const uid = req.cookies.get(SESSION_COOKIE)?.value;
  if (!uid) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { courseId } = await ctx.params;
  const cid = decodeURIComponent(courseId);
  unenrollUser(uid, cid);
  return NextResponse.json({ ok: true });
}
