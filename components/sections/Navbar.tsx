'use client';

import Container from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { brand, navLinks } from '@/content/landing';
import { Radio } from 'lucide-react';

export default function Navbar() {
  return (
    <div className="sticky top-6 z-50">
      <Container>
        <div className="glass flex items-center justify-between rounded-full border border-white/10 px-4 py-3 shadow-soft">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
              <Radio className="h-5 w-5 text-accent" />
            </div>
            <span className="font-display text-lg font-semibold text-text">
              {brand.name}
            </span>
          </div>
          <div className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-muted transition hover:text-text"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Button href="#cta" size="sm">
              Lista de espera
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
