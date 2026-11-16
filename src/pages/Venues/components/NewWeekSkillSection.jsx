import React from 'react';
import { Container } from '../../../components/common/Container';
import textureBg from 'https://webstepdev.com/demo/syncoWebsiteImages/texture.png';

import imgLearn from 'https://webstepdev.com/demo/syncoWebsiteImages/tech1.png';
import imgMaster from 'https://webstepdev.com/demo/syncoWebsiteImages/tech2.png';
import imgTest from 'https://webstepdev.com/demo/syncoWebsiteImages/tech3.png';
import imgPlay from 'https://webstepdev.com/demo/syncoWebsiteImages/tech4.png';

export function NewWeekSkillSection() {
  const cards = [
    {
      title: "LEARN",
      desc: <>Every session has a skill <br />of the day taught step <br />by step by their coach.</>,
      img: imgLearn,
      topSwooshColor: "#00A6E3",
      bottomSwooshColor: "#FFDE14"
    },
    {
      title: "MASTER",
      desc: <>Time to repeat it, adjust it <br />and keep going until <br />something starts to click.</>,
      img: imgMaster,
      topSwooshColor: "#FFDE14",
      bottomSwooshColor: "#0DD180"
    },
    {
      title: "TEST",
      desc: <>Now add pressure. Make <br />decisions. Try the skill <br />against another player.</>,
      img: imgTest,
      topSwooshColor: "#FFDE14",
      bottomSwooshColor: "#0DD180"
    },
    {
      title: "PLAY",
      desc: <>It's game time. The coach <br />steps back. Time to see <br />what they do with it.</>,
      img: imgPlay,
      topSwooshColor: "#0DD180",
      bottomSwooshColor: "#FFDE14"
    }
  ];

  return (
    <section 
      className="py-16 bg-[#FFFFFF] text-slate-800 relative overflow-hidden font-sans"
      style={{
        backgroundImage: `url(${textureBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'multiply'
      }}
    >
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 max-w-[1282px] gap-12 items-start">
          
          {/* Left Column: Heading & Paragraph */}
          <div className="lg:col-span-5 space-y-6 mt-20">
            
            {/* Header Titles */}
            <div>
              <h2 className="gasoek text-[61px] text-[#0DD180] leading-[0.95]">
                New week.
              </h2>
              <h3 className="gasoek text-[61px] text-[#00A6E3] leading-[0.95] mt-1">
                New Skill.
              </h3>
              <h4 className="gasoek text-[61px] text-[#042C89] leading-[0.95] mt-1">
                Another step <br />
                forward
              </h4>
            </div>

            {/* Paragraph Copy */}
            <p className="text-[#042C89] poppins font-medium text-sm sm:text-[20px] leading-relaxed max-w-md pt-2">
              Every week, we take one new skill from first introduction to real football — giving children the technique to learn it and the freedom to make it their own.
            </p>

          </div>

          {/* Right Column: 4 Skill Progress Cards (2x2 Grid) */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 max-w-[691px] gap-6">
              {cards.map((card, idx) => (
                <div 
                  key={idx}
                  className="bg-[#042C89] rounded-[20px] pb-6  overflow-hidden shadow-2xl text-white relative flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300 group"
                >
                  {/* Top Photo Frame Container with Corner Swoosh and Wave Bottom */}
                  <div className="relative w-full overflow-hidden shrink-0">
                    <img 
                      src={card.img} 
                      alt={card.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />

                    {/* Top Right Curved Corner Accent */}
                    <svg 
                      className="absolute top-0 right-0 w-[10rem] h-[10rem] pointer-events-none z-10" 
                      viewBox="0 0 120 120" 
                      fill="none"
                    >
                      <path 
                        d="M 35 0 C 65 15, 95 45, 120 75 L 120 0 Z" 
                        fill={card.topSwooshColor} 
                      />
                    </svg>

                 
                  </div>

                  {/* Card Content Area */}
                  <div className="px-6 pb-6 pt-1 relative z-10 flex-1 flex flex-col justify-start">
                    <h3 className="gasoek text-[24px] sm:text-[26px] text-white tracking-wider mb-2 mt-3">
                      {card.title}
                    </h3>
                    <p className="text-[13px] sm:text-[14px] poppins font-medium text-white leading-snug max-w-[210px]">
                      {card.desc}
                    </p>
                  </div>

                  {/* Bottom Right Curved Accent Swoosh */}
                  <svg 
                    className="absolute bottom-0 -right-[1px] w-full h-[130px] sm:h-[140px] pointer-events-none z-0" 
                    viewBox="0 0 340 140" 
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path 
                      d="M 140 140 C 220 95, 275 46, 340 46 L 340 140 Z" 
                      fill={card.bottomSwooshColor} 
                    />
                  </svg>
                </div>
              ))}
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
