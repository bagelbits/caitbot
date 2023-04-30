import { NextResponse } from "next/server";
import prisma from "../../../../src/lib/prisma";

export async function GET(request: Request) {
  const id = request.url.slice(request.url.lastIndexOf("/") + 1);
  const tricks = await prisma.trick.findUnique({ where: { id } });
  return new NextResponse(JSON.stringify(tricks), { status: 200 });
}
