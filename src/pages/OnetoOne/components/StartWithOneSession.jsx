import React from 'react';
import { Eye, Search, Pencil, Megaphone, Trophy, RefreshCw } from 'lucide-react';
import { Container } from '../../../components/common/Container';

import bgTexture from 'https://webstepdev.com/demo/syncoWebsiteImages/one-to-one/yourfirstsession1.png';
import bgTextureMobile from 'https://webstepdev.com/demo/syncoWebsiteImages/one-to-one/why-one-to-one-mobile.png';
import bgTextureLayer from 'https://webstepdev.com/demo/syncoWebsiteImages/one-to-one/banner_layer.png';
import bgLayer from 'https://webstepdev.com/demo/syncoWebsiteImages/one-to-one/one_layer.png';

const BASE = 'https://webstepdev.com/demo/syncoWebsiteImages/one-to-one';
const img = (name, ext = 'png') => `${BASE}/${encodeURIComponent(name)}.${ext}`;
const SWOOSH = 'https://webstepdev.com/demo/syncoWebsiteImages/roadtorio/Swoosh.png';

// Watch ka icon folder me nahi tha, isliye wo neeche lucide Eye se bana hai.
// Eye ki image upload karo to icon: 'Group XXXXXXXXXX' daal dena.
// mobile = lucide icon + circle color (mobile cards ke liye)
const STEPS = [
  { label: '1. Watch', icon: null, MIcon: Eye, mBg: 'bg-[#0DD180]', mText: 'text-[#042C89]' },
  { label: '2. Identify', icon: 'Group 1000002736', MIcon: Search, mBg: 'bg-[#00A6E3]', mText: 'text-white' },
  { label: '3. Correct', icon: 'Group 1000002737', MIcon: Pencil, mBg: 'bg-[#FFDE14]', mText: 'text-[#042C89]' },
  { label: '4. Coach', icon: 'Group 1000002738', MIcon: Megaphone, mBg: 'bg-[#042C89]', mText: 'text-white' },
  { label: '5. Challenge', icon: 'Group 1000002739', MIcon: Trophy, mBg: 'bg-[#0DD180]', mText: 'text-[#042C89]' },
  { label: '6. Go again', icon: 'Group 1000002740', MIcon: RefreshCw, mBg: 'bg-[#00A6E3]', mText: 'text-white' },
];

function StepIcon({ icon }) {
  if (icon) {
    return <img src={img(icon)} alt="" className="w-[64px] h-[64px] lg:w-[72px] lg:h-[72px] object-contain" />;
  }
  return (
    <span className="w-[64px] h-[64px] lg:w-[72px] lg:h-[72px] rounded-full bg-[#0DD180] border-[4px] border-white flex items-center justify-center">
      <Eye className="w-6 h-6 text-[#042C89]" />
    </span>
  );
}

