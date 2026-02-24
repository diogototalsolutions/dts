"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Client = {
  id: string;
  nome: string;
  nif: string;
  morada: string;
  email: string;
};

function errMsg(e: unknown) {
  return e instanceof Error ? e.message : "Erro inesperado";
}

export default function EditarClientePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(`/api/clientes/${params.id}`);
        if (!res.ok) throw new Error("Erro ao carregar cliente");
        const data = (await res.json()) as Client;
        if (!cancelled) setClient(data);
      } catch (e: unknown) {
        if (!cancelled) setError(errMsg(e));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [params.id]);

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    if (!client) return;

    setSaving(true);
    setError(null);

    try {
      const res = await fetch(`/api/clientes/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(client),
      });

      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error ?? "Erro ao guardar alterações");
      }

      router.push("/dashboard/clientes");
    } catch (e: unknown) {
      setError(errMsg(e));
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="p-6">A carregar...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!client) return <div className="p-6">Cliente não encontrado.</div>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Editar Cliente</h1>

      <form onSubmit={onSubmit} className="space-y-3 max-w-xl">
        <input
          className="w-full rounded border p-2"
          value={client.nome}
          onChange={(e) => setClient({ ...client, nome: e.target.value })}
          placeholder="Nome"
        />
        <input
          className="w-full rounded border p-2"
          value={client.nif}
          onChange={(e) => setClient({ ...client, nif: e.target.value })}
          placeholder="NIF"
        />
        <input
          className="w-full rounded border p-2"
          value={client.morada}
          onChange={(e) => setClient({ ...client, morada: e.target.value })}
          placeholder="Morada"
        />
        <input
          className="w-full rounded border p-2"
          value={client.email}
          onChange={(e) => setClient({ ...client, email: e.target.value })}
          placeholder="Email"
        />

        <button className="btn-primary" type="submit" disabled={saving}>
          {saving ? "A guardar..." : "Guardar"}
        </button>
      </form>
    </div>
  );
}