import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { serviceSchema } from '@/lib/schemas';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });

  const parsed = serviceSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });

  const service = await prisma.service.create({
    data: {
      ...parsed.data,
      preco: parsed.data.preco ?? null,
      data: new Date(parsed.data.data)
    }
  });

  return NextResponse.json(service, { status: 201 });
}
