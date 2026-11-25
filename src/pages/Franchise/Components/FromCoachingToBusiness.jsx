import React from "react";
import { Container } from "../../../components/common/Container";

const BASE = "https://webstepdev.com/demo/syncoWebsiteImages/franchise";

const BG_IMAGE = `${BASE}/ownbusinessbg.svg`;
const BG_IMAGE_MOBILE = `${BASE}/four_mb.png`;
const FOOTBALL_IMAGE = `${BASE}/throwingfootball.png`;

const businessPillars = [
  {
    title: "Recurring revenue",
    description:
      "Families pay monthly for weekly classes, giving your business a recurring income stream.",
    image: `${BASE}/recurringrevenue.png`,
  },
  {
    title: "Community roots",
    description:
      "Build strong relationships with local schools, venues and families, becoming part of the community.",
    image: `${BASE}/communityroots.png`,
  },
  {
    title: "Room to grow",
    description:
      "Start with your first venues. Grow your team, open more and build something bigger.",
    image: `${BASE}/roomtogrow.png`,
  },
  {
    title: "Your schedule",
    description:
      "Move beyond someone else's rota and take greater control of your working life.",
    image: `${BASE}/yourschedule.png`,
  },
];

export function FromCoachingToBusiness() {
  return (
<section
  className="relative w-full py-16 md:py-28 bg-[#042C89] bg-cover bg-center bg-no-repeat overflow-hidden
             bg-[image:var(--bg-mobile)] md:bg-[image:var(--bg-desktop)]"
  style={{
    "--bg-mobile": `url(${BG_IMAGE_MOBILE})`,
    "--bg-desktop": `url(${BG_IMAGE})`,
    backgroundPosition: "center bottom",
  }}
>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column */}
          <div className="lg:col-span-5 text-left">
            <h2 className="text-[39px] sm:text-[52px] lg:text-[63px] leading-[1.1] md:mb-4 mb-2">
              <span className="recline text-white block">From coaching</span>
              <span className="recline text-white block">sessions to your</span>
              <span className="block">
                <span className="gasoek text-[#0DD180] relative inline-block">
                  own business
                  {/* Yellow swoosh underline */}
                  <img
                    src="https://webstepdev.com/demo/syncoWebsiteImages/franchise/ownbusinessyellow.png"
                    alt="Swoosh"
                    className="hidden md:block absolute -bottom-2 sm:-bottom-3 lg:-bottom-4 left-0 w-full h-auto object-contain pointer-events-none own-business-underline"
                  />
                  <img
                    src="https://webstepdev.com/demo/syncoWebsiteImages/franchise/Vector.png"
                    alt="Swoosh"
                    className="block md:hidden absolute -bottom-1.5 sm:-bottom-2 left-0 w-full h-auto object-contain pointer-events-none own-business-underline"
                  />
                </span>
              </span>
            </h2>

            <h3 className="poppins text-white font-bold text-[18] sm:text-[28px] mt-6 leading-tight md:mt-10 mb-3">
              Recurring. Local. Scalable.
            </h3>

            <p className="poppins text-white text-[14.9px] sm:text-[20px] leading-[1.45] max-w-[440px]">
              Build recurring memberships, grow your own team and expand venue
              by venue.
            </p>

            {/* Football */}
            <img
              src={FOOTBALL_IMAGE}
              alt=""
              className="mt-8 w-[200px] sm:w-[260px] h-auto hidden sm:block"
            />
          </div>

          {/* Right Cards Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5 justify-items-center">
            {businessPillars.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-[22px] p-4 sm:p-5 w-full max-w-[357px]  flex flex-col text-left"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-auto object-contain mb-6 pt-2 md:pt-0 md:mb-4"
                />

                <h4 className="gasoek uppercase text-[#00A6E3] font-normal text-[22px] sm:text-[26px] leading-tight mb-2">
                  {item.title}
                </h4>

                <p className="poppins text-[#0F1A2A] font-medium text-[15px] md:text-[16px] leading-[1.4]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default FromCoachingToBusiness;
