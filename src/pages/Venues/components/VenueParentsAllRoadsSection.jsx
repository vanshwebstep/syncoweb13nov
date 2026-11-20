import React, { useState, useRef } from 'react';
import { Star } from 'lucide-react';
import { Container } from '../../../components/common/Container';
import textureBg from 'https://webstepdev.com/demo/syncoWebsiteImages/venues/allroads.png';
import { useVenue } from '../VenueContext';

import avatar1 from 'https://webstepdev.com/demo/syncoWebsiteImages/venues/testimonial-avatar-parent-1.png';
import avatar2 from 'https://webstepdev.com/demo/syncoWebsiteImages/venues/testimonial-avatar-parent-2.png';
import avatar3 from 'https://webstepdev.com/demo/syncoWebsiteImages/venues/testimonial-avatar-parent-3.png';
import vector from 'https://webstepdev.com/demo/syncoWebsiteImages/yellow-vector.png';
import blue from 'https://webstepdev.com/demo/syncoWebsiteImages/bluevector.png';
import trophyTeamPhoto from 'https://webstepdev.com/demo/syncoWebsiteImages/venues/philosophy-ball-mastery-blob.png';
import googleBg from 'https://webstepdev.com/demo/syncoWebsiteImages/birthday-party/what_happend_banner.png';
import swoosh from 'https://webstepdev.com/demo/syncoWebsiteImages/roadtorio/Swoosh.png';

const REVIEWS = [
  {
    name: 'Priya, mum of Arjun (6)',
    avatar: avatar3,
    text: 'Every week my son can’t wait to show me the new skill he’s learned. His confidence has gone through the roof.',
    cardClass: 'bg-[#00A6E3]',
    textClass: 'text-white',
    authorClass: 'text-white/80',
    starClass: 'fill-[#FFDE14] text-[#FFDE14]',
  },
  {
    name: 'Mark, dad of Oliver (5)',
    avatar: avatar2,
    text: 'The coaches are brilliant with the little ones. It’s the highlight of our weekend, and the Copa was amazing.',
    cardClass: 'bg-white border border-[#E5EAF3]',
    textClass: 'text-[#042C89]',
    authorClass: 'text-[#042C89]',
    starClass: 'fill-[#FFDE14] text-[#FFDE14]',
  },
  {
    name: 'Amara, mum of Zara (8)',
    avatar: avatar1,
    text: 'You can see the progress in the Skills Tracker. She’s gone from shy to scoring in every game.',
    cardClass: 'bg-[#FFDE14]',
    textClass: 'text-[#042C89]',
    authorClass: 'text-[#042C89]',
    starClass: 'fill-[#042C89] text-[#042C89]',
  },
];

function ReviewCard({ r, mobile = false }) {
  return (
    <div
      className={`${r.cardClass} rounded-[22px] lg:rounded-[24px] p-5 lg:p-7 ${
        mobile ? 'min-h-[290px] h-full' : 'min-h-[310px]'
      } flex flex-col`}
    >
      {/* Avatar + stars */}
      <div className="flex items-center gap-3 lg:gap-4">
        <img
          src={r.avatar}
          alt={r.name}
          className="w-[56px] h-[56px] lg:w-[72px] lg:h-[72px] object-cover shrink-0 rounded-[45%_55%_50%_50%/55%_45%_55%_45%] border-2 border-[#0DD180]"
        />
        <div className="flex gap-1 lg:gap-1.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-3 h-3 ${r.starClass}`} />
          ))}
        </div>
      </div>

      {/* Quote */}
      <p
        className={`font-['Poppins',sans-serif] font-bold ${r.textClass} text-[14px] lg:text-[16px] leading-[1.5] mt-6 lg:mt-8`}
      >
        “{r.text}”
      </p>

      {/* Author */}
      <p
        className={`font-['Poppins',sans-serif] font-semibold ${r.authorClass} text-[11px] lg:text-[12px] mt-auto pt-6`}
      >
        {r.name}
      </p>
    </div>
  );
}

