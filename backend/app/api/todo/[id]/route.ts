import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import corsHeaders from '@/config/cors'; // si tu as une fonction de CORS
const prisma = new PrismaClient();

type Context = {
  params: {
    id: string;
  };
};
export async function OPTIONS() {
    return corsHeaders(new NextResponse(null, {
            status: 200,
        }))
}
// ✅ GET /api/todo/[id]
export async function GET(req: NextRequest, context: Context) {
  const { id } = context.params;
  const todo = await prisma.todo.findUnique({
    where: { id: Number(id) },
  });
  return corsHeaders(NextResponse.json(todo));
}

// ✅ PUT /api/todo/[id]
export async function PUT(req: NextRequest, context: Context) {
  const { id } = context.params;
  const data = await req.json();

  const updated = await prisma.todo.update({
    where: { id: Number(id) },
    data,
  });

  return corsHeaders(NextResponse.json(updated));
}

// ✅ DELETE /api/todo/[id]
export async function DELETE(req: NextRequest, context: Context) {
  const { id } = context.params;

  const deleted = await prisma.todo.delete({
    where: { id: Number(id) },
  });

  return corsHeaders(NextResponse.json(deleted));
}
