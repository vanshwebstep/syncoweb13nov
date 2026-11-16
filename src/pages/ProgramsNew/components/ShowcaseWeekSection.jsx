import React from 'react';
import { Container } from '../../../components/common/Container';
import textureBg from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/showcase-banner.png';
import textureBgMobile from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/showcase-mobile.png';
import mascotKicking from 'https://webstepdev.com/demo/syncoWebsiteImages/group.png';
import mascotKickingMobile from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/roadmap-mobile.png';
import mascotStanding from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/layer_showcase.png';

export function ShowcaseWeek() {
  return (
    <section className="pt-16 pb-10 lg:pt-[100px] md:py-[70px] lg:pb-[160px] text-white relative overflow-hidden font-sans">
      {/* Mobile background image */}
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
        className="hidden md:block absolute inset-0 w-full h-full object-cover object-top pointer-events-none z-0"
      />

      <Container className="relative z-10">
        <div className="showcase-week-grid grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mt-6 lg:mt-10">

          {/* Left Column: Heading & Paragraphs */}
          <div className="showcase-week-text w-full md:max-w-[380px] min-[900px]:max-w-[460px] lg:max-w-[540px] xl:max-w-[620px] 2xl:max-w-none lg:col-span-7 xl:col-span-8 space-y-3.5 lg:space-y-6">

            {/* Header Title */}
            <div>
              <h2 className="recline font-extrabold text-[30px] sm:text-[34px] md:text-[32px] min-[900px]:text-[38px] lg:text-[46px] xl:text-[54px] 2xl:text-[61px] text-white leading-[1]">
                <span className="text-[#FFDE14] font-normal gasoek">Showcase Week.</span>
              </h2>
              <h2 className="recline font-extrabold text-[24px] sm:text-[26px] md:text-[24px] min-[900px]:text-[28px] lg:text-[32px] xl:text-[36px] 2xl:text-[39px] text-white leading-tight mt-1">
                Five weeks to <span className="text-[#0DD180] font-normal gasoek">learn</span> <br />
                One week to bring it all together.
              </h2>
            </div>

            {/* Paragraphs */}
            <div className="space-y-2.5 lg:space-y-3 poppins text-white font-semibold text-[14px] sm:text-[16px] md:text-[14px] min-[900px]:text-[16px] lg:text-[18px] xl:text-[19px] 2xl:text-[20px] leading-relaxed">
              <p>
                Every stop on the Road to Rio ends with Showcase Week, giving children <br className="hidden lg:block"/> the chance to put their new skills into play through our Skills Showcase <br className="hidden lg:block"/> and 1v1 Skills Showdown.
              </p>

              <p className="md:font-['Recline',sans-serif] font-['Poppins',sans-serif] text-[15px] sm:text-[18px] text-[#FFDE14] md:text-[16px] min-[900px]:text-[19px] lg:text-[22px] xl:text-[24px] 2xl:text-[26px]">
                Then comes the Showcase Ceremony.
              </p>

              <p>
                Celebrate their progress. Earn their Player <br className="block md:hidden"/>Badge. <br className="hidden lg:block"/>One step closer to Rio.
              </p>
            </div>

          </div>

          {/* Right Column: 3D Mountain Winding Path & Mascot Graphic */}

        </div>
      </Container>
      <div className="md:absolute md:mt-0 mt-8 w-full max-w-[290px] sm:max-w-[300px] md:max-w-[260px] min-[900px]:max-w-[320px] lg:max-w-[380px] xl:max-w-[500px] 2xl:max-w-[600px] md:right-[2%] lg:right-[3%] xl:right-[4%] md:top-[12%] lg:top-[6%] xl:top-[4%] z-20 flex items-center justify-center">
        <img
          src={mascotKicking}
          alt="Samba Player"
          className="w-full h-full hidden md:block object-contain drop-shadow-xl"
        />
        <img
          src={mascotKickingMobile}
          alt="Samba Player"
          className="w-full h-full block md:hidden object-contain drop-shadow-xl"
        />

      </div>

      <img src={mascotStanding} alt="Samba Player" className="absolute bottom-[-8px] hidden md:block left-0 h-[280px] lg:h-[500px] w-full pointer-events-none" />

    </section>
  );
}

export default ShowcaseWeek;
