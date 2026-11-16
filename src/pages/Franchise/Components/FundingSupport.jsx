import React, { useState, useMemo } from "react";
import { Container } from "../../../components/common/Container";
import { useModal } from "../../../context/ModalContext";

const BASE = "https://webstepdev.com/demo/syncoWebsiteImages/franchise";
const BG_IMAGE = `${BASE}/fundingsupportbg.png`;
const BG_IMAGE_MOBILE = `${BASE}/four_mb.png`;
const BBB_LOGO = `${BASE}/britishbusinesslogo.png`;
const GREEN_LINE = `${BASE}/forwardgreenline.png`;
const SQUARE_CHECK = `${BASE}/greensquarecheck.png`;
const ROUND_CHECK = `${BASE}/greenroundcheck.png`;

const RATE = 7.5; // % p.a.
const MIN_AMOUNT = 500;
const MAX_AMOUNT = 25000;
const AMOUNT_STEP = 500;
const MIN_TERM = 12;
const MAX_TERM = 60;

const supportPoints = [
  {
    title: "Dedicated funding support",
    desc: "Our in-house funding adviser guides you through the application, from start to finish.",
  },
  {
    title: "Business plan preparation",
    desc: "We'll help you put together your business plan, financial forecasts and supporting documents.",
  },
  {
    title: "Step-by-step guidance",
    desc: "We'll help you prepare everything correctly before you submit, so you're never left guessing.",
  },
];

const chips = ["Up to £25,000", "Fixed 7.5% p.a.", "1–5 year term"];

const gbp = (n, decimals = 0) =>
  "£" +
  n.toLocaleString("en-GB", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

function calculate(amount, months) {
  const r = RATE / 100 / 12;
  const monthly = (amount * r) / (1 - Math.pow(1 + r, -months));
  const total = monthly * months;
  return { monthly, total, interest: total - amount };
}

function Stepper({ children, onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="w-[44px] h-[44px] shrink-0 rounded-[12px] bg-[#042C89] hover:bg-[#071d63] text-white flex items-center justify-center transition-colors cursor-pointer"
    >
      {children}
    </button>
  );
}

const MinusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
    <path d="M5 12h14" />
  </svg>
);
const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
    <path d="M12 5v14M5 12h14" />
  </svg>
);

function SliderRow({ question, valueLabel, min, max, step, value, onChange, minLabel, maxLabel }) {
  const pct = ((value - min) / (max - min)) * 100;
  const clamp = (v) => Math.min(max, Math.max(min, v));

  return (
    <div className="mb-7">
      <div className="flex md:flex-row flex-col items-center justify-between gap-3 mb-3">
        <h4 className="poppins font-bold text-[#042C89] text-[15px] sm:text-[17px] leading-snug">
          {question}
        </h4>
        <div className="poppins w-full md:w-max font-semibold text-[#042C89] text-[18px] border border-[#E5EAF3] rounded-[12px] px-5 py-2 min-w-[108px] text-center shrink-0">
          {valueLabel}
        </div>
      </div>

      <div className="flex items-end gap-3">
        <Stepper label="Decrease" onClick={() => onChange(clamp(value - step))}>
          <MinusIcon />
        </Stepper>

        <div className="flex-1">
          <div className="flex justify-between poppins text-[#475569] text-[12px] mb-1">
            <span>{minLabel}</span>
            <span>{maxLabel}</span>
          </div>
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="funding-range w-full"
            style={{
              background: `linear-gradient(to right, #0DD180 ${pct}%, #E5EAF3 ${pct}%)`,
            }}
          />
        </div>

        <Stepper label="Increase" onClick={() => onChange(clamp(value + step))}>
          <PlusIcon />
        </Stepper>
      </div>
    </div>
  );
}

