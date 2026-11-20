import React, { useRef, useState } from 'react';
import { Container } from '../../../components/common/Container';
import textureBg from 'https://webstepdev.com/demo/syncoWebsiteImages/texture.png';

import imgLearn from 'https://webstepdev.com/demo/syncoWebsiteImages/tech1.png';
import imgPractice from 'https://webstepdev.com/demo/syncoWebsiteImages/tech2.png';
import imgMaster from 'https://webstepdev.com/demo/syncoWebsiteImages/tech3.png';
import imgApply from 'https://webstepdev.com/demo/syncoWebsiteImages/tech4.png';
import Rocket from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/Rocketicon.png';
import Cross from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/Cancel.png';

const CARDS = [
  {
    title: 'LEARN',
    desc: <>A new skill every class, broken down step by step by their coach.</>,
    img: imgLearn,
    topSwooshColor: '#00A6E3',
    bottomSwooshColor: '#FFDE14',
  },
  {
    title: 'PRACTICE',
    desc: <>Repeat it. Refine it. Keep going until it starts to click.</>,
    img: imgPractice,
    topSwooshColor: '#FFDE14',
    bottomSwooshColor: '#0DD180',
  },
  {
    title: 'MASTER',
    desc: <>Add pressure. Make decisions. Try it against another player.</>,
    img: imgMaster,
    topSwooshColor: '#FFDE14',
    bottomSwooshColor: '#0DD180',
  },
  {
    title: 'APPLY',
    desc: <>Now it’s game time. The coach steps back and lets them get creative.</>,
    img: imgApply,
    topSwooshColor: '#0DD180',
    bottomSwooshColor: '#FFDE14',
  },
];

