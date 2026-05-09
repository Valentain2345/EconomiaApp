'use client';

import Container from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { faqs } from '@/content/landing';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-pad">
      <Container>
        <SectionHeader
          label="FAQ"
          title="Respuestas rapidas antes de entrar"
          description="Lo esencial sobre la plataforma, claro y directo."
        />
        <div className="mt-8 grid gap-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="glass rounded-2xl border border-white/10"
              >
                <button
                  className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-semibold text-text"
                  onClick={() =>
                    setOpenIndex(isOpen ? null : index)
                  }
                >
                  {faq.question}
                  <ChevronDown className="h-4 w-4" />
                </button>
                {isOpen ? (
                  <div className="overflow-hidden">
                    <div className="px-5 pb-5 text-sm text-muted">
                      {faq.answer}
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
