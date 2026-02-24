import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ServiceForm } from "@/components/service-form";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function NovoServicoPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const clients = await prisma.client.findMany({
    select: { id: true, nome: true, nif: true },
    orderBy: { nome: "asc" },
  });

  if (clients.length === 0) redirect("/dashboard/clientes/novo");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Novo Serviço</h1>
      <ServiceForm mode="create" clients={clients} />
    </div>
  );
}
