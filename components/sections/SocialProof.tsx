'use client';

import Container from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { stats } from '@/content/landing';

export default function SocialProof() {
  return (
    <section className="section-pad">
      <Container>
        <div className="grid items-end gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <SectionHeader
            label="Momentum"
            title="La energia social ya esta en marcha"
            description="Un vistazo a la actividad que estamos viendo en la beta privada."
          />
          <p className="text-muted">
            Creamos una experiencia donde la musica se siente compartida y el
            chat tiene peso real.
          </p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="glass rounded-2xl border border-white/10 p-5"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-muted">
                {stat.label}
              </p>
              <p className="mt-2 font-display text-2xl font-semibold text-text">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
