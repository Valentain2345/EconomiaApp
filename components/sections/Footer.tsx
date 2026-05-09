'use client';

import Container from '@/components/ui/Container';
import { brand, footerLinks } from '@/content/landing';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <Container className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-lg font-semibold text-text">
            {brand.name}
          </p>
          <p className="text-sm text-muted">Musica social en tiempo real.</p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-muted">
          {footerLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition hover:text-text"
            >
              {link.label}
            </a>
          ))}
        </div>
      </Container>
    </footer>
  );
}
