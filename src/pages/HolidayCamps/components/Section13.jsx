import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Container } from '../../../components/common/Container';
import { useModal } from '../../../context/ModalContext';

const BASE = 'https://webstepdev.com/demo/syncoWebsiteImages';
const studentImg = `${BASE}/holiday-camps/readytoaccelerate.png`;
const swoosh = `${BASE}/roadtorio/whiteline.png`;

export function Section13() {
  const { openModal } = useModal();

  return (
    <section className="relative w-full overflow-hidden bg-white py-10 sm:py-14">
      <Container className="relative z-10 w-full">
        {/* Banner: blue bg + green corner */}
        <div className="relative overflow-hidden rounded-[28px] sm:rounded-[32px] bg-[#00A6E3] px-5 py-6 sm:px-6 sm:py-8 md:px-[26px] md:py-[26px]">
          {/* Green corner (bottom-right) */}
          <svg
            className="absolute bottom-0 right-0 w-[60%] md:w-[48%] h-[70%] pointer-events-none select-none"
            viewBox="0 0 400 200"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M400,0 L400,200 L0,200 C120,170 260,90 400,0 Z" fill="#0DD180" />
          </svg>

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-10 lg:gap-14">
            {/* Left: Photo */}
            <div className="w-full md:w-[34%] shrink-0">
              <img
                src={studentImg}
                alt="Ready to accelerate their Road to Rio"
                className="w-full h-auto aspect-[1.1/1] object-cover rounded-[26px] block select-none"
              />
            </div>

            {/* Right: Text & CTA */}
            <div className="flex-1 flex flex-col items-start text-left">
              <h2 className="leading-[1.15]">
                <span className="block recline font-bold text-white text-[30px] sm:text-[36px] lg:text-[40px]">
                  Ready to accelerate
                </span>
                <span className="relative inline-block gasoek font-normal text-[#FFDE14] text-[38px] sm:text-[44px] lg:text-[50px] mt-1">
                  their Road to Rio?
                  <img
                    src={swoosh}
                    alt=""
                    aria-hidden="true"
                    className="absolute left-0 -bottom-2 w-full h-auto pointer-events-none select-none"
                  />
                </span>
              </h2>

              <p className="poppins font-semibold text-white text-[17px] leading-[1.5] mt-6 max-w-[560px]">
                Four days. Six Brazilian legends. Twelve new skills, stickers and plenty of
                football along the way. Their place on the map is waiting.
              </p>

              <button
                type="button"
                onClick={() => openModal('venue')}
                className="mt-6 inline-flex items-center justify-center gap-3 bg-[#042C89] hover:bg-[#0A2E8A] text-white poppins font-semibold text-[15px] px-9 py-4 rounded-full hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
              >
                Find a holiday camp
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export { Section13 as ReadyToAccelerateSection };
export default Section13;