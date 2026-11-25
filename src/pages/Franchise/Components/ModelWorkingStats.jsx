import React from "react";
import { Container } from "../../../components/common/Container";

const BASE = "https://webstepdev.com/demo/syncoWebsiteImages/franchise";
const BG_IMAGE = `${BASE}/alreadyworkingbannerbg.svg`;
const BG_IMAGE_MOBILE = `${BASE}/years_of_proud.png`;

const statsData = [
  {
    value: "£5.4m+",
    label: "revenue generated in the last 4 years",
  },
  {
    value: "95%",
    label: "recurring membership revenue",
  },
  {
    value: "2.5 yrs",
    label: "average membership lifecycle",
  },
  {
    value: "20,000+",
    label: "children coached",
  },
];

export function ModelWorkingStats() {
  return (
    <section
      className="relative w-full py-16 md:py-24 bg-[#042C89] bg-cover bg-center bg-no-repeat overflow-hidden text-center
                 bg-[image:var(--bg-mobile)] md:bg-[image:var(--bg-desktop)]"
      style={{
        "--bg-mobile": `url(${BG_IMAGE_MOBILE})`,
        "--bg-desktop": `url(${BG_IMAGE})`,
      }}
    >
      <Container className="relative z-10">
        {/* Subheading */}
        <div className="poppins text-[#FFDE14] font-semibold text-[14px] tracking-wide uppercase mb-4">
          15+ years of proof
        </div>

        {/* Heading */}
        <h2 className="text-[34px] sm:text-[44px] lg:text-[52px] leading-[1.15] mb-10 sm:mb-16">
          <span className="recline text-white block">A model that’s</span>
          <span className="gasoek text-[#FFDE14] block">already working.</span>
        </h2>

        {/* Stats */}
        <div className="relative grid grid-cols-2 lg:grid-cols-4 max-w-[1100px] mx-auto">
          {/* Mobile cross dividers (2x2) */}
          <span className="lg:hidden absolute left-1/2 top-0 bottom-0 w-px bg-white/30 -translate-x-1/2" />
          <span className="lg:hidden absolute top-1/2 left-0 right-0 h-px bg-white/30 -translate-y-1/2" />

          {statsData.map((stat, idx) => (
            <div
              key={stat.value}
              className={`flex flex-col items-center px-3 sm:px-6 py-8 lg:py-0 ${
                idx !== 0 ? "lg:border-l lg:border-white/70" : ""
              }`}
            >
              <div className="gasoek text-[#0DD180] text-[30px] sm:text-[40px] lg:text-[46px] leading-none">
                {stat.value}
              </div>

              {/* Yellow underline */}
              <div className="w-[42px] h-[4px] bg-[#FFDE14] rounded-full my-4" />

              <p className="poppins text-white font-semibold lg:font-normal text-[12px] sm:text-[15px] leading-[1.45] max-w-[150px] sm:max-w-[190px]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default ModelWorkingStats;