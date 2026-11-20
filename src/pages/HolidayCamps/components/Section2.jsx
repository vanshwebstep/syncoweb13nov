import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { Container } from '../../../components/common/Container';
import bgBanner from 'https://webstepdev.com/demo/syncoWebsiteImages/holiday-camps/four_day_banner.png';

const BASE = 'https://webstepdev.com/demo/syncoWebsiteImages/holiday-camps';
const img = (name, ext = 'png') => `${BASE}/${encodeURIComponent(name)}.${ext}`;
const SWOOSH = 'https://webstepdev.com/demo/syncoWebsiteImages/roadtorio/Swoosh.png';

const HIGHLIGHTS = [
  'More touches.',
  'New skills.',
  'More confidence on the ball.',
  'Plenty of time to put it all into practice.',
];

export function Section2() {
  return (
    <section className="relative w-full overflow-hidden bg-white pt-10 pb-12 sm:py-16 lg:py-20">
      {/* Background (white + blue wave bottom-right) */}
      <img
        src={bgBanner}
        alt=""
        aria-hidden="true"
        className="hidden md:block absolute inset-0 w-full h-full object-cover pointer-events-none select-none z-0"
      />

      <Container className="relative z-10 w-full px-5 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 lg:gap-8 items-center">
          {/* ===== Left ===== */}
          <div className="md:col-span-7 lg:col-span-6 text-left">
            {/* Mobile eyebrow */}
            <p className="md:hidden mb-2 font-['Poppins',sans-serif] font-semibold text-[#00A6E3] text-[11px] tracking-[0.04em] uppercase">
              School’s out. The ball’s out.
            </p>

            <h2 className="leading-[1.1]">
              <span className="block font-['Recline',sans-serif] font-bold text-[#042C89] text-[30px] sm:text-[36px] md:text-[32px] lg:text-[44px]">
                Four days they won’t
              </span>
              <span className="relative inline-block font-['Gasoek_One',sans-serif] text-[#0DD180] text-[36px] sm:text-[44px] md:text-[38px] lg:text-[54px] mt-1">
                spend on the sofa.
                <img src={SWOOSH} alt="" aria-hidden="true" className="absolute left-0 -bottom-1.5 md:-bottom-2 w-full h-auto pointer-events-none select-none" />
              </span>
            </h2>

            <p className="mt-6 md:mt-8 max-w-[500px] font-['Poppins',sans-serif] text-[#042C89] text-[14px] sm:text-[16px] md:text-[14px] lg:text-[18px] leading-relaxed">
              Four days to get moving, meet other football-mad kids and spend hours doing something they love. And while
              they’re having fun? They’re getting better.
            </p>

            <ul className="mt-5 md:mt-6 space-y-3">
              {HIGHLIGHTS.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="w-[18px] h-[18px] rounded-full bg-[#0DD180] flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-white stroke-[3.5]" />
                  </span>
                  <span className="font-['Poppins',sans-serif] font-bold text-[#042C89] text-[13px] sm:text-[15px] md:text-[13px] lg:text-[17px]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            {/* Button (desktop) */}
            <Link
              to="/venues"
              className="hidden md:inline-flex mt-8 items-center justify-center gap-2 bg-[#042C89] hover:bg-[#021840] text-white font-['Poppins',sans-serif] font-bold text-[13px] lg:text-[15px] px-7 lg:px-8 py-3.5 rounded-full shadow-md transition-all duration-300 hover:scale-[1.03] active:scale-95 whitespace-nowrap"
            >
              Find a holiday camp <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* ===== Right: Image ===== */}
          <div className="md:col-span-5 lg:col-span-6 flex justify-center lg:justify-end">
            <img
              src={img('spendonsofabg')}
              alt="Kids at Samba Soccer holiday camp"
              className="w-full max-w-none md:max-w-full lg:max-w-[536px] lg:h-[486px] h-auto object-contain select-none drop-shadow-xl"
            />
          </div>

          {/* Button (mobile, image ke neeche, full width) */}
          <Link
            to="/venues"
            className="md:hidden flex w-full items-center justify-center gap-2 bg-[#042C89] hover:bg-[#021840] text-white font-['Poppins',sans-serif] font-bold text-[14px] py-4 rounded-full shadow-md transition-all duration-300 active:scale-95 whitespace-nowrap"
          >
            Find a holiday camp <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}

export { Section2 as FourDaysSection };
export default Section2;