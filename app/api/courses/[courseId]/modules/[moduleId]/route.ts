import { NextRequest, NextResponse } from "next/server";
import { db, SESSION_COOKIE } from "@/lib/kambaz-store";

export async function GET(
  _req: NextRequest,
  ctx: { params: Promise<{ courseId: string; moduleId: string }> }
) {
  const { courseId, moduleId } = await ctx.params;
  const cid = decodeURIComponent(courseId);
  const mid = decodeURIComponent(moduleId);
  const mod = db.modules.find(
    (m) => String(m.course) === cid && String(m._id) === mid
  );
  if (!mod) {
    return NextResponse.json({ message: "Module not found" }, { status: 404 });
  }
  return NextResponse.json(mod);
}

export async function PUT(
  req: NextRequest,
  ctx: { params: Promise<{ courseId: string; moduleId: string }> }
) {
  const uid = req.cookies.get(SESSION_COOKIE)?.value;
  if (!uid) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { courseId, moduleId } = await ctx.params;
  const cid = decodeURIComponent(courseId);
  const mid = decodeURIComponent(moduleId);
  const i = db.modules.findIndex(
    (m) => String(m.course) === cid && String(m._id) === mid
  );
  if (i < 0) {
    return NextResponse.json({ message: "Module not found" }, { status: 404 });
  }
  const body = (await req.json()) as Record<string, unknown>;
  db.modules[i] = { ...db.modules[i], ...body, _id: mid, course: cid };
  return NextResponse.json(db.modules[i]);
}

export async function DELETE(
  req: NextRequest,
  ctx: { params: Promise<{ courseId: string; moduleId: string }> }
) {
  const uid = req.cookies.get(SESSION_COOKIE)?.value;
  if (!uid) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { courseId, moduleId } = await ctx.params;
  const cid = decodeURIComponent(courseId);
  const mid = decodeURIComponent(moduleId);
  const i = db.modules.findIndex(
    (m) => String(m.course) === cid && String(m._id) === mid
  );
  if (i < 0) {
    return NextResponse.json({ message: "Module not found" }, { status: 404 });
  }
  db.modules.splice(i, 1);
  return NextResponse.json({ ok: true });
}
