import { NextRequest, NextResponse } from "next/server";
import { enrollmentsForUser, SESSION_COOKIE } from "@/lib/kambaz-store";

export async function GET(req: NextRequest) {
  const uid = req.cookies.get(SESSION_COOKIE)?.value;
  if (!uid) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(enrollmentsForUser(uid));
}
