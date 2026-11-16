import React, { useState } from "react";
import { Container } from "../../../components/common/Container";
import { useToast } from "../../../components/common/Toaster";

const BASE = "https://webstepdev.com/demo/syncoWebsiteImages/franchise";
const BG_IMAGE = `${BASE}/ownershipbg.png`;
const ROUND_CHECK = `${BASE}/greenroundcheck.png`;

const inputClass =
  "w-full md:h-[52px] h-[45px] bg-[#F6F8FC] border border-[#D6DEEA] rounded-[14px] px-4 text-[15px] text-[#042C89] poppins placeholder-[#7A8AA8] outline-none focus:border-[#0DD180]";
const labelClass = "block poppins text-[13px] md:text-[14px] font-semibold text-[#042C89] md:mb-1.5";
const qClass = "poppins text-[14px] font-bold text-[#042C89] mb-3";

const ArrowIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

/* ---------- Options ---------- */
const DESCRIBES = ["Football coach", "Employed full-time", "Employed part-time", "Self-employed", "Business owner", "Other"];
const COACHING_EXP = ["None", "Under 2 years", "2–5 years", "5+ years"];
const MANAGED = ["Not yet", "Managed coaches", "Managed a football team", "Run my own business"];
const INVEST = ["Under £12k", "£12k–£15k", "£15k–£25k", "£25k+", "Not sure yet"];
const FUNDING = ["Yes", "Maybe", "No"];
const START = ["Within 3 months", "3–6 months", "6–12 months", "Just exploring"];
const HEARD = ["Google search", "Social media", "Friend or colleague", "Football club / FA", "Event", "Other"];
const TIME_SLOTS = ["10:00 AM", "11:30 AM", "2:00 PM", "4:30 PM", "6:00 PM"];

/* Replace with real availability (API) later. Format: YYYY-MM-DD */
const AVAILABLE_DATES = [
  "2026-10-14", "2026-10-15", "2026-10-16",
  "2026-10-20", "2026-10-21", "2026-10-22",
  "2026-10-27",
];
const CAL_YEAR = 2026;
const CAL_MONTH = 9; // October (0-indexed)

/* ---------- Small UI pieces ---------- */
function Chip({ label, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`poppins text-[14px] px-5 py-2 rounded-full border transition-colors cursor-pointer ${
        selected
          ? "bg-[#042C89] border-[#042C89] text-white"
          : "bg-white border-[#D6DEEA] text-[#042C89] hover:border-[#0DD180]"
      }`}
    >
      {label}
    </button>
  );
}

function ChipGroup({ options, value, onChange, multi }) {
  const isSel = (o) => (multi ? value.includes(o) : value === o);
  const handle = (o) => {
    if (multi) {
      onChange(value.includes(o) ? value.filter((v) => v !== o) : [...value, o]);
    } else {
      onChange(o);
    }
  };
  return (
    <div className="flex flex-wrap gap-2.5">
      {options.map((o) => (
        <Chip key={o} label={o} selected={isSel(o)} onClick={() => handle(o)} />
      ))}
    </div>
  );
}

