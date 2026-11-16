import React from 'react';
import { Container } from '../../../components/common/Container';
import textureBg from 'https://webstepdev.com/demo/syncoWebsiteImages/coaching.png';
import skills from 'https://webstepdev.com/demo/syncoWebsiteImages/skills-image.png';

export function WeeklyDestinationSection() {
  const milestones = [
    {
      title: "Learn the skills",
      textColor: "text-[#FFDE14]",
      bgAccent: "bg-[#00A6E3]/20 border-2 border-[#00A6E3]"
    },
    {
      title: "Collect the stars",
      textColor: "text-[#0DD180]",
      bgAccent: "bg-[#0DD180]/20 border-2 border-[#0DD180]"
    },
    {
      title: "Earn the badges",
      textColor: "text-[#FFDE14]",
      bgAccent: "bg-[#FFDE14]/20 border-2 border-[#FFDE14]"
    },
    {
      title: "Keep moving",
      textColor: "text-[#0DD180]",
      bgAccent: "bg-white/20 border-2 border-white"
    },
    {
      title: <>Welcome <br/> to Rio</>,
      textColor: "text-[#FFDE14]",
      bgAccent: "bg-[#00A6E3]/30 border-2 border-[#00A6E3]"
    }
  ];

  return (
    <section
      className="py-20  text-white relative overflow-hidden font-sans border-t border-white/10"
      style={{
        backgroundImage: `url(${textureBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'soft-light'
      }}
    >
      <Container className="relative z-10 text-center">

        {/* Header Titles */}
        <div className="space-y-1 mb-6">
          <h2 className="gasoek sm:text-[64px] text-white  leading-tight">
            Weekly Football
          </h2>
          <h3 className="gasoek sm:text-[64px] text-white  leading-tight">
            One Destination
          </h3>
          <h4 className="gasoek sm:text-[64px] text-[#FFDE14]  leading-tight pt-1">
            One Great Adventure
          </h4>
        </div>

        {/* Subtitle Paragraph */}
        <p className="text-slate-100 font-semibold text-xs sm:text-[20px] poppins leading-relaxed max-w-3xl mx-auto mb-14">
          Every Samba player begins their own Road to Rio — travelling through six Brazilian cities, learning new skills inspired by Brazilian football and collecting stars and badges along the way.
        </p>

        {/* 5 Milestone Badges Row with Dotted Path Line */}
        <div className="relative max-w-[930px] mx-auto">
          <img src={skills} alt="" />
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 relative z-10 my-3">
            {milestones.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center group cursor-pointer">


                <span className={`gasoek text-xs sm:text-[24px] tracking-[0.5px] ${item.textColor}  leading-tight mt-3 text-center`}>
                  {item.title}
                </span>

              </div>
            ))}
          </div>

        </div>

      </Container>
    </section>
  );
}
