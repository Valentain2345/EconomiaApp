'use client';

import Container from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { chatMessages } from '@/content/landing';

export default function ChatPreview() {
  return (
    <section id="chat" className="section-pad">
      <Container className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <SectionHeader
            label="Chat"
            title="Conversaciones que se sienten en vivo"
            description="Roles visibles, respuestas rapidas y mensajes que no se pierden."
          />
        </div>
        <div className="glass rounded-3xl border border-white/10 p-6">
          <div className="space-y-4">
            {chatMessages.map((msg, index) => {
              const isSelf = msg.role === 'self';
              const isHost = msg.role === 'host';
              return (
                <div
                  key={`${msg.user}-${index}`}
                  className={`flex ${isSelf ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                      isSelf
                        ? 'bg-accent text-black'
                        : 'border border-white/10 bg-white/5 text-text'
                    }`}
                  >
                    <div className="flex items-center gap-2 text-xs text-muted">
                      {!isSelf && (
                        <span className="font-semibold text-text">{msg.user}</span>
                      )}
                      {isHost && (
                        <span className="rounded-full bg-accent/20 px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-accent">
                          Host
                        </span>
                      )}
                      <span>{msg.time}</span>
                    </div>
                    <p className={`mt-2 ${isSelf ? 'text-black' : 'text-text'}`}>
                      {msg.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
