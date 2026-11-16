import React from 'react';
import { Container } from '../../../components/common/Container';
import { useModal } from '../../../context/ModalContext';
import textureBg from 'https://webstepdev.com/demo/syncoWebsiteImages/bluetexturedbg.png';
import textureBgMobile from 'https://webstepdev.com/demo/syncoWebsiteImages/bluetexturebg.png';

import cardImg1 from 'https://webstepdev.com/demo/syncoWebsiteImages/one-to-one/diff1.png';
import cardImg2 from 'https://webstepdev.com/demo/syncoWebsiteImages/one-to-one/diff2.png';
import cardImg3 from 'https://webstepdev.com/demo/syncoWebsiteImages/one-to-one/diff3.png';
import cardImg4 from 'https://webstepdev.com/demo/syncoWebsiteImages/one-to-one/diff4.png';

export function FourLevelSection() {
  const { openModal } = useModal();

  const cards = [
    {
      title: "They've got potential",
      desc: <>You can see there's more in them. <br/> They just need the individual attention<br className='block md:hidden'/> to bring it out.</>,
      img: cardImg1,
    },
    {
      title: "They're just beginning",
      desc: <>They're new to football and need time <br className='md:block hidden'/> to learn the basics, build confidence and get comfortable with the ball.</>,
      img: cardImg2,
    },
    {
      title: "Something isn't clicking",
      desc: "Maybe it's their first touch, weaker foot, taking players on or confidence on the ball. We can focus on exactly what they need.",
      img: cardImg3,
    },
    {
      title: "They just can't get enough",
      desc: <>Football before school. Football after school. Football in the garden. They just want more <br className='block md:hidden'/>time with a ball at their feet.</>,
      img: cardImg4,
    },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20  relative overflow-hidden">
      {/* Background for Mobile & Desktop */}
      <img
        src={textureBg}
        alt=""
        aria-hidden="true"
        className="block md:hidden absolute inset-0 w-full h-full object-cover object-top pointer-events-none z-0"
      />
      <img
        src={textureBg}
        alt=""
        aria-hidden="true"
        className="hidden md:block absolute inset-0 w-full h-full object-cover object-top pointer-events-none z-0"
      />

      <Container className="relative z-10">
        {/* Main Heading */}
        <div className="text-center mb-8 sm:mb-10 md:mb-14">
          <h2 className="gasoek leading-[1.2] md:leading-[1.25] lg:leading-[1.4] text-[24px] xs:text-[34px] sm:text-[48px] md:text-[42px] lg:text-[56px]">
            <span style={{ color: '#0DD180' }} className="block">
              Different starting points.
            </span>
            <span style={{ color: '#fff' }} className="block text-[30px] md:mt-0 mt-3 md:text-[42px] lg:text-[56px]">
              <span className="block md:inline ">Same individual </span>
              <span className="block md:inline">attention.</span>
            </span>
          </h2>
        </div>

        {/* Grid: 1 column vertical cards on mobile, 2x2 horizontal cards on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-3.5 lg:gap-5 max-w-[340px] xs:max-w-[380px] sm:max-w-[480px] md:max-w-[1085px] mx-auto">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="bg-white rounded-[20px] p-3.5 sm:p-4 md:p-3.5 lg:p-5 shadow-xl flex flex-col md:flex-row items-start gap-3 sm:gap-3.5 md:gap-3 lg:gap-4"
            >
              <img
                src={card.img}
                alt={card.title}
                className="w-full h-[135px] xs:h-[150px] sm:h-[180px] md:w-[130px] md:h-[130px] md:min-h-[130px] lg:w-[183px] lg:min-h-[153px] lg:h-auto object-cover rounded-[14px] sm:rounded-[16px] md:rounded-[18px] lg:rounded-[24px] flex-shrink-0"
              />
              <div className="w-full text-left px-0.5 mt-3 md:mt-0 sm:px-1 md:px-0">
                <h3
                  className="recline font-bold mb-1.5 md:mb-1 text-[19px] xs:text-[21px] sm:text-[22px] md:text-[18px] lg:text-[24px] leading-tight"
                  style={{ color: '#00A6E3' }}
                >
                  {card.title}
                </h3>
                <p
                  className="poppins leading-[1.5] md:leading-snug lg:leading-relaxed font-medium text-[12.5px] xs:text-[13px] sm:text-[13.5px] md:text-[12.5px] lg:text-[14px]"
                  style={{ color: '#475569' }}
                >
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default FourLevelSection;