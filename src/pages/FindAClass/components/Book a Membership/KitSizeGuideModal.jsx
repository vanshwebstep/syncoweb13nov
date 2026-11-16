import React from 'react';
import { X } from 'lucide-react';

export function KitSizeGuideModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const rows = [
    { size: 'S', age: '4–5', height: '107cm / 42in', chest: '66cm / 26in', waist: '46cm / 18in', highlight: true },
    { size: 'M', age: '6–7', height: '119cm / 46in', chest: '74cm / 29in', waist: '50cm / 20in' },
    { size: 'L', age: '8–9', height: '131cm / 51in', chest: '84cm / 33in', waist: '54cm / 21in' },
    { size: 'XL', age: '10–12', height: '143cm / 56in', chest: '88cm / 34in', waist: '58cm / 23in' },
    { size: 'XXL', age: '13–14', height: '152cm / 60in', chest: '98cm / 38in', waist: '68cm / 26in' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fadeIn">
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-[28px] max-w-[620px] w-full p-6 sm:p-8 shadow-2xl z-10 animate-scaleUp">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-[24px] sm:text-[26px] font-bold text-[#0B2A8A] leading-tight">
              Kit size guide
            </h2>
            <p className="text-[13px] sm:text-[14px] text-[#64748B] mt-1">
              Measure your child, then pick the closest size.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#0B2A8A] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Size Table */}
        <div className="rounded-[18px] overflow-hidden border border-[#E2E8F0] my-5">
          <div className="bg-[#0B2A8A] text-white text-[12px] sm:text-[13px] font-bold grid grid-cols-5 py-3 px-4">
            <div>Size</div>
            <div>Age</div>
            <div>Height</div>
            <div>Chest</div>
            <div>Waist</div>
          </div>

          <div className="divide-y divide-[#E2E8F0] text-[12px] sm:text-[13px]">
            {rows.map((r) => (
              <div
                key={r.size}
                className={`grid grid-cols-5 py-3 px-4 items-center transition-colors ${
                  r.highlight ? 'bg-[#E8F3FA] font-bold text-[#0B2A8A]' : 'bg-white hover:bg-slate-50 text-[#334155]'
                }`}
              >
                <div className="font-bold text-[#0B2A8A]">{r.size}</div>
                <div>{r.age}</div>
                <div>{r.height}</div>
                <div>{r.chest}</div>
                <div>{r.waist}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Measurement definitions */}
        <div className="space-y-2.5 pt-2 text-[12px] sm:text-[13px] text-[#64748B]">
          <div className="flex items-start gap-3">
            <span className="font-bold text-[#0B2A8A] min-w-[55px]">Chest</span>
            <span>With arms relaxed at your child’s side, around the fullest part of the chest.</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="font-bold text-[#0B2A8A] min-w-[55px]">Waist</span>
            <span>Around the natural waist (not over trousers), near the belly button.</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="font-bold text-[#0B2A8A] min-w-[55px]">Height</span>
            <span>Standing in socks, feet together, back to a wall. Floor to top of the head.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KitSizeGuideModal;
