import React from 'react';
import { Container } from '../../../components/common/Container';

// Imagery
import organizeImg from 'https://webstepdev.com/demo/syncoWebsiteImages/one-to-one/thishour.png';
import bgTexture from 'https://webstepdev.com/demo/syncoWebsiteImages/texture.png';
import vector from 'https://webstepdev.com/demo/syncoWebsiteImages/one-to-one/yellow-layer.png';

export function OrganiseSection() {
  const handleBook = () => {
    const appSection = document.getElementById('samba-application');
    if (appSection) {
      appSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full overflow-hidden py-12 pb-8 sm:py-16 lg:mt-[-100px] lg:pt-[200px]">
      {/* Background Texture */}
      <img
        src={bgTexture}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none z-0"
      />

      <Container className="relative z-10">
        <div className="flex flex-col md:flex-row justify-between gap-5 md:gap-6 lg:gap-12 items-center">
          {/* Left Column: Composite Image with Coach, Kid & Mascot */}
          <div className="w-full md:w-1/2  relative">
            <div className=" max-w-[680px] -ms-[40px] md:-ms-[24px] lg:-ms-[78px] ">
              <img
                src={organizeImg}
                alt="One-to-one soccer training with coach and player"
                className="w-full h-auto object-contain drop-shadow-lg"
              />
            </div>
          </div>

          {/* Right Column: Copy */}
          <div className="w-full md:w-1/2 max-w-[608px] text-center md:text-left">
            {/* 2-line Gasoek Green Heading */}
            <h2 className="gasoek text-[44px] sm:text-[48px] md:text-[38px] lg:text-[64px] text-[#0DD180] leading-[1.1] md:leading-[1.15]">
              <span className="text-[#042C89] recline block sm:inline">This hour is </span>
              <span className="relative inline-block">
                theirs.
                <img
                  src={vector}
                  alt=""
                  aria-hidden="true"
                  className="absolute  sm:-bottom-6 right-2 mt-1 w-[75%] md:w-[98%]  h-auto object-contain pointer-events-none select-none"
                />
              </span>
            </h2>

            {/* Sub-heading */}
            <p className="poppins font-medium text-[#27364B] text-[16px] md:text-[15px] lg:text-[16px] 2xl:text-[18px] leading-[1.5] mt-8 md:mt-5 lg:mt-8 mb-3 md:mb-3 lg:mb-4">
              In a group session, a coach has ten children to watch. Here, they have one.
            </p>
            <p className="recline font-bold text-[#00A6E3] text-[15px] sm:text-[17px] md:text-[16px] lg:text-[20px] 2xl:text-[24px] leading-snug my-3 md:my-3 lg:my-4">
              Every touch. Every movement. Every little detail.
            </p>
            <p className="poppins font-medium text-[#27364B] text-[16px] md:text-[16px]  2xl:text-[18px] leading-[1.5] mt-3 md:mt-3 lg:mt-4 mb-6 md:mb-5 lg:mb-8">
              We see what they can already do, spot what’s holding them back and build the session around what they need.
            </p>

            {/* Callout Box with Blue Background */}
            <div className="bg-[#00A6E3] rounded-[20px] p-5 sm:p-6 md:p-4 lg:p-6 text-center md:text-start max-w-[420px] md:w-full md:max-w-full mx-auto md:mx-0 shadow-sm">
              <h3 className="text-white hidden md:block text-[20px] sm:text-[22px] md:text-[20px] lg:text-[24px] font-normal gasoek leading-tight">
                Start with one session.
              </h3>
              <h3 className="text-white block md:hidden text-[20px]  font-bold poppins leading-tight">
                Start with one session.
              </h3>
              <p className="text-white text-[13px] sm:text-[15px] md:text-[14px] lg:text-[15px] font-semibold md:font-bold poppins my-2 sm:my-2.5">
                Initial session · <span translate="no" className="notranslate">£45</span>
              </p>
              <button
                type="button"
                onClick={handleBook}
                className="w-full md:w-fit bg-[#042C89] hover:bg-[#021840] active:scale-[0.99] text-[#FFDE14] font-semibold text-[13px] sm:text-[14px] py-2.5 sm:py-3 px-4 rounded-full transition-all duration-200 cursor-pointer poppins text-center"
              >
                Book their first session
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default OrganiseSection;
