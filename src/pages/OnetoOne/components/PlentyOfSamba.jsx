import React from 'react';
import { Container } from '../../../components/common/Container';

import game1 from 'https://webstepdev.com/demo/syncoWebsiteImages/one-to-one/game1.png';
import game2 from 'https://webstepdev.com/demo/syncoWebsiteImages/one-to-one/game3.png';
import game3 from 'https://webstepdev.com/demo/syncoWebsiteImages/one-to-one/game2.png';
import game4 from 'https://webstepdev.com/demo/syncoWebsiteImages/one-to-one/game4.png';
import bgTexture from 'https://webstepdev.com/demo/syncoWebsiteImages/texture.png';

const SWOOSH = 'https://webstepdev.com/demo/syncoWebsiteImages/roadtorio/Swoosh.png';

const CARDS = [
  {
    n: 1,
    title: 'Ball mastery',
    desc: 'More touches. Better control. More confidence on the ball.',
    img: game1,
    bg: '#E7FAF2',
  },
  {
    n: 2,
    title: '1v1 movement',
    desc: 'Learn the moves, then learn when and how to use them.',
    img: game2,
    bg: '#E6F4FB',
  },
  {
    n: 3,
    title: 'Technique',
    desc: 'Slow it down. Spot the little details. Get them right.',
    img: game3,
    bg: '#FFF4C2',
  },
  {
    n: 4,
    title: 'Game application',
    desc: 'Take what they’ve learned into real football situations.',
    img: game4,
    bg: '#FFF1E3',
  },
];

export function PlentyOfSamba() {
  return (
    <section
      className="relative overflow-hidden bg-white py-12 sm:py-16 lg:py-24"
      style={{
        backgroundImage: `url(${bgTexture})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Container className="relative z-10">
        {/* ===== Heading ===== */}
        <div className="md:text-center text-left max-w-[760px] mx-auto">
          <h2 className="leading-[1.1]">
            <span className="block font-['Recline',sans-serif] font-bold text-[#042C89] text-[34px] sm:text-[44px] lg:text-[56.96px]">
              Built around
            </span>
            <span className="relative inline-block font-['Gasoek_One',sans-serif] text-[#0DD180] text-[42px] sm:text-[54px] lg:text-[71.2px] mt-1">
              their game.
              <img src={SWOOSH} alt="" aria-hidden="true" className="absolute left-0 -bottom-0 w-full h-auto pointer-events-none select-none" />
            </span>
          </h2>

          <p className="mt-7 font-['Poppins',sans-serif] font-medium text-[#042C89] text-[14px] sm:text-[16px] lg:text-[17px] leading-relaxed max-w-[480px] mx-auto">
            We start with where your child is now, then build each session around what they need next.
          </p>
        </div>

        {/* ===== Cards ===== */}
        <div className="mt-10 lg:mt-14 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5 justify-items-center max-w-[1196px] mx-auto">
          {CARDS.map((c) => (
            <div
              key={c.n}
              className="relative w-full lg:w-[588px] h-[210px] sm:h-[230px] lg:h-[260px] rounded-[24px] overflow-hidden"
              style={{ backgroundColor: c.bg }}
            >
              {/* Text */}
              <div className="relative z-10 h-full flex flex-col justify-center pl-6 sm:pl-8 lg:pl-9 pr-4 max-w-[58%]">
                <span className="w-8 h-8 rounded-full bg-white text-[#042C89] font-['Poppins',sans-serif] font-bold text-[12px] flex items-center justify-center shadow-sm mb-5 absolute top-5 left-6 sm:left-8 lg:top-6 lg:left-9">
                  {c.n}
                </span>
                <h3 className="mt-8 font-['Recline',sans-serif] font-bold text-[#042C89] text-[20px] sm:text-[23px] lg:text-[26px] leading-tight">
                  {c.title}
                </h3>
                <p className="mt-3 font-['Poppins',sans-serif] text-[#34353B] text-[12.5px] sm:text-[14px] lg:text-[15.5px] leading-relaxed">
                  {c.desc}
                </p>
              </div>

              {/* Players image */}
              <img
                src={c.img}
                alt={c.title}
                className="absolute right-0 bottom-0 h-[88%] w-auto max-w-[50%] object-contain object-bottom pointer-events-none select-none"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default PlentyOfSamba;