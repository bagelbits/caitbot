import prisma from "../../../lib/prisma";

export async function GET(request: Request) {
  const apparatuses = await prisma.apparatus.findMany();
  return new Response(JSON.stringify(apparatuses), { status: 200 });
}
