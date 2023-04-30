import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET(request: Request) {
  const id = request.url.slice(request.url.lastIndexOf("/") + 1);
  const tricks = await prisma.trick.findUnique({
    where: { id },
    include: {
      trickType: {
        select: {
          id: true,
          name: true,
        },
      },
      Apparatus: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  return new NextResponse(JSON.stringify(tricks), { status: 200 });
}
