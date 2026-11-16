import React from "react";
import { Container } from "../../../components/common/Container";
import { useModal } from "../../../context/ModalContext";

const BASE = "https://webstepdev.com/demo/syncoWebsiteImages/franchise";
const DESKTOP_BG = `${BASE}/franchiseherobg.png`;
const MOBILE_BG = `${BASE}/Hero.png`;
const YELLOW_LINE = `${BASE}/yellowline.png`;

export function HeroBanner() {
  const { openModal } = useModal();

  const handleEnquire = () => {
    const appSection = document.getElementById("samba-application");
    if (appSection) appSection.scrollIntoView({ behavior: "smooth" });
    else openModal("booking");
  };

  const handleProspectus = () => {
    window.open("/prospectus.pdf", "_blank");
  };

  return (
    <section className="relative w-full overflow-hidden z-[9] bg-[#0096DB]  min-h-[800px] md:min-h-0 aspect-[462/930] md:aspect-auto">
      {/* Mobile background */}
      <div
        className="absolute inset-0 md:hidden bg-cover bg-top bg-no-repeat"
        style={{ backgroundImage: `url('${MOBILE_BG}')` }}
      />
      {/* Desktop background */}
      <div
        className="absolute inset-0 hidden md:block bg-cover bg-right bg-no-repeat franchise-hero-bg-desktop"
        style={{ backgroundImage: `url('${DESKTOP_BG}')` }}
      />

      <Container className="relative z-10 w-full pt-10 pb-10 md:py-20 lg:pt-[120px] lg:pb-[200px]">
        <div className="max-w-[590px] text-left">
          {/* Heading */}
          <h1 className="gasoek uppercase text-white text-[44px] sm:text-[52px] lg:text-[68px] leading-[1.05]">
            Build a <br /> Business.
          </h1>

          {/* Yellow swoosh underline */}
          <img
            src={YELLOW_LINE}
            alt=""
            className="block w-[250px] sm:w-[320px] lg:w-[370px] h-auto mt-1 franchise-hero-yellowline"
          />

          {/* Sub-heading */}
          <h2 className="gasoek uppercase text-[24px] sm:text-[32px] lg:text-[44px] leading-[1.15] my-4 md:my-5">
            <span className="block text-[#2A1B6B]">Bring back the</span>
            <span className="block text-[#FFD93D]">Beautiful game.</span>
          </h2>

          {/* Paragraph */}
          <p className="poppins text-white text-[14px] sm:text-[17px] lg:text-[19px] leading-[1.55] mb-6 md:mb-8 max-w-[520px]">
            Love coaching, but tired of it not paying? Build a Samba business of
            your own: a full-time living from the game you love.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4">
            <button
              onClick={handleEnquire}
              className="poppins inline-flex items-center justify-center gap-2 bg-[#FFDE14] md:bg-[#FFD93D] text-[#2A1B6B] font-bold text-[15px] lg:text-[17px] w-full sm:w-auto px-7 py-3.5 rounded-full hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              Book a discovery call
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>

            <button
              onClick={handleProspectus}
              className="poppins inline-flex items-center justify-center border border-white text-white hover:bg-white/10 font-semibold text-[15px] lg:text-[17px] w-full sm:w-auto px-7 py-3.5 rounded-full hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              Download the prospectus
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default HeroBanner;