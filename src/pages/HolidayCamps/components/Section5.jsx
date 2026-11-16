import React from 'react';
import { ArrowDown } from 'lucide-react';
import { Container } from '../../../components/common/Container';

const BASE = 'https://webstepdev.com/demo/syncoWebsiteImages';
const mapbg = `${BASE}/holiday-camps/map_bg.png`;
const rioMapImg = `${BASE}/road-to-rio-map-mobile.png`;
const skill = `${BASE}/skill.png`;
const skill2 = `${BASE}/skill2.png`;
const skill3 = `${BASE}/skill3.png`;
const skill4 = `${BASE}/skill4.png`;
const arrow = `${BASE}/arrow-right.png`;

export function Section5() {
  const steps = [
    {
      icon: skill,
      label: 'Learn a new skill',
    },
    {
      icon: skill2,
      label: 'Earn the sticker',
    },
    {
      icon: skill3,
      label: 'Add it to map',
    },
    {
      icon: skill4,
      label: 'Keep moving',
    },
  ];

  return (
    <section className="relative z-0 w-full min-h-max overflow-hidden py-10 sm:py-16 md:py-20 lg:py-24">
      {/* Fixed Image Wrapper */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <img
          src={mapbg}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center pointer-events-none select-none"
        />
      </div>

      <Container className="relative z-10 w-full">
        {/* ========================================================= */}
        {/* MOBILE VIEW (< md) - Matches mobile reference image exact */}
        {/* ========================================================= */}
        <div className="md:hidden flex flex-col text-left w-full pt-2">
          {/* 1. Mobile Title */}
          <h2 className="gasoek uppercase text-[50px] leading-[1.2] text-[#042C89] mb-4">
            WATCH
            THEIR
            JOURNEY
            FILL UP.
          </h2>

          {/* 2. Road to Rio Map Graphic */}
          <div className="relative w-full max-w-[340px] xs:max-w-[380px] mx-auto mb-6">
            <img
              src={rioMapImg}
              alt="Road to Rio Map illustration"
              className="w-full h-auto object-contain select-none drop-shadow-xl"
            />
          </div>

          {/* 3. Vertical Yellow Process Container */}
          <div className="bg-[#FFDE14] w-full max-w-[220px] xs:max-w-[320px] mx-auto p-3 xs:p-3.5 rounded-2xl shadow-lg mb-6">
            <div className="flex flex-col gap-2 items-stretch">
              {steps.map((step, idx) => (
                <React.Fragment key={idx}>
                  <div className="flex flex-row items-center gap-3 bg-white rounded-xl px-3.5 py-2.5 shadow-xs w-full">
                    <img
                      src={step.icon}
                      alt={step.label}
                      className="w-7 h-7 object-contain shrink-0"
                    />
                    <span className="poppins text-[13.5px] font-extrabold text-[#042C89] leading-tight text-left">
                      {step.label}
                    </span>
                  </div>
                  {idx < steps.length - 1 && (
                    <div className="flex justify-center py-0.5 text-[#042C89]">
                      <img
                        src={arrow}
                        alt="Arrow"
                        className="w-5 stroke-[3] rotate-[92deg]"
                      />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* 4. Text Descriptions */}
          <p className="poppins text-[#042C89] font-semibold text-[15px] leading-relaxed mb-3">
            Every child gets their own fold-out Road to Rio Map. As they learn new skills and make their way through Brazil, they collect stickers and add them to their map.
          </p>

          <p className="poppins text-[#fff] text-[14px] font-medium leading-relaxed mb-4">
            And there’s more to play for. Each group has a Player of the Day, celebrating effort, attitude and teamwork.
          </p>

          <p className="gasoek text-white text-[19px] xs:text-[22px] leading-snug">
            Day after day, Rio gets a little closer.
          </p>
        </div>

        {/* ========================================================= */}
        {/* DESKTOP VIEW (>= md)                                      */}
        {/* ========================================================= */}
        <div className="hidden md:grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 xl:gap-8 items-center pt-5">
          {/* Left Column: Text & Step Card */}
          <div className="lg:col-span-7 xl:col-span-6 text-left w-full">
            <h2 className="gasoek uppercase text-[36px] sm:text-[48px] md:text-[61px] lg:text-[46px] xl:text-[61px] leading-[1.04] text-[#042C89] mb-4 sm:mb-5">
              WATCH THEIR <br />
              JOURNEY FILL UP.
            </h2>

            <p className="poppins text-[#fff] font-bold text-[15px] xl:text-[17px] 2xl:text-[18px] leading-relaxed mb-6 sm:mb-8">
              Every child gets their own fold-out Road to Rio Map. As they learn new skills and make their way through Brazil, they collect stickers and add them to their map.
            </p>

            {/* Yellow Process Container with 4 Steps */}
            <div className="bg-[#FFDE14] w-max md:w-[615px] lg:w-full xl:w-[615px] p-3 sm:p-5 lg:p-3.5 xl:p-5 rounded-2xl sm:rounded-3xl shadow-lg mb-6 sm:mb-8">
              <div className="grid grid-cols-4 gap-[30px] lg:gap-[20px] xl:gap-[30px] items-center">
                {steps.map((step, idx) => (
                  <React.Fragment key={idx}>
                    <div className="relative flex flex-col w-full bg-white rounded-[12px] p-4 lg:p-3 xl:p-4 gap-2 items-center justify-center md:items-start text-center min-h-[105px] shadow-xs">
                      <img
                        src={step.icon}
                        alt={step.label}
                        className="w-[44px] h-[44px] lg:w-[38px] lg:h-[38px] xl:w-[44px] xl:h-[44px] object-contain shrink-0"
                      />
                      <span className="poppins block md:pe-4 lg:pe-0 xl:pe-4 w-full text-center md:text-start text-[13px] lg:text-[12px] xl:text-[13px] font-extrabold text-[#042C89] leading-tight">
                        {step.label}
                      </span>

                      {/* Arrow between steps */}
                      {idx < steps.length - 1 && (
                        <div className="flex absolute -right-6 lg:-right-5 xl:-right-6 top-1/2 -translate-y-1/2 z-20 text-[#042C89]">
                          <img
                            src={arrow}
                            alt="Arrow"
                            className="w-5 lg:w-4 xl:w-5 stroke-[3]"
                          />
                        </div>
                      )}
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>

            <p className="poppins text-[#fff] text-[13.5px] font-medium xl:text-[15px] 2xl:text-[16px] leading-relaxed mb-4">
              And there’s more to play for. Each group has a Player of the Day, celebrating effort, attitude and teamwork.
            </p>

            <p className="gasoek text-white text-[20px] sm:text-[24px]">
              Day after day, Rio gets a little closer.
            </p>
          </div>

          {/* Right Column: Road to Rio Map Graphic */}
          <div className="lg:col-span-5 xl:col-span-6 flex justify-center items-center">
            <div className="relative w-full max-w-[620px] transition-transform duration-500 hover:scale-[1.02]">
              <img
                src={rioMapImg}
                alt="Road to Rio Map illustration"
                className="w-full h-auto object-contain drop-shadow-2xl select-none"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export { Section5 as WatchJourneySection };
export default Section5;