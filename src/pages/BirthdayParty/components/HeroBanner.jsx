import React from "react";
import { ArrowRight, Star } from "lucide-react";
import { Container } from "../../../components/common/Container";
import { useModal } from "../../../context/ModalContext";
import heroBg from "https://webstepdev.com/demo/syncoWebsiteImages/birthday-party/herobanner.png";
import heroBgMobile from "https://webstepdev.com/demo/syncoWebsiteImages/birthday-party/bannerMobile.png";
import bannerMobile from "https://webstepdev.com/demo/syncoWebsiteImages/birthday-party/banner_mobile.png";
import banderin from "https://webstepdev.com/demo/syncoWebsiteImages/birthday-party/banderin.png";
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

    const handlePackages = () => {
        const el = document.getElementById("packages");
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section className="relative w-full overflow-hidden z-[9] md:flex items-center">
            {/* Desktop background */}
            <img
                src={heroBg}
                alt="Samba Soccer Birthday Party"
                className="hidden md:block absolute inset-0 w-full h-full object-cover object-bottom pointer-events-none select-none z-0"
            />
            {/* Mobile background */}
            <img
                src={heroBgMobile}
                alt="Samba Soccer Birthday Party"
                className="md:hidden block absolute inset-0 w-full h-full object-cover object-bottom pointer-events-none select-none z-0"
            />
            <img
                src={banderin}
                alt=""
                aria-hidden="true"
                className="md:hidden right-0 top-0 block absolute w-[200px] pointer-events-none select-none z-0"
            />

            <Container className="relative z-10 w-full pt-[56px] pb-0 md:pt-20 md:pb-[130px] lg:pt-[100px] lg:pb-[190px]">
                <div className="max-w-[640px] md:max-w-[440px] lg:max-w-[640px] text-left">
                    {/* Google badge */}
                    <span className="inline-flex items-center gap-1.5 bg-[#042C89] text-white font-['Poppins',sans-serif] text-[11px] lg:text-[12px] font-semibold px-3.5 py-1.5 rounded-full">
                        <span className="flex text-[#FFDE14]">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 fill-current" />
                            ))}
                        </span>
                        4.8 on Google
                    </span>

                    {/* Heading */}
                    <h1 className="mt-5 leading-[1.1]">
                        <span className="block font-['Recline',sans-serif] font-bold text-[#042C89] text-[34px] sm:text-[44px] md:text-[34px] lg:text-[54.61px]">
                            Their birthday.
                        </span>
                        <span className="block font-['Recline',sans-serif] font-bold text-[#042C89] text-[34px] sm:text-[44px] md:text-[34px] lg:text-[54.61px]">
                            Their mates.
                        </span>
                        <span className="relative inline-block font-['Gasoek_One',sans-serif] text-[#FFDE14] text-[42px] sm:text-[54px] md:text-[42px] lg:text-[74.26px] mt-1">
                            Their Samba.
                            <img src={swoosh} alt="" className="absolute left-0 -bottom-2 w-full h-auto pointer-events-none" />
                        </span>
                    </h1>

                    {/* Paragraph */}
                    <p className="font-['Poppins',sans-serif] text-[#042C89] font-medium text-[14px] sm:text-[16px] md:text-[13.5px] lg:text-[18.57px] leading-[1.5] mt-5 mb-6 max-w-[620px]">
                        A Brazilian-style football party with music, challenges and a tournament. We run every minute. You enjoy the party.
                    </p>

                    {/* Buttons: mobile full width stacked, desktop same as before */}
                    <div className="flex flex-col md:flex-row md:flex-wrap md:items-center gap-3">
                        <button
                            type="button"
                            onClick={handleEnquire}
                            className="inline-flex w-full md:w-auto items-center justify-center gap-2 bg-[#FFDE14] hover:bg-[#f2d100] text-[#042C89] font-['Poppins',sans-serif] font-bold text-[14px] lg:text-[17.47px] px-7 lg:px-8 py-4 md:py-3 lg:py-3.5 rounded-full shadow-md transition-all duration-300 hover:scale-[1.03] active:scale-95 cursor-pointer whitespace-nowrap"
                        >
                            Plan their party <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5" />
                        </button>
                        <button
                            type="button"
                            onClick={handlePackages}
                            className="inline-flex w-full md:w-auto items-center justify-center border-[1.5px] border-white text-white hover:bg-white hover:text-[#042C89] font-['Poppins',sans-serif] font-bold text-[14px] lg:text-[17.47px] px-7 lg:px-8 py-4 md:py-3 lg:py-3.5 rounded-full transition-all duration-300 cursor-pointer whitespace-nowrap"
                        >
                            See packages
                        </button>
                    </div>
                </div>
            </Container>

            {/* Mobile kids image */}
            <div className="block md:hidden w-full pointer-events-none z-0 -mt-4">
                <img src={bannerMobile} alt="Kids having fun at Samba party" className="w-full object-contain opacity-90" />
            </div>
        </section>
    );
}

export default HeroBanner;