// WhatWePay.jsx
import React from "react";
import { Container } from "../../../components/common/Container";

const BG_TEXTURE = "https://webstepdev.com/demo/syncoWebsiteImages/bluetexturedbg.png";

const WhatWePay = () => {
  return (
    <section
      className="
        relative isolate w-full overflow-hidden
        bg-cover bg-center bg-no-repeat
        py-12 sm:py-14 md:py-16 lg:py-20
      "
      style={{
        backgroundImage: `url(${BG_TEXTURE})`,
      }}
    >
      <Container className="relative z-10 text-center flex flex-col items-center">
        {/* Pill Badge */}
        <div className="inline-block bg-white/15 px-4 md:px-5 py-1 md:py-1.5 rounded-full mb-4 sm:mb-5 shadow-sm">
          <span className="poppins text-[#0DD180] text-[11px] sm:text-[13px] lg:text-[14px] font-bold uppercase tracking-wider">
            WHAT WE PAY
          </span>
        </div>

        {/* Main Headline */}
        <h2 className="leading-[1.15] md:leading-[1.08]">
          <span className="block gasoek text-[#FFDE14] text-[26px] sm:text-[36px] md:text-[42px] lg:text-[48px] xl:text-[54px] 2xl:text-[58px] uppercase">
            £14-£16 PER HOUR
          </span>
          <span className="block gasoek text-white text-[20px] sm:text-[30px] md:text-[36px] lg:text-[42px] xl:text-[46px] 2xl:text-[50px] uppercase mt-1 sm:mt-2">
            DEPENDING ON <br className="md:hidden block"/> EXPERIENCE & LOCATION
          </span>
        </h2>

        {/* Description Copy */}
        <p className="poppins font-medium text-white/95 text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] xl:text-[17px] 2xl:text-[18px] leading-relaxed max-w-[760px] mx-auto mt-4 sm:mt-5">
          Great coaching deserves great pay. Get rewarded for the energy, personality and experience you bring to every session.
        </p>
      </Container>
    </section>
  );
};

export default WhatWePay;
