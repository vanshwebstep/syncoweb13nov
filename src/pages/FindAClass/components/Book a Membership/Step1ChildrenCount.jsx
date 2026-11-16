import React from 'react';
import { Check, Info, ArrowRight, ArrowLeft, User } from 'lucide-react';

const YELLOW_SPLASH = 'https://webstepdev.com/demo/syncoWebsiteImages/find-a-class/yellow.png';

export function Step1ChildrenCount({
  childrenCount,
  setChildrenCount,
  onContinue,
  onBack,
  onOpenLogin,
  isTrialOffer = false,
  trialCountdown = null,
  trialChildName = ''
}) {
  const options = [
    { count: 1, label: 'child', displayNum: '1' },
    { count: 2, label: 'children', displayNum: '2' },
    { count: 3, label: 'children', displayNum: '3' },
    { count: 4, label: 'children', displayNum: '4+' }
  ];

  return (
    <div className="space-y-5 sm:space-y-6 animate-badge-fade-in">
      {/* 24-Hour Trial Offer Countdown Banner (if trial-to-membership) */}
      {isTrialOffer && trialCountdown && (
        <div className="bg-[#042C89] text-white rounded-[20px] p-4 sm:p-5 shadow-sm border border-[#0B2A8A]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="inline-block bg-[#FFE600] text-[#042C89] font-extrabold text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-1">
                24-Hour Special Offer
              </span>
              <h3 className="text-[16px] sm:text-[18px] font-bold text-white leading-tight">
                {trialChildName ? `Space reserved for ${trialChildName}!` : 'Trial Completed – Space Reserved!'}
              </h3>
              <p className="text-white/80 text-[12px] sm:text-[13px] mt-0.5">
                Sign up before the timer expires to claim your <strong>£40 starter pack discount</strong>.
              </p>
            </div>

            {/* Countdown timer pill */}
            <div className="flex items-center gap-1.5 bg-white/10 px-3.5 py-2 rounded-2xl border border-white/20 shrink-0 self-start sm:self-center">
              <div className="text-center">
                <span className="text-[18px] sm:text-[20px] font-black text-[#FFE600] leading-none block">
                  {trialCountdown.hours}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-white/70">hrs</span>
              </div>
              <span className="text-white/40 font-bold text-sm">:</span>
              <div className="text-center">
                <span className="text-[18px] sm:text-[20px] font-black text-[#FFE600] leading-none block">
                  {trialCountdown.mins}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-white/70">min</span>
              </div>
              <span className="text-white/40 font-bold text-sm">:</span>
              <div className="text-center">
                <span className="text-[18px] sm:text-[20px] font-black text-[#FFE600] leading-none block">
                  {trialCountdown.secs}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-white/70">sec</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step Heading */}
      <div className="pb-1">
        <h1 className="text-[32px] sm:text-[36px] lg:text-[42px] font-bold text-[#042C89] leading-[1.05] recline">
          Who’s joining <br />
          <span className="relative text-[44px] sm:text-[50px] gasoek font-normal inline-block text-[#0DD180] mt-1">
            Samba?
            <img
              src={YELLOW_SPLASH}
              alt=""
              className="absolute -bottom-2 left-0 w-[98%] object-fill pointer-events-none"
            />
          </span>
        </h1>

        <p className="text-[#797A88] font-bold text-[13px] sm:text-[14px] mt-4 sm:mt-5">
          How many children would you like to book?
        </p>
      </div>

      {/* Already on Samba Connect Banner */}
      <div className="bg-[#E6F5FC] border border-[#0B2A8A] rounded-[16px] px-4 py-3.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-full bg-white text-[#042C89] flex items-center justify-center shrink-0 border border-[#CFE3F5]">
            <User className="w-4 h-4 text-[#042C89] stroke-[3]" />
          </div>
          <div className="min-w-0">
            <h4 className="font-bold text-[13px] sm:text-[14px] text-[#042C89] leading-tight">
              Already on Samba Connect?
            </h4>
            <p className="text-[#475569] text-[11px] sm:text-[12px] mt-0.5 leading-tight">
              Log in with password or SMS to skip the forms.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenLogin}
          className="bg-[#0B2A8A] hover:bg-[#081e63] text-white font-bold text-[12px] sm:text-[13px] px-6 sm:px-7 h-[34px] rounded-full transition-all shrink-0 cursor-pointer active:scale-95"
        >
          Log in
        </button>
      </div>

      {/* 4 Cards Child Count Selection */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-3.5">
        {options.map((opt) => {
          const isSelected = childrenCount === opt.count;

          return (
            <button
              key={opt.count}
              type="button"
              onClick={() => setChildrenCount(opt.count)}
              className={`rounded-[16px] px-4 py-6 sm:py-8 text-center transition-all cursor-pointer relative ${
                isSelected
                  ? 'border-2 border-[#002B9A] bg-[#E6F5FC]'
                  : 'border border-[#C9D3F0] bg-white hover:border-slate-300'
              }`}
            >
              {/* Checkmark Badge on Selected */}
              {isSelected && (
                <div className="absolute top-2 right-2 w-[18px] h-[18px] rounded-full bg-[#002B9A] text-white flex items-center justify-center">
                  <Check className="w-3 h-3 stroke-[3.5]" />
                </div>
              )}

              <div
                className={`text-[32px] sm:text-[36px] font-black leading-none mb-2 ${
                  isSelected ? 'text-[#002B9A]' : 'text-[#222222]'
                }`}
              >
                {opt.displayNum}
              </div>

              <div
                className={`text-[10px] sm:text-[11px] font-normal leading-none ${
                  isSelected ? 'text-[#4A5A8A]' : 'text-[#797A88]'
                }`}
              >
                {opt.label}
              </div>
            </button>
          );
        })}
      </div>

      {/* Info Callout Box */}
      <div className="bg-[#EEF1F8] rounded-[14px] px-4 py-3.5 flex items-center gap-3 text-left">
        <div className="w-[22px] h-[22px] rounded-full bg-[#2B2B2B] text-white flex items-center justify-center shrink-0">
          <Info className="w-3 h-3" />
        </div>
        <div>
          <p className="font-bold text-[11px] sm:text-[12px] text-[#1E1E2E] leading-[1.35]">
            No trial needed. Book a membership
          </p>
          <p className="font-bold text-[11px] sm:text-[12px] text-[#1E1E2E] leading-[1.35]">
            Book a membership and start at the next class.
          </p>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-7 mt-2 border-t border-[#E2E4EC]">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 text-[#002B9A] hover:underline font-bold text-[11px] sm:text-[12px] cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>

        <button
          type="button"
          onClick={onContinue}
          className="bg-[#002B9A] hover:bg-[#001f70] text-white font-bold text-[13px] sm:text-[14px] w-[200px] sm:w-[205px] h-[42px] rounded-full flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
        >
          <span>Continue</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

export default Step1ChildrenCount;