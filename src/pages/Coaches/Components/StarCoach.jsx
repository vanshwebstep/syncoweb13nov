import React, { useRef, useState, useEffect } from "react";
import { Container } from "../../../components/common/Container";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";

/* ====== REPLACE THESE PATHS LATER ====== */
const BG_DESKTOP = "https://webstepdev.com/demo/syncoWebsiteImages/coaches/star-coach-main.png"; // dark blue pattern + light blue wave
const BG_MOBILE = "https://webstepdev.com/demo/syncoWebsiteImages/coaches/start-coach-mobile-image.png";
/* ======================================= */

const CARDS = [
  {
    title: "What we look for",
    items: [
      "Great with children",
      "Confident and enthusiastic",
      "Reliable and punctual",
      "Passionate about football",
    ],
    titleColor: "text-[#0DD180]",
    borderColor: "border-[#0DD180]",
    shadowColor: "shadow-[4px_4px_0_0_#0DD180]",
    checkColor: "text-[#0DD180]",
  },
  {
    title: "Qualifications",
    items: ["FA Level 1 minimum", "Enhanced DBS", "First Aid"],
    note: "We can help you get set up with the required checks/training.",
    titleColor: "text-[#00A6E3]",
    borderColor: "border-[#00A6E3]",
    shadowColor: "shadow-[4px_4px_0_0_#00A6E3]",
    checkColor: "text-[#00A6E3]",
  },
  {
    title: "Experience",
    items: [
      "2 Years of experience working with children between 4 and 12 years",
      "Playing experience is a bonus",
      "A willingness to learn the Samba way",
    ],
    titleColor: "text-[#00A6E3]",
    borderColor: "border-[#00A6E3]",
    shadowColor: "shadow-[4px_4px_0_0_#00A6E3]",
    checkColor: "text-[#00A6E3]",
  },
  {
    title: "The Role",
    items: [
      "Coach children aged 4–12",
      "Follow our methodology",
      "Create a safe, positive environment",
      "Help every child feel involved",
    ],
    titleColor: "text-[#0DD180]",
    borderColor: "border-[#0DD180]",
    shadowColor: "shadow-[4px_4px_0_0_#0DD180]",
    checkColor: "text-[#0DD180]",
  },
];

