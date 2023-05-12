import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export type TrickResource = {
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
