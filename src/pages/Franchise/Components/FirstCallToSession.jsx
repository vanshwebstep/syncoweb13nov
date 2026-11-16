import React from "react";
import { Container } from "../../../components/common/Container";

const BASE = "https://webstepdev.com/demo/syncoWebsiteImages/franchise";
const SECTION_BG = `${BASE}/franchisepartnerbg.png`;
const BOX_BG = `${BASE}/firstcalltosessionbg.png`;
const GREEN_CHECK = `${BASE}/greenchek.png`;
const BLUE_CHECK = `${BASE}/bluechek.png`;
const steps = [
  { num: "1", title: "Apply", desc: "Tell us about yourself" },
  {
    num: "2",
    title: "Discovery call",
    desc: "Your ambition. Our opportunity.",
  },
  {
    num: "3",
    title: "Discovery presentation",
    desc: "Explore the business and Financial Blueprint",
    descMobile: "The business and Financial Blueprint",
  },
  {
    num: "4",
    title: "Discovery Day",
    desc: "Business and practical assessments",
  },
  { num: "5", title: "Verdict", desc: "Agree your territory and next steps" },
  {
    num: "6",
    title: "Onboard and launch",
    desc: "Get trained. Get ready. Get going.",
  },
];
const cards = [
  {
    title: "What we look for",
    titleColor: "#0DD180",
    border: "#0DD180",
    check: GREEN_CHECK,
    items: [
      "Entrepreneurial mindset",
      "Driven to succeed",
      "Resilient and reliable",
      "Great with people",
    ],
  },
  {
    title: "What you’ll bring",
    titleColor: "#00A6E3",
    border: "#00A6E3",
    check: GREEN_CHECK,
    items: [
      "A passion for football",
      "Great with children",
      "Ambition to grow",
    ],
  },
  {
    title: "Experience",
    titleColor: "#00A6E3",
    border: "#00A6E3",
    check: BLUE_CHECK,
    items: [
      "3–5 years coaching children",
      "Experience leading coaches",
      "Comfortable with parents",
      "Business experience a bonus",
    ],
  },
  {
    title: "Your role",
    titleColor: "#0DD180",
    border: "#0DD180",
    check: GREEN_CHECK,
    items: [
      "Build and lead your team",
      "Grow venues and memberships",
      "Maintain Samba standards",
      "Take ownership of your territory",
    ],
  },
];
function InfoCard({ card }) {
  return (
    <div
      className="bg-white rounded-[28px] w-full max-w-[332px] md:border-transparent  px-6 pt-6 pb-7 text-left border-2 border-[#E3E8F0]
             md:shadow-[10px_10px_0_0_var(--card-border)]"
      style={{ "--card-border": card.border }}
    >
      <h3
        className="gasoek text-[22px] sm:text-[26.65px] leading-tight mb-4"
        style={{ color: card.titleColor }}
      >
        {card.title}
      </h3>
      <ul className="space-y-2.5">
        {card.items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <img
              src={card.check}
              alt=""
              className="w-[16px] h-[16px] mt-[6px] shrink-0 object-contain"
            />
            <span className="poppins text-[#475569] text-[15px] font-semibold sm:text-[16.96px] leading-[1.4]">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
export function FirstCallToSession() {
  return (
   <section
  className="relative bg-[#F6F8FC] pb-0 w-full py-16 md:py-24 bg-[#F6F6F6] bg-cover bg-center bg-no-repeat overflow-hidden
             sm:bg-[image:var(--section-bg)]"
  style={{ "--section-bg": `url(${SECTION_BG})` }}
>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 mb-16 md:mb-40 items-start">
          {/* Left */}
          <div className="lg:col-span-5 text-left mt-5">
            <h2 className="text-[48px] sm:text-[48px] lg:text-[56px] leading-[1.1] mb-6">
              <span className="recline text-[#042C89] block">Could you</span>
              <span className="recline text-[#042C89] block">be our next</span>
              <span className="gasoek uppercase pb-3 text-[#00A6E3] block">
                Franchise
              </span>
              <span className="gasoek uppercase text-[#00A6E3] block">
                Partner?
              </span>
            </h2>

            <h3 className="poppins font-bold text-[#042C89] text-[15px] sm:text-[18px] mb-3">
              You know football. We’ll teach you the business.
            </h3>

            <p className="poppins text-[#042C89] text-[15px] sm:text-[18px] font-medium leading-[1.5] max-w-[420px]">
              We’re looking for ambitious coaches with the drive, personality
              and determination to build something of their own.
            </p>
          </div>

          {/* Right: 2 staggered columns */}
          <div className="lg:col-span-7 flex flex-col sm:flex-row items-center sm:items-start justify-center lg:justify-start gap-6 sm:gap-8">
            <div className="flex flex-col gap-8 w-full items-center">
              <InfoCard card={cards[0]} />
              <InfoCard card={cards[2]} />
            </div>
            <div className="flex flex-col gap-8 w-full items-center sm:mt-0">
              <InfoCard card={cards[1]} />
              <InfoCard card={cards[3]} />
            </div>
          </div>
        </div>
        {/* Blue-green textured frame */}
     <div
  className="rounded-[36px] sm:rounded-[44px] p-4 sm:p-6 lg:p-7  bg-cover bg-center
             sm:bg-[image:var(--box-bg)]"
  style={{ "--box-bg": `url(${BOX_BG})` }}
>
          {/* White inner card */}
          <div
            className="md:bg-white rounded-[28px] sm:rounded-[36px] px-5 sm:px-10 lg:px-12 pt-10 sm:pt-12 pb-10 sm:pb-14 text-center"
            style={{ backgroundImage: `url(${SECTION_BG})` }}
          >
            {/* Mobile label */}
            <div className="sm:hidden poppins text-[#0DD180] font-semibold text-[11px] tracking-[0.08em] uppercase mb-2">
              Your road to ownership
            </div>

            <h2 className="text-[34px] sm:text-[46px] lg:text-[56px] leading-[1.1] mb-8 sm:mb-12 lg:mb-16">
              <span className="recline text-[#042C89] block">
                From first call
              </span>
              <span className="gasoek text-[#0DD180] block text-[30px] md:text-[56px]">
                to first session.
              </span>
            </h2>

            {/* ================= MOBILE timeline (zigzag) ================= */}
            <div className="sm:hidden relative">
              <svg
                className="absolute top-0 left-[36px] right-[36px] h-full w-[calc(100%-72px)] overflow-visible z-0"
                viewBox="0 0 100 600"
                preserveAspectRatio="none"
                fill="none"
              >
                <path
                  d="M0 50 C0 100, 100 100, 100 150
                     C100 200, 0 200, 0 250
                     C0 300, 100 300, 100 350
                     C100 400, 0 400, 0 450
                     C0 500, 100 500, 100 550"
                  stroke="#FFDE14"
                  strokeWidth="4"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              <div className="relative z-10">
                {steps.map((s, i) => {
                  const isRight = i % 2 === 1;
                  const isLast = i === steps.length - 1;
                  return (
                    <div
                      key={s.num}
                      className={`h-[100px]  flex items-center gap-3 ${
                        isRight ? "flex-row-reverse text-right" : "text-left"
                      }`}
                    >
                      <div
                        className="w-[56px] h-[56px] shrink-0 rounded-full flex items-center justify-center border-4 border-white shadow-[0_4px_10px_rgba(4,44,137,0.2)]"
                        style={{
                          backgroundColor: isLast ? "#0DD180" : "#042C89",
                        }}
                      >
                        <span className="gasoek text-white text-[20px] leading-none">
                          {s.num}
                        </span>
                      </div>

                      <div className="min-w-0">
                        <h3 className="recline text-[#042C89] font-bold text-[16px] leading-tight mb-0.5">
                          {s.title}
                        </h3>
                        <p className="poppins text-[#475569] text-[11.5px] md:text-[12.5px] font-medium leading-[1.35]">
                          {s.descMobile || s.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ================= SM+ timeline (original) ================= */}
            <div className="hidden sm:block relative">
              <svg
                className="hidden lg:block absolute top-3 left-0 w-full h-[90px] z-0"
                viewBox="0 0 600 90"
                preserveAspectRatio="none"
                fill="none"
              >
                <path
                  d="M0 20 L50 20 C100 20 100 70 150 70 C200 70 200 20 250 20 C300 20 300 70 350 70 C400 70 400 20 450 20 C500 20 500 70 550 70"
                  stroke="#FFDE14"
                  strokeWidth="4"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-10 lg:gap-x-2 items-start">
                {steps.map((s, i) => {
                  const isDown = i % 2 === 1;
                  const isLast = i === steps.length - 1;
                  return (
                    <div
                      key={s.num}
                      className={`flex flex-col items-center text-center ${
                        isDown ? "lg:mt-[50px]" : ""
                      }`}
                    >
                      <div
                        className="w-[70.24px] h-[68px] rounded-full flex items-center border border-4  border-white justify-center mb-3"
                        style={{
                          backgroundColor: isLast ? "#0DD180" : "#042C89",
                        }}
                      >
                        <span className="gasoek text-white text-[24px] leading-none">
                          {s.num}
                        </span>
                      </div>

                      <h3 className="recline text-[#042C89] font-bold text-[19px] leading-tight mb-1.5 max-w-[150px]">
                        {s.title}
                      </h3>

                      <p className="poppins text-[#475569] text-[14px] font-semibold leading-[1.4] max-w-[165px]">
                        {s.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default FirstCallToSession;