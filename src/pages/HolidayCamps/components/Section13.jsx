import React from 'react';
import { Container } from '../../../components/common/Container';
import { useModal } from '../../../context/ModalContext';

const accelerateImg = 'https://webstepdev.com/demo/syncoWebsiteImages/holiday-camps/accelerate.png';

export function Section13() {
  const { openModal } = useModal();

  return (
    <section className="relative w-full overflow-hidden bg-white py-14">
      <Container className="relative z-10 w-full">
        {/* Outer Banner Card with accelerate_banner.png Background */}
        <div
          style={{
            backgroundSize: "cover",
            backgroundPosition: "top",
            backgroundRepeat: "no-repeat",
          }}
          className="max-w-[1160px] mx-auto accelerate-banner rounded-[32px] sm:rounded-[44px] flex justify-end md:rounded-[54px] p-3 pt-[160px] sm:p-5 md:pt-12 md:pb-12 md:px-6 xl:px-8 relative overflow-hidden">
          {/* Background Image: accelerate_banner.png */}

          {/* Inner White Box Card */}
          <div className="relative z-10 bg-white md:w-[88%] xl:w-[85%] ms-auto rounded-[24px] sm:rounded-[34px] md:rounded-[42px] p-4 py-10 sm:p-7 md:p-8 xl:p-10 ">
            <div className="grid grid-cols-1 px-2 md:px-0 md:grid-cols-12 gap-6 items-center">

              {/* Left Column: Photo with built-in cyan speech bubble border */}
              <div className="md:col-span-4 flex justify-center items-center">
                <div
                  className="
                    absolute w-full m-auto left-0 right-0 top-[-23%] max-w-[95%]
                    md:top-auto md:m-0 md:left-[-70px] md:right-auto md:w-[250px] md:max-w-none
                    lg:left-[-80px] lg:w-[320px]
                    xl:left-0 xl:right-0 xl:w-full xl:max-w-[430px] xl:ms-[-15%] xl:me-auto
                  "
                >
                  <img
                    src={accelerateImg}
                    alt="Ready to accelerate their Road to Rio"
                    className="w-full h-auto object-contain select-none filter "
                  />
                </div>
              </div>

              {/* Right Column: Copy & CTA */}
              <div className="md:col-span-8 text-left pl-0 md:pl-[40px] lg:pl-4 md:pt-0 pt-[90px]">
                {/* 2-line Heading */}
                <h2 className="xl:leading-[1.1] leading-[1.4] mb-4">
                  <span className="gasoek text-[#00A3E0] text-[28px] sm:text-[40px] md:text-[26px] lg:text-[32px] xl:text-[48px] block">
                    Ready to accelerate
                  </span>
                  <span className="recline text-[#042C89] font-bold text-[28px] sm:text-[40px] md:text-[26px] lg:text-[32px] xl:text-[48px] block">
                    their Road to Rio?
                  </span>
                </h2>

                {/* Description */}
                <p className="poppins font-semibold text-[#27364B] text-[13.5px] sm:text-[16px] md:text-[15px] lg:text-[16px] xl:text-[20px] leading-relaxed mb-3 max-w-[530px]">
                  Four days. Six Brazilian legends. Twelve new skills, stickers and plenty of football along the way.
                </p>

                {/* Cyan Squiggle Vector */}
                <div className="my-3 sm:my-4">
                  <svg
                    className="w-16 h-3 text-[#00A3E0]"
                    viewBox="0 0 64 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 6C6 2 10 2 14 6C18 10 22 10 26 6C30 2 34 2 38 6C42 10 46 10 50 6C54 2 58 2 62 6"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                {/* Sub-text */}
                <p className="poppins font-semibold text-[#27364B] text-[13px] sm:text-[17px] md:text-[15px] lg:text-[16px] xl:text-[20px] mb-5 sm:mb-6">
                  Their place on the map is waiting.
                </p>

                {/* CTA Button */}
                <button
                  onClick={() => openModal('venue')}
                  className="bg-[#042C89] hover:bg-[#031538] active:scale-95 text-white font-bold text-[14px] sm:text-[18px] md:text-[15px] lg:text-[16px] xl:text-[18px] w-full md:w-max md:px-6 lg:px-8 py-3.5 rounded-full transition-all duration-200 cursor-pointer poppins inline-block"
                >
                  Find A Skills Accelerator Camp
                </button>
              </div>

            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export { Section13 as ReadyToAccelerateSection };
export default Section13;