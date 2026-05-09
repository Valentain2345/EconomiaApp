'use client';

import Container from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Disc3, Play, SkipBack, SkipForward } from 'lucide-react';

export default function PlayerPreview() {
  return (
    <section className="section-pad">
      <Container className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="glass rounded-3xl border border-white/10 p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/15">
              <Disc3 className="h-7 w-7 text-accent" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-text">Snowman</p>
              <p className="text-xs text-muted">Lofi Girl</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-text">
                <SkipBack className="h-4 w-4" />
              </button>
              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-black">
                <Play className="h-4 w-4" />
              </button>
              <button className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-text">
                <SkipForward className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center justify-between text-xs text-muted">
              <span>0:42</span>
              <span>3:18</span>
            </div>
            <div className="mt-3 h-1 w-full rounded-full bg-white/10">
              <div className="h-1 w-1/3 rounded-full bg-accent" />
            </div>
          </div>
        </div>
        <div>
          <SectionHeader
            label="Player"
            title="Mini reproductor persistente"
            description="La sala sigue viva mientras exploras y descubres nuevas conversaciones."
          />
        </div>
      </Container>
    </section>
  );
}
