import React from "react";
import { ArrowRight, Star } from "lucide-react";
import { Container } from "../../../components/common/Container";
import { useModal } from "../../../context/ModalContext";
import heroBg from "https://webstepdev.com/demo/syncoWebsiteImages/one-to-one/onetoonehero.png";
import bannerDesktop from "https://webstepdev.com/demo/syncoWebsiteImages/one-to-one/banner_image.png";
import mobileHero from "https://webstepdev.com/demo/syncoWebsiteImages/one-to-one/mobile_hero.png";
import swoosh from "https://webstepdev.com/demo/syncoWebsiteImages/roadtorio/whiteline.png";

export function HeroBanner() {
    const { openModal } = useModal();

    const handleEnquire = () => {
        const appSection = document.getElementById("samba-application");
        if (appSection) {
            appSection.scrollIntoView({ behavior: "smooth" });
        } else {
            openModal("booking");
        }
    };

    const handlePrices = () => {
        const el = document.getElementById("prices");
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section className="relative w-full overflow-hidden z-[9] md:flex items-center">
            {/* Desktop background (blue + green blob + white wave) */}
            <img
                src={heroBg}
                alt="Samba Soccer One-to-One"
                className="hidden md:block absolute inset-0 w-full h-full object-cover object-bottom pointer-events-none select-none z-0"
            />
            {/* Mobile background */}
            <img
                src={mobileHero}
                alt="Samba Soccer One-to-One"
                className="md:hidden block absolute inset-0 w-full h-full object-cover object-bottom pointer-events-none select-none z-0"
            />

            <Container className="relative z-10 w-full pt-[80px] pb-[320px] xs:pb-[360px] min-h-[900px] md:min-h-[600px] lg:min-h-0 md:py-16 lg:pt-[90px] lg:pb-[170px]">
                <div className="max-w-[680px] md:max-w-[420px] lg:max-w-[620px] text-left">
                    {/* Google badge */}
                    <span className="inline-flex items-center gap-1.5 bg-[#042C89] text-white font-['Poppins',sans-serif] text-[11px] lg:text-[13px] font-semibold px-3.5 py-1.5 rounded-full">
                        <span className="flex text-[#FFDE14]">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 fill-current" />
                            ))}
                        </span>
                        4.8 on Google
                    </span>

                    {/* Heading */}
                    <h1 className="mt-5 leading-[1.15]">
                        <span className="block font-['Recline',sans-serif] font-bold text-[#042C89] text-[30px] xs:text-[36px] sm:text-[44px] md:text-[32px] lg:text-[48px]">
                            Sometimes they just
                        </span>
                        <span className="block font-['Recline',sans-serif] font-bold text-[#042C89] text-[30px] xs:text-[36px] sm:text-[44px] md:text-[32px] lg:text-[48px]">
                            need a little
                        </span>
                        <span className="relative inline-block font-['Gasoek_One',sans-serif] text-[#FFDE14] text-[38px] xs:text-[46px] sm:text-[56px] md:text-[40px] lg:text-[64px] mt-1">
                            more attention.
                            <img src={swoosh} alt="" aria-hidden="true" className="absolute left-0 -bottom-0 w-full h-auto pointer-events-none select-none" />
                        </span>
                    </h1>

                    {/* Paragraph */}
                    <p className="mt-6 font-['Poppins',sans-serif] font-medium text-white text-[14px] sm:text-[16px] md:text-[14px] lg:text-[17px] leading-[1.5]">
                        One child. One Samba coach. One hour focused entirely on their game.
                    </p>

                    {/* Buttons */}
                 <div className="mt-6 flex flex-col md:flex-row flex-wrap items-center gap-3">
    <button
        type="button"
        onClick={handleEnquire}
        className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-[#0DD180] hover:bg-[#0bb86f] text-[#042C89] font-['Poppins',sans-serif] font-bold text-[14px] lg:text-[16px] px-6 lg:px-8 py-3 lg:py-3.5 rounded-full shadow-md transition-all duration-300 hover:scale-[1.03] active:scale-95 cursor-pointer whitespace-nowrap"
    >
        Book their first session <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5" />
    </button>

    <button
        type="button"
        onClick={handlePrices}
        className="w-full md:w-auto inline-flex items-center justify-center border-[1.5px] border-white text-white hover:bg-white hover:text-[#042C89] font-['Poppins',sans-serif] font-bold text-[14px] lg:text-[16px] px-6 lg:px-8 py-3 lg:py-3.5 rounded-full transition-all duration-300 cursor-pointer whitespace-nowrap"
    >
        See prices
    </button>
</div>
                    {/* Small note */}
                    <p className="mt-5 font-['Poppins',sans-serif] text-center md:text-left font-semibold text-[#FFDE14] text-[12px] lg:text-[14px]">
                        First session £45 · 60 minutes
                    </p>
                </div>
            </Container>

            {/* Desktop hero illustration (coach + child) */}
            <div className="hidden md:flex items-end justify-end w-full md:w-[380px] lg:w-[680px] 2xl:w-[780px] absolute right-0 lg:right-6 xl:right-0 bottom-0 lg:bottom-[-6%] 2xl:bottom-[-40px] h-full pointer-events-none z-0">
                <img
                    src={bannerDesktop}
                    alt="Samba coach working one-to-one with a child"
                    className="w-full object-contain md:max-h-[85%] lg:max-h-none"
                />
            </div>
        </section>
    );
}

export default HeroBanner;