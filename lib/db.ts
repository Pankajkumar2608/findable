import { neon } from "@neondatabase/serverless";

if(!process.env.DATABASE_URL) throw new Error("Missing DATABASE_URL environment variable");

const db = neon(process.env.DATABASE_URL);

export default db;
