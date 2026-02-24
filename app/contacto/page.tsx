"use client";

import { FormEvent, useState } from "react";

export default function ContactoPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [ok, setOk] = useState<boolean | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setLoading(true);
    setMessage(null);
    setOk(null);

    const payload = {
      nome: String(formData.get("nome") ?? ""),
      telefone: String(formData.get("telefone") ?? ""),
      email: String(formData.get("email") ?? ""),
      mensagem: String(formData.get("mensagem") ?? ""),
    };

    const response = await fetch("/api/contacto", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      setOk(false);
      setMessage(data.error ?? "Erro ao enviar contacto.");
    } else {
      setOk(true);
      setMessage("Mensagem enviada com sucesso. Obrigado pelo contacto.");
      event.currentTarget.reset();
    }
    setLoading(false);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2 items-start">
      <section className="space-y-3">
        <h1 className="text-4xl font-extrabold tracking-tight">Contacto</h1>
        <p className="text-slate-600">
          Diz-nos o que precisas. Respondemos o mais rápido possível.
        </p>

        <div className="card p-6 space-y-3">
          <div className="text-sm text-slate-600">Também podes contactar por:</div>
          <div className="space-y-1 text-sm">
            <div><span className="font-semibold">Email:</span> contacto@dts.pt</div>
            <div><span className="font-semibold">Telefone:</span> +351 9xx xxx xxx</div>
          </div>
        </div>
      </section>

      <section className="card p-6">
        <h2 className="text-xl font-bold">Enviar mensagem</h2>

        <form onSubmit={onSubmit} className="mt-4 space-y-4">
          <div className="space-y-1">
            <label className="label">Nome</label>
            <input className="input" required name="nome" placeholder="O teu nome" />
          </div>

          <div className="space-y-1">
            <label className="label">Telefone</label>
            <input className="input" required name="telefone" placeholder="Número / telemóvel" />
          </div>

          <div className="space-y-1">
            <label className="label">Email</label>
            <input className="input" required type="email" name="email" placeholder="teuemail@exemplo.com" />
          </div>

          <div className="space-y-1">
            <label className="label">Mensagem</label>
            <textarea className="input min-h-[140px]" required name="mensagem" rows={6} placeholder="Escreve aqui..." />
          </div>

          <button disabled={loading} className="btn-primary w-full disabled:opacity-60">
            {loading ? "A enviar..." : "Enviar"}
          </button>

          {message && (
            <div className={`rounded-xl border p-3 text-sm ${ok ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-red-200 bg-red-50 text-red-800"}`}>
              {message}
            </div>
          )}
        </form>
      </section>
    </div>
  );
}
