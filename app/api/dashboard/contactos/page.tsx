'use client';

import { useEffect, useState } from 'react';

type ContactMessage = {
  id: string;
  nome: string;
  telefone: string | null;
  email: string;
  conteudo: string;
  status: string;
  createdAt: string;
};

export default function ContactosPage() {
  const [contactos, setContactos] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchContactos() {
      try {
        const res = await fetch('/api/dashboard/contactos');
        if (!res.ok) throw new Error('Erro ao carregar contactos');
        const data = await res.json();
        setContactos(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchContactos();
  }, []);

  if (loading) return <div className="p-6">A carregar...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Contactos Recebidos</h1>

      <div className="space-y-4">
        {contactos.length === 0 && (
          <div className="text-gray-500">Sem mensagens ainda.</div>
        )}

        {contactos.map((c) => (
          <div key={c.id} className="rounded-lg border p-4 bg-white shadow-sm">
            <div className="flex justify-between">
              <div className="font-semibold">{c.nome}</div>
              <div className="text-sm text-gray-500">
                {new Date(c.createdAt).toLocaleString()}
              </div>
            </div>

            <div className="text-sm text-gray-600">{c.email}</div>
            <div className="text-sm text-gray-600">
              {c.telefone ?? '-'}
            </div>

            <div className="mt-3 text-gray-700 whitespace-pre-wrap">
              {c.conteudo}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
