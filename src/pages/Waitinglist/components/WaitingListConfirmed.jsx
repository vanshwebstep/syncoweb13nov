import React from "react";
import { Container } from "../../../components/common/Container";

const BASE = "https://webstepdev.com/demo/syncoWebsiteImages/waitinglist";
const IMG = {
  hero: `${BASE}/offerexpiredhero.png`,
  heroMobile: `${BASE}/offerexpiredheromobile.png`,
  whiteLine: `${BASE}/whiteunderline.png`,
  yellowLine: `${BASE}/yellowunderline.png`,
  brownClock: `${BASE}/brownclock.png`,
  skyClock: `${BASE}/skyblueclock.png`,
  user: `${BASE}/user.png`,
  nextArrow: `${BASE}/whitenextarrow.png`,
  chat: `${BASE}/chat.png`,
};

/* Sirf standalone preview ke liye fallback — real flow mein WhoJoining ka data aata hai */
const DEFAULT_VENUE = {
  name: "Wimbledon",
  day: "Tuesdays",
  shortDay: "Tue",
  time: "4:00pm",
  address: "Pelham Road, London SW19 1NX",
  slots: {
    "4–5s": "4:00 – 5:00pm",
    "6–7s": "5:00 – 6:00pm",
    "8–9s": "6:00 – 7:00pm",
    "10–12s": "7:00 – 8:00pm",
  },
};
const DEFAULT_KIDS = [{ firstName: "Leo", group: "4–5s" }];

/* ---------- Helpers ---------- */
function calcAge(d, m, y) {
  if (!d || !m || !y || String(y).length !== 4) return null;
  const dt = new Date(+y, +m - 1, +d);
  if (
    dt.getFullYear() !== +y ||
    dt.getMonth() !== +m - 1 ||
    dt.getDate() !== +d ||
    dt > new Date()
  )
    return null;
  const now = new Date();
  let age = now.getFullYear() - dt.getFullYear();
  const md = now.getMonth() - dt.getMonth();
  if (md < 0 || (md === 0 && now.getDate() < dt.getDate())) age--;
  return age;
}

function groupFor(age) {
  if (age == null) return null;
  if (age >= 4 && age <= 5) return "4–5s";
  if (age >= 6 && age <= 7) return "6–7s";
  if (age >= 8 && age <= 9) return "8–9s";
  if (age >= 10 && age <= 12) return "10–12s";
  return null;
}

const groupToYears = (g) => (g ? `${g.replace(/s$/, "")} Years` : "");

// ["Leo"] -> "Leo" | ["Leo","Mia"] -> "Leo & Mia" | 3+ -> "Leo, Mia & Zoe"
const joinNames = (names) => {
  if (names.length <= 1) return names[0] || "";
  return `${names.slice(0, -1).join(", ")} & ${names[names.length - 1]}`;
};

const MailIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="M3.5 7l8.5 6 8.5-6" />
  </svg>
);

const CheckSvg = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0DD180" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);

/* line1 = 28px (recline navy), line2 = 30px (gasoek, colour prop se) */
function SectionHeading({ line1, line2, line2Color = "text-[#0DD180]" }) {
  return (
    <h2 className="mb-6">
      <span className="recline block text-[#042C89] font-bold text-[24px] sm:text-[28px] leading-[1.1]">
        {line1}
      </span>
      <span className="relative inline-block">
        <span className={`gasoek block text-[26px] sm:text-[30px] leading-[1.15] ${line2Color}`}>
          {line2}
        </span>
        <img src={IMG.yellowLine} alt="" className="block w-0 min-w-full h-auto -mt-1" />
      </span>
    </h2>
  );
}

const WaitingPill = () => (
  <span className="poppins inline-flex items-center gap-1.5 bg-[#FFF4E0] text-[#9A5B00] text-[12px] font-semibold px-2.5 py-1 rounded-full">
    <span className="w-[6px] h-[6px] rounded-full bg-[#F5A524]" />
    On the waiting list
  </span>
);

