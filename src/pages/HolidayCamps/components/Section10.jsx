import React from 'react';
import { Check } from 'lucide-react';
import { Container } from '../../../components/common/Container';

const BASE = 'https://webstepdev.com/demo/syncoWebsiteImages';
const swoosh = `${BASE}/roadtorio/Swoosh.png`;
const blueVector = `${BASE}/holiday-camps/bluevector.png`;
const coachWithStudents = `${BASE}/holiday-camps/coach_with_students.png`;
// Light white texture (screenshot jaisa). Agar alag image hai to yahan URL badal do.
const bgTexture = `${BASE}/bluetexturedbg.png`;

const badges = ['DBS-checked', 'First aid trained', 'FA qualified'];

export function Section10() {
  return (
    <section
      style={{
        // backgroundImage: `url(${bgTexture})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className="relative w-full overflow-hidden bg-white py-12 sm:py-16 lg:py-20"
    >
      {/* Blue vector (bottom-right) */}
      <img
        src={blueVector}
        alt=""
        aria-hidden="true"
        className="absolute right-0 bottom-0 h-[85%] md:h-full w-auto max-w-[70%] object-contain object-right-bottom pointer-events-none select-none"
      />

      <Container className="relative z-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8 lg:gap-12 items-center">
          {/* ===== Left: Text ===== */}
          <div className="text-left">
            <p className="poppins font-semibold text-[#042C89] text-[13px] tracking-[0.04em] uppercase">
              Samba Star Coaches
            </p>

            <h2 className="mt-2 leading-[1.1]">
              <span className="block recline font-bold text-[#00A6E3] text-[44px]">
                Great with football.
              </span>
              <span className="block gasoek font-normal text-[#042C89] text-[54px] mt-1">
                Even better
              </span>
              <span className="relative inline-block gasoek font-normal text-[#042C89] text-[54px]">
                with kids.
                <img
                  src={swoosh}
                  alt=""
                  aria-hidden="true"
                  className="absolute left-0 -bottom-2 w-full h-auto pointer-events-none select-none"
                />
              </span>
            </h2>

            <p className="poppins font-normal text-[#042C89] text-[18px] leading-[1.6] mt-8 max-w-[520px]">
              Our Samba Star Coaches are fun, energetic and know how to make every child feel
              welcome, involved and part of the group.
            </p>
            <p className="poppins font-normal text-[#042C89] text-[18px] leading-[1.6] mt-4 max-w-[520px]">
              They’re qualified, experienced and DBS-checked, so whether your child arrives full
              of confidence or a little nervous, they’re in trusted hands.
            </p>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-3 mt-7">
              {badges.map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center gap-1.5 bg-[#E3F7FF] text-[#042C89] poppins font-semibold text-[11px] px-3.5 py-2 rounded-full"
                >
                  <Check className="w-3 h-3  text-[#0DD180] stroke-[3]" />
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* ===== Right: Framed photo ===== */}
          <div className="flex justify-center md:justify-end">
            <div className="relative w-full max-w-[520px]">
              {/* Green offset shape behind */}
              <div
                aria-hidden="true"
                className="absolute -top-3 -left-3 -right-3 bottom-3 rounded-[30px] bg-[#1FD98A]"
              />
              {/* Yellow frame + photo */}
              <div className="relative rounded-[26px] border-[7px] border-[#FFDE14] overflow-hidden bg-[#FFDE14] shadow-[0_10px_30px_rgba(4,44,137,0.18)]">
                <img
                  src={coachWithStudents}
                  alt="Samba Star Coaches with kids holding trophy"
                  className="w-full h-auto aspect-[1.25/1] object-cover block select-none"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export { Section10 as SambaCoachesSection };
export default Section10;