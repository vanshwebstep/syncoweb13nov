import React from 'react';
import { cn } from '../../utils/cn';

export function Card({ children, className, hover = true, ...props }) {
  return (
    <div
      className={cn(
        'bg-white rounded-2xl p-6 border border-slate-100 shadow-sm transition-all duration-300',
        hover && 'hover:shadow-card-hover hover:-translate-y-1',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
