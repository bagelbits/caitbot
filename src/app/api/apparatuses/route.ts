import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET(request: Request) {
  const apparatuses = await prisma.apparatus.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  return new NextResponse(JSON.stringify(apparatuses), { status: 200 });
}
