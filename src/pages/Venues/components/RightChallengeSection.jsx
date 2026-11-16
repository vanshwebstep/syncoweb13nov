import React from 'react';
import { Container } from '../../../components/common/Container';
import { useModal } from '../../../context/ModalContext';
import textureBg from 'https://webstepdev.com/demo/syncoWebsiteImages/venues/four-level.png';

import cardImg1 from 'https://webstepdev.com/demo/syncoWebsiteImages/venues/playing.png';
import cardImg2 from 'https://webstepdev.com/demo/syncoWebsiteImages/pathway-samba-rookies.png';
import cardImg3 from 'https://webstepdev.com/demo/syncoWebsiteImages/venues/picture_10.png';
import cardImg4 from 'https://webstepdev.com/demo/syncoWebsiteImages/venues/playing4.png';

export function RightChallengeSection() {
  const { openModal } = useModal();

  const cards = [
    {
      title: "BEGINNER",
      titleColor: "text-[#00A6E3]",
      desc: "Build the foundations. First touches, control and core 1v1 skills.",
      img: cardImg1,
      borderColor: "border-[#00A6E3]"
    },
    {
      title: "INTERMEDIATE",
      titleColor: "text-[#0DD180]",
      desc: "Sharper footwork, new combinations and more ways to beat a player.",
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
      desc: "Our toughest technical skills and 1v1 challenges.",
      img: cardImg4,
      borderColor: "border-[#FFDE14]"
    }
  ];

  return (
    <section
      className="py-16 sm:py-24 relative overflow-hidden"
      style={{
        backgroundImage: `url(${textureBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'bottom',
        backgroundBlendMode: 'soft-light'
      }}
    >

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">

          {/* Left Column: Headline, Copy & Cyan Banner Box */}
          <div className="lg:col-span-5 space-y-6">

            {/* Header Title */}
            <div>
              <h2 className="gasoek text-4xl sm:text-[74px] text-[#FFDE14]  leading-[0.95]">
                The right <br />
                challenge
              </h2>
              <h3 className="recline font-extrabold text-3xl sm:text-[74px] text-white  leading-tight mt-2">
                at every stage
              </h3>
            </div>

            {/* Paragraph Copy */}
            <p className="text-white font-semibold poppins text-sm sm:text-[24px] leading-relaxed max-w-lg pt-1">
              Four levels. Four progressive ball <br />
              mastery systems. New skills and bigger challenges as their game develops.
            </p>

            {/* Cyan Banner Container Box */}
            <div className="bg-[#00A6E3] rounded-3xl poppins p-5 sm:p-6 shadow-2xl border border-white/20 max-w-md mt-6 text-white space-y-2">
              <h4 className="font-bold text-base sm:text-[22px] text-white block">
                Not sure where your child fits?
              </h4>
              <p className="text-xs sm:text-[16px] font-medium text-white block">
                Neither are we — until we’ve seen them play.
              </p>
              <div className="pt-2">
                <button
                  className="bg-[#FFDE14] hover:bg-[#ffe500] text-[#042C89] font-bold text-xs sm:text-[16px] px-6 py-3.5 rounded-full shadow-md transition-all cursor-pointer inline-block"
                >
                  Book a FREE skills discovery
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: 4 Ability Cards Grid (2x2 Grid) */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {cards.map((card, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-[24px] p-5 shadow-2xl text-slate-800 space-y-3 relative hover:-translate-y-1.5 transition-all duration-300 border border-slate-100 flex flex-col justify-between"
                >
                  {/* Organic Blob Photo Container */}
                  <div className={`w-full relative`}>
                    <img
                      src={card.img}
                      alt={card.title}
                      className="w-full h-full  rounded-xl"
                    />
                  </div>

                  {/* Text Content */}
                  <div className="space-y-1">
                    <h3 className={`gasoek text-[32px] ${card.titleColor} uppercase tracking-wider`}>
                      {card.title}
                    </h3>
                    <p className="text-[16px] poppins text-[#475569] leading-[23px]">
                      {card.desc}
                    </p>
                  </div>

                </div>
              ))}
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
