import React from 'react';
import { Container } from '../../../components/common/Container';
import textureBg from 'https://webstepdev.com/demo/syncoWebsiteImages/venues/map.png';
import arrowNext from 'https://webstepdev.com/demo/syncoWebsiteImages/arrow-right.png';
import skill from 'https://webstepdev.com/demo/syncoWebsiteImages/skill.png';
import skill1 from 'https://webstepdev.com/demo/syncoWebsiteImages/skill2.png';
import skill2 from 'https://webstepdev.com/demo/syncoWebsiteImages/skill3.png';
import skill3 from 'https://webstepdev.com/demo/syncoWebsiteImages/skill4.png';

export function RioJourneyMapSection() {
  const steps = [
    { icon: skill, text: "Learn a new skill" },
    { icon: skill1, text: "Earn the sticker" },
    { icon: skill2, text: "Add it to map" },
    { icon: skill3, text: "Keep moving" }
  ];

  const cities = [
    { num: 1, name: "MANAUS", color: "bg-[#ff9800]" },
    { num: 2, name: "BRASÍLIA", color: "bg-[#0DD180]" },
    { num: 3, name: "RECIFE", color: "bg-[#052975]" },
    { num: 4, name: "SÃO PAULO", color: "bg-[#ff1744]" },
    { num: 5, name: "PORTO ALEGRE", color: "bg-[#9c27b0]" },
    { num: 6, name: "RIO DE JANEIRO", color: "bg-[#FFDE14] text-[#042C89]" }
  ];

  return (
    <section 
     style={{
        backgroundImage: `url(${textureBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'soft-light'
      }}
    className="py-16 sm:py-[150px]  xl:max-h-[860px] text-white relative overflow-hidden font-sans border-t border-white/20">
      

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Title, Paragraph, 4-Step Yellow Box & Bottom Text */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Header Title */}
            <div>
              <h2 className="gasoek text-4xl sm:text-[61px] text-[#042C89]   leading-[1.2]">
                WATCH THEIR <br />
                JOURNEY FILL UP.
              </h2>
            </div>

            {/* Paragraph Copy */}
            <p className="text-white poppins font-bold text-sm sm:text-[18px] leading-relaxed max-w-2xl pt-1">
              Every child gets their own fold-out Road to Rio Map. As they travel through Brazil and learn new skills, they collect stickers and add them to their map.
            </p>

            {/* Yellow 4-Step Process Box */}
            <div className="bg-[#FFDE14] rounded-[20px] p-4 sm:p-5 shadow-2xl text-[#042C89] my-6 border border-white/20">
              <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2">
                {steps.map((step, idx) => (
                  <React.Fragment key={idx}>
                    {idx > 0 && (
                      <span className="text-[#042C89] font-black text-sm select-none hidden sm:inline"><img src={arrowNext} alt="" /></span>
                    )}
                    <div className="bg-white rounded-2xl p-2.5 sm:p-3 text-center flex-1 min-w-[100px] shadow-sm space-y-1">
                      <span className="text-2xl block"><img src={step.icon} alt="" className='w-[44px] h-[44px] ' /></span>
                      <span className="font-extrabold text-[10px] sm:text-[13px] text-[#042C89] block text-left leading-tight">
                        {step.text}
                      </span>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Bottom Copy */}
            <div className="space-y-2 max-w-xl">
              <p className="text-white font-medium text-xs sm:text-[16px] poppins leading-relaxed">
                There’s also a Player of the Day in each group, recognising effort, attitude, football and teamwork — while every player receives encouragement throughout the camp.
              </p>

              <h3 className="gasoek text-lg sm:text-xl text-white pt-2">
                Day after day, Rio gets a little closer.
              </h3>
            </div>

          </div>

          {/* Right Column: Illustrated Brazil Island Map & City Stadium Badges */}
          <div className="lg:col-span-6 relative flex justify-center">
         
          </div>

        </div>
      </Container>
    </section>
  );
}
