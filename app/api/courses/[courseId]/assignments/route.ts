import { NextRequest, NextResponse } from "next/server";
import { db, assignmentsForCourse, SESSION_COOKIE } from "@/lib/kambaz-store";

export async function GET(
  _req: NextRequest,
  ctx: { params: Promise<{ courseId: string }> }
) {
  const { courseId } = await ctx.params;
  return NextResponse.json(assignmentsForCourse(decodeURIComponent(courseId)));
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
  const body = (await req.json()) as Record<string, unknown>;
  const row = {
    ...body,
    _id: String(body._id ?? crypto.randomUUID()),
    course: cid,
  };
  db.assignments.push(row);
  return NextResponse.json(row);
}
