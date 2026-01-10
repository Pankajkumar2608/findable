
import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  
  const code = searchParams.get("code");
  console.log(code)
  if (!code) {
    return NextResponse.json({ error: "Code is required" }, { status: 400 });
  }

  try {
    const result = await db`
      SELECT name, user_message 
      FROM items 
      WHERE publiccode = ${code} AND status = 'ACTIVE'
    `;

    if (result.length === 0) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    const item = result[0];
    return NextResponse.json({ 
      item: item.name, 
      message: item.user_message 
    });
  } catch (error) {
    console.error("Error looking up item:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}