import React, { useRef, useState } from 'react';
import { Container } from '../../../components/common/Container';
import wayGirlImg from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/way.png';

import imgPitch from 'https://webstepdev.com/demo/syncoWebsiteImages/card1.png';
import imgSambaMusic from 'https://webstepdev.com/demo/syncoWebsiteImages/feature-samba-music.png';
import imgSkillsBall from 'https://webstepdev.com/demo/syncoWebsiteImages/card3.png';
import imgRoadToRio from 'https://webstepdev.com/demo/syncoWebsiteImages/Frame 1000004801.png';
import imgSkillsTracker from 'https://webstepdev.com/demo/syncoWebsiteImages/feature-skills-tracker.png';
import imgSkillsTrackerMobile from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/skills-tracker-mobile.png';
import imgVenueManager from 'https://webstepdev.com/demo/syncoWebsiteImages/feature-venue-manager.png';
import imgVenueManagerMobile from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/venue-manager-mobile.png';
import textureBg from 'https://webstepdev.com/demo/syncoWebsiteImages/texture.png';
import green from 'https://webstepdev.com/demo/syncoWebsiteImages/flying-ball-motion-trail.png';

const ingredients = [
  {
    title: 'Ball mastery',
    desc: 'More touches. More technique. More ways to use the ball.',
    img: imgPitch,
    bgAccent: 'bg-[#FFDE14]',
    rotation: '-rotate-[3deg]',
  },
  {
    title: 'Samba Music',
    desc: 'Energy and Brazilian spirit from the moment they arrive.',
    img: imgSambaMusic,
    bgAccent: 'bg-[#0DD180]',
    rotation: 'rotate-[3deg]',
  },
  {
    title: 'Samba Skills Ball',
    desc: 'Smaller. Weighted. Built for close control and technique.',
    img: imgSkillsBall,
    bgAccent: 'bg-[#FFDE14]',
    rotation: '-rotate-[3deg]',
  },
  {
    title: 'Road to Rio',
    desc: 'New skills, heroes and challenges across a year-long adventure.',
    img: imgRoadToRio,
    bgAccent: 'bg-[#0DD180]',
    rotation: 'rotate-[2.5deg]',
  },
  {
    title: 'Skills Tracker',
    desc: 'Skills learned. Badges earned. What comes next?',
    img: imgSkillsTracker,
    imgMobile: imgSkillsTrackerMobile,
    bgAccent: 'bg-[#FFDE14]',
    rotation: '-rotate-[2.5deg]',
  },
  {
    title: 'Venue Manager',
    desc: 'Every session overseen. Every coach supported. Every week.',
    img: imgVenueManager,
    imgMobile: imgVenueManagerMobile,
    bgAccent: 'bg-[#0DD180]',
    rotation: 'rotate-[2.5deg]',
  },
];

function IngredientCard({ item, mobile = false }) {
  return (
    <div className="relative group flex h-full">
      {/* Colored rotated accent background */}
      <div
        className={`absolute inset-0 rounded-[20px] ${item.bgAccent} ${item.rotation} transform transition-transform duration-300 group-hover:scale-105 z-0`}
      />

      {/* Main white card */}
      <div
        className={`bg-white rounded-[20px] shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:shadow-xl transition-all duration-300 relative z-10 flex flex-col justify-between w-full ${
          mobile
            ? 'p-4 min-h-[160px]'
            : 'p-5 md:p-4 lg:p-5 min-h-[185px] md:min-h-[170px] lg:min-h-[185px]'
        }`}
      >
        {/* Icon */}
        <div
          className={`flex items-center justify-start ${
            mobile ? 'h-12 mb-2' : 'h-14 md:h-11 lg:h-14 mb-3 md:mb-2 lg:mb-3'
          }`}
        >
          {item.imgMobile ? (
            <>
              <img
                src={item.imgMobile}
                alt={item.title}
                className="h-12 md:h-9 lg:h-12 w-auto max-w-[65px] md:max-w-[50px] lg:max-w-[65px] object-contain transition-transform duration-300 group-hover:scale-105 block md:hidden"
              />
              <img
                src={item.img}
                alt={item.title}
                className="h-12 md:h-9 lg:h-12 w-auto max-w-[65px] md:max-w-[50px] lg:max-w-[65px] object-contain transition-transform duration-300 group-hover:scale-105 hidden md:block"
              />
            </>
          ) : (
            <img
              src={item.img}
              alt={item.title}
              className="h-12 md:h-9 lg:h-12 w-auto max-w-[65px] md:max-w-[50px] lg:max-w-[65px] object-contain transition-transform duration-300 group-hover:scale-105"
            />
          )}
        </div>

        {/* Text */}
        <div className="space-y-1.5 sm:space-y-2">
          <h3
            className={`poppins font-black leading-snug ${
              mobile
                ? 'text-[18px] text-[#00A6E3]'
                : 'text-[20px] md:text-[16px] min-[900px]:text-[18px] lg:text-[20px] text-[#0DD180]'
            }`}
          >
            {item.title}
          </h3>
          <p
            className={`poppins font-medium leading-snug ${
              mobile
                ? 'text-[13px] text-[#042C3F]'
                : 'text-[14px] sm:text-[16px] md:text-[12px] min-[900px]:text-[13px] lg:text-[14px] text-[#475569] leading-relaxed'
            }`}
          >
            {item.desc}
          </p>
        </div>
      </div>
    </div>
  );
}