export function NewWeekSkillSection() {
  const scrollerRef = useRef(null);
  const [active, setActive] = useState(0);

  // Mobile carousel: scroll position se active dot nikalo
  const handleScroll = () => {
    const el = scrollerRef.current;
    if (!el || !el.firstElementChild) return;
    const step = el.firstElementChild.getBoundingClientRect().width + 16; // card + gap-4
    setActive(Math.min(CARDS.length - 1, Math.max(0, Math.round(el.scrollLeft / step))));
  };

  const goTo = (i) => {
    const el = scrollerRef.current;
    if (!el || !el.children[i]) return;
    el.scrollTo({ left: el.children[i].offsetLeft - el.offsetLeft, behavior: 'smooth' });
  };

  return (
    <section
      className="py-12 sm:py-16 lg:py-20 bg-white text-slate-800 relative overflow-hidden font-sans"
      style={{
        backgroundImage: `url(${textureBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'multiply',
      }}
    >
      <Container className="relative z-10">
        <div className="flex md:flex-row flex-col justify-between gap-8 lg:gap-10 xl:gap-12 items-start">
          {/* ===== Left ===== */}
          <div className="w-full md:w-[42%] lg:w-[40%] space-y-4 md:space-y-4 lg:space-y-6 md:mt-4 lg:mt-10 xl:mt-16">
            {/* Header Titles */}
            <div>
              <h2 className="recline text-[34px] sm:text-[48px] md:text-[48px] min-[900px]:text-[48px] lg:text-[48px] xl:text-[52px] text-[#042C89] leading-[1.05] sm:leading-[0.95]">
                Every week a new{' '}
                <span className="gasoek md:block text-[34px] sm:text-[48px] md:text-[48px] min-[900px]:text-[44px] lg:text-[50px] xl:text-[56px] font-normal text-[#0DD180] leading-[1.05] sm:leading-[0.95] mt-1">
                  skill to master
                </span>
              </h2>
            </div>

            {/* No-list */}
            <ul className="text-[#042C89] poppins font-semibold text-[15px] sm:text-[16px] md:text-[14px] min-[900px]:text-[16px] lg:text-[18px] xl:text-[20px] leading-relaxed max-w-md lg:pt-2">
              <li className="flex items-center gap-2 sm:gap-[5px]">
                <img src={Cross} alt="" className="max-w-[13px] sm:max-w-[20px]" />
                No standing around.
              </li>
              <li className="flex items-center gap-2 sm:gap-[5px]">
                <img src={Cross} alt="" className="max-w-[13px] sm:max-w-[20px]" />
                No endless drills.
              </li>
            </ul>

            {/* Rocket box */}
            <div className="poppins text-[#042C89] font-semibold flex items-center bg-[#0dd1802e] gap-3 lg:gap-4 px-4 py-3 sm:p-[8px] md:p-[10px] text-[15px] sm:text-[16px] md:text-[13.5px] min-[900px]:text-[16px] lg:text-[18px] xl:text-[20px] rounded-[20px]">
              <img src={Rocket} className="max-w-[30px] sm:max-w-[40px] lg:max-w-[45px]" alt="" />
              <span>
                More touches. <br className="sm:hidden block" /> More learning. <br /> More mastery.
              </span>
            </div>
          </div>

          {/* ===== Right: mobile = swipe carousel, sm+ = 2x2 grid ===== */}
          <div className="w-full md:w-[58%] lg:w-[60%]">
            <div
              ref={scrollerRef}
              onScroll={handleScroll}
              className="
                flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-pl-4 pb-4 -mx-4 px-4
                [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
                sm:mx-0 sm:px-0 sm:pb-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:max-w-[691px] lg:gap-6
              "
            >
              {CARDS.map((card) => (
                <div
                  key={card.title}
                  className="bg-[#042C89] rounded-[22px] overflow-hidden shadow-2xl text-white relative flex flex-col hover:-translate-y-1.5 transition-all duration-300 group shrink-0 snap-start w-[78%] sm:w-auto"
                >
                  {/* Photo */}
                  <div className="relative w-full overflow-hidden shrink-0">
                    <img
                      src={card.img}
                      alt={card.title}
                      className="w-full aspect-[2.1] sm:aspect-[1.7] object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Top-right corner swoosh */}
                    <svg
                      className="absolute top-0 right-0 w-[7rem] h-[7rem] lg:w-[8rem] lg:h-[8rem] pointer-events-none z-10"
                      viewBox="0 0 120 120"
                      fill="none"
                    >
                      <path d="M 35 0 C 65 15, 95 45, 120 75 L 120 0 Z" fill={card.topSwooshColor} />
                    </svg>
                  </div>

                  {/* Text */}
                  <div className="px-5 lg:px-6 pt-4 sm:pt-5 pb-7 lg:pb-8 relative z-10 flex-1">
                    <h3 className="gasoek text-[20px] lg:text-[24px] text-white tracking-wide">{card.title}</h3>
                    <p className="poppins mt-2 text-[12px] lg:text-[13.5px] font-medium text-white leading-snug max-w-[170px] sm:max-w-[210px]">
                      {card.desc}
                    </p>
                  </div>

                  {/* Bottom-right swoosh */}
                  <svg
                    className="absolute bottom-0 -right-[1px] w-full h-[110px] lg:h-[130px] pointer-events-none z-0"
                    viewBox="0 0 340 140"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path d="M 140 140 C 220 95, 275 46, 340 46 L 340 140 Z" fill={card.bottomSwooshColor} />
                  </svg>
                </div>
              ))}
            </div>

            {/* Dots (mobile only) */}
            <div className="mt-3 flex items-center justify-center gap-1.5 sm:hidden">
              {CARDS.map((card, i) => (
                <button
                  key={card.title}
                  type="button"
                  aria-label={`Go to ${card.title}`}
                  onClick={() => goTo(i)}
                  className={`h-[6px] rounded-full transition-all duration-300 ${active === i ? 'w-[22px] bg-[#0DD180]' : 'w-[6px] bg-[#D5DAE5]'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default NewWeekSkillSection;