import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { Container } from '../../../components/common/Container';
import heroBg from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/your-child-hero.png';
import heroBgMobile from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/road-to-rio-hero-mobile.png';
import kidsGraphic from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/rio-banner.png';
import mixLayer from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/mix_layer.png';
import rio from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/rio-layer.png';
import mapImg from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/road-to-rio-map.png';
import mapImgMb from 'https://webstepdev.com/demo/syncoWebsiteImages/road-to-rio-map-mobile.png';
import textureBg from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/riocombine.jpg';

import beginner1 from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/beginer_1.png';
import beginner2 from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/beginer_2.png';
import beginner3 from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/beginer_3.png';
import beginner4 from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/beginer_4.png';
import beginner5 from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/beginer_5.png';
import beginner6 from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/beginer_6.png';

import intermediate1 from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/intermediate_1.png';
import intermediate2 from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/intermediate_2.png';
import intermediate3 from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/intermediate_3.png';
import intermediate4 from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/intermediate_4.png';
import intermediate5 from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/intermediate_5.png';
import intermediate6 from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/intermediate_6.png';
import bluetexturedbg from 'https://webstepdev.com/demo/syncoWebsiteImages/bluetexturedbg.png';

import advanced1 from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/advanced_1.png';
import advanced2 from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/advanced_2.png';
import advanced3 from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/advanced_3.png';
import advanced4 from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/advanced_4.png';
import advanced5 from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/advanced_5.png';
import advanced6 from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/advanced_6.png';

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

