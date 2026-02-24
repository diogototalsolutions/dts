import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { DeleteButton } from '@/components/delete-button';

export default async function ServicosPage({ searchParams }: { searchParams: { q?: string; clienteId?: string } }) {
  const q = searchParams.q ?? '';
  const clienteId = searchParams.clienteId ?? '';

  const clients = await prisma.client.findMany({ orderBy: { nome: 'asc' } });
  const services = await prisma.service.findMany({
    where: {
      ...(clienteId ? { clientId: clienteId } : {}),
      ...(q
        ? {
            OR: [
              { titulo: { contains: q, mode: 'insensitive' } },
              { descricao: { contains: q, mode: 'insensitive' } }
            ]
          }
        : {})
    },
    include: { client: true },
    orderBy: { data: 'desc' }
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Serviços</h1>
        <Link href="/dashboard/servicos/novo" className="rounded bg-dts-500 px-3 py-2 text-sm text-white">Novo Serviço</Link>
      </div>
      <form className="flex flex-wrap gap-2">
        <input name="q" defaultValue={q} placeholder="Pesquisar por título/descrição" className="w-full max-w-sm" />
        <select name="clienteId" defaultValue={clienteId}>
          <option value="">Todos os clientes</option>
          {clients.map((client) => <option key={client.id} value={client.id}>{client.nome}</option>)}
        </select>
        <button className="rounded bg-slate-800 px-3 py-2 text-sm text-white">Filtrar</button>
      </form>
      <div className="overflow-x-auto rounded bg-white shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-100"><tr><th className="p-2 text-left">Título</th><th>Cliente</th><th>Data</th><th>Preço</th><th className="p-2">Ações</th></tr></thead>
          <tbody>
            {services.length === 0 ? <tr><td colSpan={5} className="p-4">Sem serviços.</td></tr> : services.map((service) => (
              <tr key={service.id} className="border-t">
                <td className="p-2">{service.titulo}</td>
                <td>{service.client.nome}</td>
                <td>{new Date(service.data).toLocaleDateString('pt-PT')}</td>
                <td>{service.preco ? `${service.preco.toFixed(2)} €` : '-'}</td>
                <td className="p-2">
                  <div className="flex gap-2">
                    <Link href={`/dashboard/servicos/${service.id}/editar`} className="rounded bg-amber-500 px-2 py-1 text-xs text-white">Editar</Link>
                    <DeleteButton endpoint={`/api/servicos/${service.id}`} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
