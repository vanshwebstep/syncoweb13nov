import React from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { Container } from '../../../components/common/Container';
import { useModal } from '../../../context/ModalContext';

import cardImg1 from 'https://webstepdev.com/demo/syncoWebsiteImages/venues/clip1.png';
import cardImg2 from 'https://webstepdev.com/demo/syncoWebsiteImages/venues/clip2.png';
import cardImg3 from 'https://webstepdev.com/demo/syncoWebsiteImages/venues/clip3.png';
import cardImg4 from 'https://webstepdev.com/demo/syncoWebsiteImages/venues/clip4.png';

const BASE = 'https://webstepdev.com/demo/syncoWebsiteImages';
const SWOOSH = `${BASE}/roadtorio/Swoosh.png`;

// filled = kitne dots active (1-4)
const LEVELS = [
  {
    level: 1,
    title: 'BEGINNER',
    desc: 'First touches, core ball mastery and the confidence to take someone on.',
    img: cardImg1,
    accent: '#0DD180',
    titleColor: '#042C89',
    badgeText: '#042C89',
  },
  {
    level: 2,
    title: 'INTERMEDIATE',
    desc: 'Sharper footwork, new combinations and a bigger 1v1 toolkit.',
    img: cardImg2,
    accent: '#00A6E3',
    titleColor: '#042C89',
    badgeText: '#FFFFFF',
  },
  {
    level: 3,
    title: 'ADVANCED',
    desc: 'More demanding ball mastery, creative combinations and advanced 1v1 moves.',
    img: cardImg3,
    accent: '#FFDE14',
    titleColor: '#042C89',
    badgeText: '#042C89',
  },
  {
    level: 4,
    title: 'PRO',
    desc: 'Our toughest skills and 1v1 challenges, for technically accomplished players.',
    img: cardImg4,
    accent: '#042C89',
    titleColor: '#042C89',
    badgeText: '#FFFFFF',
  },
];

const BAR_COLORS = ['#0DD180', '#00A6E3', '#FFDE14', '#042C89'];

