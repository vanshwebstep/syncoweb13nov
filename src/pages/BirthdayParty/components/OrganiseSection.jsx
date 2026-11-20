import React from 'react';
import { Container } from '../../../components/common/Container';

// Imagery
import organizeImg from 'https://webstepdev.com/demo/syncoWebsiteImages/birthday-party/organize.png';
import organizeMobile from 'https://webstepdev.com/demo/syncoWebsiteImages/birthday-party/organize_mobile.png';
import bgTexture from 'https://webstepdev.com/demo/syncoWebsiteImages/birthday-party/what_happend_banner.png';
import swoosh from 'https://webstepdev.com/demo/syncoWebsiteImages/roadtorio/Swoosh.png';

export function OrganiseSection() {
  return (
    <section
      style={{
        backgroundImage: `url(${bgTexture})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className="relative w-full overflow-hidden py-14 sm:py-18"
    >
      <Container className="relative z-10">
        <div className="flex md:flex-row flex-col-reverse justify-between gap-8 lg:gap-12 items-center">
          {/* Left Column: Composite Image */}
          <div className="w-full md:w-1/2 md:max-w-[360px] lg:max-w-[610px] flex justify-center lg:justify-start relative">
            <div className="w-full">
              <img
                src={organizeImg}
                alt="Samba soccer team celebrating party"
                className="hidden sm:block w-full h-auto object-contain drop-shadow-xl"
              />
              <img
                src={organizeMobile}
                alt="Samba soccer team celebrating party"
                className="block sm:hidden w-full h-auto object-contain drop-shadow-lg"
              />
            </div>
          </div>

          {/* Right Column: Copy */}
          <div className="w-full md:w-1/2 md:max-w-[380px] lg:max-w-none text-left">
            {/* Heading */}
            <h2 className="leading-[1.15]">
              <span className="block font-['Recline',sans-serif] font-bold text-[#042C89] text-[30px] sm:text-[36px] md:text-[28px] lg:text-[40px]">
                You've got enough
              </span>
              <span className="relative inline-block font-['Gasoek_One',sans-serif] text-[#0DD180] text-[38px] sm:text-[46px] md:text-[34px] lg:text-[50px] mt-1">
                to organise.
                <img
                  src={swoosh}
                  alt=""
                  aria-hidden="true"
                  className="absolute left-0 bottom-0 w-full h-auto pointer-events-none select-none"
                />
              </span>
            </h2>

            {/* Sub-heading */}
            <p className="font-['Poppins',sans-serif] font-medium text-[#27364B] text-[15px] sm:text-[16px] md:text-[15px] lg:text-[18px] mt-6 mb-4 lg:mb-5">
              Once the football starts, leave it to us.
            </p>

            {/* Callout with green left border */}
            <div className="flex gap-4 lg:gap-5 my-4 lg:my-5">
              <div className="w-1.5 bg-[#0DD180] rounded-[30px] shrink-0" />
              <p className="font-['Poppins',sans-serif] font-medium text-[#042C89] text-[14px] sm:text-[16px] md:text-[14.5px] lg:text-[18px] leading-[1.5]">
                Our Samba coaches run the games, teach the skills, keep everyone involved and bring the energy from first whistle to last.
              </p>
            </div>

            {/* Punchline */}
            <p className="font-['Recline',sans-serif] font-bold text-[#00A6E3] text-[16px] sm:text-[18px] md:text-[16px] lg:text-[20px] mt-5 lg:mt-6">
              You just need to remember the cake.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default OrganiseSection;