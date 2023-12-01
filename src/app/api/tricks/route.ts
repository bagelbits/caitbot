import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export type TrickResource = {
  id: string;
  name: string;
};

export async function GET() {
  const tricks = await prisma.trick.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  return NextResponse.json(tricks);
}
