'use client';

import Container from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { howItWorks } from '@/content/landing';

export default function HowItWorks() {
  return (
    <section className="section-pad">
      <Container>
        <SectionHeader
          label="Flujo"
          title="Tres pasos y ya estas dentro"
          description="Pensado para entrar rapido, sin configuraciones raras."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {howItWorks.map((step) => (
            <div
              key={step.step}
              className="glass rounded-3xl border border-white/10 p-6"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">
                {step.step}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-text">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-muted">{step.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