const InfoCard = ({ title, items, note, titleColor, borderColor, shadowColor, checkColor }) => (
  <div
    className={`
      h-full flex flex-col justify-between rounded-[24px] sm:rounded-[28px] md:rounded-[32px] lg:rounded-[36px] xl:rounded-[38px] bg-white
      p-6 sm:p-5 lg:p-6 xl:p-7
      border-r-[6px] sm:border-r-[7px] md:border-r-[8px] xl:border-r-[9px]
      border-b-[6px] sm:border-b-[7px] md:border-b-[8px] xl:border-b-[9px]
      ${borderColor}
    `}
  >
    <div>
      <h3 className={`gasoek text-[18px] sm:text-[18px] lg:text-[20px] xl:text-[24px] 2xl:text-[26px] leading-tight tracking-[2%] ${titleColor}`}>
        {title}
      </h3>

      <ul className="mt-2.5 sm:mt-3 space-y-2 sm:space-y-2.5">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-1.5 sm:gap-2 poppins text-[12px] sm:text-[12.5px] md:text-[12px] lg:text-[13.5px] xl:text-[15px] 2xl:text-[16px] font-medium leading-[1.35] text-[#475569]"
          >
            <span aria-hidden className={`mt-[1px] text-[11px] font-bold ${checkColor} shrink-0`}>
              <Check size={15} />
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>

    {note && (
      <p className="mt-2.5 sm:mt-3 poppins text-[9px] sm:text-[10px] xl:text-[12px] italic leading-snug text-[#475569]">
        {note}
      </p>
    )}
  </div>
);

const StarCoach = () => {
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
      el.addEventListener("scroll", checkScroll, { passive: true });
      window.addEventListener("resize", checkScroll);
      checkScroll();
      return () => {
        el.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }
  }, []);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollStep = scrollRef.current.clientWidth;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollStep : scrollStep,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      className="
        relative isolate w-full px-2 md:px-0 overflow-hidden py-14 sm:py-16 md:py-20 lg:py-24
        bg-cover bg-bottom bg-no-repeat
        bg-[image:var(--bg-mobile)] md:bg-[image:var(--bg-desktop)]
      "
      style={{
        "--bg-desktop": `url(${BG_DESKTOP})`,
        "--bg-mobile": `url(${BG_MOBILE})`,
      }}
    >
      <Container className="grid grid-cols-1 items-center gap-10 md:grid-cols-[1fr_1.1fr] md:gap-4 lg:gap-8 xl:gap-12 2xl:gap-14">
        {/* LEFT: TEXT */}
        <div className="w-full max-w-[500px] lg:max-w-[480px] xl:max-w-[540px]">
          <h2 className="leading-[1.1] md:leading-[1.02]">
            <span
              className="
                block recline font-bold text-white
                text-[36px] sm:text-[44px] md:text-[38px] lg:text-[48px] xl:text-[62px] 2xl:text-[74px]
              "
            >
              Could you be
            </span>
            <span
              className="
                mt-1 block gasoek text-[#0DD180]
                text-[36px] sm:text-[44px] md:text-[38px] lg:text-[48px] xl:text-[62px] 2xl:text-[74px]
              "
            >
              a Samba <br/>
              Star Coach?
            </span>
          </h2>

          <p
            className="
              mt-5 sm:mt-7 poppins font-bold leading-snug text-white
              text-[18px] sm:text-[20px] md:text-[18px] lg:text-[22px] xl:text-[26px] 2xl:text-[28px]
            "
          >
            You don&apos;t need to be the next <br className="hidden sm:inline"/>Pep Guardiola.
          </p>

          <p className="mt-3 poppins text-[16px] sm:text-[15px] md:text-[13.5px] lg:text-[15px] xl:text-[18px] 2xl:text-[20px] leading-[1.6] text-white/95 font-medium">
            We&apos;re looking for reliable, energetic people who love football,
            enjoy working with children and aren&apos;t afraid to show a bit of
            personality. <span className="block pt-3 md:pt-4">If that sounds like you, get in touch!</span>
          </p>
        </div>

        {/* RIGHT: CARDS */}
        <div className="w-full min-w-0">
          {/* Tablet & mobile (< lg: 1023px and below): 2 cards shown by default in horizontal scroll */}
          <div className="lg:hidden hidden w-full md:flex flex-col gap-3">
            <div
              ref={scrollRef}
              className="
                flex w-full gap-3 sm:gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 pt-1 px-0.5
                [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
              "
            >
              {CARDS.map((card) => (
                <div
                  key={card.title}
                  className="w-[calc(50%-6px)] sm:w-[calc(50%-8px)] min-w-[165px] sm:min-w-[200px] shrink-0 snap-start flex flex-col"
                >
                  <InfoCard {...card} />
                </div>
              ))}
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-end gap-2 px-1">
              <button
                type="button"
                onClick={() => handleScroll("left")}
                disabled={!canScrollLeft}
                aria-label="Previous cards"
                className={`
                  flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-sm transition-all
                  ${!canScrollLeft ? "opacity-30 cursor-not-allowed" : "hover:bg-white/20 active:scale-95"}
                `}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => handleScroll("right")}
                disabled={!canScrollRight}
                aria-label="Next cards"
                className={`
                  flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-sm transition-all
                  ${!canScrollRight ? "opacity-30 cursor-not-allowed" : "hover:bg-white/20 active:scale-95"}
                `}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Desktop (lg: 1024px+ up to 1440px desktop reference): Staggered 2x2 grid */}
          <div className="md:hidden grid lg:grid w-full md:grid-cols-2 gap-4 lg:gap-4 xl:gap-6">
            {/* left column */}
            <div className="flex flex-col gap-4 lg:gap-4 xl:gap-6">
              <InfoCard {...CARDS[0]} />
              <InfoCard {...CARDS[2]} />
            </div>

            {/* right column (slightly offset) */}
            <div className="flex flex-col gap-4 lg:gap-4 xl:gap-6 lg:mt-4 xl:mt-5">
              <InfoCard {...CARDS[1]} />
              <InfoCard {...CARDS[3]} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default StarCoach;