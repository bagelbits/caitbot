import prisma from "../../../lib/prisma";

export async function GET(request: Request) {
  const trickTypes = await prisma.trickType.findMany();
  return new Response(JSON.stringify(trickTypes), { status: 200 });
}
