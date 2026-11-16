import React from 'react';
import { Container } from '../../../components/common/Container';
import blueBgTexture from 'https://webstepdev.com/demo/syncoWebsiteImages/bluetexturedbg.png';

export function Section8() {
  const scheduleItems = [
    {
      step: 1,
      stepColor: 'text-[#00A3E0]',
      title: 'Arrive & play',
      desc: 'Straight into football. Small-sided games and plenty of touches.',
    },
    {
      step: 2,
      stepColor: 'text-[#0DD180]',
      title: 'Meet player one',
      desc: 'Two new skills inspired by the first Brazilian legend of the day.',
    },
    {
      step: 3,
      stepColor: 'text-[#00A3E0]',
      title: 'Learn. Practise. Play.',
      desc: 'Master the skills, add pressure and put them into action.',
    },
    {
      step: 4,
      stepColor: 'text-[#0DD180]',
      title: 'Break & reset',
      desc: 'Rehydrate, socialize, gather with coaches for progress checkpoints.',
    },
    {
      step: 5,
      stepColor: 'text-[#00A3E0]',
      title: 'Meet player two',
      desc: 'Two more skills. A new Brazilian legend. Another stop towards Rio.',
    },
    {
      step: 6,
      stepColor: 'text-[#0DD180]',
      title: 'Challenges & games',
      desc: "Take the day's football into competitive situations.",
    },
    {
      step: 7,
      stepColor: 'text-[#00A3E0]',
      title: 'Stickers & celebration',
      desc: 'Add four new skill stickers to the Road to Rio Map and celebrate the Player of the Day.',
    },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-[#042C89] py-10 sm:py-20 lg:py-22">
      {/* Background Texture */}
      <img
        src={blueBgTexture}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
      />

      <Container className="relative z-10 w-full text-center">
        {/* Badge Pill */}
        <div className="inline-block border-[#0DD180] border  px-3 py-1 rounded-full mb-4">
          <span className="text-[#fff] text-[11px] sm:text-[14px] font-bold  uppercase poppins">
            A DAY AT SKILLS ACCELERATOR
          </span>
        </div>

        {/* Heading */}
        <h2 className="gasoek uppercase text-[40px] xl:text-[44px] 2xl:text-[48px] leading-[1.3] md:leading-[1.04]  text-white mb-4">
          FOUR HOURS. PLENTY OF FOOTBALL.
        </h2>

        {/* Subtitle */}
        <p className="poppins text-white font-medium text-[14px] xl:text-[18px] 2xl:text-[20px] mx-auto mb-10 sm:mb-14">
          Every day has a clear rhythm — keeping children moving, learning and involved <br className='hidden md:block'/> from the moment they arrive.
        </p>

        {/* Main Schedule Container */}
        <div className="max-w-[700px] mx-auto bg-[#F6F8FC] rounded-[24px] p-4 border-t-[5px] border-l-[5px] border-b-[14px] border-r-[14px]  border-[#00A3E0] shadow-2xl text-left">
          <div className="divide-y divide-slate-100">
            {scheduleItems.map((item) => (
              <div
                key={item.step}
                className=" bg-white rounded-[12px] mb-0.5 last:mb-0    md:p-6 pe-3 p-4 flex items-start gap-4 sm:gap-6 group"
              >
                {/* Step Number in Chunky Recline Font */}
                <span 
                  className={`gasoek text-[18px] sm:text-[20px] shrink-0 w-8 text-center select-none ${item.stepColor}`}
                >
                  {item.step}
                </span>

                {/* Content */}
                <div>
                  <h3 className="poppins font-bold text-[#042C89] text-[15px] sm:text-[18px] mb-1">
                    {item.title}
                  </h3>
                  <p className="poppins text-[#475569] text-xs sm:text-[14px] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Tagline */}
        <p className="recline text-white text-xl sm:text-[32px] mt-10 sm:mt-14 mb-5 tracking-wide drop-shadow-sm">
          Then home. Tomorrow, the road continues.
        </p>
      </Container>
    </section>
  );
}

export { Section8 as DailyScheduleSection };
export default Section8;
