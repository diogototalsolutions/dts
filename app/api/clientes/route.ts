import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { clientSchema } from "@/lib/schemas";

export const runtime = "nodejs";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
    }

    const clients = await prisma.client.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(clients);
  } catch {
    return NextResponse.json({ error: "Erro ao carregar clientes." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
    }

    const parsed = clientSchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Dados inválidos." },
        { status: 400 }
      );
    }

    const client = await prisma.client.create({ data: parsed.data });
    return NextResponse.json(client, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Erro ao criar cliente." }, { status: 500 });
  }
}