export function FundingSupport() {
  const { openModal } = useModal();
  const [amount, setAmount] = useState(20000);
  const [months, setMonths] = useState(60);

  const { monthly, total, interest } = useMemo(
    () => calculate(amount, months),
    [amount, months]
  );

  const handleTalk = () => {
    const el = document.getElementById("samba-application");
    if (el) el.scrollIntoView({ behavior: "smooth" });
    else openModal("booking");
  };

  return (
    <section
      className="relative w-full py-16 md:py-24 bg-[#042C89] bg-cover bg-center bg-no-repeat overflow-hidden
             bg-[image:var(--bg-mobile)] md:bg-[image:var(--bg-desktop)]"
      style={{
        "--bg-mobile": `url(${BG_IMAGE_MOBILE})`,
        "--bg-desktop": `url(${BG_IMAGE})`,
      }}
    >
      {/* Range slider styling */}
      <style>{`
        .funding-range {
          -webkit-appearance: none;
          appearance: none;
          height: 8px;
          border-radius: 999px;
          outline: none;
          cursor: pointer;
        }
        .funding-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #fff;
          border: 4px solid #0DD180;
          cursor: pointer;
        }
        .funding-range::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #fff;
          border: 4px solid #0DD180;
          cursor: pointer;
        }
        .funding-range::-moz-range-track {
          background: transparent;
        }
      `}</style>

      <Container className="relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-12 lg:gap-10">
          {/* LEFT */}
          <div className="w-full lg:flex-1 lg:min-w-0 text-left">
            <span className="poppins block text-[#FFDE14] font-semibold text-[14px] tracking-wide uppercase mb-4">
              Funding support
            </span>

            <h2 className="mb-6">
              <span className="recline text-white block text-[48px] sm:text-[38px] lg:text-[46px] leading-[1.1]">
                Don’t have <br className="md:hidden block" /> the capital?
              </span>
              <span className="gasoek text-[#FFDE14] block text-[38px] sm:text-[44px] lg:text-[52px] leading-[1.1]">
                There’s a way
              </span>
              <span className="inline-block">
                <span className="gasoek text-[#FFDE14] block text-[38px] sm:text-[44px] lg:text-[52px] leading-[1.1]">
                  forward.
                </span>
                <img src={GREEN_LINE} alt="" className="md:w-[248px] w-[180px] mt-1 h-auto md:-mt-1" />
              </span>
            </h2>

            <p className="poppins font-bold text-[#FFDE14] text-[14px] sm:text-[18px] leading-[1.45] mb-3 max-w-[500px]">
              Not having the money upfront doesn’t have to stop you owning a
              Samba business.
            </p>
            <p className="poppins text-white font-bold md:font-medium text-[14px] sm:text-[18px] leading-[1.5] mb-8 max-w-[500px]">
              Through the government-backed Start Up Loans scheme, eligible
              applicants may be able to borrow up to £25,000 to help fund their
              business. And you won’t have to work it out alone.
            </p>

            <div className="space-y-8 mb-8 max-w-[500px]">
              {supportPoints.map((p) => (
                <div key={p.title} className="flex items-start gap-4">
                  <img src={SQUARE_CHECK} alt="" className="w-[32px] h-[32px] shrink-0 object-contain" />
                  <div>
                    <h3 className="recline text-[#FFDE14] text-[20px] leading-tight mb-1">
                      {p.title}
                    </h3>
                    <p className="poppins text-white text-[13px] font-semibold md:text-[15px] leading-[1.45]">
                      {p.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p className="poppins font-bold text-[#FFDE14] text-[15px] leading-[1.45] mb-6 max-w-[500px]">
              Most applications take around 6 weeks from submission to funding.
            </p>

            <p className="poppins font-bold text-white text-[20px] leading-tight">
              You bring the ambition.
            </p>
            <p className="poppins font-bold text-[#0DD180] text-[20px] leading-tight">
              We’ll help you find the way forward.
            </p>
          </div>

          {/* RIGHT: calculator card */}
          <div className="w-full lg:w-[620px] lg:max-w-[620px] lg:shrink-0 bg-white rounded-[32px] p-6 sm:p-8 text-left">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-1">
              <h3 className="recline text-[#042C89] text-[22px] sm:text-[26px] leading-tight">
                Start Up Loan calculator
              </h3>
              <img src={BBB_LOGO} alt="British Business Bank" className="w-[110px] h-[41px] object-contain shrink-0" />
            </div>
            <p className="poppins text-[#475569] text-[15px] mb-4">
              Estimate your monthly repayments.
            </p>

            {/* Chips */}
            <div className="md:flex grid grid-cols-2 flex-wrap gap-2 mb-7">
              {chips.map((c) => (
                <span
                  key={c}
                  className="poppins inline-flex items-center gap-2 bg-[#F1F5F9] text-[#042C89] font-semibold text-[11px] md:text-[13px] px-3.5 py-1.5 rounded-full"
                >
                  <img src={ROUND_CHECK} alt="" className="w-[16px] h-[16px] object-contain" />
                  {c}
                </span>
              ))}
            </div>

            {/* Sliders */}
            <SliderRow
              question="How much would you like to borrow?"
              valueLabel={gbp(amount)}
              min={MIN_AMOUNT}
              max={MAX_AMOUNT}
              step={AMOUNT_STEP}
              value={amount}
              onChange={setAmount}
              minLabel="£500"
              maxLabel="£25,000"
            />

            <SliderRow
              question="How long would you like to borrow it for?"
              valueLabel={`${months} months`}
              min={MIN_TERM}
              max={MAX_TERM}
              step={1}
              value={months}
              onChange={setMonths}
              minLabel="12 months"
              maxLabel="60 months"
            />

            {/* Repayment box */}
            <div className="bg-[#042C89] rounded-[24px] p-6 sm:p-7 mb-5">
              <span className="poppins block text-[#FFDE14] text-[12px] font-bold uppercase tracking-wide mb-2">
                Your estimated repayment
              </span>
              <div className="flex items-baseline flex-wrap gap-2 mb-5">
                <span className="gasoek text-white text-[38px] sm:text-[50px] leading-none">
                  {gbp(monthly, 2)}
                </span>
                <span className="poppins text-[#C9D3F0] text-[18px]">/ month</span>
              </div>

              <div className="space-y-2.5 poppins text-[15px]">
                <div className="flex justify-between text-[#C9D3F0]">
                  <span>Borrowing</span>
                  <span className="font-bold text-white">{gbp(amount, 2)}</span>
                </div>
                <div className="flex justify-between text-[#C9D3F0]">
                  <span>Interest at {RATE}%</span>
                  <span className="font-bold text-white">{gbp(interest, 2)}</span>
                </div>
                <div className="flex justify-between text-white font-bold border-t border-white/25 pt-3">
                  <span>Total repayment</span>
                  <span>{gbp(total, 2)}</span>
                </div>
              </div>
            </div>

            {/* Repay note */}
            <div className="relative bg-[#F6F8FC] rounded-[14px] pl-5 pr-4 py-3 mb-5">
              {/* Green line */}
              <span className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#0DD180] rounded-full" />

              <p className="poppins font-bold text-[#042C89] text-[14px] md:text-[15px] mb-0.5">
                Repay from your business income.
              </p>
              <p className="poppins text-[#475569] text-[13px] md:text-[14px] leading-[1.45]">
                Your Samba business is designed to generate recurring monthly
                revenue, so repayments can be planned into your Financial
                Blueprint from day one.
              </p>
            </div>
         
            {/* Button */}
            <button
              type="button"
              onClick={handleTalk}
              className="poppins w-full inline-flex items-center justify-center gap-2 bg-[#FFDE14] hover:bg-[#f3d300] text-[#042C89] font-bold text-[18px] h-[56px] rounded-full active:scale-[0.98] transition-all cursor-pointer mb-4"
            >
              Let’s talk about funding
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>

            <p className="poppins text-[#475569] text-[12px] leading-[1.45]">
              Estimates only, based on a fixed 7.5% annual interest rate.
              Funding is subject to credit, affordability and eligibility
              checks, and lender approval. Start Up Loans is a government-backed
              scheme and Samba Soccer Schools is not the lender.
            </p>
          </div>

        </div>
             <p className="text=[19px] font-bold block md:hidden text-[#fff] mb-1 pt-10">
              You bring the ambition.
              </p>
<p className="text=[19px] font-bold block md:hidden text-[#0DD180]">
  We’ll help you find the way forward.</p>
      </Container>
    </section>
  );
}

export default FundingSupport;