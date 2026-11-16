import React from 'react';
import { Star } from 'lucide-react';
import { Container } from '../../../components/common/Container';

const BASE = 'https://webstepdev.com/demo/syncoWebsiteImages';
const blueBgTexture = `${BASE}/bluetexturedbg.png`;
const googleLogo = `${BASE}/google.png`;
const layer = `${BASE}/g_layer1.png`;
const layer2 = `${BASE}/g_layer2.png`;
const review1Avatar = `${BASE}/holiday-camps/review_1.png`;
const review3Avatar = `${BASE}/holiday-camps/review_2.png`;
const review2Avatar = `${BASE}/holiday-camps/review_3.png`;

// Desktop (>= sm) cards: 3 in a row
function DesktopReviewCard({ cardClass, avatar, alt, text, name, starClass }) {
  return (
    <div
      className={`${cardClass} rounded-[24px] p-5 lg:p-6 xl:p-8 flex flex-col items-center text-center h-full`}
    >
      <img
        src={avatar}
        alt={alt}
        className="w-[110px] h-[110px] lg:w-[130px] lg:h-[130px] xl:w-[170px] xl:h-[160px] object-contain mb-3"
      />

      <div className="flex items-center justify-center gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-[22px] h-[22px] lg:w-[24px] lg:h-[24px] xl:w-[30px] xl:h-[30px] ${starClass}`}
          />
        ))}
      </div>

      <p className="poppins font-semibold text-[#042C89] text-[14px] lg:text-[18px] xl:text-[21px] leading-[1.5] mb-4 flex-1">
        {text}
      </p>

      <p className="poppins italic font-bold text-[13px] lg:text-[14px] xl:text-[15px] text-[#042C89]">
        {name}
      </p>
    </div>
  );
}

