'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

type ClientData = { id?: string; nome: string; nif: string; morada: string; email: string };

export function ClientForm({ initialData }: { initialData?: ClientData }) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const payload = {
      nome: String(formData.get('nome') ?? ''),
      nif: String(formData.get('nif') ?? ''),
      morada: String(formData.get('morada') ?? ''),
      email: String(formData.get('email') ?? '')
    };

    const response = await fetch(initialData?.id ? `/api/clientes/${initialData.id}` : '/api/clientes', {
      method: initialData?.id ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    if (!response.ok) setError(data.error ?? 'Erro a guardar cliente.');
    else router.push('/dashboard/clientes');
    setLoading(false);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3 rounded bg-white p-6 shadow-sm">
      <input name="nome" placeholder="Nome" defaultValue={initialData?.nome} required className="w-full" />
      <input name="nif" placeholder="NIF" defaultValue={initialData?.nif} required className="w-full" />
      <input name="morada" placeholder="Morada" defaultValue={initialData?.morada} required className="w-full" />
      <input type="email" name="email" placeholder="Email" defaultValue={initialData?.email} required className="w-full" />
      <button disabled={loading} className="rounded bg-dts-500 px-4 py-2 text-white disabled:opacity-50">{loading ? 'A guardar...' : 'Guardar'}</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </form>
  );
}
