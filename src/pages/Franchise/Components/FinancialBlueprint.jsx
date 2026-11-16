import React from "react";
import { Container } from "../../../components/common/Container";

const BASE = "https://webstepdev.com/demo/syncoWebsiteImages/franchise";
const CHECK_ICON = `${BASE}/greenroundcheck.png`;
const PRESENTATION_BG = `${BASE}/discoverypresentationbg.png`;
const LOCK_ICON = `${BASE}/lock.png`;

const pills = ["Venues", "Classes", "Members", "Performance"];

function CheckItem({ children, light }) {
  return (
    <div className="flex items-center gap-2.5">
      <img src={CHECK_ICON} alt="" className="w-[20px] h-[20px] shrink-0 object-contain" />
      <span
        className={`poppins font-semibold text-[15px] ${
          light ? "text-white" : "text-[#042C89]"
        }`}
      >
        {children}
      </span>
    </div>
  );
}

export function FinancialBlueprint() {
  return (
    <section className="relative max-w-[1216px]  m-auto w-full py-16 md:py-24 bg-[#F8FAFC] overflow-hidden">
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-end gap-10 lg:gap-8">
          {/* LEFT: label + heading + 2 cards (takes remaining space) */}
          <div className="w-full lg:flex-1 lg:min-w-0">
            <span className="poppins block text-[#0DD180] font-semibold text-[14px] tracking-wide uppercase mb-4">
              Investment
            </span>

            <h2 className="text-[38px] sm:text-[48px] lg:text-[56px] leading-[1.1] mb-10">
              <span className="recline text-[#042C89] block">Be in charge of</span>
              <span className="gasoek text-[#0DD180] block">what you earn.</span>
            </h2>

            <div className="flex flex-col md:flex-row gap-6">
              {/* London */}
              <div className="bg-[#042C89] rounded-[28px] p-7 sm:p-8 text-left flex flex-col w-full md:flex-1 md:min-w-0 max-w-[380px] min-h-[330px]">
                <h3 className="recline text-white text-[22px] leading-tight mb-8">
                  Established London territory
                </h3>
                <div className="gasoek text-[#FFDE14] mt-auto text-[29px] leading-none">
                  £12,000-£25,000
                </div>
                <div className="poppins text-[#C9D3F0] text-[14px] mt-2 mb-6">
                  territory fee
                </div>
                <div className="border-t border-white/30 pt-6 space-y-3">
                  <CheckItem light>15% management services fee</CheckItem>
                  <CheckItem light>Plus royalties</CheckItem>
                </div>
              </div>

              {/* Out of London */}
              <div className="bg-white border border-[#E5EAF3] rounded-[28px] p-7 sm:p-8 text-left flex flex-col w-full md:flex-1 md:min-w-0 max-w-[380px] min-h-[330px]">
                <h3 className="recline text-[#042C89] text-[22px] leading-tight mb-8">
                  Out-of-London territory
                </h3>
                <div className="gasoek text-[#042C89] mt-auto text-[29px] leading-none">
                  £12,000-£14,000
                </div>
                <div className="poppins text-[#475569] text-[14px] mt-2 mb-6">
                  territory fee
                </div>
                <div className="border-t border-[#E5EAF3] pt-6 space-y-3">
                  <CheckItem>10% management services fee</CheckItem>
                  <CheckItem>No royalties</CheckItem>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: blueprint card (fixed max 406, shrinks on smaller screens) */}
          <div className="w-full lg:w-[36%] lg:max-w-[420px] lg:shrink-0 flex justify-center lg:justify-end pr-[14px] pb-[14px]">
            <div className="relative w-full max-w-[406px] aspect-[406/436]">
              {/* Offset shadow layer */}
              <div className="absolute inset-0 translate-x-[14px] translate-y-[14px] rounded-[32px] bg-[#DCE3EE]" />

              {/* Card */}
              <div
                className="relative w-full h-full rounded-[32px] bg-white bg-cover bg-center bg-no-repeat flex flex-col items-center justify-end pb-14 text-center px-6"
                style={{ backgroundImage: `url(${PRESENTATION_BG})` }}
              >
                <img src={LOCK_ICON} alt="" className="w-[72px] h-[72px] object-contain mb-3" />
                <h3 className="recline text-[#042C89] text-[22px] leading-tight mb-2">
                  Shared at your <br className="hidden sm:block" /> discovery presentation
                </h3>
                <p className="poppins text-[#475569] text-[14px] leading-snug mb-16">
                  The real numbers, venue by venue.
                </p>
                <div className="flex flex-wrap justify-center gap-1.5">
                  {pills.map((item) => (
                    <span
                      key={item}
                      className="poppins bg-[#042C89] text-white font-semibold text-[12px] px-3 py-1.5 rounded-full"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="poppins text-[#475569] font-semibold text-[15px] mt-6 text-left">
          Start Up Loans and other funding options may be available.
        </p>
      </Container>
    </section>
  );
}

export default FinancialBlueprint;