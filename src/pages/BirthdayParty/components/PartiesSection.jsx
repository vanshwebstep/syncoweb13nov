import React from 'react';
import { Container } from '../../../components/common/Container';
import { Star } from 'lucide-react';

// Images
import review1Avatar from 'https://webstepdev.com/demo/syncoWebsiteImages/birthday-party/review1.png';
import review2Avatar from 'https://webstepdev.com/demo/syncoWebsiteImages/birthday-party/review2.png';
import review3Avatar from 'https://webstepdev.com/demo/syncoWebsiteImages/review3.png';
import texturePattern from 'https://webstepdev.com/demo/syncoWebsiteImages/the-samba-way.png';
import googleLogo from 'https://webstepdev.com/demo/syncoWebsiteImages/google.png';
import layer from 'https://webstepdev.com/demo/syncoWebsiteImages/g_layer1.png';
import layer2 from 'https://webstepdev.com/demo/syncoWebsiteImages/g_layer2.png';

export function PartiesSection() {
  return (
    <section
      className="relative w-full overflow-hidden bg-cover bg-center py-14 sm:py-18 lg:pb-16 lg:py-20"
      style={{
        backgroundImage: `url(${texturePattern})`,
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Container className="relative z-10">
        {/* Section Title */}
        <div className="text-center mb-6 sm:mb-12">
          <h2 className="recline text-white text-[38px] sm:text-[50px] md:text-[44px] lg:text-[64px] font-semibold leading-[1] md:leading-tight">
            Parties they'll remember
          </h2>

          {/* Google Reviews Pill Badge with Rays */}
          <div className="inline-flex items-center justify-center gap-2 sm:gap-3 md:mt-1 mt-4 relative">
            {/* Left yellow ray accent */}
            <span className="flex flex-col items-end gap-1 select-none">
              <img
                src={layer}
                alt="Panda"
                className="h-8 w-8 md:w-16 md:h-16 object-contain  drop-shadow-xs"
              />
            </span>

            {/* Google Pill */}
            <div className=" flex items-center gap-4">
              <img src={googleLogo} alt="Google" className="h-8 w-8 md:w-[51px] md:h-[51px] object-contain" />
              <span className="poppins font-semibold text-white text-[15px] sm:text-[24px]">
                Real reviews from Google
              </span>
            </div>

            {/* Right yellow ray accent */}
            <span className="flex flex-col items-start gap-1 select-none">
             <img
                src={layer2}
                alt="Panda"
                className="h-8 w-8 md:w-16 md:h-16 object-contain  drop-shadow-xs"
              />
            </span>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 gap-4 max-w-[1198px] mx-auto items-stretch">

          {/* LEFT — 2 Review Cards */}
          <div className="md:col-span-7 flex flex-col gap-4">

            {/* Cyan Review Card */}
            <div className="bg-[#00A6E3] text-white rounded-[20px] sm:rounded-[24px] p-5 sm:px-8 sm:py-8 md:p-4 lg:px-8 lg:py-8 min-h-[176px] md:min-h-0 lg:min-h-[176px] flex flex-col justify-center">
              {/* Mobile View (< sm) */}
              <div className="block sm:hidden">
                <div className="flex items-center gap-3.5 mb-3">
                  <img
                    src={review1Avatar}
                    alt="Aleksandra Sroka"
                    className="w-[60px] h-[60px] rounded-full object-cover shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-[16px] h-[16px] fill-[#FFDE14] text-[#FFDE14]"
                        />
                      ))}
                    </div>
                    <p className="poppins italic font-bold text-[12px] text-[#042C89]">
                      Aleksandra Sroka
                    </p>
                  </div>
                </div>
                <p className="poppins font-semibold text-[#042C89] text-[13px] leading-[1.4]">
                  Fantastic organisation of birthday party football workshop for my 9 year old son! Kids absolutely loved it!
                </p>
              </div>

              {/* Desktop View (>= sm) - Untouched */}
              <div className="hidden sm:flex items-center gap-5 sm:gap-6 md:gap-3.5 lg:gap-5 xl:gap-6">
                <img
                  src={review1Avatar}
                  alt="Aleksandra Sroka"
                  className="w-[88px] h-[88px] sm:w-[175px] sm:h-[156px] md:w-[90px] md:h-[90px] lg:w-[120px] lg:h-[120px] xl:w-[175px] xl:h-[156px] rounded-full object-contain shrink-0"
                />

                <div className="text-left flex-1">
                  {/* Stars */}
                  <div className="flex items-center gap-[5px] mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-[18px] h-[18px] sm:w-[30px] sm:h-[30px] md:w-[18px] md:h-[18px] lg:w-[22px] lg:h-[22px] xl:w-[30px] xl:h-[30px] fill-[#FFDE14] text-[#FFDE14]"
                      />
                    ))}
                  </div>

                  <p className="poppins font-semibold text-[#042C89] text-[14px] sm:text-[22px] md:text-[14px] lg:text-[16px] xl:text-[22px] leading-[1.35] mb-2 lg:mb-3 ">
                    Fantastic organisation of birthday party football workshop for my 9 <br className="hidden xl:block" />
                    year old son! Kids absolutely loved it!
                  </p>

                  <p className="poppins italic font-bold text-[11px] sm:text-[15px] md:text-[12px] lg:text-[14px] xl:text-[15px] text-[#042C89]">
                    Aleksandra Sroka
                  </p>
                </div>
              </div>
            </div>

            {/* Yellow Review Card */}
            <div className="bg-[#FFDE14] text-[#042C89] rounded-[20px] sm:rounded-[24px] p-5 sm:px-8 sm:py-8 md:p-4 lg:px-8 lg:py-8 min-h-[176px] md:min-h-0 lg:min-h-[176px] flex flex-col justify-center">
              {/* Mobile View (< sm) */}
              <div className="block sm:hidden">
                <div className="flex items-center gap-3.5 mb-3">
                  <img
                    src={review3Avatar}
                    alt="Mohamed Hassan"
                    className="w-[60px] h-[60px] rounded-full object-contain shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-[16px] h-[16px] fill-[#042C89] text-[#042C89]"
                        />
                      ))}
                    </div>
                    <p className="poppins italic font-bold text-[12px] text-[#042C89]">
                      Mohamed Hassan
                    </p>
                  </div>
                </div>
                <p className="poppins font-semibold text-[#042C89] text-[13px] leading-[1.4]">
                  We had a fun birthday because of Samba Soccer School! Thank you! And a big shout to Toby!!
                </p>
              </div>

              {/* Desktop View (>= sm) - Untouched */}
              <div className="hidden sm:flex items-center gap-5 sm:gap-6 md:gap-3.5 lg:gap-5 xl:gap-6">
                <img
                  src={review3Avatar}
                  alt="Mohamed Hassan"
                  className="w-[88px] h-[88px] sm:w-[175px] sm:h-[156px] md:w-[90px] md:h-[90px] lg:w-[120px] lg:h-[120px] xl:w-[175px] xl:h-[156px] rounded-full object-contain shrink-0"
                />

                <div className="text-left flex-1">
                  {/* Stars */}
                  <div className="flex items-center gap-[5px] mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-[18px] h-[18px] sm:w-[30px] sm:h-[30px] md:w-[18px] md:h-[18px] lg:w-[22px] lg:h-[22px] xl:w-[30px] xl:h-[30px] fill-white text-white"
                      />
                    ))}
                  </div>

                  <p className="poppins font-semibold text-[#042C89] text-[14px] sm:text-[22px] md:text-[14px] lg:text-[16px] xl:text-[22px] leading-[1.35] mb-2 lg:mb-3 ">
                    We had a fun birthday because of Samba Soccer School! Thank you!
                    And a big shout to Toby!!
                  </p>

                  <p className="poppins italic font-bold text-[11px] sm:text-[15px] md:text-[12px] lg:text-[14px] xl:text-[15px] text-[#042C89]">
                    Mohamed Hassan
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — Panda Review */}
          <div className="md:col-span-5">
            {/* Mobile View (< sm) */}
            <div className="block sm:hidden bg-white rounded-[20px] p-6 text-center shadow-[0_5px_20px_rgba(0,0,0,0.06)]">
              <img
                src={review2Avatar}
                alt="Panda"
                className="w-[85px] h-[85px] object-contain mx-auto mb-3"
              />

              <p className="poppins font-bold text-[#042C89] text-[15px] leading-[1.35] mb-3">
                John was super engaging and brilliant at making sure everyone had fun. My son and his friends had a ball! Thank you!
              </p>

              <p className="poppins italic font-bold text-[12px] text-[#042C89] mb-3">
                Ali McCulloch
              </p>

              {/* Stars at bottom on mobile */}
              <div className="flex items-center justify-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-[20px] h-[20px] fill-[#FFDE14] text-[#FFDE14]"
                  />
                ))}
              </div>
            </div>

            {/* Desktop View (>= sm) - Untouched */}
            <div className="hidden sm:flex bg-white rounded-[20px] sm:rounded-[24px] px-7 py-7 sm:px-8 sm:py-8 md:px-4 md:py-6 lg:px-6 lg:py-6 xl:px-8 xl:py-8 flex-col items-center justify-center text-center h-full min-h-[366px] md:min-h-0 lg:min-h-[366px]">
              <img
                src={review2Avatar}
                alt="Panda"
                className="w-[110px] h-[110px] sm:w-[200px] sm:h-[178px] md:w-[100px] md:h-[100px] lg:w-[130px] lg:h-[130px] xl:w-[200px] xl:h-[178px] object-contain mb-2 lg:mb-3"
              />

              {/* Stars */}
              <div className="flex items-center gap-[5px] mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-[30px] h-[30px] sm:w-[35px] sm:h-[35px] md:w-[20px] md:h-[20px] lg:w-[24px] lg:h-[24px] xl:w-[35px] xl:h-[35px] fill-[#FFDE14] text-[#FFDE14]"
                  />
                ))}
              </div>

              <p className="poppins font-semibold text-[#042C89] text-[15px] sm:text-[23px] md:text-[14px] lg:text-[16px] xl:text-[23px] leading-[1.4] max-w-[395px] mb-3 lg:mb-4">
                John was super engaging and brilliant at making sure everyone had fun.
                My son and his friends had a ball! Thank you!
              </p>

              <p className="poppins italic font-bold text-[12px] sm:text-[15px] md:text-[13px] lg:text-[14px] xl:text-[15px] text-[#042C89]">
                Ali McCulloch
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
            className="inline-flex items-center justify-center gap-2 tracking-[0.5px] border-2 border-white text-white hover:bg-white hover:text-[#00A859] font-bold text-[12px] sm:text-[14px] uppercase px-7 py-3 sm:px-8 sm:py-3.5 rounded-full transition-all duration-200 poppins cursor-pointer w-full sm:w-auto"
          >
            <span>SEE MORE REVIEWS ON GOOGLE</span>
            <span className="text-[14px]">→</span>
          </a>
        </div>
      </Container>
    </section>
  );
}

export default PartiesSection;
