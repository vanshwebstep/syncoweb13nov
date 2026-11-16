import React from 'react';
import { Star } from 'lucide-react';
import { Container } from '../../../components/common/Container';

import texture1 from 'https://webstepdev.com/demo/syncoWebsiteImages/texture.png';
import greenUnderline from 'https://webstepdev.com/demo/syncoWebsiteImages/home/green.png';
import Vector_2 from 'https://webstepdev.com/demo/syncoWebsiteImages/yellowbig.png';
import { TESTIMONIALS } from '../../../data/testimonials';
import googleLogo from 'https://webstepdev.com/demo/syncoWebsiteImages/google.png';
import layer from 'https://webstepdev.com/demo/syncoWebsiteImages/g_layer1.png';
import layer2 from 'https://webstepdev.com/demo/syncoWebsiteImages/g_layer2.png';
import buttonText from 'https://webstepdev.com/demo/syncoWebsiteImages/button-text.png';
export function Testimonials() {
  const [card1, card2, card3] = TESTIMONIALS;

  return (
    <section
      id="reviews"
      className="py-14 sm:py-16 bg-[#f8fafc] text-[#042C89] relative overflow-hidden font-sans"
      style={{
        backgroundImage: `url(${texture1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'multiply'
      }}
    >
      <Container className="relative z-10">

        {/* Header */}
        <div className="text-center mx-auto mb-2 sm:mb-14 lg:mb-12 xl:mb-16">
          {/* Desktop Heading (>= md) */}
          {/* Mobile Heading (< md) */}
          <h2 className="block md:hidden recline font-extrabold text-3xl text-[#042C89] leading-tight inline-block">
            <span className="block">20,000 happy</span>
            <span className="relative inline-block">
              families and counting
              <img
                className="absolute -bottom-6 rotate-[-3deg] left-6 w-[85%] h-6"
                src={greenUnderline}
                alt=""
              />
            </span>
          </h2>
          <div className="inline-flex items-center justify-center gap-2 sm:gap-3 md:mt-1 mt-12 relative">
            {/* Left yellow ray accent */}
            <span className="flex flex-col items-end gap-1 select-none">
              <img
                src={layer}
                alt="Panda"
                className="h-8 w-8 md:w-16 md:h-16 object-contain  drop-shadow-xs"
              />
            </span>

            {/* Google Pill */}
            <div className=" flex items-center gap-4">
              <img src={googleLogo} alt="Google" className="h-8 w-8 md:w-[51px] md:h-[51px] object-contain" />
              <span className="poppins font-semibold text-[#042C89] text-[15px] sm:text-[24px]">
                Real reviews from Google
              </span>
            </div>

            {/* Right yellow ray accent */}
            <span className="flex flex-col items-start gap-1 select-none">
              <img
                src={layer2}
                alt="Panda"
                className="h-8 w-8 md:w-16 md:h-16 object-contain  drop-shadow-xs"
              />
            </span>
          </div>
          <h2 className="hidden md:block recline font-extrabold text-3xl sm:text-4xl mt-8 lg:text-[40px] xl:text-5xl text-[#042C89] leading-tight">
            <span className="relative inline-block mr-2">
              20,000
              <img
                className="absolute -bottom-5 left-0 w-full h-6 text-[#FFDE14]"
                src={Vector_2}
                alt=""
              />
            </span>
            happy families and counting
          </h2>


        </div>

        {/* Testimonials Grid */}
        <div className="flex flex-col md:flex-row poppins max-w-[1198px] m-auto gap-4 lg:gap-5 xl:gap-5 2xl:gap-6 items-stretch justify-center pt-3 md:pt-0">

          {/* Left Column (col-span-6): 2 Stacked Horizontal Cards */}
          <div className="w-full md:flex-[1.2] lg:flex-[1.3] xl:flex-none xl:w-[640px] 2xl:w-[680px] flex flex-col gap-4 lg:gap-5 xl:gap-5 2xl:gap-6 justify-between poppins">

            {/* Top Card: Cyan Background (Muna Adan) */}
            {card1 && (
              <div className="bg-[#00A6E3] rounded-3xl p-5 md:p-4 lg:p-6 xl:p-7 2xl:p-[35px] border border-white/20 hover:-translate-y-1 transition-all duration-300 shadow-sm">
                {/* Desktop/Tablet layout (>= md) */}
                <div className="hidden md:flex flex-row items-center gap-3.5 lg:gap-5 xl:gap-6">
                  <div className="w-20 h-20 lg:w-28 lg:h-28 xl:w-36 xl:h-36 2xl:w-40 2xl:h-40 shrink-0 flex items-center justify-center">
                    <img src={card1.avatar} alt={card1.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="space-y-1.5 lg:space-y-2 text-left">
                    <div className="flex items-center gap-1">
                      {[...Array(card1.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 fill-[#FFDE14] text-[#FFDE14]" />
                      ))}
                    </div>
                    <p className="text-[#042C89] font-semibold text-[14px] lg:text-[16px] xl:text-[20px] 2xl:text-[22px] leading-snug">
                      “{card1.quote}”
                    </p>
                    <span className="text-[#042C89] italic text-[12px] lg:text-[13px] xl:text-[15px] font-bold block pt-0.5 lg:pt-1">
                      {card1.name} ({card1.role})
                    </span>
                  </div>
                </div>

                {/* Mobile layout (< md) */}
                <div className="flex md:hidden flex-col justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 shrink-0 flex items-center justify-center">
                      <img src={card1.avatar} alt={card1.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex flex-col text-left">
                      <div className="flex items-center gap-1">
                        {[...Array(card1.rating || 5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-[#FFDE14] text-[#FFDE14]" />
                        ))}
                      </div>
                      <span className="text-[#042C89] italic text-sm font-semibold mt-1">
                        {card1.name} ({card1.role})
                      </span>
                    </div>
                  </div>
                  <p className="text-[#042C89] font-semibold text-[14px] leading-snug mt-4 text-left">
                    “{card1.quote}”
                  </p>
                </div>
              </div>
            )}

            {/* Bottom Card: Yellow Background (George Nikolis) */}
            {card2 && (
              <div className="bg-[#FFDE14] rounded-3xl p-5 md:p-4 lg:p-6 xl:p-7 2xl:p-[35px] border border-white/20 hover:-translate-y-1 transition-all duration-300 shadow-sm">
                {/* Desktop/Tablet layout (>= md) */}
                <div className="hidden md:flex flex-row items-center gap-3.5 lg:gap-5 xl:gap-6">
                  <div className="w-20 h-20 lg:w-28 lg:h-28 xl:w-36 xl:h-36 2xl:w-40 2xl:h-40 shrink-0 flex items-center justify-center">
                    <img src={card2.avatar} alt={card2.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="space-y-1.5 lg:space-y-2 text-left">
                    <div className="flex items-center gap-1">
                      {[...Array(card2.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 fill-white text-white" />
                      ))}
                    </div>
                    <p className="text-[#042C89] font-semibold text-[14px] lg:text-[16px] xl:text-[20px] 2xl:text-[22px] leading-snug">
                      “{card2.quote}”
                    </p>
                    <span className="text-[#042C89] italic text-[12px] lg:text-[13px] xl:text-[15px] font-bold block pt-0.5 lg:pt-1">
                      {card2.name} ({card2.role})
                    </span>
                  </div>
                </div>

                {/* Mobile layout (< md) */}
                <div className="flex md:hidden flex-col justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 shrink-0 flex items-center justify-center">
                      <img src={card2.avatar} alt={card2.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex flex-col text-left">
                      <div className="flex items-center gap-1">
                        {[...Array(card2.rating || 5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-[#042C89] text-[#042C89]" />
                        ))}
                      </div>
                      <span className="text-[#042C89] italic text-sm font-semibold mt-1">
                        {card2.name} ({card2.role})
                      </span>
                    </div>
                  </div>
                  <p className="text-[#042C89] font-semibold text-[14px] leading-snug mt-4 text-left">
                    “{card2.quote}”
                  </p>
                </div>
              </div>
            )}

          </div>

          {/* Right Column (col-span-6): 1 Tall Vertical Green Card (Farshid Sefat) */}
          {card3 && (
            <div className="w-full md:flex-1 xl:flex-none xl:w-[480px] 2xl:w-[500px] mt-6 md:mt-0">
              <div className="bg-[#0DD180] rounded-3xl p-5 md:p-4 lg:p-6 xl:p-8 2xl:p-10 flex flex-col items-center justify-center text-center h-full border border-white/20 hover:-translate-y-1 transition-all duration-300 shadow-sm">

                {/* Desktop/Tablet layout (>= md) */}
                <div className="hidden md:flex flex-col items-center justify-center text-center space-y-2.5 lg:space-y-3.5 xl:space-y-4">
                  <div className="w-24 h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 2xl:w-44 2xl:h-44 shrink-0 flex items-center justify-center">
                    <img src={card3.avatar} alt={card3.name} className="w-full h-full object-contain" />
                  </div>

                  <div className="flex items-center justify-center gap-1">
                    {[...Array(card3.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 fill-[#FFDE14] text-[#FFDE14]" />
                    ))}
                  </div>

                  <p className="text-[#042C89] font-semibold text-[14px] lg:text-[16px] xl:text-[20px] 2xl:text-[22px] leading-[20px] lg:leading-[25px] xl:leading-[28px] 2xl:leading-[30px] px-1 lg:px-4 xl:px-6 2xl:px-10 my-1 lg:my-2">
                    “{card3.quote}”
                  </p>

                  <span className="text-[#042C89] italic text-[12px] lg:text-[13px] xl:text-[15px] font-bold block pt-0.5 lg:pt-1">
                    {card3.name} ({card3.role})
                  </span>
                </div>

                {/* Mobile layout (< md) */}
                <div className="flex md:hidden flex-col items-center text-center">
                  <div className="w-32 h-32 shrink-0 mb-3 flex items-center justify-center">
                    <img src={card3.avatar} alt={card3.name} className="w-full h-full object-contain" />
                  </div>

                  <p className="text-[#042C89] font-semibold md:text-[17px] text-[20px] leading-snug max-w-sm mx-auto my-2">
                    “{card3.quote}”
                  </p>

                  <span className="text-[#042C89] italic text-base font-bold block mt-3 mb-3">
                    {card3.name} ({card3.role})
                  </span>

                  <div className="flex items-center justify-center gap-1.5">
                    {[...Array(card3.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-[#FFDE14] text-[#FFDE14]" />
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>
        <div className="max-w-[95%] md:max-w-auto m-auto text-center mt-8 sm:mt-12">
          <a
            href="https://maps.google.com/?q=Samba+Soccer+Schools+London"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 tracking-[0.5px] border-2 border-[#042C89] text-[#042C89]   font-bold text-[12px] sm:text-[14px] uppercase px-7 py-3.5 sm:px-8 sm:py-3.5 rounded-full transition-all duration-200 poppins cursor-pointer w-full sm:w-auto"
          >
            <span>SEE MORE REVIEWS ON GOOGLE</span>
            <img src={buttonText} alt="" className='w-4' />          </a>
        </div>

      </Container>
    </section>
  );
}

export default Testimonials;
