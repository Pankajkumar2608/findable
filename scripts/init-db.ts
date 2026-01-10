
import { neon } from "@neondatabase/serverless";
import "dotenv/config";

const sql = neon(process.env.DATABASE_URL!);

async function main() {
  try {
    console.log("Initializing database...");
    
    await sql`
      CREATE TABLE IF NOT EXISTS items (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        publiccode VARCHAR(32) UNIQUE NOT NULL,
        name TEXT NOT NULL DEFAULT 'Unnamed item',
        status VARCHAR(16) NOT NULL DEFAULT 'active',
        email TEXT NOT NULL,
        finder_email TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
        user_message VARCHAR(512),
        founder_message VARCHAR(512),
        location VARCHAR(256)
      );
    `;
    
    console.log("Database initialized successfully.");
  } catch (error) {
    console.error("Error initializing database:", error);
    process.exit(1);
  }
}

main();
