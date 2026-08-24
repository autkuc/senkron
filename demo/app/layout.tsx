import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'NSosyal | Sosyal Ağ Platformu (Senkron Web Components Demo)',
  description: 'NSosyal static clone showcasing Senkron in-browser WASM Video Editor and AI Post Generator Web Components',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className="dark scroll-smooth">
      <body className="bg-[#080c14] text-slate-100 min-h-screen antialiased selection:bg-cyan-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}
