import React from 'react';
import { Container } from '../../../components/common/Container';

const BASE = 'https://webstepdev.com/demo/syncoWebsiteImages';
const mapbg = `${BASE}/holiday-camps/map_bg.png`;
const rioMapImg = `${BASE}/road-to-rio-map-mobile.png`;
const arrow = `${BASE}/arrow-right.png`;
const swoosh = 'https://webstepdev.com/demo/syncoWebsiteImages/roadtorio/Swoosh.png';

const STEPS = [
  { icon: `${BASE}/skill.png`, label: ['Learn', 'a new skill'] },
  { icon: `${BASE}/skill2.png`, label: ['Earn', 'the sticker'] },
  { icon: `${BASE}/skill3.png`, label: ['Add it', 'to the map'] },
  { icon: `${BASE}/skill4.png`, label: ['Keep', 'moving'] },
];

export function Section5() {
  return (
    <section className="relative z-0 w-full overflow-hidden pt-8 pb-10 sm:py-16 lg:py-20">
      {/* Background (sea) */}
      <img
        src={mapbg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none z-0"
      />

      <Container className="relative z-10 w-full px-5 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">
          {/* ===== Left (mobile: flex column with custom order) ===== */}
          <div className="lg:col-span-7 flex flex-col text-center lg:text-left">
            {/* Heading */}
            <div className="order-1">
              <p className="font-['Poppins',sans-serif] font-bold text-white lg:text-[#00A6E3] text-[12px] lg:text-[17.6px] tracking-[0.04em] uppercase">
                The Road to Rio Map
              </p>

              <h2 className="mt-2 lg:mt-3 leading-[1.1]">
                <span className="block font-['Recline',sans-serif] font-bold text-[#042C89] text-[34px] sm:text-[44px] lg:text-[59.57px]">
                  Watch their
                </span>
                <span className="relative inline-block font-['Gasoek_One',sans-serif] text-[#042C89] text-[38px] sm:text-[50px] lg:text-[73.11px] mt-1">
                  journey fill up.
                  <img src={swoosh} alt="" aria-hidden="true" className="absolute left-0 -bottom-1.5 lg:-bottom-2 w-full h-auto pointer-events-none select-none" />
                </span>
              </h2>
            </div>

            {/* Map (mobile only, heading ke neeche) */}
            <div className="order-2 lg:hidden mt-5 -mx-2">
              <img
                src={rioMapImg}
                alt="Road to Rio Map illustration"
                className="w-full h-auto object-contain drop-shadow-2xl select-none"
              />
            </div>

            {/* Paragraph 1 (desktop: heading ke baad, mobile: steps ke baad) */}
            <p className="order-4 lg:order-3 mt-6 lg:mt-8 max-w-[640px] mx-auto lg:mx-0 font-['Poppins',sans-serif] font-bold text-[#042C89] lg:text-white text-[14px] sm:text-[16px] lg:text-[18px] leading-relaxed">
              Every child gets their own fold-out Road to Rio Map. As they learn new skills and make their way through
              Brazil, they collect stickers and add them to their map.
            </p>

            {/* Steps: mobile = 4 separate white cards, sm+ = yellow box */}
            <div className="order-3 lg:order-4 mt-5 lg:mt-6 w-full lg:w-[615px] sm:bg-[#FFDE14] sm:rounded-[24px] sm:p-5 sm:shadow-lg">
              <div className="grid grid-cols-4 gap-2 sm:gap-0 sm:flex sm:items-center sm:justify-between">
                {STEPS.map((s, i) => (
                  <React.Fragment key={s.icon}>
                    <div className="relative w-full sm:w-[119.94px] shrink-0 min-h-[105px] bg-white rounded-[12px] sm:rounded-[14px] px-1.5 sm:px-3.5 py-3 sm:py-3.5 flex flex-col items-center sm:items-start justify-between text-center sm:text-left shadow-md sm:shadow-none">
                      <img src={s.icon} alt="" className="w-[40px] h-[40px] object-contain" />
                      <span className="mt-2 block font-['Poppins',sans-serif] font-extrabold text-[#042C89] text-[12px] lg:text-[13px] leading-tight">
                        {s.label[0]}
                        <br />
                        <span className="font-medium text-[#797A88] sm:font-extrabold sm:text-[#042C89]">{s.label[1]}</span>
                      </span>
                    </div>
                    {i < STEPS.length - 1 && (
                      <img
                        src={arrow}
                        alt=""
                        aria-hidden="true"
                        className="hidden sm:block w-[18px] h-auto shrink-0"
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <p className="md:block hidden order-5 mt-6 max-w-[620px] mx-auto lg:mx-0 font-['Poppins',sans-serif] font-medium text-white text-[13px] sm:text-[14px] lg:text-[16px] leading-relaxed">
              And there’s more to play for. Each group has a Player of the Day, celebrating effort, attitude and teamwork.
            </p>

            <p className="md:block hidden order-6 mt-4 font-['Poppins',sans-serif] font-extrabold text-white text-[17px] sm:text-[19px] lg:text-[22px]">
              Day after day, Rio gets a little closer.
            </p>
          </div>

          {/* ===== Right: Map (desktop only) ===== */}
          <div className="hidden lg:flex lg:col-span-5 justify-end">
            <img
              src={rioMapImg}
              alt="Road to Rio Map illustration"
              className="w-full max-w-[560px] h-auto object-contain drop-shadow-2xl select-none"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

export { Section5 as WatchJourneySection };
export default Section5;