export function RightChallengeSection() {
  const { openModal } = useModal();

  const handleBook = () => {
    const el = document.getElementById('class-times');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else openModal('booking', { type: 'trial' });
  };

  /* "Not sure" card + button: desktop pe left column me, mobile pe cards ke neeche (2 jagah render hota hai) */
  const notSureAndCta = (
    <>
      <div className="bg-white border border-[#E8ECF5] rounded-[16px] px-4 py-3.5 flex items-center gap-3.5 shadow-[0_2px_10px_rgba(4,44,137,0.04)]">
        <span className="w-[36px] h-[36px] rounded-full bg-[#FFDE14] flex items-center justify-center shrink-0">
          <Star className="w-4 h-4 text-[#042C89] fill-[#042C89]" />
        </span>
        <div>
          <p className="poppins font-bold text-[#042C89] text-[13.5px] lg:text-[15px] leading-tight">Not sure which level?</p>
          <p className="poppins mt-0.5 text-[#34353B] text-[12px] lg:text-[13.5px]">Their coach finds it at the FREE trial.</p>
        </div>
      </div>

      <button
        type="button"
        onClick={handleBook}
        className="poppins mt-4 lg:mt-6 w-full lg:w-auto inline-flex items-center justify-center gap-2 bg-[#0DD180] hover:bg-[#0bb86f] text-[#042C89] font-bold text-[15px] px-7 lg:px-8 py-4 rounded-full shadow-md transition-all duration-300 hover:scale-[1.03] active:scale-95 cursor-pointer whitespace-nowrap"
      >
        Book a FREE trial <ArrowRight className="w-4 h-4" />
      </button>
    </>
  );

  return (
    <section className="relative w-full overflow-hidden bg-[#F6F8FC] py-12 sm:py-16 lg:py-20">
      {/* soft blobs */}
      <span aria-hidden="true" className="absolute -top-24 -right-24 w-[300px] h-[300px] rounded-full bg-[#FFF4C2] opacity-70 pointer-events-none" />
      <span aria-hidden="true" className="absolute -bottom-40 -left-32 w-[420px] h-[420px] rounded-full bg-[#E3F8EE] opacity-80 pointer-events-none" />

      <Container className="relative z-10">
        <div className="flex flex-col lg:flex-row gap-7 lg:gap-12 items-center lg:items-center max-w-[1250px] mx-auto">
          {/* ===== Left ===== */}
          <div className="w-full lg:flex-1 lg:max-w-[460px]">
            <p className="poppins font-bold text-[#00A6E3] text-[10.5px] lg:text-[13px] tracking-[0.04em] uppercase">Four levels</p>

            <h2 className="mt-3 leading-[1.1]">
              <span className="recline block font-bold text-[#042C89] text-[34px] sm:text-[36px] lg:text-[40px]">The right challenge</span>
              <span className="gasoek relative inline-block text-[#0DD180] text-[34px] sm:text-[42px] lg:text-[50px] mt-1">
                at every stage.
                <img src={SWOOSH} alt="" aria-hidden="true" className="absolute left-0 -bottom-2 w-full h-auto pointer-events-none select-none" />
              </span>
            </h2>

            <p className="poppins mt-6 lg:mt-8 font-bold text-[#042C89] text-[15px] lg:text-[20px] leading-snug">
              Too easy and children switch off.
              <br />
              Too difficult and they lose belief.
            </p>

            <p className="poppins mt-3 lg:mt-4 text-[#34353B] text-[14px] lg:text-[16px] leading-relaxed">
              Samba’s four levels build ball mastery and 1v1 skills step by step, so the challenge grows as your child’s game does.
            </p>

            {/* Level bar (desktop only) */}
            <div className="hidden lg:block mt-6">
              <div className="grid grid-cols-4 gap-2">
                {BAR_COLORS.map((c) => (
                  <span key={c} className="h-[6px] rounded-full" style={{ backgroundColor: c }} />
                ))}
              </div>
              <div className="mt-2 flex items-center justify-between poppins font-semibold text-[#34353B] text-[12.5px]">
                <span>Level 1</span>
                <span>Level 4</span>
              </div>
            </div>

            {/* Not sure + button (desktop only) */}
            <div className="hidden lg:block mt-6">{notSureAndCta}</div>
          </div>

          {/* ===== Right: cards ===== */}
          <div className="w-full lg:w-[730px] shrink-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
              {LEVELS.map((c) => (
                <div
                  key={c.title}
                  className="bg-white border border-[#E8ECF5] rounded-[24px] p-3.5 lg:p-4 shadow-[0_4px_16px_rgba(4,44,137,0.05)] flex flex-col hover:-translate-y-1.5 transition-all duration-300"
                >
                  {/* Photo (332 x 192) + colour strip */}
                  <div className="relative overflow-hidden rounded-[18px] w-full lg:w-[332px] mx-auto">
                    <img src={c.img} alt={c.title} className="w-full aspect-[2.05] sm:aspect-[332/192] lg:aspect-auto lg:h-[192px] object-cover" />
                    <span className="absolute left-0 right-0 bottom-0 h-[5px]" style={{ backgroundColor: c.accent }} />
                  </div>

                  {/* Badge + dots */}
                  <div className="mt-4 flex items-center justify-between px-1">
                    <span
                      className="poppins inline-flex items-center rounded-full px-3.5 py-1.5 font-bold text-[10px] lg:text-[11.5px] uppercase"
                      style={{ backgroundColor: c.accent, color: c.badgeText }}
                    >
                      Level {c.level}
                    </span>
                    <span className="flex items-center gap-1.5">
                      {[1, 2, 3, 4].map((n) => (
                        <span
                          key={n}
                          className="w-[16px] h-[7px] rounded-full"
                          style={{ backgroundColor: n <= c.level ? c.accent : '#E8ECF5' }}
                        />
                      ))}
                    </span>
                  </div>

                  {/* Text */}
                  <div className="mt-3 px-1 pb-2">
                    <h3 className="gasoek uppercase tracking-wide text-[24px] lg:text-[26px] leading-tight" style={{ color: c.titleColor }}>
                      {c.title}
                    </h3>
                    <p className="poppins mt-2 text-[#34353B] text-[13px] lg:text-[14.5px] leading-snug">{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Not sure + button (mobile only, cards ke neeche) */}
          <div className="lg:hidden w-full -mt-3">{notSureAndCta}</div>
        </div>
      </Container>
    </section>
  );
}

export default RightChallengeSection;