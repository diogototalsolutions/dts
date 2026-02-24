import { notFound } from 'next/navigation';
import { ClientForm } from '@/components/client-form';
import { prisma } from '@/lib/prisma';

export default async function EditarClientePage({ params }: { params: { id: string } }) {
  const client = await prisma.client.findUnique({ where: { id: params.id } });
  if (!client) notFound();

  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold">Editar Cliente</h1>
      <ClientForm initialData={client} />
    </div>
  );
}
