import prisma from "../../../lib/prisma";

export async function GET(request: Request) {
  const tricks = await prisma.trick.findMany();
  return new Response(JSON.stringify(tricks), { status: 200 });
}
