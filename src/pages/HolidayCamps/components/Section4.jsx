import React, { useRef, useState } from 'react';
import { Container } from '../../../components/common/Container';

const BASE = 'https://webstepdev.com/demo/syncoWebsiteImages';
const bgTexture = `${BASE}/birthday-party/what_happend_banner.png`;
const SWOOSH = `${BASE}/roadtorio/Swoosh.png`;

const legends = [
  { id: 1, name: 'Pelé', city: 'Manaus', img: `${BASE}/holiday-camps/legend_1.png` },
  { id: 2, name: 'Ronaldo', city: 'Brasília', img: `${BASE}/holiday-camps/legend_2.png` },
  { id: 3, name: 'Kaká', city: 'Recife', img: `${BASE}/holiday-camps/legend_3.png` },
  { id: 4, name: 'Neymar Jr.', city: 'São Paulo', img: `${BASE}/holiday-camps/legend_4.png` },
  { id: 5, name: 'Ronaldinho', city: 'Porto Alegre', img: `${BASE}/holiday-camps/legend_5.png` },
  { id: 6, name: 'Vini Jr.', city: 'Rio de Janeiro', img: `${BASE}/holiday-camps/legend_6.png` },
];

export function Section4() {
  const scrollRef = useRef(null);
  const [active, setActive] = useState(0);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el || !el.firstChild) return;
    const card = el.firstChild;
    const step = card.offsetWidth + 16; // card width + gap-4
    setActive(Math.min(legends.length - 1, Math.max(0, Math.round(el.scrollLeft / step))));
  };

  return (
    <section
      className="relative w-full overflow-hidden bg-white pt-10 pb-8 sm:py-14 lg:py-16"
      style={{
        backgroundImage: `url(${bgTexture})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Container className="relative z-10 w-full text-center px-5 sm:px-6">
        {/* ===== Heading ===== */}
        <p className="font-['Poppins',sans-serif] font-bold text-[#00A6E3] text-[11px] lg:text-[13px] tracking-[0.06em] uppercase">
          <span className="sm:hidden">A journey through Brazil</span>
          <span className="hidden sm:inline">An adventure through Brazil</span>
        </p>

        <h2 className="mt-3 leading-[1.1]">
          <span className="block font-['Recline',sans-serif] font-bold text-[#042C89] text-[32px] sm:text-[36px] lg:text-[44px]">
            Six Brazilian legends.
          </span>
          <span className="relative inline-block font-['Gasoek_One',sans-serif] text-[#0DD180] text-[40px] sm:text-[44px] lg:text-[54px] mt-1">
            <span className="sm:hidden">
              Twelve skills
              <br />
              to master.
            </span>
            <span className="hidden sm:inline">Twelve skills to master.</span>
            <img src={SWOOSH} alt="" aria-hidden="true" className="absolute left-0 -bottom-1.5 sm:-bottom-2 w-full h-auto pointer-events-none select-none" />
          </span>
        </h2>

        <p className="mt-7 sm:mt-8 max-w-[760px] mx-auto font-['Poppins',sans-serif] font-medium text-[#042C89] text-[15px] sm:text-[16px] lg:text-[18px] leading-[1.55] sm:leading-relaxed">
          <span className="sm:hidden">
            Across the first three days they meet six Brazilian legends and learn two skills inspired by each. Day Four is the Copa de Samba.
          </span>
          <span className="hidden sm:inline">
            Across the first three days, they’ll meet six Brazilian football legends and learn two skills inspired by
            each one. Then on Day Four, it all comes together at the Copa de Samba.
          </span>
        </p>

        {/* ===== Legends ===== */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="mt-8 lg:mt-12 flex lg:grid lg:grid-cols-6 overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none gap-4 sm:gap-6 lg:gap-4 items-end max-w-[1140px] -mx-5 px-5 sm:mx-auto sm:px-0 pb-4 lg:pb-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {legends.map((l) => (
            <div
              key={l.id}
              className="flex flex-col items-center shrink-0 lg:shrink snap-start w-[62%] max-w-[240px] sm:w-[170px] lg:w-auto transition-transform duration-300 hover:-translate-y-2 cursor-pointer"
            >
              <img
                src={l.img}
                alt={`${l.name} - ${l.city}`}
                className="w-full sm:max-w-[170px] lg:max-w-none h-auto object-contain drop-shadow-md select-none"
              />
            </div>
          ))}
        </div>

        {/* Dots + swipe hint (mobile only) */}
        <div className="sm:hidden mt-4 flex flex-col items-center gap-3">
          <div className="flex items-center gap-1.5">
            {legends.map((_, i) => (
              <span
                key={i}
                className={`w-[7px] h-[7px] rounded-full transition-colors duration-300 ${
                  i === active ? 'bg-[#042C89]' : 'bg-[#D5DBE8]'
                }`}
              />
            ))}
          </div>
          <p className="font-['Poppins',sans-serif] font-semibold text-[#797A88] text-[12px]">
            Swipe to meet all 6 →
          </p>
        </div>
      </Container>
    </section>
  );
}

export { Section4 as BrazilianLegendsSection };
export default Section4;