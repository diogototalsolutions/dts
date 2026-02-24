export function SiteFooter() {
  return (
    <footer className="mt-16 border-t bg-white">
      <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-slate-600">
        © {new Date().getFullYear()} DTS — Soluções tecnológicas para empresas.
      </div>
    </footer>
  );
}
