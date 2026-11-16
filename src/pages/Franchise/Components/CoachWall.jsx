import React, { useRef, useState } from "react";
import { Container } from "../../../components/common/Container";
import { useModal } from "../../../context/ModalContext";

const IMG_BASE = "https://webstepdev.com/demo/syncoWebsiteImages/franchise";

const cards = [
  {
    title: "The Exhausted Coach",
    text: "You love the game. But coaching club to club, barely making ends meet, has you thinking of giving it all up.",
    image: `${IMG_BASE}/theexhaustedcoach_bg.png`,
    titleColor: "#042C89",
    textColor: "#fff",
  },
  {
    title: "The Creative Coach",
    text: "You love flair, freedom and creativity. But your club only cares about drills and results.",
    image: `${IMG_BASE}/thecreativecoachbg.png`,
    titleColor: "#042C89",
    textColor: "#fff",
  },
  {
    title: "The Overworked One",
    text: "Another weekend working. Another moment missed. Someone else controls your time.",
    image: `${IMG_BASE}/theoverworkedonebg.png`,
    titleColor: "#0FCB7A",
    textColor: "#fff",
  },
  {
    title: "The Overwhelmed Starter",
    text: "Venues, staff, marketing, money. Too much to figure out, so you never start.",
    image: `${IMG_BASE}/theoverwhelmedstarterbg.png`,
    titleColor: "#FFDD14",
    textColor: "#fff",
  },
  {
    title: "The Ambitious Earner",
    text: "You want to decide what you earn, not wait for someone else to decide.",
    image: `${IMG_BASE}/theamitiousbg.png`,
    titleColor: "#042C89",
    textColor: "#042C89",
  },
];

const TOTAL_SLIDES = cards.length + 1; // + CTA card
const GAP = 16; // px, matches gap-4

export function CoachWall() {
  const { openModal } = useModal();
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);

  const getStep = () => {
    const first = trackRef.current?.children[0];
    return first ? first.offsetWidth + GAP : 1;
  };

  const handleScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const i = Math.round(el.scrollLeft / getStep());
    setActive(Math.min(TOTAL_SLIDES - 1, Math.max(0, i)));
  };

  const goTo = (i) => {
    trackRef.current?.scrollTo({ left: i * getStep(), behavior: "smooth" });
  };

  return (
    <section
      style={{ backgroundImage: `url('${IMG_BASE}/texture_bg.png')` }}
      className="relative w-full py-12 md:py-20 overflow-hidden"
    >
      <Container>
        {/* Heading */}
        <h2 className="recline text-center text-[#042C89] font-bold text-[46px] sm:text-[68px] lg:text-[74.55px] leading-[1.1] max-w-[760px] mx-auto">
          Every great <br className="hidden md:block" /> coach hits a{" "}
          <span className="gasoek font-normal relative inline-block text-[#0FCB7A]">
            wall.
            <img
              src={`${IMG_BASE}/yellowline.png`}
              alt=""
              className="absolute -bottom-2 sm:-bottom-3 md:-bottom-4 left-0 w-full h-auto object-contain pointer-events-none coach-wall-underline"
            />
          </span>
        </h2>

        <p className="poppins text-center text-[#042C89] font-semibold text-[16px] lg:text-[24px] mt-6 md:mt-8 mb-8 md:mb-10">
          Which one sounds like you?
        </p>

        {/* Mobile: slider | md+: grid */}
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth -mx-4 px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
                     md:mx-auto md:px-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:auto-rows-fr md:gap-5 md:overflow-visible md:snap-none max-w-[1200px]"
        >
          {cards.map((c) => (
            <div
              key={c.title}
              className="relative overflow-hidden rounded-[18px] min-h-[230px] px-6 pt-6 pb-14 flex items-center shrink-0 w-[99%] snap-center md:w-auto md:shrink"
            >
              <img
                src={c.image}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover object-right pointer-events-none select-none coach-card-bg"
              />
              <div className="relative z-10 max-w-[52%]">
                <h3
                  className="gasoek capitalize text-[18px] lg:text-[22px] leading-[1.08] mb-2"
                  style={{ color: c.titleColor }}
                >
                  {c.title}
                </h3>
                <p
                  className="poppins font-semibold text-[13px] md:text-[14px]"
                  style={{ color: c.textColor }}
                >
                  {c.text}
                </p>
              </div>
            </div>
          ))}

          {/* CTA card */}
          <div className="rounded-[18px] bg-[#FFDD14] px-6 py-7 flex flex-col justify-center min-h-[230px] shrink-0 w-[85%] snap-center md:w-auto md:shrink">
            <h3 className="recline text-[#042C89] font-bold text-[22px] mb-2">
              Sounds like you?
            </h3>
            <p className="poppins text-[#042C89] font-semibold text-[14px] leading-[1.45] mb-5">
              Every coach hits a different wall. We've built Samba to help you
              get past it.
            </p>
            <button
              onClick={() => openModal("booking")}
              className="poppins inline-flex items-center justify-center gap-2 w-full bg-[#042C89] hover:bg-[#071d63] text-white font-bold text-[14px] py-3 rounded-full hover:scale-[1.02] active:scale-95 transition-all duration-200 cursor-pointer"
            >
              Book a discovery call
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Dots (mobile only) */}
        <div className="flex md:hidden items-center justify-center gap-1.5 mt-5">
          {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-[6px] rounded-full transition-all duration-300 cursor-pointer ${i === active ? "w-[18px] bg-[#0DD180]" : "w-[6px] bg-[#D6DEEA]"
                }`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default CoachWall;