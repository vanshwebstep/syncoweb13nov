import React from "react";
import { Container } from "../../../components/common/Container";
import { useModal } from "../../../context/ModalContext";
import heroBg from "https://webstepdev.com/demo/syncoWebsiteImages/birthday-party/herobanner.png";
import heroBgMobile from "https://webstepdev.com/demo/syncoWebsiteImages/birthday-party/bannerMobile.png";
import bannerMobile from "https://webstepdev.com/demo/syncoWebsiteImages/birthday-party/banner_mobile.png";
import banderin from "https://webstepdev.com/demo/syncoWebsiteImages/birthday-party/banderin.png";

export function HeroBanner() {
    const { openModal } = useModal();

    const tags = ["Football", "Fun", "Music", "Tournament", "Medals"];

    const handleEnquire = () => {
        // Try opening modal, or scroll to the application section if present
        const appSection = document.getElementById("samba-application");
        if (appSection) {
            appSection.scrollIntoView({ behavior: "smooth" });
        } else {
            openModal("booking");
        }
    };

    return (
        <section className="relative w-full overflow-hidden  z-[9]  md:flex items-center">
            {/* Desktop Background with Green Pattern, Kids, Mascot & Wavy Bottom */}
            <img
                src={heroBg}
                alt="Samba Soccer Birthday Party"
                className="hidden md:block absolute inset-0 w-full h-full object-cover object-right lg:object-center pointer-events-none select-none z-0"
            />
            <img
                src={heroBgMobile}
                alt="Samba Soccer Birthday Party"
                className="md:hidden block absolute inset-0 w-full h-full object-cover object-right lg:object-center pointer-events-none select-none z-0"
            />
            <img
                src={banderin}
                alt="Samba Soccer Birthday Party"
                className="md:hidden right-0 top-0 block absolute w-[200px]  pointer-events-none select-none z-0"
            />

            <Container className="relative z-10 w-full py-12 sm:py-16 md:py-20 md:pb-[130px] lg:pb-[190px] pb-0 lg:pt-[110px] pt-[100px]">
                <div className="birthday-hero-copy max-w-[640px] md:max-w-[440px] lg:max-w-[650px] text-left">
                    {/* Main 3-Line Heading */}
                    <h1 className="gasoek text-[38px] xs:text-[50px] sm:text-[60px] md:text-[40px] lg:text-[64px] leading-[1.05] md:leading-[1.15] lg:leading-[79px]">
                        <span className="text-[#042C89]">
                            Their birthday.
                            Their mates.
                        </span>
                        <span className="text-white block">Their Samba.</span>
                    </h1>

                    {/* Subtitle / Paragraph */}
                    <p className="poppins text-[#042C89] font-semibold text-[15px] sm:text-[17px] md:text-[15px] lg:text-[19px] xl:text-[22px] leading-[1.38] mt-5 sm:mt-6 md:mt-4 lg:mt-6 mb-6 sm:mb-7 md:mb-5 lg:mb-7">
                        A Brazilian-inspired football party packed with
                        football, music, challenges and fun – without you having
                        to plan every minute <br className="md:hidden block" />{" "}
                        of it.
                    </p>

                    {/* Yellow Pill Badges */}
                    <div className="flex flex-wrap items-center gap-1 sm:gap-2.5 md:gap-2 lg:gap-2.5 mb-5 sm:mb-6 md:mb-4 lg:mb-6">
                        {tags.map((tag) => (
                            <span
                                key={tag}
                                className="bg-[#FFDE14] text-[#042C89] font-black text-[12px] sm:text-[15px] md:text-[14px] lg:text-[20px] px-3 sm:px-5 md:px-3.5 lg:px-5 py-1 sm:py-1.5 md:py-1 lg:py-1.5 rounded-full shadow-xs select-none poppins"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Action Line Tagline */}
                    <p className="poppins text-[#042C89] font-semibold text-[14px] sm:text-[16px] md:text-[15px] lg:text-[22px] mb-6 sm:mb-8 md:mb-5 lg:mb-8">
                        We take care of the action. You enjoy the party.
                    </p>

                    {/* Enquire Today CTA Button */}
                    <div>
                        <button
                            onClick={handleEnquire}
                            className="bg-[#042C89] hover:bg-[#021840] md:w-max w-full text-white font-bold text-[15px] sm:text-[20px] md:text-[16px] lg:text-[20px] px-8 md:px-6 lg:px-8 py-3 sm:py-4 md:py-3.5 lg:py-4 rounded-full hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer poppins inline-block"
                        >
                            Enquire today
                        </button>
                    </div>
                </div>
            </Container>
            <div className="block md:hidden w-full h-full pointer-events-none z-0">
                <img
                    src={bannerMobile}
                    alt="Kids having fun at Samba party"
                    className="w-full object-contain opacity-90"
                />
                {/* Mobile bottom white wave cut */}
            </div>
        </section>
    );
}

export default HeroBanner;
