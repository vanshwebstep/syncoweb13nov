import React from 'react';
import { Container } from '../../../components/common/Container';
import textureBg from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/cope_banner.png';
import mobileBg from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/code_de_samba_mobile.png';
import vector from 'https://webstepdev.com/demo/syncoWebsiteImages/yellow-vector.png';
import blue from 'https://webstepdev.com/demo/syncoWebsiteImages/bluevector.png';
import trophyTeamPhoto from 'https://webstepdev.com/demo/syncoWebsiteImages/code_de_samba.png';
import bottomYellowWave from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/cope_layer.png';

export function CopeDeSamba() {
  return (
    <div className="relative overflow-hidden bg-white">
      {/* Mobile Background Image */}
      <img
        src={mobileBg}
        alt=""
        aria-hidden="true"
        className="block md:hidden absolute inset-0 w-full h-full object-fill pointer-events-none z-0"
      />

      {/* Desktop Background Image */}
      <img
        src={textureBg}
        alt=""
        aria-hidden="true"
        className="hidden md:block absolute inset-0 w-full h-full object-cover object-top pointer-events-none z-0"
      />

      {/* Main Section */}
      <section className="md:py-10 py-[100px] text-[#042C89] pb-24 relative z-10 font-sans">
        <Container className="relative z-10 text-center pb-10">
          {/* Top Trophy Celebrating Kids Graphic */}
          <div className="relative mx-auto mb-8 flex justify-center items-center">
            <div className="w-full max-w-[440px] lg:max-w-[620px]">
              <img
                src={trophyTeamPhoto}
                alt="Copa de Samba Finale"
                className="w-full h-auto object-contain drop-shadow-xl"
              />
            </div>
          </div>

          {/* Headline */}
          <div className="mb-5 md:mt-0 mt-[20px]">
            <h2 className="text-[38px] sm:text-[46px] md:text-[42px] min-[900px]:text-[52px] lg:text-[60px] xl:text-[68px] 2xl:text-[70px] recline leading-[0.95] text-[#042C89]">
              Cope de Samba
            </h2>
            <div className="text-[26px] sm:text-[34px] md:text-[32px] min-[900px]:text-[40px] lg:text-[46px] xl:text-[50px] 2xl:text-[52px] gasoek text-[#0DD180] relative inline-block mt-2">
              <div className="flex items-center justify-center gap-1">
                <img
                  src={vector}
                  alt=""
                  className="w-[22px] sm:w-[28px] md:w-[35px] absolute -top-1 md:-top-2.5 left-[-22px] sm:left-[-32px] md:-left-12 rotate-[158deg]"
                />
                <span className="leading-[1.2] relative inline-block">
                  Everything leads here
                </span>
                <img
                  src={vector}
                  alt=""
                  className="w-[22px] sm:w-[28px] md:w-[35px] absolute -top-1 md:-top-2.5 right-[-22px] sm:right-[-32px] md:-right-12"
                />
              </div>
              <img
                src={blue}
                alt=""
                className="cope-de-samba-blue-underline absolute right-4 sm:right-10 md:right-16 max-w-[80px] sm:max-w-[100px] md:max-w-[120px] -bottom-3 sm:-bottom-4 md:-bottom-5 h-3.5 sm:h-5 md:h-6"
              />
            </div>
          </div>

          <h3 className="recline text-[#00A6E3] text-[18px] sm:text-[22px] md:text-[22px] min-[900px]:text-[26px] lg:text-[32px] xl:text-[36px] 2xl:text-[38px] my-5 lg:my-8 xl:my-10">
            Our huge end-of-year tournament.
          </h3>
          {/* Paragraph Copy */}
          <div className="max-w-[720px] mx-auto space-y-4 md:space-y-6 mb-6">
            <p className="text-[#042C89] font-medium poppins text-[14px] sm:text-[15.5px] md:text-[14.5px] min-[900px]:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px] leading-relaxed">
              Copa de Samba is our end-of-year football festival, where Samba
              players come together to celebrate everything they've learned on
              their journey.
            </p>
            <p className="text-[#042C89] font-medium poppins text-[14px] sm:text-[15.5px] md:text-[14.5px] min-[900px]:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px] leading-relaxed">
              They pull on the colours of Brazilian legends, take the skills
              they've mastered throughout the year into real games, and play for
              their team in a celebration of skill, flair, creativity and fun.
            </p>
          </div>

          {/* Cyan Highlighting Lines */}
          <div className="recline text-[#0DD180] font-bold text-[17px] sm:text-[20px] md:text-[20px] min-[900px]:text-[22px] lg:text-[24px] xl:text-[26px] space-y-1.5 mt-4 lg:mt-6 pt-2 lg:pt-3">
            <p>Thirty-eight weeks of Samba. <br/>
              One unforgettable finale.
            </p>
          </div>
        </Container>
      </section>

      {/* Bottom Yellow Wave (Desktop only) */}
      <img
        src={bottomYellowWave}
        alt=""
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-full pointer-events-none z-0 object-cover hidden md:block"
      />
    </div>
  );
}

export default CopeDeSamba;
