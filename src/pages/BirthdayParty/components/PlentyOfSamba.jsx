import React from 'react';
import { Container } from '../../../components/common/Container';

// Images
import plenty1 from 'https://webstepdev.com/demo/syncoWebsiteImages/birthday-party/plenty1.png';
import plenty2 from 'https://webstepdev.com/demo/syncoWebsiteImages/birthday-party/plenty2.png';
import plenty3 from 'https://webstepdev.com/demo/syncoWebsiteImages/birthday-party/plenty3.png';
import plenty4 from 'https://webstepdev.com/demo/syncoWebsiteImages/birthday-party/plenty4.png';
import bgTexture from 'https://webstepdev.com/demo/syncoWebsiteImages/birthday-party/what_happend_banner.png';

// Icons
import ballIcon from 'https://webstepdev.com/demo/syncoWebsiteImages/birthday-party/ball.png';
import tournament from 'https://webstepdev.com/demo/syncoWebsiteImages/birthday-party/tournament.png';
import pitchIcon from 'https://webstepdev.com/demo/syncoWebsiteImages/card1.png';
import drumIcon from 'https://webstepdev.com/demo/syncoWebsiteImages/feature-samba-music.png';

export function PlentyOfSamba() {
  const cards = [
    {
      id: 'ball-mastery',
      icon: ballIcon,
      iconClass: 'w-[48px] h-[48px] sm:w-[54px] sm:h-[54px]',
      title: 'Ball mastery',
      subtitle: 'Learn a trick or two.',
      desc: 'Everyone gets a ball and gets to show off some Samba skills.',
      img: plenty1,
      color: '#FFDE14',
      rotation: '-rotate-[1.5deg]',
    },
    {
      id: 'challenges',
      icon: pitchIcon,
      iconClass: 'w-[52px] h-[52px] sm:w-[58px] sm:h-[58px]',
      title: 'Challenges',
      subtitle: 'Bring on the competition.',
      desc: 'Fun games and challenges that get everyone involved.',
      img: plenty2,
      color: '#0DD180',
      rotation: 'rotate-[1.5deg]',
    },
    {
      id: 'samba-music',
      icon: drumIcon,
      iconClass: 'w-[46px] h-[46px] sm:w-[52px] sm:h-[52px]',
      title: 'Samba Music',
      subtitle: 'Turn it up.',
      desc: 'Brazilian beats and Samba energy from the moment they arrive.',
      img: plenty3,
      color: '#0DD180',
      rotation: '-rotate-[1.5deg]',
    },
    {
      id: 'tournament',
      icon: tournament,
      iconClass: 'w-[48px] h-[48px] sm:w-[54px] sm:h-[54px]',
      title: 'Tournament',
      subtitle: 'Game time.',
      desc: 'Split into teams and finish the party with a Samba tournament.',
      img: plenty4,
      color: '#FFDE14',
      rotation: 'rotate-[1.5deg]',
    },
  ];

  return (
    <section
      style={{
        backgroundImage: `url(${bgTexture})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className="
        relative
        overflow-hidden
        py-16
        sm:py-20
        lg:py-24
        md:-mt-[130px]
        md:pt-[200px]
        lg:pt-[230px]
      "
    >
      <Container className="relative z-10">

        {/* Heading */}
        <div className="text-center max-w-[650px] mx-auto mb-10 sm:mb-14">

          <h2 className="gasoek text-[42px] sm:text-[48px] lg:text-[56px] leading-[1.05] ">
            <span className="text-[#042C89] block">
              Football. Friends.
            </span>

            <span className="text-[#0DD180] block mt-1 sm:mt-2">
              Plenty of Samba.
            </span>
          </h2>

          <p className="poppins text-[#042C89] font-medium text-[14px] sm:text-[16px] mt-4 leading-relaxed">
            From the first touch to the final whistle, we keep everyone
            <br className="hidden sm:inline" />
            involved, moving and having fun.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 md:gap-x-5 md:gap-y-7 lg:gap-x-8 lg:gap-y-10">

          {cards.map((card) => (
            <div
              key={card.id}
              className="relative min-w-0"
            >

              {/* =================================
                  ROTATED BACKGROUND ACCENT CARD
                  ================================= */}
              <div
                className={`
                  absolute
                  inset-0
                  rounded-[24px]
                  ${card.rotation}
                  z-0
                `}
                style={{
                  backgroundColor: card.color,
                }}
              />

              {/* =================================
                  WHITE FRONT CARD
                  ================================= */}
              <div
                className="
                  relative
                  z-10
                  bg-white
                  rounded-[22px]
                  min-h-[175px]
                  md:min-h-[180px]
                  sm:min-h-[185px]
                  overflow-hidden
                  shadow-[0_4px_20px_rgba(0,0,0,0.06)]
                  p-6
                  sm:p-7
                  md:p-5
                  lg:p-7
                  flex
                  flex-col
                  justify-between
                "
              >

                {/* Top Section: Icon & Title */}
                <div className="plenty-card-text relative z-20">
                  {/* Icon */}
                  <div className="h-[48px] sm:h-[52px] flex items-center mb-3">
                    <img
                      src={card.icon}
                      alt=""
                      className={`${card.iconClass} object-contain`}
                    />
                  </div>

                  {/* Title */}
                  <h3
                    className="
                      poppins
                      font-black
                      text-[#0DD180]
                      text-[22px]
                      sm:text-[24px]
                      md:text-[20px]
                      lg:text-[24px]
                      leading-tight
                      mb-1.5
                    "
                  >
                    {card.title}
                  </h3>

                  {/* Subtitle / Highlight */}
                  <p
                    className="
                      poppins
                      font-bold
                      text-[#1E293B]
                      text-[13px]
                      sm:text-[14px]
                      md:text-[13px]
                      lg:text-[14px]
                      leading-snug
                      mb-1
                    "
                  >
                    {card.subtitle}
                  </p>

                  {/* Description */}
                  <p
                    className="
                      poppins
                      font-medium
                      text-[#5B6B7C]
                      text-[12px]
                      sm:text-[13px]
                      md:text-[12px]
                      lg:text-[13px]
                      leading-relaxed
                      max-w-[70%]
                      md:max-w-[62%]
                      sm:max-w-[72%]
                    "
                  >
                    {card.desc}
                  </p>
                </div>

                {/* =================================
                    RIGHT CURVED IMAGE
                    ================================= */}
                <img
                  src={card.img}
                  alt=""
                  className="
                    plenty-card-image
                    absolute
                    top-0
                    right-0
                    w-[160px]
                    sm:w-[210px]
                    md:w-[150px]
                    lg:w-[225px]
                    h-auto
                    object-contain
                    pointer-events-none
                    z-10
                  "
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