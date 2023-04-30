import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET(request: Request) {
  const trickTypes = await prisma.trickType.findMany();
  return new NextResponse(JSON.stringify(trickTypes), { status: 200 });
}
