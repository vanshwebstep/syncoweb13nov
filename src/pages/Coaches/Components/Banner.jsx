// JoinTheMission.jsx
import React from "react";
import { Container } from "../../../components/common/Container";

/* ====== REPLACE THESE PATHS LATER ====== */
const BG_DESKTOP = "https://webstepdev.com/demo/syncoWebsiteImages/coaches/hero.png";
const BG_MOBILE = "https://webstepdev.com/demo/syncoWebsiteImages/coaches/hero-mobile-main.png";
const COACH_IMG = "https://webstepdev.com/demo/syncoWebsiteImages/coaches/hero-right-image.png"; // coach + kid cutout (optional)
const WAVE_IMG = "https://webstepdev.com/demo/syncoWebsiteImages/coaches/hero-layer.png"; // bottom white wave (optional)
const WAVE_IMG_MOBILE = "https://webstepdev.com/demo/syncoWebsiteImages/coaches/hero-layer-mobile.png"; // bottom white wave (optional)
const TEXT_IMAGE = "https://webstepdev.com/demo/syncoWebsiteImages/coaches/text-button.png"; // bottom white wave (optional)
/* ======================================= */

const Banner = () => {
  return (
    <section
      className="
        relative isolate w-full z-[9] 2xl:pt-[100px] xl:pt-[80px] 2xl:pb-[170px] xl:pb-[150px] min-[767px]:pt-[80px] min-[767px]:pb-[120px] md:pt-[80px] md:pb-[120px] pt-[10px] pb-[130px]
        bg-cover bg-bottom bg-no-repeat
        bg-[image:var(--bg-mobile)] min-[767px]:bg-[image:var(--bg-desktop)] md:bg-[image:var(--bg-desktop)]
      "
      style={{
        backgroundPosition: "bottom",
        "--bg-desktop": `url(${BG_DESKTOP})`,
        "--bg-mobile": `url(${BG_MOBILE})`,
      }}
    >
      <Container className="relative z-10 flex flex-col min-[767px]:flex-row min-[767px]:items-center pt-14 pb-0 min-[767px]:pt-0 min-h-[inherit]">
        {/* TEXT */}
        <div className="relative z-20 w-full min-[767px]:w-[53%] lg:w-[50%] xl:w-[48%]">
          <h2
            className="
              gasoek leading-[1.2] min-[767px]:leading-[1.12] lg:leading-[1.18]
              text-[#042C89]
              text-[32px] sm:text-[38px] min-[767px]:text-[34px] min-[900px]:text-[38px] lg:text-[42px] xl:text-[49px] 2xl:text-[54px]
            "
          >
            We&apos;re bringing<br className="block sm:hidden" /> back the <br className="block sm:hidden" /> beautiful game.
            <span className="block text-[#FFDE14]">Are you in?</span>
          </h2>

          <div
            className="poppins 
              mt-4 sm:mt-5 space-y-3.5 sm:space-y-4 text-[#042C89]
              text-[14px] sm:text-[15.3px] leading-[1.6] font-semibold
              lg:text-[17px] xl:text-[18px] 2xl:text-[20px]
            "
          >
            <p>
              Football has become too rigid. Too predictable.
              <br className="hidden sm:block" />
              Too afraid of mistakes.
            </p>
            <p>
              At Samba, we&apos;re bringing back the skill, flair, creativity,
              freedom and fun that made us fall in love with the game in the
              first place.
            </p>
            <p className="hidden min-[767px]:block font-bold text-[16px] min-[900px]:text-[18px] lg:text-[19px] xl:text-[20px] 2xl:text-[24px] recline text-white">
              And we need great coaches to help us do it.
            </p>
            <p className="block min-[767px]:hidden font-bold text-[14px] poppins text-white">
              And we need great coaches to help us do it.
            </p>
          </div>

          <a
            href="#join"
            className="
              mt-6 inline-flex items-center justify-center gap-1
              rounded-full bg-[#042C89] px-6 py-3
              text-[15px] sm:text-[16px] xl:text-[18px] 2xl:text-[21px] font-semibold text-white
              transition hover:bg-[#08216f] poppins
              focus:outline-none focus-visible:ring-2 focus-visible:ring-white
            "
          >
           Join The Mission <img src={TEXT_IMAGE} alt="Join The Mission" className="w-4 ms-2" />
          </a>
        </div>

        {/* COACH + KID IMAGE */}
      </Container>
        <div className="coach-image coaches-hero-illustration min-[1900px]:right-[16%] min-[767px]:absolute min-[767px]:bottom-[-2%] lg:bottom-[-4%] xl:bottom-[-8%] 2xl:bottom-[-10%] min-[767px]:mb-0 -mb-[160px] min-[767px]:right-[0%] lg:right-[2%] xl:right-[8%] 2xl:right-[12%] z-[999] flex w-full flex-1 items-end justify-center min-[767px]:self-end min-[767px]:justify-end pointer-events-none">
          <img
            src={COACH_IMG}
            alt="Coach giving a high five to a young player"
            className="
              block h-auto w-[85%] max-w-[340px] sm:max-w-[420px]
              min-[767px]:w-full min-[767px]:max-w-[380px] min-[900px]:max-w-[420px]
              lg:max-w-[460px] xl:max-w-[560px] 2xl:max-w-[600px]
              object-contain
            "
          />
        </div>

      {/* BOTTOM WHITE WAVE (image) */}
      <img
        src={WAVE_IMG}
        alt=""
        className="coaches-hero-wave hidden min-[767px]:block pointer-events-none absolute top-0 right-0 2xl:w-[45%] xl:w-[50%] lg:w-[55%] md:w-[60%] w-[60%]"
      />
      <img
        src={WAVE_IMG_MOBILE}
        alt=""
        className="coaches-hero-wave block min-[767px]:hidden pointer-events-none absolute top-0 right-0 w-[100%]"
      />
    </section>
  );
};

export default Banner;