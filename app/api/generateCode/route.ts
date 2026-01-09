import { generatePublicCode } from "@/lib/generateCode";
import  db  from "@/lib/db";

export async function POST(req: Request) {
  const body = await req.json();

  const code = generatePublicCode();
  
  const pushCodeToDb = await db`
    INSERT INTO items (publicCode, name, status, email, founder_message)
    VALUES (${code}, ${body.name ?? "Unnamed item"}, 'ACTIVE', ${
    body.email ?? null
  },
    ${body.message ?? null});
  `;

//   if (pushCodeToDb.error) {
//     return Response.json({ error: pushCodeToDb.error }, { status: 500 });
//   }


  return Response.json({
    code,
    claimUrl: `https://findable.itzpankaj.site/found/${code}`,
  });
}
