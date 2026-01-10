
import { NextResponse } from "next/server";
import db from "@/lib/db";
import { sendFoundEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const { code, message, location, finderEmail } = await req.json();

    if (!code || !message || !finderEmail) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get item to verify and get owner email
    const items = await db`
      SELECT id, email, name 
      FROM items 
      WHERE publiccode = ${code}
    `;

    if (items.length === 0) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    const item = items[0];

    // Update item with finder details
    await db`
      UPDATE items 
      SET founder_message = ${message}, 
          location = ${location}, 
          finder_email = ${finderEmail},
          status = 'UNCLAIMED'
      WHERE id = ${item.id}
    `;

    // Send email to owner
    // In prod, use real domain. Locally, maybe just log or use what we have.
    const replyLink = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/reply/${item.id}`;
    
    const sendedMail = await sendFoundEmail(
      item.email,
      item.name,
      message,
      location,
      replyLink
    );
    console.log(sendedMail)

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
