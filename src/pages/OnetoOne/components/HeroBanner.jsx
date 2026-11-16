import React from "react";
import { Container } from "../../../components/common/Container";
import { useModal } from "../../../context/ModalContext";
import heroBg from "https://webstepdev.com/demo/syncoWebsiteImages/one-to-one/onetoonehero.png";
import heroBgLayer from "https://webstepdev.com/demo/syncoWebsiteImages/one-to-one/home_banner_layer.png";
import bannerDesktop from "https://webstepdev.com/demo/syncoWebsiteImages/one-to-one/banner_image.png";
import mobileHero from "https://webstepdev.com/demo/syncoWebsiteImages/one-to-one/mobile_hero.png";
import layerMobile from "https://webstepdev.com/demo/syncoWebsiteImages/one-to-one/layer_mobile.png";

export function HeroBanner() {
    const { openModal } = useModal();

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
        <section className="relative w-full overflow-hidden z-[9] md:flex items-center">
            {/* Desktop Background with Green Pattern, Kids, Mascot & Wavy Bottom */}
            <img
                src={heroBg}
                alt="Samba Soccer One-to-One"
                className="hidden md:block absolute inset-0 w-full h-full object-cover object-bottom lg:object-bottom pointer-events-none select-none z-0"
            />
            <img
                src={heroBgLayer}
                alt="Samba Soccer One-to-One"
                className="onetoone-hero-yellow-wave hidden md:block absolute w-[60%] right-0 top-0 object-cover object-right lg:object-center pointer-events-none select-none z-0"
            />

            {/* Mobile Background and Top Wave Layer */}
            <img
                src={mobileHero}
                alt="Samba Soccer One-to-One"
                className="md:hidden block absolute inset-0 w-full h-full object-cover object-bottom pointer-events-none select-none z-0"
            />
            <img
                src={layerMobile}
                alt=""
                aria-hidden="true"
                className="md:hidden block absolute top-0 left-0 w-full pointer-events-none select-none z-[1] object-contain"
            />

            <Container className="relative z-10 w-full pt-[75px] xs:pt-[85px] sm:pt-[95px] pb-[320px] xs:pb-[360px] min-h-[900px] md:min-h-[600px] lg:min-h-0 md:py-16 lg:pb-[170px] lg:pt-[100px]">
                <div className="max-w-[680px] md:max-w-[420px] lg:max-w-[620px] 2xl:max-w-[680px] text-left">
                    {/* Main Heading */}
                    <h1 className="gasoek text-[34px] xs:text-[44px] sm:text-[52px] md:text-[38px] lg:text-[57px] leading-[1.3] md:leading-[1.18] lg:leading-[79px]">
                        <span className="text-[#042C89]">
                            <span className="block md:inline">Sometimes </span>
                            <span className="block md:inline">
                                <span className="md:hidden">they just need</span>
                                <span className="hidden md:inline">
                                    they <br className="hidden md:inline" />{' '}just need{' '}
                                </span>
                            </span>
                        </span>{' '}
                        <span className="text-white md:text-[#FFDE14]">
                            <span className="block md:inline">a little more </span>
                            <span className="block md:inline">attention.</span>
                        </span>
                    </h1>

                    {/* Subtitle / Paragraph */}
                    <p className="poppins text-[#042C89] font-semibold text-[16px] md:text-[15px] lg:text-[16px] 2xl:text-[18px] leading-[1.4] md:leading-[1.38] mt-4 sm:mt-6 md:mt-3.5 lg:mt-6 mb-3 sm:mb-6 md:mb-3 lg:mb-6">
                        Maybe they’re struggling with one part of their game. Maybe their confidence has taken a knock. Or maybe they’re ready to push on <br className="hidden lg:block" />and need more of a challenge.
                    </p>
                    <p className="poppins text-[#042C89] font-bold text-[15px] sm:text-[17px] md:text-[15px] lg:text-[16px] 2xl:text-[18px] leading-[1.4] md:leading-[1.38] mb-3 sm:mb-6 md:mb-3 lg:mb-6">
                        That’s where one-to-one changes things.
                    </p>
                    <p className="recline text-white font-bold text-[17px] md:text-[16px] lg:text-[18px]  2xl:text-[21px] leading-[1.38] mb-6 sm:mb-7 md:mb-5 lg:mb-7">
                        One child. One Samba coach. One hour focused entirely on <i className="hidden sm:inline">their</i> <span className="sm:hidden  ">their</span> game.
                    </p>

                    {/* Enquire Today CTA Button */}
                    <div>
                        <button
                            onClick={handleEnquire}
                            className="bg-[#042C89] hover:bg-[#021840] w-max text-white font-bold text-[14px] xs:text-[15px] sm:text-[20px] md:text-[16px] lg:text-[20px] px-4 sm:px-8 md:px-6 lg:px-8 py-3 sm:py-4 md:py-3.5 lg:py-4 rounded-full hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer poppins inline-block"
                        >
                            Book their first session
                        </button>
                    </div>
                </div>
            </Container>

            {/* Desktop Hero Illustration */}
            <div className="hidden md:flex items-end justify-end w-full md:w-[380px] lg:w-[680px] 2xl:w-[780px] absolute right-0 md:right-0 lg:right-6 xl:right-0 bottom-0 lg:bottom-[-6%] 2xl:bottom-[-40px] h-full pointer-events-none z-0 onetoone-hero-illustration">
                <img
                    src={bannerDesktop}
                    alt="Kids having fun at Samba party"
                    className="w-full object-contain opacity-90 md:max-h-[85%] lg:max-h-none"
                />
            </div>
        </section>
    );
}

export default HeroBanner;
