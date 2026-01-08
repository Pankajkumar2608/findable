import { generatePublicCode } from "@/lib/generateCode";
import  db  from "@/lib/db";

export async function POST(req: Request) {
  const body = await req.json();

  const code = generatePublicCode();

  const item = await db.item.create({
    data: {
      publicCode: code,
      name: body.name ?? "Unnamed item",
      status: "ACTIVE",
    },
  });

  return Response.json({
    code,
    claimUrl: `https://findable.itzpankaj.site/found/${code}`,
  });
}
