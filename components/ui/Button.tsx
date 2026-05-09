'use client';

import Link from 'next/link';
import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string;
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
};

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 disabled:opacity-60 disabled:pointer-events-none';

const variants = {
  primary:
    'bg-accent text-black shadow-glow hover:shadow-[0_0_40px_rgba(29,185,84,0.25)]',
  outline:
    'border border-white/15 bg-white/5 text-text hover:border-white/25 hover:bg-white/10',
  ghost: 'text-text hover:bg-white/10',
};

const sizes = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-base',
};

export function Button({
  href,
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
