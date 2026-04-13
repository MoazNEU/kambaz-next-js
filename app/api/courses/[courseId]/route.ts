import { NextRequest, NextResponse } from "next/server";
import { db, removeCourseCascade, SESSION_COOKIE } from "@/lib/kambaz-store";

async function getCourseId(ctx: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await ctx.params;
  return decodeURIComponent(courseId);
}

export async function GET(
  _req: NextRequest,
  ctx: { params: Promise<{ courseId: string }> }
) {
  const courseId = await getCourseId(ctx);
  const course = db.courses.find((c) => String(c._id) === courseId);
  if (!course) {
    return NextResponse.json({ message: "Course not found" }, { status: 404 });
  }
  return NextResponse.json(course);
}

export async function PUT(
  req: NextRequest,
  ctx: { params: Promise<{ courseId: string }> }
) {
  const uid = req.cookies.get(SESSION_COOKIE)?.value;
  if (!uid) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const courseId = await getCourseId(ctx);
  const body = (await req.json()) as Record<string, unknown>;
  const i = db.courses.findIndex((c) => String(c._id) === courseId);
  if (i < 0) {
    return NextResponse.json({ message: "Course not found" }, { status: 404 });
  }
  db.courses[i] = { ...db.courses[i], ...body, _id: courseId };
  return NextResponse.json(db.courses[i]);
}

export async function DELETE(
  req: NextRequest,
  ctx: { params: Promise<{ courseId: string }> }
) {
  const uid = req.cookies.get(SESSION_COOKIE)?.value;
  if (!uid) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const courseId = await getCourseId(ctx);
  if (!db.courses.some((c) => String(c._id) === courseId)) {
    return NextResponse.json({ message: "Course not found" }, { status: 404 });
  }
  removeCourseCascade(courseId);
  return NextResponse.json({ ok: true });
}
