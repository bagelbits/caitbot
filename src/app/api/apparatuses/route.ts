import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const apparatuses = await prisma.apparatus.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  return new NextResponse(JSON.stringify(apparatuses), { status: 200 });
}
