import React, { useRef, useState } from 'react';
import { Container } from '../../../components/common/Container';
import wayGirlImg from 'https://webstepdev.com/demo/syncoWebsiteImages/franchise/joymainpic.png';

import imgPitch from 'https://webstepdev.com/demo/syncoWebsiteImages/card1.png';
import imgSkillsBall from 'https://webstepdev.com/demo/syncoWebsiteImages/franchise/joy1.png';
import imgSyllabus from 'https://webstepdev.com/demo/syncoWebsiteImages/franchise/joy2.png';
import imgAbilityLevels from 'https://webstepdev.com/demo/syncoWebsiteImages/franchise/joy3.png';
import imgRoadToRio from 'https://webstepdev.com/demo/syncoWebsiteImages/franchise/joy4.png';
import imgSkillsTracker from 'https://webstepdev.com/demo/syncoWebsiteImages/franchise/joy5.png';
import imgSambaMusic from 'https://webstepdev.com/demo/syncoWebsiteImages/franchise/joy6.png';
import imgSmallGroups from 'https://webstepdev.com/demo/syncoWebsiteImages/franchise/joy7.png';

import imgVenueManager from 'https://webstepdev.com/demo/syncoWebsiteImages/franchise/joy8.png';
import imgVenueManagerMobile from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/venue-manager-mobile.png';
import textureBg from 'https://webstepdev.com/demo/syncoWebsiteImages/texture.png';
import green from 'https://webstepdev.com/demo/syncoWebsiteImages/franchise/joygreenline.png';
import greenmb from 'https://webstepdev.com/demo/syncoWebsiteImages/franchise/green.png';

