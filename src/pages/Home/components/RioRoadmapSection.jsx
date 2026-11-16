import React from 'react';
import { Container } from '../../../components/common/Container';
import coachImg from 'https://webstepdev.com/demo/syncoWebsiteImages/home/coach-img.png';
import coachImgMb from 'https://webstepdev.com/demo/syncoWebsiteImages/home/coach-mobile.png';
import mascotImg from 'https://webstepdev.com/demo/syncoWebsiteImages/home/founder.png';
import layer from 'https://webstepdev.com/demo/syncoWebsiteImages/home/2layer.png';

export function RioRoadmapSection() {
  return (
    <section
      className="py-12 pb-16 md:py-14 bgImageNone lg:py-14 lg:pb-12 bg-[#F6F8FC] bg-no-repeat bg-right-bottom bg-cover text-[#042C89] relative overflow-hidden font-sans"
      style={{ backgroundImage: `url(${mascotImg})` }}
    >

      <Container className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 lg:gap-8 xl:gap-10 items-center max-w-[1100px] mx-auto">
          {/* Left Column: Text */}
          <img
            src={coachImgMb}
            className=" w-full block px-5 md:hidden"
            alt=""
          />
          <div className="md:col-span-7 w-full mx-auto md:mx-0 space-y-4 lg:space-y-5 relative">
            {/* Header */}
            <h2 className="recline text-center md:text-left font-extrabold text-[60px] sm:text-[48px] md:text-[36px] min-[900px]:text-[40px] lg:text-[44px] xl:text-[52px] 2xl:text-[56px] text-[#042C89] leading-[1] md:leading-tight">
              My Road  <br className="md:hidden block" />to
              <span className="gasoek font-normal text-[#0DD180] relative inline-block ml-1">
                Rio
                <img
                  src={layer}
                  className="absolute -bottom-5 right-0 md:w-[80%] w-full h-4"
                  alt=""
                />
              </span>
            </h2>

            {/* Story */}
            <div className="poppins space-y-4 text-[#042C89] text-[13.5px] lg:text-[14px] xl:text-[17px] font-medium leading-relaxed pt-3">
              <p className='font-medium'>
                Growing up, I loved football. But somewhere along the way, coaching took the freedom out of it.
              </p>

              <p className='font-medium'>Then I discovered Brazilian football.</p>

              {/* Highlighted quote */}
              <div className="flex items-stretch gap-3">
                {/* Left bar */}
                <div className="w-[4px] shrink-0 rounded-full bg-[#0DD180]" />

                <p className="text-[#00A6E3] font-bold text-[16px] lg:text-[18px] xl:text-[22px] leading-[1.4]">
                  The skill. The flair.
                  <br />
                  The freedom. The joy.
                </p>
              </div>

              <p className='font-medium'>It felt like a different game.</p>

              <p className='font-medium'>
                In 2009, I went to Brazil to find out why. I travelled the country, lived its football culture and eventually reached Rio.
              </p>

              <p className='font-medium'>
                What I brought home became Samba Soccer Schools. 15 years and 20,000+ children later, that same joy is in every session.
              </p>
            </div>

            {/* Name */}
            <div className="poppins pt-1">
              <h4 className="text-[15px] lg:text-[16px] xl:text-[17px] font-bold text-[#042C89] leading-none">
                Coach Nilio
              </h4>
              <span className="text-[#042C89] text-[11px] pt-1 lg:text-[12px] xl:text-[13px] font-medium">
                Founder of Samba Soccer Schools
              </span>
            </div>

            {/* Button */}
            <button
              type="button"
              className="poppins inline-flex items-center justify-center bg-[#0DD180] hover:bg-[#0bb86f] transition-colors text-white font-bold text-[14px] lg:text-[15px] xl:text-[20px] rounded-full px-6 py-2.5"
            >
              Read More
            </button>
          </div>

          {/* Right Column: Coach + kids circles image */}
          <div className="md:col-span-5 hidden lg:flex justify-center">
            <div className="w-full max-w-[380px] md:max-w-[300px] min-[900px]:max-w-[340px] lg:max-w-[400px] xl:max-w-[440px]">
              <img
                src={coachImg}
                alt="Coach Nilio - Founder"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </Container>

    </section>
  );
}