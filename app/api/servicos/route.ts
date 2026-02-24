import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

export const runtime = "nodejs";

const ServiceCreateSchema = z.object({
  titulo: z.string().min(1),
  descricao: z.string().min(1),
  preco: z.number().optional().nullable(),
  data: z.string().datetime(), // ISO string
  clientId: z.string().min(1),
});

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
    }

    const servicos = await prisma.service.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(servicos);
  } catch {
    return NextResponse.json({ error: "Erro ao carregar serviços." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
    }

    const parsed = ServiceCreateSchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Dados inválidos." },
        { status: 400 }
      );
    }

    const created = await prisma.service.create({
      data: {
        titulo: parsed.data.titulo,
        descricao: parsed.data.descricao,
        preco: parsed.data.preco ?? null,
        data: new Date(parsed.data.data),
        clientId: parsed.data.clientId,
      },
    });

    return NextResponse.json(created, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Erro ao criar serviço." }, { status: 500 });
  }
}