import React from 'react';
import { Star, UsersRound, Check, ArrowRight, ArrowLeft } from 'lucide-react';

const YELLOW_SPLASH = 'https://webstepdev.com/demo/syncoWebsiteImages/find-a-class/yellow.png';

// Custom soccer ball icon (outline style, matches lucide)
const SoccerBallIcon = ({ className = '' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8.2l3.2 2.3-1.2 3.8h-4L8.8 10.5z" />
    <path d="M12 8.2V3.2" />
    <path d="M15.2 10.5l4.6-1.5" />
    <path d="M14 14.3l2.8 3.9" />
    <path d="M10 14.3l-2.8 3.9" />
    <path d="M8.8 10.5L4.2 9" />
  </svg>
);

// Custom running person icon
const RunnerIcon = ({ className = '' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="15" cy="4" r="1.6" fill="currentColor" />
    {/* torso */}
    <path d="M13 7.8L10.5 13" />
    {/* front arm */}
    <path d="M13 8.2l3.5 2.3 2.2-1.2" />
    {/* back arm */}
    <path d="M12.6 8.6L9 9.8 7 8.2" />
    {/* front leg */}
    <path d="M10.5 13l3.5 2.2-1 4.6" />
    {/* back leg */}
    <path d="M10.5 13L8 16.5l-3.5.5" />
  </svg>
);

const REASON_OPTIONS = [
  {
    id: 'confidence',
    title: 'Build confidence',
    desc: 'Feel brave on and off the pitch',
    Icon: Star,
    reasonText: 'To build their confidence'
  },
  {
    id: 'skills',
    title: 'Improve their skills',
    desc: 'Ball mastery, dribbling, 1v1s',
    Icon: SoccerBallIcon,
    reasonText: 'To improve their technical football skills'
  },
  {
    id: 'friends',
    title: 'Make new friends',
    desc: 'Small, friendly groups',
    Icon: UsersRound,
    reasonText: 'To make new friends'
  },
  {
    id: 'active',
    title: 'Get active',
    desc: 'Burn energy, love moving',
    Icon: RunnerIcon,
    reasonText: 'To get active and exercise'
  }
];

export function StepQuickQuestion({
  selectedReason,
  setSelectedReason,
  onContinue,
  onBack
}) {
  const activeId = selectedReason || 'confidence';

  return (
    <div className="space-y-6 sm:space-y-7 animate-badge-fade-in">
      {/* Heading */}
      <div>
        <h1 className="text-[28px] sm:text-[32px] lg:text-[38px] font-bold recline text-[#042C89] leading-[1]">
          One quick <br />
          <span className="relative text-[42px] sm:text-[46px] gasoek font-normal inline-block text-[#00A6E3] mt-1">
            question.
            <img
              src={YELLOW_SPLASH}
              alt=""
              className="absolute -bottom-1.5 left-0 w-full h-2.5 sm:h-3 object-fill pointer-events-none"
            />
          </span>
        </h1>
        <p className="text-[#797A88] font-bold text-[14px] sm:text-[16px] mt-3">
          What’s the main thing you’d like for them?
        </p>
      </div>

      {/* Cards: 1-column on mobile, 2x2 grid on tablet/desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {REASON_OPTIONS.map((opt) => {
          const isSelected = activeId === opt.id || selectedReason === opt.reasonText;
          const { Icon } = opt;

          return (
            <div
              key={opt.id}
              role="radio"
              aria-checked={isSelected}
              tabIndex={0}
              onClick={() => setSelectedReason(opt.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedReason(opt.id);
                }
              }}
              className={`rounded-[16px] px-4 md:py-4.5 py-3 flex items-center justify-between gap-3 transition-all cursor-pointer ${
                isSelected
                  ? 'border-2 border-[#042C89] bg-[#E3F3FC]'
                  : 'border-[1.2px] border-[#C9D3F0] bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-4 min-w-0">
                {/* Icon circle */}
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-white text-[#042C89]' : 'bg-[#F1F5FB] text-[#00A3E0]'
                  }`}
                >
                  <Icon className="w-5 h-5 stroke-[2]" />
                </div>

                <div className="min-w-0">
                  <h3
                    className={`font-bold text-[15px] leading-tight ${
                      isSelected ? 'text-[#042C89]' : 'text-[#282829]'
                    }`}
                  >
                    {opt.title}
                  </h3>
                  <p className="text-[#797A88] text-[13px] font-normal mt-1 leading-snug">
                    {opt.desc}
                  </p>
                </div>
              </div>

              {/* Radio */}
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all ${
                  isSelected
                    ? 'bg-[#042C89] text-white'
                    : 'border-2 border-[#C9D3F0] bg-white'
                }`}
              >
                {isSelected && <Check className="w-3.5 h-3.5 stroke-[3.5]" />}
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop / Tablet Navigation Row */}
      <div className="hidden sm:flex items-center justify-between pt-6 border-t border-[#E4E9F4] sm:pt-8">
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
          className="bg-[#002B9A] hover:bg-[#00227A] text-white font-bold text-[15px] py-3.5 px-10 rounded-full flex items-center gap-2 shadow-sm transition-all cursor-pointer active:scale-95"
        >
          <span>Continue</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>

      {/* Mobile Full-width Button */}
      <div className="block sm:hidden pt-2">
        <button
          type="button"
          onClick={onContinue}
          className="w-full h-[54px] rounded-full bg-[#042C89] hover:bg-[#00227A] text-white font-bold text-[16px] flex items-center justify-center gap-2 shadow-sm active:scale-98 cursor-pointer"
        >
          <span>Continue</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
}

export default StepQuickQuestion;