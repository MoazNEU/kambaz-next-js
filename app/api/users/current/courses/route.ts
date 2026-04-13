import { NextRequest, NextResponse } from "next/server";
import {
  coursesForUser,
  db,
  enrollUser,
  SESSION_COOKIE,
} from "@/lib/kambaz-store";

export async function GET(req: NextRequest) {
  const uid = req.cookies.get(SESSION_COOKIE)?.value;
  if (!uid) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(coursesForUser(uid));
}

export async function POST(req: NextRequest) {
  const uid = req.cookies.get(SESSION_COOKIE)?.value;
  if (!uid) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const body = (await req.json()) as Record<string, unknown>;
  const newId =
    body._id && String(body._id) !== "0"
      ? String(body._id)
      : crypto.randomUUID();
  const course = { ...body, _id: newId };
  db.courses.push(course);
  enrollUser(uid, newId);
  return NextResponse.json(course);
}
