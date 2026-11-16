import React from "react";
import { Container } from "../../../components/common/Container";

const BASE = "https://webstepdev.com/demo/syncoWebsiteImages/franchise";
const FOUNDER_IMAGE = `${BASE}/outofgamecoach.png`;
const TEXTURED_BG = `${BASE}/whitetexturedbg.png`;

export function FounderStory() {
  return (
    <section
      className="relative w-full py-12 md:py-24 bg-white bg-cover bg-center bg-repeat overflow-hidden"
      style={{ backgroundImage: `url('https://webstepdev.com/demo/syncoWebsiteImages/texture.png')` }}
    >
      <Container>
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8 lg:gap-16">
          {/* Text Column */}
          <div className="w-full lg:w-[52%] text-left">
            <h2 className="gasoek text-[38px] sm:text-[48px] lg:text-[58px] leading-[45px] md:leading-[1.08] mb-6 md:mb-8">
              <span className="text-[#0DD180] block">For me, I was</span>
              <span className="block">
                <span className="text-[#0DD180]">coached</span>{" "}
                <span className="text-[#042C89]">out of</span>
              </span>
              <span className="text-[#042C89] block">the game.</span>
            </h2>

            <div className="space-y-5 poppins font-medium text-[#042C89] text-[14px] sm:text-[16px] lg:text-[17px] leading-[1.6]">
              <p>
                Football had become about predictability over creativity, and
                results over development. So in 2009, I went to Brazil looking
                for a different way.
              </p>
              <p>What I brought home became Samba Soccer Schools.</p>
              <p className="font-bold">
                But over the years, I also saw talented coaches struggling to
                make a living from the game they loved. Now I want to help them
                build something of their own.
              </p>
            </div>

            {/* Name with green left bar */}
           
<div className="mt-8 flex items-center gap-4">
  <div className="w-[4px] h-[50px] rounded-full bg-[#0DD180] shrink-0" />

  <div>
    <div className="poppins text-[#042C89] font-bold text-[16px] md:text-[18px] leading-[1.2]">
      Coach Nilio
    </div>

    <div className="poppins text-[#042C89] text-[16px] md:text-[18px] font-medium leading-[1.3] mt-1">
      Founder, Samba Soccer Schools
    </div>
  </div>
</div>

          </div>

          {/* Image Column (on top in mobile) */}
          <div className="w-full lg:w-[44%] relative flex justify-center">
            <img
              src={FOUNDER_IMAGE}
              alt="Coach Nilio - Founder of Samba Soccer Schools"
              className="relative z-10 w-full max-w-[440px] lg:max-w-none h-auto object-cover object-top"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

export default FounderStory;