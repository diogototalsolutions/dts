import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

export const runtime = "nodejs";

const ServiceUpdateSchema = z.object({
  titulo: z.string().min(1).optional(),
  descricao: z.string().min(1).optional(),
  preco: z.number().optional().nullable(),
  data: z.string().datetime().optional(), // se envias ISO string
  clientId: z.string().optional(),
});

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
    }

    const servico = await prisma.service.findUnique({
      where: { id: params.id },
    });

    if (!servico) {
      return NextResponse.json({ error: "Serviço não encontrado." }, { status: 404 });
    }

    return NextResponse.json(servico);
  } catch {
    return NextResponse.json({ error: "Erro ao carregar serviço." }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
    }

    const parsed = ServiceUpdateSchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Dados inválidos." },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const updated = await prisma.service.update({
      where: { id: params.id },
      data: {
        ...data,
        // se vier data como string ISO, converte para Date
        ...(data.data ? { data: new Date(data.data) } : {}),
      },
    });

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Erro ao atualizar serviço." }, { status: 400 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
    }

    await prisma.service.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Erro ao apagar serviço." }, { status: 400 });
  }
}