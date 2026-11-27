import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { Container } from '../../../components/common/Container';

const BASE = 'https://webstepdev.com/demo/syncoWebsiteImages/roadtorio';
const img = (name, ext = 'png') => `${BASE}/${encodeURIComponent(name)}.${ext}`;

/* Legend cards: coachesimg/{Level}/legendCard/{file} */
const LEGEND_BASE = `${BASE}/coachesimg`;
const LEVEL_FOLDER = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
  pro: 'Pro',
};
const legendImg = (level, file) =>
  `${LEGEND_BASE}/${LEVEL_FOLDER[level]}/legendCard/${encodeURIComponent(file)}`;

/* ================= DATA ================= */
const HERO_PILLS = ['38 weeks', '6 cities', '4 levels', '1 finale'];

const INFO_CARDS = [
  { icon: 'Group 1000002723', title: 'Ages 4–12', sub: 'Grouped by age and level' },
  { icon: 'Group 1000002724', title: '1 hour a week', sub: '38 sessions a year' },
  { icon: 'Group 1000002725', title: '6 Brazilian cities', sub: 'A new legend every stop' },
  { icon: 'Group 1000002726', title: 'Skills Tracker', sub: 'Progress they can see' },
];

const LEVELS = [
  { id: 'beginner', label: 'Beginner' },
  { id: 'intermediate', label: 'Intermediate' },
  { id: 'advanced', label: 'Advanced' },
  { id: 'pro', label: 'Pro' },
];

const CITIES = ['Manaus', 'Brasília', 'Recife', 'São Paulo', 'Porto Alegre', 'Rio de Janeiro'];

const PLAYERS = {
  beginner: [
    { name: 'Gabriel Jesus', file: 'gabriel_jesus_illustration.svg' },
    { name: 'Roberto Carlos', file: 'roberto_carlos_illustration.svg' },
    { name: 'Marcelo', file: 'marcelo_illustration.svg' },
    { name: 'Willian', file: 'willian_illustration.svg' },
    { name: 'Romário', file: 'romário_illustration.svg' },
    { name: 'Rivaldo', file: 'rivaldo_illustration.svg' },
  ],
  intermediate: [
    { name: 'Philippe Coutinho', file: 'philippe_coutinho_illustration.svg' },
    { name: 'Mané Garrincha', file: 'mané_garrincha_illustration.svg' },
    { name: 'Raphinha', file: 'raphinha_illustration.svg' },
    { name: 'Denilson', file: 'denílson_illustration.svg' },
    { name: 'Juninho', file: 'juninho_illustration.svg' },
    { name: 'Ronaldo', file: 'ronaldo_illustration.svg' },
  ],
  advanced: [
    { name: 'Ronaldinho', file: 'ronaldinho_illustration.svg' },
    { name: 'Rivelino', file: 'rivelino_illustration.svg' },
    { name: 'Firmino', file: 'firmino_illustration.svg' },
    { name: 'Zico', file: 'zico_illustration.svg' },
    { name: 'Cafu', file: 'cafu_illustration.svg' },
    { name: 'Neymar Jr.', file: 'neymar_Jr_illustration.svg' },
  ],
  pro: [
    { name: 'Kaká', file: 'kaká_illustration.svg' },
    { name: 'Jairzinho', file: 'jairzinho_illustration.svg' },
    { name: 'Vini Jr.', file: 'vini_jr_illustration.svg' },
    { name: 'Rodrygo', file: 'rodrygo_illustration.svg' },
    { name: 'Douglas Costa', file: 'douglas_costa_illustration.svg' },
    { name: 'Pelé', file: 'pelé_illustration.svg' },
  ],
};

/* ================= SMALL PARTS ================= */
function GreenBtn({ to = '/book-trial', children }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center justify-center gap-2 bg-[#0DD180] hover:bg-[#0bb86f] text-[#042C89] font-['Poppins',sans-serif] font-bold text-[14px] lg:text-[16px] px-6 lg:px-8 py-3 lg:py-3.5 rounded-full shadow-md transition-all duration-300 hover:scale-[1.03] active:scale-95 whitespace-nowrap"
    >
      {children} <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5" />
    </Link>
  );
}

