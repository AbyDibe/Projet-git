import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import corsHeaders from '@/config/cors'

const prisma = new PrismaClient()

export async function OPTIONS() {
    return corsHeaders(new NextResponse(null, {
        status: 200,
    }))
}

// GET /api/todo
export async function GET() {
  const todos = await prisma.todo.findMany()
  return corsHeaders(NextResponse.json(todos))
}

// POST /api/todo
export async function POST(request: NextRequest) {
  const body = await request.json()

  const todo = await prisma.todo.create({
    data: {
      title: body.title,
      description: body.description || '',
    },
  })

  return corsHeaders(NextResponse.json(todo))
}
