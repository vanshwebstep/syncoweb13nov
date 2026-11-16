import React from 'react';

/**
 * Clean circular avatar with centered child initials and distinct styling.
 */
export function ChildAvatar({
  firstName = '',
  lastName = '',
  size = 'md',
  className = '',
  bgColor = 'bg-[#002B9A]',
  textColor = 'text-white'
}) {
  const fInitial = firstName?.trim()?.charAt(0)?.toUpperCase() || '';
  const lInitial = lastName?.trim()?.charAt(0)?.toUpperCase() || '';
  const initials = (fInitial + lInitial) || (firstName?.trim()?.slice(0, 2)?.toUpperCase() || 'C');

  const sizeClasses = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-[11px]',
    md: 'w-10 h-10 text-[13px]',
    lg: 'w-12 h-12 text-[15px]',
    xl: 'w-16 h-16 text-[20px]'
  };

  const selectedSize = sizeClasses[size] || sizeClasses.md;

  return (
    <div
      className={`rounded-full flex items-center justify-center font-black select-none shrink-0 border border-white/20 shadow-2xs ${selectedSize} ${bgColor} ${textColor} ${className}`}
      aria-label={`${firstName} ${lastName}`}
      title={`${firstName} ${lastName}`.trim()}
    >
      <span className="leading-none tracking-tight">{initials}</span>
    </div>
  );
}

export default ChildAvatar;
