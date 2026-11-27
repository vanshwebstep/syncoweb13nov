import React from 'react';
import { Container } from '../../../components/common/Container';

// Background & Layers
import momentBanner from 'https://webstepdev.com/demo/syncoWebsiteImages/momentBanner.png';
import momentLayer1 from 'https://webstepdev.com/demo/syncoWebsiteImages/birthday-party/momentLayer1.png';
import momentLayer2 from 'https://webstepdev.com/demo/syncoWebsiteImages/birthday-party/momentLayer2.png';
import momentImg from 'https://webstepdev.com/demo/syncoWebsiteImages/birthday-party/moment_img.png';
import momentMobile from 'https://webstepdev.com/demo/syncoWebsiteImages/birthday-party/moment_mobile.png';

export function MomentOfTheDay() {
  return (
    <section
      className="relative w-full overflow-hidden bg-[#042C89] py-14 pb-12 sm:py-18 lg:pt-26"
      style={{
        backgroundImage: `url(${momentBanner})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Top green curved layer accent */}
      <img
        src={momentLayer1}
        alt=""
        aria-hidden="true"
        className="absolute hidden md:block top-0 left-0 w-full max-w-[100px] sm:max-w-[210px] pointer-events-none select-none z-0 object-contain"
      />

      {/* Right yellow crescent curve layer */}
      <img
        src={momentLayer2}
        alt=""
        aria-hidden="true"
        className="absolute top-0 hidden md:block right-0 h-full w-[280px] lg:w-[500px] pointer-events-none select-none z-0"
      />

      <Container className="relative z-10">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-8 items-center">
          {/* Left Column: Headings & Copy */}
          <div className="w-full md:w-1/2 md:max-w-[360px] lg:max-w-[514px] text-left max-w-xl">
            {/* 2-line Gasoek Heading */}
            <h2 className="gasoek text-[42px] xs:text-[48px] sm:text-[58px] md:text-[38px] lg:text-[64px] leading-[1.02]">
  <span className="text-white recline block">
    Their day.
  </span>
  <span className="relative inline-block text-[#0DD180] mt-1">
    Their moment.
    <img
      src="https://webstepdev.com/demo/syncoWebsiteImages/roadtorio/whiteline.png"
      alt=""
      aria-hidden="true"
      className="absolute left-0 bottom-0 w-full h-auto pointer-events-none select-none"
    />
  </span>
</h2>

            {/* Bold Callout Paragraph */}
            <p className="poppins text-white font-bold text-[15px] sm:text-[18px] md:text-[16px] lg:text-[20px] md:leading-[1.38] leading-[1.5] md:mt-6 lg:mt-10 md:mb-5 lg:mb-8 my-6">
              If football is all they talk about, give them a <br className="hidden lg:block" /> birthday built around what they love most.
            </p>

            {/* Supporting Detail Copy */}
            <p className="poppins text-white font-normal text-[14px] sm:text-[15.5px] md:text-[14.5px] lg:text-[18px] leading-[1.4] lg:max-w-[500px]">
              For one day, they're the Samba Star, right at the centre of all the fun. They'll teach their mates their favourite move, captain Brazil in the tournament and receive their very own Samba medal.
            </p>
          </div>

          {/* Right Column: Visual Component with Mascot & Curved Photo */}
          <div className="w-full md:w-1/2 flex justify-center lg:justify-end relative">
            <div className="w-full max-w-[420px] lg:max-w-[580px] xl:max-w-[725px]">
              {/* Desktop Image */}
              <img
                src={momentImg}
                alt="Samba Birthday boy with coaches and mascot"
                className="hidden sm:block w-full h-auto object-contain drop-shadow-2xl"
              />
              {/* Mobile Image */}
              <img
                src={momentMobile}
                alt="Samba Birthday boy with coaches and mascot"
                className="block sm:hidden w-full h-auto object-contain drop-shadow-xl"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default MomentOfTheDay;
