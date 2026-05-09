'use client';

import Container from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import Image from 'next/image';

export default function Showcase() {
  return (
    <section id="demo" className="section-pad">
      <Container>
        <SectionHeader
          label="App"
          title="El lobby se siente vivo"
          description="Tres vistas clave para entender la experiencia: lobby, chat y playlist."
          align="center"
        />
        <div className="relative mt-12 grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative mx-auto h-[560px] w-full max-w-md">
            <div className="absolute inset-0 rounded-[40px] bg-grid opacity-30" />
            <div className="absolute left-0 top-10 w-[46%]">
              <Image
                src="/phone-1.png"
                alt="Vista del chat en vivo"
                width={720}
                height={1440}
                className="h-auto w-full rounded-[28px] border border-white/10 shadow-soft"
              />
            </div>
            <div className="absolute left-1/2 top-0 w-[52%] -translate-x-1/2">
              <Image
                src="/phone-0.png"
                alt="Vista del lobby con salas activas"
                width={720}
                height={1440}
                className="h-auto w-full rounded-[28px] border border-white/10 shadow-soft"
                priority
              />
            </div>
            <div className="absolute right-0 top-16 w-[46%]">
              <Image
                src="/phone-2.png"
                alt="Vista de la playlist compartida"
                width={720}
                height={1440}
                className="h-auto w-full rounded-[28px] border border-white/10 shadow-soft"
              />
            </div>
            <div className="absolute bottom-4 right-8 w-[40%]">
              <Image
                src="/phone-3.png"
                alt="Vista de una sala en vivo"
                width={720}
                height={1440}
                className="h-auto w-full rounded-[24px] border border-white/10 shadow-soft"
              />
            </div>
          </div>

          <div className="grid gap-6">
            <div className="glass rounded-3xl border border-white/10 p-6">
              <p className="text-sm font-semibold text-text">Lobby</p>
              <p className="text-xs text-muted">Explora salas activas y entra rapido.</p>
              <div className="mt-6 space-y-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs text-muted">Chill Vibes</p>
                  <p className="text-sm font-semibold text-text">24 oyentes</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs text-muted">Late Night Drive</p>
                  <p className="text-sm font-semibold text-text">18 oyentes</p>
                </div>
              </div>
            </div>

            <div className="glass rounded-3xl border border-white/10 p-6">
              <p className="text-sm font-semibold text-text">Chat en vivo</p>
              <p className="text-xs text-muted">Mensajes con roles claros.</p>
              <div className="mt-6 space-y-3">
                <div className="rounded-2xl bg-accent/20 p-4 text-xs text-text">
                  HOST · DJ Luna
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-muted">
                  You: Este drop esta brutal
                </div>
              </div>
            </div>

            <div className="glass rounded-3xl border border-white/10 p-6">
              <p className="text-sm font-semibold text-text">Playlist</p>
              <p className="text-xs text-muted">Lo que suena ahora y lo que viene.</p>
              <div className="mt-6 space-y-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs text-muted">Now</p>
                  <p className="text-sm font-semibold text-text">Snowman</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs text-muted">Next</p>
                  <p className="text-sm font-semibold text-text">Nightcall</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
