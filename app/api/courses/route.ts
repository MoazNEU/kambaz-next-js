import { NextResponse } from "next/server";
import { db } from "@/lib/kambaz-store";

export async function GET() {
  return NextResponse.json(db.courses);
}
