
import { NextResponse } from "next/server";
import { generatePublicCode } from "@/lib/generateCode";
import db from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    const code = generatePublicCode();
    
    // Insert into DB
    await db`
      INSERT INTO items (publiccode, name, status, email, user_message)
      VALUES (${code}, ${name},'ACTIVE', ${email}, ${message || ''})
    `;

    // In a real app, successful insertion guarantees uniqueness due to constraint, 
    // but we might want retry logic for collision (rare with 8 chars alphanumeric).

    const claimUrl = `https://findable.app/found/${code}`; // In prod, use env var for host

    return NextResponse.json({ code, claimUrl });
  } catch (error) {
    console.error("Error creating item:", error);
    return NextResponse.json(
      { error: "Failed to create item" },
      { status: 500 }
    );
  }
}
