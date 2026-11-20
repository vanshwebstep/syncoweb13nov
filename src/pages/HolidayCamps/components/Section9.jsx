import React from 'react';
import { Container } from '../../../components/common/Container';

const BASE = 'https://webstepdev.com/demo/syncoWebsiteImages';
const swoosh = `${BASE}/roadtorio/Swoosh.png`;
const greenBg = `${BASE}/holiday-camps/greenbg.png`;

const levels = [
  {
    level: 1,
    label: 'LEVEL 1',
    title: 'BEGINNER',
    desc: 'Build the foundations. Better first touches, control and core 1v1 skills.',
    img: `${BASE}/holiday-camps/clipimg1.png`,
    color: '#0DD180',
    pillText: 'text-white',
  },
  {
    level: 2,
    label: 'LEVEL 2',
    title: 'INTERMEDIATE',
    desc: 'Sharper footwork, new combinations and more ways to beat a player.',
    img: `${BASE}/holiday-camps/clipimg2.png`,
    color: '#00A6E3',
    pillText: 'text-white',
  },
  {
    level: 3,
    label: 'LEVEL 3',
    title: 'ADVANCED',
    desc: 'More demanding ball mastery, creative combinations and advanced 1v1 moves.',
    img: `${BASE}/holiday-camps/clipimg3.png`,
    color: '#FFDE14',
    pillText: 'text-[#042C89]',
  },
];

export function Section9() {
  return (
    <section
      style={{
        backgroundImage: `url(${greenBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      className="relative w-full overflow-hidden bg-[#0DD180] pt-14 pb-10 sm:py-16 lg:py-[70px]"
    >
      <Container className="relative z-10 w-full text-center px-5 sm:px-6">
        {/* ===== Heading ===== */}
        <p className="poppins font-semibold text-white text-[11px] md:text-[13px] tracking-[0.06em] uppercase">
          Three levels
        </p>

        <h2 className="mt-2 leading-[1.1]">
          <span className="block recline font-bold text-[#042C89] text-[30px] sm:text-[36px] md:text-[44px]">
            The right challenge
          </span>
          <span className="relative inline-block gasoek font-normal text-[#042C89] text-[38px] sm:text-[46px] md:text-[54px] mt-1">
            for their game.
            <img
              src={swoosh}
              alt=""
              aria-hidden="true"
              className="absolute left-0 -bottom-1.5 md:-bottom-2 w-full h-auto pointer-events-none select-none"
            />
          </span>
        </h2>

        {/* Subtitle */}
        <p className="poppins font-bold md:font-medium text-[#042C89] text-[16px] md:text-[18px] leading-[1.5] mx-auto mt-6 md:mt-8 mb-7 md:mb-10 lg:mb-12 max-w-[340px] md:max-w-none">
          <span className="md:hidden">Same Road to Rio. The challenge changes with their ability.</span>
          <span className="hidden md:inline">Every child follows the same Road to Rio. The challenge changes with their ability.</span>
        </p>

        {/* ===== 3 Level Cards ===== */}
        <div className="flex flex-col md:flex-row items-center md:items-stretch justify-center gap-5 md:gap-6 text-left">
          {levels.map((item) => (
            <div
              key={item.title}
              className="w-full md:max-w-[386.7px] bg-white rounded-[22px] md:rounded-[26px] p-3 pb-6 md:pb-7 shadow-[0_6px_20px_rgba(4,44,137,0.12)] flex flex-col"
            >
              {/* Image with coloured bottom border */}
              <div
                className="w-full rounded-[16px] md:rounded-[18px] overflow-hidden bg-white"
                style={{ borderBottom: `6px solid ${item.color}` }}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-[170px] sm:h-[220px] md:h-[240px] object-cover block select-none"
                />
              </div>

              {/* Level pill + dots */}
              <div className="flex items-center justify-between px-2 md:px-3 mt-4 md:mt-5">
                <span
                  className={`poppins font-semibold text-[10px] md:text-[11.5px] uppercase px-3.5 py-1 rounded-full ${item.pillText}`}
                  style={{ backgroundColor: item.color }}
                >
                  {item.label}
                </span>

                <div className="flex items-center gap-1.5">
                  {[1, 2, 3].map((n) => (
                    <span
                      key={n}
                      className="block w-[14px] h-[7px] rounded-full"
                      style={{ backgroundColor: n <= item.level ? item.color : '#E5E7EB' }}
                    />
                  ))}
                </div>
              </div>

              {/* Title & description */}
              <div className="px-2 md:px-3 mt-3 md:mt-4">
                <h3 className="gasoek font-normal uppercase text-[#042C89] text-[24px] md:text-[26px] leading-none tracking-[0.5px] mb-2">
                  {item.title}
                </h3>
                <p className="poppins font-normal text-[#4B5268] text-[15px] leading-[1.5]">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export { Section9 as RightChallengeSection };
export default Section9;