'use client';

import Container from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { CheckCircle2 } from 'lucide-react';

const highlights = [
  'Entradas rapidas con un solo tap.',
  'Hosts visibles y liderazgo claro.',
  'Salas con energia y ritmo constante.',
  'Mini player siempre presente.',
];

export default function Experience() {
  return (
    <section className="section-pad">
      <Container className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <SectionHeader
            label="Experiencia social"
            title="No es solo streaming. Es estar ahi."
            description="Cada sala combina musica, comunidad y descubrimiento en tiempo real."
          />
          <div className="grid gap-3">
            {highlights.map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm text-muted">
                <CheckCircle2 className="h-5 w-5 text-accent" />
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="glass rounded-3xl border border-white/10 p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-muted">Ambiente</p>
          <h3 className="mt-3 text-xl font-semibold text-text">
            Diseñado para noches largas y buenas conversaciones
          </h3>
          <p className="mt-3 text-sm text-muted">
            El layout prioriza el contenido de la sala con microinteracciones
            sutiles, transiciones suaves y un tono oscuro premium.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs text-muted">Tiempo medio</p>
              <p className="text-lg font-semibold text-text">42 min</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs text-muted">Retencion</p>
              <p className="text-lg font-semibold text-text">68%</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
