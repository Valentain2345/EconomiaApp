import type { Metadata } from 'next';
import { Sora, Space_Grotesk } from 'next/font/google';
import './globals.css';

const display = Sora({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '600', '700'],
});

const body = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Wavechat - salas de musica social',
  description:
    'Plataforma de musica social con salas sincronizadas y chat en tiempo real.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${display.variable} ${body.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
