import React, { useState } from 'react';
import { Clock } from 'lucide-react';
import { Container } from '../../../components/common/Container';
import blueBgTexture from 'https://webstepdev.com/demo/syncoWebsiteImages/bluetexturedbg.png';

const BASE = 'https://webstepdev.com/demo/syncoWebsiteImages';
const HC = `${BASE}/holiday-camps`;
const SWOOSH = `${BASE}/roadtorio/Swoosh.png`;
const ICON = {
  ball: `${HC}/ball.png`,
  star: `${HC}/star.png`,
  flash: `${HC}/flash.png`,
  cup: `${HC}/cup.png`,
  trophy: `${HC}/trophy.png`,
  home: `${HC}/home.png`,
};

const TONES = {
  sky: { bg: '#E6F4FB', bar: '#00A6E3' },
  yellow: { bg: '#FFF7CC', bar: '#FFDE14' },
  green: { bg: '#E3F8EE', bar: '#0DD180' },
  grey: { bg: '#F0F2F8', bar: '#9AA3B5' },
  solid: { bg: '#FFDE14', bar: 'transparent' },
};

const t = (h, m = 0) => h * 60 + m;
const fmt = (min) => {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${h % 12 || 12}:${String(m).padStart(2, '0')}${h >= 12 ? 'pm' : 'am'}`;
};
const durLabel = (d) => (d === 60 ? '1 hr' : `${d} min`);

// ---- Day 1-3: ek hi template, legends alag ----
const legendDay = (a, b) => [
  { s: t(10), e: t(10, 30), title: 'Arrive & play', desc: 'Small-sided games, then meet the coaches and get into groups.', icon: 'ball', tone: 'sky' },
  { s: t(10, 30), e: t(10, 45), title: `Meet ${a.name}`, desc: `${a.city}. Two new skills inspired by our next legend.`, icon: 'star', tone: 'yellow', badge: 'New legend' },
  { s: t(10, 45), e: t(11, 45), title: 'Learn. Practise. Play.', desc: `Practise the skills, use them in games, then a ${a.name} challenge.`, icon: 'flash', tone: 'green' },
  { s: t(11, 45), e: t(12), title: 'Snack break', desc: 'Snack, rest and reset.', icon: 'cup', tone: 'grey', dashed: true },
  { s: t(12), e: t(12, 15), title: `Meet ${b.name}`, desc: `${b.city}. Two more skills. Another stop towards Rio.`, icon: 'star', tone: 'yellow', badge: 'New legend' },
  { s: t(12, 15), e: t(13, 15), title: 'Learn. Practise. Play.', desc: `Practise the skills, use them in games, then a ${b.name} challenge.`, icon: 'flash', tone: 'green' },
  { s: t(13, 15), e: t(13, 40), title: 'Final matches', desc: 'Free play, using every skill from the day.', icon: 'trophy', tone: 'green' },
  { s: t(13, 40), e: t(13, 55), title: 'Stickers & celebration', desc: 'Road to Rio stickers, Player of the Day and a recap.', icon: 'star', tone: 'sky' },
  { s: t(13, 55), e: t(14), title: 'Pick-up time. Tomorrow, the road continues.', icon: 'home', tone: 'solid', pickup: true },
];

// ---- Day 4: placeholder timetable (apne hisaab se edit kar lena) ----
const finaleDay = [
  { s: t(10), e: t(10, 30), title: 'Arrive & play', desc: 'Warm-ups, small-sided games and get into teams.', icon: 'ball', tone: 'sky' },
  { s: t(10, 30), e: t(11, 15), title: 'Skills Showcase', desc: 'Show off the skills learned across the week.', icon: 'star', tone: 'yellow' },
  { s: t(11, 15), e: t(11, 30), title: 'Snack break', desc: 'Snack, rest and reset.', icon: 'cup', tone: 'grey', dashed: true },
  { s: t(11, 30), e: t(12, 15), title: '1v1 Showdown', desc: 'Head-to-head challenges using every skill.', icon: 'flash', tone: 'green' },
  { s: t(12, 15), e: t(13, 30), title: 'Copa de Samba tournament', desc: 'Team matches in a celebration of skill, flair and fun.', icon: 'trophy', tone: 'green' },
  { s: t(13, 30), e: t(13, 55), title: 'Medals and awards', desc: 'Medals for every player and the final Player of the Day.', icon: 'star', tone: 'sky' },
  { s: t(13, 55), e: t(14), title: 'Pick-up time. See you next holidays.', icon: 'home', tone: 'solid', pickup: true },
];

const DAYS = [
  { tab: 'Day 1 · The journey begins', short: 'The journey begins', rows: legendDay({ name: 'Pelé', city: 'Manaus' }, { name: 'Ronaldo', city: 'Brasília' }) },
  { tab: 'Day 2 · Turn up the skill', short: 'Turn up the skill', rows: legendDay({ name: 'Kaká', city: 'Recife' }, { name: 'Neymar Jr.', city: 'São Paulo' }) },
  { tab: 'Day 3 · Bring the flair', short: 'Bring the flair', rows: legendDay({ name: 'Ronaldinho', city: 'Porto Alegre' }, { name: 'Vini Jr.', city: 'Rio de Janeiro' }) },
  { tab: 'Day 4 · Copa de Samba', short: 'Copa de Samba', rows: finaleDay },
];
const PPM = 2.2;   // pixels per minute (pehle 1.9)
const MIN_H = 58;  // chhote rows ki min height (pehle 40)
const GAP = 8;     // rows ke beech gap (pehle 4)

const HOURS = [t(10), t(11), t(12), t(13), t(14)];

function layout(rows) {
  let y = 0;
  const out = rows.map((r) => {
    const dur = r.e - r.s;
    const h = Math.max(Math.round(dur * PPM), MIN_H);
    const item = { ...r, dur, h, y };
    y += h + GAP;
    return item;
  });
  const total = y - GAP;
  const yAt = (time) => {
    const row = out.find((r) => time >= r.s && time <= r.e) || out[out.length - 1];
    return row.y + ((time - row.s) / (row.e - row.s)) * row.h;
  };
  return { rows: out, total, yAt };
}

export function Section8() {
  const [active, setActive] = useState(0);
  const day = DAYS[active];
  const { rows, total, yAt } = layout(day.rows);

  return (
    <section className="relative w-full overflow-hidden bg-[#042C89] pt-10 pb-12 sm:py-16 lg:py-20">
      <img src={blueBgTexture} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none" />

      <Container className="relative z-10 w-full px-5 sm:px-6">
        {/* ===== Heading ===== */}
        <div className="text-center">
          <p className="font-['Poppins',sans-serif] font-bold text-[#FFDE14] text-[10px] sm:text-[11px] lg:text-[13px] tracking-[0.04em] uppercase">
            A day at Skills Accelerator
          </p>
          <h2 className="mt-3 leading-[1.1]">
            <span className="block font-['Recline',sans-serif] font-bold text-white text-[30px] sm:text-[36px] lg:text-[44px]">
              Four hours.
            </span>
            <span className="relative inline-block font-['Gasoek_One',sans-serif] text-[#0DD180] text-[36px] sm:text-[44px] lg:text-[54px] mt-1">
              <span className="sm:hidden">
                Plenty of
                <br />
                football.
              </span>
              <span className="hidden sm:inline">Plenty of football.</span>
              <img src={SWOOSH} alt="" aria-hidden="true" className="absolute left-0 -bottom-1.5 sm:-bottom-2 w-full h-auto pointer-events-none select-none" />
            </span>
          </h2>
          <p className="mt-6 sm:mt-8 font-['Poppins',sans-serif] text-white text-[14px] lg:text-[17px] leading-[1.5] sm:leading-normal">
            Every camp day runs to the same timetable, so children always know what’s coming next.
          </p>

          {/* Tabs: mobile = 4 equal pills ("Day N"), sm+ = full labels */}
          <div className="mt-6 sm:mt-7 grid grid-cols-4 gap-2 sm:flex sm:flex-wrap sm:justify-center sm:gap-2.5">
            {DAYS.map((d, i) => (
              <button
                key={d.tab}
                type="button"
                onClick={() => setActive(i)}
                className={`rounded-full border px-2 sm:px-4 py-2.5 sm:py-2 font-['Poppins',sans-serif] font-bold text-[13px] lg:text-[13.5px] cursor-pointer transition-all whitespace-nowrap ${
                  i === active
                    ? 'bg-[#FFDE14] border-[#FFDE14] text-[#042C89]'
                    : 'bg-[#1A3FA0] border-transparent sm:bg-transparent sm:border-white/40 text-white hover:bg-white/10'
                }`}
              >
                <span className="sm:hidden">Day {i + 1}</span>
                <span className="hidden sm:inline">{d.tab}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ===== Timetable card ===== */}
        <div className="mt-6 sm:mt-8 mx-auto w-full max-w-[1200px] bg-white rounded-[24px] p-5 sm:p-8 shadow-2xl text-left">
          <div className="flex flex-wrap items-start justify-between gap-3 pb-5 sm:border-b border-[#E5EAF3]">
            <div>
              <p className="font-['Poppins',sans-serif] font-bold text-[#00A6E3] text-[10px] lg:text-[12px] tracking-[0.04em] uppercase">
                Today’s timetable
              </p>
              <h3 className="mt-2 font-['Recline',sans-serif] font-bold text-[#042C89] text-[20px] lg:text-[26px] leading-tight">
                Day {active + 1} · {day.short}
              </h3>
            </div>
            <span className="inline-flex items-center gap-1.5 bg-[#042C89] text-white font-['Poppins',sans-serif] font-bold text-[10.5px] lg:text-[12.55px] px-3.5 py-2 rounded-full">
              <Clock className="w-3.5 h-3.5" />
              Drop-off 9:50am · Pick-up 1:55pm
            </span>
          </div>

          {/* ===== Mobile timeline ===== */}
          <div className="sm:hidden mt-2">
            {rows.map((r, idx) => {
              const tone = TONES[r.tone];
              const last = idx === rows.length - 1;
              return (
                <div key={`m-${active}-${r.s}`} className="flex gap-2.5">
                  {/* Time column */}
                  <div className="w-[64px] shrink-0 pt-3.5 text-left">
                    <p className="font-['Poppins',sans-serif] font-bold text-[#042C89] text-[12.5px] leading-tight">
                      {fmt(r.s).replace(/(am|pm)/, (m) => m)}
                    </p>
                    {!r.pickup && (
                      <p className="mt-1 font-['Poppins',sans-serif] text-[#797A88] text-[11px] leading-tight">
                        {durLabel(r.dur)}
                      </p>
                    )}
                  </div>

                  {/* Rail + dot */}
                  <div className="relative w-[10px] shrink-0">
                    <span className={`absolute left-1/2 -translate-x-1/2 w-px bg-[#D5DBE8] top-0 ${last ? 'h-[22px]' : 'bottom-0'}`} />
                    <span
                      className="absolute left-1/2 -translate-x-1/2 top-[18px] w-[10px] h-[10px] rounded-full ring-2 ring-white"
                      style={{ backgroundColor: r.pickup ? '#FFDE14' : tone.bar }}
                    />
                  </div>

                  {/* Card */}
                  <div className="flex-1 min-w-0 pb-3.5">
                    <div
                      className={`relative overflow-hidden rounded-[10px] pl-5 pr-3.5 py-3.5 ${
                        r.dashed ? 'border border-dashed border-[#B7BFD6]' : ''
                      }`}
                      style={{ backgroundColor: tone.bg }}
                    >
                      <span className="absolute left-0 top-0 bottom-0 w-[4px]" style={{ backgroundColor: tone.bar }} />
                      <div className="flex items-center gap-2.5">
                        <span className="w-[24px] h-[24px] rounded-full bg-white flex items-center justify-center shrink-0">
                          <img src={ICON[r.icon]} alt="" className="w-[12px] h-[12px] object-contain" />
                        </span>
                        <p className="font-['Poppins',sans-serif] font-bold text-[#042C89] text-[14px] leading-tight">
                          {r.title}
                        </p>
                      </div>
                      {r.desc && (
                        <p className="mt-2 font-['Poppins',sans-serif] text-[#34353B] text-[12.5px] leading-[1.45]">
                          {r.desc}
                        </p>
                      )}
                      {r.badge && (
                        <span className="inline-block mt-2.5 bg-[#042C89] text-[#FFDE14] font-['Poppins',sans-serif] font-bold text-[10px] px-3 py-1.5 rounded-full whitespace-nowrap">
                          {r.badge}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ===== Tablet / Desktop ===== */}
          <div className="hidden sm:flex mt-6 gap-3 lg:gap-4">
            {/* Hour rail (desktop) */}
            <div className="relative hidden lg:block w-[44px] shrink-0" style={{ height: total }}>
              {HOURS.map((h) => (
                <span
                  key={h}
                  className="absolute left-0 font-['Poppins',sans-serif] font-bold text-[#042C89] text-[12px] -translate-y-1/2 whitespace-nowrap"
                  style={{ top: yAt(h) }}
                >
                  {h === t(10) ? '10am' : h === t(11) ? '11am' : h === t(12) ? '12pm' : h === t(13) ? '1pm' : '2pm'}
                </span>
              ))}
            </div>

            {/* Rows */}
            <div
              className="flex-1 min-w-0 lg:border-l lg:border-[#D5DBE8] lg:pl-4 flex flex-col"
              style={{ gap: GAP }}
            >
              {rows.map((r) => {
                const tone = TONES[r.tone];
                return (
                  <div
                    key={`${active}-${r.s}`}
                    className={`relative overflow-hidden rounded-[10px] flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 pl-6 pr-4 sm:pr-5 py-3.5 lg:py-0 lg:h-[var(--h)] ${
                      r.dashed ? 'border border-dashed border-[#B7BFD6]' : ''
                    }`}
                    style={{ backgroundColor: tone.bg, '--h': `${r.h}px` }}
                  >
                    <span className="absolute left-0 top-0 bottom-0 w-[4px]" style={{ backgroundColor: tone.bar }} />

                    {/* Left: icon + time + title */}
                    <div className={`flex items-center gap-3 ${r.pickup ? 'flex-1' : 'sm:w-[240px] lg:w-[290px] shrink-0'}`}>
                      <span className="w-[26px] h-[26px] rounded-full bg-white flex items-center justify-center shrink-0">
                        <img src={ICON[r.icon]} alt="" className="w-[13px] h-[13px] object-contain" />
                      </span>
                      <div>
                        <p className="font-['Poppins',sans-serif] font-bold text-[#797A88] text-[10.5px] lg:text-[12px] leading-tight">
                          {r.pickup ? fmt(r.s) : `${fmt(r.s)} – ${fmt(r.e)}`}
                        </p>
                        <p className="font-['Poppins',sans-serif] font-bold text-[#042C89] text-[14px] lg:text-[17px] leading-tight mt-0.5">
                          {r.title}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    {r.desc && (
                      <p className="flex-1 font-['Poppins',sans-serif] text-[#34353B] text-[12px] lg:text-[14px] leading-snug">
                        {r.desc}
                      </p>
                    )}

                    {/* Pills */}
                    {!r.pickup && (
                      <div className="flex items-center gap-2 sm:ml-auto shrink-0">
                        {r.badge && (
                          <span className="bg-[#042C89] text-[#FFDE14] font-['Poppins',sans-serif] font-bold text-[9.5px] lg:text-[10.5px] px-3 py-1.5 rounded-full whitespace-nowrap">
                            {r.badge}
                          </span>
                        )}
                        <span className="bg-white text-[#042C89] font-['Poppins',sans-serif] font-bold text-[10px] lg:text-[11.5px] px-3 py-1.5 rounded-full whitespace-nowrap">
                          {durLabel(r.dur)}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ===== Footnote ===== */}
        <p className="mt-8 text-center font-['Poppins',sans-serif] text-[#C9D3F0] text-[12px] lg:text-[14px]">
          Times shown are for a 10am–2pm camp. Your camp’s exact times are on the booking page.
        </p>
      </Container>
    </section>
  );
}

export { Section8 as DailyScheduleSection };
export default Section8;