import Link from 'next/link';

const links = [
  { href: '/', label: 'Início' },
  { href: '/sobre', label: 'Sobre Nós' },
  { href: '/servicos', label: 'Serviços' },
  { href: '/contacto', label: 'Contacto' }
];

export function SiteHeader() {
  return (
    <header className="border-b bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold text-dts-700">DTS</Link>
        <ul className="flex gap-4 text-sm font-medium">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="hover:text-dts-500">{link.label}</Link>
            </li>
          ))}
          <li>
            <Link href="/login" className="rounded bg-dts-500 px-3 py-1.5 text-white hover:bg-dts-700">Área Funcionários</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
