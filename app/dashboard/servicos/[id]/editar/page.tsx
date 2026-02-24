import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ServiceForm } from "@/components/service-form";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function EditarServicoPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const [service, clients] = await Promise.all([
    prisma.service.findUnique({ where: { id: params.id } }),
    prisma.client.findMany({
      select: { id: true, nome: true, nif: true },
      orderBy: { nome: "asc" },
    }),
  ]);

  if (!service) notFound();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Editar Serviço</h1>
      <ServiceForm mode="edit" service={service} clients={clients} />
    </div>
  );
}