export function VenueParentsAllRoadsSection() {
  const { venueName } = useVenue();
  const [active, setActive] = useState(0);
  const scrollRef = useRef(null);

  // Card width + gap (gap-3 = 12px) se active dot nikalo
  const onScroll = () => {
    const el = scrollRef.current;
    if (!el || !el.firstElementChild) return;
    const step = el.firstElementChild.getBoundingClientRect().width + 12;
    const idx = Math.round(el.scrollLeft / step);
    if (idx !== active && idx >= 0 && idx < REVIEWS.length) setActive(idx);
  };

  const goTo = (i) => {
    const el = scrollRef.current;
    if (el && el.children[i]) {
      el.scrollTo({ left: el.children[i].offsetLeft - el.children[0].offsetLeft, behavior: 'smooth' });
    }
    setActive(i);
  };

  return (
    <div className="">
      {/* 1. Parents know it best */}
      <section
        aria-label={`Parents at Samba ${venueName} know it best`}
        className="relative w-full overflow-hidden bg-white py-10 sm:py-16 lg:py-20"
        style={{
          backgroundImage: `url(${googleBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Container className="relative z-10">
          {/* ===== Heading (mobile + desktop dono centered) ===== */}
          <div className="text-center">
            <p className="font-['Poppins',sans-serif] font-bold text-[#00A6E3] text-[10.5px] lg:text-[11px] tracking-wide uppercase mb-2">
              Parents
            </p>
            <h2 className="leading-[1.1]">
              <span className="block font-['Recline',sans-serif] font-bold text-[#042C89] text-[28px] sm:text-[36px] lg:text-[40px]">
                Parents
              </span>
              <span className="relative inline-block font-['Gasoek_One',sans-serif] text-[#0DD180] text-[36px] sm:text-[44px] lg:text-[50px] mt-1">
                know it best.
                <img
                  src={swoosh}
                  alt=""
                  aria-hidden="true"
                  className="absolute left-0 -bottom-2 w-full h-auto pointer-events-none select-none"
                />
              </span>
            </h2>

            {/* Google pill */}
            <div className="mt-6 md:mt-10 block">
              <div className="inline-flex items-center gap-3 md:gap-4 bg-[#EEF3FB] rounded-full px-5 md:px-8 py-3 md:py-3.5">
                <span className="font-['Gasoek_One',sans-serif] text-[#042C89] text-[18px] md:text-[20px] leading-none">
                  4.8
                </span>
                <span className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 md:w-3.5 md:h-3.5 fill-[#FFDE14] text-[#FFDE14]" />
                  ))}
                </span>
                <span className="font-['Poppins',sans-serif] font-semibold text-[#797A88] text-[11px] lg:text-[12px]">
                  Google reviews
                </span>
              </div>
            </div>
          </div>

          {/* ===== Cards: Desktop grid ===== */}
          <div className="hidden md:grid mt-10 grid-cols-3 gap-4 lg:gap-5 max-w-[1100px] mx-auto">
            {REVIEWS.map((r) => (
              <ReviewCard key={r.name} r={r} />
            ))}
          </div>

          {/* ===== Cards: Mobile swipe carousel (next card peek karta hai) ===== */}
          <div className="md:hidden mt-7">
            <div
              ref={scrollRef}
              onScroll={onScroll}
              className="relative flex gap-3 overflow-x-auto snap-x snap-mandatory scroll-pl-4 -mx-4 px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {REVIEWS.map((r) => (
                <div key={r.name} className="w-[80%] shrink-0 snap-start">
                  <ReviewCard r={r} mobile />
                </div>
              ))}
            </div>

            {/* Dots */}
            <div className="mt-4 flex items-center justify-center gap-2">
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to review ${i + 1}`}
                  onClick={() => goTo(i)}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    i === active ? 'bg-[#042C89]' : 'bg-[#D5DAE8]'
                  }`}
                />
              ))}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

export default VenueParentsAllRoadsSection;