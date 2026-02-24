'use client';

import { FormEvent, useState } from 'react';

export function PasswordForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);
    const formData = new FormData(event.currentTarget);

    const response = await fetch('/api/perfil/password', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        currentPassword: formData.get('currentPassword'),
        newPassword: formData.get('newPassword')
      })
    });

    const data = await response.json();
    setMessage(response.ok ? 'Password atualizada com sucesso.' : data.error ?? 'Erro.');
    setLoading(false);
    if (response.ok) event.currentTarget.reset();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3 rounded bg-white p-4 shadow-sm">
      <h2 className="text-lg font-semibold">Alterar password</h2>
      <input required type="password" name="currentPassword" placeholder="Password atual" className="w-full" />
      <input required type="password" name="newPassword" placeholder="Nova password" className="w-full" />
      <button disabled={loading} className="rounded bg-dts-500 px-4 py-2 text-white disabled:opacity-50">{loading ? 'A atualizar...' : 'Atualizar'}</button>
      {message && <p className="text-sm">{message}</p>}
    </form>
  );
}
