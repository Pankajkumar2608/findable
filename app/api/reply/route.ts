
import { NextResponse } from "next/server";
import db from "@/lib/db";
import { sendReplyEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const { id, message } = await req.json();

    if (!id || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get item details
    const items = await db`
      SELECT name, finder_email 
      FROM items 
      WHERE id = ${id}
    `;

    if (items.length === 0) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    const item = items[0];

    if (!item.finder_email) {
      return NextResponse.json({ error: "No finder to reply to" }, { status: 400 });
    }

    // Update user message (the reply)
    // Note: This overwrites the original message. 
    // For full history, a separate messages table would be better.
    await db`
      UPDATE items 
      SET user_message = ${message}
      WHERE id = ${id}
    `;

    // Send email to finder
    await sendReplyEmail(
      item.finder_email,
      item.name,
      message
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending reply:", error);
    return NextResponse.json(
      { error: "Failed to send reply" },
      { status: 500 }
    );
  }
}
