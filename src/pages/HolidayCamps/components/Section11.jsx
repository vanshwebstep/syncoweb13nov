import React from 'react';
import { Container } from '../../../components/common/Container';

const BASE = 'https://webstepdev.com/demo/syncoWebsiteImages';
const fourDayBanner = `${BASE}/holiday-camps/banner_top_layer.png`;
const fourDayBanner2 = `${BASE}/holiday-camps/copa.png`;
const rioBannerImg = `${BASE}/code_de_samba.png`;
const vector = `${BASE}/yellow-vector.png`;
const blueLine = `${BASE}/holiday-camps/blue_vector.png`;
const copa = `${BASE}/holiday-camps/copa_mobile.png`;

export function Section11() {
  return (
    <section className="relative w-full overflow-hidden bg-white py-14 md:py-16 lg:py-14">
      {/* Background Pattern */}
      <img
        src={copa}
        alt=""
        aria-hidden="true"
        className="md:hidden block absolute bottom-0 w-full h-full pointer-events-none select-none z-0"
      />
      <img
        src={fourDayBanner2}
        alt=""
        aria-hidden="true"
        className="hidden md:block absolute bottom-0 w-full pointer-events-none select-none z-0"
      />
      <img
        src={fourDayBanner}
        alt=""
        aria-hidden="true"
        className="hidden md:block absolute top-0 w-8/12 md:w-9/12 lg:w-8/12 pointer-events-none select-none z-[9]"
      />

      <Container className="relative z-10 w-full text-center">
        {/* Celebration Image Graphic */}
        <div className="max-w-[480px] sm:max-w-[540px] md:max-w-[460px] lg:max-w-[540px] mx-auto mb-8 sm:mb-10 md:mb-8 lg:mb-10">
          <div className="relative h-[220px] sm:h-[340px] md:h-[280px] lg:h-[340px] flex items-center justify-center overflow-hidden">
            <img
              src={rioBannerImg}
              alt="Kids celebrating Road to Rio Copa de Samba"
              className="w-full h-full object-contain object-center drop-shadow-lg select-none"
            />
          </div>
        </div>

        {/* Heading */}
        <h2 className="recline text-[36px] sm:text-[48px] md:text-[48px] lg:text-[70px] leading-[1.04] mb-4">
          <span className="text-[#042C89] block">Rio reached.</span>
          <div className="relative w-max mx-auto">
            <img
              src={vector}
              alt=""
              className="w-[22px] md:w-[30px] lg:w-[35px] absolute md:top-[10px] top-0 md:-left-12 lg:-left-14 -left-6 rotate-[158deg]"
            />
            <span className="text-[#0DD180] gasoek inline-block relative">
              Now it's time <br className="md:hidden block" /> to play.
              <img
                src={blueLine}
                alt=""
                className="md:max-w-[100px] lg:max-w-[125px] max-w-[70px] ms-auto mt-2 md:mt-0 me-20 md:me-8"
              />
            </span>
            <img
              src={vector}
              alt=""
              className="w-[22px] md:w-[30px] lg:w-[35px] absolute md:top-[-10px] -top-2 md:-right-12 lg:-right-14 -right-6"
            />
          </div>
        </h2>

        {/* Paragraphs */}
        <div className="max-w-[800px] md:max-w-[640px] lg:max-w-[800px] mx-auto space-y-7 md:space-y-5 lg:space-y-7 mb-10 sm:mb-8 pt-3">
          <p className="poppins font-medium text-[#042C89] text-[15px] sm:text-[22px] md:text-[18px] lg:text-[22px] leading-snug">
            The skills are learned. The map is complete.<br /> Now they get to put it all into play.
          </p>
          <p className="poppins text-[#042C89] font-medium text-[14px] sm:text-[22px] md:text-[17px] lg:text-[22px] leading-snug">
            Day Four starts with the Skills Showcase and 1v1 Showdown before the Copa de Samba tournament brings everyone together for games, medals, trophies and one big final celebration.
          </p>
        </div>

        {/* Tagline Highlight */}
        <p className="recline font-bold text-[#00A3E0] text-[16px] sm:text-[26px] md:text-[22px] lg:text-[26px]">
          Four days of Samba. One brilliant finish.
        </p>
      </Container>
    </section>
  );
}

export { Section11 as RioReachedSection };
export default Section11;