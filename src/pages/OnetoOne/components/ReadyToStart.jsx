import React from 'react';
import { Container } from '../../../components/common/Container';
import { useModal } from '../../../context/ModalContext';

// Images
// NOTE: partyStartedImg ki jagah coach + child wali photo import karo (yellow frame CSS se aa raha hai)
import partyStartedImg from 'https://webstepdev.com/demo/syncoWebsiteImages/one-to-one/picture.png';
// NOTE: yellow/green wave pattern wali background image yahan lagao
import partyStartedImgbg from 'https://webstepdev.com/demo/syncoWebsiteImages/one-to-one/final_cta.png';

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
    <section className="py-10 sm:py-12 bg-[#FAFCFE] relative overflow-hidden">
      <Container>
        {/* Outer Wavy Pattern Banner Card */}
        <div
          style={{
            backgroundImage: `url(${partyStartedImgbg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          className="relative rounded-[30px] md:rounded-[44px] lg:rounded-[60px] p-3 py-8 xs:p-3.5 sm:p-5 md:py-8 md:px-4 lg:px-8 lg:pe-12 xl:pe-16 lg:py-10 max-w-[340px] xs:max-w-[365px] sm:max-w-none mx-auto"
        >
          {/* Inner White Box */}
          <div className="ready-to-start-card relative w-full md:w-[86%] xl:w-[84%] md:ms-auto z-10 bg-white rounded-[30px] md:rounded-[40px] lg:rounded-[50px] xl:rounded-[60px] shadow-xl px-4 pt-4 pb-10 xs:px-5 xs:pt-4 xs:pb-7 sm:px-8 md:pl-0 md:pr-5 md:py-8 lg:pr-8 lg:py-10 min-[1150px]:py-12 xl:pr-10 xl:py-16 flex flex-col md:flex-row items-center gap-0">
            {/* Left: Yellow framed photo (overlaps out of white box on desktop) */}
            <div className="w-full md:w-[230px] lg:w-[300px] min-[1150px]:w-[360px] xl:w-[430px] 2xl:w-[450px] md:mt-0 mt-[-30px] md:absolute md:-left-[15%] md:top-1/2 md:-translate-y-1/2 shrink-0 ready-to-start-photo">
                <img
                  src={partyStartedImg}
                  alt="Coach with a young player during a Samba session"
                  className="w-full h-auto aspect-[1.1/1] object-contain rounded-[16px] block"
                />
            </div>

            {/* Right: Text & CTA */}
            <div className="ready-to-start-content w-full md:w-[340px] lg:w-[440px] min-[1150px]:w-[500px] xl:w-[560px] 2xl:w-[584px] md:ms-auto flex flex-col items-start justify-center text-left">
              {/* Mobile Heading (matching screenshot exactly) */}
              <h2 className="md:hidden text-[#042C89] text-[30px] 2xl:text-[34px] leading-[1.15] mt-6 mb-1">
                <span className="recline font-bold block">What could a</span>
                <span className="block">
                  <span className="recline font-bold">little </span>
                  <span className="gasoek text-[#0DD180] font-normal">individual</span>
                </span>
                <span className="block">
                  <span className="gasoek text-[#0DD180] font-normal">attention </span>
                  <span className="recline font-bold">bring</span>
                </span>
                <span className="recline font-bold block">out in their</span>
                <span className="recline font-bold block">game?</span>
              </h2>

              {/* Desktop / Tablet Heading */}
              <h2 className="hidden md:block recline font-bold text-[#0A2E8A] text-[25px] lg:text-[34px] min-[1150px]:text-[39px] xl:text-[48px] leading-[1.15]">
                <span className="block">What could a little</span>
                <span className="block gasoek font-normal text-[#0DD180]">individual attention</span>
                <span className="block pt-0.5">bring out in their game?</span>
              </h2>

              <p className="poppins font-normal text-[#101014] text-[14px] sm:text-[18px] md:text-[13.5px] lg:text-[15.5px] min-[1150px]:text-[17.5px] xl:text-[20px] leading-[1.55] md:leading-[1.5] lg:leading-[1.6] xl:leading-[1.7] mt-2.5 mb-5 md:mt-2.5 md:mb-4 lg:mt-3.5 lg:mb-5 xl:mt-5 xl:mb-6">
                Tell us a little about your child and what you'd like them to work on. We'll take it from there.
              </p>

              <button
                onClick={handleEnquire}
                className="bg-[#042C89] md:bg-[#0A2E8A] uppercase hover:bg-[#042C89] text-white font-semibold text-[11.5px] xs:text-[12.5px] sm:text-[18px] md:text-[13px] lg:text-[15.5px] min-[1150px]:text-[17.5px] xl:text-[20px] w-full mx-auto md:mx-0 px-6 sm:px-7 md:px-5 md:py-2.5 lg:px-6 lg:py-3 xl:px-7 xl:py-3.5 rounded-full hover:scale-105 active:scale-95 transition-all duration-200 poppins cursor-pointer tracking-[0.2px] text-center"
              >
                Book their first session
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default ReadyToStart;