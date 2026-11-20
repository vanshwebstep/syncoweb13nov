import React from 'react';
import { Container } from '../../../components/common/Container';

const BASE = 'https://webstepdev.com/demo/syncoWebsiteImages/roadtorio';
const img = (name, ext = 'png') => `${BASE}/${encodeURIComponent(name)}.${ext}`;

const WEEKS = [1, 2, 3, 4, 5];

export function ShowcaseWeek() {
  return (
    <section className="relative bg-white py-14 lg:py-20 overflow-hidden font-sans">
      <Container className="relative">
        {/* ===== Heading ===== */}
        <div className="text-center">
          <p className="font-['Poppins',sans-serif] font-semibold text-[#00A6E3] text-[11px] lg:text-[13px] tracking-[0.06em] uppercase">
            How each stop works
          </p>
          <h2 className="mt-3 font-['Recline',sans-serif] font-bold text-[#042C89] text-[30px] sm:text-[36px] lg:text-[40px] leading-[1.1]">
            Five weeks to learn.
          </h2>
          <span className="relative inline-block font-['Gasoek_One',sans-serif] text-[#0DD180] text-[36px] sm:text-[44px] lg:text-[50px] leading-[1.15] mt-1">
            One week to shine.
            <img src={img('Swoosh')} alt="" className="absolute left-0 -bottom-1 w-full h-auto pointer-events-none" />
          </span>
          <p className="mt-5 font-['Poppins',sans-serif] text-[#34353B] text-[14px] lg:text-[17px]">
            Every stop on the Road to Rio ends with Showcase Week.
          </p>
        </div>

        {/* ===== Timeline + Cards ===== */}
        <div className="mt-10 lg:mt-14 lg:pr-[300px] xl:pr-[340px]">
          {/* Timeline */}
          <div className="flex items-start justify-between overflow-x-auto no-scrollbar pb-2">
            {WEEKS.map((w) => (
              <React.Fragment key={w}>
                <div className="flex flex-col items-center shrink-0 w-[40px] lg:w-[56px]">
                  <span className="h-5 mb-2 flex items-end font-['Poppins',sans-serif] font-semibold text-[#00A6E3] text-[10px] lg:text-[13px] uppercase whitespace-nowrap">
                    Week {w}
                  </span>
                  <div className="h-[60px] lg:h-[88px] flex items-center justify-center">
                    <img src={img('footballimg')} alt="" className="w-[40px] h-[40px] lg:w-[56px] lg:h-[56px] object-contain" />
                  </div>
                  <span className="mt-2 font-['Poppins',sans-serif] font-bold text-[#042C89] text-[11px] lg:text-[14px] whitespace-nowrap">
                    Skill {w}
                  </span>
                </div>
                {/* connector */}
                <div
                  className={`flex-1 min-w-[12px] mt-[56px] lg:mt-[70px] border-t-[3px] ${
                    w === 5 ? 'border-dotted border-[#C9D3F0]' : 'border-solid border-[#042C89]'
                  }`}
                />
              </React.Fragment>
            ))}

            {/* Week 6 */}
            <div className="flex flex-col items-center shrink-0 w-[60px] lg:w-[88px]">
              <span className="h-5 mb-2 flex items-end font-['Poppins',sans-serif] font-semibold text-[#00A6E3] text-[10px] lg:text-[13px] uppercase whitespace-nowrap">
                Week 6
              </span>
              <div className="h-[60px] lg:h-[88px] flex items-center justify-center">
                <img src={img('trophyimg')} alt="" className="w-[60px] h-[60px] lg:w-[88px] lg:h-[88px] object-contain" />
              </div>
              <span className="mt-2 font-['Poppins',sans-serif] font-bold text-[#042C89] text-[11px] lg:text-[14px] whitespace-nowrap">
                Showcase
              </span>
            </div>
          </div>

          {/* Label */}
          <p className="mt-8 lg:mt-10 font-['Poppins',sans-serif] font-semibold text-[#00A6E3] text-[11px] lg:text-[12px] tracking-[0.06em] uppercase">
            What happens in Showcase Week
          </p>

          {/* Cards */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#042C89] rounded-[22px] p-5 lg:p-6">
              <div className="flex items-center gap-3">
                <img src={img('starimg')} alt="" className="w-[48px] h-[48px] object-contain shrink-0" />
                <h3 className="font-['Poppins',sans-serif] font-bold text-white text-[15px] lg:text-[17px] leading-tight">
                  Skills Showcase + 1v1 Showdown
                </h3>
              </div>
              <p className="mt-4 font-['Poppins',sans-serif] text-[#C9D3F0] text-[13px] lg:text-[15px] leading-relaxed">
                Children put their new skills into play in front of their coach and team.
              </p>
            </div>

            <div className="bg-[#FFDE14] rounded-[22px] p-5 lg:p-6">
              <div className="flex items-center gap-3">
                <img src={img('ShowcaseCeremony')} alt="" className="w-[48px] h-[48px] object-contain shrink-0" />
                <h3 className="font-['Poppins',sans-serif] font-bold text-[#042C89] text-[15px] lg:text-[17px] leading-tight">
                  Showcase Ceremony
                </h3>
              </div>
              <p className="mt-4 font-['Poppins',sans-serif] text-[#3B3A1E] text-[13px] lg:text-[15px] leading-relaxed">
                They celebrate their progress, earn their Player Badge and move one step closer to Rio.
              </p>
            </div>
          </div>
        </div>

        {/* ===== Island ===== */}
        <img
          src={img('Road to Rio island')}
          alt="Road to Rio island"
          className="md:block hidden mx-auto mt-8 w-[220px] sm:w-[240px] lg:mx-0 lg:mt-0 lg:absolute lg:right-0 lg:bottom-[-20px] lg:w-[250px] xl:w-[280px] h-auto object-contain pointer-events-none"
        />
      </Container>
    </section>
  );
}

export default ShowcaseWeek;