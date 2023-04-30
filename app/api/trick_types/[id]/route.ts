import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET(request: NextRequest) {
  const id = request.url.slice(request.url.lastIndexOf("/") + 1);
  const trickTypes = await prisma.trickType.findUnique({ where: { id } });
  return new NextResponse(JSON.stringify(trickTypes), { status: 200 });
}
