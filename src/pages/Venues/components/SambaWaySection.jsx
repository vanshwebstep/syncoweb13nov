import React from 'react';
import { Container } from '../../../components/common/Container';
import textureBg from 'https://webstepdev.com/demo/syncoWebsiteImages/venues/proof.png';
import card1 from 'https://webstepdev.com/demo/syncoWebsiteImages/card1.png';
import card3 from 'https://webstepdev.com/demo/syncoWebsiteImages/card3.png';
import card2 from 'https://webstepdev.com/demo/syncoWebsiteImages/feature-samba-music.png';
import card4 from 'https://webstepdev.com/demo/syncoWebsiteImages/venues/feature-small-groups.png';
import card5 from 'https://webstepdev.com/demo/syncoWebsiteImages/feature-skills-tracker.png';
import card6 from 'https://webstepdev.com/demo/syncoWebsiteImages/venues/Illustrations.png';
import flyingBall from 'https://webstepdev.com/demo/syncoWebsiteImages/flying-ball-motion-trail.png';

export function SambaWaySection() {
  const features = [
    {
      icon: card1,
      title: "Ball mastery",
      desc: "Lots of touches. Skills taught properly.",
      accent: "from-[#FFDE14] to-[#00A6E3]"
    },
    {
      icon: card2,
      title: "Samba Music",
      desc: "Rhythm, energy and Brazilian spirit.",
      accent: "from-[#00A6E3] to-[#FFDE14]"
    },
    {
      icon: card3,
      title: "Samba Skills Ball",
      desc: "Smaller. Weighted. Built for technique.",
      accent: "from-[#FFDE14] to-[#00A6E3]"
    },
    {
      icon: card4,
      title: "Road to Rio",
      desc: "One connected adventure.",
      accent: "from-[#00A6E3] to-[#FFDE14]"
    },
    {
      icon: card5,
      title: "Skills Tracker",
      desc: "Progress they can see and collect.",
      accent: "from-[#FFDE14] to-[#00A6E3]"
    },
    {
      icon: card6,
      title: "Venue Manager",
      desc: "Protecting the Samba standard every week.",
      accent: "from-[#00A6E3] to-[#FFDE14]"
    }
  ];

  return (
    <section
      className="py-16 sm:py-24 text-white relative "
      style={{
        backgroundImage: `url(${textureBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'soft-light'
      }}
    >
      <Container className="relative z-10 text-center">

        {/* Header Title */}
        <div className="mb-6">
          <h2 className="gasoek  text-[64px] text-white   inline-block mr-2">
            The Samba{' '}
            <span className="text-[#FFDE14] relative inline-block">
              Way
                <img src={flyingBall} alt="Flying Ball" className="absolute -bottom-4 left-0 w-full h-[1.5rem] text-[#FFDE14]" />
              
            </span>
          </h2>
        </div>

        {/* Subtitle Paragraph */}
        <p className="text-white font-bold text-xs sm:text-[20px] poppins leading-relaxed max-w-xl mx-auto mb-12">
          Every Samba class is built to keep children on the ball, learning at the right level and excited to come back.
        </p>

        {/* 6 White Cards Grid (3x2 Grid) */}
        {/* 6 White Cards Grid (3x2 Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-5 lg:gap-8 text-left max-w-[1240px] mx-auto">
          {features.map((item, idx) => (
            <div key={idx} className="relative group">

              {/* Single peeking color, alternating per card */}
              <div
                className={`absolute w-[95%] h-[99%] rounded-2xl ${idx % 2 === 0 ? 'bg-[#FFDE14] rotate-[-4deg] top-0 -left-2' : 'bg-[#00A6E3] rotate-[4deg]'
                  }`}
              />

              {/* Main White Card Content */}
              <div className="relative bg-white rounded-2xl p-6 sm:p-4 shadow-xl border border-slate-100 hover:-translate-y-1 transition-transform duration-300">
                <div className="">
                  <img src={item.icon} alt={item.title} className="w-[80px] h-[70px] object-contain" />
                </div>
                <h3 className="poppins font-black text-[20px] lg:text-[24px] text-[#0DD180]">
                  {item.title}
                </h3>
                <p className="text-slate-600 mt-0 poppins font-semibold text-xs sm:text-[16px] leading-relaxed">
                  {item.desc}
                </p>
              </div>

            </div>
          ))}
        </div>

      </Container>
    </section>
  );
}
