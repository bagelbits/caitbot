import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: Request) {
  const trickTypes = await prisma.trickType.findMany({
    select: {
      id: true,
      name: true,
    },
  })
  return new NextResponse(JSON.stringify(trickTypes), { status: 200 })
}
