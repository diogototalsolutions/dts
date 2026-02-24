import { redirect } from 'next/navigation';
import { ServiceForm } from '@/components/service-form';
import { prisma } from '@/lib/prisma';

export default async function NovoServicoPage() {
  const clients = await prisma.client.findMany({ select: { id: true, nome: true, nif: true }, orderBy: { nome: 'asc' } });
  if (clients.length === 0) redirect('/dashboard/clientes/novo');

  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold">Novo Serviço</h1>
      <ServiceForm clients={clients} />
    </div>
  );
}