export function RoadToRioCombine() {
    const [activeLevel, setActiveLevel] = useState('beginners');
    const [isAnimating, setIsAnimating] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const carouselRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

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
            const step = carouselRef.current.clientWidth > 600 ? Math.round(carouselRef.current.clientWidth / 2) : 210;
            carouselRef.current.scrollBy({ left: -step, behavior: 'smooth' });
        }
    };

    const handleScrollRight = () => {
        if (carouselRef.current) {
            const step = carouselRef.current.clientWidth > 600 ? Math.round(carouselRef.current.clientWidth / 2) : 210;
            carouselRef.current.scrollBy({ left: step, behavior: 'smooth' });
        }
    };

    return (
        <div style={{             
                backgroundImage: `url(${bluetexturedbg})`,
                  backgroundSize: 'cover',
                backgroundPosition: 'top',
                backgroundRepeat: 'no-repeat',
              }}>
        <section
            className="rio-combine-section relative w-full font-sans overflow-hidden text-white"
            style={{
                '--rio-combine-bg': `url(${textureBg})`,
            }}
        >
            {/* ===== HERO PART ===== */}
            <div className="relative w-full py-[60px] px-2 md:px-0 sm:py-[80px] md:py-0 overflow-hidden min-h-[640px] sm:min-h-[700px] md:min-h-[380px] min-[900px]:min-h-[440px] lg:min-h-[520px] xl:min-h-[600px] 2xl:min-h-[720px]">
                <img
                    src={heroBgMobile}
                    alt=""
                    aria-hidden="true"
                    className="block md:hidden absolute inset-0 w-full h-full object-cover object-top pointer-events-none z-0"
                />


                <Container className="relative z-10 pt-8 pb-32 mainContainer sm:pb-48 md:pt-14 md:pb-8 min-[900px]:pt-16 min-[900px]:pb-10 lg:pt-20 lg:pb-12 xl:pt-[120px] xl:pb-16 2xl:pt-28 2xl:pb-20">
                    <div className="rio-hero-text-content space-y-3 sm:space-y-6 md:space-y-2.5 min-[900px]:space-y-4 lg:space-y-6 text-left max-w-full md:max-w-[340px] min-[900px]:max-w-[420px] lg:max-w-[600px] xl:max-w-[700px]">
                        <h1 className="font-['Gasoek_One',sans-serif] text-[44px] sm:text-[54px] md:text-[36px] min-[900px]:text-[52px] lg:text-[68px] xl:text-[80px] 2xl:text-[88px] leading-[1.02] tracking-wide uppercase">
                            <span className="text-[#042C89] block">YOUR CHILD'S</span>
                            <span className="text-[#042C89] inline">ROAD TO{' '}</span>
                            <span className="text-[#FFDE14] text-[62px] sm:text-[76px] md:text-[50px] min-[900px]:text-[74px] lg:text-[96px] xl:text-[108px] 2xl:text-[114px] relative inline-block">
                                Rio
                                <img
                                    src={mixLayer}
                                    alt=""
                                    className="absolute -bottom-5 sm:-bottom-8 md:-bottom-5 min-[900px]:-bottom-7 lg:-bottom-10 left-0 w-full h-auto object-contain pointer-events-none"
                                />
                            </span>
                        </h1>

                        <div className="font-['Poppins',sans-serif] text-white font-bold text-[16px] sm:text-[18px] md:text-[13.5px] min-[900px]:text-[17px] lg:text-[22px] xl:text-[24px] pt-3 sm:pt-6 md:pt-2 min-[900px]:pt-4 lg:pt-8 xl:pt-10 leading-[24px] sm:leading-[30px] md:leading-[20px] min-[900px]:leading-[26px] lg:leading-[35px] max-w-xl md:mx-0 lg:mx-0 text-left">
                            <p>
                                This isn't just another weekly football class. <br className="hidden sm:inline md:hidden min-[900px]:inline" />
                                It's a year-long immersive adventure through Brazilian football.
                            </p>
                        </div>
                    </div>
                </Container>
            </div>

            {/* ===== WEEKLY CLASSES PART ===== */}
            <div id="weekly-classes" className="pt-6 pb-12 sm:pb-16 md:pt-4 md:pb-16 lg:pt-6 lg:pb-20 xl:pt-8 xl:pb-24 2xl:pt-12 2xl:pb-28 relative">
                <Container className="relative z-10 max-w-[1320px]">
                    <div className="rio-weekly-grid grid grid-cols-1 bottomMain md:grid-cols-12 gap-6 min-[900px]:gap-8 lg:gap-8 xl:gap-14 items-center mb-10 md:mb-12 min-[900px]:mb-8 lg:mb-10 xl:pt-20 xl:mb-20">
                        <div className="rio-weekly-map-spacer md:col-span-6 flex justify-center items-center">
                            {/* Desktop: spacer reserving the exact height of the Brazil Map illustration in the background */}
                            <div
                                aria-hidden="true"
                                className="hidden md:block w-full min-h-[360px] min-[900px]:min-h-[440px] lg:min-h-[520px] xl:min-h-[620px] 2xl:min-h-[720px] pointer-events-none"
                            />
                            {/* Mobile: standalone mobile map */}
                            <div className="w-full block md:hidden max-w-[540px] mx-auto">
                                <img src={mapImgMb} alt="Road to Rio Brazil Stadiums Map" className="w-full h-auto object-contain mx-auto" />
                            </div>
                        </div>

                        <div className="rio-weekly-text-content md:col-span-6 space-y-3.5 md:space-y-3 min-[900px]:space-y-4 lg:space-y-4 xl:space-y-6 rightsidebox md:ps-1 min-[900px]:ps-2 xl:ps-6">
                            <div>
                                <h2 className="md:font-['Recline',sans-serif] font-['Gasoek_One',sans-serif] text-[32px] sm:text-[38px] md:text-[32px] min-[900px]:text-[40px] lg:text-[46px] xl:text-[56px] 2xl:text-[73px] text-[#0DD180] md:text-white leading-[1.05]">
                                    Weekly classes
                                </h2>
                                <h3 className="gasoek text-[32px] sm:text-[38px] md:text-[28px] min-[900px]:text-[36px] lg:text-[40px] xl:text-[50px] 2xl:text-[64px] text-[#0DD180] leading-[1.05] mt-1">
                                    done <span className="text-[#FFDE14] md:text-[#0DD180]">differently</span>
                                </h3>
                            </div>

                            <p className="poppins text-white font-semibold text-[15px] sm:text-[16px] md:text-[13.5px] min-[900px]:text-[15px] lg:text-[17px] xl:text-[22px] 2xl:text-[28px] leading-relaxed">
                                Across the year, Road to Rio takes your child on an imaginative journey
                                through six Brazilian cities, with each new destination introducing
                                another football legend and a new set of skills to master.
                            </p>

                            <div className="md:pt-1 lg:pt-1">
                                <p className="recline font-bold text-[#0DD180] text-[18px] sm:text-[22px] md:text-[17px] min-[900px]:text-[20px] lg:text-[22px] xl:text-[28px] 2xl:text-[36px]">
                                    New city. New player. New challenge.
                                </p>
                                <p className="gasoek text-[#FFDE14] text-[18px] sm:text-[22px] md:text-[18px] min-[900px]:text-[22px] lg:text-[24px] xl:text-[30px] 2xl:text-[40px] tracking-[1.5px] mt-1 sm:mt-2 lg:mt-2.5">
                                    Brazil is waiting
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center bottomBoxMain justify-between gap-4 md:gap-6 mb-8 md:mb-10 pb-2 md:pb-4">
                        <div>
                            <h3 className="gasoek text-[30px] sm:text-[34px] lg:text-[40px] text-white tracking-[1%]">
                                Select a Level
                            </h3>
                            <p className="poppins text-white font-normal sm:font-medium leading-relaxed md:leading-[28px] lg:leading-[30px] text-[14px] sm:text-[16px] lg:text-[18px] mt-1.5 md:mt-2.5 max-w-lg">
                                Meet the players and discover the skills your child will master on their Road to Rio.
                            </p>
                        </div>

                        <div className="hidden md:flex md:flex-nowrap items-center gap-1.5 min-[900px]:gap-2 lg:gap-2.5 xl:gap-3 shrink-0">
                            {LEVELS.map((lvl) => {
                                const isActive = activeLevel === lvl.id;
                                return (
                                    <button
                                        key={lvl.id}
                                        onClick={() => handleTabChange(lvl.id)}
                                        className={`poppins font-black text-[12px] min-[900px]:text-[13px] lg:text-[14px] xl:text-[16px] uppercase px-3 min-[900px]:px-3.5 lg:px-4 xl:px-6 py-2 min-[900px]:py-2.5 lg:py-2.5 xl:py-3 rounded-[10px] min-[900px]:rounded-[12px] xl:rounded-[15px] w-max transition-all duration-300 ease-out cursor-pointer whitespace-nowrap ${isActive
                                            ? 'bg-[#FFDE14] text-[#042C89] scale-105 shadow-lg shadow-[#FFDE14]/25'
                                            : 'bg-transparent border border-[#FFDE14] hover:bg-[#FFDE14]/15 text-[#FFDE14] hover:scale-[1.02]'
                                            }`}
                                    >
                                        {lvl.label}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="relative md:hidden mt-1 w-[215px]" ref={dropdownRef}>
                            <button
                                type="button"
                                onClick={() => setIsDropdownOpen((prev) => !prev)}
                                className="w-full bg-[#FFDE14] text-[#042C89] font-black poppins text-[15px] uppercase tracking-wider px-6 py-3.5 rounded-[18px] flex items-center justify-between shadow-md active:scale-95 transition-all cursor-pointer"
                                aria-expanded={isDropdownOpen}
                            >
                                <span>{LEVELS.find((l) => l.id === activeLevel)?.label || 'BEGINNERS'}</span>
                                <ChevronDown
                                    className={`w-5 h-5 stroke-[3] transition-transform duration-200 text-[#042C89] ${isDropdownOpen ? 'rotate-180' : ''}`}
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

                    <div
                        className={`hidden lg:grid lg:grid-cols-6 gap-3 lg:gap-3 xl:gap-6 transition-all duration-200 ease-out ${isAnimating ? 'opacity-0 scale-[0.97]' : 'opacity-100 scale-100'}`}
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

                    <div className="block lg:hidden">
                        <div
                            ref={carouselRef}
                            className={`flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth -mx-4 px-4 md:mx-0 md:px-0 py-2 transition-all duration-200 ease-out ${isAnimating ? 'opacity-0 scale-[0.97]' : 'opacity-100 scale-100'}`}
                        >
                            {(PLAYERS_BY_LEVEL[activeLevel] || PLAYERS_BY_LEVEL.beginners).map((player, index) => (
                                <div
                                    key={`${activeLevel}-${player.id}`}
                                    style={{ animationDelay: `${index * 45}ms` }}
                                    className="snap-start shrink-0 w-[46vw] sm:w-[calc((100%-24px)/3)] md:w-[calc((100%-36px)/5)] min-w-[140px] md:min-w-0 max-w-[190px] md:max-w-none animate-badge-fade-in flex flex-col items-center group cursor-pointer"
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

                        <div className="flex justify-end items-center gap-3 mt-4 md:mt-6">
                            <button
                                type="button"
                                onClick={handleScrollLeft}
                                disabled={!canScrollLeft}
                                aria-label="Previous player"
                                className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-200 ${canScrollLeft
                                    ? 'bg-[#FFDE14] text-[#042C89] active:scale-90 shadow-md cursor-pointer hover:scale-105'
                                    : 'bg-[#042C89]/60 border border-white/10 text-white/30 cursor-not-allowed opacity-60'
                                    }`}
                            >
                                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 stroke-[2.5]" />
                            </button>

                            <button
                                type="button"
                                onClick={handleScrollRight}
                                disabled={!canScrollRight}
                                aria-label="Next player"
                                className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-200 ${canScrollRight
                                    ? 'bg-[#FFDE14] text-[#042C89] active:scale-90 shadow-md cursor-pointer hover:scale-105'
                                    : 'bg-[#042C89]/60 border border-white/10 text-white/30 cursor-not-allowed opacity-60'
                                    }`}
                            >
                                <ChevronRight className="w-5 h-5 md:w-6 md:h-6 stroke-[2.5]" />
                            </button>
                        </div>
                    </div>
                </Container>
            </div>
        </section>
        </div>
    );
}

export default RoadToRioCombine;