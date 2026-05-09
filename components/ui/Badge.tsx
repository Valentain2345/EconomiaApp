'use client';

import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type BadgeProps = {
  children: ReactNode;
  className?: string;
};

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-muted',
        className,
      )}
    >
      {children}
    </span>
  );
}
