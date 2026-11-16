import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { Container } from '../../../components/common/Container';
import mapImg from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/road-to-rio-map.png';
import mapImgMb from 'https://webstepdev.com/demo/syncoWebsiteImages/road-to-rio-map-mobile.png';
import Subtract from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/Subtract-layer.png';
import textureBg from 'https://webstepdev.com/demo/syncoWebsiteImages/Journey.png';

// Import player badge images for each level
// Beginners
import beginner1 from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/beginer_1.png';
import beginner2 from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/beginer_2.png';
import beginner3 from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/beginer_3.png';
import beginner4 from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/beginer_4.png';
import beginner5 from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/beginer_5.png';
import beginner6 from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/beginer_6.png';

// Intermediate
import intermediate1 from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/intermediate_1.png';
import intermediate2 from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/intermediate_2.png';
import intermediate3 from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/intermediate_3.png';
import intermediate4 from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/intermediate_4.png';
import intermediate5 from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/intermediate_5.png';
import intermediate6 from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/intermediate_6.png';

// Advanced
import advanced1 from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/advanced_1.png';
import advanced2 from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/advanced_2.png';
import advanced3 from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/advanced_3.png';
import advanced4 from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/advanced_4.png';
import advanced5 from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/advanced_5.png';
import advanced6 from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/advanced_6.png';

// Proficient
import proficient1 from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/proficient_1.png';
import proficient2 from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/proficient_2.png';
import proficient3 from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/proficient_3.png';
import proficient4 from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/proficient_4.png';
import proficient5 from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/proficient_5.png';
import proficient6 from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/proficient_6.png';

const LEVELS = [
  { id: 'beginners', label: 'BEGINNERS' },
  { id: 'intermediate', label: 'INTERMEDIATE' },
  { id: 'advanced', label: 'ADVANCED' },
  { id: 'proficient', label: 'PROFICIENT' },
];

const PLAYERS_BY_LEVEL = {
  beginners: [
    { id: 1, name: 'Gabriel Jesus', city: 'Manaus', badge: beginner1 },
    { id: 2, name: 'Roberto Carlos', city: 'Brasília', badge: beginner2 },
    { id: 3, name: 'Marcelo', city: 'Recife', badge: beginner3 },
    { id: 4, name: 'Willian', city: 'São Paulo', badge: beginner4 },
    { id: 5, name: 'Romário', city: 'Porto Alegre', badge: beginner5 },
    { id: 6, name: 'Rivaldo', city: 'Rio de Janeiro', badge: beginner6 },
  ],
  intermediate: [
    { id: 1, name: 'Philippe Coutinho', city: 'Manaus', badge: intermediate1 },
    { id: 2, name: 'Mané Garrincha', city: 'Brasília', badge: intermediate2 },
    { id: 3, name: 'Raphinha', city: 'Recife', badge: intermediate3 },
    { id: 4, name: 'Denilson', city: 'São Paulo', badge: intermediate4 },
    { id: 5, name: 'Juninho', city: 'Porto Alegre', badge: intermediate5 },
    { id: 6, name: 'Ronaldo', city: 'Rio de Janeiro', badge: intermediate6 },
  ],
  advanced: [
    { id: 1, name: 'Ronaldinho', city: 'Manaus', badge: advanced1 },
    { id: 2, name: 'Rivelino', city: 'Brasília', badge: advanced2 },
    { id: 3, name: 'Firmino', city: 'Recife', badge: advanced3 },
    { id: 4, name: 'Zico', city: 'São Paulo', badge: advanced4 },
    { id: 5, name: 'Cafu', city: 'Porto Alegre', badge: advanced5 },
    { id: 6, name: 'Neymar Jr.', city: 'Rio de Janeiro', badge: advanced6 },
  ],
  proficient: [
    { id: 1, name: 'Kaká', city: 'Manaus', badge: proficient1 },
    { id: 2, name: 'Jairzinho', city: 'Brasília', badge: proficient2 },
    { id: 3, name: 'Vini jr.', city: 'Recife', badge: proficient3 },
    { id: 4, name: 'Rodrygo', city: 'São Paulo', badge: proficient4 },
    { id: 5, name: 'Douglas Costa', city: 'Porto Alegre', badge: proficient5 },
    { id: 6, name: 'Pelé', city: 'Rio de Janeiro', badge: proficient6 },
  ],
};

