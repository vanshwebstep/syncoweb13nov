import React from 'react';
import { Container } from '../../../components/common/Container';
import { ArrowRight, Phone } from 'lucide-react';

const IMAGE_BASE = 'https://webstepdev.com/demo/syncoWebsiteImages/contact';
const bannerDesktop = `${IMAGE_BASE}/banner.png`;
const bannerDesktopLayer = `${IMAGE_BASE}/image-football.png`;
const bannerLayer = `${IMAGE_BASE}/banner_layer.png`;
const bannerMobile = `${IMAGE_BASE}/banner_mobile_image.png`;
const bannerLayerSmall = `${IMAGE_BASE}/banner_layer_small.png`;
const bannerLayerSmallMobile = `${IMAGE_BASE}/banner_layer_small_mobile.png`;
const TEXT_IMAGE = "https://webstepdev.com/demo/syncoWebsiteImages/coaches/text-button.png"; // bottom white wave (optional)
const WHITELINE = 'https://webstepdev.com/demo/syncoWebsiteImages/roadtorio/whiteline.png';

export function HeroSection() {
  const handleScrollToMessage = () => {
    const target = document.getElementById('contact-form');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      className="
        contact-hero-section
        relative w-full lg:py-10 pt-16 overflow-hidden bg-[#0DD180] z-[9] flex items-center
        min-h-[500px] sm:min-h-[510px] md:min-h-[510px] lg:min-h-[520px] xl:min-h-[570px]
      "
    >
      {/* Background Desktop */}
      <div
        className="contact-hero-bg-desktop hidden md:block absolute inset-0 bg-cover bg-bottom bg-no-repeat pointer-events-none select-none z-0"
        style={{ backgroundImage: `url(${bannerDesktop})` }}
      />
      {/* Background Mobile */}
      <div
        className="contact-hero-bg-mobile block md:hidden absolute inset-0 bg-cover bg-bottom bg-no-repeat pointer-events-none select-none z-0"
        style={{ backgroundImage: `url(${bannerMobile})` }}
      />

      {/* Blue Wave Top Layer (Desktop) */}
      <img
        src={bannerLayer}
        alt=""
        className="contact-hero-wave-large hidden md:block absolute top-0 right-0 2xl:w-[38%] w-[50%] object-contain pointer-events-none select-none z-[1]"
      />
      <img
        src={bannerLayerSmallMobile}
        alt=""
        className="contact-hero-wave-mobile block md:hidden absolute top-0 right-0 w-[100%] object-contain pointer-events-none select-none z-[1]"
      />
      <img
        src={bannerLayerSmall}
        alt=""
        className="contact-hero-wave-small hidden md:block absolute top-0 left-0 w-[15%] object-contain pointer-events-none select-none z-[1]"
      />

      {/* Hero Content */}
      <Container className="relative z-10 w-full ">
         <div className="text-left max-w-[560px] md:max-w-[480px] lg:max-w-[700px]">
          {/* Heading */}
          <h1 className="leading-[1.1]">
            <span className="recline block font-bold text-white text-[32px] sm:text-[40px] md:text-[34px] lg:text-[52px]">
              Got a question?
            </span>
            <span className="gasoek relative inline-block whitespace-nowrap text-[#FFDE14] text-[30px] sm:text-[42px] md:text-[34px] lg:text-[60px] mt-3">
              We’re here to help.
              <img src={WHITELINE} alt="" aria-hidden="true" className="absolute left-0 -bottom-2 w-full h-auto pointer-events-none select-none" />
            </span>
          </h1>

          {/* Subtitle */}
          <p className="poppins mt-8 font-medium text-[#042C89] text-[14px] sm:text-[16px] md:text-[14px] lg:text-[17px] leading-[1.6]">
            Classes, memberships, camps or anything else Samba.
            <br className="hidden sm:block" />
            Send us a message and our team will get back to you.
          </p>

          {/* Buttons */}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleScrollToMessage}
              className="poppins inline-flex items-center justify-center gap-2 bg-[#042C89] hover:bg-[#021840] text-white font-bold text-[13px] lg:text-[15px] px-7 lg:px-9 py-3.5 lg:py-4 rounded-full shadow-lg transition-all duration-300 hover:scale-[1.03] active:scale-95 cursor-pointer whitespace-nowrap"
            >
              Send a message <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="tel:02072052723"
              dir="ltr"
              className="poppins inline-flex items-center justify-center gap-2 border-[1.5px] border-white text-white hover:bg-white hover:text-[#042C89] font-bold text-[13px] lg:text-[15px] px-7 lg:px-9 py-3.5 lg:py-4 rounded-full transition-all duration-300 whitespace-nowrap"
            >
              <Phone className="w-4 h-4" /> 020 7205 2723
            </a>
          </div>
        </div>
      <img
        src={bannerDesktopLayer}
        alt="Samba Soccer Players Desktop"
        className="contact-hero-kids lg:absolute bottom-0 lg:right-0 lg:max-w-[420px] xl:max-w-[640px] xl:-right-[2%] 2xl:max-w-[600px] 2xl:-mb-[10px] xl:-mb-[40px] z-[2] pointer-events-none select-none"
      />
      </Container>
    </section>
  );
}

export default HeroSection;