import React, { useRef, useState } from 'react';
import { Star } from 'lucide-react';
import { Container } from '../../../components/common/Container';

import googleLogo from 'https://webstepdev.com/demo/syncoWebsiteImages/google.png';
import bgTexture from 'https://webstepdev.com/demo/syncoWebsiteImages/birthday-party/what_happend_banner.png';
import rev1 from 'https://webstepdev.com/demo/syncoWebsiteImages/one-to-one/pp-1.png';
import rev2 from 'https://webstepdev.com/demo/syncoWebsiteImages/one-to-one/pp-2.png';
import swoosh from 'https://webstepdev.com/demo/syncoWebsiteImages/roadtorio/Swoosh.png';

// Mobile: sab cards cyan + white text. Desktop: md: classes se original colors.
const REVIEWS = [
  {
    name: 'Lori Gately',
    avatar: rev1,
    text: 'My son loved his private lessons. Coach Ade was excellent and reliable.',
    cardClass: 'md:bg-[#00A6E3]',
    textClass: 'md:text-white',
    nameClass: 'md:text-white',
    metaClass: 'md:text-white/70',
    stars: true,
  },
  {
    name: 'Ramona Guerrettaz',
    avatar: rev2,
    text: 'Coach Ainsley is so knowledgeable and was so much fun for my daughter. He taught her a lot of cool tricks.',
    cardClass: 'md:bg-[#FFDE14]',
    textClass: 'md:text-[#042C89]',
    nameClass: 'md:text-[#042C89]',
    metaClass: 'md:text-[#797A88]',
    stars: false,
  },
  {
    name: 'Google reviewer',
    initial: 'C',
    text: 'Our 7-year-old has been having one-to-one sessions with Kym, who has been brilliant. They’ve given him so much confidence.',
    cardClass: 'md:bg-white md:border md:border-[#E5EAF3]',
    textClass: 'md:text-[#042C89]',
    nameClass: 'md:text-[#042C89]',
    metaClass: 'md:text-[#797A88]',
    stars: true,
  },
];

export function PartiesSection() {
  const scrollRef = useRef(null);
  const [active, setActive] = useState(0);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el || !el.clientWidth) return;
    setActive(Math.min(REVIEWS.length - 1, Math.max(0, Math.round(el.scrollLeft / el.clientWidth))));
  };

  return (
    <section
      className="relative w-full overflow-hidden bg-white py-10 sm:py-16 lg:py-20"
      style={{
        backgroundImage: `url(${bgTexture})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Container className="relative z-10 px-5 md:px-6">
        {/* ===== Heading ===== */}
        <div className="text-left md:text-center">
          <h2 className="leading-[1.1]">
            <span className="block font-['Recline',sans-serif] font-bold text-[#042C89] text-[24px] sm:text-[36px] lg:text-[40px]">
              See what individual
            </span>
            <span className="relative inline-block font-['Gasoek_One',sans-serif] text-[#0DD180] text-[30px] sm:text-[44px] lg:text-[50px] mt-1">
              attention can do.
              <img src={swoosh} alt="" aria-hidden="true" className="absolute left-0 -bottom-1.5 md:-bottom-2 w-full h-auto pointer-events-none select-none" />
            </span>
          </h2>

          {/* Google pill */}
          <div className="mt-6 md:mt-8 flex md:inline-flex">
            <div className="inline-flex items-center gap-2 md:gap-3 bg-[#EEF3FB] rounded-full px-3.5 md:px-5 py-2 md:py-2.5">
              <img src={googleLogo} alt="Google" className="w-[16px] h-[16px] md:w-[22px] md:h-[22px] object-contain" />
              <span className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 fill-[#FFDE14] text-[#FFDE14]" />
                ))}
              </span>
              <span className="font-['Poppins',sans-serif] font-bold text-[#042C89] text-[10px] md:text-[13px] lg:text-[14px]">
                4.8 on Google
              </span>
            </div>
          </div>
        </div>

        {/* ===== Cards (mobile: swipe carousel, desktop: grid) ===== */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="mt-6 md:mt-10 flex md:grid md:grid-cols-3 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none gap-4 lg:gap-5 max-w-[1100px] mx-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {REVIEWS.map((r) => (
            <div
              key={r.name}
              className={`bg-[#00A6E3] ${r.cardClass} w-full shrink-0 md:shrink snap-center rounded-[20px] md:rounded-[24px] p-5 lg:p-7 md:min-h-[240px] flex flex-col`}
            >
              <div className={`flex gap-1 mb-4 md:mb-5 ${r.stars ? '' : 'md:hidden'}`}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#FFDE14] text-[#FFDE14]" />
                ))}
              </div>

              <p className={`font-['Poppins',sans-serif] font-bold text-white ${r.textClass} text-[14px] lg:text-[17px] leading-[1.5]`}>
                “{r.text}”
              </p>

              <div className="mt-auto pt-5 md:pt-6 flex items-center gap-3">
                {r.avatar ? (
                  <img src={r.avatar} alt={r.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
                ) : (
                  <span className="w-10 h-10 rounded-full bg-[#F4511E] text-white font-['Poppins',sans-serif] font-bold text-[18px] flex items-center justify-center shrink-0">
                    {r.initial}
                  </span>
                )}
                <div>
                  <p className={`font-['Poppins',sans-serif] font-bold text-white ${r.nameClass} text-[12px] lg:text-[14.5px] leading-tight`}>
                    {r.name}
                  </p>
                  <p className={`font-['Poppins',sans-serif] text-white/70 ${r.metaClass} text-[11px] lg:text-[12.5px] mt-0.5`}>
                    Google review
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots (mobile only) */}
        <div className="md:hidden flex items-center justify-center gap-1.5 mt-5">
          {REVIEWS.map((_, i) => (
            <span
              key={i}
              className={`h-[6px] rounded-full transition-all duration-300 ${
                i === active ? 'w-[16px] bg-[#0DD180]' : 'w-[6px] bg-[#D5DBE8]'
              }`}
            />
          ))}
        </div>

        {/* ===== Button ===== */}
        <div className="mt-6 md:mt-10 text-center">
          <a
            href="https://maps.google.com/?q=Samba+Soccer+Schools+London"
            target="_blank"
            rel="noopener noreferrer"
            className="flex md:inline-flex w-full md:w-auto items-center justify-center bg-white border-[1.5px] border-[#042C89] text-[#042C89] hover:bg-[#042C89] hover:text-white font-['Poppins',sans-serif] font-bold text-[13px] lg:text-[14px] px-8 py-3.5 rounded-full transition-all duration-200 cursor-pointer"
          >
            See more reviews on Google
          </a>
        </div>
      </Container>
    </section>
  );
}

export default PartiesSection;