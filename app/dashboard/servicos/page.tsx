export const dynamic = "force-dynamic";
export const revalidate = 0;

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export const runtime = "nodejs";

export default async function ServicosPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const servicos = await prisma.service.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Serviços</h1>
        <Link className="btn-primary" href="/dashboard/servicos/novo">
          Novo serviço
        </Link>
      </div>

      <div className="space-y-2">
        {servicos.map((s) => (
          <div key={s.id} className="card p-4">
            <div className="font-medium">{s.titulo}</div>
            <div className="text-sm text-slate-600">{s.descricao}</div>
          </div>
        ))}
      </div>
    </div>
  );
}