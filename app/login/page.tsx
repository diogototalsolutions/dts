'use client';

import { FormEvent, useState } from 'react';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const result = await signIn('credentials', {
      email: String(formData.get('email') ?? ''),
      password: String(formData.get('password') ?? ''),
      redirect: true,
      callbackUrl: '/dashboard'
    });

    if (result?.error) setError('Credenciais inválidas.');
    setLoading(false);
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <form onSubmit={onSubmit} className="w-full max-w-md space-y-4 rounded bg-white p-6 shadow">
        <h1 className="text-2xl font-semibold">Área de Funcionários</h1>
        <input required type="email" name="email" placeholder="Email" className="w-full" />
        <input required type="password" name="password" placeholder="Password" className="w-full" />
        <button disabled={loading} className="w-full rounded bg-dts-500 py-2 text-white disabled:opacity-50">
          {loading ? 'A entrar...' : 'Entrar'}
        </button>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </form>
    </main>
  );
}
