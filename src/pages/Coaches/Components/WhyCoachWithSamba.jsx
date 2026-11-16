// WhyCoachWithSamba.jsx
import React, { useRef, useState, useEffect } from "react";
import { Container } from "../../../components/common/Container";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* ====== REPLACE THESE PATHS LATER ====== */
const BG_DESKTOP = "https://webstepdev.com/demo/syncoWebsiteImages/coaches/why-coach-image.png"; // green wave + blue corners
const BG_MOBILE = "https://webstepdev.com/demo/syncoWebsiteImages/coaches/why-coach-mobile.png";
const LOGO = "https://webstepdev.com/demo/syncoWebsiteImages/coaches/ball.png";

const CARD_IMG_1 = "https://webstepdev.com/demo/syncoWebsiteImages/coaches/img-competitive-rates.png"; // Competitive Rates
const CARD_IMG_2 = "https://webstepdev.com/demo/syncoWebsiteImages/coaches/img-training-and-support.png"; // Training & Support
const CARD_IMG_3 = "https://webstepdev.com/demo/syncoWebsiteImages/coaches/img-premade-session-plans.png"; // Pre-made Session Plans
const CARD_IMG_4 = "https://webstepdev.com/demo/syncoWebsiteImages/coaches/img-fun-benefits.png"; // Fun
/* ======================================= */

const CARDS = [
  {
    img: CARD_IMG_1,
    title: "Competitive Rates",
    text: "Get rewarded properly for your time, energy and experience.",
    titleColor: "text-[#00A6E3]",
    border: "border-[#00A6E3]",
    shadow: "shadow-[4px_4px_0_0_#FFE01B]",
  },
  {
    img: CARD_IMG_2,
    title: "Training & Support",
    text: "We'll help you become a better coach with ongoing training, feedback and support.",
    titleColor: "text-[#0DD180]",
    border: "border-[#FFDE14]",
    shadow: "shadow-[4px_4px_0_0_#00A6E3]",
  },
  {
    img: CARD_IMG_3,
    title: "Pre-made Session Plans",
    text: "We give you the session plans and Samba Method. You focus on bringing them to life.",
    titleColor: "text-[#00A6E3]",
    border: "border-[#00A6E3]",
    shadow: "shadow-[4px_4px_0_0_#FFE01B]",
  },
  {
    img: CARD_IMG_4,
    title: "Fun",
    text: "Music. Energy. Personality. Football should be fun for the coach too.",
    titleColor: "text-[#0DD180]",
    border: "border-[#FFE01B]",
    shadow: "shadow-[4px_4px_0_0_#FFE01B]",
  },
];

const Card = ({ img, title, text, border, shadow, titleColor }) => (
  <div
    className={`
      flex h-full border-r-[6px] md:border-r-[7px] xl:border-r-[8px] border-b-[6px] md:border-b-[7px] xl:border-b-[8px]
      px-5 sm:px-6 py-5 sm:py-6 flex-col overflow-hidden justify-between
      rounded-[28px] sm:rounded-[32px] lg:rounded-[36px] xl:rounded-[40px] bg-white
      ${border} 
    `}
  >
    <div className="flex justify-center">
      <img
        src={img}
        alt={title}
        className="block w-full max-h-[150px] sm:max-h-[170px] xl:max-h-[190px] object-contain select-none"
      />
    </div>

    <div className="flex flex-1 flex-col pt-3">
      <h3 className={`gasoek text-[18px] sm:text-[20px] lg:text-[21px] xl:text-[24px] tracking-[1%] leading-tight ${titleColor}`}>
        {title}
      </h3>
      <p className="mt-2 poppins text-[12.5px] sm:text-[13px] xl:text-[14px] leading-[1.5] text-[#27364B]">
        {text}
      </p>
    </div>
  </div>
);

const WhyCoachWithSamba = () => {
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
      className="
        relative isolate w-full overflow-hidden bg-[#2BC57F]
        bg-cover bg-top bg-no-repeat
        bg-[image:var(--bg-mobile)] md:bg-[image:var(--bg-desktop)]
      "
      style={{
        "--bg-desktop": `url(${BG_DESKTOP})`,
        "--bg-mobile": `url(${BG_MOBILE})`,
      }}
    >
      <Container className="py-14 sm:py-16 md:py-20 lg:py-24">
        <img src={LOGO} alt="Samba Soccer Schools" className="block md:hidden w-[240px] -mt-[30px] mb-4" />
        {/* HEADING */}
        <h2 className="text-center leading-[1.15] md:leading-[1.2]">
          <span
            className="
              block gasoek md:text-white text-[#042C89]
              text-[32px] sm:text-[38px] md:text-[40px] lg:text-[46px] xl:text-[52px]
            "
          >
            Why coach with <span className="inline md:hidden">Samba</span>
          </span>
          <span
            className="
              mt-1 block recline font-bold text-white md:text-[#042C89]
              text-[30px] sm:text-[36px] md:text-[38px] lg:text-[44px] xl:text-[50px]
            "
          >
           <span className="hidden md:inline">Samba </span>Soccer Schools?
          </span>
        </h2>

        {/* CARDS: TABLET/MOBILE HAS HORIZONTAL SCROLL (3 BY DEFAULT ON TABLET), DESKTOP (LG+) HAS 4-COL GRID WITHOUT SCROLL */}
        <div
          ref={carouselRef}
          className="
            mt-8 sm:mt-10 md:mt-12
            flex gap-4 md:gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-3 pt-1 px-1
            [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
            lg:grid lg:grid-cols-4 lg:gap-5 xl:gap-6 lg:overflow-visible lg:snap-none lg:pb-0 lg:pt-0 lg:px-0
          "
        >
          {CARDS.map((card) => (
            <div
              key={card.title}
              className="
                w-[75%] sm:w-[calc((100%-16px)/2)] min-[767px]:w-[calc((100%-32px)/3)]
                lg:w-auto lg:shrink
                shrink-0 snap-start flex flex-col
              "
            >
              <Card {...card} />
            </div>
          ))}
        </div>

       
      </Container>
    </section>
  );
};

export default WhyCoachWithSamba;