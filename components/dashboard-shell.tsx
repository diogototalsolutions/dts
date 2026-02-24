'use client';

import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/dashboard/clientes', label: 'Clientes' },
  { href: '/dashboard/servicos', label: 'Serviços' },
  { href: '/dashboard/perfil', label: 'Perfil' }
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-[240px_1fr]">
      <aside className="border-r bg-white p-4">
        <p className="mb-6 text-lg font-bold text-dts-700">Painel DTS</p>
        <nav className="space-y-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block rounded px-3 py-2 text-sm ${pathname.startsWith(link.href) ? 'bg-dts-500 text-white' : 'hover:bg-slate-100'}`}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="w-full rounded bg-red-600 px-3 py-2 text-left text-sm text-white hover:bg-red-700"
          >
            Sair
          </button>
        </nav>
      </aside>
      <main className="p-4 md:p-8">{children}</main>
    </div>
  );
}
