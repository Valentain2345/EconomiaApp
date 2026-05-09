'use client';

import Container from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { cta } from '@/content/landing';

export default function FinalCTA() {
  return (
    <section id="cta" className="section-pad">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-white/5 via-white/10 to-white/5 p-10 text-center">
          <div className="absolute inset-0 bg-[length:200%_200%] opacity-40" />
          <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-4">
            <h2 className="font-display text-3xl font-semibold text-text md:text-4xl">
              {cta.title}
            </h2>
            <p className="text-base text-muted md:text-lg">{cta.description}</p>
            <Button size="lg">{cta.button}</Button>
            <p className="text-xs uppercase tracking-[0.3em] text-muted">
              Beta privada - cupos limitados
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
