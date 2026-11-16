import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../../../components/common/Container';
import { useModal } from '../../../context/ModalContext';

import texture1 from 'https://webstepdev.com/demo/syncoWebsiteImages/home/four-levels.png';
import texture1Mobile from 'https://webstepdev.com/demo/syncoWebsiteImages/home/four-levels-mobile.png';
import vectorBall from 'https://webstepdev.com/demo/syncoWebsiteImages/home/ball.png';
import vectorBallMobile from 'https://webstepdev.com/demo/syncoWebsiteImages/home/ball-mobile.png';

import beginnerImg from 'https://webstepdev.com/demo/syncoWebsiteImages/pathway-samba-babies.png';
import intermediateImg from 'https://webstepdev.com/demo/syncoWebsiteImages/pathway-samba-rookies.png';
import advancedImg from 'https://webstepdev.com/demo/syncoWebsiteImages/pathway-samba-pro.png';
import proImg from 'https://webstepdev.com/demo/syncoWebsiteImages/pathway-samba-stars.png';
import vector from 'https://webstepdev.com/demo/syncoWebsiteImages/Vector-3.png';

export function PathwaySection() {
  const { openModal } = useModal();

  const pathways = [
    {
      title: "BEGINNER",
      titleColor: "text-[#00A6E3]",
      desc: "First touches, core ball mastery and the confidence to take someone on.",
      img: beginnerImg
    },
    {
      title: "INTERMEDIATE",
      titleColor: "text-[#0DD180]",
      desc: "Sharper footwork, new combinations and a bigger 1v1 toolkit.",
      img: intermediateImg
    },
    {
      title: "ADVANCED",
      titleColor: "text-[#0DD180]",
      desc: "More demanding ball mastery, creative combinations and advanced 1v1 moves.",
      img: advancedImg
    },
    {
      title: "PRO",
      titleColor: "text-[#00A6E3]",
      desc: "Our toughest skills and 1v1 challenges, built for technically accomplished players.",
      img: proImg
    }
  ];

  return (
    <section 
      className="md:py-14 lg:py-20 py-12 px-4 sm:px-6 lg:px-8 xl:px-8 2xl:px-0 text-white relative overflow-hidden font-sans bg-[#042C89]"
    >
      {/* Mobile background image */}
      <img 
        src={texture1Mobile} 
        alt="" 
        aria-hidden="true" 
        className="block md:hidden absolute inset-0 w-full h-full object-cover object-top pointer-events-none z-0" 
      />

      {/* Desktop background image */}
      <img 
        src={texture1} 
        alt="" 
        aria-hidden="true" 
        className="hidden md:block absolute inset-0 w-full h-full object-cover object-bottom pointer-events-none z-0" 
      />

      {/* Flying Football Accent Graphic */}
      <div className="pathway-flying-ball md:absolute bottom-[12rem] xl:left-[8rem] lg:left-[6rem] left-[3rem] z-10 hidden md:block w-[250px] h-auto pointer-events-none">
        <img src={vectorBall} alt="Flying football" className="w-full h-auto drop-shadow-lg" />
      </div>
      <div className="relative z-10 w-[200px] h-auto pointer-events-none block md:hidden">
        <img src={vectorBallMobile} alt="Flying football" className="w-full h-auto drop-shadow-lg" />
      </div>

      <Container className="relative z-10">
        
        {/* Main Grid Layout: Left Description + Right 2x2 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-4 lg:gap-6 xl:gap-8 2xl:gap-10 items-top mb-8">
          
          {/* Left Text Column */}
          <div className="md:col-span-5 space-y-4 md:space-y-4 lg:space-y-6 md:mt-6 lg:mt-16 mt-10">
            <h2 className="recline text-[55px] sm:text-[74px] md:text-[38px] min-[900px]:text-[44px] lg:text-[50px] xl:text-[66px] 2xl:text-[74px] text-white leading-[1.05]">
              Every <br className='hidden md:block'/>
              child starts <br />
              <span className="gasoek text-[#0DD180] text-[45px] sm:text-[74px] md:text-[38px] min-[900px]:text-[44px] lg:text-[50px] xl:text-[66px] 2xl:text-[74px] relative inline-block">
                somewhere

                <img src={vector} alt="" className="absolute -bottom-6 md:-bottom-5 lg:-bottom-7 md:-rotate-[2deg] right-0 md:left-4 lg:left-10 w-[70%] md:w-[75%] lg:w-[80%] h-4 md:h-4 lg:h-5 text-[#FFDE14]" />
              </span>
            </h2>

            <div className="space-y-2 md:space-y-2 lg:space-y-3 md:pt-4 lg:pt-10 pt-5">
              <h3 className="text-white poppins font-bold text-[24px] md:text-[17px] min-[900px]:text-[19px] lg:text-[22px] xl:text-[26px] 2xl:text-[28px] leading-snug">
                And the right place <br className='md:hidden block'/> to start isn't always obvious.
              </h3>
              <p className="text-slate-200 font-medium text-[16px] md:text-[12.5px] min-[900px]:text-[13.5px] lg:text-[15px] xl:text-[18px] 2xl:text-[20px] poppins leading-[20px] md:leading-[19px] lg:leading-[26px] xl:leading-[28px] 2xl:leading-[30px]">
                That's why Samba has four ability levels, each built to challenge children without leaving <br className='hidden lg:block'/> them overwhelmed.
              </p>
            </div>
          </div>

          {/* Right 2x2 Cards Grid */}
          <div className="md:col-span-7 min-w-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 md:gap-3 lg:gap-4 xl:gap-4.5 2xl:gap-5">
              {pathways.map((card, idx) => (
                <div 
                  key={idx} 
                  className="bg-white text-slate-800 rounded-3xl md:rounded-2xl lg:rounded-3xl p-4 md:p-3 lg:p-4 xl:p-4.5 2xl:p-5 shadow-xl space-y-2.5 md:space-y-2 lg:space-y-3 border border-slate-100 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-w-0"
                >
                  {/* Photo Frame Container displaying full Blob Frame image */}
                  <div className="w-full flex items-center justify-center overflow-hidden">
                    <img 
                      src={card.img} 
                      alt={card.title} 
                      className="w-full h-full object-contain hover:scale-105 transition-transform duration-300" 
                    />
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1 md:space-y-1 lg:space-y-1.5 pt-1 min-w-0">
                    <h3 className={`gasoek font-normal text-[26px] md:text-[18px] min-[900px]:text-[20px] lg:text-[20px] xl:text-[28px] 2xl:text-[32px] ${card.titleColor} tracking-[0.5px] uppercase truncate`}>
                      {card.title}
                    </h3>
                    <p className="text-[13.5px] md:text-[11px] min-[900px]:text-[12px] lg:text-[13px] xl:text-[14px] 2xl:text-[16px] text-[#0F1A2A] poppins font-medium leading-relaxed md:leading-[16px] lg:leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#00A6E3] md:rounded-[22px] lg:rounded-full rounded-[30px] px-4 md:px-3.5 lg:px-6 xl:px-8 py-3.5 md:py-3 lg:py-3.5 sm:py-5 mt-5 md:mt-4 lg:mt-6 xl:mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 md:gap-2.5 lg:gap-3 xl:gap-4 shadow-2xl">
              <div className="text-left space-y-0.5 flex-1 min-w-0">
                <h4 className="font-bold poppins text-[18px] md:text-[13px] min-[900px]:text-[15px] lg:text-[17px] xl:text-[20px] 2xl:text-[22px] text-white">
                  Not sure where your child fits?
                </h4>
                <p className="text-[14px] md:text-[11px] min-[900px]:text-[12px] lg:text-[13px] xl:text-[15px] 2xl:text-[16px] poppins text-white font-medium">
                  Neither are we — until we've seen them play.
                </p>
              </div>

              <Link
                to="/book-trial"
                className="bg-[#FFDE14] w-max hover:bg-[#ebd000] text-[#06337a] font-bold text-[13px] md:text-[11px] min-[900px]:text-[12px] lg:text-[14px] xl:text-[15px] 2xl:text-[16px] px-4 md:px-3 lg:px-5 xl:px-5 2xl:px-6 py-2.5 md:py-2 lg:py-3 xl:py-3.5 2xl:py-4 poppins rounded-full shadow-md transition-all shrink-0 cursor-pointer block text-center"
              >
                Book a FREE trial session
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom CTA Banner (Cyan Pill) */}
      

      </Container>
    </section>
  );
}
