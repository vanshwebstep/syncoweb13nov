import React from 'react';
import { Container } from '../../../components/common/Container';

const IMAGE_BASE = 'https://webstepdev.com/demo/syncoWebsiteImages/contact';
const bannerDesktop = `${IMAGE_BASE}/banner.png`;
const bannerDesktopLayer = `${IMAGE_BASE}/image-football.png`;
const bannerLayer = `${IMAGE_BASE}/banner_layer.png`;
const bannerMobile = `${IMAGE_BASE}/banner_mobile_image.png`;
const bannerLayerSmall = `${IMAGE_BASE}/banner_layer_small.png`;
const bannerLayerSmallMobile = `${IMAGE_BASE}/banner_layer_small_mobile.png`;
const TEXT_IMAGE = "https://webstepdev.com/demo/syncoWebsiteImages/coaches/text-button.png"; // bottom white wave (optional)

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
        <div className="contact-hero-text text-left max-w-[660px]">
          {/* Heading */}
          <h1 className="gasoek text-[36px] xs:text-[40px] sm:text-[42px] md:text-[42px] lg:text-[45px] xl:text-[64px] leading-[1.2] md:leading-[1.06]">
            <span className="text-white ">Got a question?</span>
            <span className="text-[#FFDE14]  text-[46px] sm:text-[48px] md:text-[48px] lg:text-[51px] xl:text-[64px]">We're here  <br className='sm:hidden block' />to help.</span>
          </h1>

          {/* Subtitle */}
          <p className="poppins text-white font-bold text-[16px] xl:text-[18px] leading-[1.6] md:py-5 py-4">
            Whether it's about classes,<br className='sm:hidden block' /> memberships, camps or anything else Samba, send us a message and our team will get back to you.
          </p>

          {/* CTA Button */}
          <div>
            <button
              onClick={handleScrollToMessage}
              className="bg-[#042C89] hover:bg-[#021840] text-white font-bold text-[14px] sm:text-[15px] lg:text-[15.5px] px-6 sm:px-7 py-3 sm:py-3.5 rounded-full hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer poppins shadow-lg inline-flex items-center gap-2"
            >
              <span>Send us a message</span>
              <span className="text-md font-bold"><img src={TEXT_IMAGE} alt="Scroll down" className="h-[4px] rotate-[90deg]" /></span>
            </button>
          </div>

          {/* Translucent Callout Card */}
          <div className="contact-hero-callout mt-4 sm:mt-5 bg-white/30 backdrop-blur-md rounded-[20px] p-4 sm:px-6 sm:py-5 max-w-full sm:max-w-[520px] lg:max-w-[460px] xl:max-w-[520px]">
            <p className="poppins font-bold text-[#042C89] text-[12px] md:text-[14px]  leading-snug">
              Prefer to speak to us?
            </p>
            <p className="poppins text-[#042C89] font-bold text-[12px] md:text-[14px]  mt-1.5 leading-[1.7] md:leading-snug">
              Call{' '}
              <a href="tel:02072052723" dir="ltr" className="inline-block hover:underline">
                020 7205 2723
              </a>{' '} <br  className=" md:hidden block"/>
              or email{' '}
              <a href="mailto:admin@sambasoccerschools.com" dir="ltr" className="inline-block hover:underline">admin@sambasoccerschools.com</a>
            </p>
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