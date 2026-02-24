"use client";

import { useEffect, useState } from "react";

type Contacto = {
  id: string;
  nome?: string | null;
  email?: string | null;
  telefone?: string | null;
  mensagem?: string | null;
  createdAt?: string | Date | null;
};

export default function ContactosPage() {
  const [contactos, setContactos] = useState<Contacto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchContactos() {
      try {
        const res = await fetch("/api/dashboard/contactos");
        if (!res.ok) throw new Error("Erro ao carregar contactos");
        const data = (await res.json()) as Contacto[];
        setContactos(data);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError("Erro inesperado");
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
      <h1 className="text-2xl font-semibold mb-4">Contactos</h1>

      {contactos.length === 0 ? (
        <p>Sem contactos.</p>
      ) : (
        <ul className="space-y-3">
          {contactos.map((c) => (
            <li key={c.id} className="rounded border p-4">
              <div className="font-medium">{c.nome ?? "Sem nome"}</div>
              <div className="text-sm">{c.email ?? "-"}</div>
              <div className="text-sm">{c.telefone ?? "-"}</div>
              <div className="mt-2 whitespace-pre-wrap">{c.mensagem ?? "-"}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}