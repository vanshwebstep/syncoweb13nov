import React from 'react';
import { Container } from '../../../components/common/Container';

// Imagery
import organizeImg from 'https://webstepdev.com/demo/syncoWebsiteImages/birthday-party/organize.png';
import organizeMobile from 'https://webstepdev.com/demo/syncoWebsiteImages/birthday-party/organize_mobile.png';
import bgTexture from 'https://webstepdev.com/demo/syncoWebsiteImages/birthday-party/what_happend_banner.png';

export function OrganiseSection() {
  return (
    <section style={{
        backgroundImage: `url(${bgTexture})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }} className="relative w-full overflow-hidden  py-14 sm:py-18">
     

      <Container className="relative z-10">
        <div className="flex md:flex-row flex-col-reverse justify-between gap-8 lg:gap-12 items-center">
          {/* Left Column: Composite Image with Coaches, Kids & Mascot */}
          <div className="w-full md:w-1/2 md:max-w-[360px] lg:max-w-[610px] flex justify-center lg:justify-start relative">
            <div className="w-full">
              {/* Desktop version with mascot & balloons */}
              <img
                src={organizeImg}
                alt="Samba soccer team celebrating party"
                className="hidden sm:block w-full h-auto object-contain drop-shadow-xl"
              />
              {/* Mobile version */}
              <img
                src={organizeMobile}
                alt="Samba soccer team celebrating party"
                className="block sm:hidden w-full h-auto object-contain drop-shadow-lg"
              />
            </div>
          </div>

          {/* Right Column: Copy */}
          <div className="w-full md:w-1/2 md:max-w-[380px] lg:max-w-none text-left">
            {/* 2-line Gasoek Green Heading */}
            <h2 className="gasoek text-[46px] sm:text-[56px] md:text-[38px] lg:text-[64px] text-[#0DD180] leading-[55px] md:leading-[1.12] lg:leading-[70px]">
              <span className="md:block">You've got enough {' '}</span>
              <span className="md:block">to organise.</span>
            </h2>

            {/* Sub-heading */}
            <p className="poppins md:font-medium font-semibold text-[#27364B] text-[16px] sm:text-[18px] md:text-[15.5px] lg:text-[18px] mt-4 md:mt-4 lg:mt-6 mb-4 md:mb-4 lg:mb-5">
              Once the football starts, leave it to us.
            </p>

            {/* Callout Box with Green Left Border Accent */}
            <div className="flex gap-4 md:gap-4 lg:gap-5 my-4 md:my-4 lg:my-5">
              <div className="md:w-2 w-4 md:h-[16x]  bg-[#0DD180] rounded-[30px] shrink-0 "/>
              <p className="poppins font-medium text-[#042C89] text-[14px] sm:text-[16.5px] md:text-[14.5px] lg:text-[18px] leading-[1.5]">
                Our Samba coaches run the games, teach the skills, keep everyone involved and bring the energy from first whistle to last.
              </p>
            </div>

            {/* Cyan-Blue Punchline */}
            <p className="recline hidden md:block font-bold text-[#00A6E3] text-[15px] sm:text-[17px] md:text-[16px] lg:text-[20px] mt-4 md:mt-4 lg:mt-6">
              You just need to remember the cake.
            </p>
            <p className="poppins block md:hidden font-bold text-[#00A6E3] text-[15px] sm:text-[17px] lg:text-[20px] mt-6">
              You just need to remember the cake.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default OrganiseSection;
