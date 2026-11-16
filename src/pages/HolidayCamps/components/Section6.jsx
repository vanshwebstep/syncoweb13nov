import React from 'react';
import { Container } from '../../../components/common/Container';

const BASE = 'https://webstepdev.com/demo/syncoWebsiteImages';
const day1Img = `${BASE}/holiday-camps/journey.png`;
const texture = `${BASE}/blog/hero.png`;
const day2Img = `${BASE}/holiday-camps/journey_1.png`;
const day3Img = `${BASE}/holiday-camps/journey_2.png`;
const day4Img = `${BASE}/holiday-camps/journey_4.png`;
const arrowRightImg = `${BASE}/holiday-camps/yellow_arrow.png`;

const stopsGrid =
  'border-t-2 border-white border-dashed pt-3 sm:pt-6 grid grid-cols-2 md:grid-cols-1 xl:grid-cols-2 gap-3 md:gap-4 xl:gap-6 items-start';

export function Section6() {
  return (
    <section className="relative w-full overflow-hidden py-12 sm:py-20">
      {/* Background Pattern */}
      <img
        src={texture}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
      />

      <Container className="relative z-10 w-full text-center">
        {/* Badge Pill */}
        <div className="inline-block bg-[#E9ECF3] px-4 py-1 rounded-full mb-4 sm:mb-5">
          <span className="text-[#042C89] text-[10px] sm:text-[12px] font-bold uppercase poppins">
            THREE DAYS. SIX PLAYERS. TWELVE SKILLS.
          </span>
        </div>

        {/* Heading */}
        <h2 className="gasoek uppercase text-[30px] lg:text-[40px] xl:text-[44px] 2xl:text-[48px] leading-[1.04] text-[#042C89] mb-3 sm:mb-4 max-w-[280px] sm:max-w-none mx-auto">
          THEIR FOUR-DAY ADVENTURE
        </h2>

        {/* Subtitles */}
        <p className="poppins text-[#27364B] text-[13px] md:text-[17px] xl:text-[18px] 2xl:text-[20px] mb-4 sm:mb-7">
          Each day. Two cities. Two <br className="block md:hidden" /> Brazilian legends. Four new skills.
        </p>
        <p className="poppins text-[#27364B] text-[13px] md:text-[17px] xl:text-[18px] 2xl:text-[20px] max-w-[620px] mx-auto mb-8 sm:mb-16">
          Follow the map. Meet the <br className="block md:hidden" /> players. Master new skills. <br className="hidden sm:block" />
          Then bring it all together at the Copa de Samba.
        </p>

        {/* 2x2 Grid of Day Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mx-auto text-left">
          {/* Card 1: Day One */}
          <div className="bg-[#00A6E3] rounded-3xl p-5 sm:p-7 text-white relative overflow-hidden flex flex-col justify-between min-h-[200px] sm:min-h-[220px]">
            <div className="relative z-10 sm:pr-36 md:pr-32 xl:pr-36">
              <div className="pr-32 sm:pr-0">
                <span className="gasoek uppercase text-[20px] sm:text-[24px] block mb-1">
                  DAY ONE
                </span>
                <h3 className="poppins font-bold text-[22px] sm:text-[28px] mt-4 sm:mt-5 mb-5 sm:mb-4 leading-[1.4] md:leading-tight">
                  The journey begins
                </h3>
              </div>
              <div className={stopsGrid}>
                <div>
                  <p className="poppins font-bold text-[14px] sm:text-[16px]">● Manaus - Pelé</p>
                  <p className="poppins text-[12px] sm:text-[14px] font-semibold mt-1">Control the ball.</p>
                </div>
                <div>
                  <p className="poppins font-bold text-[14px] sm:text-[16px]">● Brasília - Ronaldo</p>
                  <p className="poppins text-[12px] sm:text-[14px] font-semibold mt-1">Learn deception.</p>
                </div>
              </div>
            </div>
            {/* Player Illustration */}
            <img
              src={day1Img}
              alt="Pelé and Ronaldo"
              className="absolute right-1 top-1 w-[105px] sm:top-auto sm:-right-2 sm:bottom-3 sm:w-[170px] md:w-[140px] xl:w-[170px] h-auto object-contain pointer-events-none select-none z-0"
            />
          </div>

          {/* Card 2: Day Two */}
          <div className="bg-[#0DD180] rounded-3xl p-5 sm:p-7 text-white relative overflow-hidden flex flex-col justify-between min-h-[200px] sm:min-h-[220px]">
            <div className="relative z-10 sm:pr-36 md:pr-32 xl:pr-36">
              <div className="pr-32 sm:pr-0">
                <span className="gasoek uppercase text-[20px] sm:text-[24px] block mb-1">
                  DAY TWO
                </span>
                <h3 className="poppins font-bold text-[22px] sm:text-[28px] mt-4 sm:mt-5 mb-5 sm:mb-4 leading-[1.4] md:leading-tight">
                  Turn up the skill
                </h3>
              </div>
              <div className={stopsGrid}>
                <div>
                  <p className="poppins font-bold text-[14px] sm:text-[16px]">● Recife - Kaká</p>
                  <p className="poppins text-[12px] sm:text-[14px] font-semibold mt-1">Change direction.</p>
                </div>
                <div>
                  <p className="poppins font-bold text-[14px] sm:text-[16px]">● São Paulo - Neymar</p>
                  <p className="poppins text-[12px] sm:text-[14px] font-semibold mt-1">Get creative.</p>
                </div>
              </div>
            </div>
            {/* Player Illustration */}
            <img
              src={day2Img}
              alt="Kaká and Neymar"
              className="absolute right-1 top-1 w-[105px] sm:top-auto sm:-right-2 sm:bottom-3 sm:w-[170px] md:w-[140px] xl:w-[170px] h-auto object-contain pointer-events-none select-none z-0"
            />
          </div>

          {/* Card 3: Day Three */}
          <div className="bg-[#FFDE14] rounded-3xl p-5 sm:p-7 text-[#042C89] relative overflow-hidden flex flex-col justify-between min-h-[200px] sm:min-h-[220px]">
            <div className="relative z-10 sm:pr-36 md:pr-32 xl:pr-36">
              <div className="pr-32 sm:pr-0">
                <span className="gasoek uppercase text-[20px] sm:text-[24px] block mb-1 text-[#FDFDFF]">
                  DAY THREE
                </span>
                <h3 className="poppins font-bold text-[22px] sm:text-[28px] mt-4 sm:mt-5 mb-5 sm:mb-4 leading-[1.4] md:leading-tight">
                  Bring <br className="block md:hidden" /> the flair
                </h3>
              </div>
              <div className={stopsGrid}>
                <div>
                  <p className="poppins font-bold text-[14px] sm:text-[16px]">● Porto Alegre - Ronaldinho</p>
                  <p className="poppins text-[12px] sm:text-[14px] mt-1 sm:mt-2">Bring the flair.</p>
                </div>
                <div>
                  <p className="poppins font-bold text-[14px] sm:text-[16px]">● Rio - Vinícius Jr</p>
                  <p className="poppins text-[12px] sm:text-[14px] mt-1 sm:mt-2">Take on the defender.</p>
                </div>
              </div>
            </div>
            {/* Player Illustration */}
            <img
              src={day3Img}
              alt="Ronaldinho and Vinícius Jr"
              className="absolute right-1 top-1 w-[105px] sm:top-auto sm:-right-2 sm:bottom-3 sm:w-[170px] md:w-[140px] xl:w-[170px] h-auto object-contain pointer-events-none select-none z-0"
            />
          </div>

          {/* Card 4: Day Four */}
          <div className="bg-[#042C89] rounded-3xl p-5 sm:p-7 text-white relative overflow-hidden flex flex-col justify-between min-h-[200px] sm:min-h-[220px]">
            <div className="relative z-10 pr-0 sm:pr-32">
              <span className="gasoek uppercase text-[20px] sm:text-[24px] opacity-90 block mb-1 text-[#FDFDFF]">
                DAY FOUR
              </span>
              <h3 className="poppins font-bold text-[22px] sm:text-[28px] mt-4 sm:mt-5 mb-1 leading-[1.4] md:leading-tight">
                Copa <br className="block md:hidden" /> de Samba
              </h3>
              <p className="poppins text-[12px] sm:text-[14px] text-[#FDFDFF] font-semibold mb-5 sm:mb-6">
                Three days of learning. Now it's time to play.
              </p>
            </div>

            {/* Bottom Flow */}
            <div className="relative z-10 border-t-2 border-white border-dashed pt-3 sm:pt-3.5 flex flex-nowrap sm:flex-wrap justify-between items-center gap-1 sm:gap-2 text-[11px] sm:text-[16px] font-bold poppins whitespace-nowrap sm:whitespace-normal">
              <span>Showcase</span>
              <img src={arrowRightImg} alt="Arrow Right" className="w-3 sm:w-4" />
              <span>1v1 Showdown</span>
              <img src={arrowRightImg} alt="Arrow Right" className="w-3 sm:w-4" />
              <span>Tournament</span>
              <img src={arrowRightImg} alt="Arrow Right" className="w-3 sm:w-4" />
              <span>Awards</span>
            </div>

            {/* Trophy Illustration */}
            <img
              src={day4Img}
              alt="Copa de Samba Trophy"
              className="absolute right-4 sm:right-6 top-4 sm:top-5 w-[75px] sm:w-[105px] h-auto object-contain pointer-events-none select-none"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

export { Section6 as FourDayAdventureSection };
export default Section6;