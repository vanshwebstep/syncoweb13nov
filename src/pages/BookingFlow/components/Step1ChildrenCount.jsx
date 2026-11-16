import React from 'react';
import { Check, Info, ArrowRight, ArrowLeft } from 'lucide-react';

const IMG_BASE = 'https://webstepdev.com/demo/syncoWebsiteImages/find-a-class';
const YELLOW_SPLASH = `${IMG_BASE}/yellow.png`;

export function Step1ChildrenCount({
  childrenCount,
  setChildrenCount,
  onContinue,
  onBack
}) {
  const options = [
    { count: 1, label: 'child' },
    { count: 2, label: 'children' },
    { count: 3, label: 'children' },
    { count: 4, label: 'children', displayNum: '4+' }
  ];

  return (
    <div className="space-y-6 sm:space-y-7 md:pt-0 pt-4 animate-badge-fade-in">
      {/* Step Heading */}
      <div className='pb-3'>
        <h1 className="text-[28px] sm:text-[30px] lg:text-[38px] font-bold text-[#042C89] leading-[1] recline">
          Who's coming <br />
          <span className="relative text-[42px] sm:text-[46px] gasoek font-normal inline-block text-[#0DD180] mt-1">
            to play?
            <img
              src={YELLOW_SPLASH}
              alt=""
              className="absolute -bottom-2 left-0 w-[97%] object-fill pointer-events-none"
            />
          </span>
        </h1>

        <p className="text-[#797A88] font-bold text-[14px] sm:text-[16px] mt-4 sm:mt-5">
          How many children would you like to book?
        </p>
      </div>

      {/* 4 Cards Selection Grid: 2x2 on mobile, 4 columns on tablet/desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4">
        {options.map((opt) => {
          const isSelected = childrenCount === opt.count;

          return (
            <button
              key={opt.count}
              type="button"
              onClick={() => setChildrenCount(opt.count)}
              className={`rounded-[22px] p-5 sm:p-6 sm:py-7 text-center transition-all cursor-pointer relative ${
                isSelected
                  ? 'border-2 border-[#002B9A] bg-[#E6F4FB] shadow-xs'
                  : 'border border-[#C9D3F0] bg-white hover:border-slate-300'
              }`}
            >
              {/* Checkmark Badge on Selected */}
              {isSelected && (
                <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-[#002B9A] text-white flex items-center justify-center shadow-xs">
                  <Check className="w-3 h-3 stroke-[3.5]" />
                </div>
              )}

              <div
                className={`text-[36px] sm:text-[44px] font-bold ${
                  isSelected ? 'text-[#002B9A]' : 'text-[#282829]'
                }`}
              >
                {opt.displayNum || opt.count}
              </div>

              <div className="text-[11px] sm:text-[12px] font-normal text-[#797A88]">
                {opt.label}
              </div>
            </button>
          );
        })}
      </div>

      {/* Pre-selected Notification Banner */}
      <div className="bg-[#EEF1F8] rounded-[20px] p-4 py-3 flex items-center gap-3.5 ">
        <div className="w-7 h-7 rounded-full bg-[#34353B] text-white flex items-center justify-center shrink-0">
          <Info className="w-4 h-4 stroke-[3.5]" />
        </div>
        <div className="text-[11px] md:text-[13px] text-[#34353B]">
          <strong className="font-bold text-[#34353B]">
            We've pre-selected {childrenCount} from the ages you picked.
          </strong>{' '}
          <span className="font-normal text-[#34353B] block">Each child gets their own age group.</span>
        </div>
      </div>

      {/* Desktop / Tablet Navigation Buttons Row */}
      <div className="hidden sm:flex items-center justify-between pt-6  border-t border-[#E4E9F4]">
        <button
          type="button"
          onClick={onBack}
          className="text-[#042C89] hover:text-[#002B9A] font-bold text-[14px] flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
          <span>Back</span>
        </button>

        <button
          type="button"
          onClick={onContinue}
          className="bg-[#042C89] hover:bg-[#00227A] min-w-[290px] text-white font-bold text-[17px] py-3.5 px-10 rounded-full flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer active:scale-95"
        >
          <span>Continue</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>

      {/* Mobile Sticky / Full-width Button */}
      <div className="block sm:hidden pt-2">
        <button
          type="button"
          onClick={onContinue}
          className="w-full h-[54px] rounded-full bg-[#002B9A] hover:bg-[#00227A] text-white font-semibold text-[17px] flex items-center justify-center gap-2 shadow-sm active:scale-98 cursor-pointer"
        >
          <span>Continue</span>
          <ArrowRight className="w-4 h-4 stroke-[3]" />
        </button>
      </div>
    </div>
  );
}

export default Step1ChildrenCount;
