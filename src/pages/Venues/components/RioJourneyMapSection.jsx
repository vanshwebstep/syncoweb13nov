import React from 'react';
import { Container } from '../../../components/common/Container';

const BASE = 'https://webstepdev.com/demo/syncoWebsiteImages';
const icon = (name) => `${BASE}/icons/${name}.png`;
const MAP_IMG = `${BASE}/roadtorio/BrazilianCarnivalMapIsland1.png`;
const SWOOSH = `${BASE}/roadtorio/Swoosh.png`;

const ROWS = [
  { icon: 'starwhite', bg: '#0DD180', title: 'Weekly', desc: 'A skill of the day and a sticker for their map' },
  { icon: 'bookwhite', bg: '#00A6E3', title: 'Every session', desc: 'Their own Skills Tracker to practise at home' },
  { icon: 'medalblue', bg: '#FFDE14', title: 'Every 6 weeks', desc: 'Showcase Week: games, 1v1s and lots of Samba' },
  { icon: 'trophywhite', bg: '#042C89', title: 'End of year', desc: 'The Copa de Samba: medals for every player' },
];

export function RioJourneyMapSection() {
  /* Rows: desktop pe left column me, mobile pe map ke neeche (same JSX 2 jagah render hota hai) */
  const rows = (
    <div className="space-y-3 max-w-[540px]">
      {ROWS.map((r) => (
        <div key={r.title} className="bg-white rounded-[16px] px-4 py-3 lg:py-3.5 flex items-center gap-3.5 lg:gap-4 shadow-[0_2px_10px_rgba(4,44,137,0.04)]">
          <span
            className="w-[36px] h-[36px] lg:w-[44px] lg:h-[44px] rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: r.bg }}
          >
            <img src={icon(r.icon)} alt="" className="w-[16px] h-[16px] lg:w-[20px] lg:h-[20px] object-contain" />
          </span>
          <div>
            <h3 className="poppins font-bold text-[#042C89] text-[13px] lg:text-[15px] leading-tight">{r.title}</h3>
            <p className="poppins mt-0.5 text-[#34353B] text-[11.5px] lg:text-[13.5px] leading-snug">{r.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section className="relative w-full overflow-hidden bg-[#E6F4FB] py-12 sm:py-16 lg:py-20">
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-[1200px] mx-auto">
          {/* ===== Left ===== */}
          <div>
            <p className="poppins font-bold text-[#00A6E3] text-[10.5px] lg:text-[13px] tracking-[0.04em] uppercase">
              The road to Rio
            </p>

            <h2 className="mt-3 leading-[1.1]">
              <span className="recline block font-bold text-[#042C89] text-[42px] sm:text-[48px] lg:text-[40px]">
                Their journey
              </span>
              <span className="gasoek relative inline-block text-[#00A6E3] text-[42px] sm:text-[50px] lg:text-[50px] mt-1">
                to Rio.
                <img src={SWOOSH} alt="" aria-hidden="true" className="absolute left-0 -bottom-0 w-full h-auto pointer-events-none select-none" />
              </span>
            </h2>

            <p className="poppins mt-6 lg:mt-8 max-w-[540px] text-[#042C89] text-[15px] lg:text-[16px] leading-relaxed">
              Here’s how the programme works: every child goes on a virtual journey through six Brazilian cities. Each
              new skill they learn moves them one step closer to Rio, collecting stars and badges on their own map along
              the way.
            </p>

            {/* Rows (desktop only) */}
            <div className="hidden lg:block mt-7">{rows}</div>
          </div>

          {/* ===== Right: Map ===== */}
          <div className="flex justify-center lg:justify-end">
            <img
              src={MAP_IMG}
              alt="Road to Rio Brazil map"
              className="w-full max-w-[440px] lg:max-w-[560px] h-auto object-contain select-none"
            />
          </div>

          {/* Rows (mobile only, map ke neeche) */}
          <div className="lg:hidden mt-2">{rows}</div>
        </div>
      </Container>
    </section>
  );
}

export default RioJourneyMapSection;