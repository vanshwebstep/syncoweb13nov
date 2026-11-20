import React from 'react';
import { Container } from '../../../components/common/Container';
import fourDayBanner from 'https://webstepdev.com/demo/syncoWebsiteImages/holiday-camps/four_day_banner.png';
import imgLearn from 'https://webstepdev.com/demo/syncoWebsiteImages/tech1.png';
import imgMaster from 'https://webstepdev.com/demo/syncoWebsiteImages/tech2.png';
import imgTest from 'https://webstepdev.com/demo/syncoWebsiteImages/tech3.png';
import imgPlay from 'https://webstepdev.com/demo/syncoWebsiteImages/tech4.png';
import texture from 'https://webstepdev.com/demo/syncoWebsiteImages/blog/hero.png';
const BASE = 'https://webstepdev.com/demo/syncoWebsiteImages';

const SWOOSH = `${BASE}/roadtorio/Swoosh.png`;

export function Section7() {
  const cards = [
    {
      title: "LEARN",
      desc: <>Two new skills each <br /> day, broken down step <br /> by step by their coach.</>,
      img: imgLearn,
      topSwooshColor: "#00A6E3",
      bottomSwooshColor: "#FFDE14"
    },
    {
      title: "MASTER",
      desc: <>Time to repeat it, adjust it <br /> and keep going until <br /> something starts to click.</>,
      img: imgMaster,
      topSwooshColor: "#FFDE14",
      bottomSwooshColor: "#0DD180"
    },
    {
      title: "TEST",
      desc: <>Now add pressure. Make <br /> decisions. Try the skill <br /> against another player.</>,
      img: imgTest,
      topSwooshColor: "#FFDE14",
      bottomSwooshColor: "#0DD180"
    },
    {
      title: "PLAY",
      desc: <>It’s game time. The coach<br /> steps back. Time to see <br />what they do with it.</>,
      img: imgPlay,
      topSwooshColor: "#0DD180",
      bottomSwooshColor: "#FFDE14"
    }
  ];

  return (
    <section
      className="relative w-full overflow-hidden py-10 md:py-16"

    >      {/* Pattern Background */}
      <img
        src={texture}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover  pointer-events-none select-none "
      />


      <Container className="relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Heading & Intro */}
          <div className="lg:col-span-5 text-left">
            <p className="font-['Poppins',sans-serif] font-bold text-[#00A6E3] text-[10px] sm:text-[11px] lg:text-[13px] tracking-[0.04em] uppercase">
              HOW THEY LEARN
            </p>
            <h2 className="mt-3 leading-[1.1]">
              <span className="block font-['Recline',sans-serif] font-bold text-[#042C89] text-[30px] sm:text-[36px] lg:text-[44px]">
                Learn it. Master it.
              </span>
              <span className="relative inline-block font-['Gasoek_One',sans-serif] text-[#0DD180] text-[36px] sm:text-[44px] lg:text-[54px] mt-1">
                Put it into play.
                <img src={SWOOSH} alt="" aria-hidden="true" className="absolute left-0 -bottom-0 w-full h-auto pointer-events-none select-none" />
              </span>
            </h2>


            <p className="poppins text-[#042C89] text-[17px] sm:text-[20px] mt-10 font-semibold">
              Four new skills each coaching day. Broken <br className='hidden lg:block' /> down step by step, repeated with plenty of touches, tested under pressure, then taken  <br className='hidden lg:block' /> into games.
            </p>
          </div>

          {/* Right Column: 2x2 Cards Grid */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 max-w-[691px] gap-6">
              {cards.map((card, idx) => (
                <div
                  key={idx}
                  className="bg-[#042C89] rounded-[20px] pb-6  overflow-hidden  text-white relative flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300 group"
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
                  <div className="px-6 pb-3 pt-3 relative z-10 flex-1 flex flex-col justify-start">
                    <h3 className="gasoek text-[24px] sm:text-[26px] text-white  mb-2 mt-3">
                      {card.title}
                    </h3>
                    <p className="text-[13px] sm:text-[14px] poppins font-medium text-white leading-[1.4] max-w-[210px]">
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

export { Section7 as LearnMasterPlaySection };
export default Section7;
