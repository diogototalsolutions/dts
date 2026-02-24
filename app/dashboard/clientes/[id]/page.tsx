import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ClienteDetalhePage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const client = await prisma.client.findUnique({
    where: { id: params.id },
    include: { services: true },
  });
  if (!client) notFound();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">{client.nome}</h1>
      <div className="rounded bg-white p-4 shadow-sm">
        <p>
          <strong>NIF:</strong> {client.nif}
        </p>
        <p>
          <strong>Email:</strong> {client.email}
        </p>
        <p>
          <strong>Morada:</strong> {client.morada}
        </p>
      </div>
      <div className="rounded bg-white p-4 shadow-sm">
        <h2 className="mb-3 text-lg font-semibold">Serviços associados</h2>
        {client.services.length === 0 ? (
          <p>Sem serviços associados.</p>
        ) : (
          <ul className="space-y-2">
            {client.services.map((service) => (
              <li key={service.id}>
                {service.titulo} —{" "}
                {new Date(service.data).toLocaleDateString("pt-PT")}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
