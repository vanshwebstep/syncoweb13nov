import React from 'react';
import { Container } from '../../../components/common/Container';
import texture1 from 'https://webstepdev.com/demo/syncoWebsiteImages/coaching.png';
import coachingImg1 from 'https://webstepdev.com/demo/syncoWebsiteImages/home/adventure-sticker-album-cards.png';
import gesture from 'https://webstepdev.com/demo/syncoWebsiteImages/home/Illustrations_3.png';
import vector from 'https://webstepdev.com/demo/syncoWebsiteImages/Vector-3.png';
import { Star } from 'lucide-react';

export function CoachingSection() {
  const bulletPoints = [
    { text: "A high five on arrival.", starColor: "#0DD180" },
    { text: "Getting down to their level.", starColor: "#FFDE14" },
    { text: "Noticing who's hanging back or ready for more.", starColor: "#00A6E3" },
    { text: "Celebrating the brave attempt.", starColor: "#0DD180" },
    { text: "Correcting without embarrassing.", starColor: "#FFDE14" },
    { text: "And the all important...", starColor: "#00A6E3" }
  ];

  return (
    <section 
      className="py-14 text-white md:bg-transparent  relative overflow-hidden font-sans"
      style={{
        backgroundImage: `url(${texture1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'soft-light'
      }}
    >
      <Container className="relative z-10 px-4 sm:px-6 lg:px-8 xl:px-8 2xl:px-0">
        
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-6 lg:gap-8 xl:gap-12 relative items-center md:mb-14 lg:mb-12 xl:mb-16 mb-8">
          
          {/* Left Column: 2 Stacked Blob Photos */}
          <div className="md:col-span-6 lg:col-span-6 flex justify-center">
            <div className="coaching-photo-blob relative xl:absolute xl:-left-4 2xl:-left-10 xl:top-0 w-full max-w-[360px] md:max-w-[380px] lg:max-w-[440px] xl:max-w-[570px] 2xl:max-w-[625px] space-y-6">
              
              {/* Top Blob Photo */}
              <div className="rounded-[40px]">
                <img
                  src={coachingImg1}
                  alt="Coach with kids"
                  className="w-full h-full object-cover"
                />
              </div>

            </div>
          </div>

          {/* Right Column: Title, Subtitles, Star Bullets & Quote */}
          <div className="coaching-text-content md:col-span-6 lg:col-span-6 xl:ms-auto 2xl:max-w-none space-y-4 lg:space-y-5">
            
            {/* Header Title */}
            <div>
              <h2 className="recline font-extrabold text-[38px] md:text-[36px] lg:text-[46px] xl:text-[64px] 2xl:text-[74px] text-white leading-[1]">
                Coaching done
                  <span className="gasoek text-[38px] md:text-[36px] lg:text-[46px] xl:text-[64px] 2xl:text-[74px] text-[#0DD180] tracking-[1px] font-normal relative inline-block">
                differently
                <img className="absolute -bottom-7 left-0 w-[90%] h-5 text-[#FFDE14]" src={vector} alt="" />
                </span>
              </h2>
              
            </div>

            {/* Subtitles */}
            <div className="space-y-3 lg:space-y-4 xl:space-y-6 pt-1 md:pt-2 xl:pt-3 poppins">
              <h4 className="text-white font-bold text-[15px] md:text-[15px] lg:text-[18px] xl:text-[21px] 2xl:text-[23px]">
                Great coaching takes more than knowing football.
              </h4>
              <p className="text-white font-normal text-[13px] md:text-[13px] lg:text-[15px] xl:text-[18px] 2xl:text-[20px] leading-[20px] lg:leading-[23px] xl:leading-[25px]">
                Our coaches are qualified, hand-picked and trained in the Samba Method.
              </p>
              <p className="text-white font-normal text-[13px] md:text-[13px] lg:text-[15px] xl:text-[18px] 2xl:text-[20px] leading-[20px] lg:leading-[23px] xl:leading-[25px]">
                They also understand how children tick too.
              </p>
            </div>

            {/* Star Bullet Points */}
            <ul className="space-y-1.5 md:space-y-2 pt-1 md:pt-2 poppins">
              {bulletPoints.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 text-[13px] md:text-[13px] lg:text-[15px] xl:text-[18px] 2xl:text-[20px] font-semibold text-white">
                  <span className={`text-base ${item.starColor}`}><Star fill={item.starColor} className="w-4 h-4 lg:w-5 lg:h-5" style={{ color: item.starColor }}/></span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>

            {/* Quote Highlight */}
            <div className="pt-1 md:pt-2">
              <span className="gasoek tracking-[1px] text-[16px] md:text-[16px] lg:text-[19px] xl:text-[24px] text-[#0DD180] block leading-tight">
                “You’ve got this”
              </span>
              <span className="font-extrabold recline text-[18px] md:text-[18px] lg:text-[22px] xl:text-[28px] text-white block">
                when it’s really needed.
              </span>
            </div>

          </div>

        </div>

        {/* Bottom White Pill Banner: Dedicated Venue Manager */}
        <div className="bg-white md:rounded-[38px] rounded-[20px] px-3 sm:px-8 py-3.5 sm:py-4 shadow-2xl max-w-[830px] mx-auto md:flex items-center justify-center gap-3 text-center border border-slate-100">
          <div className="md:w-[150px] w-[50px] m-auto text-center">
            <img src={gesture} alt="" className="w-full h-full" />
          </div>
          <p className="recline font-bold text-center text-[13px] sm:text-[16px] lg:text-[15px] xl:text-[20px] recline md:text-left text-[#06337a]">
            Every session has a dedicated Samba Venue Manager, making sure our coaching standards stay high week after week.
          </p>
        </div>

      </Container>
    </section>
  );
}