export function JoyThroughBallMastery() {
  const sliderRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const ingredients = [
    {
      title: 'Smaller, weighted Skills Ball',
      desc: 'More touches. More control.',
      img: imgSkillsBall,
      bgAccent: 'bg-[#0DD180]',
      rotation: '-rotate-[3deg]',
    },
    {
      title: 'Ball Mastery Syllabus',
      desc: 'Every session has a purpose.',
      img: imgSyllabus,
      bgAccent: 'bg-[#FFDE14]',
      rotation: 'rotate-[3deg]',
    },
    {
      title: 'Four Ability Levels',
      desc: 'The right challenge at the right time.',
      img: imgAbilityLevels,
      bgAccent: 'bg-[#0DD180]',
      rotation: '-rotate-[3deg]',
    },
    {
      title: 'Road to Rio',
      desc: '38 weeks. Six Brazilian cities. One unforgettable adventure.',
      img: imgRoadToRio,
      bgAccent: 'bg-[#FFDE14]',
      rotation: 'rotate-[2.5deg]',
    },
    {
      title: 'Skills Tracker',
      desc: 'Progress they can actually see.',
      img: imgSkillsTracker,
      bgAccent: 'bg-[#FFDE14]',
      rotation: '-rotate-[2.5deg]',
    },
    {
      title: 'Samba Music',
      desc: 'Music brings rhythm, energy and Brazilian spirit.',
      img: imgSambaMusic,
      bgAccent: 'bg-[#0DD180]',
      rotation: 'rotate-[2.5deg]',
    },
    {
      title: 'Small Groups',
      desc: 'A maximum ratio of one coach to every ten children',
      img: imgSmallGroups,
      bgAccent: 'bg-[#FFDE14]',
      rotation: '-rotate-[2.5deg]',
    },
    {
      title: 'Venue Manager',
      desc: 'The Samba standard, every week.',
      img: imgVenueManager,
      bgAccent: 'bg-[#0DD180]',
      rotation: 'rotate-[2.5deg]',
    },
  ];

  const getStep = (el) => {
    const first = el.children[0];
    const second = el.children[1];
    if (!first || !second) return 0;
    return second.offsetLeft - first.offsetLeft;
  };

  const handleScroll = (e) => {
    const el = e.currentTarget;
    const step = getStep(el);
    if (!step) return;
    const idx = Math.round(el.scrollLeft / step);
    const clamped = Math.max(0, Math.min(ingredients.length - 1, idx));
    if (clamped !== activeIdx) setActiveIdx(clamped);
  };

  const scrollToIdx = (idx) => {
    const el = sliderRef.current;
    if (!el) return;
    const step = getStep(el);
    el.scrollTo({ left: step * idx, behavior: 'smooth' });
  };

  return (
    <section className="md:py-16 py-14 px-2 md:px-0 relative overflow-hidden font-sans">
      <Container>
        {/* Top Header & Girl Illustration */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-10 items-center mb-8 md:mb-12 lg:mb-16">
          {/* Left Column: Heading & Paragraphs */}
          <div className="order-1 md:col-span-6 lg:col-span-6 max-w-[494px] space-y-2.5 md:space-y-2 lg:space-y-4">
            <h2 className="recline md:leading-[1.2] text-[#042C89]">
              <span className="gasoek relative text-[#00A6E3] text-[58px] sm:text-[62px] md:text-[50px] min-[900px]:text-[60px] lg:text-[72px] xl:text-[88px] 2xl:text-[96px] inline-block mr-3">
                Joy
                <img
                  className="absolute hidden md:block -bottom-5 md:-bottom-6 lg:-bottom-18 left-0 w-[96%] md:h-5 lg:h-6 rotate-[4deg] h-4"
                  src={green}
                  alt=""
                />
                <img
                  className="absolute block md:hidden -bottom-4 md:-bottom-6 lg:-bottom-18 left-0 w-[96%] md:h-5 lg:h-6 h-4"
                  src={greenmb}
                  alt=""
                />
              </span>
              <span className="font-black text-[#042C89] text-[50px] sm:text-[46px] md:text-[38px] min-[900px]:text-[44px] lg:text-[52px] xl:text-[64px] 2xl:text-[70px]">
                through ball mastery
              </span>
            </h2>

            <p className="text-[14.4px] md:text-[13.5px] min-[900px]:text-[15px] lg:text-[18px] xl:text-[20px] text-[#042C89] poppins font-medium leading-relaxed md:max-w-xl pt-2 md:pt-3 lg:pt-8">
              Great businesses start with a great product.
              We've spent over 15 years developing the Samba Method, creating a football experience children love and parents believe in.
            </p>
            <p className="text-[16px] md:text-[13.5px] min-[900px]:text-[15px] lg:text-[18px] xl:text-[20px] text-[#042C89] poppins font-bold leading-relaxed md:max-w-xl pt-2 md:pt-2 lg:pt-2">
              Here's what makes Samba different.
            </p>
          </div>

          {/* Right Column: Blob Frame Image */}
          <div className="order-2 md:col-span-6 lg:col-span-6 relative flex justify-center">
            <div className="relative w-full max-w-[300px] sm:max-w-[340px] md:max-w-[280px] min-[900px]:max-w-[340px] lg:max-w-[420px] xl:max-w-[480px] 2xl:max-w-[500px] flex items-center justify-center hover:scale-103 transition-transform duration-500">
              <img
                src={wayGirlImg}
                alt="The Samba Way"
                className="w-full h-auto object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>

        {/* Ingredient Cards: mobile (<sm) = swipe slider, sm = 2 cols, md+ = 4 cols */}
        <div
          ref={sliderRef}
          onScroll={handleScroll}
          className="flex sm:grid sm:grid-cols-2 md:grid-cols-4 gap-5 md:gap-3.5 lg:gap-6 xl:gap-8 2xl:gap-10
                     overflow-x-auto sm:overflow-visible snap-x snap-mandatory sm:snap-none
                     scroll-pl-4 sm:scroll-pl-0
                     px-0 sm:px-2 md:px-0 py-6 sm:py-4
                     [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {ingredients.map((item, idx) => (
            <div
              key={idx}
              className="relative group flex sm:h-full shrink-0 sm:shrink w-[78%] sm:w-auto snap-start"
            >
              {/* Colored rotated accent background */}
              <div
                className={`absolute inset-0 rounded-[20px] ${item.bgAccent} ${item.rotation} transform transition-transform duration-300 group-hover:scale-105 z-0`}
              />

              {/* Main white card */}
              <div className="bg-white rounded-[20px] p-5 md:p-4 lg:p-5 shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:shadow-xl transition-all duration-300 relative z-10 flex flex-col justify-between w-full min-h-[185px] md:min-h-[170px] lg:min-h-[185px]">
                {/* Icon */}
                <div className="h-14 md:h-11 lg:h-14 flex items-center justify-start mb-3 md:mb-2 lg:mb-3">
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
                  <h3 className="poppins font-black text-[20px] md:text-[16px] min-[900px]:text-[18px] lg:text-[20px] text-[#00A6E3] leading-snug">
                    {item.title}
                  </h3>
                  <p className="poppins font-medium text-[14px] sm:text-[16px] md:text-[12px] min-[900px]:text-[13px] lg:text-[14px] text-[#475569] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination dots (mobile only) */}
        <div className="flex sm:hidden items-center justify-center gap-2 mt-4">
          {ingredients.map((_, idx) => (
            <button
              key={idx}
              type="button"
              aria-label={`Go to card ${idx + 1}`}
              onClick={() => scrollToIdx(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIdx === idx ? 'w-5 bg-[#0DD180]' : 'w-2 bg-[#D5DAE3]'
              }`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default JoyThroughBallMastery;