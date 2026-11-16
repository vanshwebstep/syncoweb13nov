// ToolsToLead.jsx
import React, { useRef, useState, useEffect } from "react";
import { Container } from "../../../components/common/Container";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* ====== REPLACE THESE PATHS LATER ====== */
const BG_DESKTOP = "https://webstepdev.com/demo/syncoWebsiteImages/coaches/why-coach-image.png"; // green wave + blue corners
const BG_MOBILE = "https://webstepdev.com/demo/syncoWebsiteImages/coaches/why-coach-mobile.png";
const LEAD_VECTOR = "https://webstepdev.com/demo/syncoWebsiteImages/venueManager/whiteLayer.png";

const CARD_IMG_1 = "https://webstepdev.com/demo/syncoWebsiteImages/coaches/img-competitive-rates.png"; // Competitive Rates
const CARD_IMG_2 = "https://webstepdev.com/demo/syncoWebsiteImages/coaches/img-training-and-support.png"; // Training & Support
const CARD_IMG_3 = "https://webstepdev.com/demo/syncoWebsiteImages/coaches/img-premade-session-plans.png"; // Pre-made Session Plans
const CARD_IMG_4 = "https://webstepdev.com/demo/syncoWebsiteImages/coaches/img-fun-benefits.png"; // Fun
/* ======================================= */

const CARDS = [
  {
    img: CARD_IMG_1,
    title: "Training & a Proven System",
    text: "Learn the Samba way, with a clear system for running a brilliant venue and growing it.",
    titleColor: "text-[#00A6E3]",
    border: "border-[#00A6E3]",
  },
  {
    img: CARD_IMG_2,
    title: "Leadership Experience",
    text: "Lead coaches, make decisions and take real ownership of the experience at your venue.",
    titleColor: "text-[#0DD180]",
    border: "border-[#FFDE14]",
  },
  {
    img: CARD_IMG_3,
    title: "Ongoing Support",
    text: "You'll have Samba behind you with training, feedback and support when you need it.",
    titleColor: "text-[#00A6E3]",
    border: "border-[#00A6E3]",
  },
  {
    img: CARD_IMG_4,
    title: "Make an Impact",
    text: "Help coaches grow, build relationships with families and create a place children love coming back to.",
    titleColor: "text-[#0DD180]",
    border: "border-[#FFDE14]",
  },
];

const Card = ({ img, title, text, border, titleColor }) => (
  <div
    className={`
      flex h-full border-r-[6px] md:border-r-[8px] border-b-[6px] md:border-b-[8px] px-4 sm:px-6 xl:px-7 py-5 sm:py-6 flex-col overflow-hidden justify-between rounded-[24px] sm:rounded-[32px] xl:rounded-[38px] bg-white shadow-md
      ${border} 
    `}
  >
    <div className="flex justify-center items-center h-[140px] sm:h-[160px] xl:h-[180px]">
      <img
        src={img}
        alt={title}
        className="block max-h-full w-auto object-contain select-none"
      />
    </div>

    <div className="flex flex-1 flex-col pt-3">
      <h3 className={`gasoek text-[18px] sm:text-[20px] lg:text-[20px] xl:text-[22px] 2xl:text-[24px] tracking-[1%] leading-tight ${titleColor}`}>
        {title}
      </h3>
      <p className="mt-2 poppins text-[12px] sm:text-[13px] lg:text-[12.5px] xl:text-[13.5px] 2xl:text-[14px] leading-[1.55] text-[#27364B] font-normal">
        {text}
      </p>
    </div>
  </div>
);

const ToolsToLead = () => {
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
      <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
        {/* HEADING */}
        <div className="text-center">
          <h2 className="leading-[1]">
            <span className="block recline font-bold text-[#042C89] text-[32px] sm:text-[42px] md:text-[48px] lg:text-[54px] xl:text-[62px] 2xl:text-[66.22px]">
              We give you the
            </span>
            <span className="relative inline-block gasoek text-[#FFDE14] text-[36px] sm:text-[46px] md:text-[54px] lg:text-[60px] xl:text-[68px] 2xl:text-[75px] leading-[1.05] mt-0.5">
              tools to lead
             <img src={LEAD_VECTOR} alt="" className="lg:max-w-[165px] max-w-[100px] ms-auto mt-2" />
            </span>
          </h2>

          <div className="mt-4 sm:mt-5 max-w-[620px] mx-auto text-[#042C89] poppins md:font-semibold font-bold text-[13.5px] sm:text-[15px] md:text-[16px] lg:text-[16.5px] xl:text-[18px] 2xl:text-[20px] leading-[1.55]">
            <p>You&apos;ll have real responsibility for your venue. But you won&apos;t be left to figure it out on your own.</p>
          </div>
        </div>

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
                w-[82%] sm:w-[calc((100%-16px)/2)] md:w-[calc((100%-32px)/3)]
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

export default ToolsToLead;