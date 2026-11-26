import React from 'react';
import { Container } from '../../../components/common/Container';
import whyHeroBg from 'https://webstepdev.com/demo/syncoWebsiteImages/why-samba/hero-banner_1.svg?v=213';
import whyHeroBgMb from 'https://webstepdev.com/demo/syncoWebsiteImages/why-samba/why-samba-mobile.png';
import yellowUnderline from 'https://webstepdev.com/demo/syncoWebsiteImages/why-samba/yellowbig.svg';
import mobilelayer from 'https://webstepdev.com/demo/syncoWebsiteImages/why-samba/mobile-layer-why-samba.png';
import desklayer from 'https://webstepdev.com/demo/syncoWebsiteImages/why-samba/banner-part.svg';

export function WhySambaHero() {
  const tags = ['Skill', 'Flair', 'Creativity', 'Freedom', 'Fun'];

  return (
    <section
      style={{
        backgroundImage: `url(${whyHeroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'left',
      }}
      className="relative w-full overflow-hidden font-sans bg-[#00A6E3] pt-[130px] pb-0 sm:pt-[140px] md:pt-[130px] lg:pt-[160px] 2xl:pt-[190px] flex flex-col md:block"
    >
      {/* Mobile background */}
      <div
        aria-hidden="true"
        className="block md:hidden absolute inset-0 z-0 pointer-events-none bg-no-repeat bg-cover bg-top"
        style={{ backgroundImage: `url(${whyHeroBgMb})` }}
      />

      <Container className="relative z-10">
        <div className="why-samba-hero-text py-6 md:pt-0 md:pb-10 lg:pb-[100px] 2xl:pb-[130px] rounded-3xl md:rounded-none backdrop-blur-xs md:backdrop-blur-none">
          <h2 className="recline text-white font-bold text-[38px] md:text-[42px] lg:text-[52px] xl:text-[70px] 2xl:text-[74px] leading-tight tracking-normal">
            Bring back
          </h2>

        <h1 className="gasoek  text-[#042C89] text-[40px] md:text-[44px] lg:text-[60px] xl:text-[70px] 2xl:text-[88px] leading-[1] md:leading-[0.95] tracking-[1.57px] mt-1 mb-6">
  the beautiful <br />
  <span className="relative inline-block">
    game
    <img
      src={yellowUnderline}
      alt=""
      aria-hidden="true"
      className="absolute left-0 -bottom-2 md:-bottom-10 w-[100%] h-auto  object-contain pointer-events-none"
    />
  </span>
</h1>

          <p className="poppins mt-14 text-[#042C89] font-semibold text-[14px] md:text-[15.5px] lg:text-[17px] xl:text-[22px] leading-[1.4] md:max-w-[340px] lg:max-w-[500px] xl:max-w-[55%]">
            Somewhere along the way, children’s football lost a little <br className="hidden lg:block" /> of what made so many of us fall in love with it.
          </p>

          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 my-5 sm:my-6 lg:my-8 max-w-[360px] lg:max-w-none">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-[#FFDE14] text-[#042C89] font-black text-[13px] sm:text-xs md:text-[13px] lg:text-[15px] xl:text-[20px] px-3.5 sm:px-4 lg:px-4 xl:px-6 py-1.5 sm:py-2 lg:py-2 xl:py-3 rounded-full shadow-xs select-none"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="poppins text-[#042C89] font-semibold text-[14px] md:text-[15.5px] lg:text-[17px] xl:text-[22px]">
            We created Samba to bring it back.
          </p>
        </div>
      </Container>

      {/* Mobile layer */}
      <img
        src={mobilelayer}
        alt=""
        aria-hidden="true"
        className="block md:hidden relative z-[20] w-full h-auto mt-4 -mb-px align-bottom"
      />

      {/* Desktop layer */}
      <img
        src={desklayer}
        alt=""
        aria-hidden="true"
        className="why-samba-hero-photo hidden md:block absolute right-0  bottom-0 w-full h-auto md:max-w-[372px] lg:max-w-[494px] xl:max-w-[723px] 2xl:max-w-[726px] z-[20]"
      />
    </section>
  );
}

export default WhySambaHero;