import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Container } from '../../../components/common/Container';

// Imagery
import organizeImg from 'https://webstepdev.com/demo/syncoWebsiteImages/one-to-one/thishour.png';
import bgTexture from 'https://webstepdev.com/demo/syncoWebsiteImages/texture.png';
import vector from 'https://webstepdev.com/demo/syncoWebsiteImages/roadtorio/Swoosh.png';

export function OrganiseSection() {
  const handleBook = () => {
    const appSection = document.getElementById('samba-application');
    if (appSection) {
      appSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-white py-12 pb-8 sm:py-16 lg:mt-[-100px] lg:pt-[200px] lg:pb-16">
      {/* Background Texture */}
      <img
        src={bgTexture}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none z-0"
      />

      <Container className="relative z-10">
<div className="flex flex-col-reverse md:flex-row justify-between gap-8 md:gap-6 lg:gap-12 items-center">          {/* ===== Left: Photo ===== */}
          <div className="w-full md:w-1/2 relative">
            <div className="max-w-[680px] -ms-[10px] md:-ms-[24px] lg:-ms-[78px]">
              <img
                src={organizeImg}
                alt="One-to-one soccer training with coach and player"
                className="w-full h-auto object-contain drop-shadow-lg"
              />
            </div>
          </div>

          {/* ===== Right: Copy ===== */}
          <div className="w-full md:w-1/2 max-w-[500px] text-left">
            <p className="font-['Poppins',sans-serif] font-semibold text-[#00A6E3] text-[11px] lg:text-[13px] tracking-[0.06em] uppercase">
              Why one to one
            </p>

            <h2 className="mt-3 leading-[1.1]">
              <span className="block font-['Recline',sans-serif] font-bold text-[#042C89] text-[32px] sm:text-[38px] md:text-[34px] lg:text-[46px]">
                This hour
              </span>
              <span className="relative inline-block font-['Gasoek_One',sans-serif] text-[#0DD180] text-[38px] sm:text-[46px] md:text-[40px] lg:text-[56px] mt-1">
                is theirs.
                <img
                  src={vector}
                  alt=""
                  aria-hidden="true"
                  className="absolute left-0 -bottom-0 w-full h-auto object-contain pointer-events-none select-none"
                />
              </span>
            </h2>

            <p className="mt-6 font-['Poppins',sans-serif] font-medium text-[#042C89] text-[14px] sm:text-[16px] md:text-[14px] lg:text-[17px] leading-[1.55]">
              In a group session, a coach has ten children to watch. Here, they have one. Every touch, every movement,
              every little detail. We build the session around what they need.
            </p>

            {/* Comparison cards */}
            <div className="mt-6 grid grid-cols-2 gap-3 lg:gap-4">
              {/* Group class */}
              <div className="bg-[#F4F6FB] rounded-[16px] p-4 lg:p-5">
                <p className="font-['Poppins',sans-serif] font-bold text-[#042C89] text-[12px] lg:text-[14px]">Group class</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {[...Array(10)].map((_, i) => (
                    <span key={i} className="w-2.5 h-2.5 rounded-full bg-[#C9D3F0]" />
                  ))}
                </div>
                <p className="mt-3 font-['Poppins',sans-serif] font-semibold text-[#042C89] text-[11px] lg:text-[13px]">
                  1 coach : 10 children
                </p>
              </div>

              {/* One to one */}
              <div className="bg-[#FFDE14] rounded-[16px] p-4 lg:p-5">
                <p className="font-['Poppins',sans-serif] font-bold text-[#042C89] text-[12px] lg:text-[14px]">One to one</p>
                <div className="mt-3 flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#042C89]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0DD180]" />
                </div>
                <p className="mt-3 font-['Poppins',sans-serif] font-semibold text-[#042C89] text-[11px] lg:text-[13px]">
                  1 coach : 1 child
                </p>
              </div>
            </div>

            {/* Button */}
            <button
              type="button"
              onClick={handleBook}
              className="mt-6 inline-flex items-center justify-center gap-2 bg-[#042C89] hover:bg-[#021840] text-white font-['Poppins',sans-serif] font-bold text-[13px] lg:text-[15px] px-7 lg:px-8 py-3.5 rounded-full shadow-md transition-all duration-300 hover:scale-[1.03] active:scale-95 cursor-pointer whitespace-nowrap"
            >
              Book their first session <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default OrganiseSection;