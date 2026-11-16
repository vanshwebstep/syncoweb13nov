import React from 'react';
import { Container } from '../../../components/common/Container';

const BASE = 'https://webstepdev.com/demo/syncoWebsiteImages';
const blueBgTexture = `${BASE}/bluetexturedbg.png`;
const coachWithStudents = `${BASE}/holiday-camps/coach_with_students.png`;

export function Section10() {
  return (
    <section className="relative w-full overflow-hidden bg-[#042C89] py-10 sm:py-20">
      {/* Background Texture */}
      <img
        src={blueBgTexture}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
      />

      <Container className="relative z-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-6 lg:gap-12 items-center">
          {/* Left Column: Text Content */}
          <div className="md:col-span-1 lg:col-span-6 text-left">
            {/* Badge */}
            <div className="inline-block bg-white/10 px-4 py-1.5 rounded-full mb-6 md:mb-8">
              <span className="text-[#FFDE14] text-[11px] sm:text-[14px] font-bold tracking-wider uppercase poppins">
                SAMBA STAR COACHES
              </span>
            </div>

            {/* Heading */}
            <h2 className="gasoek text-[34px] sm:text-[40px] lg:text-[48px] leading-[1.2] md:leading-[1.04] mb-5 sm:mb-8 lg:mb-12">
              <span className="text-[#0DD180] md:block">Great with football.</span>{' '}
              <span className="text-white md:block mt-1.5">Even better with kids.</span>
            </h2>

            {/* Paragraphs */}
            <p className="poppins text-white/90 text-[15px] sm:text-[16px] lg:text-[18px] leading-relaxed mb-5 lg:mb-7">
              Our Samba Star Coaches are fun, energetic and know how to<br className="hidden lg:block" /> make every child feel welcome, involved and part of the group.
            </p>
            <p className="poppins text-white/90 text-[15px] sm:text-[16px] lg:text-[18px] leading-relaxed mb-6 sm:mb-8">
              They're qualified, experienced and experts at what they do, so whether your child arrives full of confidence or feeling a little nervous, they're in trusted hands.
            </p>

            {/* Yellow Highlight Line */}
            <p className="recline font-bold text-[#FFDE14] text-[15px] sm:text-[18px] lg:text-[20px] leading-snug">
              Four days of football. Four days of fun. Coaches you can trust.
            </p>
          </div>

          {/* Right Column: Framed Image */}
          <div className="md:col-span-1 lg:col-span-6 flex justify-center md:justify-end lg:justify-start">
            <div className="relative w-full max-w-[500px] p-2 sm:p-5">
              <img
                src={coachWithStudents}
                alt="Samba Star Coaches with kids holding trophy"
                className="w-full h-auto object-contain mx-auto drop-shadow-2xl select-none"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export { Section10 as SambaCoachesSection };
export default Section10;