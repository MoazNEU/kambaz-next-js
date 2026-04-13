import { NextRequest, NextResponse } from "next/server";
import { db, SESSION_COOKIE } from "@/lib/kambaz-store";

export async function GET(
  _req: NextRequest,
  ctx: { params: Promise<{ courseId: string; aid: string }> }
) {
  const { courseId, aid } = await ctx.params;
  const cid = decodeURIComponent(courseId);
  const id = decodeURIComponent(aid);
  const a = db.assignments.find(
    (x) => String(x.course) === cid && String(x._id) === id
  );
  if (!a) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }
  return NextResponse.json(a);
}

export async function PUT(
  req: NextRequest,
  ctx: { params: Promise<{ courseId: string; aid: string }> }
) {
  const uid = req.cookies.get(SESSION_COOKIE)?.value;
  if (!uid) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { courseId, aid } = await ctx.params;
  const cid = decodeURIComponent(courseId);
  const id = decodeURIComponent(aid);
  const i = db.assignments.findIndex(
    (x) => String(x.course) === cid && String(x._id) === id
  );
  if (i < 0) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }
  const body = (await req.json()) as Record<string, unknown>;
  db.assignments[i] = { ...db.assignments[i], ...body, _id: id, course: cid };
  return NextResponse.json(db.assignments[i]);
}

export async function DELETE(
  req: NextRequest,
  ctx: { params: Promise<{ courseId: string; aid: string }> }
) {
  const uid = req.cookies.get(SESSION_COOKIE)?.value;
  if (!uid) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { courseId, aid } = await ctx.params;
  const cid = decodeURIComponent(courseId);
  const id = decodeURIComponent(aid);
  const i = db.assignments.findIndex(
    (x) => String(x.course) === cid && String(x._id) === id
  );
  if (i < 0) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }
  db.assignments.splice(i, 1);
  return NextResponse.json({ ok: true });
}
