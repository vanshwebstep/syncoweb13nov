import React from 'react';
import { Container } from '../../../components/common/Container';
import { Star } from 'lucide-react';

// Images
import googleLogo from 'https://webstepdev.com/demo/syncoWebsiteImages/google.png';
import texturePattern from 'https://webstepdev.com/demo/syncoWebsiteImages/the-samba-way.png';
import layer from 'https://webstepdev.com/demo/syncoWebsiteImages/g_layer1.png';
import layer2 from 'https://webstepdev.com/demo/syncoWebsiteImages/g_layer2.png';
import rev_1 from 'https://webstepdev.com/demo/syncoWebsiteImages/one-to-one/pp-1.png';
import rev_2 from 'https://webstepdev.com/demo/syncoWebsiteImages/one-to-one/pp-2.png';
import rev_3 from 'https://webstepdev.com/demo/syncoWebsiteImages/one-to-one/pp-3.png';

const Stars = ({ colorClass, sizeClass = 'w-[16px] h-[16px] sm:w-[30px] sm:h-[30px]' }) => (
  <div className="flex items-center gap-[4px]">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className={`${sizeClass} ${colorClass}`} />
    ))}
  </div>
);

const Avatar = ({ src, alt, sizeClass }) => (
  <img
    src={src}
    alt={alt}
    className={`${sizeClass} rounded-full object-cover shrink-0`}
  />
);

const LEFT_REVIEWS = [
  {
    bg: 'bg-[#00A3E0]',
    starClassDesktop: 'fill-[#FFDE14] text-[#FFDE14]',
    starClassMobile: 'fill-[#FFDE14] text-[#FFDE14]',
    avatarMobile: (
      <Avatar src={rev_1} alt="Lori Gately" sizeClass="w-[70px] h-[70px]" />
    ),
    avatarDesktop: (
      <Avatar
        src={rev_1}
        alt="Lori Gately"
        
        sizeClass="w-[72px] h-[72px] md:w-[85px] md:h-[85px] lg:w-[110px] lg:h-[110px] xl:w-[150px] xl:h-[150px]"
      />
    ),
    text: <>My son loved his private lessons.<br className='hidden md:block'/> Coach Ade was excellent and<br className='hidden md:block'/> reliable.</>,
    name: 'Lori Gately',
  },
  {
    bg: 'bg-[#FFE014]',
    starClassDesktop: 'fill-white text-white',
    starClassMobile: 'fill-[#042C89] text-[#042C89]',
    avatarMobile: (
      <Avatar src={rev_2} alt="Ramona Guerrettaz" sizeClass="w-[70px] h-[70px]" />
    ),
    avatarDesktop: (
      <Avatar
        src={rev_2}
        alt="Ramona Guerrettaz"
        sizeClass="w-[72px] h-[72px] md:w-[85px] md:h-[85px] lg:w-[110px] lg:h-[110px] xl:w-[150px] xl:h-[150px]"
      />
    ),
    text: <>Coach Ainsley is so knowledgeable<br className='hidden md:block'/> and was so much fun for my daughter. He taught her a lot of cool tricks.</>,
    name: 'Ramona Guerrettaz',
  },
];

