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
        py-12 sm:py-14 md:py-16 lg:py-16 xl:py-16
      "
      style={{
        backgroundImage: `url(${BG_TEXTURE})`,
      }}
    >
      <Container className="relative z-10 text-center flex flex-col items-center">
        {/* Pill Badge */}
        <div className="inline-block bg-[#fff]/15 border border-white/10 px-4 sm:px-5 py-1 sm:py-1.5 rounded-full mb-4 sm:mb-5 shadow-sm">
          <span className="poppins text-[#0DD180] text-[11px] sm:text-[13px] md:text-[14px] font-bold uppercase tracking-wider">
            WHAT WE PAY
          </span>
        </div>

        {/* Main Headline */}
        <h2 className="leading-[1.08]">
          <span className="block gasoek text-[#FFDE14] text-[30px] sm:text-[36px] md:text-[42px] lg:text-[48px] xl:text-[54px] 2xl:text-[58px] uppercase">
            £18 PER HOUR
          </span>
          <span className="block gasoek text-white text-[26px] sm:text-[32px] md:text-[38px] lg:text-[44px] xl:text-[50px] 2xl:text-[54px] uppercase mt-1 sm:mt-1.5">
            PLUS COMMISSION
          </span>
        </h2>

        {/* Description Copy */}
        <p className="poppins font-semibold md:font-medium text-white/90 text-[14px] sm:text-[15px] md:text-[15.5px] lg:text-[16px] xl:text-[17px] leading-relaxed max-w-[720px] mx-auto mt-4 sm:mt-5">
          Get rewarded for taking ownership and helping your venue succeed.
        </p>
      </Container>
    </section>
  );
};

export default WhatWePay;
