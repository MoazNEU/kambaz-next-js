import { NextRequest, NextResponse } from "next/server";
import { db, publicUser, SESSION_COOKIE } from "@/lib/kambaz-store";

export async function POST(req: NextRequest) {
  const uid = req.cookies.get(SESSION_COOKIE)?.value;
  if (!uid) {
    return NextResponse.json(null, { status: 401 });
  }
  const u = db.users.find((x) => String(x._id) === uid);
  if (!u) {
    return NextResponse.json(null, { status: 401 });
  }
  return NextResponse.json(publicUser(u));
}
