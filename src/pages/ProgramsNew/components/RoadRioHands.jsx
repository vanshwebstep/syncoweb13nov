import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Container } from '../../../components/common/Container';

const BASE = 'https://webstepdev.com/demo/syncoWebsiteImages/roadtorio';
const img = (name, ext = 'png') => `${BASE}/${encodeURIComponent(name)}.${ext}`;

const STEPS = [
  { icon: 'Skilllearnt', text: 'Skill learnt' },
  { icon: 'Staradded', text: 'Star added' },
  { icon: 'PlayerBadgecollected', text: 'Player Badge collected' },
  { icon: 'Nextcity', text: 'Next city, here we come' },
];

export function RoadToRioHandsSection() {
  return (
    <section className="relative bg-[#0A9BE5] pt-8 pb-8 lg:py-20 overflow-hidden font-sans">
      {/* Mobile yellow circle (top right) */}
      <div className="lg:hidden absolute -top-10 -right-8 w-[120px] h-[120px] rounded-full bg-[#FFDE14] pointer-events-none z-0" />

      <Container className="relative z-10 px-5 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* ===== Left: Content ===== */}
          <div>
            <p className="font-['Poppins',sans-serif] font-bold text-[#FFDE14] text-[9px] lg:text-[13px] tracking-[0.06em] uppercase">
              Samba Skills Tracker
            </p>

            <h2 className="mt-1.5 lg:mt-3 leading-[1.1]">
              <span className="block font-['Recline',sans-serif] font-bold text-white lg:text-[#042C89] text-[28px] sm:text-[38px] lg:text-[44px]">
                Their Road to Rio.
              </span>
              <span className="relative inline-block font-['Gasoek_One',sans-serif] text-[#042C89] text-[32px] sm:text-[46px] lg:text-[52px] mt-0.5 lg:mt-1">
                In their hands.
                <img src={img('Swoosh')} alt="" className="absolute left-0 -bottom-1.5 lg:-bottom-2 w-full h-auto pointer-events-none" />
              </span>
            </h2>

            <p className="mt-4 lg:mt-6 max-w-[520px] font-['Poppins',sans-serif] font-medium lg:font-semibold text-white text-[12px] lg:text-[17px] leading-[1.5] lg:leading-relaxed">
              Every child gets their own Skills Tracker, turning their progress into something they can see, collect and take home.
            </p>

            {/* Mobile image (below paragraph, full width) */}
            <div className="lg:hidden mt-5 -mx-5 p-4 w-[calc(100%+2.5rem)]">
              <img
                src={img('SAMBASKILLSTRACKERMOBILE')}
                alt="Child reading the Samba Skills Tracker"
                className="w-full h-auto object-contain"
              />
            </div>

            {/* Steps with vertical connector */}
            <ul className="relative mt-5 lg:mt-7 space-y-3.5 lg:space-y-4 before:content-[''] before:absolute before:left-[14px] lg:before:left-[24px] before:top-[14px] lg:before:top-[24px] before:bottom-[14px] lg:before:bottom-[24px] before:w-px before:bg-white/60">
              {STEPS.map((s) => (
                <li key={s.text} className="relative z-10 flex items-center gap-3 lg:gap-4">
                  <img src={img(s.icon)} alt="" className="w-[28px] h-[28px] lg:w-[48px] lg:h-[48px] object-contain shrink-0" />
                  <span className="font-['Poppins',sans-serif] font-bold text-white text-[12px] lg:text-[17px]">
                    {s.text}
                  </span>
                </li>
              ))}
            </ul>

            {/* QR card */}
            <div className="mt-6 lg:mt-8 max-w-[500px] bg-[#0B84CC] rounded-[12px] lg:rounded-[18px] px-4 lg:px-5 py-3.5 lg:py-4 flex items-center gap-3 lg:gap-4">
              <img src={img('qrimg')} alt="" className="w-[30px] h-[30px] lg:w-[44px] lg:h-[44px] object-contain shrink-0" />
              <div>
                <p className="font-['Poppins',sans-serif] font-bold text-white text-[11px] lg:text-[15px]">
                  Scan a QR tutorial. Practise at home.
                </p>
                <p className="font-['Poppins',sans-serif] text-white/90 text-[10px] lg:text-[13.5px] mt-0.5">
                  Every skill has a video in the Tracker.
                </p>
              </div>
            </div>

            {/* Button */}
            <div className="mt-5 lg:mt-8">
              <Link
                to="#"
                className="flex lg:inline-flex w-full lg:w-auto items-center justify-center gap-2 bg-[#FFDE14] hover:bg-[#f2d100] text-[#042C89] font-['Poppins',sans-serif] font-bold text-[13px] lg:text-[15px] px-7 lg:px-8 py-3.5 rounded-full shadow-md transition-all duration-300 hover:scale-[1.03] active:scale-95 whitespace-nowrap"
              >
                Open a sample Tracker <ArrowRight className="w-4 h-4 lg:w-[18px] lg:h-[18px]" />
              </Link>
            </div>
          </div>

          {/* ===== Right: Photos (desktop only) ===== */}
          <div className="hidden lg:flex justify-end">
            <img
              src={img('SAMBASKILLSTRACKER')}
              alt="Child reading the Samba Skills Tracker"
              className="w-full max-w-[540px] h-auto object-contain drop-shadow-xl"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

export default RoadToRioHandsSection;