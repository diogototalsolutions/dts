import Link from "next/link";

const services = [
  {
    title: "Websites & Landing Pages",
    desc: "Sites rápidos, responsivos e com foco em conversão.",
  },
  {
    title: "Sistemas internos",
    desc: "Gestão de clientes, serviços, equipa e operações.",
  },
  {
    title: "Automação & Integrações",
    desc: "Email, formulários, APIs, integrações e melhorias de processos.",
  },
];

const portfolio = [
  { title: "Website institucional", tag: "Design + Next.js", year: "2026" },
  { title: "Backoffice de clientes", tag: "Dashboard + DB", year: "2026" },
  { title: "Formulário com email", tag: "Resend + Prisma", year: "2026" },
];

export default function HomePage() {
  return (
    <div className="space-y-16">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-3xl border bg-slate-950 text-white">
        {/* background image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-35"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1555617981-dac3880eac6e?auto=format&fit=crop&w=2000&q=80')",
          }}
        />
        {/* overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-slate-950/10" />

        <div className="relative px-6 py-16 sm:px-10 sm:py-20">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/90">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Soluções digitais para empresas
            </p>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-6xl">
              Diogo <span className="text-blue-300">Total</span> Solutions
            </h1>

            <p className="mt-4 text-lg text-white/85 sm:text-xl">
              Websites modernos, automações e sistemas internos para gerir clientes, serviços
              e operações com simplicidade.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/#portfolio" className="btn-primary w-full sm:w-auto">
                Ver Portfólio →
              </Link>
              <Link href="/contacto" className="btn-ghost w-full sm:w-auto">
                Fale Connosco
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-2xl font-bold">+10</div>
                <div className="text-sm text-white/75">Projetos e melhorias</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-2xl font-bold">48h</div>
                <div className="text-sm text-white/75">Tempo médio de resposta</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-2xl font-bold">100%</div>
                <div className="text-sm text-white/75">Foco em qualidade</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="servicos" className="space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Serviços</h2>
            <p className="mt-2 text-slate-600">
              Tudo o que precisas para ter presença online e um backoffice eficiente.
            </p>
          </div>
          <Link href="/contacto" className="btn-ghost hidden sm:inline-flex">
            Pedir orçamento
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {services.map((s) => (
            <div key={s.title} className="card p-6">
              <div className="text-lg font-semibold">{s.title}</div>
              <p className="mt-2 text-sm text-slate-600">{s.desc}</p>
              <div className="mt-4 h-px bg-slate-100" />
              <p className="mt-4 text-sm text-slate-500">
                Planeamento • Implementação • Manutenção
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="sobre" className="grid gap-8 md:grid-cols-2 items-start">
        <div className="card p-6">
          <h2 className="text-3xl font-bold tracking-tight">Sobre Nós</h2>
          <p className="mt-3 text-slate-600">
            A DTS cria soluções tecnológicas para ajudar empresas a simplificar processos,
            melhorar a comunicação com clientes e crescer com controlo.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-slate-700">
            <li>✅ Entregas rápidas com foco no essencial</li>
            <li>✅ Código limpo e escalável (Next.js + Prisma)</li>
            <li>✅ Automação de emails e formulários</li>
            <li>✅ Backoffice para equipa (login + gestão)</li>
          </ul>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href="/login" className="btn-primary">
              Área de Funcionários
            </Link>
            <Link href="/#portfolio" className="btn-ghost">
              Ver trabalhos
            </Link>
          </div>
        </div>

        <div className="card overflow-hidden">
          <div className="p-6">
            <div className="text-sm font-semibold text-slate-700">Como trabalhamos</div>
            <h3 className="mt-2 text-2xl font-bold">Do briefing ao lançamento</h3>
            <p className="mt-2 text-slate-600">
              Um processo simples para não perderes tempo e teres resultados.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-0 border-t md:grid-cols-2">
            {[
              ["1. Briefing", "Objetivo, público, conteúdo e prazo."],
              ["2. Design", "Estrutura, estilo e copy."],
              ["3. Desenvolvimento", "Next.js, base de dados, testes."],
              ["4. Deploy", "Colocar online e monitorizar."],
            ].map(([t, d]) => (
              <div key={t} className="p-6 border-b md:border-b-0 md:border-r last:md:border-r-0">
                <div className="font-semibold">{t}</div>
                <div className="mt-1 text-sm text-slate-600">{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Portfólio</h2>
          <p className="mt-2 text-slate-600">
            Alguns exemplos do tipo de trabalho e sistemas que conseguimos entregar.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {portfolio.map((p) => (
            <div key={p.title} className="card p-6">
              <div className="flex items-start justify-between gap-3">
                <div className="text-lg font-semibold">{p.title}</div>
                <span className="rounded-full border bg-slate-50 px-2 py-1 text-xs text-slate-600">
                  {p.year}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-600">{p.tag}</p>
              <div className="mt-4 h-px bg-slate-100" />
              <div className="mt-4 text-sm text-slate-500">
                Inclui: UI, performance, SEO e manutenção.
              </div>
            </div>
          ))}
        </div>

        <div className="card p-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-lg font-semibold">Queres um site assim?</div>
            <div className="text-sm text-slate-600">
              Envia uma mensagem e diz-nos o que precisas.
            </div>
          </div>
          <Link href="/contacto" className="btn-primary">
            Pedir orçamento →
          </Link>
        </div>
      </section>
    </div>
  );
}
