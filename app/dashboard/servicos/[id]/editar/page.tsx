import { notFound } from 'next/navigation';
import { ServiceForm } from '@/components/service-form';
import { prisma } from '@/lib/prisma';

export default async function EditarServicoPage({ params }: { params: { id: string } }) {
  const [service, clients] = await Promise.all([
    prisma.service.findUnique({ where: { id: params.id } }),
    prisma.client.findMany({ select: { id: true, nome: true, nif: true }, orderBy: { nome: 'asc' } })
  ]);

  if (!service) notFound();

  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold">Editar Serviço</h1>
      <ServiceForm initialData={{ ...service, data: service.data.toISOString().slice(0, 10) }} clients={clients} />
    </div>
  );
}
