import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET() {
  const tricks = await prisma.trick.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  return new NextResponse(JSON.stringify(tricks), { status: 200 });
}
