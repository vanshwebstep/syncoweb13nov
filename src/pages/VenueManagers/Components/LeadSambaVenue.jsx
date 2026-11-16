// LeadSambaVenue.jsx
import React, { useRef, useState, useEffect } from "react";
import { Container } from "../../../components/common/Container";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";

const BG_TEXTURE = "https://webstepdev.com/demo/syncoWebsiteImages/skill-tracker.png";
const BG_TEXTURE_MOBILE = "https://webstepdev.com/demo/syncoWebsiteImages/venueManager/four-levels-mobile.png";

const CARDS = [
  {
    title: "What we look for",
    items: [
      "Natural leader",
      "Confident and enthusiastic",
      "Organised and reliable",
      "Great with people",
    ],
    titleColor: "text-[#0DD180]",
    borderColor: "border-[#0DD180]",
    checkColor: "text-[#0DD180]",
  },
  {
    title: "Qualifications",
    items: [
      "FA Level 1 or 2",
      "DBS checked",
      "First Aid",
    ],
    titleColor: "text-[#00A6E3]",
    borderColor: "border-[#00A6E3]",
    checkColor: "text-[#00A6E3]",
  },
  {
    title: "Experience",
    items: [
      "3-5 Years of experience working with children between 4 and 12 years",
      "Comfortable leading other coaches",
      "Experience working with parents",
    ],
    titleColor: "text-[#00A6E3]",
    borderColor: "border-[#00A6E3]",
    checkColor: "text-[#00A6E3]",
  },
  {
    title: "The Role",
    items: [
      "Lead and develop your coaching team",
      "Welcome children and families",
      "Maintain Samba standards",
      "Own the experience at your venue",
    ],
    titleColor: "text-[#0DD180]",
    borderColor: "border-[#0DD180]",
    checkColor: "text-[#0DD180]",
  },
];

const InfoCard = ({ title, items, titleColor, borderColor, checkColor }) => (
  <div
    className={`
      h-full rounded-[24px] sm:rounded-[30px] xl:rounded-[36px] bg-white p-4 sm:p-5 lg:p-6 xl:p-7
      border-r-[6px] sm:border-r-[7px] md:border-r-[8px] xl:border-r-[9px]
      border-b-[6px] sm:border-b-[7px] md:border-b-[8px] xl:border-b-[9px] ${borderColor} shadow-md
      flex flex-col justify-between
    `}
  >
    <div>
      <h3 className={`gasoek text-[18px] sm:text-[20px] lg:text-[20px] xl:text-[23px] 2xl:text-[26px] tracking-[1%] leading-tight ${titleColor}`}>
        {title}
      </h3>

      <ul className={` ${title === "Experience" ? 'space-y-3 sm:space-y-4' : 'space-y-2 sm:space-y-2.5'} mt-3 sm:mt-4 `}>
        {items.map((item, idx) => (
          <li
            key={idx}
            className="flex items-start gap-2 sm:gap-2.5 poppins text-[11.5px] sm:text-[12.5px] md:text-[13px] lg:text-[13px] xl:text-[15px] 2xl:text-[16px] font-medium leading-[1.45] text-[#475569]"
          >
            <span aria-hidden className={`mt-[2px] shrink-0 ${checkColor}`}>
              <Check size={15} strokeWidth={2.5} />
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const LeadSambaVenue = () => {
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
        relative isolate w-full overflow-hidden py-14 sm:py-16 md:py-16 lg:py-24
        bg-[#f8fafc] bg-cover bg-center bg-no-repeat
        bg-[image:var(--bg-mobile)] md:bg-[image:var(--bg-desktop)]
      "
      style={{
        "--bg-desktop": `url(${BG_TEXTURE})`,
        "--bg-mobile": `url(${BG_TEXTURE_MOBILE})`,
      }}
    >
      <Container className="flex items-center gap-8 md:flex-row flex-col md:gap-6 lg:gap-10 xl:gap-12">
        {/* LEFT: TEXT */}
        <div className="w-full md:w-[43%]">
          <h2 className="leading-[1.05]">
            <span
              className="
                md:block recline font-bold text-white md:text-[#042C89]
                text-[42px] sm:text-[42px] md:text-[38px] lg:text-[48px] xl:text-[58px] 2xl:text-[64px]
              "
            >
              Could you <br className="md:hidden block" /> lead a {' '}
            </span>
            <span
              className="
                mt-1 md:block gasoek text-[#0DD180] md:text-[#00A6E3]
                text-[38px] sm:text-[38px] md:text-[36px] lg:text-[44px] xl:text-[50px] 2xl:text-[56px]
              "
            >
              Samba venue?
            </span>
          </h2>

          <p
            className="
              mt-5 sm:mt-7 poppins font-semibold leading-relaxed text-white md:text-[#042C89]
              text-[13.5px] sm:text-[14.5px] md:text-[14px] lg:text-[14.5px] xl:text-[16.5px] 2xl:text-[18px]
            "
          >
            You don&apos;t need to have managed a Samba venue <br className="hidden md:block" /> before. We&apos;ll teach you<br className="block md:hidden" /> our system.
          </p>

          <p className="mt-3 sm:mt-4 poppins text-[13.5px] sm:text-[14.5px] md:text-[14px] lg:text-[14.5px] xl:text-[16.5px] 2xl:text-[18px] leading-relaxed text-white md:text-[#042C89] font-semibold">
            What matters is having the right experience, <br className="hidden md:block" /> attitude and personality to lead one.
          </p>
        </div>

        {/* RIGHT: CARDS */}
        <div className="w-full md:w-[57%] min-w-0">
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
                  flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-slate-300 bg-white/80 text-[#042C89] shadow-sm transition-all
                  ${!canScrollLeft ? "opacity-30 cursor-not-allowed" : "hover:bg-white active:scale-95"}
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
                  flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-slate-300 bg-white/80 text-[#042C89] shadow-sm transition-all
                  ${!canScrollRight ? "opacity-30 cursor-not-allowed" : "hover:bg-white active:scale-95"}
                `}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Desktop (lg: 1024px+ up to 1440px desktop reference): Staggered 2x2 grid */}
          <div className="md:hidden grid lg:grid w-full lg:grid-cols-2 gap-4 lg:gap-4 xl:gap-6">
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

export default LeadSambaVenue;