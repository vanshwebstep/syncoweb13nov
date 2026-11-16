import React from 'react';
import { Container } from '../../../components/common/Container';
import heroBg from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/your-child-hero.png';
import heroBgMobile from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/road-to-rio-hero-mobile.png';
import kidsGraphic from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/rio-banner.png';
import mixLayer from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/mix_layer.png';
import rio from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/rio-layer.png';

export function RoadToRioHero() {
  return (
    <section className="relative w-full py-[60px] px-2 md:px-0 sm:py-[80px] overflow-hidden font-sans min-h-[1050px] sm:min-h-[700px] lg:min-h-0">
      {/* Mobile background image */}
      <img
        src={heroBgMobile}
        alt=""
        aria-hidden="true"
        className="block lg:hidden absolute inset-0 w-full h-full object-cover object-top pointer-events-none z-0"
      />

      {/* Desktop background image */}
      <img
        src={heroBg}
        alt=""
        aria-hidden="true"
        className="hidden lg:block absolute inset-0 w-full h-full object-cover object-top pointer-events-none z-0"
      />

      <Container className="relative z-10 pt-10 pb-64 sm:pb-80 lg:pb-24 lg:pt-12 md:py-20 lg:py-24">
        {/* Left Column: Heading & Subtitle */}
        <div className="space-y-4 sm:space-y-6  text-left">
          <h1 className="font-['Gasoek_One',sans-serif] text-[70px] xl:text-[88px] leading-[1.05] tracking-wide uppercase">
            <span className="text-[#042C89] block">
              YOUR CHILD'S
            </span>
            <span className="text-[#042C89] inline">
              ROAD TO{' '}
            </span>
            <span className="text-[#FFDE14] text-[68px] sm:text-[90px] lg:text-[114px] relative inline-block">
              Rio
              <img
                src={mixLayer}
                alt=""
                className="absolute -bottom-6 sm:-bottom-10 left-0 w-full h-auto object-contain pointer-events-none"
              />
            </span>
          </h1>

          <div className="font-['Poppins',sans-serif] text-white font-bold text-[18px] pt-6 sm:pt-10 lg:text-[24px] leading-[28px] sm:leading-[35px] max-w-xl mx-auto lg:mx-0 space-y-1">
            <p>This isn't just another weekly <br className='block md:hidden'/> football class. <br className='md:block hidden'/>
           It's a year-long  <br className='block md:hidden'/> immersive adventure through  <br className='block md:hidden'/> Brazilian football.</p>
          </div>
        </div>
      </Container>

      {/* Desktop only overlays (already present in mobile background) */}
      <div className="hidden lg:block absolute w-[650px] z-[9] right-5 top-0 -mb-6 sm:-mb-10 lg:-mb-14">
        <img
          src={kidsGraphic}
          alt="Kids playing football on the Road to Rio"
          className="w-full h-auto object-contain drop-shadow-2xl"
        />
      </div>
      <img
        src={rio}
        alt=""
        className="hidden lg:block bannerLayer absolute right-0 bottom-0 w-[85%]"/>
    </section>
  );
}

export default RoadToRioHero;