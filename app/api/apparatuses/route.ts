import { NextResponse } from "next/server";
import prisma from "../../../src/lib/prisma";

export async function GET(request: Request) {
  const apparatuses = await prisma.apparatus.findMany();
  return new NextResponse(JSON.stringify(apparatuses), { status: 200 });
}