export function PartiesSection() {
  return (
    <section
      className="relative w-full overflow-hidden bg-cover bg-center py-12 sm:py-14 lg:pt-[100px]"
      style={{
        backgroundImage: `url(${texturePattern})`,
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Container className="relative z-10">
        {/* Section Title */}
        <div className="text-center mb-6 sm:mb-10">
          <h2 className="recline text-white text-[30px] sm:text-[34px] md:text-[42px] lg:text-[56px] font-semibold leading-[1.1] max-w-[280px] xs:max-w-[320px] sm:max-w-none mx-auto">
            See what individual attention can do.
          </h2>

          {/* Google badge with rays */}
          <div className="inline-flex items-center justify-center gap-2 sm:gap-3 mt-3 sm:mt-4 relative">
            <img
              src={layer}
              alt=""
              aria-hidden="true"
              className="h-5 w-5 sm:h-14 sm:w-14 md:h-10 md:w-10 lg:h-14 lg:w-14 object-contain select-none"
            />
            <div className="flex items-center gap-2 sm:gap-2.5">
              <img
                src={googleLogo}
                alt="Google"
                className="h-6 w-6 sm:h-[45px] sm:w-[45px] md:h-[36px] md:w-[36px] lg:h-[45px] lg:w-[45px] object-contain"
              />
              <span className="poppins font-semibold text-white text-[16px] sm:text-[24px] md:text-[20px] lg:text-[24px]">
                Real reviews from Google
              </span>
            </div>
            <img
              src={layer2}
              alt=""
              aria-hidden="true"
              className="h-5 w-5 sm:h-14 sm:w-14 md:h-10 md:w-10 lg:h-14 lg:w-14 object-contain select-none"
            />
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5 md:gap-4 lg:gap-5 max-w-[320px] xs:max-w-[340px] sm:max-w-[480px] md:max-w-none lg:max-w-[1198px] mx-auto items-stretch">
          {/* LEFT — 2 review cards */}
          <div className="md:col-span-7 flex flex-col gap-4 sm:gap-5 md:gap-4 lg:gap-5 ">
            {LEFT_REVIEWS.map((r) => (
              <div
                key={r.name}
                className={`${r.bg} rounded-[20px] sm:rounded-[24px] px-4 py-6 sm:px-6 sm:py-6 md:p-4 lg:px-6 lg:py-6 flex-1 flex flex-col justify-center`}
              >
                {/* Mobile Layout (Avatar + Stars/Name top row, text below) */}
                <div className="md:hidden text-left">
                  <div className="flex items-center gap-3.5 mb-2.5">
                    {r.avatarMobile}
                    <div>
                      <Stars
                        colorClass={r.starClassMobile}
                        sizeClass="w-[24px] h-[24px] mb-2"
                      />
                      <p className="poppins italic font-bold text-[11px] xs:text-[12px] text-[#0A2E8A]">
                        {r.name}
                      </p>
                    </div>
                  </div>
                  <p className="poppins font-semibold text-[#0A2E8A] text-[14px] xs:text-[14.5px] leading-[1.4]">
                    {r.text}
                  </p>
                </div>

                {/* Tablet / Desktop Layout (Avatar on left, right column) */}
                <div className="hidden md:flex items-center gap-4 lg:gap-8 h-full">
                  <div className="shrink-0">
                    {r.avatarDesktop}
                  </div>
                  <div className="text-left flex-1 min-w-0">
                    <div className="mb-1.5 lg:mb-2">
                      <Stars
                        colorClass={r.starClassDesktop}
                        sizeClass="w-[18px] h-[18px] lg:w-[22px] lg:h-[22px] xl:w-[30px] xl:h-[30px] mb-2 lg:mb-3"
                      />
                    </div>
                    <p className="poppins font-semibold text-[#0A2E8A] text-[18px] sm:text-[22px] md:text-[14.5px] lg:text-[16px] xl:text-[22px] leading-[1.35] lg:leading-[1.4] mb-2 lg:mb-2.5">
                      {r.text}
                    </p>
                    <p className="poppins italic font-bold text-[13px] sm:text-[15px] md:text-[12px] lg:text-[14px] xl:text-[15px] text-[#0A2E8A]">
                      {r.name}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT — white card (Caroline Hawley) */}
          <div className="md:col-span-5">
            {/* Mobile Layout (Avatar -> text -> name -> stars at bottom) */}
            <div className="md:hidden bg-white rounded-[20px] px-5 py-5 text-center flex flex-col items-center">
              <Avatar
                src={rev_3}
                alt="Caroline Hawley"
                sizeClass="w-[58px] h-[58px]"
              />

              <p className="poppins font-semibold text-[#0A2E8A] text-[16px] xs:text-[16px] leading-[1.5] mt-3.5 mb-3">
                Our 7-year old has been having one-to-one sessions with Kym - who has been
                brilliant. The classes have given him so much confidence. Thanks, Kym!
              </p>

              <p className="poppins italic font-bold text-[11px] xs:text-[12px] text-[#0A2E8A] mb-2">
                Caroline Hawley
              </p>

              <Stars
                colorClass="fill-[#FFDE14] text-[#FFDE14]"
                sizeClass="w-[30px] h-[30px]"
              />
            </div>

            {/* Tablet / Desktop Layout (Avatar -> stars -> text -> name) */}
            <div className="hidden md:flex bg-white rounded-[24px] px-4 py-5 lg:px-6 lg:py-6 xl:px-10 xl:py-7 h-full flex-col items-center justify-center text-center">
              <Avatar
                src={rev_3}
                alt="Caroline Hawley"
                sizeClass="w-[85px] h-[85px] lg:w-[120px] lg:h-[120px] xl:w-[180px] xl:h-[180px]"
              />

              <div className="mt-2.5 mb-2.5 lg:mt-4 lg:mb-4">
                <Stars
                  colorClass="fill-[#FFDE14] text-[#FFDE14]"
                  sizeClass="w-[18px] h-[18px] lg:w-[24px] lg:h-[24px] xl:w-[30px] xl:h-[30px]"
                />
              </div>

              <p className="poppins font-semibold text-[#0A2E8A] text-[13px] lg:text-[15px] xl:text-[19.5px] leading-[1.4] lg:leading-[1.5] mb-2.5 lg:mb-4">
                Our 7-year old has been having one-<br className="hidden lg:inline"/> to-one sessions with Kym - who has been
                brilliant. The classes have given him so much confidence. Thanks, Kym!
              </p>

              <p className="poppins italic font-bold text-[11px] lg:text-[14px] xl:text-[15px] text-[#0A2E8A]">
                Caroline Hawley
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
            className="inline-flex items-center justify-center gap-2 tracking-[0.3px] border-2 border-white text-white hover:bg-white hover:text-[#00A859] font-semibold text-[10.5px] xs:text-[11.5px] sm:text-[15px] uppercase px-6 sm:px-8 py-2.5 sm:py-3.5 rounded-full transition-all duration-200 poppins cursor-pointer w-full  md:w-fit mx-auto"
          >
            <span>See more reviews on Google</span>
            <span className="text-[11px] sm:text-[13px]">→</span>
          </a>
        </div>
      </Container>
    </section>
  );
}

export default PartiesSection;