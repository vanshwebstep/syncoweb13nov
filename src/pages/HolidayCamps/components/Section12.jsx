import React, { useRef, useState } from 'react';
import { Star } from 'lucide-react';
import { Container } from '../../../components/common/Container';

const BASE = 'https://webstepdev.com/demo/syncoWebsiteImages';
const blueBgTexture = `${BASE}/bluetexturedbg.png`;
const googleLogo = `${BASE}/google.png`;
const swoosh = `${BASE}/roadtorio/Swoosh.png`;
const review1Avatar = `${BASE}/holiday-camps/review_1.png`;
const review2Avatar = `${BASE}/holiday-camps/review_3.png`;
const review3Avatar = `${BASE}/holiday-camps/review_2.png`;

const REVIEWS = [
  {
    name: 'Wendy Smith Bishop',
    avatar: review1Avatar,
    text: 'His skills and confidence have grown and I have found the teaching to be very supportive and fun.',
    cardClass: 'bg-[#00A6E3]',
    starClass: 'fill-[#FFDE14] text-[#FFDE14]',
    textClass: 'text-white md:text-[#042C89]',
  },
  {
    name: 'Nayoka Oware',
    avatar: review3Avatar,
    text: 'Fantastic coaches! Kids are making so much progress! So glad my son is a part of Samba.',
    cardClass: 'bg-[#FFDE14]',
    starClass: 'fill-[#042C89] text-[#042C89]',
    textClass: 'text-[#042C89]',
  },
  {
    name: 'Huda Almashjari',
    avatar: review2Avatar,
    text: 'My son attended the summer camp this year and had an amazing time! The coaches created such a memorable, fun and educational atmosphere!',
    cardClass: 'bg-white',
    starClass: 'fill-[#FFDE14] text-[#FFDE14]',
    textClass: 'text-[#042C89]',
  },
];

export function Section12() {
  const scrollRef = useRef(null);
  const [active, setActive] = useState(0);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el || !el.firstChild) return;
    const step = el.firstChild.offsetWidth + 16; // card width + gap-4
    setActive(Math.min(REVIEWS.length - 1, Math.max(0, Math.round(el.scrollLeft / step))));
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#042C89] pt-10 pb-12 sm:py-16 lg:py-20">
      {/* Background Texture */}
      <img
        src={blueBgTexture}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
      />

      <Container className="relative z-10 px-5 md:px-6">
        {/* ===== Heading ===== */}
        <div className="text-center">
          <p className="font-['Poppins',sans-serif] font-semibold text-[#FFDE14] text-[10px] lg:text-[11px] uppercase mb-2">
            Parents say
          </p>
          <h2 className="leading-[1.1]">
            <span className="block font-['Recline',sans-serif] font-bold text-white text-[30px] sm:text-[36px] lg:text-[40px]">
              <span className="md:hidden">See what four</span>
              <span className="hidden md:inline">See what four days</span>
            </span>
            <span className="relative inline-block font-['Gasoek_One',sans-serif] text-[#FFDE14] text-[36px] sm:text-[44px] lg:text-[50px] mt-1">
              <span className="md:hidden">days can do.</span>
              <span className="hidden md:inline">can do.</span>
              <img
                src={swoosh}
                alt=""
                aria-hidden="true"
                className="absolute left-0 -bottom-0 w-full h-auto pointer-events-none select-none brightness-0 invert"
              />
            </span>
          </h2>

          {/* Google pill */}
          <div className="mt-7 md:mt-8 inline-flex items-center gap-3 bg-white rounded-full px-5 py-2.5">
            <img src={googleLogo} alt="Google" className="w-[22px] h-[22px] object-contain" />
            <span className="font-['Poppins',sans-serif] font-bold text-[#042C89] text-[13px] lg:text-[14px]">
              Real reviews from Google
            </span>
          </div>
        </div>

        {/* ===== Cards (mobile: swipe carousel, desktop: grid) ===== */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="mt-7 md:mt-10 flex md:grid md:grid-cols-3 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none gap-4 lg:gap-5 max-w-[1100px] mx-auto -mx-5 px-5 md:mx-auto md:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {REVIEWS.map((r) => (
            <div
              key={r.name}
              className={`${r.cardClass} snap-start shrink-0 md:shrink w-[84%] max-w-[320px] md:w-auto md:max-w-none rounded-[24px] p-6 lg:p-7 min-h-[240px] flex flex-col`}
            >
              {/* Avatar + stars */}
              <div className="flex items-center gap-3 mb-5">
                <img
                  src={r.avatar}
                  alt={r.name}
                  className="w-12 h-12 rounded-full object-cover shrink-0"
                />
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3.5 h-3.5 lg:w-4 lg:h-4 ${r.starClass}`} />
                  ))}
                </div>
              </div>

              <p className={`font-['Poppins',sans-serif] font-bold ${r.textClass} text-[14px] lg:text-[17px] leading-[1.45]`}>
                “{r.text}”
              </p>

              <p className={`mt-auto pt-6 font-['Poppins',sans-serif] font-bold ${r.textClass} text-[13px] lg:text-[14.5px] leading-tight`}>
                {r.name}
              </p>
            </div>
          ))}
        </div>

        {/* Dots (mobile only) */}
        <div className="md:hidden flex items-center justify-center gap-1.5 mt-5">
          {REVIEWS.map((_, i) => (
            <span
              key={i}
              className={`w-[7px] h-[7px] rounded-full transition-colors duration-300 ${
                i === active ? 'bg-[#FFDE14]' : 'bg-white/40'
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
            className="inline-flex items-center justify-center bg-white text-[#042C89] hover:bg-[#FFDE14] font-['Poppins',sans-serif] font-bold text-[13px] lg:text-[14px] px-8 py-3.5 rounded-full transition-all duration-200 cursor-pointer"
          >
            See more reviews on Google
          </a>
        </div>
      </Container>
    </section>
  );
}

export { Section12 as CampReviewsSection };
export default Section12;