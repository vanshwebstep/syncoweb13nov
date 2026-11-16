import React, { useRef, useState, useEffect } from 'react';
import { Container } from '../../../components/common/Container';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import texture1 from 'https://webstepdev.com/demo/syncoWebsiteImages/coaches/star-coach-main.png';
import texture1Mobile from 'https://webstepdev.com/demo/syncoWebsiteImages/coaches/start-coach-mobile-image.png';
import vectorBall from 'https://webstepdev.com/demo/syncoWebsiteImages/home/ball.png';
import vectorBallMobile from 'https://webstepdev.com/demo/syncoWebsiteImages/home/ball-mobile.png';

import beginnerImg from 'https://webstepdev.com/demo/syncoWebsiteImages/pathway-samba-babies.png';
import intermediateImg from 'https://webstepdev.com/demo/syncoWebsiteImages/pathway-samba-rookies.png';
import advancedImg from 'https://webstepdev.com/demo/syncoWebsiteImages/pathway-samba-pro.png';
import proImg from 'https://webstepdev.com/demo/syncoWebsiteImages/pathway-samba-stars.png';

export function YourRun() {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 8);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 8);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll, { passive: true });
      window.addEventListener('resize', checkScroll);
      checkScroll();
      return () => {
        el.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, []);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollStep = scrollRef.current.clientWidth;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollStep : scrollStep,
        behavior: 'smooth',
      });
    }
  };

  const cards = [
    {
      title: "LEAD THE COACHES",
      titleColor: "text-[#00A6E3]",
      desc: "Set the standard, develop your team and help every coach get better.",
      img: beginnerImg,
    },
    {
      title: "OWN THE EXPERIENCE",
      titleColor: "text-[#0DD180]",
      desc: "From the music and energy to the Road to Rio, make every session feel unmistakably Samba.",
      img: intermediateImg,
    },
    {
      title: "BUILD A COMMUNITY",
      titleColor: "text-[#0DD180]",
      desc: "Welcome families, get to know parents and make every child feel like they belong.",
      img: advancedImg,
    },
    {
      title: "KEEP IT RUNNING",
      titleColor: "text-[#00A6E3]",
      desc: "Prepare the venue, manage the session and make sure nothing gets missed.",
      img: proImg,
    },
  ];

  const CardItem = ({ card }) => (
    <div className="bg-white rounded-[20px] sm:rounded-[24px] p-4 sm:p-5 shadow-xl flex flex-col justify-between border border-slate-100 hover:-translate-y-1 transition-all duration-300 h-full">
      {/* Photo Frame Container */}
      <div className="w-full h-auto p-3 md:p-0 sm:h-[160px] lg:h-[155px] xl:h-[180px] flex items-center justify-center overflow-hidden">
        <img 
          src={card.img} 
          alt={card.title} 
          className="w-full h-full object-contain hover:scale-105 transition-transform duration-300" 
        />
      </div>

      {/* Title & Description */}
      <div className="space-y-2 pt-3 sm:pt-4">
        <h3 className={`gasoek font-normal text-[17px] sm:text-[19px] lg:text-[19px] xl:text-[22px] 2xl:text-[26px] ${card.titleColor} uppercase leading-tight`}>
          {card.title}
        </h3>
        <p className="text-[12px] sm:text-[13px] lg:text-[13px] xl:text-[14.5px] 2xl:text-[16px] text-[#0F1A2A] poppins font-medium leading-[1.5]">
          {card.desc}
        </p>
      </div>
    </div>
  );

  return (
    <section 
      className="relative w-full py-14 sm:py-16 md:py-20 lg:py-24 text-white overflow-hidden font-sans bg-[#042C89]"
    >
      {/* Mobile background image */}
      <img 
        src={texture1Mobile} 
        alt="" 
        aria-hidden="true"
        className="block md:hidden absolute inset-0 w-full h-full object-cover object-top pointer-events-none z-0" 
      />

      {/* Desktop background image */}
      <img 
        src={texture1} 
        alt="" 
        aria-hidden="true"
        className="hidden md:block absolute inset-0 w-full h-full object-cover object-bottom pointer-events-none z-0" 
      />

      <Container className="relative z-10">
        
        {/* Main Grid Layout: Left Description + Right 2x2 Cards */}
        <div className="flex flex-col md:flex-row md:items-start  gap-8 md:gap-6 lg:gap-10 xl:gap-12">
          
          {/* Left Text Column */}
          <div className="w-full md:w-[42%] lg:mt-20 lg:w-[40%] flex flex-col justify-center">
            <h2 className="gasoek text-[34px] sm:text-[42px] md:text-[38px] lg:text-[46px] xl:text-[58px] 2xl:text-[71px] leading-[1.04] uppercase">
              <span className="block text-[#0DD180]">YOU RUN</span>
              <span className="block text-[#00A6E3]">THE SHOW</span>
            </h2>

            <p className="text-white poppins font-bold text-[15px] sm:text-[17px] md:text-[17px] lg:text-[19px] xl:text-[24px] 2xl:text-[28px] leading-[1.3] mt-4 sm:mt-5">
              The coaches coach. You make sure the whole Samba <br className="hidden md:block" /> experience comes together.
            </p>

            {/* Flying Football Graphic below text */}
            <div className="mt-5 sm:mt-7 md:mt-8 hidden md:block w-[140px] sm:w-[170px] lg:w-[220px] xl:w-[260px]">
              <img 
                src={vectorBall} 
                alt="Flying football" 
                className="w-full h-auto drop-shadow-lg hidden md:block" 
              />
              <img 
                src={vectorBallMobile} 
                alt="Flying football" 
                className="w-full h-auto drop-shadow-lg block md:hidden" 
              />
            </div>
          </div>

          {/* Right Cards + Bottom Pill */}
          <div className="w-full md:w-[58%] lg:w-[60%] md:mt-0 mt-2">
            {/* Tablet & mobile (< lg: 1023px and below): 2 cards shown by default in horizontal scroll */}
            <div className="lg:hidden hidden  w-full md:flex flex-col gap-3">
              <div
                ref={scrollRef}
                className="
                  flex w-full gap-3 sm:gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 pt-1 px-0.5
                  [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
                "
              >
                {cards.map((card, idx) => (
                  <div
                    key={idx}
                    className="w-[calc(50%-6px)] sm:w-[calc(50%-8px)] min-w-[160px] sm:min-w-[190px] shrink-0 snap-start flex flex-col"
                  >
                    <CardItem card={card} />
                  </div>
                ))}
              </div>

              {/* Navigation buttons */}
              <div className="flex items-center justify-end gap-2 px-1">
                <button
                  type="button"
                  onClick={() => handleScroll('left')}
                  disabled={!canScrollLeft}
                  aria-label="Previous cards"
                  className={`
                    flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-sm transition-all
                    ${!canScrollLeft ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/20 active:scale-95 cursor-pointer'}
                  `}
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => handleScroll('right')}
                  disabled={!canScrollRight}
                  aria-label="Next cards"
                  className={`
                    flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-sm transition-all
                    ${!canScrollRight ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/20 active:scale-95 cursor-pointer'}
                  `}
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* Desktop (lg: 1024px+ up to 1440px): Standard 2x2 grid */}
            <div className=" md:hidden grid lg:grid lg:grid-cols-2 gap-3.5 sm:gap-4">
              {cards.map((card, idx) => (
                <div key={idx} className="flex flex-col">
                  <CardItem card={card} />
                </div>
              ))}
            </div>

            {/* Bottom CTA Banner (Green Pill) */}
            <div className="bg-[#0DD180] rounded-[24px] sm:rounded-[30px] lg:rounded-full px-5 sm:px-6 xl:px-8 py-3.5 sm:py-4 xl:py-5 mt-4 sm:mt-5 flex flex-col sm:flex-row md:items-center justify-between gap-3 sm:gap-4 shadow-xl">
              <div className="text-left">
                <p className="text-white font-bold poppins text-[14px] sm:text-[15.5px] lg:text-[16px] xl:text-[19px] 2xl:text-[21px] leading-snug">
                  You&apos;re not standing on the sidelines.
                </p>
                <p className="text-[#042C89] font-bold mt-0.5 sm:mt-1 md:mt-0 poppins text-[12.5px] sm:text-[13.5px] lg:text-[14px] xl:text-[17px] 2xl:text-[20px] leading-snug">
                  You&apos;re the person making it happen.
                </p>
              </div>

              <a
                href="#apply"
                className="bg-[#FFDE14] uppercase md:capitalize w-max hover:bg-[#ebd000] text-[#042C89] font-bold text-[12px] sm:text-[13px] lg:text-[14px] xl:text-[15px] px-5 sm:px-6 py-2 sm:py-2.5 rounded-full transition-all shrink-0 poppins inline-block"
              >
                Apply Now
              </a>
            </div>
          </div>

        </div>

      </Container>
    </section>
  );
}

export default YourRun;