/* ================= 1. HERO ================= */
export function RioHero() {
  return (
    <>
      <section className="relative bg-[#0A9BE5] overflow-hidden">
        {/* Desktop bg (Ultra High-Resolution 4K/Retina with WebP & PNG fallback) */}
        <picture className="hidden md:block absolute right-0 top-0 h-full w-[100%] pointer-events-none">
          <source
            type="image/webp"
            srcSet="/images/roadtorio/Hero.webp 1x, /images/roadtorio/Hero-ultra.webp 2x"
          />
          <source
            type="image/png"
            srcSet="/images/roadtorio/Hero.png"
          />
          <img
            src="/images/roadtorio/Hero.webp"
            alt="Samba kids at the stadium"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="h-full w-[100%] object-cover object-right pointer-events-none"
            onError={(e) => {
              e.currentTarget.src = img('Hero');
            }}
          />
        </picture>
        {/* Mobile bg (bottom anchored: kids neeche) */}
        <img
          src={img('heromobile')}
          alt=""
          aria-hidden="true"
          className="block md:hidden absolute bottom-0 left-0 w-full h-auto object-cover pointer-events-none"
        />

        <Container className="relative z-10 pt-8 pb-[480px] md:pt-20 md:pb-36 lg:pt-24 lg:pb-44">
          <div className="max-w-[600px] flex flex-col">
            {/* Rating badge: mobile white, desktop blue */}
            <a  href="https://www.google.com/maps/place/?q=place_id:ChIJafINar4PdkgRiqEM52XuP-I" className="order-1 self-start inline-flex items-center gap-1.5 bg-white text-[#042C89] md:bg-[#042C89] md:text-white font-['Poppins',sans-serif] text-[12px] md:text-[13px] font-semibold px-3.5 py-1.5 rounded-full shadow-sm md:shadow-none">
              <span className="flex text-[#FFDE14]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-current" />
                ))}
              </span>
              4.8 on Google
            </a>

            <h1 className="order-2 mt-5 leading-[1.1]">
              <span className="block font-['Recline',sans-serif] font-bold text-white text-[36px] sm:text-[44px] lg:text-[52px]">
                Your child's
              </span>
              <span className="relative inline-block font-['Gasoek_One',sans-serif] text-[#042C89] text-[46px] sm:text-[58px] lg:text-[76px] mt-1">
                Road to Rio.
                <img src={img('Swoosh')} alt="" className="absolute left-0 -bottom-2 w-full h-auto pointer-events-none" />
              </span>
            </h1>

            <p className="order-3 mt-5 md:mt-6 font-['Poppins',sans-serif] text-white text-[14px] lg:text-[17px] leading-relaxed">
              This isn't just another weekly football class. <br className="hidden sm:block" />
              It's a year-long immersive adventure through Brazilian football.
            </p>

            {/* Pills: mobile pehle, desktop me buttons ke baad */}
            <div className="order-4 md:order-5 mt-5 md:mt-6 flex flex-wrap gap-2">
              {HERO_PILLS.map((p) => (
                <span
                  key={p}
                  className="bg-[#042C89] text-[#FFDE14] font-['Poppins',sans-serif] font-bold text-[12px] lg:text-[13.5px] px-3.5 py-1.5 rounded-full"
                >
                  {p}
                </span>
              ))}
            </div>

            {/* Buttons: mobile full width stacked */}
            <div className="order-5 md:order-4 mt-5 md:mt-6 flex flex-col md:flex-row md:flex-wrap gap-3">
              <Link
                to="/book-trial"
                className="inline-flex w-full md:w-auto items-center justify-center gap-2 bg-[#FFDE14] md:bg-[#0DD180] md:hover:bg-[#0bb86f] text-[#042C89] font-['Poppins',sans-serif] font-bold text-[15px] lg:text-[16px] px-6 lg:px-8 py-4 md:py-3 lg:py-3.5 rounded-full shadow-md transition-all duration-300 hover:scale-[1.03] active:scale-95 whitespace-nowrap"
              >
                <span className="md:hidden">Book a free trial</span>
                <span className="hidden md:inline">Book a FREE trial</span>
                <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5" />
              </Link>
              <Link
                to="/find-a-class"
                className="inline-flex w-full md:w-auto items-center justify-center border-[1.5px] border-white text-[#042C89] md:text-white bg-white/10 md:bg-transparent hover:bg-white hover:text-[#042C89] font-['Poppins',sans-serif] font-bold text-[15px] lg:text-[16px] px-6 lg:px-8 py-4 md:py-3 lg:py-3.5 rounded-full transition-all duration-300 whitespace-nowrap"
              >
                Our Venues
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Info cards */}
      <div className="relative z-20 -mt-10 md:-mt-14 bg-transparent">
        <Container>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4 lg:gap-4">
            {INFO_CARDS.map(({ icon, title, sub }) => (
              <div
                key={title}
                className="flex items-center gap-4 rounded-[20px] border-[2px] border-[#042C891f] bg-white px-5 py-4 shadow-[0_8px_24px_rgba(4,44,137,0.12)] lg:px-5 lg:py-4"
              >
                <img
                  src={img(icon)}
                  alt=""
                  className="h-[44px] w-[44px] shrink-0 object-contain lg:h-[52px] lg:w-[52px]"
                />
                <div>
                  <p className="font-['Poppins',sans-serif] text-[16px] font-bold leading-tight text-[#042C89] lg:text-[17px]">
                    {title}
                  </p>
                  <p className="mt-0.5 font-['Poppins',sans-serif] text-[12px] text-[#6B7280] lg:text-[13.5px]">
                    {sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </>
  );
}

/* ================= 2. WEEKLY CLASSES ================= */
export function RioWeekly() {
  return (
    <section className="bg-white py-10 lg:py-24 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-14 items-center">
          {/* Text */}
          <div>
            <div className="text-center md:text-left">
              <h2 className="font-['Recline',sans-serif] font-bold text-[#042C89] text-[30px] sm:text-[38px] lg:text-[46px] leading-[1.05]">
                Weekly classes,
              </h2>
              <h3 className="relative inline-block font-['Gasoek_One',sans-serif] text-[#0DD180] text-[34px] sm:text-[44px] lg:text-[54px] leading-[1.1] mt-1">
                done differently.
                <img src={img('Swoosh')} alt="" className="absolute left-0 -bottom-2 w-full h-auto pointer-events-none" />
              </h3>
            </div>

            <p className="mt-6 font-['Poppins',sans-serif] text-[#042C89] text-[14px] lg:text-[18px] leading-relaxed max-w-[560px] text-left">
              Across the year, Road to Rio takes your child on an imaginative journey through six Brazilian cities,
              with each new destination introducing another football legend and a new set of skills to master.
            </p>

            <p className="mt-4 lg:mt-5 font-['Poppins',sans-serif] font-bold text-[#042C89] text-[14px] lg:text-[18px] text-left">
              New city. New player. New challenge.
            </p>

            {/* Desktop button */}
            <div className="mt-6 hidden md:block">
              <GreenBtn>Book a FREE trial</GreenBtn>
            </div>
          </div>

          {/* Map */}
          <div className="relative flex justify-center md:justify-end">
            <img
              src={img('BrazilianCarnivalMapIsland1')}
              alt="Road to Rio Brazil map"
              className="w-full max-w-[520px] lg:max-w-[600px] h-auto object-contain"
            />
          </div>

          {/* Mobile button: map ke neeche, full width */}
          <div className="md:hidden">
            <Link
              to="/book-trial"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#042C89] px-6 py-4 font-['Poppins',sans-serif] text-[15px] font-bold text-white shadow-md transition-all active:scale-95"
            >
              Book a FREE Trial <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ================= 3. MEET THE LEGENDS ================= */
export function RioLegends() {
  const [level, setLevel] = useState('beginner');
  const [active, setActive] = useState(0);
  const scrollRef = useRef(null);

  const players = PLAYERS[level];
  const current = players[active];
  const levelLabel = LEVELS.find((l) => l.id === level)?.label;

  const GAP = 12; // gap-3 (mobile)

  const changeLevel = (id) => {
    setLevel(id);
    setActive(0);
    if (scrollRef.current) scrollRef.current.scrollTo({ left: 0 });
  };

  // Mobile: swipe karne pe active card detect karo
  const onScroll = () => {
    const el = scrollRef.current;
    if (!el || window.innerWidth >= 1024) return;
    const card = el.children[0];
    if (!card) return;
    const step = card.offsetWidth + GAP;
    const idx = Math.round(el.scrollLeft / step);
    if (idx !== active && idx >= 0 && idx < players.length) setActive(idx);
  };

  const goTo = (i) => {
    setActive(i);
    const el = scrollRef.current;
    if (el && window.innerWidth < 1024) {
      const card = el.children[0];
      el.scrollTo({ left: i * (card.offsetWidth + GAP), behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-[#042C89] py-10 lg:py-20 text-white overflow-hidden">
      <Container>
        {/* Heading */}
        <div className="text-center">
          <p className="font-['Poppins',sans-serif] font-bold text-[#FFDE14] text-[11.5px] lg:text-[12px] tracking-[0.08em] uppercase">
            Meet the legends
          </p>
          <h2 className="mt-3 font-['Recline',sans-serif] font-bold text-[28px] sm:text-[34px] lg:text-[40px] leading-[1.1]">
            New city. New player.
          </h2>
          <span className="relative inline-block font-['Gasoek_One',sans-serif] text-[#FFDE14] text-[38px] sm:text-[42px] lg:text-[50px] leading-[1.15] mt-1">
            New challenge.
            <img src={img('whiteline')} alt="" className="absolute left-0 -bottom-1 w-full h-auto pointer-events-none" />
          </span>
          <p className="mt-4 font-['Poppins',sans-serif] font-regular text-white text-[14.5px] lg:text-[17px] max-w-[270px] mx-auto lg:max-w-none">
            Pick a level to see the skills your child will master at each stop.
          </p>

          {/* Tabs */}
          <div className="mt-5 flex justify-center">
            <div className="inline-flex gap-1 bg-[#FFFFFF1A] rounded-full p-1.5 max-w-full">
              {LEVELS.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => changeLevel(l.id)}
                  className={`font-['Poppins',sans-serif] font-bold text-[12.5px] sm:text-[12px] lg:text-[14px] px-3 sm:px-4 lg:px-6 py-2 lg:py-2.5 rounded-full whitespace-nowrap transition-all duration-300 cursor-pointer ${
                    level === l.id ? 'bg-[#FFDE14] text-[#042C89]' : 'bg-transparent text-white hover:bg-[#FFFFFF1A]'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Player cards: mobile = center-snap carousel (side cards peek), desktop = 6 col grid */}
        <div
          ref={scrollRef}
          onScroll={onScroll}
          className="mt-8 flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-[11%] lg:mx-0 lg:px-0 lg:gap-4 lg:grid lg:grid-cols-6 lg:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {players.map((p, i) => {
            const isActive = i === active;
            return (
              <button
                key={`${level}-${p.name}`}
                type="button"
                onClick={() => goTo(i)}
                className={`relative snap-center shrink-0 w-[78%] sm:w-[60%] lg:w-auto rounded-[24px] lg:rounded-[18px] pt-5 pb-6 lg:pt-4 lg:pb-4 px-2 flex flex-col items-center cursor-pointer transition-all duration-300 lg:hover:-translate-y-1 ${
                  isActive ? 'bg-[#FFDE14]' : 'bg-white'
                }`}
              >
                <span className="absolute top-4 left-4 w-7 h-7 rounded-full bg-[#042C89] text-white text-[12px] font-bold font-['Poppins',sans-serif] flex items-center justify-center z-10">
                  {i + 1}
                </span>

                {/* Circle behind player: yellow card -> #FFE97A, white card -> #EEF3FB */}
                <div className="relative flex items-center justify-center mt-2">
                  <span
                    className={`absolute h-[190px] w-[190px] lg:h-[120px] lg:w-[120px] rounded-full transition-colors duration-300 ${
                      isActive ? 'bg-[#FFE97A]' : 'bg-[#EEF3FB]'
                    }`}
                  />
                  <img
                    src={legendImg(level, p.file)}
                    alt={p.name}
                    onError={(e) => (e.currentTarget.style.visibility = 'hidden')}
                    className="relative h-[230px] lg:h-[190px] w-auto object-contain"
                  />
                </div>

                <p className="mt-3 font-['Poppins',sans-serif] font-bold text-[#042C89] text-[20px] lg:text-[16px]">
                  {p.name}
                </p>
                <p className="font-['Poppins',sans-serif] font-semibold text-[#042C89]/70 lg:text-[#00A6E3] text-[14px] lg:text-[13px]">
                  {CITIES[i]}
                </p>
              </button>
            );
          })}
        </div>

        {/* Progress dots + hint (mobile only) */}
        <div className="lg:hidden mt-4 flex flex-col items-center gap-3">
          <div className="flex items-center">
            {players.map((_, i) => (
              <React.Fragment key={i}>
                {i > 0 && (
                  <span className={`h-[2px] w-3 ${i <= active ? 'bg-[#FFDE14]' : 'bg-white/30'}`} />
                )}
                <button
                  type="button"
                  aria-label={`Go to stop ${i + 1}`}
                  onClick={() => goTo(i)}
                  className={`rounded-full transition-all flex items-center justify-center ${
                    i === active
                      ? 'h-6 w-6 bg-[#FFDE14] text-[#042C89] text-[11px] font-bold font-["Poppins",sans-serif]'
                      : i < active
                      ? 'h-4 w-4 bg-[#FFDE14]'
                      : 'h-4 w-4 bg-white/40'
                  }`}
                >
                  {i === active ? i + 1 : ''}
                </button>
              </React.Fragment>
            ))}
          </div>
          <p className="font-['Poppins',sans-serif] text-[12.5px] font-medium text-white/80">
            Step {active + 1} of {players.length} · Swipe to meet all {players.length} →
          </p>
        </div>

        {/* Skills panel */}
        <div className="mt-6 bg-white/10 rounded-[24px] px-4 py-6 lg:px-10 lg:py-8 text-center">
          <p className="font-['Poppins',sans-serif] font-bold text-[#FFDE14] text-[10px] lg:text-[12.5px] tracking-[0.06em] uppercase">
            Stop {active + 1} · {CITIES[active]} · {levelLabel}
          </p>
          <h3 className="mt-2 font-['Poppins',sans-serif] font-bold text-[20px] lg:text-[26px]">
            Play like {current.name}
          </h3>

          {/* Mobile: circles | Desktop: pills */}
          <div className="mt-5 flex flex-wrap justify-center gap-3 lg:gap-3">
            {[1, 2, 3, 4, 5].map((n) => (
              <span
                key={n}
                className="flex flex-col items-center gap-1.5 lg:flex-row lg:gap-2 lg:bg-white/10 lg:rounded-full lg:pl-1.5 lg:pr-5 lg:py-1.5 font-['Poppins',sans-serif] font-semibold text-[11.5px] lg:text-[14px]"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FFDE14] lg:h-7 lg:w-7 lg:bg-transparent">
                  <img src={img('starimg')} alt="" className="h-10 w-10 lg:h-7 lg:w-7 object-contain" />
                </span>
                Skill {n}
              </span>
            ))}
          </div>

          <p className="mt-5 font-['Poppins',sans-serif] text-white/80 text-[13px] lg:text-[14px] max-w-[280px] mx-auto lg:max-w-none">
            5 signature moves inspired by {current.name}. Revealed in class and in their Skills Tracker.
          </p>
        </div>
      </Container>
    </section>
  );
}

/* ================= PAGE WRAPPER ================= */
export function RoadToRioCombine() {
  return (
    <>
      <RioHero />
      <RioWeekly />
      <RioLegends />
    </>
  );
}

export default RoadToRioCombine;