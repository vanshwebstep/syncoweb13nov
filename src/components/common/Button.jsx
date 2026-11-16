import React from 'react';
import { cn } from '../../utils/cn';

export const Button = React.forwardRef(({
  children,
  className,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  ...props
}, ref) => {
  const baseStyles = 'inline-flex items-center justify-center font-bold transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

  const variants = {
    primary: 'bg-brand-green text-slate-950 hover:bg-emerald-400 focus:ring-brand-green shadow-glow-green hover:shadow-lg',
    secondary: 'bg-brand-blue text-white hover:bg-blue-700 focus:ring-brand-blue shadow-md',
    accent: 'bg-brand-yellow text-slate-950 hover:bg-yellow-400 focus:ring-brand-yellow font-extrabold',
    outline: 'border-2 border-brand-green text-brand-green hover:bg-brand-green/10 focus:ring-brand-green',
    outlineWhite: 'border-2 border-white/30 text-white hover:bg-white/10 hover:border-white focus:ring-white',
    ghost: 'text-slate-200 hover:text-white hover:bg-white/10'
  };

  const sizes = {
    sm: 'text-xs px-4 py-2 gap-1.5',
    md: 'text-sm px-6 py-2.5 gap-2',
    lg: 'text-base px-8 py-3.5 gap-2.5'
  };

  return (
    <button
      ref={ref}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
    </button>
  );
});

Button.displayName = 'Button';
