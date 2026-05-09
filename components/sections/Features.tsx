'use client';

import Container from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { features } from '@/content/landing';
import {
  AudioWaveform,
  MessageCircle,
  ListMusic,
  Disc3,
} from 'lucide-react';

const iconMap = {
  wave: AudioWaveform,
  chat: MessageCircle,
  playlist: ListMusic,
  player: Disc3,
};

export default function Features() {
  return (
    <section className="section-pad">
      <Container>
        <SectionHeader
          label="Funciones"
          title="Todo lo que hace que una sala se sienta real"
          description="Diseñado para que la musica y la conversacion se muevan juntas."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {features.map((feature) => {
            const Icon = iconMap[feature.icon as keyof typeof iconMap];
            return (
              <div
                key={feature.title}
                className="glass rounded-3xl border border-white/10 p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/15">
                  <Icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-text">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
