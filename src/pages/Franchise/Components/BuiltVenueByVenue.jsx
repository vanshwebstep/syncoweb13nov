import React from "react";
import { Container } from "../../../components/common/Container";
import { useModal } from "../../../context/ModalContext";

const BASE = "https://webstepdev.com/demo/syncoWebsiteImages/franchise";
const MAIN_IMAGE = `${BASE}/builtvenuemainpic.png`;
const MAP_ICON = `${BASE}/mapicongreen.png`;
const TRACK_ICON = `${BASE}/trackicongreen.png`;

const features = [
  {
    icon: MAP_ICON,
    title: "Your own exclusive territory",
    description:
      "A clearly defined area that's yours alone. No other Samba partner can operate in it.",
  },
  {
    icon: TRACK_ICON,
    title: "Territory intelligence",
    description:
      "Population, schools, venues, competitors and local demand, so you know exactly where to open next.",
  },
];

const tags = ["Holiday camps", "Birthday parties", "1-to-1 coaching", "Tournaments"];

export function BuiltVenueByVenue() {
  const { openModal } = useModal();

  const handleBooking = () => {
    const el = document.getElementById("samba-application");
    if (el) el.scrollIntoView({ behavior: "smooth" });
    else openModal("booking");
  };

  return (
    <section className="relative w-full py-16 pb-12 md:py-24 bg-[#F8FAFC] overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Left Column */}
          <div className="lg:col-span-5 text-left">
            <span className="poppins block text-[#0DD180] font-semibold text-[14px] tracking-wide uppercase mb-4">
              The business model
            </span>

            <h2 className="text-[40px] sm:text-[52px] lg:text-[60px] leading-[1.1] mb-6">
              <span className="recline text-[#042C89] block">Built venue</span>
              <span className="gasoek text-[#0DD180] block">by venue.</span>
            </h2>

            <p className="poppins text-[#042C89] font-medium text-[14px] sm:text-[18px] leading-[1.55] mb-8">
              Every partner gets their own exclusive territory. Each venue you
              open adds recurring weekly income, and camps, parties, 1-to-1s and
              tournaments grow from the same families.
            </p>


         
            {/* Features */}
            <div className="space-y-6 mb-10">
              {features.map((f) => (
                <div key={f.title} className="flex items-start gap-4">
                  <img
                    src={f.icon}
                    alt=""
                    className="w-[40px] h-[40px] object-contain shrink-0"
                  />
                  <div>
                    <h3 className="recline text-[#042C89] text-[20px] leading-snug mb-1">
                      {f.title}
                    </h3>
                    <p className="poppins text-[#475569] text-[13px] md:text-[15px] leading-[1.5]">
                      {f.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>


   <img
              src={MAIN_IMAGE}
              alt="Territory intelligence dashboard"
              className="w-full block md:hidden h-auto object-contain"
            />

            <p className="poppins block md:inline-block py-2 text-[#475569] text-[12px] font-bold mt-2 pb-4 text-center">
Illustrative data. Your territory report is shared on your discovery call.             </p>
            {/* The Engine Box */}
            <div className="bg-[#042C89] rounded-[28px] p-6 sm:p-7 sm:max-w-none ">
              <span className="poppins block text-[#FFDE14] text-[12px] font-bold uppercase tracking-wide mb-2">
                The engine
              </span>

              <h4 className="recline text-white text-[26px] leading-tight mb-1">
                Weekly memberships
              </h4>
              <p className="poppins text-[#C9D3F0] text-[15px] mb-4">
                Monthly, recurring and predictable.
              </p>
              

              <div className="md:border-t border-white/30 md:pt-4">
                <span className="poppins hidden md:block text-[#0DD180] text-[12px] font-bold uppercase tracking-wide mb-3">
                  Plus
                </span>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="poppins bg-[#0E3FB0] text-white font-semibold text-[12px] md:text-[14px] px-4 py-1.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            <img
              src={MAIN_IMAGE}
              alt="Territory intelligence dashboard"
              className="w-full h-auto hidden md:block object-contain"
            />

            <p className="poppins hidden md:block inline-block font-semibold bg-white border border-gray-200 rounded-full px-5 py-2 text-[#475569] text-[13px] font-medium mt-4 self-center">
              Illustrative data. Your territory report is shared on your discovery call.
            </p>

            <div className="md:mt-10 self-center lg:self-start lg:ml-2 w-full">
              <button
                onClick={handleBooking}
                className="poppins inline-flex w-full justify-center md:w-max items-center gap-2 bg-[#FFDE14] hover:bg-[#ffe338] text-[#042C89] font-bold text-[17px] px-8 py-3.5 rounded-full hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                Book a discovery call
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default BuiltVenueByVenue;