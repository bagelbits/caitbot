import { NextResponse } from "next/server";
import prisma from "../../../src/lib/prisma";

export async function GET() {
  const tricks = await prisma.trick.findMany();
  return new NextResponse(JSON.stringify(tricks), { status: 200 });
}
