import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
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
  info: `${BASE}/info.png`,
  nextArrow: `${BASE}/whitenextarrow.png`,
};

function SectionHeading({ line1, line2 }) {
  return (
    <h2 className="mb-6">
      <span className="recline block text-[#042C89] font-bold text-[24px] sm:text-[28px] leading-[1.1]">
        {line1}
      </span>
      <span className="relative inline-block">
        <span className="gasoek block text-[#0DD180] text-[26px] sm:text-[30px] leading-[1.15]">
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
    Back on the waiting list
  </span>
);

export function OfferExpired({ data: propData, onTrial, onLeave }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const childName = searchParams.get('child') || propData?.childName || "Leo";
  const venueName = searchParams.get('venue') || propData?.venue?.name || "Wimbledon";
  const venueAddress = searchParams.get('address') || propData?.venue?.address || "Pelham Road, London SW19 1NX";
  const isTransfer = searchParams.get('type') === 'transfer' || propData?.type === 'transfer';
  const hoursPassedText = isTransfer ? "The 24 hours have passed" : "The 3 hours have passed";

  const handleLeave = () => {
    if (onLeave) {
      onLeave();
    } else {
      navigate('/find-a-class');
    }
  };

  const handleTrial = (v) => {
    if (onTrial) {
      onTrial(v);
    } else {
      navigate('/find-a-class');
    }
  };

  const nearby = [
    { name: "Greenwich", distance: "2.8 mi", slot: "Sat 8:00 – 9:00am", ageGroup: "4–5 Years" },
    { name: "Chelsea Academy", distance: "1.2 mi", slot: "Sat 7:15 – 8:15am", ageGroup: "4–5 Years" },
  ];

  return (
    <div className="w-full bg-[#F6F8FC]">
      {/* ---------- HERO ---------- */}
      <section className="relative w-full bg-[#00A6E3] overflow-hidden">
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
          <div className="text-center pt-10 pb-12 sm:pt-14 sm:pb-16 lg:pt-16 lg:pb-20">
            {/* Clock circle */}
            <span className="w-[56px] h-[56px] sm:w-[64px] sm:h-[64px] rounded-full bg-white inline-flex items-center justify-center mb-5 shadow-[0_6px_18px_rgba(4,44,137,0.15)]">
              <img src={IMG.skyClock} alt="" className="w-[26px] h-[26px] sm:w-[30px] sm:h-[30px] object-contain" />
            </span>

            <span className="poppins block text-[#FFDE14] font-semibold text-[12px] sm:text-[14px] tracking-wide uppercase mb-3">
              {hoursPassedText}
            </span>

            <h1 className="mb-6">
              <span className="recline block text-white font-bold text-[30px] sm:text-[40px] lg:text-[46px] leading-[1.1] mb-1">
                This space has gone
              </span>
              <span className="inline-block">
                <span className="gasoek block text-[#FFDE14] uppercase text-[26px] sm:text-[36px] lg:text-[42px] leading-[1.1]">
                  to the next family
                </span>
                <img src={IMG.whiteLine} alt="" className="block w-0 min-w-full h-auto -mt-1" />
              </span>
            </h1>

            <p className="poppins text-white text-[14px] sm:text-[16px] max-w-[560px] mx-auto leading-relaxed">
              Don’t worry — {childName} is still on the waiting list for {venueName}. You’ll get another text when a space opens.
            </p>
          </div>
        </Container>
      </section>

      {/* ---------- BODY ---------- */}
      <section className="py-8 md:py-14">
        <Container>
          <div className="max-w-[760px] mx-auto text-left">
            {/* Status card */}
            <div className="bg-white rounded-[22px] border border-[#E6EAF3] shadow-[0_8px_24px_rgba(4,44,137,0.06)] p-5 sm:p-7 mb-8 sm:mb-12">
              <div className="flex items-center justify-between mb-4">
                <span className="poppins text-[#797A88] text-[12px] sm:text-[13px] font-bold uppercase tracking-wide">
                  Waiting list status
                </span>
                <WaitingPill />
              </div>

              <div className="border-t border-[#E6EAF3] pt-4">
                <h3 className="poppins text-[#042C89] font-bold text-[16px] sm:text-[18px] leading-tight mb-1">
                  {venueName}
                </h3>
                <p className="poppins text-[#797A88] text-[12px] sm:text-[13px] mb-3">
                  {venueAddress}
                </p>

                <p className="poppins text-[#34353B] text-[13px] sm:text-[14px] flex items-center gap-2 font-semibold">
                  <span>{childName} is back in the queue for the next available space.</span>
                </p>
              </div>

              <div className="border-t border-[#E6EAF3] pt-4 mt-4 flex items-center justify-between">
                <span className="poppins text-[#797A88] text-[12px]">Changed your mind?</span>
                <button
                  type="button"
                  onClick={handleLeave}
                  className="poppins text-[#E5484D] font-bold text-[13px] hover:underline cursor-pointer"
                >
                  Leave the waiting list
                </button>
              </div>
            </div>

            {/* Nearby alternative venues */}
            <div className="space-y-4">
              <SectionHeading line1="Or try a FREE trial" line2="at a nearby venue" />

              <div className="space-y-3">
                {nearby.map((v, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-[18px] border border-[#E6EAF3] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs hover:border-[#00A6E3] transition-all"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="poppins text-[#042C89] font-bold text-[15px] sm:text-[16px]">{v.name}</h4>
                        <span className="bg-[#E6F4FB] text-[#042C89] text-[10px] font-bold px-2 py-0.5 rounded-full">
                          {v.distance}
                        </span>
                      </div>
                      <p className="poppins text-[#64748B] text-xs mt-1">
                        {v.ageGroup} · {v.slot} · Spaces available
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleTrial(v)}
                      className="poppins px-5 py-2.5 bg-[#042C89] hover:bg-[#001f70] text-white font-bold text-xs sm:text-[13px] rounded-full transition-all cursor-pointer self-start sm:self-center shrink-0"
                    >
                      Book a FREE trial →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

export default OfferExpired;