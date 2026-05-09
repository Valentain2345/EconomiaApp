'use client';

import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type GlassCardProps = {
  children: ReactNode;
  className?: string;
};

export default function GlassCard({ children, className }: GlassCardProps) {
  return (
    <div
      className={cn(
        'glass rounded-2xl border border-white/10 p-5 shadow-card backdrop-blur',
        className,
      )}
    >
      {children}
    </div>
  );
}
