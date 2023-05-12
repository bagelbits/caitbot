import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export type Trick = {
  id: string,
  name: string
}

export async function GET() {
  const tricks = await prisma.trick.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  return NextResponse.json(tricks);
}
