import { NextRequest, NextResponse } from "next/server";
import { db, publicUser } from "@/lib/kambaz-store";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const role = searchParams.get("role")?.trim();
  const name = searchParams.get("name")?.trim().toLowerCase();

  let list = db.users.map((u) => publicUser(u));
  if (role) {
    list = list.filter((u) => String(u.role) === role);
  }
  if (name) {
    list = list.filter((u) => {
      const fn = String(u.firstName ?? "").toLowerCase();
      const ln = String(u.lastName ?? "").toLowerCase();
      const full = `${fn} ${ln}`;
      return fn.includes(name) || ln.includes(name) || full.includes(name);
    });
  }
  return NextResponse.json(list);
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as Record<string, unknown>;
  delete body._id;
  const newUser: Record<string, unknown> = {
    ...body,
    _id: crypto.randomUUID(),
  };
  db.users.push(newUser);
  return NextResponse.json(publicUser(newUser));
}
