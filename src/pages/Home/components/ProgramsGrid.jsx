import React from 'react';
import { Container } from '../../../components/common/Container';

import frameBeginner from 'https://webstepdev.com/demo/syncoWebsiteImages/home/persona-absolute-beginner.png';
import frameObsessive from 'https://webstepdev.com/demo/syncoWebsiteImages/home/persona-football-obsessive.png';
import frameUnconfident from 'https://webstepdev.com/demo/syncoWebsiteImages/home/persona-unconfident-player.png';
import frameExplorer from 'https://webstepdev.com/demo/syncoWebsiteImages/home/persona-screen-free-explorer.png';
import frameQuietLearner from 'https://webstepdev.com/demo/syncoWebsiteImages/home/persona-quiet-learner.png';
import frameSeeker from 'https://webstepdev.com/demo/syncoWebsiteImages/home/persona-skills-seeker.png';
import crown from 'https://webstepdev.com/demo/syncoWebsiteImages/home/crown.png';
import yellow from 'https://webstepdev.com/demo/syncoWebsiteImages/yellowlayer.png';

export function ProgramsGrid() {
  const personas = [
    {
      title: "The complete beginner",
      desc: "They've barely kicked a ball. They just need somewhere to start without feeling behind.",
      textColor: "text-[#042C89]",
      color: "text-white",
      img: frameBeginner
    },
    {
      title: "The football obsessive",
      desc: <>Ball under the arm.<br className="block md:hidden"/> Shirt permanently on.<br/> They need somewhere for that love to go.</>,
      textColor: "text-[#042C89]",
      color: "text-white",
      img: frameUnconfident
    },
    {
      title: "The Unconfident Player",
      desc: "Skills for days at home. Then match day comes and they freeze.",
      textColor: "text-[#0DD180]",
      color: "text-white",
      img: frameExplorer
    },
    {
      title: "The Screen-Time Kid",
      desc: "Screens. Sofa. Repeat. You just want them active, making friends and having fun.",
      textColor: "text-[#FFDE14]",
      color: "text-white",
      img: frameObsessive
    },
    {
      title: "The Stuck Player",
      desc: "They train every week. But are they actually improving?",
      textColor: "text-[#042C89]",
      color: "text-[#042C89]",

      img: frameQuietLearner
    },
    {
      title: "The Skills Seeker",
      desc: <>They can already play. Now they want the <br className='hidden md:block'/> skills that set them apart.</>,
      textColor: "text-[#042C89]",
      color: "text-white",
      img: frameSeeker
    }
  ];

  return (
    <section className="py-8 pb-12 md:py-10 md:pb-12 lg:py-12 lg:pb-12 overflow-hidden">
      <Container>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-10 space-y-3">
          <h2 className="recline font-extrabold text-[43px] sm:text-[74px] md:text-[44px] min-[900px]:text-[50px] lg:text-[52px] xl:text-[74px] text-[#042C89] md:leading-[46px] min-[900px]:leading-[52px] lg:leading-[52px] xl:leading-[65px] leading-[1.2]">
            Every child comes to <br className="hidden sm:inline" />
            football <span className="text-[#0DD180] font-normal tracking-[2%] gasoek relative inline-block">
              differently.
              <img src={yellow} alt="" className="absolute -bottom-6 md:-bottom-6 lg:-bottom-7 right-0 md:left-4 lg:left-6 w-[70%] md:w-[75%] lg:w-[80%] h-5 text-[#FFDE14]" />
            </span>
          </h2>
          <p className="text-[#042C89] poppins font-medium text-[16px] sm:text-[24px] md:text-[18px] min-[900px]:text-[20px] lg:text-[20px] xl:text-[24px] pt-4 md:pt-4 lg:pt-6 xl:pt-10">
            Which one sounds like yours?
          </p>
        </div>

        {/* 6 Persona Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 max-w-[1160px] m-auto lg:grid-cols-3 gap-5 md:gap-3.5 lg:gap-4 xl:gap-6 md:py-3">
          {personas.map((card, idx) => (
            <div
              key={idx}
              className="persona-card rounded-3xl shadow-lg relative overflow-hidden min-h-[280px] sm:min-h-[300px] md:min-h-[260px] min-[900px]:min-h-[280px] lg:min-h-[320px] group hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-start"
            >
              {/* Full Card Background Image */}
              <img
                src={card.img}
                alt={card.title}
                className="persona-card-bg absolute inset-0 w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 pointer-events-none"
              />

              {/* Text Overlay on Left Side */}
              <div className={`persona-card-text relative z-10 ${idx==5 || idx==4 ? "pt-14 md:pt-10 lg:pt-12 xl:pt-14" : "pt-10 md:pt-8 lg:pt-8 xl:pt-[25px]"} p-5 sm:p-6 xl:ps-7 md:p-4 min-[900px]:p-5 lg:p-5 xl:p-8 max-w-[65%] md:max-w-[78%] min-[900px]:max-w-[74%] lg:max-w-[74%] xl:max-w-[64%] ${card.textColor} space-y-2`}>
                <h3 className="gasoek font-normal text-[22px] sm:text-[24px] md:text-[17px] min-[900px]:text-[19px] lg:text-[20px] xl:text-[24px] tracking-[0.5px] xl:tracking-[1px] leading-tight">
                  {card.title}
                </h3>
                <p className={`text-[13px] md:text-[11.5px] min-[900px]:text-[12.5px] lg:text-[13px] xl:text-[14px] poppins ${card.color} font-medium leading-relaxed opacity-95`}>
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Tagline Quote */}
        <div className="mt-10 md:mt-10 lg:mt-12 text-center space-y-1">
          {/* Crown/Sparkle Accent */}
          <div className="inline-flex items-center justify-center w-12 md:w-14 lg:w-16 rounded-full mb-3">
            <img src={crown} alt="" />
          </div>

          <p className="recline text-[16px] md:text-[20px] min-[900px]:text-[22px] lg:text-[24px] font-bold text-[#042C89]">
            Children need different things from football.
          </p>
          <p className="recline text-[16px] md:text-[20px] min-[900px]:text-[22px] lg:text-[24px] italic leading-[1] md:pb-6 lg:pb-8 text-[#00A6E3] font-semibold">
            We’ve built Samba to help them find it.
          </p>
        </div>

      </Container>
    </section>
  );
}
