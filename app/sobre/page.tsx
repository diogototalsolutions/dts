import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

export const metadata = { title: 'Sobre Nós | DTS', description: 'Conheça a equipa DTS.' };

export default function SobrePage() {
  return (
    <>
 
      <main className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="text-3xl font-semibold">Sobre Nós</h1>
        <p className="mt-4 text-slate-700">A DTS é uma empresa focada em serviços tecnológicos e suporte empresarial com atendimento próximo e profissional.</p>
      </main>
    
    </>
  );
}
