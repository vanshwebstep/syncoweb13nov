import React from 'react';
import { Check } from 'lucide-react';
import { Container } from '../../../components/common/Container';

const BASE = 'https://webstepdev.com/demo/syncoWebsiteImages';
const texture = `${BASE}/blog/hero.png`;
const SWOOSH = `${BASE}/roadtorio/Swoosh.png`;

const NAVY_THEME = {
  label: 'text-[#042C89]',
  title: 'text-[#042C89]',
  name: 'text-[#042C89]',
  sub: 'text-[#042C89]/80',
};

const WHITE_THEME = {
  label: 'text-white',
  title: 'text-white',
  name: 'text-white',
  sub: 'text-white/90',
};

const DAYS = [
  {
    id: 'one',
    day: 'DAY ONE',
    title: 'The journey begins',
    bg: 'bg-[#00A6E3]',
    theme: WHITE_THEME, // <- Day One white
    img: `${BASE}/holiday-camps/journey.png`,
    alt: 'Pelé and Ronaldo',
    stops: [
      { name: 'Manaus · Pelé', sub: 'Control the ball.' },
      { name: 'Brasília · Ronaldo', sub: 'Learn deception.' },
    ],
  },
  {
    id: 'two',
    day: 'DAY TWO',
    title: 'Turn up the skill',
    bg: 'bg-[#0DD180]',
    theme: NAVY_THEME,
    img: `${BASE}/holiday-camps/journey_1.png`,
    alt: 'Kaká and Neymar',
    stops: [
      { name: 'Recife · Kaká', sub: 'Change direction.' },
      { name: 'São Paulo · Neymar Jr.', sub: 'Get creative.' },
    ],
  },
  {
    id: 'three',
    day: 'DAY THREE',
    title: 'Bring the flair',
    bg: 'bg-[#FFDE14]',
    theme: NAVY_THEME,
    img: `${BASE}/holiday-camps/journey_2.png`,
    alt: 'Ronaldinho and Vinícius Jr',
    stops: [
      { name: 'Porto Alegre · Ronaldinho', sub: 'Bring the flair.' },
      { name: 'Rio · Vini Jr.', sub: 'Take on the defender.' },
    ],
  },
];

const FINALE = ['Skills Showcase', '1v1 Showdown', 'Copa de Samba tournament', 'Medals and awards'];

export function Section6() {
  return (
    <section className="relative w-full overflow-hidden bg-white py-12 sm:py-16 lg:py-20">
 <img
  src={texture}
  alt=""
  aria-hidden="true"
  className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
/>

<img
  src="https://webstepdev.com/demo/syncoWebsiteImages/holiday-camps/greenvector.png"
  alt=""
  aria-hidden="true"
  className="absolute top-0 left-0 h-full max-h-[620px] w-auto max-w-[45%] object-contain object-left-top pointer-events-none select-none z-0"
/>
      <Container className="relative z-10 w-full text-center">
        {/* ===== Heading ===== */}
        <p className="font-['Poppins',sans-serif] font-bold text-[#00A6E3] text-[10px] sm:text-[11px] lg:text-[13px] tracking-[0.04em] uppercase">
          Three days. Six players. Twelve skills.
        </p>

        <h2 className="mt-3 leading-[1.1]">
          <span className="block font-['Recline',sans-serif] font-bold text-[#042C89] text-[30px] sm:text-[36px] lg:text-[44px]">
            Their four-day
          </span>
          <span className="relative inline-block font-['Gasoek_One',sans-serif] text-[#0DD180] text-[36px] sm:text-[44px] lg:text-[54px] mt-1">
            adventure.
            <img src={SWOOSH} alt="" aria-hidden="true" className="absolute left-0 -bottom-2 w-full h-auto pointer-events-none select-none" />
          </span>
        </h2>

        <p className="mt-8 max-w-[720px] mx-auto font-['Poppins',sans-serif] font-semibold text-[#042C89] text-[14px] sm:text-[16px] lg:text-[18px] leading-relaxed">
          Each day: two cities, two Brazilian legends, four new skills. Then they bring it all together at the Copa de Samba.
        </p>

        {/* ===== Cards ===== */}
        <div className="mt-10 lg:mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5 justify-items-center max-w-[1200px] mx-auto text-left">
        {DAYS.map((d) => (
  <div
    key={d.id}
    className={`${d.bg} relative w-full lg:w-[590px] min-h-[240px] lg:h-[270px] rounded-[24px] overflow-hidden p-6 lg:p-7`}
  >
    <div className="relative z-10 max-w-[62%] sm:max-w-[58%]">
      <span className={`block font-['Gasoek_One',sans-serif] uppercase ${d.theme.label} text-[16px] lg:text-[20px] leading-none`}>
        {d.day}
      </span>
      <h3 className={`mt-4 font-['Recline',sans-serif] font-bold ${d.theme.title} text-[22px] lg:text-[28px] leading-tight`}>
        {d.title}
      </h3>

      <div className="mt-4 space-y-2.5">
        {d.stops.map((s) => (
          <div key={s.name} className="bg-white/[0.22] rounded-[10px] px-3.5 py-2.5">
            <p className={`font-['Poppins',sans-serif] font-bold ${d.theme.name} text-[12px] lg:text-[14px] leading-tight`}>
              {s.name}
            </p>
            <p className={`font-['Poppins',sans-serif] ${d.theme.sub} text-[11px] lg:text-[12.5px] mt-0.5`}>
              {s.sub}
            </p>
          </div>
        ))}
      </div>
    </div>

    <img
      src={d.img}
      alt={d.alt}
      className="absolute right-3 bottom-2 w-[120px] sm:w-[165px] lg:w-[190px] h-auto object-contain pointer-events-none select-none"
    />
  </div>
))}

          {/* Day Four */}
          <div className="bg-[#042C89] relative w-full lg:w-[590px] min-h-[240px] lg:h-[270px] rounded-[24px] overflow-hidden p-6 lg:p-7">
            <div className="relative z-10 max-w-[62%] sm:max-w-[60%]">
              <span className="block font-['Gasoek_One',sans-serif] uppercase text-white text-[16px] lg:text-[20px] leading-none">
                DAY FOUR
              </span>
              <h3 className="mt-4 font-['Recline',sans-serif] font-bold text-white text-[22px] lg:text-[28px] leading-tight">
                Copa de Samba
              </h3>
              <p className="mt-2 font-['Poppins',sans-serif] text-white/90 text-[11px] lg:text-[12.5px]">
                Three days of learning. Now it’s time to play.
              </p>

              <ul className="mt-4 space-y-2">
                {FINALE.map((f) => (
                  <li key={f} className="flex items-center gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-[#FFDE14] flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5 text-[#042C89] stroke-[3.5]" />
                    </span>
                    <span className="font-['Poppins',sans-serif] font-bold text-white text-[11.5px] lg:text-[13px]">
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <img
              src={`${BASE}/holiday-camps/journey_4.png`}
              alt="Copa de Samba trophy"
              className="absolute right-6 top-1/2 -translate-y-1/2 w-[90px] sm:w-[120px] lg:w-[140px] h-auto object-contain pointer-events-none select-none"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

export { Section6 as FourDayAdventureSection };
export default Section6;