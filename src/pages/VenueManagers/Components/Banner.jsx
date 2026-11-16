// Banner.jsx
import React from "react";
import { Container } from "../../../components/common/Container";

/* ====== REPLACE THESE PATHS LATER ====== */
const BG_DESKTOP = "https://webstepdev.com/demo/syncoWebsiteImages/venueManager/hero_desktop.png";
const BG_MOBILE = "https://webstepdev.com/demo/syncoWebsiteImages/venueManager/hero-mobile.png";
const COACH_IMG = "https://webstepdev.com/demo/syncoWebsiteImages/venueManager/Image_1.png"; // coach + kid cutout (optional)
const WAVE_IMG = "https://webstepdev.com/demo/syncoWebsiteImages/venueManager/hero_layer.png"; // bottom white wave (optional)
const WAVE_IMG_MOBILE = "https://webstepdev.com/demo/syncoWebsiteImages/venueManager/hero-layer-mobile.png"; // bottom white wave (optional)
/* ======================================= */

const Banner = () => {
    return (
        <section
            className="
                relative isolate w-full z-[9] overflow-hidden
                pt-10 pb-0 sm:pt-12 sm:pb-14 md:pt-14 md:pb-16 lg:pt-16 lg:pb-20 xl:pt-20 xl:pb-24 2xl:py-24
                bg-cover bg-bottom bg-no-repeat
                bg-[image:var(--bg-mobile)] md:bg-[image:var(--bg-desktop)]
            "
            style={{
                backgroundPosition: "bottom",
                "--bg-desktop": `url(${BG_DESKTOP})`,
                "--bg-mobile": `url(${BG_MOBILE})`,
            }}
        >
            <Container className="relative z-10 flex flex-col md:flex-row md:items-center min-h-[inherit]">
                {/* TEXT */}
                <div className="relative z-20 w-full md:w-[50%] lg:w-[50%] xl:w-[46%] 2xl:w-[42%] pb-2 md:pb-0">
                    <h1
                        className="
                          gasoek md:leading-[1.08] leading-[1.18] uppercase
                          text-[32px] sm:text-[36px] md:text-[38px] min-[900px]:text-[36px] lg:text-[42px] xl:text-[50px] 2xl:text-[54px]
                        "
                    >
                        <span className="block text-[#042C89]">EVERY GREAT</span>
                        <span className="block text-[#042C89]">SAMBA VENUE</span>
                        <span className="block text-white">NEEDS A GREAT</span>
                        <span className="block text-white">LEADER.</span>
                    </h1>

                    <p className="recline text-[#FFDE14] font-bold text-[20px] sm:text-[24px] md:text-[24px] min-[900px]:text-[26px] lg:text-[30px] xl:text-[35px] py-3.5 sm:py-4 md:py-4 lg:py-5 leading-tight">
                        Could that be you?
                    </p>

                    <p
                        className="
                          poppins text-[#042C89] font-semibold text-[17px] sm:text-[14.5px] md:text-[13.5px] min-[900px]:text-[14.5px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px]
                          leading-[1.55] max-w-[480px]
                        "
                    >
                        Our Venue Managers are the heartbeat of Samba. They lead the coaches, welcome the families and make sure every child gets the Samba experience we promise.
                    </p>

                    <a
                        href="#apply"
                        className="
                          mt-5 sm:mt-6 inline-flex items-center justify-center
                          rounded-full bg-[#042C89] px-6 py-2.5 sm:px-8 sm:py-3.5
                          text-[13.5px] sm:text-[15px] lg:text-[16px] xl:text-[18px] font-semibold text-white
                          transition hover:bg-[#08216f] poppins shadow-md
                          focus:outline-none focus-visible:ring-2 focus-visible:ring-white
                        "
                    >
                        Apply Now
                    </a>
                </div>
            </Container>

            {/* COACHES IMAGE */}
            <div className="venue-managers-hero-illustration mt-6 md:mt-0 md:absolute md:bottom-0 md:right-0 min-[1900px]:right-[14%] lg:right-[1%] xl:right-[2%] 2xl:right-[4%] z-10 flex w-full md:w-auto items-end justify-center md:justify-end pointer-events-none">
                <img
                    src={COACH_IMG}
                    alt="Venue Managers team"
                    className="
                      block h-auto w-[85%]  max-w-[340px] sm:max-w-[400px]
                      md:w-full md:max-w-[380px] min-[900px]:max-w-[440px]
                      lg:max-w-[540px] xl:max-w-[680px] 2xl:max-w-[800px]
                      object-contain
                    "
                />
            </div>

            {/* BOTTOM WHITE WAVE (image) */}
            <img
                src={WAVE_IMG}
                alt=""
                className="venue-managers-hero-wave hidden md:block pointer-events-none absolute top-0 left-0 2xl:w-[45%] xl:w-[70%] lg:w-[55%] md:w-[60%] w-[60%]"
            />
            <img
                src={WAVE_IMG_MOBILE}
                alt=""
                className="venue-managers-hero-wave block md:hidden pointer-events-none absolute top-0 right-0 w-[100%]"
            />
        </section>
    );
};

export default Banner;