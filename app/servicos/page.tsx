

const servicos = [
  'Consultoria tecnológica',
  'Implementação de software de gestão',
  'Suporte técnico contínuo'
];

export const metadata = { title: 'Serviços | DTS', description: 'Descubra os serviços da DTS.' };

export default function ServicosPublicPage() {
  return (
    <>
    
      <main className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="text-3xl font-semibold">Serviços</h1>
        <ul className="mt-6 space-y-3">
          {servicos.map((servico) => (
            <li key={servico} className="rounded bg-white p-4 shadow-sm">{servico}</li>
          ))}
        </ul>
      </main>
    
    </>
  );
}
