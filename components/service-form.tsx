'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

type Client = { id: string; nome: string; nif: string };
type ServiceData = { id?: string; titulo: string; descricao: string; preco: number | null; data: string; clientId: string };

export function ServiceForm({ clients, initialData }: { clients: Client[]; initialData?: ServiceData }) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(event.currentTarget);
    const payload = {
      titulo: String(formData.get('titulo') ?? ''),
      descricao: String(formData.get('descricao') ?? ''),
      preco: formData.get('preco') ? Number(formData.get('preco')) : null,
      data: String(formData.get('data') ?? ''),
      clientId: String(formData.get('clientId') ?? '')
    };

    const response = await fetch(initialData?.id ? `/api/servicos/${initialData.id}` : '/api/servicos', {
      method: initialData?.id ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    if (!response.ok) setError(data.error ?? 'Erro ao guardar serviço.');
    else router.push('/dashboard/servicos');
    setLoading(false);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3 rounded bg-white p-6 shadow-sm">
      <input name="titulo" required placeholder="Título" defaultValue={initialData?.titulo} className="w-full" />
      <textarea name="descricao" required placeholder="Descrição" defaultValue={initialData?.descricao} className="w-full" rows={4} />
      <input name="preco" type="number" min={0} step="0.01" placeholder="Preço (opcional)" defaultValue={initialData?.preco ?? ''} className="w-full" />
      <input name="data" type="date" required defaultValue={initialData?.data ?? new Date().toISOString().slice(0, 10)} className="w-full" />
      <input name="clientFilter" list="clientes" placeholder="Pesquisar cliente por nome/NIF" className="w-full" onChange={(e) => {
        const match = clients.find((c) => `${c.nome} (${c.nif})` === e.currentTarget.value);
        const hidden = document.getElementById('clientId-hidden') as HTMLSelectElement | null;
        if (hidden && match) hidden.value = match.id;
      }} />
      <datalist id="clientes">
        {clients.map((client) => (
          <option key={client.id} value={`${client.nome} (${client.nif})`} />
        ))}
      </datalist>
      <select id="clientId-hidden" name="clientId" defaultValue={initialData?.clientId} required className="w-full">
        <option value="">Selecione um cliente</option>
        {clients.map((client) => (
          <option key={client.id} value={client.id}>{client.nome} ({client.nif})</option>
        ))}
      </select>
      <button disabled={loading} className="rounded bg-dts-500 px-4 py-2 text-white disabled:opacity-50">{loading ? 'A guardar...' : 'Guardar'}</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </form>
  );
}
