import React, { useRef, useState } from 'react';
import { Container } from '../../../components/common/Container';

import ballMasteryGirlImg from 'https://webstepdev.com/demo/syncoWebsiteImages/home/picture_3.png';
import green from 'https://webstepdev.com/demo/syncoWebsiteImages/home/green.png';

import imgSkillsBall from 'https://webstepdev.com/demo/syncoWebsiteImages/card3.png';
import imgSyllabus from 'https://webstepdev.com/demo/syncoWebsiteImages/card1.png';
import imgFourLevels from 'https://webstepdev.com/demo/syncoWebsiteImages/home/Group 1000002503.png';
import imgRoadToRio from 'https://webstepdev.com/demo/syncoWebsiteImages/Frame 1000004801.png';
import imgSkillsTracker from 'https://webstepdev.com/demo/syncoWebsiteImages/feature-skills-tracker.png';
import imgSambaMusic from 'https://webstepdev.com/demo/syncoWebsiteImages/feature-samba-music.png';
import imgSmallGroups from 'https://webstepdev.com/demo/syncoWebsiteImages/home/Group 1000002539.png';
import imgVenueManager from 'https://webstepdev.com/demo/syncoWebsiteImages/feature-venue-manager.png';

export function Philosophy() {
  const scrollRef = useRef(null);
  const [active, setActive] = useState(0);

  const features = [
    {
      title: 'Smaller, weighted Skills Ball',
      desc: 'More touches. More control.',
      img: imgSkillsBall,
      bgAccent: 'bg-[#00e676]',
      rotation: '-rotate-[6deg]',
    },
    {
      title: 'Ball Mastery Syllabus',
      desc: 'Every session has a purpose.',
      img: imgSyllabus,
      bgAccent: 'bg-[#FFDE14]',
      rotation: 'rotate-[6deg]',
    },
    {
      title: 'Four Ability Levels',
      desc: 'The right challenge at the right time.',
      img: imgFourLevels,
      bgAccent: 'bg-[#00e676]',
      rotation: '-rotate-[6deg]',
    },
    {
      title: 'Road to Rio',
      desc: '38 sessions. One connected adventure.',
      img: imgRoadToRio,
      bgAccent: 'bg-[#FFDE14]',
      rotation: 'rotate-[6deg]',
    },
    {
      title: 'Skills Tracker',
      desc: 'Progress they can actually see.',
      img: imgSkillsTracker,
      bgAccent: 'bg-[#FFDE14]',
      rotation: '-rotate-[6deg]',
    },
    {
      title: 'Samba Music',
      desc: 'Music brings rhythm, energy and Brazilian spirit',
      img: imgSambaMusic,
      bgAccent: 'bg-[#00e676]',
      rotation: 'rotate-[6deg]',
    },
    {
      title: 'Small Groups',
      desc: 'A maximum ratio of one coach to every ten children',
      img: imgSmallGroups,
      bgAccent: 'bg-[#FFDE14]',
      rotation: '-rotate-[6deg]',
    },
    {
      title: 'Venue Manager',
      desc: 'The Samba standard, every week.',
      img: imgVenueManager,
      bgAccent: 'bg-[#00e676]',
      rotation: 'rotate-[6deg]',
    },
  ];

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el || !el.children[0]) return;
    const step = el.children[0].offsetWidth + 16; // card width + gap-4
    const idx = Math.round(el.scrollLeft / step);
    setActive(Math.min(Math.max(idx, 0), features.length - 1));
  };

  const scrollToIndex = (i) => {
    const el = scrollRef.current;
    if (!el || !el.children[0]) return;
    const step = el.children[0].offsetWidth + 16;
    el.scrollTo({ left: step * i, behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-white px-2 py-16 font-sans lg:py-20">
      <Container>
        {/* Top Header & Image Section */}
        <div className="mb-12 grid grid-cols-1 items-center gap-6 md:mb-12 md:grid-cols-12 lg:mb-14 lg:gap-8 xl:mb-16">
          {/* Left Column */}
          <div className="space-y-3 md:col-span-6 md:space-y-4 lg:col-span-5">
            <h2 className="recline text-[40px] leading-[1.1] text-[#042C89] md:text-[38px] md:leading-[1.2] lg:text-[46px] xl:text-[64px] 2xl:text-[74px]">
              <span className="gasoek relative mr-2 inline-block text-[#00A6E3] md:mr-3">
                Joy
                <img
                  className="absolute -bottom-5 left-0 h-5 w-full md:-bottom-4"
                  src={green}
                  alt=""
                />
              </span>

              <span className="font-black text-[#042C89]">
                through
              </span>

              <span className="mt-1 block font-black text-[#042C89]">
                ball mastery
              </span>
            </h2>

            <p className="poppins max-w-xl pt-1 text-[15px] font-medium leading-relaxed text-[#042C89] md:pt-2 md:text-[16px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px]">
              A proven method, refined over 15 years with{' '}
              <br className="hidden md:block" />
              more than 20,000 children, where every detail is
              designed to build skill and confidence.
            </p>

            <p className="poppins pt-1 text-[15px] font-bold text-[#042C89] md:pt-2 md:text-[16px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px]">
              Here’s how we’ll help your child.
            </p>
          </div>

          {/* Right Column */}
          <div className="relative flex justify-center md:col-span-6 lg:col-span-7">
            <div className="relative flex w-full max-w-[320px] items-center justify-center md:max-w-[340px] lg:max-w-[440px] xl:max-w-[520px] 2xl:max-w-[580px]">
              <img
                src={ballMasteryGirlImg}
                alt="Joy through ball mastery"
                className="h-full w-full object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>

        {/* Feature Cards: mobile = horizontal scroll, sm+ = grid (same as before) */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="
            flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-pl-3 px-3 py-8
            [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
            sm:grid sm:snap-none sm:grid-cols-2 sm:gap-x-4 sm:gap-y-9 sm:overflow-visible sm:px-4 sm:py-5
            md:grid-cols-3 lg:grid-cols-4 lg:gap-x-5 lg:gap-y-9 lg:px-2 lg:py-5
          "
        >
          {features.map((item, idx) => (
            <div
              key={idx}
              className="group relative flex h-full w-[82%] min-w-0 shrink-0 snap-start sm:w-auto sm:shrink"
            >
              {/* Rotated Colored Background Layer */}
              <div
                className={`absolute inset-x-[2px] inset-y-[3px] z-0 rounded-[20px] ${item.bgAccent} ${item.rotation}`}
                aria-hidden="true"
              />

              {/* Main White Card */}
              <div className="philosophy-card relative z-10 flex min-h-[194px] w-full flex-col rounded-[20px] bg-white p-4 px-5 shadow-[0_8px_22px_rgba(0,0,0,0.07)]">
                {/* Illustration */}
                <div className="mb-1 flex h-[70px] shrink-0 items-start justify-start pt-1">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="h-14 w-auto max-w-[90px] object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Title & Description */}
                <div className="space-y-1.5">
                  <h3 className="poppins text-[19px] font-black leading-[1.25] text-[#00A6E3] sm:text-[19px] lg:text-[18px] xl:text-[22px] 2xl:text-[24px]">
                    {item.title}
                  </h3>

                  <p className="poppins text-[13px] font-medium leading-relaxed text-[#475569] sm:text-[13.5px] lg:text-[13px] xl:text-[14px] 2xl:text-[14.5px]">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination dots (mobile only) */}
        <div className="mt-2 flex items-center justify-center gap-2 sm:hidden">
          {features.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to card ${i + 1}`}
              onClick={() => scrollToIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                active === i ? 'w-5 bg-[#0DD180]' : 'w-1.5 bg-slate-200'
              }`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Philosophy;