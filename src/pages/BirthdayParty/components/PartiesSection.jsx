import React, { useState, useRef } from 'react';
import { Star } from 'lucide-react';
import { Container } from '../../../components/common/Container';
import textureBg from 'https://webstepdev.com/demo/syncoWebsiteImages/venues/allroads.png';
import { useVenue } from '../../Venues/VenueContext';

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
    avatar: avatar1,
    text: 'The coaches are brilliant with the little ones. It’s the highlight of our weekend, and the Copa was amazing.',
    cardClass: 'bg-white border border-[#E5EAF3]',
    textClass: 'text-[#042C89]',
    authorClass: 'text-[#042C89]',
    starClass: 'fill-[#FFDE14] text-[#FFDE14]',
  },
  {
    name: 'Amara, mum of Zara (8)',
    avatar: avatar2,
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
      className={`${r.cardClass} rounded-[24px] p-6 lg:p-7 ${
        mobile ? 'min-h-[300px]' : 'min-h-[310px]'
      } flex flex-col`}
    >
      {/* Avatar + stars */}
      <div className="flex items-center gap-4">
        <img
          src={r.avatar}
          alt={r.name}
          className="w-[72px] h-[72px] object-cover shrink-0 rounded-[45%_55%_50%_50%/55%_45%_55%_45%] border-2 border-[#0DD180]"
        />
        <div className="flex gap-1.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-3 h-3 ${r.starClass}`} />
          ))}
        </div>
      </div>

      {/* Quote */}
      <p
        className={`font-['Poppins',sans-serif] font-bold ${r.textClass} text-[15px] lg:text-[16px] leading-[1.5] mt-8`}
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

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollLeft / el.clientWidth);
    if (idx !== active && idx >= 0 && idx < REVIEWS.length) setActive(idx);
  };

  const goTo = (i) => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' });
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
          {/* ===== Heading ===== */}
          <div className="text-left md:text-center">
            <p className="font-['Poppins',sans-serif] font-bold text-[#00A6E3] text-[11px] tracking-wide uppercase mb-2">
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

          {/* ===== Cards: Mobile swipe carousel ===== */}
          <div className="md:hidden mt-6">
            <div
              ref={scrollRef}
              onScroll={onScroll}
              className="flex overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {REVIEWS.map((r) => (
                <div key={r.name} className="w-full shrink-0 snap-center">
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
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === active ? 'w-5 bg-[#0DD180]' : 'w-1.5 bg-[#C9D3E3]'
                  }`}
                />
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Bottom Curved White Section: All roads lead to Rio */}
      <section
        className="py-16 sm:py-24 text-[#042C89]   "
        style={{
          backgroundImage: `url(${textureBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'multiply'
        }}
      >

        <Container className="relative z-10 text-center">

          {/* Top Trophy Celebrating Kids Graphic */}
          <div className="relative mx-auto mb-8 flex justify-center items-center">
            <div className="w-[600px] ">
              <img
                src={trophyTeamPhoto}
                alt="Copa de Samba Finale"
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Headline */}
          <div className="space-y-1 mb-6">
            <h2 className="text-[70px] recline leading-none text-[#042C89] ">
              All roads lead
              <span className="text-[70px] block leading-none gasoek text-[#0DD180] relative">
                <div className="flex items-center justify-center gap-3">
                  <img src={vector} alt="" className="w-[45px] rotate-[175deg]" />
                  to rio
                  <img src={vector} alt="" className="w-[45px] " />
                </div>

                <img src={blue} alt="" className="w-[170px] -mt-3 m-auto" />
              </span>
            </h2>
          </div>

          {/* Paragraph Copy */}
          <p className="text-[#042C89] font-medium poppins text-xs sm:text-[22px] leading-relaxed max-w-xl mx-auto mb-6">
            Every skill, every player and every week brings them one step closer to the Copa de Samba — the grand finale of their Road to Rio.
          </p>

          {/* Cyan Highlighting Lines */}
          <p className="recline text-[#00A6E3] leading-[30px] font-bold text-sm sm:text-[24px] space-y-1 my-6">
            Brazilian colours. <br />
            Samba music. Families watching. <br />
            One massive stage.
          </p>

          {/* Bottom Summary Lines */}
          <div className="text-[#042C89] font-medium poppins text-sm sm:text-[22px] space-y-1 pt-2">
            <p>The road ends in Rio.</p>
            <p>The football stays with them.</p>
          </div>

        </Container>
      </section>

    </div>
  );
}