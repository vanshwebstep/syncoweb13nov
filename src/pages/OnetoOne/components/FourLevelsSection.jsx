import React from 'react';
import { Container } from '../../../components/common/Container';
import textureBg from 'https://webstepdev.com/demo/syncoWebsiteImages/bluetexturedbg.png';

const BASE = 'https://webstepdev.com/demo/syncoWebsiteImages/one-to-one';
const img = (name, ext = 'png') => `${BASE}/${encodeURIComponent(name)}.${ext}`;
const SWOOSH = 'https://webstepdev.com/demo/syncoWebsiteImages/roadtorio/Swoosh.png';

const CARDS = [
  {
    title: 'They’ve got potential',
    desc: 'You can see there’s more in them. They just need the attention to bring it out.',
    image: 'clip1',
  },
  {
    title: 'They’re just beginning',
    desc: 'New to football? We build the basics, confidence and comfort on the ball.',
    image: 'clip2',
  },
  {
    title: 'Something isn’t clicking',
    desc: 'First touch, weaker foot, taking players on. We fix exactly what they need.',
    image: 'clip3',
  },
  {
    title: 'They can’t get enough',
    desc: 'Football before school, after school, in the garden. They just want more.',
    image: 'clip4',
  },
];

export function FourLevelSection() {
  return (
    <section
      className="relative overflow-hidden bg-[#042C89] py-10 sm:py-16 lg:py-20"
      style={{
        backgroundImage: `url(${textureBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'top',
      }}
    >
      <Container className="relative z-10 px-5 sm:px-6">
        {/* ===== Heading ===== */}
        <div className="text-left sm:text-center">
          <h2 className="leading-[1.1]">
            <span className="block font-['Recline',sans-serif] font-bold text-white text-[25px] sm:text-[34px] lg:text-[40px]">
              Different starting points.
            </span>
            <span className="relative inline-block font-['Gasoek_One',sans-serif] text-[#FFDE14] text-[32px] sm:text-[42px] lg:text-[50px] mt-1">
              Same attention.
              <img src={SWOOSH} alt="" aria-hidden="true" className="absolute left-0 -bottom-1.5 sm:-bottom-2 w-full h-auto pointer-events-none select-none" />
            </span>
          </h2>
          <p className="mt-5 sm:mt-6 font-['Poppins',sans-serif] text-white text-[16px] leading-[1.5] sm:text-[14px] lg:text-[17px]">
            Whatever stage they’re at, the session is built around them.
          </p>
        </div>

        {/* ===== Cards ===== */}
        <div className="mt-7 sm:mt-10 lg:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 justify-items-center">
          {CARDS.map((c) => (
            <div
              key={c.title}
              className="w-full max-w-none sm:max-w-[282px] flex flex-row sm:flex-col items-center sm:items-stretch gap-4 sm:gap-0 bg-white rounded-[20px] sm:rounded-[24px] p-3.5 pr-4 sm:p-3.5 lg:p-4 sm:pb-7 lg:pb-9 shadow-xl"
            >
              <img
                src={img(c.image)}
                alt={c.title}
                className="w-[104px] h-[104px] shrink-0 sm:w-full sm:h-auto sm:aspect-[134/124] object-cover rounded-[14px] sm:rounded-[18px] lg:rounded-[20px]"
              />
              <div className="sm:px-1.5 sm:mt-5 text-left">
                <h3 className="font-['Recline',sans-serif] font-bold text-[#042C89] text-[15px] sm:text-[17px] lg:text-[19px] leading-tight">
                  {c.title}
                </h3>
                <p className="mt-1.5 sm:mt-3 font-['Poppins',sans-serif] text-[#34353B] text-[13.5px] sm:text-[13px] lg:text-[14.5px] leading-[1.5] sm:leading-relaxed">
                  {c.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default FourLevelSection;