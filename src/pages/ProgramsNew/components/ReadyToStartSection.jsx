import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../../../components/common/Container';
import { useModal } from '../../../context/ModalContext';
import playBg from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/10. Final Trial CTA.png';
import playImgLeft from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/picture_blue.png';
import playImgRight from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/picture_blue2.png';

export function ReadyToStart() {
  const { openModal } = useModal();

  return (
    <section className="py-10 sm:py-16 bg-white relative overflow-hidden font-sans">
      <Container>
        {/* Outer Vibrant Wavy Banner Card with Background Pattern */}
        <div className="rounded-[36px] sm:rounded-[60px] w-full max-w-[1338px] mx-auto p-4 sm:p-10 lg:p-12 xl:p-14 shadow-2xl relative overflow-hidden">
          <img
            src={playBg}
            alt=""
            aria-hidden="true"
            className="block absolute inset-0 w-full h-full object-cover object-center pointer-events-none z-0"
          />

          {/* Mobile/Tablet Top Overlapping Photos (below xl) */}
          <div className="flex xl:hidden justify-center items-center relative -mb-14 z-20 px-4">
            <div className="w-[135px] sm:w-[150px] -rotate-[10deg] -mr-6 drop-shadow-xl z-10">
              <img
                src={playImgLeft}
                alt="Kid playing football"
                className="w-full h-auto object-contain"
              />
            </div>
            <div className="w-[135px] sm:w-[150px] rotate-[8deg] drop-shadow-xl z-0">
              <img
                src={playImgRight}
                alt="Coach with student"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* Inner White Box Container */}
          <div className="bg-white relative rounded-[28px] sm:rounded-[60px] -mt-[4.5rem] xl:mt-0 p-5 pt-[80px] sm:p-10 sm:pt-[90px] lg:p-10 lg:pt-[90px] xl:p-12 xl:pt-12 2xl:p-14 2xl:pt-14 shadow-xl z-10 mx-auto max-w-[940px] flex flex-col items-center justify-between gap-3 md:gap-6 border border-slate-100">

            {/* Left Tilted Photo - Desktop only (xl+) */}
            <div className="hidden xl:block absolute xl:left-[-110px] 2xl:left-[-145px] xl:max-w-[200px] 2xl:max-w-[240px] z-20">
              <img
                src={playImgLeft}
                alt="Kid playing football"
                className="w-full h-auto object-contain drop-shadow-2xl"
              />
            </div>

            {/* Center Content */}
            <div className="text-center space-y-3 sm:space-y-4 max-w-[620px] mx-auto w-full">
              {/* Mobile Title */}
              <h2 className="sm:hidden recline font-extrabold text-[32px] text-[#042C89] leading-[1.12]">
                Ready to start<br />
                their <span className="gasoek text-[#0DD180] font-normal">Road</span><br />
                <span className="gasoek text-[#0DD180] font-normal">to Rio?</span>
              </h2>

              {/* Desktop & Tablet Title */}
              <h2 className="hidden sm:block recline text-3xl sm:text-4xl lg:leading-[60px] md:text-[34px] min-[900px]:text-[40px] lg:text-[48px] xl:text-[54px] 2xl:text-[61px] text-[#042C89] ]">
                Ready to start <br className="hidden sm:inline" />
                their{' '}
                <span className="gasoek text-[#0DD180] inline-block">
                  Road to Rio?
                </span>
              </h2>

              {/* Paragraph Copy */}
              <p className="poppins text-[#475569] font-medium text-[14px] sm:text-[16px] md:text-[14px] min-[900px]:text-[16px] lg:text-[18px] xl:text-[21px] 2xl:text-[24px] leading-relaxed mx-auto max-w-[280px] xs:max-w-[310px] sm:max-w-xl">
                It all starts with a FREE trial. Let your child experience Samba,
                meet their coaches and find the level that’s right for them.
              </p>

              {/* Dark Blue CTA Button */}
              <div className="pt-2 md:pt-2">
                <Link
                  to="/book-trial"
                  className="bg-[#042C89] hover:bg-[#021840] poppins text-white font-bold text-[14px] sm:text-[16px] md:text-[14px] min-[900px]:text-[16px] lg:text-[17px] xl:text-[19px] 2xl:text-[20px] px-7 sm:px-8 lg:px-9 py-3 sm:py-3.5 lg:py-4 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer inline-block"
                >
                  Book a FREE trial
                </Link>
              </div>
            </div>

            {/* Right Tilted Photo - Desktop only (xl+) */}
            <div className="hidden xl:block absolute xl:right-[-110px] 2xl:right-[-145px] xl:max-w-[200px] 2xl:max-w-[240px] z-20">
              <img
                src={playImgRight}
                alt="Coach with student"
                className="w-full h-auto object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default ReadyToStart;
