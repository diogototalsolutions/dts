export const dynamic = "force-dynamic";
export const revalidate = 0;

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export const runtime = "nodejs";

export default async function ClientesPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const clientes = await prisma.client.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Clientes</h1>
        <Link className="btn-primary" href="/dashboard/clientes/novo">
          Novo cliente
        </Link>
      </div>

      <div className="space-y-2">
        {clientes.map((c) => (
          <div key={c.id} className="card p-4 flex items-center justify-between">
            <div>
              <div className="font-medium">{c.nome}</div>
              <div className="text-sm text-slate-600">{c.email}</div>
            </div>
            <Link className="btn-ghost" href={`/dashboard/clientes/${c.id}/editar`}>
              Editar
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}