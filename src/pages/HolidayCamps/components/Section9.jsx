import React from 'react';
import { Container } from '../../../components/common/Container';
import fourDayBanner from 'https://webstepdev.com/demo/syncoWebsiteImages/texture.png';
import beginnerImg from 'https://webstepdev.com/demo/syncoWebsiteImages/holiday-camps/beginer.png';
import intermediateImg from 'https://webstepdev.com/demo/syncoWebsiteImages/holiday-camps/intermadiate.png';
import advancedImg from 'https://webstepdev.com/demo/syncoWebsiteImages/holiday-camps/advanced.png';

export function Section9() {
  const levels = [
    {
      title: 'BEGINNER',
      desc: <>Build the foundations. Better first <br className="hidden lg:block" /> touches, control and core 1v1 skills.</>,
      img: beginnerImg,
    },
    {
      title: 'INTERMEDIATE',
      desc: <>Sharper footwork, new combinations<br className="hidden lg:block" /> and more ways to beat a player.</>,
      img: intermediateImg,
    },
    {
      title: 'ADVANCED',
      desc: <>More demanding ball mastery, creative combinations and advanced 1v1 moves.</>,
      img: advancedImg,
    },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-white py-16 sm:py-18">
      {/* Pattern Background */}
      <img
        src={fourDayBanner}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover  pointer-events-none select-none "
      />

      <Container className="relative z-10 w-full text-center">
        {/* Heading */}
        <h2 className="recline  text-[40px] sm:text-[48px] xl:text-[64px] 2xl:text-[74px] leading-[1.04] mb-6  md:mb-8">
          <span className="text-[#042C89]">The right </span>
          <span className="text-[#00A6E3] gasoek">challenge </span> <br className="block" />
          <span className="text-[#042C89]">for their game.</span>
        </h2>

        {/* Subtitle */}
        <p className="poppins text-[#475569] text-[14px] xl:text-[18px] 2xl:text-[20px] mx-auto md:mb-12 mb-8 ">
          Every child follows the same Road to Rio, but the football changes with their ability.</p>

        {/* 3 Level Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8  items-stretch mx-auto text-left">
          {levels.map((level, idx) => (
            <div
              key={idx}
              className="bg-white rounded-[26px] border-l-[4px]  border-r-[10px] border-b-[10px] border-t-[4px] border-[#00A3E0] px-5 py-4  flex flex-col lg:justify-between group transition-all duration-300  hover:-translate-y-1.5"
            >
              {/* Image Window */}
              <div className="w-full  lg:h-[220px] flex items-center justify-center lg:mb-6">
                <img
                  src={level.img}
                  alt={level.title}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300 select-none"
                />
              </div>

              {/* Title & Description */}
              <div className="md:mt-6">
                <h3 className="gasoek uppercase text-2xl md:text-[18px] lg:text-[30px] xl:text-[28px] 2xl:text-[32px] text-[#00A6E3] lg:mb-4 mb-2 tracking-[1px]">
                  {level.title}
                </h3>
                <p className="poppins text-[#0F1A2A] text-[13px] lg:text-[16px] font-medium md:leading-[24px]">
                  {level.desc}
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
