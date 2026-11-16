import React from 'react';
import { Container } from '../../../components/common/Container';

// Background texture
import bgTexture from 'https://webstepdev.com/demo/syncoWebsiteImages/one-to-one/startBanner.png';
import bgTextureMobile from 'https://webstepdev.com/demo/syncoWebsiteImages/one-to-one/start_one_banner.png';
import bgTextureLayer from 'https://webstepdev.com/demo/syncoWebsiteImages/one-to-one/banner_layer.png';
import bgLayer from 'https://webstepdev.com/demo/syncoWebsiteImages/one-to-one/one_layer.png';

export function StartWithOneSession() {
  const steps = [
    { number: '1', label: 'Watch' },
    { number: '2', label: 'Identify' },
    { number: '3', label: 'Correct' },
    { number: '4', label: 'Coach' },
    { number: '5', label: 'Challenge' },
    { number: '6', label: 'Go Again' },
  ];

  const handleBook = () => {
    const appSection = document.getElementById('samba-application');
    if (appSection) {
      appSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      className="relative overflow-hidden py-20 lg:py-24"

    >
      <img
        src={bgTexture}
        alt="Samba Soccer One-to-One"
        className="hidden md:block absolute inset-0 w-full h-full object-cover object-top lg:object-top pointer-events-none select-none z-0"
      />
      <img
        src={bgTextureMobile}
        alt="Samba Soccer One-to-One"
        className="md:hidden block absolute inset-0 w-full h-full object-cover object-top lg:object-top pointer-events-none select-none z-0"
      />
      <Container className="relative z-10">
        {/* Heading */}
        <div className="text-center max-w-[600px] mx-auto mb-6 sm:mb-8">
          <h2 className="gasoek leading-[1.05] text-[#0DD180] text-[34px] xs:text-[38px] sm:text-[48px] md:text-[44px] lg:text-[64px]">
            Start with
            <br />
            one session
          </h2>

          <p className="poppins font-semibold text-white mt-3 sm:mt-4 leading-snug sm:leading-relaxed text-[13.5px] xs:text-[15px] sm:text-[18px] md:text-[18px] lg:text-[22px]">
            One child. One coach.
            <br />
            Sixty minutes focused entirely on their game.
          </p>
        </div>

        {/* Numbered Steps: 3x2 on mobile, 6 cols on desktop */}
        <div className="grid grid-cols-3 md:grid-cols-6 max-w-[300px] xs:max-w-[320px] sm:max-w-[440px] md:max-w-[945px] mx-auto items-center justify-center gap-2.5 sm:gap-3 md:gap-2.5 lg:gap-4 mb-6 sm:mb-8">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-white rounded-[16px] sm:rounded-[22px] md:rounded-[24px] lg:rounded-[38px] border-r-[4px] md:border-r-[5px] lg:border-r-[7px] border-b-[6px] md:border-b-[9px] lg:border-b-[13px] border border-[#00A6E3] py-3 md:py-3.5 lg:py-5 px-1 flex flex-col items-center justify-center shadow-lg"
            >
              <span className="gasoek leading-none text-[26px] xs:text-[30px] sm:text-[38px] md:text-[40px] lg:text-[64px] pb-1 md:pb-1.5 lg:pb-2 text-[#00A6E3]">
                {step.number}
              </span>
              <span className="gasoek mt-0.5 text-[13px] md:text-[14px] lg:text-[20px] text-[#00A6E3] leading-none text-center">
                {step.label}
              </span>
            </div>
          ))}
        </div>

        {/* Description */}
        <div className="text-center hidden md:block md:max-w-[720px] mx-auto mb-4 sm:mb-6">
          <p className="poppins font-medium sm:font-semibold leading-relaxed text-[11.5px] xs:text-[12.5px] sm:text-[15px] md:text-[15px] lg:text-[18px] text-white">
            Their Samba Star coach watches closely, identifies where individual{' '}
            <br className="hidden md:inline" />
            attention could make the biggest difference and gets straight to work.
          </p>
          <p className="poppins font-medium sm:font-semibold leading-relaxed text-[11.5px] xs:text-[12.5px] sm:text-[15px] md:text-[15px] lg:text-[18px] text-white mt-1.5 sm:mt-3">
            After the session, we’ll tell you what we saw and what we’d focus on next.
          </p>
        </div>
          <p className="poppins block md:hidden  text-center mb-4 font-medium sm:font-semibold leading-relaxed text-[11.5px] xs:text-[12.5px] sm:text-[15px] md:text-[18px] text-white mt-1.5 sm:mt-3">
Their Samba Star coach watches closely, identifies where individual attention could make the biggest difference and gets straight to work. After the session, we’ll tell you what we saw and what we’d focus on next.          </p>

        {/* Price */}
        <div className="text-center mb-5 sm:mb-6">
          <p className="gasoek text-[24px] xs:text-[28px] sm:text-[32px] md:text-[32px] lg:text-[36px] text-[#52D0FF]">
            60 minutes &bull; <span translate="no" className="notranslate">£45</span>
          </p>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button
            type="button"
            onClick={handleBook}
            className="poppins font-bold text-[13.5px] xs:text-[14.5px] sm:text-[17px] md:text-[16px] lg:text-[20px] bg-[#0DD180] hover:bg-[#00c853] text-white rounded-full px-6 xs:px-8 md:px-7 lg:px-8 py-3 transition-all hover:opacity-90 hover:-translate-y-0.5 cursor-pointer shadow-md inline-block w-full md:w-fit md:w-auto"
          >
            Book their initial session
          </button>
        </div>
      </Container>
      <img
        src={bgTextureLayer}
        alt=""
        aria-hidden="true"
        className="w-full h-auto absolute hidden md:block bottom-0 left-0 object-cover pointer-events-none select-none z-0"
      />
      <img
        src={bgLayer}
        alt=""
        aria-hidden="true"
        className="w-full h-auto block md:hidden absolute bottom-0 left-0 object-cover pointer-events-none select-none z-0"
      />
    </section>
  );
}

export default StartWithOneSession;