'use client';

import Container from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { rooms } from '@/content/landing';
import { Headphones, Music2 } from 'lucide-react';

export default function Rooms() {
  return (
    <section id="salas" className="section-pad">
      <Container>
        <SectionHeader
          label="Salas destacadas"
          title="Explora espacios con identidad propia"
          description="Cada sala tiene un host, una energia y una playlist en vivo."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {rooms.map((room) => (
            <div
              key={room.name}
              className="glass rounded-3xl border border-white/10 p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-muted">
                  <Music2 className="h-4 w-4 text-accent" />
                  {room.genre}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted">
                  <Headphones className="h-4 w-4 text-muted" />
                  {room.listeners}
                </div>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-text">{room.name}</h3>
              <p className="mt-1 text-sm text-muted">Host: {room.host}</p>
              <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs text-muted">Now playing</p>
                <p className="text-sm font-semibold text-text">{room.track}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
