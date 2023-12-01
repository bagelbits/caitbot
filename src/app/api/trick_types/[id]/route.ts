import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  const trickTypes = await prisma.trickType.findUnique({ where: { id } });
  return new NextResponse(JSON.stringify(trickTypes), { status: 200 });
}
