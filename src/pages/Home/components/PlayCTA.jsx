import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../../../components/common/Container';
import { useModal } from '../../../context/ModalContext';
import playBg from 'https://webstepdev.com/demo/syncoWebsiteImages/home/bg-yellow-green-texture.svg';
import ctaMobileBg from 'https://webstepdev.com/demo/syncoWebsiteImages/home/ctamobile.png';
import playImgLeft from 'https://webstepdev.com/demo/syncoWebsiteImages/home/picture_2.svg';
import playImgRight from 'https://webstepdev.com/demo/syncoWebsiteImages/home/picture.svg';
import yellow from 'https://webstepdev.com/demo/syncoWebsiteImages/yellow.png';

const steps = [
  { title: 'Join a real session', text: 'Plenty of time on the ball' },
  { title: 'Meet their coach', text: 'Small groups, max 1 coach to 10' },
  { title: 'Find out their level', text: "We'll tell you the right next step" },
];

export function PlayCTA() {
  const { openModal } = useModal();

  return (
    <section className="py-10 sm:py-12 bg-white relative overflow-hidden font-sans">
      <Container>
        {/* Outer Banner Card */}
        <div className="rounded-[36px] sm:rounded-[60px] max-w-[1338px] p-5 pt-6 pb-4 sm:p-10 sm:pt-16 shadow-2xl relative overflow-hidden">
          {/* Mobile background image */}
          <img
            src={ctaMobileBg}
            alt=""
            aria-hidden="true"
            className="block md:hidden absolute inset-0 w-full h-full object-cover object-center pointer-events-none z-0"
          />

          {/* Desktop background image */}
          <img
            src={playBg}
            alt=""
            aria-hidden="true"
            className="hidden md:block absolute inset-0 w-full h-full object-cover object-center pointer-events-none z-0"
          />

          {/* Mobile/Tablet Top Overlapping Photos */}
          <div className="flex xl:hidden justify-center items-center relative -mb-14 z-20 px-4">
            <div className="w-[150px] -rotate-[10deg] -mr-6 drop-shadow-xl z-10">
              <img src={playImgLeft} alt="Kid playing football" className="w-full h-auto object-contain" />
            </div>
            <div className="w-[150px] rotate-[5deg] -mb-[80px] drop-shadow-xl z-0">
              <img src={playImgRight} alt="Coach with student" className="w-full h-auto object-contain" />
            </div>
          </div>

          {/* Inner White Box */}
          <div className="bg-white relative rounded-[32px] sm:rounded-[60px] -mt-[4.5rem] xl:mt-0 p-5 pt-[130px] sm:p-10 sm:pt-[90px] xl:pb-8 xl:pt-16 2xl:p-14 2xl:pt-20 shadow-xl z-10 mx-auto max-w-[880px] flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-100">
            {/* Left Photo - Desktop only */}
            <div className="hidden xl:block absolute xl:left-[-130px] 2xl:left-[-165px] xl:max-w-[250px] 2xl:max-w-[270px]">
              <img src={playImgLeft} alt="Kid playing football" className="w-full h-full object-cover" />
            </div>

            {/* Center Content */}
            <div className="text-center space-y-4 max-w-[660px] mx-auto w-full">
              {/* Title */}
              <h2 className="recline text-[30px] leading-[1.15] sm:text-[35px] sm:leading-[0.5] lg:text-[44px] xl:text-[50px] 2xl:text-[53px] text-[#042C89]">
                Let’s see what happens <br className="hidden md:inline" />
                when you let them{' '}
                <span className="gasoek block w-fit mx-auto mt-2 mb-4 sm:mt-0 sm:mb-0 sm:inline-block text-[44px] sm:text-5xl lg:text-5xl xl:text-[53px] text-[#0DD180] relative">
                  play
                  <img
                    className="absolute left-0 w-[93%] h-[0.9rem] sm:h-[1.2rem] mt-1 sm:mt-3"
                    src={yellow}
                    alt=""
                  />
                </span>
              </h2>

              {/* Yellow Pill */}
              <div className="flex justify-center pt-4 sm:pt-8">
                <span className="poppins block w-max sm:w-auto sm:inline-block bg-[#FFDE14] text-[#042C89] font-bold uppercase tracking-wide text-[11px] sm:text-[12px] px-6 py-2.5 sm:py-2 rounded-full">
                  Free Skills Discovery
                </span>
              </div>

              {/* Subtitle */}
              <p className="poppins text-[#042C89] font-medium text-[15px] xl:text-[16px] pt-2 leading-snug">
                Their first session is free, and it’s much more than a taster.
              </p>

              {/* Steps */}
              <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-3 pt-2 sm:pt-1 px-1 sm:px-0">
                {/* Dotted connector line (sm+ horizontal) */}
                <div className="hidden sm:block absolute top-[14px] left-[16%] right-[16%] border-t-[2px] border-dotted border-[#5FCF86]" />

                {steps.map((step, i) => (
                  <div
                    key={step.title}
                    className="relative flex items-start gap-4 text-left sm:flex-col sm:items-center sm:gap-0 sm:text-center"
                  >
                    {/* Vertical dashed connector (mobile only) */}
                    {i < steps.length - 1 && (
                      <span className="sm:hidden absolute left-[13px] top-7 -bottom-5 border-l-2 border-dashed border-[#5FCF86]" />
                    )}

                    <span className="poppins shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-[#5FCF86] text-white text-[12px] font-bold z-10 ring-4 ring-white">
                      {i + 1}
                    </span>

                    <div>
                      <h4 className="poppins sm:mt-3 text-[#042C89] font-bold text-[16px] sm:text-[13px] xl:text-[17px] leading-tight">
                        {step.title}
                      </h4>
                      <p className="poppins mt-1 text-[#3A4A7A] text-[13px] sm:text-[11px] xl:text-[13px] leading-snug">
                        {step.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="pt-2 sm:pt-1 w-full sm:w-auto">
                <Link
                  to="/book-trial"
                  className="bg-[#0DD180] hover:bg-[#0bb86f] poppins text-white font-bold text-[16px] xl:text-[17px] w-full sm:w-auto px-10 py-4 rounded-full shadow-lg transition-all cursor-pointer inline-block text-center"
                >
                  Book a FREE trial
                </Link>
              </div>

              {/* Small note */}
              <p className="poppins text-[#7A8AA8] font-medium text-[12px] xl:text-[12px]">
                No commitment · No card needed
              </p>
            </div>

            {/* Right Photo - Desktop only */}
            <div className="hidden xl:block absolute xl:right-[-130px] 2xl:right-[-165px] xl:max-w-[250px] 2xl:max-w-[270px]">
              <img src={playImgRight} alt="Coach with student" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default PlayCTA;