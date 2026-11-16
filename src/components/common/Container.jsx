import React from 'react';
import { cn } from '../../utils/cn';

export function Container({ children, className }) {
  return (
    <div className={cn('2xl:max-w-[1340px] xl:max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8', className)}>
      {children}
    </div>
  );
}