function CheckBox({ id, checked, onChange, children }) {
  return (
    <label htmlFor={id} className="flex items-center gap-3 cursor-pointer select-none">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-[20px] h-[20px] shrink-0 appearance-none rounded-[6px] border-2 border-[#D6DEEA] bg-white checked:bg-[#0DD180] checked:border-[#0DD180] cursor-pointer"
      />
      <span className="poppins text-[13px] text-[#475569]">{children}</span>
    </label>
  );
}

/* ---------- Main ---------- */
export function RoadToOwnershipForm() {
  const toast = useToast();
  // 1 = About you, 2 = Background, 3 = Investment, 4 = Book call, 5 = Success
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    // step 1
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    postcode: "",
    territory: "",
    // step 2
    describes: [],
    coachingExp: "",
    managed: "",
    excites: "",
    // step 3
    invest: "",
    funding: "",
    start: "",
    heard: "",
    consentBusiness: false,
    consentUpdates: false,
    // step 4
    callDate: "",
    callTime: "",
  });

  const set = (key) => (e) => setFormData({ ...formData, [key]: e.target.value });
  const setVal = (key) => (val) => setFormData({ ...formData, [key]: val });

  /* ----- Validation / navigation ----- */
  const next1 = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, phone, postcode, territory } = formData;
    if (!firstName || !lastName || !email || !phone || !postcode || !territory) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setStep(2);
  };

  const next2 = (e) => {
    e.preventDefault();
    if (!formData.describes.length || !formData.coachingExp || !formData.managed) {
      toast.error("Please answer all the questions.");
      return;
    }
    setStep(3);
  };

  const next3 = (e) => {
    e.preventDefault();
    const { invest, funding, start, heard, consentBusiness } = formData;
    if (!invest || !funding || !start || !heard) {
      toast.error("Please answer all the questions.");
      return;
    }
    if (!consentBusiness) {
      toast.error("Please confirm you understand this is a business ownership opportunity.");
      return;
    }
    setStep(4);
  };

  const submitFinal = (e) => {
    e.preventDefault();
    if (!formData.callDate || !formData.callTime) {
      toast.error("Please choose a date and a time.");
      return;
    }
    setIsSubmitting(true);
    // TODO: send formData to your API here
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Your discovery call is booked!");
      setStep(5);
    }, 1000);
  };

  const resetAll = () => {
    setStep(1);
    setFormData({
      firstName: "", lastName: "", email: "", phone: "", postcode: "", territory: "",
      describes: [], coachingExp: "", managed: "", excites: "",
      invest: "", funding: "", start: "", heard: "",
      consentBusiness: false, consentUpdates: false,
      callDate: "", callTime: "",
    });
  };

  const progress = step === 1 ? "33%" : step === 2 ? "66%" : "100%";
  const tab1Active = step <= 3;
  const tab2Active = step >= 4;

  /* ----- Calendar helpers ----- */
  const daysInMonth = new Date(CAL_YEAR, CAL_MONTH + 1, 0).getDate();
  const offset = (new Date(CAL_YEAR, CAL_MONTH, 1).getDay() + 6) % 7; // Monday first
  const monthLabel = new Date(CAL_YEAR, CAL_MONTH, 1).toLocaleString("en-GB", {
    month: "long",
    year: "numeric",
  });
  const iso = (d) =>
    `${CAL_YEAR}-${String(CAL_MONTH + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

  const formattedPicked = formData.callDate
    ? new Date(formData.callDate).toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
      })
    : "";

  return (
    <section
      id="samba-application"
      className="relative w-full md:py-16 py-6 md:py-40 bg-[#042C89] bg-cover bg-bottom bg-no-repeat overflow-hidden"
      style={{ backgroundImage: `url(${BG_IMAGE})` }}
    >
      <Container className="relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-12 lg:gap-10">
          {/* LEFT */}
          <div className="w-full lg:flex-1 mt-10 lg:min-w-0 text-left">
            <span className="poppins block text-[#0DD180] font-semibold text-[14px] tracking-wide uppercase mb-5">
              Ready when you are
            </span>

            <h2 className="gasoek uppercase text-[40px] sm:text-[52px] lg:text-[62px] leading-[1.09] mb-6">
              <span className="text-white block">Start your</span>
              <span className="text-white block">road to</span>
              <span className="text-[#FFDE14] block">ownership.</span>
            </h2>

            <p className="poppins text-white text-[15px] sm:text-[20px] leading-[1.45] max-w-[420px] mb-6">
              Tell us a little about you, then choose a time for your discovery call.
            </p>

            <div className="space-y-3 mb-9">
              {[
                "Takes just two minutes to apply",
                "Discover the opportunity and Financial Blueprint",
                "No pressure. Just an initial conversation.",
              ].map((t) => (
                <div key={t} className="flex items-center gap-3">
                  <img src={ROUND_CHECK} alt="" className="w-[22px] h-[22px] shrink-0 object-contain" />
                  <span className="poppins text-white text-[14.4px] md:text-[16px] font-light">{t}</span>
                </div>
              ))}
            </div>

            <p className="poppins text-white font-bold text-[16px] mb-1">Not ready yet?</p>
            <a
              href="#prospectus"
              className="poppins font-bold text-[#0DD180] text-[16px] inline-flex items-center gap-2 hover:underline"
            >
              Download the prospectus
              <ArrowIcon />
            </a>
          </div>

          {/* RIGHT: form card */}
          <div className="w-full lg:w-[620px] lg:max-w-[620px] lg:shrink-0 bg-white rounded-[32px] p-5 sm:p-8 text-left shadow-2xl">
            {/* Tabs (hidden on success) */}
            {step !== 5 && (
              <div className="flex bg-[#F6F8FC] rounded-full p-1.5 mb-6">
                <div
                  className={`hidden md:flex-1 text-center poppins font-bold text-[13px] md:text-[15px] py-2.5 rounded-full transition-colors ${
                    tab1Active ? "bg-[#042C89] text-white" : "text-[#7A8AA8]"
                  }`}
                >
                  1. Your application
                </div>
                <div
                  className={`md:hidden flex-1 text-center poppins font-bold text-[13px] md:text-[15px] py-2.5 rounded-full transition-colors ${
                    tab1Active ? "bg-[#042C89] text-white" : "text-[#7A8AA8]"
                  }`}
                >
                   1 Application
                </div>
                <div
                  className={`hidden md:block  flex-1 text-center poppins font-bold text-[13px] md:text-[15px] py-2.5 rounded-full transition-colors ${
                    tab2Active ? "bg-[#042C89] text-white" : "text-[#7A8AA8]"
                  }`}
                >
                  2. Book your call
                </div>
                <div
                  className={`md:hidden flex-1 text-center poppins font-bold text-[13px] md:text-[15px] py-2.5 rounded-full transition-colors ${
                    tab2Active ? "bg-[#042C89] text-white" : "text-[#7A8AA8]"
                  }`}
                >
                  2. Book call
                </div>
              </div>
            )}

            {/* Step progress (steps 1-3 only) */}
            {step <= 3 && (
              <div className="flex items-center justify-between gap-6 mb-3">
                <span className="poppins text-[#0DD180] font-bold text-[12px] uppercase tracking-wide whitespace-nowrap">
                  Step {step} of 3
                </span>
                <div className="h-[8px] w-[150px] bg-[#F6F8FC] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#0DD180] rounded-full transition-all duration-300"
                    style={{ width: progress }}
                  />
                </div>
              </div>
            )}

            {/* ============ STEP 1: About you ============ */}
            {step === 1 && (
              <form onSubmit={next1}>
                <h3 className="recline text-[#042C89] text-[28px] leading-tight mb-1">About you</h3>
                <p className="poppins text-[#475569] text-[12px] md:text-[15px] mb-5">
                  Takes about two minutes. We’ll use this to arrange your discovery call.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className={labelClass}>First name</label>
                    <input type="text" required placeholder="First name" value={formData.firstName} onChange={set("firstName")} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Last name</label>
                    <input type="text" required placeholder="Last name" value={formData.lastName} onChange={set("lastName")} className={inputClass} />
                  </div>
                </div>

                <div className="mb-4">
                  <label className={labelClass}>Email address</label>
                  <input type="email" required placeholder="name@email.com" value={formData.email} onChange={set("email")} className={inputClass} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className={labelClass}>Phone number</label>
                    <input type="tel" required placeholder="07..." value={formData.phone} onChange={set("phone")} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Your postcode</label>
                    <input type="text" required placeholder="e.g. M1 1AA" value={formData.postcode} onChange={set("postcode")} className={inputClass} />
                  </div>
                </div>

                <div className="mb-6">
                  <label className={labelClass}>Where would you like to run your territory?</label>
                  <input type="text" required placeholder="Town, city or area" value={formData.territory} onChange={set("territory")} className={inputClass} />
                </div>

                <button
                  type="submit"
                  className="poppins w-full h-[52px] bg-[#0DD180] hover:bg-[#0bbb71] text-white font-bold text-[16px] rounded-full flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  Continue
                  <ArrowIcon />
                </button>
              </form>
            )}

            {/* ============ STEP 2: Your background ============ */}
            {step === 2 && (
              <form onSubmit={next2}>
                <h3 className="recline text-[#042C89] text-[28px] leading-tight mb-1">Your background</h3>
                <p className="poppins text-[#475569] text-[15px] mb-5">
                  No franchise experience needed. We just want to get to know you.
                </p>

                <div className="mb-6">
                  <p className={qClass}>What best describes you right now? (select all options that apply)</p>
                  <ChipGroup multi options={DESCRIBES} value={formData.describes} onChange={setVal("describes")} />
                </div>

                <div className="mb-6">
                  <p className={qClass}>Coaching experience</p>
                  <ChipGroup options={COACHING_EXP} value={formData.coachingExp} onChange={setVal("coachingExp")} />
                </div>

                <div className="mb-6">
                  <p className={qClass}>Have you managed people or run a business?</p>
                  <ChipGroup options={MANAGED} value={formData.managed} onChange={setVal("managed")} />
                </div>

                <div className="mb-6">
                  <p className={qClass}>What excites you most about running your own Samba business?</p>
                  <textarea
                    rows={3}
                    placeholder="A few sentences is perfect."
                    value={formData.excites}
                    onChange={set("excites")}
                    className="w-full bg-[#F6F8FC] border border-[#D6DEEA] rounded-[14px] px-4 py-3 text-[15px] text-[#042C89] poppins placeholder-[#7A8AA8] outline-none focus:border-[#0DD180] resize-none min-h-[100px]"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="poppins h-[52px] px-10 border-2 border-[#042C89] text-[#042C89] font-bold text-[16px] rounded-full hover:bg-[#F6F8FC] transition-all cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="poppins flex-1 h-[52px] bg-[#0DD180] hover:bg-[#0bbb71] text-white font-bold text-[16px] rounded-full flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    Continue
                    <ArrowIcon />
                  </button>
                </div>
              </form>
            )}

            {/* ============ STEP 3: Investment and timing ============ */}
            {step === 3 && (
              <form onSubmit={next3}>
                <h3 className="recline text-[#042C89] text-[28px] leading-tight mb-1">Investment and timing</h3>
                <p className="poppins text-[#475569] text-[15px] mb-5">
                  There are no wrong answers. This helps us understand your plans and explore the right
                  territory and funding options.
                </p>

                <div className="mb-6">
                  <p className={qClass}>How much could you potentially invest?</p>
                  <ChipGroup options={INVEST} value={formData.invest} onChange={setVal("invest")} />
                </div>

                <div className="mb-6">
                  <p className={qClass}>Would you consider funding, e.g. a Start Up Loan?</p>
                  <ChipGroup options={FUNDING} value={formData.funding} onChange={setVal("funding")} />
                </div>

                <div className="mb-6">
                  <p className={qClass}>When would you like to get started?</p>
                  <ChipGroup options={START} value={formData.start} onChange={setVal("start")} />
                </div>

                <div className="mb-6">
                  <p className={qClass}>How did you hear about us?</p>
                  <div className="relative">
                    <select
                      value={formData.heard}
                      onChange={set("heard")}
                      className={`${inputClass} appearance-none pr-12 ${formData.heard ? "" : "text-[#7A8AA8]"}`}
                    >
                      <option value="">Select an option</option>
                      {HEARD.map((h) => (
                        <option key={h} value={h}>{h}</option>
                      ))}
                    </select>
                    <svg
                      className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#042C89]"
                      width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <CheckBox
                    id="consentBusiness"
                    checked={formData.consentBusiness}
                    onChange={setVal("consentBusiness")}
                  >
                    I understand this is a business ownership opportunity, not employment.
                  </CheckBox>
                  <CheckBox
                    id="consentUpdates"
                    checked={formData.consentUpdates}
                    onChange={setVal("consentUpdates")}
                  >
                    I’m happy to receive updates about the Samba franchise opportunity.
                  </CheckBox>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="poppins h-[52px] px-10 border-2 border-[#042C89] text-[#042C89] font-bold text-[16px] rounded-full hover:bg-[#F6F8FC] transition-all cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="poppins flex-1 h-[52px] bg-[#0DD180] hover:bg-[#0bbb71] text-white font-bold text-[16px] rounded-full flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    Continue to book your call
                    <ArrowIcon />
                  </button>
                </div>
              </form>
            )}

            {/* ============ STEP 4: Book your discovery call ============ */}
            {step === 4 && (
              <form onSubmit={submitFinal}>
                <h3 className="recline text-[#042C89] text-[28px] leading-tight mb-1">
                  Book your discovery call
                </h3>
                <p className="poppins text-[#475569] text-[15px] mb-5">
                  Pick a time that suits you. It’s a relaxed 30-minute chat about you, your goals and the
                  Samba opportunity.
                </p>

                {/* Calendar */}
                <div className="bg-[#F6F8FC] border border-[#D6DEEA] rounded-[20px] px-4 sm:px-6 py-5 mb-5">
                  <div className="poppins text-center font-bold text-[#042C89] text-[16px] mb-4">
                    {monthLabel}
                  </div>

                  <div className="grid grid-cols-7 gap-y-2 text-center">
                    {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                      <div key={i} className="poppins text-[12px] font-bold text-[#042C89] mb-1">
                        {d}
                      </div>
                    ))}

                    {Array.from({ length: offset }).map((_, i) => (
                      <div key={`e${i}`} />
                    ))}

                    {Array.from({ length: daysInMonth }).map((_, i) => {
                      const day = i + 1;
                      const key = iso(day);
                      const available = AVAILABLE_DATES.includes(key);
                      const selected = formData.callDate === key;
                      return (
                        <div key={key} className="flex justify-center">
                          <button
                            type="button"
                            disabled={!available}
                            onClick={() => setFormData({ ...formData, callDate: key, callTime: "" })}
                            className={`poppins w-[36px] h-[36px] rounded-full text-[14px] flex items-center justify-center transition-colors ${
                              selected
                                ? "bg-[#042C89] text-white font-bold"
                                : available
                                ? "bg-[#DDF7EA] text-[#042C89] font-bold hover:bg-[#0DD180] hover:text-white cursor-pointer"
                                : "text-[#98A2B8] cursor-default"
                            }`}
                          >
                            {day}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Time slots (after a date is chosen) */}
                {formData.callDate && (
                  <div className="mb-5">
                    <p className={qClass}>Choose a time on {formattedPicked}</p>
                    <ChipGroup options={TIME_SLOTS} value={formData.callTime} onChange={setVal("callTime")} />
                  </div>
                )}

                {/* What happens next */}
                <div className="mb-6">
                  <h4 className="poppins font-bold text-[#042C89] text-[15px] mb-2">What happens next</h4>
                  <div className="space-y-2">
                    {[
                      "You’ll get a confirmation email with your call details.",
                      "We’ll send the prospectus so you can read it before we talk.",
                    ].map((t) => (
                      <div key={t} className="flex items-center gap-2.5">
                        <img src={ROUND_CHECK} alt="" className="w-[20px] h-[20px] shrink-0 object-contain" />
                        <span className="poppins text-[#475569] text-[13px]">{t}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="poppins h-[52px] px-10 border-2 border-[#042C89] text-[#042C89] font-bold text-[16px] rounded-full hover:bg-[#F6F8FC] transition-all cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="poppins flex-1 h-[52px] bg-[#0DD180] hover:bg-[#0bbb71] text-white font-bold text-[16px] rounded-full flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-70"
                  >
                    {isSubmitting ? "Booking..." : "Confirm discovery call"}
                  </button>
                </div>
              </form>
            )}

            {/* ============ STEP 5: Success ============ */}
            {step === 5 && (
              <div className="text-center py-8">
                <img src={ROUND_CHECK} alt="" className="w-[64px] h-[64px] object-contain mx-auto mb-4" />
                <h3 className="recline text-[#042C89] text-[28px] mb-2">You’re booked in!</h3>
                <p className="poppins text-[#475569] text-[15px] max-w-[400px] mx-auto mb-2">
                  Thank you, {formData.firstName}. Your discovery call is booked for{" "}
                  <strong className="text-[#042C89]">{formattedPicked}</strong> at{" "}
                  <strong className="text-[#042C89]">{formData.callTime}</strong>.
                </p>
                <p className="poppins text-[#475569] text-[15px] max-w-[400px] mx-auto mb-6">
                  We’ve sent a confirmation email to{" "}
                  <strong className="text-[#042C89]">{formData.email}</strong>.
                </p>
                <button
                  type="button"
                  onClick={resetAll}
                  className="poppins font-bold text-[15px] text-[#0DD180] hover:underline cursor-pointer"
                >
                  Submit another application
                </button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default RoadToOwnershipForm;