'use client';

import Container from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { brand, stats } from '@/content/landing';
import { ArrowUpRight, Headphones, Sparkles } from 'lucide-react';

const chips = [
  { label: 'Salas en vivo', icon: Headphones },
  { label: 'Chat sincronizado', icon: Sparkles },
  { label: 'Playlist colectiva', icon: ArrowUpRight },
];

export default function Hero() {
  return (
    <section id="producto" className="relative overflow-hidden pt-32">
      <div className="absolute inset-0">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-accent/20 blur-[120px]" />
        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-accent2/20 blur-[140px]" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-warm/15 blur-[120px]" />
      </div>

      <Container className="relative grid items-center gap-12 pb-20 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="flex flex-col gap-6">
          <div>
            <Badge>Beta privada</Badge>
          </div>
          <h1 className="font-display text-4xl font-semibold text-text md:text-5xl lg:text-6xl">
            <span className="text-gradient">{brand.tagline}</span>
          </h1>
          <p className="max-w-xl text-lg text-muted">
            {brand.subtitle}
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href="#cta" size="lg">
              {brand.micro.includes('Beta') ? 'Unirme a la lista' : 'Lista de espera'}
            </Button>
            <Button href="#demo" variant="outline" size="lg">
              Ver demo
            </Button>
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-muted">
            {brand.micro}
          </div>
          <div className="flex flex-wrap gap-3">
            {chips.map((chip) => (
              <div
                key={chip.label}
                className="glass flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-xs text-text"
              >
                <chip.icon className="h-4 w-4 text-accent" />
                {chip.label}
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm">
          <div className="absolute -left-12 top-8 h-28 w-28 rounded-full bg-accent2/20 blur-[60px]" />
          <div className="relative rounded-[36px] border border-white/10 bg-panel p-4 shadow-soft">
            <div className="flex items-center justify-between text-xs text-muted">
              <span>Lobby</span>
              <span className="rounded-full bg-white/10 px-2 py-1">Live</span>
            </div>
            <div className="mt-4 space-y-3">
              {stats.slice(0, 3).map((item) => (
                <div
                  key={item.label}
                  className="glass flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3"
                >
                  <div>
                    <p className="text-xs text-muted">{item.label}</p>
                    <p className="text-base font-semibold text-text">{item.value}</p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-accent/20" />
                </div>
              ))}
              <div className="glass rounded-2xl border border-white/10 px-4 py-3">
                <p className="text-xs text-muted">Sala destacada</p>
                <p className="text-sm font-semibold text-text">Chill Vibes · 24 oyentes</p>
                <p className="text-xs text-muted">Lofi Girl - Snowman</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
