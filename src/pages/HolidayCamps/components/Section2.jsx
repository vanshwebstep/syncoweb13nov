import React from 'react';
import { Star } from 'lucide-react';
import { Container } from '../../../components/common/Container';
import fourDaysImg from 'https://webstepdev.com/demo/syncoWebsiteImages/holiday-camps/four_days.png';
import bgBanner from 'https://webstepdev.com/demo/syncoWebsiteImages/holiday-camps/four_day_banner.png';

export function Section2() {
  const highlights = [
    'More touches.',
    'New skills.',
    'More confidence on the ball.',
    'Plenty of time to put it all into practice.',
  ];

  return (
    <section className="relative w-full overflow-hidden bg-[#FAFBFD] py-14 sm:py-16">
      {/* Background with subtle pattern and blue curved wave on right */}
      <img
        src={bgBanner}
        alt=""
        aria-hidden="true"
        className="absolute md:block px-2 md:px-0 hidden inset-0 w-full h-full object-cover pointer-events-none select-none z-0"
      />

      <Container className="relative z-10 w-full">
        {/* TABLET: md:grid-cols-12 + md:gap-6 (lg pe purani values) */}
        <div className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 gap-10 md:gap-6 lg:gap-8 items-center">
          {/* Left Column: Text & List */}
          {/* TABLET: md:col-span-7 (lg pe wapas 6) */}
          <div className="md:col-span-7 lg:col-span-6 xl:col-span-6 text-left">
            {/* Tag / Badge */}
            <div className="inline-block bg-[#DDF4FF] px-4 py-1 rounded-full mb-4 sm:mb-7 md:mb-5 lg:mb-7">
              <span className="text-[#00A6E3] text-[11px] sm:text-[14px] md:text-[12px] lg:text-[14px] font-bold uppercase poppins">
                SCHOOL’S OUT. THE BALL’S OUT.
              </span>
            </div>

            {/* Main Heading */}
            {/* TABLET: md:text-[34px] (pehle 54px tha), lg:text-[48px] same */}
            <h2 className="gasoek uppercase text-[42px] md:text-[34px] lg:text-[48px] leading-[1.2] mb-5 sm:mb-10 md:mb-6 lg:mb-10">
              <span className="text-[#0DD180] md:inline-flex block">FOUR DAYS </span>{' '}
              <span className="text-[#042C89]">THEY WON'T SPEND <br className="hidden lg:block"/> ON  <br className="md:hidden block"/>THE SOFA.</span>
            </h2>

            {/* Paragraphs */}
            <p className="poppins text-[#50576B] text-[15px] sm:text-[18px] md:text-[15px] lg:text-[18px] leading-relaxed mb-5 md:mb-4 lg:mb-7">
              Four days to get moving, meet other <br className="md:hidden block"/> football-mad kids and <br className='hidden lg:block'/> spend hours doing something they love.
            </p>
            <p className="poppins text-[#50576B] text-[15px] sm:text-[18px] md:text-[15px] lg:text-[18px] leading-relaxed mb-6 sm:mb-6 md:mb-4 lg:mb-6">
              And while they’re having fun? They’re <br className="md:hidden block"/> getting better.
            </p>

            {/* Feature List with Green Stars */}
            <ul className="space-y-2 sm:space-y-2">
              {highlights.map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <Star className="w-5 h-5 md:w-4 md:h-4 lg:w-5 lg:h-5 fill-[#0DD180] text-[#0DD180] shrink-0" />
                  <span className="recline font-bold text-[#042C89] text-[16px] sm:text-[20px] md:text-[16px] lg:text-[20px]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Framed Image */}
          {/* TABLET: md:col-span-5 (lg pe wapas 6) */}
          <div className="md:col-span-5 lg:col-span-6 xl:col-span-6 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[560px] md:max-w-full lg:max-w-none">
              <img
                src={fourDaysImg}
                alt="Four days they won't spend on the sofa - kids at Samba Soccer"
                className="w-full h-auto object-contain mx-auto drop-shadow-xl select-none"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export { Section2 as FourDaysSection };
export default Section2;