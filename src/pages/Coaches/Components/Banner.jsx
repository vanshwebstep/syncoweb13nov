// JoinTheMission.jsx
import React from "react";
import { ArrowRight } from "lucide-react";
import { Container } from "../../../components/common/Container";

const BASE = "https://webstepdev.com/demo/syncoWebsiteImages";
const BG_DESKTOP = `${BASE}/coaches/coachhero.png`;
const BG_MOBILE = `${BASE}/coaches/hero-mobile-main.png`;
const COACH_IMG = `${BASE}/coaches/hero-right-image.png`; // coach + kid cutout
const WAVE_IMG = `${BASE}/coaches/hero-layer.png`; // green blob (right side)
const WAVE_IMG_MOBILE = `${BASE}/coaches/hero-layer-mobile.png`;
const WHITELINE = `${BASE}/roadtorio/whiteline.png`;

const Banner = () => {
  return (
    <section
      className="
        relative isolate w-full z-[9] overflow-hidden
        2xl:pt-[100px] xl:pt-[80px] 2xl:pb-[170px] xl:pb-[150px]
        min-[767px]:pt-[80px] min-[767px]:pb-[120px] md:pt-[80px] md:pb-[120px]
        pt-[10px] pb-[130px]
       bg-cover bg-bottom bg-no-repeat
        bg-[image:var(--bg-mobile)] min-[767px]:bg-[image:var(--bg-desktop)]
      "
      style={{
        backgroundPosition: "bottom",
        "--bg-desktop": `url(${BG_DESKTOP})`,
        "--bg-mobile": `url(${BG_MOBILE})`,
      }}
    >
      {/* Green blob (behind content) */}
      {/* <img
        src={WAVE_IMG}
        alt=""
        aria-hidden="true"
        className="hidden min-[767px]:block pointer-events-none absolute top-0 right-0 z-0 2xl:w-[45%] xl:w-[50%] lg:w-[55%] md:w-[60%] w-[60%]"
      />
      <img
        src={WAVE_IMG_MOBILE}
        alt=""
        aria-hidden="true"
        className="block min-[767px]:hidden pointer-events-none absolute top-0 right-0 z-0 w-full"
      /> */}

      <Container className="relative z-10 flex flex-col min-[767px]:flex-row min-[767px]:items-center pt-14 pb-0 min-[767px]:pt-0">
        {/* ===== TEXT ===== */}
        <div className="relative z-20 w-full min-[767px]:w-[53%] lg:w-[52%] xl:w-[50%]">
          <h1 className="leading-[1.12]">
            <span className="block font-['Recline',sans-serif] font-bold text-white text-[30px] sm:text-[36px] min-[767px]:text-[32px] lg:text-[42px] xl:text-[50px]">
              We’re bringing back
              <br />
              the beautiful game.
            </span>
            <span className="relative inline-block font-['Gasoek_One',sans-serif] text-[#FFDE14] text-[40px] sm:text-[52px] min-[767px]:text-[44px] lg:text-[58px] xl:text-[72px] mt-3">
              Are you in?
              <img
                src={WHITELINE}
                alt=""
                aria-hidden="true"
                className="absolute left-0 -bottom-2 w-full h-auto pointer-events-none select-none"
              />
            </span>
          </h1>

          <div className="mt-8 space-y-5 font-['Poppins',sans-serif] font-medium text-[#042C89] text-[14px] sm:text-[16px] min-[767px]:text-[14px] lg:text-[16px] xl:text-[18.63px] leading-[1.55]">
            <p>
              Football has become too rigid. Too predictable.
              <br />
              Too afraid of mistakes.
            </p>
            <p>
              At Samba, we’re bringing back the skill, flair, creativity, freedom and fun that made us fall in love
              with the game in the first place.
            </p>
            <p>And we need great coaches to help us do it.</p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#join"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0DD180] hover:bg-[#0bb86f] text-[#042C89] font-['Poppins',sans-serif] font-bold text-[14px] xl:text-[16px] px-7 xl:px-8 py-3.5 shadow-md transition-all duration-300 hover:scale-[1.03] active:scale-95 whitespace-nowrap"
            >
              Apply now <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#role"
              className="md:inline-flex hidden items-center justify-center rounded-full border-[1.5px] border-white text-white hover:bg-white hover:text-[#042C89] font-['Poppins',sans-serif] font-bold text-[14px] xl:text-[16px] px-7 xl:px-8 py-3.5 transition-all duration-300 whitespace-nowrap"
            >
              See the role
            </a>
          </div>
        </div>
      </Container>

      {/* ===== COACH + KID IMAGE ===== */}
      <div className="coach-image coaches-hero-illustration min-[1900px]:right-[16%] min-[767px]:absolute min-[767px]:bottom-[-2%] lg:bottom-[-2%] xl:bottom-[-4%] 2xl:bottom-[-4%] min-[767px]:mb-0 -mb-[160px] min-[767px]:right-[0%] lg:right-[2%] xl:right-[8%] 2xl:right-[12%] z-[20] flex w-full flex-1 items-end justify-center min-[767px]:self-end min-[767px]:justify-end pointer-events-none">
        <img
          src={COACH_IMG}
          alt="Coach giving a high five to a young player"
          className="block h-auto w-[85%] max-w-[340px] sm:max-w-[420px] min-[767px]:w-full min-[767px]:max-w-[380px] min-[900px]:max-w-[420px] lg:max-w-[460px] xl:max-w-[560px] 2xl:max-w-[600px] object-contain"
        />
      </div>
    </section>
  );
};

export default Banner;