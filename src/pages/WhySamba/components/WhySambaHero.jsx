import React from 'react';
import { Container } from '../../../components/common/Container';
import whyHeroBg from 'https://webstepdev.com/demo/syncoWebsiteImages/why-samba/hero-banner_1.png';
import whyHeroBgMb from 'https://webstepdev.com/demo/syncoWebsiteImages/why-samba/why-samba-mobile.png';
import yellowUnderline from 'https://webstepdev.com/demo/syncoWebsiteImages/yellow.png';
import mobilelayer from 'https://webstepdev.com/demo/syncoWebsiteImages/why-samba/mobile-layer-why-samba.png';
import desklayer from 'https://webstepdev.com/demo/syncoWebsiteImages/why-samba/banner-part.png';

export function WhySambaHero() {
  const tags = ['Skill', 'Flair', 'Creativity', 'Freedom', 'Fun'];

  return (
    <section
      style={{
        backgroundImage: `url(${whyHeroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'left',
      }}
      className="relative w-full  overflow-hidden lg:py-[100px] font-sans bg-[#00A6E3] py-12 2xl:pb-[130px] pb-0 sm:py-16 md:py-10 2xl:pt-[150px] "

    >

      <img
        src={whyHeroBgMb}
        alt=""
        aria-hidden="true"
        className=" block md:hidden bannerImage absolute inset-0 left-0 w-full h-full object-top object-cover pointer-events-none z-0"
      />
      <Container className="relative z-10">
        <div className="why-samba-hero-text py-6 md:p-0 rounded-3xl md:rounded-none backdrop-blur-xs md:backdrop-blur-none">

          {/* Top serif text: Bring back */}
          <h2 className="recline text-white font-bold text-[38px] md:text-[42px] lg:text-[52px] xl:text-[70px] 2xl:text-[74px] leading-tight tracking-normal">
            Bring back
          </h2>

          {/* Main chunky header: the beautiful game */}
          <h1 className="gasoek text-[#042C89] text-[40px] md:text-[44px] lg:text-[60px] xl:text-[70px] 2xl:text-[88px] leading-[1] md:leading-[0.95] tracking-[1.57px] mt-1 mb-1">
            the beautiful <br />game
          </h1>

          {/* Yellow curved underline vector */}
          <div className="mb-5 sm:mb-6 md:mt-2 mt-4">
            <img
              src={yellowUnderline}
              alt=""
              aria-hidden="true"
              className="w-[50%] sm:w-48 lg:w-72 -rotate-[10deg] object-cover"
            />
          </div>

          {/* Paragraph copy */}
          <p className="poppins text-[#042C89] font-semibold text-[14px] md:text-[15.5px] lg:text-[17px] xl:text-[22px] leading-[1.4] md:max-w-[340px] lg:max-w-[460px] xl:max-w-[50%]">
            Somewhere along the way, children’s football lost a little <br className='hidden lg:block' /> of what made so many of us fall in love with it.
          </p>

          {/* Yellow pill badges */}
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

          {/* Closing tagline */}
          <p className="poppins text-[#042C89] font-semibold text-[14px] md:text-[15.5px] lg:text-[17px] xl:text-[22px]">
            We created Samba to bring it back.
          </p>

        </div>
      </Container>
      <img src={mobilelayer} className='w-full block md:hidden relative z-99' alt="" />
      <img src={desklayer} className='why-samba-hero-photo w-full widthacc md:block h-full hidden absolute right-0 top-0 md:max-w-[372px] lg:max-w-[494px] xl:max-w-[723px] 2xl:max-w-[726px] z-99' alt="" />
    </section>
  );
}

export default WhySambaHero;
