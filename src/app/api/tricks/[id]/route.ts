import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export type Trick = {
  id: string;
  name: string;
  description: string;
  youtubeId: string | null;
  trickTypeId: string;
  createdAt: string;
  updatedAt: string;
  trickType: {
    id: string;
    name: string;
  };
  Apparatus: {
    id: string;
    name: string;
  }[];
};

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
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