export function JoyThroughSection() {
  const scrollRef = useRef(null);
  const [active, setActive] = useState(0);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el || !el.firstChild) return;
    const card = el.firstChild;
    const step = card.offsetWidth + 20; // card width + gap
    setActive(Math.min(ingredients.length - 1, Math.max(0, Math.round(el.scrollLeft / step))));
  };

  return (
    <section
      style={{
        backgroundImage: `url(${textureBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'multiply',
      }}
      className="py-16 px-2 md:px-0 relative overflow-hidden font-sans"
    >
      <Container>
        {/* Top Header & Girl Illustration */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-10 items-center mb-8 md:mb-12 lg:mb-16">
          {/* Left Column: Heading & Paragraphs */}
          <div className="order-2 md:col-span-6 lg:col-span-6 max-w-[494px] space-y-2.5 md:space-y-2 lg:space-y-4">
            <h2 className="recline leading-[0.9] md:mb-0 mb-10 text-[#042C89]">
              <span className="font-black text-[#042C89] text-[71px] sm:text-[46px] md:text-[38px] min-[900px]:text-[44px] lg:text-[52px] xl:text-[64px] 2xl:text-[70px] block">The Samba </span>
              <span className="gasoek relative text-[#0DD180] text-[108px] sm:text-[62px] md:text-[50px] min-[900px]:text-[60px] lg:text-[72px] xl:text-[88px] 2xl:text-[96px] inline-block mr-3">
                Way
                <img
                  className="absolute -bottom-8 md:-bottom-6 lg:-bottom-8 left-0 w-[96%] md:h-5 lg:h-6 rotate-[4deg] h-4"
                  src={green}
                  alt=""
                />
              </span>
            </h2>

            <p className="text-[20px]  sm:text-[15px] md:text-[13.5px] min-[900px]:text-[15px] lg:text-[18px] xl:text-[20px] md:leading-relaxed text-[#042C89] poppins font-medium md:max-w-xl pt-2 md:pt-3 lg:pt-8">
              Road to Rio is part of a complete weekly experience built around
              better skills, visible progress and football children want to come
              back to.
            </p>

            {/* Mobile only bold line */}
            <p className="md:hidden text-[18px] leading-[22px] text-[#042C89] poppins font-extrabold pt-3">
              Here's what makes Samba different.
            </p>
          </div>

          {/* Right Column: Blob Frame Image */}
          <div className="order-1 md:col-span-6 lg:col-span-6 relative flex justify-center">
            <div className="relative w-full max-w-[300px] sm:max-w-[340px] md:max-w-[280px] min-[900px]:max-w-[340px] lg:max-w-[420px] xl:max-w-[480px] 2xl:max-w-[500px] flex items-center justify-center hover:scale-103 transition-transform duration-500">
              <img
                src={wayGirlImg}
                alt="The Samba Way"
                className="w-full h-auto object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>

        {/* ===== Mobile: horizontal carousel ===== */}
        <div className="md:hidden">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory py-4 px-3 -mx-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {ingredients.map((item, idx) => (
              <div key={idx} className="snap-start shrink-0 w-[68%] max-w-[260px]">
                <IngredientCard item={item} mobile />
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-1.5 mt-8">
            {ingredients.map((_, i) => (
              <span
                key={i}
                className={`h-[6px] rounded-full transition-all duration-300 ${
                  i === active ? 'w-[16px] bg-[#0DD180]' : 'w-[6px] bg-[#D5DBE8]'
                }`}
              />
            ))}
          </div>
        </div>

        {/* ===== Desktop / Tablet: grid (unchanged) ===== */}
        <div className="hidden md:grid md:grid-cols-3 gap-3.5 lg:gap-6 xl:gap-8 2xl:gap-10 mx-auto py-4 px-2 sm:px-0">
          {ingredients.map((item, idx) => (
            <IngredientCard key={idx} item={item} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default JoyThroughSection;