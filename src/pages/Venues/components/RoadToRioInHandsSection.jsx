import React from 'react';
import { Container } from '../../../components/common/Container';
import textureBg from 'https://webstepdev.com/demo/syncoWebsiteImages/texture.png';

import photo1 from 'https://webstepdev.com/demo/syncoWebsiteImages/coaching-coaches-team.png';
import photo4 from 'https://webstepdev.com/demo/syncoWebsiteImages/coaching-session-kids-alt.png';

export function RoadToRioInHandsSection() {
  return (
    <section 
      className="py-10 bg-[#f8fafc] text-slate-800 relative overflow-hidden font-sans "
      style={{
        backgroundImage: `url(${textureBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'multiply'
      }}
    >

      <Container className="relative z-10">
        <div className="flex flex-col lg:flex-row gap-6 xl:gap-8 items-center max-w-[1240px] mx-auto">
          
          {/* Left Column: 2 Stacked Curved Blob Photos */}
          <div className="w-full max-w-[200px] xl:max-w-[310px] flex justify-center">
            
            {/* Top Left Photo (Cyan Blob Border) */}
            <div>
              <img
                src={photo1}
                alt="Kids celebrating"
                className="w-full h-full object-cover"
              />
            </div>

          </div>

          {/* Center Column: Header Title, Copy & Button */}
          <div className="w-full lg:w-[460px] xl:w-[563px] text-center space-y-4">
            
            {/* Header Title */}
            <div>
              <h2 className="recline font-extrabold text-[36px] sm:text-[48px] lg:text-[48px] xl:text-[61px] text-[#042C89] leading-tight">
                Their{' '}
                <span className="gasoek text-[36px] sm:text-[48px] lg:text-[48px] xl:text-[61px] text-[#0DD180] font-normal inline-block">
                  Road to Rio.
                </span>
              </h2>

              <h3 className="recline font-extrabold text-[32px] sm:text-[44px] lg:text-[44px] xl:text-[61px] text-[#042C89] leading-tight mt-1">
                In their{' '}
                <span className="gasoek text-[32px] sm:text-[44px] lg:text-[44px] xl:text-[61px] text-[#00A6E3] font-normal inline-block">
                  hands.
                </span>
              </h3>
            </div>

            {/* Paragraph Copy */}
            <p className="text-[#475569] poppins font-semibold text-xs sm:text-[18px] lg:text-[18px] xl:text-[20px] leading-[25px] max-w-xl mx-auto pt-2">
              Every child gets a Samba Skills Tracker to follow their adventure, collect their stars and badges, and keep learning between sessions.
            </p>

            {/* Open A Sample Tracker Button */}
            <div className="pt-3">
              <button
                onClick={() => window.open('#', '_blank')}
                className="bg-[#042C89] hover:bg-[#03183d] text-white font-bold text-xs sm:text-[18px] lg:text-[18px] xl:text-[20px] px-8 py-4 sm:py-5 rounded-[50px] shadow-xl transition-all cursor-pointer inline-block tracking-wider"
              >
                Open A Sample Tracker
              </button>
            </div>

          </div>

          {/* Right Column: 2 Stacked Curved Blob Photos */}
          <div className="w-full max-w-[200px] xl:max-w-[320px] flex justify-center">
            
            <div>
              <img
                src={photo4}
                alt="Student using skills tracker album"
                className="w-full h-full object-cover"
              />
            </div>

          </div>

        </div>
      </Container>
    </section>
  );
}
