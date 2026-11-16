import React from 'react';
import { Container } from '../../../components/common/Container';
import textureBg from 'https://webstepdev.com/demo/syncoWebsiteImages/venues/showcase.png';
import mascotKicking from 'https://webstepdev.com/demo/syncoWebsiteImages/group.png';
import mascotStanding from 'https://webstepdev.com/demo/syncoWebsiteImages/venues/showcase2.png';

export function FiveWeeksLearnSection() {
  return (
    <section 
      className=" pt-[11rem] pb-[16rem] text-white relative overflow-hidden font-sans "
      style={{
        backgroundImage: `url(${textureBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'bottom',
        backgroundBlendMode: 'soft-light'
      }}
    >
         <img src={mascotStanding} alt="Samba Player" className="absolute top-[-8px] left-0 h-[172px] w-[39%]" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mt-10">
          
          {/* Left Column: Heading & Paragraphs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Header Title */}
            <div>
              <h2 className="recline font-extrabold text-3xl sm:text-4xl md:text-[46px] lg:text-[52px] xl:text-[61px] text-white leading-tight">
                Five weeks to <span className="text-[#FFDE14] font-normal gasoek">learn.</span> <br />
                One week to bring it all 
                together.
              </h2>
            </div>

            {/* Paragraphs */}
            <div className="space-y-3 poppins text-white font-semibold text-sm sm:text-[20px] leading-relaxed max-w-[640px] pt-2">
              <p>
                Every new skill takes them another step along their Road to Rio.
              </p>

              <p>
                Now show us what you’ve got.
              </p>

              <p className="">
                Every six-week segment culminates with a Showcase Week — a celebration of everything they’ve learnt, bringing their new skills into games, 1v1s and plenty of Samba football.
              </p>
            </div>

          </div>

          {/* Right Column: 3D Mountain Winding Path & Mascot Graphic */}

        </div>
      </Container>
      <div className="absolute w-full max-w-[320px] md:max-w-[420px] lg:max-w-[440px] xl:max-w-[750px] right-0 top-[4%] md:top-[8%] lg:top-[4%] flex items-center justify-center pointer-events-none z-0">
          <img
            src={mascotKicking}
            alt="Samba Player"
            className="w-full h-full object-contain drop-shadow-xl"
          />
      </div>
    </section>
  );
}
