import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export function ModalShell({
  isOpen,
  onClose,
  title,
  subtitle,
  maxWidth = 'max-w-[440px]',
  headerDivider = false,
  children
}) {
  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end sm:items-center poppins justify-center p-0 sm:p-6"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-[#061838]/60 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <div
        className={`relative w-full ${maxWidth} max-h-[88vh] sm:max-h-[92vh] no-scrollbar overflow-y-auto bg-white rounded-t-[32px] sm:rounded-[28px] shadow-2xl p-5 sm:p-6 pb-8 sm:pb-6`}
      >
        {/* Mobile bottom sheet drag handle */}
        <div className="w-12 h-1 bg-[#D1D5DB] rounded-full mx-auto mb-3 sm:hidden" />

        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 className="poppins text-[22px] sm:text-[24px] font-bold text-[#042C89] leading-tight">
              <span>{title}</span>
            </h2>
            {subtitle && (
              <p className={`text-[13px] sm:text-[14px] text-[#797A88] mt-1 ${title === "Parking" ? "font-normal" : "md:font-semibold"}`}>
                <span>{subtitle}</span>
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-full bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#042C89] flex items-center justify-center shrink-0 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4 text-[#042C89]" strokeWidth={2.5} />
          </button>
        </div>
        {headerDivider ? (
          <div className="border-b border-[#E2E8F0] mt-3 mb-4" />
        ) : (
          <div className="mb-4" />
        )}
        {children}
      </div>
    </div>
  );
}

export default ModalShell;