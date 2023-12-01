import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  const apparatuses = await prisma.apparatus.findUnique({ where: { id } });
  return new NextResponse(JSON.stringify(apparatuses), { status: 200 });
}