export function StartWithOneSession() {
  const handleBook = () => {
    const appSection = document.getElementById('samba-application');
    if (appSection) {
      appSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#042C89] pt-14 pb-24 md:py-16 lg:py-20 md:pb-28 lg:pb-36">
      {/* Backgrounds */}
      <img src={bgTexture} alt="" aria-hidden="true" className="hidden md:block absolute inset-0 w-full h-full object-cover object-bottom pointer-events-none select-none z-0" />
      <img src={bgTextureMobile} alt="" aria-hidden="true" className="md:hidden block absolute inset-0 w-full h-full object-fill pointer-events-none select-none z-0" />

      <Container className="relative z-10 px-5 md:px-6">
        {/* ===== Heading ===== */}
        <div className="md:text-center text-left">
          <p className="font-['Poppins',sans-serif] font-semibold text-[#00A6E3] text-[10px] lg:text-[13px] md:text-[11px] tracking-[0.06em] uppercase">
            Your first session
          </p>
          <h2 className="mt-2 md:mt-3 leading-[1.1]">
            <span className="block font-['Recline',sans-serif] font-bold text-white text-[28px] sm:text-[36px] lg:text-[40px]">
              Start with
            </span>
            <span className="relative inline-block font-['Gasoek_One',sans-serif] text-[#0DD180] text-[36px] sm:text-[44px] lg:text-[50px] mt-1">
              one session.
              <img src={SWOOSH} alt="" aria-hidden="true" className="absolute left-0 -bottom-1.5 md:-bottom-2 w-full h-auto pointer-events-none select-none" />
            </span>
          </h2>
          <p className="mt-5 md:mt-6 font-['Poppins',sans-serif] text-white text-[14px] lg:text-[17px] leading-[1.5] md:leading-relaxed max-w-[640px] mx-auto md:mx-auto">
            <span className="hidden md:inline">One child. One coach. </span>
            Sixty minutes on their game. Here’s how the hour runs.
          </p>
        </div>

        {/* ===== Steps (desktop) ===== */}
        <div className="hidden md:flex items-start justify-between max-w-[960px] mx-auto mt-12">
          {STEPS.map((s, i) => (
            <React.Fragment key={s.label}>
              <div className="relative w-[72px] shrink-0 flex flex-col items-center">
                <StepIcon icon={s.icon} />
                <span className="mt-3 font-['Poppins',sans-serif] font-bold text-white text-[14px] lg:text-[18px] whitespace-nowrap">
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className="flex-1 mt-[32px] lg:mt-[36px] border-t-2 border-dotted border-white/80 mx-2" />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* ===== Steps (mobile): 3x2 white cards ===== */}
        <div className="md:hidden grid grid-cols-3 gap-2.5 mt-6">
          {STEPS.map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-[16px] shadow-lg flex flex-col items-center justify-center py-3.5 px-1 min-h-[96px]"
            >
              <span className={`w-[38px] h-[38px] rounded-full ${s.mBg} flex items-center justify-center`}>
                <s.MIcon className={`w-[17px] h-[17px] ${s.mText}`} />
              </span>
              <span className="mt-2.5 font-['Poppins',sans-serif] font-bold text-[#042C89] text-[11.5px] whitespace-nowrap">
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* ===== Feedback card ===== */}
        <div className="mt-3 md:mt-10 lg:mt-12 max-w-[960px] md:min-h-[150px] mx-auto bg-white rounded-[16px] md:rounded-[24px] shadow-xl px-4 sm:px-10 lg:px-16 py-4 md:py-6 flex items-center gap-3.5 lg:gap-7">
          <img src={img('Group 1000002741')} alt="" className="w-[38px] h-[38px] md:w-[48px] md:h-[48px] lg:w-[56px] lg:h-[56px] object-contain shrink-0" />
          <div className="text-left">
            <h3 className="font-['Poppins',sans-serif] font-bold text-[#042C89] text-[14px] md:text-[16px] lg:text-[20px] leading-tight">
              <span className="md:hidden">Feedback after the session</span>
              <span className="hidden md:inline">After the session, you get feedback</span>
            </h3>
            <p className="mt-1.5 md:mt-2 font-['Poppins',sans-serif] text-[#34353B] text-[12.5px] md:text-[13px] lg:text-[15px] leading-[1.45] md:leading-relaxed">
              What we saw, what we’d work on next, and whether more sessions would help.
            </p>
          </div>
        </div>

        {/* ===== Button ===== */}
        <div className="mt-5 md:mt-8 lg:mt-10 text-center">
          <button
            type="button"
            onClick={handleBook}
            className="flex md:inline-flex w-full md:w-auto items-center justify-center bg-[#0DD180] hover:bg-[#0bb86f] text-white font-['Poppins',sans-serif] font-bold text-[14px] lg:text-[16px] px-8 lg:px-9 py-4 md:py-3.5 rounded-full shadow-md transition-all duration-300 hover:scale-[1.03] active:scale-95 cursor-pointer whitespace-nowrap"
          >
            60 minutes · £45 · Book now
          </button>
        </div>
      </Container>

      {/* Bottom wave layers */}
      {/* <img src={bgTextureLayer} alt="" aria-hidden="true" className="w-full h-auto absolute hidden md:block bottom-0 left-0 object-cover pointer-events-none select-none z-0" /> */}
      {/* <img src={bgLayer} alt="" aria-hidden="true" className="w-full h-auto block md:hidden absolute bottom-0 left-0 object-cover pointer-events-none select-none z-0" /> */}
    </section>
  );
}

export default StartWithOneSession;