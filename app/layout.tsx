import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body>
        <SiteHeader />
        <main className="container py-10">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