export function WeeklyClassesSection() {
  const [activeLevel, setActiveLevel] = useState('beginners');
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Close mobile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  // Track carousel scroll state for navigation buttons
  const checkScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [activeLevel]);

  const handleTabChange = (newLevelId) => {
    if (newLevelId === activeLevel || isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setActiveLevel(newLevelId);
      setIsAnimating(false);
      if (carouselRef.current) {
        carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      }
    }, 150);
  };

  const handleScrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -210, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 210, behavior: 'smooth' });
    }
  };

  return (
    <section
      className="py-16 sm:py-24 md:px-0 md:pt-[200px] relative overflow-hidden text-white font-sans"
      style={{
        backgroundImage: `url(${textureBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'soft-light',
      }}>
  

      <Container className="relative z-10 max-w-[1320px]">
        {/* Top Part: 3D Map + Description */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-10 lg:mb-24 overflow-hidden">
          {/* Left Column: 3D Brazil Map Illustration */}
          <div className="lg:col-span-6 flex justify-center items-center">
            <div className="w-full hidden rio-map-image md:block max-w-[914px] -left-[4.4%] md:absolute -top-[201px]">
              <img
                src={mapImg}
                alt="Road to Rio Brazil Stadiums Map"
                className="w-full h-auto object-contain "
              />
            </div>
            <div className="w-full block md:hidden max-w-[580px] md:max-w-[914px] -left-[4.4%] md:absolute -top-[200px]">
              <img
                src={mapImgMb}
                alt="Road to Rio Brazil Stadiums Map"
                className="w-full h-auto object-contain "
              />
            </div>

          </div>

          {/* Right Column: Heading & Copy */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <h2 className="md:font-['Recline',sans-serif] font-['Gasoek_One',sans-serif] text-[32px] tracking-[1.5px] md:tracking-none sm:text-6xl lg:text-[73px] text-[#0DD180] md:text-white leading-[1.05]">
                Weekly classes
              </h2>
              <h3 className="gasoek text-[32px] tracking-[1.5px] md:tracking-none sm:text-6xl lg:text-[64px] text-[#0DD180] leading-[1.05] mt-1">
                done <span className="text-[#FFDE14] md:text-[#0DD180]">differently</span>
              </h3>
            </div>

            <p className="poppins text-white font-semibold text-[15px] sm:text-[29px] leading-relaxed ">
              Across the year, Road to Rio takes your child on an imaginative journey
              through six Brazilian cities, with each new destination introducing
              another football legend and a new set of skills to master.
            </p>

            <div className="md:pt-2">
              <p className="recline font-bold text-[#0DD180] text-[20px] sm:text-[36px]">
                New city. New player. New challenge.
              </p>
              <p className="gasoek text-[#FFDE14] text-[18px] sm:text-[40px] tracking-[1.5px] mt-3">
                Brazil is waiting
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Part: Select a Level Header + Tabs / Dropdown */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 md:gap-6 mb-8 md:mb-10 pb-2 md:pb-4">
          <div>
            <h3 className="gasoek text-[32px] sm:text-[34px] lg:text-[40px] text-white tracking-[1%]">
              Select a Level
            </h3>
            <p className="poppins text-white font-normal sm:font-medium leading-relaxed md:leading-[30px] text-[15px] sm:text-[18px] mt-2 md:mt-4 max-w-lg">
              Meet the players and discover the skills your child will master on their Road to Rio.
            </p>
          </div>

          {/* Desktop Level Filter Tabs */}
          <div className="hidden md:flex flex-wrap gap-2 sm:gap-3">
            {LEVELS.map((lvl) => {
              const isActive = activeLevel === lvl.id;
              return (
                <button
                  key={lvl.id}
                  onClick={() => handleTabChange(lvl.id)}
                  className={`poppins font-black text-[16px] uppercase sm:text-sm px-5 sm:px-6 py-2.5 sm:py-3 rounded-[15px] w-max transition-all duration-300 ease-out cursor-pointer whitespace-nowrap ${isActive
                      ? 'bg-[#FFDE14] text-[#042C89] scale-105 shadow-lg shadow-[#FFDE14]/25'
                      : 'bg-transparent border border-[#FFDE14] hover:bg-[#FFDE14]/15 text-[#FFDE14] hover:scale-[1.02]'
                    }`}
                >
                  {lvl.label}
                </button>
              );
            })}
          </div>

          {/* Mobile Custom Level Dropdown */}
          <div className="relative md:hidden mt-1 w-[215px]" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="w-full bg-[#FFDE14] text-[#042C89] font-black poppins text-[15px] uppercase tracking-wider px-6 py-3.5 rounded-[18px] flex items-center justify-between shadow-md active:scale-95 transition-all cursor-pointer"
              aria-expanded={isDropdownOpen}
            >
              <span>{LEVELS.find((l) => l.id === activeLevel)?.label || 'BEGINNERS'}</span>
              <ChevronDown
                className={`w-5 h-5 stroke-[3] transition-transform duration-200 text-[#042C89] ${isDropdownOpen ? 'rotate-180' : ''
                  }`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-full bg-white border border-[#BAC7DC] rounded-[24px] shadow-xl overflow-hidden divide-y divide-[#E2E8F0] z-50 animate-badge-fade-in">
                {LEVELS.map((lvl) => {
                  const isActive = activeLevel === lvl.id;
                  return (
                    <button
                      key={lvl.id}
                      type="button"
                      onClick={() => {
                        handleTabChange(lvl.id);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-center py-4 px-3 text-[14px] font-black uppercase poppins transition-colors cursor-pointer hover:bg-slate-50 ${isActive
                          ? 'text-[#042C89] font-black bg-blue-50/40'
                          : 'text-[#4E678B] hover:text-[#042C89]'
                        }`}
                    >
                      {lvl.label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Desktop 6 Brazilian Player Cards Grid */}
        <div
          className={`hidden md:grid md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 transition-all duration-200 ease-out ${isAnimating ? 'opacity-0 scale-[0.97]' : 'opacity-100 scale-100'
            }`}
        >
          {(PLAYERS_BY_LEVEL[activeLevel] || PLAYERS_BY_LEVEL.beginners).map((player, index) => (
            <div
              key={`${activeLevel}-${player.id}`}
              style={{ animationDelay: `${index * 45}ms` }}
              className="animate-badge-fade-in flex flex-col items-center group cursor-pointer"
            >
              <div className="w-full max-w-[190px] transform group-hover:-translate-y-2 group-hover:scale-105 transition-all duration-300 drop-shadow-xl">
                <img
                  src={player.badge}
                  alt={`${player.name} - ${player.city}`}
                  className="w-full h-auto object-contain transition-transform duration-300"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Horizontal Carousel + Arrows */}
        <div className="md:hidden">
          <div
            ref={carouselRef}
            className={`flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth -mx-4 px-4 py-2 transition-all duration-200 ease-out ${isAnimating ? 'opacity-0 scale-[0.97]' : 'opacity-100 scale-100'
              }`}
          >
            {(PLAYERS_BY_LEVEL[activeLevel] || PLAYERS_BY_LEVEL.beginners).map((player, index) => (
              <div
                key={`${activeLevel}-${player.id}`}
                style={{ animationDelay: `${index * 45}ms` }}
                className="snap-start shrink-0 w-[46vw] min-w-[155px] max-w-[190px] animate-badge-fade-in flex flex-col items-center"
              >
                <div className="w-full drop-shadow-xl">
                  <img
                    src={player.badge}
                    alt={`${player.name} - ${player.city}`}
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Carousel Navigation Arrows */}
          <div className="flex justify-end items-center gap-3 mt-5">
            <button
              type="button"
              onClick={handleScrollLeft}
              disabled={!canScrollLeft}
              aria-label="Previous player"
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${canScrollLeft
                  ? 'bg-[#FFDE14] text-[#042C89] active:scale-90 shadow-md cursor-pointer'
                  : 'bg-[#042C89]/60 border border-white/10 text-white/30 cursor-not-allowed opacity-60'
                }`}
            >
              <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
            </button>

            <button
              type="button"
              onClick={handleScrollRight}
              disabled={!canScrollRight}
              aria-label="Next player"
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${canScrollRight
                  ? 'bg-[#FFDE14] text-[#042C89] active:scale-90 shadow-md cursor-pointer'
                  : 'bg-[#042C89]/60 border border-white/10 text-white/30 cursor-not-allowed opacity-60'
                }`}
            >
              <ChevronRight className="w-6 h-6 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default WeeklyClassesSection;