/*
  Props (WhoJoining ke onComplete se seedha aate hain):
    venue   - { name, address, day, shortDay, time, slots, alternative?, nearby? }
    kids    - [{ firstName, lastName, dd, mm, yyyy, ... }]
    parent  - { firstName, lastName, email, ... }
    email   - account email (parent.email fallback)
    nearby  - optional [{ name, distance, slot, ageGroup }] (venue.nearby / venue.alternative fallback)
*/
const WaitingListConfirmed = ({
  venue = DEFAULT_VENUE,
  kids = DEFAULT_KIDS,
  parent,
  email,
  nearby,
  onTrial,
  onAccount,
  onManage,
  whatsappUrl = "https://wa.me/442072052723",
}) => {
  /* ----- children ----- */
  const kidList = (kids.length ? kids : DEFAULT_KIDS).map((c) => {
    const group = c.group || groupFor(calcAge(c.dd, c.mm, c.yyyy));
    return {
      name: (c.firstName || "").trim(),
      ageGroup: groupToYears(group),
      slot:
        group && venue.slots?.[group]
          ? `${venue.shortDay} ${venue.slots[group]}`
          : venue.shortDay
          ? `${venue.shortDay} ${venue.time || ""}`.trim()
          : "",
    };
  });

  const names = kidList.map((k) => k.name).filter(Boolean);
  const namesText = joinNames(names) || "Your child";
  const headline = namesText.toUpperCase();
  const plural = names.length > 1;
  const possessive = `${namesText}’s`;

  const shownEmail = email || parent?.email || "";

  /* ----- nearby venues ----- */
  const firstAgeGroup = kidList[0]?.ageGroup || "";
  const nearbyList =
    nearby ||
    venue.nearby ||
    (venue.alternative
      ? [{ name: venue.alternative.name, slot: venue.alternative.day, ageGroup: firstAgeGroup }]
      : []);

  const steps = [
    { title: "We text and email you a link", desc: "The moment a space opens up" },
    { title: "Log in to your Samba account", desc: `Book ${possessive} FREE trial within 24 hours` },
    {
      title: "Miss it? No problem",
      desc: plural ? `${namesText} go back on the list` : `${namesText} goes back on the list`,
    },
  ];

  /* WhatsApp + manage: mobile mein Can't-wait ke baad, desktop mein right column ke neeche */
  const helpBlock = (
    <>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="poppins w-full h-[46px] bg-white border-2 border-[#0DD180] text-[#042C89] font-bold text-[14px] sm:text-[15px] rounded-full inline-flex items-center justify-center gap-2 hover:bg-[#E7FAF2] transition-colors mb-5"
      >
        <img src={IMG.chat} alt="" className="w-[16px] h-[16px] object-contain" />
        Questions? WhatsApp us
      </a>

      <div className="text-center">
        <button
          type="button"
          onClick={() => onManage?.()}
          className="poppins text-[#00A6E3] font-bold text-[13px] sm:text-[14px] hover:underline cursor-pointer"
        >
          Manage or leave the waiting list
        </button>
      </div>
    </>
  );

  return (
    <div className="w-full bg-[#F6F8FC]">
      {/* ---------- HERO ---------- */}
      <section className="relative w-full bg-[#00A6E3] overflow-hidden">
        {/* Mobile: heroMobile | sm (640px) and up: hero */}
        <picture>
          <source media="(min-width: 640px)" srcSet={IMG.hero} />
          <img
            src={IMG.heroMobile}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
          />
        </picture>

        <Container className="relative z-10">
          <div className="text-center pt-8 pb-12 sm:pt-12 sm:pb-20 lg:pt-14 lg:pb-24">
            {/* Check circle */}
            <span className="w-[52px] h-[52px] sm:w-[60px] sm:h-[60px] rounded-full bg-white inline-flex items-center justify-center mb-4 shadow-[0_6px_18px_rgba(4,44,137,0.15)]">
              <CheckSvg />
            </span>

            <span className="poppins block text-[#FFDE14] font-semibold text-[12px] sm:text-[16.52px] tracking-wide uppercase mb-3 sm:mb-4">
              Waiting list confirmed
            </span>

            <h1 className="gasoek text-[#FFDE14] uppercase text-[40px] sm:text-[48px] lg:text-[53.82px] leading-[1] mb-2 break-words">
              {headline}
            </h1>

            <div className="inline-block">
              <p className="gasoek text-white uppercase text-[26px] sm:text-[34px] lg:text-[39.87px] leading-[1.1]">
                {plural ? "are on the list" : "is on the list"}
              </p>
              <img src={IMG.whiteLine} alt="" className="block w-0 min-w-full h-auto -mt-1" />
            </div>

            {shownEmail && (
              <div className="mt-6 sm:mt-8">
                <span className="poppins inline-flex items-center gap-2 bg-white/25 text-white text-[12px] sm:text-[13px] font-semibold px-4 py-2 rounded-full max-w-full">
                  <MailIcon />
                  <span className="truncate">Details sent to {shownEmail}</span>
                </span>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* ---------- BODY ---------- */}
      <section className="py-8 md:py-14">
        <Container>
          {/*
            Mobile order : venue card -> what happens next -> can't wait -> whatsapp/manage
            Desktop      : left = venue card + can't wait | right = what happens next + account + whatsapp
          */}
          <div className="max-w-[1000px] mx-auto text-left flex flex-col gap-8 lg:grid lg:grid-cols-[minmax(0,1fr)_380px] lg:grid-rows-[auto_1fr] lg:gap-x-14 lg:gap-y-10">
            {/* A: Venue card */}
            <div className="lg:col-start-1 lg:row-start-1 bg-white rounded-[22px] border border-[#E6EAF3] shadow-[0_8px_24px_rgba(4,44,137,0.06)] p-4 sm:p-6 self-start">
              <div className="flex items-center gap-4 sm:gap-5">
                <span className="w-[56px] h-[56px] sm:w-[88px] sm:h-[88px] rounded-[14px] sm:rounded-[18px] bg-[#FFF4E0] flex items-center justify-center shrink-0">
                  <img src={IMG.brownClock} alt="" className="w-[24px] h-[24px] sm:w-[34px] sm:h-[34px] object-contain" />
                </span>
                <div className="min-w-0">
                  <h3 className="poppins text-[#042C89] font-bold text-[16px] sm:text-[20px] leading-tight">
                    {venue.name}
                  </h3>
                  <p className="poppins text-[#797A88] text-[12px] sm:text-[13px] mb-1.5 sm:mb-2">{venue.address}</p>
                  <div className="space-y-1 sm:mb-2">
                    {kidList.map((k, i) => (
                      <p
                        key={i}
                        className="poppins flex items-center gap-1.5 text-[#042C89] text-[12px] sm:text-[14px] font-bold"
                      >
                        <img src={IMG.user} alt="" className="w-[13px] h-[13px] sm:w-[14px] sm:h-[14px] object-contain shrink-0" />
                        <span>
                          {k.name || `Child ${i + 1}`}
                          {k.ageGroup ? ` · ${k.ageGroup}` : ""}
                          {k.slot ? ` · ${k.slot}` : ""}
                        </span>
                      </p>
                    ))}
                  </div>
                  <div className="hidden sm:block">
                    <WaitingPill />
                  </div>
                </div>
              </div>
              {/* Mobile: pill sits below the row */}
              <div className="mt-3 sm:hidden">
                <WaitingPill />
              </div>
            </div>

            {/* B: What happens next (+ account + help on desktop) */}
            <aside className="lg:col-start-2 lg:row-start-1 lg:row-span-2 w-full">
              <SectionHeading line1="What happens" line2="next." line2Color="text-[#00A6E3]" />

              {/* Steps */}
              <div className="relative lg:mb-8">
                <div className="absolute left-[13px] top-[14px] bottom-[14px] border-l-2 border-dashed border-[#0DD180]/50" />
                <div className="space-y-6">
                  {steps.map((s, i) => (
                    <div key={s.title} className="relative flex items-start gap-4">
                      <span className="poppins relative z-10 w-[28px] h-[28px] rounded-full bg-[#0DD180] text-white text-[12px] font-bold flex items-center justify-center shrink-0 ring-4 ring-[#F6F8FC]">
                        {i + 1}
                      </span>
                      <div>
                        <p className="poppins text-[#042C89] font-bold text-[14px] sm:text-[16px] leading-tight">{s.title}</p>
                        <p className="poppins text-[#797A88] text-[12px] sm:text-[14px] mt-0.5">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Account card (desktop only) */}
              <div className="hidden lg:block bg-[#042C89] rounded-[18px] p-5 mb-4">
                <h4 className="poppins text-white font-bold text-[18px] leading-tight">
                  Your Samba account is ready
                </h4>
                <p className="poppins text-[#C9D3F0] text-[14px] mt-1 mb-4">
                  Manage bookings and the waiting list.
                </p>
                <button
                  type="button"
                  onClick={() => onAccount?.()}
                  className="poppins w-full h-[46px] bg-[#FFDE14] hover:bg-[#ffe338] text-[#042C89] font-bold text-[15px] rounded-full inline-flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
                >
                  Go to my Samba account
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </button>
              </div>

              {/* Help (desktop) */}
              <div className="hidden lg:block">{helpBlock}</div>
            </aside>

            {/* C: Can't wait */}
            {nearbyList.length > 0 && (
              <div className="lg:col-start-1 lg:row-start-2">
                <SectionHeading line1="Can’t wait?" line2="start sooner." />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {nearbyList.map((v) => (
                    <div
                      key={v.name}
                      className="bg-white rounded-[18px] border border-[#E6EAF3] p-4 shadow-[0_6px_18px_rgba(4,44,137,0.05)]"
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <h4 className="poppins text-[#042C89] font-bold text-[16px] sm:text-[17px] leading-tight">{v.name}</h4>
                        {v.distance && (
                          <span className="poppins bg-[#E6F4FB] text-[#042C89] text-[12px] font-semibold px-2.5 py-1 rounded-full shrink-0">
                            {v.distance}
                          </span>
                        )}
                      </div>
                      <p className="poppins inline-flex items-center gap-1.5 text-[#042C89] text-[12px] sm:text-[13px] font-semibold mb-2">
                        <img src={IMG.skyClock} alt="" className="w-[13px] h-[13px] object-contain" />
                        {[v.slot, v.ageGroup || firstAgeGroup].filter(Boolean).join(" · ")}
                      </p>
                      <div className="mb-3">
                        <span className="poppins inline-flex items-center gap-1.5 bg-[#E7FAF2] text-[#067A4B] text-[12px] font-semibold px-2.5 py-1 rounded-full">
                          <span className="w-[6px] h-[6px] rounded-full bg-[#0DD180]" />
                          Spaces available
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => onTrial?.(v)}
                        className="poppins w-full h-[42px] bg-[#042C89] hover:bg-[#071d63] text-white font-bold text-[14px] rounded-full inline-flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
                      >
                        Book a FREE trial here
                        <img src={IMG.nextArrow} alt="" className="w-[14px] h-[14px] object-contain" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* D: Help (mobile) */}
            <div className="lg:hidden">{helpBlock}</div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default WaitingListConfirmed;