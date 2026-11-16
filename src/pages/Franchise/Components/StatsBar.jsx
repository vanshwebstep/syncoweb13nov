import React from "react";
import { Container } from "../../../components/common/Container";

const BASE = "https://webstepdev.com/demo/syncoWebsiteImages/franchise";
const SECTION_BG = `${BASE}/texture_bg.png`;
const DESKTOP_BOX_BG = `${BASE}/yellowgreenrectanglebgdesk.png`;
const MOBILE_BOX_BG = `${BASE}/stats_bg.png`;

const stats = [
  { value: "20,000+", label: "children coached" },
  { value: "92", label: "UK venues" },
  { value: "15+", label: "years of experience" },
  { value: "14", label: "franchise partners" },
];

export function StatsBar() {
  return (
    <section className="relative bg-[#FDFDFF] pt-0 -pt-[40px]  md:-pt-[80px]  bg-cover bg-center" style={{ backgroundImage: `url('${SECTION_BG}')` }}>
      <div className="relative z-20" >
        <Container>
          {/* Box overlaps the hero above by pulling up with a negative margin */}
          <div className="relative overflow-hidden -mt-[40px]  md:-mt-[80px] ">
            {/* Mobile background */}
            <div
              className="absolute  rounded-[53px] inset-0 md:hidden bg-[length:100%_100%] bg-center bg-no-repeat"
              style={{ backgroundImage: `url('${MOBILE_BOX_BG}')` }}
            />
            {/* Desktop background */}
            <div
              className="absolute inset-0 hidden md:block rounded-[53px] bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url('${DESKTOP_BOX_BG}')` }}
            />
            <div className="absolute  inset-0 rounded-[53px] border-[8px] border-[#0000001a] md:border-[#00000038]" />

            {/* Stats */}
            <div className="relative grid grid-cols-2 md:grid-cols-4 items-center gap-x-4 gap-y-14 md:gap-y-8 px-6 md:px-8 md:px-12 pt-12 pb-14 md:py-10 min-h-[300px] md:min-h-[190px]">
              {stats.map((s) => (
                <div key={s.label} className="text-left">
                  <div className="gasoek text-[#042C89] text-[30px] sm:text-[40px] leading-none">
                    {s.value}
                  </div>
                  <div className="poppins text-[#042C89] font-bold text-[13px] sm:text-[14px] lg:text-[16px] mt-2">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}

export default StatsBar;
