import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const foundItem =
    await db`SELECT name, user_message FROM items WHERE publicCode = ${code}`;

  if (!foundItem || foundItem.length === 0) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 });
  }
  const item = foundItem[0].name ? foundItem[0].name : "";
  const userMessage = foundItem[0].message ? foundItem[0].message : "";

  return NextResponse.json({ item: item, message: userMessage });
}