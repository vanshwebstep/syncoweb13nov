// StartsWithCoach.jsx
import React from "react";
import { Container } from "../../../components/common/Container";

/* ====== REPLACE THESE PATHS LATER ====== */
const BG_DESKTOP = "https://webstepdev.com/demo/syncoWebsiteImages/coaches/samba-party-banner.png"; // light pattern bg
const BG_MOBILE = "https://webstepdev.com/demo/syncoWebsiteImages/coaches/samba-party-banner.png";
const GROUP_IMG = "https://webstepdev.com/demo/syncoWebsiteImages/coaches/start-with-coach-image.png"; // blob photo (with blue + green border baked in)
/* ======================================= */

const StartWithCoach = () => {
  return (
    <section
      className="
        relative isolate w-full -mt-[150px] min-[767px]:pt-[130px] md:pt-[130px] pt-[150px] 
        bg-cover bg-center bg-no-repeat
        bg-[image:var(--bg-mobile)] min-[767px]:bg-[image:var(--bg-desktop)] md:bg-[image:var(--bg-desktop)]
      "
      style={{
        "--bg-desktop": `url(${BG_DESKTOP})`,
        "--bg-mobile": `url(${BG_MOBILE})`,
      }}
    >
      <Container className="relative z-10 py-12 min-[767px]:py-16 md:py-20 lg:py-24">
        <div className="flex flex-col-reverse min-[767px]:grid min-[767px]:grid-cols-12 gap-6 min-[767px]:gap-6 md:gap-8 lg:gap-10 xl:gap-14 items-center">
          {/* PHOTO */}
          <div className="min-[767px]:col-span-5 flex justify-center min-[767px]:justify-start">
            <img
              src={GROUP_IMG}
              alt="Samba coaches with a group of young players"
              className="
                block h-auto w-full max-w-[340px] sm:max-w-[420px] min-[767px]:max-w-[360px] md:max-w-[420px] lg:max-w-[460px] xl:max-w-[500px] 2xl:max-w-[540px]
                object-contain select-none
              "
            />
          </div>

          {/* CONTENT */}
          <div className="min-[767px]:col-span-7">
            <h2 className="leading-[1.12] md:leading-[1.1] lg:leading-[1.02]">
              <span className="block gasoek text-[30px] sm:text-[36px] min-[767px]:text-[32px] md:text-[38px] lg:text-[48px] xl:text-[56px] 2xl:text-[64px] text-[#0DD180]">
                It starts with
              </span>
              <span className="block gasoek text-[30px] sm:text-[36px] min-[767px]:text-[32px] md:text-[38px] lg:text-[48px] xl:text-[56px] 2xl:text-[64px] text-[#042C89]">
                the coach.
              </span>
            </h2>

            <div
              className="
                poppins font-medium mt-4 sm:mt-5 md:mt-6 space-y-3 min-[767px]:space-y-3.5 lg:space-y-4
                text-[#042C89] text-[12.5px] sm:text-[13.5px] min-[767px]:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[17px] 2xl:text-[18px]
                leading-[1.6]
              "
            >
              <p>
                Children don&apos;t fall in love with football because of a
                coaching manual.
              </p>

              <p>
                They fall in love with it because someone made them feel welcome.{" "}
                Made them believe in themselves. Encouraged them to try something{" "}
                new. And made football the highlight of their week.
              </p>

              <p className="recline text-[15px] min-[767px]:text-[16px] md:text-[17px] lg:text-[19px] xl:text-[21px] 2xl:text-[22px] font-bold text-[#00A6E3] !my-2.5 sm:!my-3">
                That someone could be you.
              </p>

              <div className="flex items-stretch gap-2.5 sm:gap-3">
                <div className="w-1.5 md:w-2 shrink-0 rounded-full bg-[#0DD180] self-stretch"></div>
                <p className="py-0.5 leading-[1.5]">
                  At Samba, we&apos;re looking for coaches with energy, personality
                  and a genuine love for helping children grow.
                </p>
              </div>

              <p>We&apos;ll give you the training, support and Samba Method.</p>

              <p className="font-bold">You bring the personality.</p>
            </div>

            <div className="mt-6 sm:mt-7 md:mt-8">
              <a
                href="#apply"
                className="
                  inline-flex items-center justify-center
                  rounded-full bg-[#0DD180] hover:bg-[#0bbd73]
                  px-6 sm:px-7 min-[767px]:px-7 lg:px-8 xl:px-9 py-2.5 sm:py-3 lg:py-3.5
                  text-[13.5px] sm:text-[14px] min-[767px]:text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[21px] font-semibold text-white transition-colors
                "
              >
                Apply Now
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default StartWithCoach;