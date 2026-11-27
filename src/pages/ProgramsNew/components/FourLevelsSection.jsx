import React from 'react';
import { Container } from '../../../components/common/Container';
import { useModal } from '../../../context/ModalContext';
import textureBg from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/Four-Levels-2.svg';
import textureBgMobile from 'https://webstepdev.com/demo/syncoWebsiteImages/bluetexturebg.png';
import layer from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/yellow-layer-mobile.png';

import cardImg1 from 'https://webstepdev.com/demo/syncoWebsiteImages/pathway-samba-babies.png';
import cardImg2 from 'https://webstepdev.com/demo/syncoWebsiteImages/pathway-samba-rookies.png';
import cardImg3 from 'https://webstepdev.com/demo/syncoWebsiteImages/pathway-samba-pro.png';
import cardImg4 from 'https://webstepdev.com/demo/syncoWebsiteImages/pathway-samba-stars.png';

export function FourLevelSection() {
  const { openModal } = useModal();

  const cards = [
    {
      title: "BEGINNER",
      titleColor: "text-[#00A6E3]",
      desc: "First touches, core ball mastery and the confidence to take someone on.",
      img: cardImg1,
      borderColor: "border-[#00A6E3]"
    },
    {
      title: "INTERMEDIATE",
      titleColor: "text-[#0DD180]",
      desc: "Sharper footwork, new combinations and a bigger 1v1 toolkit.",
      img: cardImg2,
      borderColor: "border-[#0DD180]"
    },
    {
      title: "ADVANCED",
      titleColor: "text-[#0DD180]",
      desc: "More demanding ball mastery, creative combinations and advanced 1v1 moves.",
      img: cardImg3,
      borderColor: "border-[#0DD180]"
    },
    {
      title: "PRO",
      titleColor: "text-[#00A6E3]",
      desc: "Our toughest skills and 1v1 challenges, built for technically accomplished players.",
      img: cardImg4,
      borderColor: "border-[#FFDE14]"
    }
  ];

  return (
    <section
      className="py-4 md:py-24 pb-[100px] px-2 md:px-0 relative overflow-hidden"

    >

      <img
        src={textureBgMobile}
        alt=""
        aria-hidden="true"
        className="block md:hidden absolute inset-0 w-full h-full object-fill pointer-events-none z-0"
      />

      {/* Desktop background image */}
      <img
        src={textureBg}
        alt=""
        aria-hidden="true"
        className="hidden md:block absolute inset-0 w-full h-full object-cover object-bottom pointer-events-none z-0"
      />


      <Container className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-6 items-start">

          {/* Left Column: Headline, Copy & Cyan Banner Box */}
          <div className="md:col-span-5 lg:col-span-5 space-y-4 lg:space-y-6 pt-6 md:pt-4 lg:pt-10 xl:pt-20">

            {/* Header Title */}
            <div>
              <h3 className="recline font-extrabold text-[61px] sm:text-[44px] md:text-[36px] min-[900px]:text-[46px] lg:text-[54px] xl:text-[66px] 2xl:text-[74px] text-white leading-[0.95] mt-2">
                Four levels
              </h3>
              <h2 className="gasoek text-[61px] sm:text-[42px] md:text-[36px] min-[900px]:text-[46px] lg:text-[54px] xl:text-[66px] 2xl:text-[74px] text-[#0DD180] leading-[0.95]">
                Four roads <br />
                to Rio
              </h2>
            </div>

            <p className="text-white hidden md:block font-bold poppins text-[15px] md:text-[16px] min-[900px]:text-[19px] lg:text-[22px] xl:text-[25px] 2xl:text-[28px] leading-[1.35] pt-1">
              Too easy and children switch off. Too difficult and they can lose belief.
            </p>
            <p className="text-white block md:hidden font-bold poppins text-[17px] sm:text-[20px] leading-[1.4] pt-1">
              Too easy and children switch off. Too difficult and they can lose belief.
            </p>
            <p className="text-white font-medium poppins text-[14px] sm:text-[15px] md:text-[13.5px] min-[900px]:text-[15px] lg:text-[17px] xl:text-[19px] 2xl:text-[20px] leading-relaxed pt-2 lg:pt-3">
              Samba's four levels develop ball <br className="block sm:hidden" /> mastery and <br className="hidden lg:block" /> 1v1 skills progressively, so the challenge grows <br className="hidden lg:block" />as your child's game does.
            </p>

          </div>

          {/* Right Column: 4 Ability Cards Grid (2x2 Grid) */}
          <div className="md:col-span-7 lg:col-span-7 mt-6 md:mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
              {cards.map((card, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-[24px] p-4 lg:p-5 shadow-2xl text-slate-800 space-y-3 relative hover:-translate-y-1.5 transition-all duration-300 border border-slate-100 flex flex-col justify-between"
                >
                  {/* Organic Blob Photo Container */}
                  <div className={`w-full relative`}>
                    <img
                      src={card.img}
                      alt={card.title}
                      className="w-full h-full rounded-xl"
                    />
                  </div>

                  {/* Text Content */}
                  <div className="space-y-1">
                    <h3 className={`gasoek text-[20px] sm:text-[22px] md:text-[20px] min-[900px]:text-[24px] lg:text-[26px] xl:text-[29px] 2xl:text-[32px] ${card.titleColor} uppercase tracking-wider`}>
                      {card.title}
                    </h3>
                    <p className="text-[12.5px] md:text-[12px] min-[900px]:text-[13px] lg:text-[14px] xl:text-[15px] 2xl:text-[16px] poppins font-medium text-[#0F1A2A] leading-[19px] lg:leading-[22px]">
                      {card.desc}
                    </p>
                  </div>

                </div>
              ))}
            </div>
          </div>

        </div>
      </Container>

      <img src={layer} alt="Samba Player" className="absolute bottom-[-8px] md:hidden block left-0 h-[500px] w-[100%]" />

    </section>
  );
}

export default FourLevelSection