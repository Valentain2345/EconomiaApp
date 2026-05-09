'use client';

import { cn } from '@/lib/cn';

type SectionHeaderProps = {
  label?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
};

export function SectionHeader({
  label,
  title,
  description,
  align = 'left',
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'mb-10 flex max-w-2xl flex-col gap-3',
        align === 'center' && 'mx-auto items-center text-center',
      )}
    >
      {label ? (
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">
          {label}
        </span>
      ) : null}
      <h2 className="font-display text-3xl font-semibold text-text md:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="text-base text-muted md:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
