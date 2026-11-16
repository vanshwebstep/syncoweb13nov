import React from 'react';
import { Container } from '../../../components/common/Container';
import bglayer from 'https://webstepdev.com/demo/syncoWebsiteImages/home/qoute.png';
import qoutelayer from 'https://webstepdev.com/demo/syncoWebsiteImages/home/qoute-layer.png';
import bglayerMobile from 'https://webstepdev.com/demo/syncoWebsiteImages/home/Frame.png';
import Vector_2 from 'https://webstepdev.com/demo/syncoWebsiteImages/home/yellow-layer.png';
import chevrondouble from 'https://webstepdev.com/demo/syncoWebsiteImages/home/double-arrow.png';

// Dummy icon paths (baad mein real images se replace kar dena)
import skillIcon from 'https://webstepdev.com/demo/syncoWebsiteImages/home/promise-skill.png';
import confidenceIcon from 'https://webstepdev.com/demo/syncoWebsiteImages/home/promise-confidence.png';
import loveIcon from 'https://webstepdev.com/demo/syncoWebsiteImages/home/promise-love.png';

const promises = [
  { icon: skillIcon, title: 'Skill development', text: 'new skills every session' },
  { icon: confidenceIcon, title: 'More confidence', text: 'a little higher every week' },
  { icon: loveIcon, title: 'Love of football', text: 'bigger than ever' },
];

export function QuoteBanner() {
  return (
    <section
      className="py-8 pt-14 md:py-12 lg:py-16 lg:pb-14 md:px-0 px-2  bg-[image:var(--bg-mobile)] md:bg-[image:var(--bg-desktop)] bg-cover bg-center bg-no-repeat text-white relative overflow-hidden font-sans"
      style={{
        '--bg-mobile': `url(${bglayerMobile})`,
        '--bg-desktop': `url(${bglayer})`,
      }}
    >
      <img
        src={qoutelayer}
        alt=""
        aria-hidden="true"
        className="quote-banner-layer hidden md:block top-0 left-0 absolute w-[35%] 2xl:w-[27%] xl:w-[33%] h-full object-cover object-center pointer-events-none z-0"
      />

      <Container className="relative z-10 text-center">
        <div className="mx-auto space-y-4 max-w-[1140px] m-auto poppins">
          {/* Top 2 Lines: Dark Navy Bold Text */}
          <div className="quote-banner-top-text text-[#042C89] font-bold text-[16px] sm:text-[20px] md:text-[17px] min-[900px]:text-[18px] lg:text-[19px] xl:text-[22px] 2xl:text-[24px] leading-[1.4]">
            <p className="quote-banner-line block">
              We don’t promise scouting.
            </p>
            <p className="quote-banner-line block">
              We can’t guarantee football <br className='md:hidden block' /> superstardom.
            </p>
          </div>

          {/* Yellow Squiggly Wave Line */}
          <div className="py-2 flex justify-center">
            <img
              className="w-12 md:w-14 min-[900px]:w-16 md:h-2.5 min-[900px]:h-3 h-2"
              src={Vector_2}
              alt=""
            />
          </div>

          {/* Main Statement */}
          <h3 className="poppins font-bold text-[26px] sm:text-[30px] md:text-[26px] min-[900px]:text-[30px] lg:text-[34px] xl:text-[38px] 2xl:text-[44px] text-white leading-tight mx-auto">
            But here’s what we <br className='block md:hidden' /><span className="text-[#FFDE14]">do promise</span>.
          </h3>

          {/* Promise Cards */}
          <div className="quote-banner-cards grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 lg:gap-8 mx-auto pt-2 md:pt-4">
            {promises.map((item) => (
              <div
                key={item.title}
                className="quote-promise-card flex items-center gap-3 lg:gap-4 bg-white rounded-[20px] p-5 lg:p-6 text-left shadow-[0_1px_2px_0_rgba(0,0,0,0.08),0_1px_3px_1px_rgba(0,0,0,0.05)]"
              >
                <div className="quote-promise-icon shrink-0 flex items-center justify-center w-11 h-11 lg:w-14 lg:h-14">
                  <img
                    src={item.icon}
                    alt=""
                    aria-hidden="true"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="quote-promise-text leading-tight">
                  <p className="quote-promise-title text-[#042C89] font-bold text-[15px] lg:text-[17px] xl:text-[24px]">
                    {item.title}
                  </p>
                  <p className="quote-promise-desc text-[#3A4A7A] text-[12px] lg:text-[13px] xl:text-[17px] mt-1">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Double Down Chevron Accent */}
          <div className="flex justify-center text-white/90 pt-4">
            <div className="flex flex-col items-center">
              <img className="w-6" src={chevrondouble} alt="" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}