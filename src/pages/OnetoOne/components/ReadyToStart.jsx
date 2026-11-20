import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Container } from '../../../components/common/Container';
import { useModal } from '../../../context/ModalContext';

// Coach + child photo
import partyStartedImg from 'https://webstepdev.com/demo/syncoWebsiteImages/one-to-one/newpicture.png';

export function ReadyToStart() {
  const { openModal } = useModal();

  const handleEnquire = () => {
    const appSection = document.getElementById('samba-application');
    if (appSection) {
      appSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      openModal('booking');
    }
  };

  return (
    <section className="py-10 sm:py-12 bg-white relative overflow-hidden">
      <Container>
        {/* Banner: green bg + yellow wave */}
        <div className="relative max-w-[1200px] overflow-hidden rounded-[28px] sm:rounded-[32px] bg-[#0DD180] px-5 py-6 sm:px-6 sm:py-8 md:px-[26px] md:py-[26px]">
          {/* Yellow wave (bottom) */}
          <svg
            className="absolute bottom-0 left-0 w-full h-[38%] md:h-[42%] pointer-events-none select-none"
            viewBox="0 0 600 120"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M0,28 C160,0 330,70 600,52 L600,120 L0,120 Z" fill="#FFDD1A" />
          </svg>

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-10 lg:gap-14">
            {/* Left: Photo */}
            <div className="w-full md:w-[34%] lg:w-[34%] shrink-0">
              <img
                src={partyStartedImg}
                alt="Coach with a young player during a Samba session"
                className="w-full h-auto aspect-[1.15/1] object-cover rounded-[22px]  block"
              />
            </div>

            {/* Right: Text & CTA */}
            <div className="flex-1 flex flex-col items-start text-left">
              <p className="recline font-medium text-[#042C89] text-[24px] leading-tight">
                One child. One coach. One hour.
              </p>

              <h2 className="gasoek md:pr-16 font-normal text-white text-[34px] sm:text-[42px] lg:text-[52px] leading-[1.1] mt-3">
                Ready to see what they can do?
              </h2>

              <p className="poppins font-semibold text-[#042C89] text-[16px] leading-snug mt-4">
                Book their first session for £45. Feedback included.
              </p>

              <button
                type="button"
                onClick={handleEnquire}
                className="mt-6 inline-flex items-center justify-center gap-3 bg-[#042C89] hover:bg-[#0A2E8A] text-white poppins font-semibold text-[17px] px-8 py-4 rounded-full hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer w-full md:w-auto  "
              >
                Book their first session
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default ReadyToStart;