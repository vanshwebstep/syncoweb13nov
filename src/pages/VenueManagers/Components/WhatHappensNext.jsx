// WhatHappensNext.jsx
import React, { useRef, useState, useEffect } from "react";
import { Container } from "../../../components/common/Container";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* ====== REPLACE THESE PATHS LATER ====== */
const BG_IMG = "https://webstepdev.com/demo/syncoWebsiteImages/coaches/what-happens.png"; // same bg for desktop + mobile

const STEP_IMG_3 = "https://webstepdev.com/demo/syncoWebsiteImages/coaches/img-watch-a-lesson.svg"; // Apply (clipboard)
const STEP_IMG_2 = "https://webstepdev.com/demo/syncoWebsiteImages/coaches/img-phone-call.svg"; // Phone Call (headset)
const STEP_IMG_1 = "https://webstepdev.com/demo/syncoWebsiteImages/coaches/img-enquire.svg"; // Assessment (players)
const STEP_IMG_4 = "https://webstepdev.com/demo/syncoWebsiteImages/coaches/img-meet-with-us.svg"; // Join The Team
/* ======================================= */

const STEPS = [
  {
    n: 1,
    img: STEP_IMG_1,
    title: "APPLY",
    text: "Use the form below to tell us about yourself, your experience and why you'd make a great Venue Manager.",
    circle: "bg-[#0DD180]",
    titleColor: "text-[#0DD180]",
  },
  {
    n: 2,
    img: STEP_IMG_2,
    title: "LET'S TALK",
    text: "We'll have a chat about you, the role and what it means to lead a Samba venue.",
    circle: "bg-[#00A6E3]",
    titleColor: "text-[#00A6E3]",
  },
  {
    n: 3,
    img: STEP_IMG_3,
    title: "ASSESSMENT",
    text: "Show us how you lead, communicate and manage a real Samba environment.",
    circle: "bg-[#0DD180]",
    titleColor: "text-[#0DD180]",
  },
  {
    n: 4,
    img: STEP_IMG_4,
    title: "JOIN THE TEAM",
    text: "If we're right for each other, we'll get you trained in the Samba system and ready to lead your venue.",
    circle: "bg-[#00A6E3]",
    titleColor: "text-[#00A6E3]",
  },
];

const Step = ({ n, img, title, text, circle, titleColor }) => (
  <div className="flex flex-col justify-center items-center text-center h-full">
    <span
      className={`
        flex h-[48px] w-[48px] sm:h-[56px] sm:w-[56px] items-center justify-center rounded-full
        gasoek text-[24px] sm:text-[28px] text-[#042C89] shadow-sm
        ${circle}
      `}
    >
      {n}
    </span>

    <div className="mt-6 sm:mt-8 pb-4 h-[120px] md:h-[130px] flex md:max-w-[130px] m-auto text-center items-center justify-center">
      <img
        src={img}
        alt={title}
        className="block h-full w-auto max-w-full object-contain select-none"
      />
    </div>

    <h3
      className={`
        mt-3 sm:mt-4 gasoek text-[18px] sm:text-[19px] xl:text-[20px] tracking-[2%] 
        ${titleColor}
      `}
    >
      {title}
    </h3>

    <p className="mt-2 poppins font-medium text-[12.5px] sm:text-[13px] lg:text-[13.5px] xl:text-[14px] leading-[1.6] text-[#475569] max-w-[260px] mx-auto">
      {text}
    </p>
  </div>
);

const WhatHappensNext = () => {
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const el = carouselRef.current;
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

  const handleScrollLeft = () => {
    if (carouselRef.current) {
      const step = carouselRef.current.clientWidth > 700 ? carouselRef.current.clientWidth / 3 : carouselRef.current.clientWidth;
      carouselRef.current.scrollBy({ left: -step, behavior: "smooth" });
    }
  };

  const handleScrollRight = () => {
    if (carouselRef.current) {
      const step = carouselRef.current.clientWidth > 700 ? carouselRef.current.clientWidth / 3 : carouselRef.current.clientWidth;
      carouselRef.current.scrollBy({ left: step, behavior: "smooth" });
    }
  };

  return (
    <section
      className="relative isolate w-full overflow-hidden bg-white bg-cover bg-center bg-no-repeat py-14 sm:py-16 md:py-16 lg:py-24"
      style={{ backgroundImage: `url(${BG_IMG})` }}
    >
      <Container>
        {/* HEADING */}
        <h2 className="text-center leading-[1.08]">
          <span className="recline font-bold text-[#042C89] text-[34px] sm:text-[40px] md:text-[46px] lg:text-[52px] xl:text-[62px] 2xl:text-[64px]">
            What happens{" "}
          </span>
          <span className="gasoek text-[#0DD180] text-[34px] sm:text-[40px] md:text-[46px] lg:text-[52px] xl:text-[62px] 2xl:text-[64px] block md:inline">
            next?
          </span>
        </h2>

        {/* STEPS: TABLET/MOBILE HAS HORIZONTAL SCROLL (3 BY DEFAULT ON TABLET), DESKTOP (LG+) HAS 4-COL GRID WITHOUT SCROLL */}
        <div
          ref={carouselRef}
          className="
            max-w-[1240px] m-auto
            mt-10 sm:mt-14 md:mt-16
            flex items-stretch gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-3 pt-1 px-1
            [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
            lg:grid lg:grid-cols-4 lg:gap-x-6 xl:gap-x-12 2xl:gap-x-16 lg:overflow-visible lg:snap-none lg:pb-0 lg:pt-0 lg:px-0
          "
        >
          {STEPS.map((step) => (
            <div
              key={step.n}
              className="
                w-[75%] sm:w-[calc((100%-16px)/2)] md:w-[calc((100%-48px)/3)] min-[767px]:w-[calc((100%-48px)/3)]
                lg:w-auto lg:shrink
                shrink-0 snap-start flex flex-col justify-between
              "
            >
              <Step {...step} />
            </div>
          ))}
        </div>

        {/* NAVIGATION ARROW BUTTONS: TABLET & MOBILE ONLY (HIDDEN ON DESKTOP LG+) */}
        <div className="flex lg:hidden justify-end items-center gap-3 mt-4 sm:mt-5 md:mt-6 max-w-[1240px] m-auto">
          <button
            type="button"
            onClick={handleScrollLeft}
            disabled={!canScrollLeft}
            aria-label="Previous step"
            className={`w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-all duration-200 ${canScrollLeft
              ? 'bg-[#0DD180] text-white active:scale-90 shadow-md cursor-pointer hover:bg-[#0bbd73]'
              : 'bg-slate-100 text-slate-300 border border-slate-200 cursor-not-allowed opacity-60'
              }`}
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 stroke-[2.5]" />
          </button>

          <button
            type="button"
            onClick={handleScrollRight}
            disabled={!canScrollRight}
            aria-label="Next step"
            className={`w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-all duration-200 ${canScrollRight
              ? 'bg-[#0DD180] text-white active:scale-90 shadow-md cursor-pointer hover:bg-[#0bbd73]'
              : 'bg-slate-100 text-slate-300 border border-slate-200 cursor-not-allowed opacity-60'
              }`}
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 stroke-[2.5]" />
          </button>
        </div>
      </Container>
    </section>
  );
};

export default WhatHappensNext;