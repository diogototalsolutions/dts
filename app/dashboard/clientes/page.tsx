import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { DeleteButton } from '@/components/delete-button';

export default async function ClientesPage({ searchParams }: { searchParams: { q?: string; page?: string } }) {
  const q = searchParams.q ?? '';
  const page = Number(searchParams.page ?? '1');
  const pageSize = 10;

  const where = q
    ? {
        OR: [
          { nome: { contains: q, mode: 'insensitive' as const } },
          { nif: { contains: q } },
          { email: { contains: q, mode: 'insensitive' as const } }
        ]
      }
    : {};

  const [total, clients] = await Promise.all([
    prisma.client.count({ where }),
    prisma.client.findMany({ where, orderBy: { createdAt: 'desc' }, skip: (page - 1) * pageSize, take: pageSize })
  ]);

  const pages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Clientes</h1>
        <Link href="/dashboard/clientes/novo" className="rounded bg-dts-500 px-3 py-2 text-sm text-white">Novo Cliente</Link>
      </div>
      <form>
        <input name="q" defaultValue={q} placeholder="Pesquisar por Nome, NIF ou Email" className="w-full max-w-md" />
      </form>
      <div className="overflow-x-auto rounded bg-white shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-100"><tr><th className="p-2 text-left">Nome</th><th>NIF</th><th>Email</th><th className="p-2">Ações</th></tr></thead>
          <tbody>
            {clients.length === 0 ? <tr><td className="p-4" colSpan={4}>Sem clientes.</td></tr> : clients.map((client) => (
              <tr key={client.id} className="border-t">
                <td className="p-2">{client.nome}</td><td>{client.nif}</td><td>{client.email}</td>
                <td className="p-2">
                  <div className="flex gap-2">
                    <Link href={`/dashboard/clientes/${client.id}`} className="rounded bg-slate-700 px-2 py-1 text-xs text-white">Detalhes</Link>
                    <Link href={`/dashboard/clientes/${client.id}/editar`} className="rounded bg-amber-500 px-2 py-1 text-xs text-white">Editar</Link>
                    <DeleteButton endpoint={`/api/clientes/${client.id}`} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex gap-2">
        {Array.from({ length: pages }).map((_, idx) => (
          <Link key={idx} href={`/dashboard/clientes?page=${idx + 1}&q=${encodeURIComponent(q)}`} className={`rounded px-3 py-1 text-sm ${idx + 1 === page ? 'bg-dts-500 text-white' : 'bg-white'}`}>
            {idx + 1}
          </Link>
        ))}
      </div>
    </div>
  );
}
