import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import corsHeaders from '@/config/cors'

const prisma = new PrismaClient()

export async function OPTIONS() {
  return corsHeaders(new NextResponse(null, { status: 200 }))
}

export async function GET(_req: NextRequest, context: any) {
  const id = Number(context.params.id)

  const todo = await prisma.todo.findUnique({
    where: { id },
  })

  return corsHeaders(NextResponse.json(todo))
}

export async function PUT(req: NextRequest, context: any) {
  const id = Number(context.params.id)
  const data = await req.json()

  const updated = await prisma.todo.update({
    where: { id },
    data: {
      title: data.title,
      description: data.description,
      completed: data.completed,
    },
  })

  return corsHeaders(NextResponse.json(updated))
}

export async function DELETE(_req: NextRequest, context: any) {
  const id = Number(context.params.id)

  await prisma.todo.delete({
    where: { id },
  })

  return corsHeaders(NextResponse.json({ message: 'Deleted' }))
}
