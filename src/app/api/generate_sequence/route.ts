import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  const apparatusId = request.nextUrl.searchParams.get('apparatus_id') || ''
  const sequenceIds = request.nextUrl.searchParams.get('sequence_ids')?.split(',')

  if (!sequenceIds) {
    return new NextResponse(JSON.stringify({}), { status: 200 })
  }

  const sequence = await Promise.all(
    sequenceIds.map(async (sequenceId) => {
      const tricks = await prisma.trick.findMany({
        select: {
          id: true,
          name: true,
        },
        where: {
          Apparatus: {
            some: {
              id: apparatusId,
            },
          },
          trickTypeId: sequenceId,
        },
      })
      return tricks[Math.floor(Math.random() * tricks.length)]
    })
  )

  return new NextResponse(JSON.stringify({ sequence }), { status: 200 })
}
