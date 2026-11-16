import React from 'react';
import { Container } from '../../../components/common/Container';

const BASE = 'https://webstepdev.com/demo/syncoWebsiteImages';
const blueBgTexture = `${BASE}/skill-tracker.png`;
const legend1 = `${BASE}/holiday-camps/legend_1.png`;
const legend2 = `${BASE}/holiday-camps/legend_2.png`;
const legend3 = `${BASE}/holiday-camps/legend_3.png`;
const legend4 = `${BASE}/holiday-camps/legend_4.png`;
const legend5 = `${BASE}/holiday-camps/legend_5.png`;
const legend6 = `${BASE}/holiday-camps/legend_6.png`;

export function Section4() {
  const legends = [
    { id: 1, name: 'Pelé', city: 'Manaus', img: legend1 },
    { id: 2, name: 'Ronaldo', city: 'Brasília', img: legend2 },
    { id: 3, name: 'Kaká', city: 'Recife', img: legend3 },
    { id: 4, name: 'Neymar Jr.', city: 'São Paulo', img: legend4 },
    { id: 5, name: 'Ronaldinho', city: 'Porto Alegre', img: legend5 },
    { id: 6, name: 'Vini Jr.', city: 'Rio de Janeiro', img: legend6 },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-white py-12 sm:py-14">
      {/* Subtle Pattern Background */}
      <img
        src={blueBgTexture}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
      />

      <Container className="relative z-10 w-full text-center">
        {/* Badge */}
        <div className="inline-block bg-[#E8EEFB] px-4 py-1 rounded-full mb-4">
          <span className="text-[#042C89] text-[11px] sm:text-[14px] font-bold uppercase poppins">
            AN ADVENTURE THROUGH BRAZIL
          </span>
        </div>

        {/* Headings */}
        <h2 className="gasoek uppercase text-[34px] sm:text-[48px] leading-[1.2] md:leading-[1.04] mb-6 ">
          <span className="text-[#042C89] block">SIX BRAZILIAN LEGENDS</span>
          <span className="text-[#00A6E3] block">TWELVE SKILLS TO MASTER</span>
        </h2>

        {/* Description */}
        <p className="poppins text-[#475569] text-[14px] sm:text-[18px] leading-relaxed mx-auto mb-12 sm:mb-16 font-medium">
          Across the first three days, they'll discover six Brazilian football legends and learn two skills inspired <br className="hidden md:block" /> by each one. Then on Day Four, it all comes together at the Copa de Samba tournament.
        </p>

        {/* 6 Legends: mobile/tablet = horizontal scroll, desktop = grid */}
        <div
          className="
            flex lg:grid lg:grid-cols-6
            overflow-x-auto lg:overflow-visible
            snap-x snap-mandatory lg:snap-none
            gap-4 sm:gap-6
            items-end
            max-w-[1140px] mx-auto
            -mx-4 px-4 sm:mx-auto sm:px-0 lg:px-0
            pb-4 lg:pb-10
            [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden
          "
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {legends.map((legend) => (
            <div
              key={legend.id}
              className="flex flex-col items-center group transition-transform duration-300 hover:-translate-y-2 cursor-pointer shrink-0 lg:shrink snap-center w-[150px] sm:w-[170px] lg:w-auto"
            >
              <img
                src={legend.img}
                alt={`${legend.name} - ${legend.city}`}
                className="w-full max-w-[150px] sm:max-w-[170px] h-auto object-contain drop-shadow-md select-none"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export { Section4 as BrazilianLegendsSection };
export default Section4;