import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { clientSchema } from '@/lib/schemas';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });

  const parsed = clientSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });

  try {
    const client = await prisma.client.update({ where: { id: params.id }, data: parsed.data });
    return NextResponse.json(client);
  } catch {
    return NextResponse.json({ error: 'Erro ao atualizar cliente.' }, { status: 400 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });

  await prisma.service.deleteMany({ where: { clientId: params.id } });
  await prisma.client.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