export function Section12() {
  return (
    <section className="relative w-full overflow-hidden bg-[#042C89] py-16 md:pt-[100px]">
      {/* Background Texture */}
      <img
        src={blueBgTexture}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
      />

      <Container className="relative z-10 w-full text-center">
        {/* Heading */}
        <h2 className="recline font-bold text-white text-[34px] sm:text-[46px] md:text-[56px] leading-[1.05] mb-4">
          See what four <br className="block md:hidden" /> days can do
        </h2>

        {/* Google Reviews Badge */}
        <div className="inline-flex items-center justify-center gap-2 sm:gap-3 md:mt-1 mt-4 mb-8 md:mb-14 relative">
          <span className="flex flex-col items-end gap-1 select-none">
            <img
              src={layer}
              alt="Panda"
              className="h-8 w-8 md:w-16 md:h-16 object-contain drop-shadow-xs"
            />
          </span>

          <div className="flex items-center gap-4">
            <img
              src={googleLogo}
              alt="Google"
              className="h-8 w-8 md:w-[51px] md:h-[51px] object-contain"
            />
            <span className="poppins font-semibold text-white text-[15px] sm:text-[24px]">
              Real reviews from Google
            </span>
          </div>

          <span className="flex flex-col items-start gap-1 select-none">
            <img
              src={layer2}
              alt="Panda"
              className="h-8 w-8 md:w-16 md:h-16 object-contain drop-shadow-xs"
            />
          </span>
        </div>

        {/* ========================================================= */}
        {/* MOBILE VIEW (< sm) - Original layout, unchanged           */}
        {/* ========================================================= */}
        <div className="sm:hidden flex flex-col gap-3 max-w-[1198px] mx-auto">
          {/* Cyan Review Card */}
          <div className="bg-[#00A6E3] text-white rounded-[20px] p-5 min-h-[176px] flex flex-col justify-center">
            <div className="flex items-center gap-3.5 mb-3">
              <img
                src={review1Avatar}
                alt="Wendy Smith Bishop"
                className="w-[70px] h-[70px] rounded-full object-cover shrink-0"
              />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-[22px] h-[22px] fill-[#FFDE14] text-[#FFDE14]"
                    />
                  ))}
                </div>
                <p className="poppins italic font-bold text-[13px] mt-3 text-[#042C89]">
                  Wendy Smith Bishop
                </p>
              </div>
            </div>
            <p className="poppins font-semibold text-[#042C89] text-[14.5px] text-left leading-[1.4]">
              His skills and confidence has grown and <br /> I have found the teaching to be very supportive and fun.
            </p>
          </div>

          {/* Yellow Review Card */}
          <div className="bg-[#FFDE14] text-[#042C89] rounded-[20px] p-5 min-h-[176px] flex flex-col justify-center">
            <div className="flex items-center gap-3.5 mb-3">
              <img
                src={review3Avatar}
                alt="Nayoka Oware"
                className="w-[80px] h-[80px] rounded-full object-contain shrink-0"
              />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-[22px] h-[22px] fill-[#042C89] text-[#042C89]"
                    />
                  ))}
                </div>
                <p className="poppins italic font-bold text-start text-[13px] mt-3 text-[#042C89]">
                  Nayoka Oware
                </p>
              </div>
            </div>
            <p className="poppins font-semibold text-[#042C89] text-start text-[15px] leading-[1.4]">
              Fantastic coaches! Kids are making so much progress! So glad my son is apart of Samba.
            </p>
          </div>

          {/* White Review Card */}
          <div className="bg-white rounded-[20px] p-6 text-center shadow-[0_5px_20px_rgba(0,0,0,0.06)]">
            <img
              src={review2Avatar}
              alt="Huda Almashjari"
              className="w-[100px] h-[100px] object-contain mx-auto mb-3"
            />

            <p className="poppins font-semibold text-[#042C89] text-[16px] md:leading-[1.35] mb-3">
              My son attended the summer <br /> camp this year and had an amazing time! The coaches created such a memorable, fun & educational atmosphere!
            </p>

            <p className="poppins italic font-bold text-[13px] text-[#042C89] mb-3">
              Huda Almashjari
            </p>

            <div className="flex items-center justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-[26px] h-[26px] fill-[#FFDE14] text-[#FFDE14]"
                />
              ))}
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* DESKTOP VIEW (sm to < 1140px) - 3 cards in a row          */}
        {/* ========================================================= */}
        <div className="hidden sm:grid min-[1140px]:hidden grid-cols-3 gap-4 lg:gap-6 max-w-[1198px] mx-auto items-stretch">
          <DesktopReviewCard
            cardClass="bg-[#00A6E3]"
            avatar={review1Avatar}
            alt="Wendy Smith Bishop"
            text="His skills and confidence has grown and I have found the teaching to be very supportive and fun."
            name="Wendy Smith Bishop"
            starClass="fill-[#FFDE14] text-[#FFDE14]"
          />
          <DesktopReviewCard
            cardClass="bg-[#FFDE14]"
            avatar={review3Avatar}
            alt="Nayoka Oware"
            text="Fantastic coaches! Kids are making so much progress! So glad my son is apart of Samba."
            name="Nayoka Oware"
            starClass="fill-white text-white"
          />
          <DesktopReviewCard
            cardClass="bg-white"
            avatar={review2Avatar}
            alt="Huda Almashjari"
            text="My son attended the summer camp this year and had an amazing time! The coaches created such a memorable, fun & educational atmosphere!"
            name="Huda Almashjari"
            starClass="fill-[#FFDE14] text-[#FFDE14]"
          />
        </div>

        {/* ========================================================= */}
        {/* LARGE SCREENS VIEW (>= 1140px) - Exact Mockup Layout      */}
        {/* ========================================================= */}
        <div className="hidden min-[1140px]:grid grid-cols-[1.36fr_1fr] gap-5 lg:gap-6 max-w-[1140px] xl:max-w-[1180px] mx-auto items-stretch text-left">
          {/* Left Column: Two horizontal cards stacked */}
          <div className="flex flex-col gap-5 lg:gap-6">
            {/* Top Card: Cyan / Blue */}
            <div className="flex-1 bg-[#00A6E3] rounded-[28px] lg:rounded-[32px] p-6 lg:p-7 xl:p-8 flex items-center gap-5 lg:gap-6 shadow-sm">
              <img
                src={review1Avatar}
                alt="Wendy Smith Bishop"
                className="w-[95px] h-[95px] lg:w-[105px] lg:h-[105px] xl:w-[115px] xl:h-[115px] rounded-full object-cover shrink-0"
              />
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-1 mb-2 lg:mb-2.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] fill-[#FFDE14] text-[#FFDE14]"
                    />
                  ))}
                </div>
                <p className="poppins font-semibold text-[#042C89] text-[14px] lg:text-[18px] xl:text-[21px] leading-[1.36] lg:leading-[1.4] mb-2 lg:mb-2.5">
                  His skills and confidence has grown<br />
                  and I have found the teaching to be<br />
                  very supportive and fun.
                </p>
                <p className="poppins italic font-bold text-[13px] lg:text-[14px] text-[#042C89]">
                  Wendy Smith Bishop
                </p>
              </div>
            </div>

            {/* Bottom Card: Yellow */}
            <div className="flex-1 bg-[#FFDE14] rounded-[28px] lg:rounded-[32px] p-6 lg:p-7 xl:p-8 flex items-center gap-5 lg:gap-6 shadow-sm">
              <img
                src={review3Avatar}
                alt="Nayoka Oware"
                className="w-[95px] h-[95px] lg:w-[105px] lg:h-[105px] xl:w-[115px] xl:h-[115px] rounded-full object-cover shrink-0"
              />
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-1 mb-2 lg:mb-2.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] fill-white text-white"
                    />
                  ))}
                </div>
                <p className="poppins font-semibold text-[#042C89] text-[14px] lg:text-[18px] xl:text-[21px] leading-[1.36] lg:leading-[1.4] mb-2 lg:mb-2.5">
                  Fantastic coaches! Kids are making so<br />
                  much progress! So glad my son is<br />
                  apart of Samba.
                </p>
                <p className="poppins italic font-bold text-[13px] lg:text-[14px] text-[#042C89]">
                  Nayoka Oware
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: One tall centered white card */}
          <div className="h-full">
            <div className="bg-white rounded-[28px] lg:rounded-[32px] p-6 lg:p-7 xl:p-8 h-full flex flex-col items-center justify-center text-center shadow-[0_5px_25px_rgba(0,0,0,0.06)]">
              <img
                src={review2Avatar}
                alt="Huda Almashjari"
                className="w-[125px] h-[125px] lg:w-[145px] lg:h-[145px] xl:w-[160px] xl:h-[160px] object-contain mb-3 lg:mb-4"
              />

              <div className="flex items-center justify-center gap-1.5 mb-3 lg:mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-[19px] h-[19px] lg:w-[21px] lg:h-[21px] fill-[#FFDE14] text-[#FFDE14]"
                  />
                ))}
              </div>

              <p className="poppins font-semibold text-[#042C89] text-[14px] lg:text-[20px] xl:text-[20px] leading-[1.4] lg:leading-[1.45] mb-3 lg:mb-4">
                My son attended the summer camp this<br />
                year and had an amazing time! The<br />
                coaches created such a memorable, fun<br />
                &amp; educational atmosphere!
              </p>

              <p className="poppins italic font-bold text-[13px] lg:text-[14px] text-[#042C89]">
                Huda Almashjari
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA Outline Button */}
        <div className="text-center mt-8 sm:mt-12">
          <a
            href="https://maps.google.com/?q=Samba+Soccer+Schools+London"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-4 border-2 border-white text-white hover:bg-white hover:text-[#00A859] font-bold text-[12px] sm:text-[14px] w-full sm:w-max uppercase px-5 py-3 sm:px-8 sm:py-3.5 rounded-full transition-all duration-200 poppins cursor-pointer md:max-w-[320px] sm:w-auto"
          >
            <span className="whitespace-nowrap">SEE MORE REVIEWS ON GOOGLE</span>
            <span className="text-[14px]">→</span>
          </a>
        </div>
      </Container>
    </section>
  );
}

export { Section12 as CampReviewsSection };
export default Section12;