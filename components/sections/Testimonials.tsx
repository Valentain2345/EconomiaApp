'use client';

import Container from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { testimonials } from '@/content/landing';

export default function Testimonials() {
  return (
    <section className="section-pad">
      <Container>
        <SectionHeader
          label="Voces"
          title="Lo que dicen los primeros testers"
          description="Feedback real de personas que ya pasaron por la beta privada."
          align="center"
        />
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="glass rounded-3xl border border-white/10 p-6"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-sm font-semibold text-accent">
                  {item.name
                    .split(' ')
                    .map((part) => part[0])
                    .slice(0, 2)
                    .join('')}
                </div>
                <div>
                  <p className="text-sm font-semibold text-text">{item.name}</p>
                  <p className="text-xs text-muted">{item.role}</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-muted">"{item.quote}"</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
