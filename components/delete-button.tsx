'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function DeleteButton({ endpoint }: { endpoint: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    if (!confirm('Tem a certeza que pretende apagar este registo?')) return;
    setLoading(true);
    const response = await fetch(endpoint, { method: 'DELETE' });
    setLoading(false);
    if (response.ok) router.refresh();
    else alert('Erro ao apagar.');
  }

  return (
    <button onClick={handleDelete} disabled={loading} className="rounded bg-red-600 px-2 py-1 text-xs text-white">
      {loading ? 'A apagar...' : 'Apagar'}
    </button>
  );
}
