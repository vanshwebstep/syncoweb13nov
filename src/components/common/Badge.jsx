import React from 'react';
import { cn } from '../../utils/cn';

export function Badge({ children, className, variant = 'green' }) {
  const variants = {
    green: 'bg-brand-green/20 text-emerald-400 border border-brand-green/40',
    yellow: 'bg-amber-400/20 text-amber-300 border border-amber-400/40',
    blue: 'bg-blue-500/20 text-blue-300 border border-blue-400/40',
    dark: 'bg-slate-800 text-slate-200 border border-slate-700'
  };

  return (
    <span className={cn('inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider', variants[variant], className)}>
      {children}
    </span>
  );
}
