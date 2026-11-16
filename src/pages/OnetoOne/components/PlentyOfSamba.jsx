import React from 'react';
import { Container } from '../../../components/common/Container';

// Images
import plenty1 from 'https://webstepdev.com/demo/syncoWebsiteImages/one-to-one/game1.png';
import plenty2 from 'https://webstepdev.com/demo/syncoWebsiteImages/one-to-one/game2.png';
import plenty3 from 'https://webstepdev.com/demo/syncoWebsiteImages/one-to-one/game3.png';
import plenty4 from 'https://webstepdev.com/demo/syncoWebsiteImages/one-to-one/game4.png';
import bgTexture from 'https://webstepdev.com/demo/syncoWebsiteImages/texture.png';

export function PlentyOfSamba() {
  const cards = [
    {
      id: 'ball-mastery',
      title: 'Ball Mastery',
      desc: <>More touches. Better control. <br className="hidden md:block"/>More confidence with the ball.</>,
      img: plenty1,
      color: '#FFDE14',
      layerClass: 'md:-rotate-[3.5deg] rotate-[-5deg] translate-y-[5px] translate-x-[5px] md:-translate-x-[14px]  md:w-full w-[99%] md:h-[90%] h-[80%] md:translate-y-[1px] ',
    },
    {
      id: 'challenges',
      title: '1v1 Movement',
      desc: <>Learn the moves. Then learn when <br className="hidden md:block"/> and how to use them.</>,
      img: plenty2,
      color: '#0DD180',
      layerClass: 'md:rotate-[3.5deg] rotate-[-5deg] translate-y-[5px] translate-x-[5px] md:translate-x-[14px] md:w-full w-[99%] md:h-[90%] h-[80%] md:-translate-y-[1px]',
    },
    {
      id: 'technique',
      title: 'Technique',
      desc: <>Slow it down. <br className="md:hidden block"/> Spot the little details.<br className=""/> Get them right.</>,
      img: plenty3,
      color: '#0DD180',
      layerClass: 'md:-rotate-[3.5deg]  rotate-[3deg] translate-y-[7px] md:-translate-x-[13px] h-[93%] md:-translate-y-[15px]',
    },
    {
      id: 'game-application',
      title: 'Game Application',
      desc: <>Take what they've learned and put <br className="hidden md:block"/> it into real football situations.</>,
      img: plenty4,
      color: '#FFDE14',
      layerClass: 'md:rotate-[3.5deg] rotate-[3deg] translate-y-[7px] md:translate-x-[13px]  h-[93%]  md:-translate-y-[15px]',
    },
  ];

  return (
    <section
      style={{
        backgroundImage: `url(${bgTexture})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className="relative overflow-hidden py-12 sm:py-16 lg:py-28"
    >
      <Container className="relative z-10">
        {/* =========================
            HEADING
        ========================== */}
        <div className="text-center max-w-[650px] mx-auto mb-8 sm:mb-12 lg:mb-14">
          <h2 className="gasoek text-[36px] xs:text-[40px] sm:text-[48px] md:text-[48px] lg:text-[64px] leading-[1.05]">
            <span className="text-[#042C89] block">
              Built Around
            </span>
            <span className="text-[#00A6E3] block mt-1 sm:mt-2">
              Their Game
            </span>
          </h2>

          <p className="poppins text-[#042C89] font-medium text-[13.5px] xs:text-[14px] sm:text-[18px] md:text-[16px] lg:text-[20px] mt-3 sm:mt-6 leading-[1.4] sm:leading-relaxed md:leading-snug lg:leading-relaxed max-w-[280px] xs:max-w-[310px] sm:max-w-[550px] lg:max-w-[650px] mx-auto">
            We start with where your child is now, then build each <br className='hidden md:block'/> session around what they need next.
          </p>
        </div>

        {/* =========================
            CARDS
        ========================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 xs:gap-y-5 sm:gap-y-6 md:gap-x-5 md:gap-y-8 lg:gap-x-8 lg:gap-y-16 max-w-[340px] xs:max-w-[380px] sm:max-w-[480px] md:max-w-none mx-auto">
          {cards.map((card) => (
            <div
              key={card.id}
              className="relative min-w-0 sm:min-h-[155px] p-2 md:p-0 md:min-h-[160px] lg:min-h-[210px] "
            >
              {/* =================================
                  COLOURED BACK LAYER
                  ================================= */}
              <div
                className={`absolute inset-0 rounded-[20px]  sm:rounded-[24px] ${card.layerClass} transform z-0`}
                style={{
                  backgroundColor: card.color,
                }}
              />

              {/* =================================
                  WHITE FRONT CARD
                  ================================= */}
              <div className="relative z-10 flex md:pe-3 lg:pe-12 justify-between items-center bg-white rounded-[20px] sm:rounded-[24px] h-full w-full overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] pl-4 xs:pl-5 sm:pl-7 md:pl-4 lg:pl-7 pr-2 sm:pr-4 md:pr-2 lg:pr-4 py-7 xs:py-3 sm:py-4 md:py-3 lg:py-4">
                {/* =========================
                    TEXT CONTENT
                ========================== */}
                <div className="max-w-[62%] xs:max-w-[64%] sm:max-w-[66%] md:max-w-[64%] lg:max-w-[66%] pr-1">
                  <h3 className="poppins font-black text-[#00A6E3] text-[16px] xs:text-[18px] sm:text-[22px] md:text-[17px] lg:text-[24px] leading-tight mb-1 sm:mb-1.5">
                    {card.title}
                  </h3>

                  <p className="poppins font-medium text-[#475569] text-[14px] md:text-[12.5px] lg:text-[16px] leading-[1.35] xs:leading-[1.4] sm:leading-relaxed md:leading-snug lg:leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                {/* =========================
                    PLAYER IMAGE
                ========================== */}
                <img
                  src={card.img}
                  alt={card.title}
                  className="h-[95px] xs:h-[105px] sm:h-[135px] md:h-[125px] lg:h-[200px] w-auto max-w-[105px] xs:max-w-[120px] sm:max-w-[150px] md:max-w-[110px] lg:max-w-[200px] object-contain pointer-events-none z-10 shrink-0"
                />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default PlentyOfSamba;