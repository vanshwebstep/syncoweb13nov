import React from 'react';
import { ArrowRight, Clock } from 'lucide-react';
import { Container } from '../../../components/common/Container';

import bgPattern from 'https://webstepdev.com/demo/syncoWebsiteImages/one-to-one/building.jpg';
import bgPatternMobile from 'https://webstepdev.com/demo/syncoWebsiteImages/one-to-one/building_mobile.png';
import blueBall from 'https://webstepdev.com/demo/syncoWebsiteImages/one-to-one/blue_ball.png';
import greenBall from 'https://webstepdev.com/demo/syncoWebsiteImages/gold.png';

const WHITELINE = 'https://webstepdev.com/demo/syncoWebsiteImages/roadtorio/whiteline.png';

const PLANS = [
  {
    id: 'first',
    label: 'FIRST SESSION',
    price: '£45',
    pill: { type: 'duration', text: '60 minutes' },
    desc: 'See where they are now and get clear feedback on what comes next.',
    cta: 'Book first session',
    cardBg: 'bg-white',
    btn: 'bg-[#0DD180] hover:bg-[#0bb86f] text-[#042C89]',
    ball: null,
    badge: null,
  },
  {
    id: 'five',
    label: '5-SESSION BLOCK',
    price: '£275',
    pill: { type: 'text', text: '£55 per session' },
    desc: 'Five focused sessions on the areas that need the most attention.',
    cta: 'Book 5 sessions',
    cardBg: 'bg-white',
    btn: 'bg-[#042C89] hover:bg-[#021840] text-white',
    ball: greenBall,
    badge: null,
  },
  {
    id: 'ten',
    label: '10-SESSION BLOCK',
    price: '£500',
    pill: { type: 'text', text: '£50 per session', white: true },
    desc: 'Ten sessions to build confidence, consistency and long-term progress.',
    cta: 'Book 10 sessions',
    cardBg: 'bg-[#FFDE14]',
    btn: 'bg-[#042C89] hover:bg-[#021840] text-white',
    ball: blueBall,
    badge: 'Best value',
  },
];

export function Building() {
  const handleBook = () => {
    const appSection = document.getElementById('samba-application');
    if (appSection) {
      appSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="prices" className="relative w-full overflow-hidden bg-[#00a5e3] py-12 sm:py-16 lg:py-20">
      {/* <img src={bgPattern} alt="" aria-hidden="true" className="hidden md:block absolute inset-0 w-full h-full object-cover object-top pointer-events-none select-none z-0" />
      <img src={bgPatternMobile} alt="" aria-hidden="true" className="md:hidden block absolute inset-0 w-full h-full object-cover object-top pointer-events-none select-none z-0" /> */}

      <Container className="relative z-10">
        {/* ===== Heading ===== */}
        <div className="text-center">
          <h2 className="leading-[1.1]">
            <span className="block font-['Recline',sans-serif] font-bold text-[#042C89] text-[34px] sm:text-[44px] lg:text-[52.3px]">
              Keep
            </span>
            <span className="relative inline-block font-['Gasoek_One',sans-serif] text-[#FFDE14] text-[42px] sm:text-[54px] lg:text-[65.25px] mt-1">
              building.
              <img src={WHITELINE} alt="" aria-hidden="true" className="absolute left-0 -bottom-2 w-full h-auto pointer-events-none select-none" />
            </span>
          </h2>
          <p className="mt-6 font-['Poppins',sans-serif] font-medium text-[#042C89] text-[14px] sm:text-[16px] lg:text-[17px]">
            Start with one session. If they’d benefit from more, choose a block.
          </p>
        </div>

        {/* ===== Cards ===== */}
        <div className="mt-10 lg:mt-12 grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 justify-items-center max-w-[1200px] mx-auto">
          {PLANS.map((p) => (
            <div
              key={p.id}
              className={`${p.cardBg} relative w-full max-w-[381.3px] lg:h-[420.51px] rounded-[28px] p-6 lg:p-7 flex flex-col shadow-xl`}
            >
              {p.badge && (
                <span className="absolute top-5 left-6 lg:left-7 bg-[#042C89] text-[#FFDE14] font-['Poppins',sans-serif] font-bold text-[9px] tracking-wide uppercase px-3.5 py-1.5 rounded-full">
                  {p.badge}
                </span>
              )}

              {p.ball && (
                <img
                  src={p.ball}
                  alt=""
                  aria-hidden="true"
                  className="absolute top-4 right-4 w-[64px] lg:w-[76px] h-auto object-contain pointer-events-none select-none"
                />
              )}

              {/* Top content */}
              <div className={p.badge ? 'mt-8 lg:mt-9' : 'mt-8 lg:mt-9'}>
                <p className="font-['Poppins',sans-serif] font-bold text-[#042C89] text-[12px] lg:text-[14px] uppercase">
                  {p.label}
                </p>

                <p
                  translate="no"
                  className="notranslate mt-2 font-['Gasoek_One',sans-serif] text-[#042C89] text-[46px] lg:text-[58px] leading-none"
                >
                  {p.price}
                </p>

                {/* Pill */}
                <span
                  className={`mt-4 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-['Poppins',sans-serif] font-semibold text-[#042C89] text-[12px] lg:text-[13.5px] ${
                    p.pill.white ? 'bg-white' : 'bg-[#F4F6FB]'
                  }`}
                >
                  {p.pill.type === 'duration' && <Clock className="w-3.5 h-3.5 stroke-[2.5]" />}
                  {p.pill.text}
                </span>

                <p className="mt-5 font-['Poppins',sans-serif] text-[#042C89] text-[13px] lg:text-[15px] leading-relaxed">
                  {p.desc}
                </p>
              </div>

              {/* Button */}
              <button
                type="button"
                onClick={handleBook}
                className={`${p.btn} mt-auto w-full inline-flex items-center justify-center gap-2 font-['Poppins',sans-serif] font-bold text-[13px] lg:text-[15px] py-3.5 lg:py-4 rounded-full transition-all duration-200 active:scale-[0.99] cursor-pointer`}
              >
                {p.cta} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* ===== Footnote ===== */}
        <div className="mt-8 text-center font-semibold font-['Poppins',sans-serif]  text-[12px] lg:text-[14px] leading-relaxed">
          <p className='text-[#042C89] '>Blocks are paid upfront. Sessions are booked at times that suit you.</p>
          <p className="italic text-white">Venue hire, food and drinks are not included.</p>
        </div>
      </Container>
    </section>
  );
}

export default Building;