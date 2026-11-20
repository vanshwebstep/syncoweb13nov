// ReadyToTakeTheLead.jsx  (Venue Manager application)
import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Calendar,
  Check as CheckIcon,
  ChevronDown,
  Clock,
  FileText,
  Mail,
  MapPin,
  Phone,
  X,
} from "lucide-react";
import { Container } from "../../../components/common/Container";
import { useToast } from "../../../components/common/Toaster";
import { fetchVenues } from "../../../services/venueService";

const BASE = "https://webstepdev.com/demo/syncoWebsiteImages";
const BG_DESKTOP = `${BASE}/coaches/ready-image.png`;
const BG_MOBILE = `${BASE}/coaches/ready-image-mobile.png`;
const LEAD_IMG = `${BASE}/holiday-camps/theleadimg.png`;
const WHITELINE = `${BASE}/roadtorio/whiteline.png`;

const ENDPOINT = "/api/open/recruitment/venue-manager/candidate-profile";

/* ====== DATA ====== */
const STEPS = ["About you", "Your venues", "Experience", "Availability"];
const NEXT_LABEL = { 1: "Next: your venues", 2: "Next: your experience", 3: "Next: availability" };

// d = desktop text, m = mobile text (mobile pe sirf pehle 2 points dikhte hain)
const LEFT_POINTS = [
  { d: "4 short steps, about 5 minutes", m: "4 short steps" },
  { d: "Pick the venues near you, anywhere in the UK", m: "Venues across the UK" },
  { d: "Upload your CV at the end", m: "Upload your CV at the end" },
  { d: "We’ll call you if it’s a good fit", m: "We’ll call you if it’s a good fit" },
];

// Sample venues (screenshot wale). API se venues aaye to wo use hote hain.
const SAMPLE_VENUES = [
  { id: 1, name: "Samba Didsbury", place: "Didsbury Park, M20", slots: ["Sat 9am–1pm"], dist: "0.7 mi" },
  { id: 2, name: "Samba Withington", place: "Withington Leisure Centre, M20", slots: ["Sat 9am–12pm", "Wed 4–6pm"], dist: "1.3 mi" },
  { id: 3, name: "Samba Chorlton", place: "Chorlton High School, M21", slots: ["Sat 9am–1pm"], dist: "1.8 mi" },
  { id: 4, name: "Samba Burnage", place: "Burnage Academy, M19", slots: ["Sat 10am–1pm"], dist: "2.1 mi" },
  { id: 5, name: "Samba Sale", place: "Sale Sports Centre, M33", slots: ["Sun 9am–12pm", "Thu 4–6pm"], dist: "2.8 mi" },
  { id: 6, name: "Samba Stockport", place: "Stockport Grammar Sports Hall, SK2", slots: ["Sat 9am–1pm"], dist: "3.2 mi" },
];
const VISIBLE_VENUES = 6;

const QUALIFICATIONS = ["FA Playmaker", "FA Level 1", "FA Level 2", "Futsal Level 1", "UEFA C", "UEFA B", "None yet"];
const YEARS = ["None", "1 yr", "2-3 yrs", "4+ yrs"];
const AGE_GROUPS = ["4-5 yrs", "6-7 yrs", "8-9 yrs", "10-11 yrs", "12+ yrs"];
const DBS = ["Yes", "In progress", "No"];
const YES_NO = ["Yes", "No"];
const WEEKEND = ["Sat + Sun", "Sat only", "Sun only"];
const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Holiday camps"];
const SOURCES = ["Indeed", "Facebook", "Instagram", "Google", "Referral", "Other"];

const initialFormState = {
  firstName: "",
  surname: "",
  email: "",
  phone: "",
  dob: "",
  postcode: "",
  vehicle: "Yes",
  venues: [],
  anyVenue: false,
  qualifications: [],
  years: "1 yr",
  mgmtYears: "None",
  ageGroups: [],
  dbs: "Yes",
  firstAid: "Yes",
  coverNote: "",
  weekend: "Sat + Sun",
  weekdays: [],
  startDate: "",
  cv: null,
  source: "Indeed",
  rightToWork: false,
  consent: false,
};

/* ====== HELPERS ====== */
const ageFromDob = (dob) => {
  const d = new Date(dob);
  if (isNaN(d.getTime())) return NaN;
  const now = new Date();
  let age = now.getFullYear() - d.getFullYear();
  const m = now.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < d.getDate())) age -= 1;
  return age;
};

const labelCls = "mb-1.5 block font-['Poppins',sans-serif] font-bold text-[#042C89] text-[12px] lg:text-[13px]";
const inputCls = (err) =>
  `w-full rounded-[12px] bg-[#F4F6FB] border px-3.5 py-3 text-[13px] lg:text-[14.6px] text-[#042C89] placeholder-[#9AA3B5] outline-none transition-all font-['Poppins',sans-serif] ${
    err ? "border-red-500" : "border-[#E8ECF5] focus:border-[#00A6E3] focus:bg-white"
  }`;

const Field = ({ label, error, hint, children }) => (
  <div>
    {label && <label className={labelCls}>{label}</label>}
    {hint && <p className="-mt-1 mb-2 font-['Poppins',sans-serif] text-[#797A88] text-[11px] lg:text-[12px]">{hint}</p>}
    {children}
    {error && <p className="mt-1 text-[12px] text-red-500 font-['Poppins',sans-serif]">{error}</p>}
  </div>
);

const IconInput = ({ icon: Icon, error, className = "", ...props }) => (
  <div className="relative">
    <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#797A88] pointer-events-none" />
    <input {...props} className={`${inputCls(error)} pl-10 ${className}`} />
  </div>
);

/* Segmented control (single choice) */
const Segmented = ({ options, value, onChange }) => (
  <div className="flex w-full rounded-full border border-[#E8ECF5] bg-white p-1">
    {options.map((o) => {
      const active = value === o;
      return (
        <button
          key={o}
          type="button"
          onClick={() => onChange(o)}
          className={`flex-1 rounded-full py-2 px-2 font-['Poppins',sans-serif] font-bold text-[11px] lg:text-[12.5px] transition-all cursor-pointer whitespace-nowrap ${
            active ? "bg-[#042C89] text-white" : "text-[#042C89] hover:bg-[#F4F6FB]"
          }`}
        >
          {o}
        </button>
      );
    })}
  </div>
);

/* Chips (multi choice, or single when `single`) */
const Chip = ({ label, active, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 font-['Poppins',sans-serif] font-bold text-[11px] lg:text-[12px] cursor-pointer transition-all ${
      active ? "bg-[#042C89] border-[#042C89] text-white" : "bg-white border-[#E8ECF5] text-[#042C89] hover:border-[#C9D3F0]"
    }`}
  >
    {active && <CheckIcon className="w-3 h-3 stroke-[3.5]" />}
    {label}
  </button>
);

/* Square checkbox */
const Box = ({ checked, onChange, children, className = "" }) => (
  <label className={`flex items-start gap-3 cursor-pointer ${className}`}>
    <input type="checkbox" checked={checked} onChange={onChange} className="sr-only peer" />
    <span
      aria-hidden
      className={`mt-0.5 w-[18px] h-[18px] rounded-[5px] border-2 flex items-center justify-center shrink-0 transition-all peer-focus-visible:ring-2 peer-focus-visible:ring-[#00A6E3]/40 ${
        checked ? "bg-[#042C89] border-[#042C89]" : "bg-white border-[#C9D3F0]"
      }`}
    >
      {checked && <CheckIcon className="w-3 h-3 text-white stroke-[3.5]" />}
    </span>
    <span className="font-['Poppins',sans-serif] text-[#042C89] text-[11.5px] lg:text-[12.5px] leading-snug">{children}</span>
  </label>
);

/* ====== COMPONENT ====== */
const ReadyToTakeTheLead = () => {
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [venueOptions, setVenueOptions] = useState(SAMPLE_VENUES);
  const [showAll, setShowAll] = useState(false);
  const [summary, setSummary] = useState(null); // success screen

  useEffect(() => {
    let isMounted = true;
    fetchVenues()
      .then((data) => {
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setVenueOptions(
            data.map((v) => ({
              id: v.venueId || v.id || v.venueName,
              name: v.venueName || v.area || `Venue ${v.venueId}`,
              place: v.area || "",
              slots: [],
              dist: "",
            }))
          );
        }
      })
      .catch((err) => console.warn("Could not load venues, using sample list:", err));
    return () => {
      isMounted = false;
    };
  }, []);

  const clearError = (key) =>
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });

  const set = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    clearError(key);
  };

  const toggle = (key, value) => {
    setForm((f) => {
      const list = f[key] || [];
      return { ...f, [key]: list.includes(value) ? list.filter((v) => v !== value) : [...list, value] };
    });
    clearError(key);
  };

  /* ====== VALIDATION ====== */
  const validators = {
    1: (d) => {
      const e = {};
      if (!d.firstName.trim()) e.firstName = "First name is required";
      if (!d.surname.trim()) e.surname = "Surname is required";

      const em = d.email.trim();
      if (!em) e.email = "Email address is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) e.email = "Enter a valid email address";

      const ph = d.phone.trim();
      if (!ph) e.phone = "Telephone number is required";
      else {
        const digits = ph.replace(/\D/g, "");
        if (!/^[0-9+\s-]+$/.test(ph) || digits.length < 10 || digits.length > 15) e.phone = "Enter a valid number (10-15 digits)";
      }

      if (!d.dob) e.dob = "Date of birth is required";
      else {
        const age = ageFromDob(d.dob);
        if (isNaN(age) || age < 0) e.dob = "Enter a valid date of birth";
        else if (age < 18) e.dob = "You must be at least 18";
      }

      const pc = d.postcode.trim();
      if (!pc) e.postcode = "Postcode is required";
      else if (!/^[A-Z]{1,2}[0-9][A-Z0-9]?\s?[0-9][A-Z]{2}$/i.test(pc)) e.postcode = "Enter a valid UK postcode (e.g. M20 2RN)";
      return e;
    },
    2: (d) => {
      const e = {};
      if (d.venues.length === 0 && !d.anyVenue) e.venues = "Pick at least one venue, or tick the box below";
      return e;
    },
    3: (d) => {
      const e = {};
      if (d.qualifications.length === 0) e.qualifications = "Please select at least one option";
      if (d.ageGroups.length === 0) e.ageGroups = "Please select at least one age group";
      if (!d.coverNote.trim()) e.coverNote = "Cover note is required";
      else if (d.coverNote.trim().split(/\s+/).filter(Boolean).length > 500) e.coverNote = "Cover note must not exceed 500 words";
      return e;
    },
    4: (d) => {
      const e = {};
      if (!d.cv) e.cv = "Please upload your CV";
      else {
        const name = (d.cv.name || "").toLowerCase();
        const okExt = [".pdf", ".doc", ".docx"].some((x) => name.endsWith(x));
        if (!okExt) e.cv = "CV must be a PDF, DOC, or DOCX file";
        else if (d.cv.size > 5 * 1024 * 1024) e.cv = "CV file size must be less than 5MB";
      }
      if (!d.source) e.source = "Please select how you heard about us";
      if (!d.rightToWork) e.rightToWork = "Please confirm your right to work in the UK";
      if (!d.consent) e.consent = "Please agree to continue";
      return e;
    },
  };

  const handleNext = () => {
    const errs = validators[step](form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStep((s) => s + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step < 4) {
      handleNext();
      return;
    }

    const stepErrors = [1, 2, 3, 4].map((n) => validators[n](form));
    const allErrors = Object.assign({}, ...stepErrors);
    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      setStep(stepErrors.findIndex((s) => Object.keys(s).length > 0) + 1);
      return;
    }

    setIsSubmitting(true);
    try {
      const rawBase = import.meta.env.VITE_API_BASE_URL || "https://api.grabbite.com";
      const apiUrl = `${rawBase.replace(/\/+$/, "")}${ENDPOINT}`;

      const formData = new FormData();
      formData.append("firstName", form.firstName.trim());
      formData.append("lastName", form.surname.trim());
      formData.append("age", String(ageFromDob(form.dob)));
      formData.append("dateOfBirth", form.dob);
      formData.append("email", form.email.trim());
      formData.append("phoneNumber", form.phone.trim());
      formData.append("postcode", form.postcode.trim());
      formData.append("howDidYouHear", form.source);
      formData.append("accessToOwnVehicle", form.vehicle === "Yes" ? "true" : "false");
      formData.append("whichQualificationYouHave", JSON.stringify(form.qualifications));
      formData.append("footballExperience", form.years);
      formData.append("managementExperience", form.mgmtYears);
      formData.append("ageGroupExperience", form.ageGroups.join(", "));
      formData.append("dbsCheck", form.dbs);
      formData.append("firstAid", form.firstAid);
      formData.append("coverNote", form.coverNote.trim());
      if (form.cv) formData.append("uploadCv", form.cv);

      const formattedVenues = form.venues.map((v) => {
        const num = Number(v);
        return !isNaN(num) && String(num) === String(v).trim() ? num : v;
      });
      formData.append("availableVenueWork", JSON.stringify(formattedVenues));
      formData.append("openToAnyVenue", form.anyVenue ? "true" : "false");
      formData.append("fullWeekendAvailablity", form.weekend === "Sat + Sun" ? "true" : "false");
      formData.append("weekendAvailability", form.weekend);
      formData.append("weekdayAvailability", form.weekdays.join(", "));
      formData.append("earliestStartDate", form.startDate);
      formData.append("rightToWorkInUK", "true");

      const response = await fetch(apiUrl, { method: "POST", body: formData });

      let data = null;
      try {
        data = await response.json();
      } catch {
        // Non-JSON response
      }

      if (response.ok && data?.status !== false) {
        toast.success(data?.message || "Application submitted successfully!");
        setSummary({
          name: form.firstName.trim(),
          venues: venueOptions.filter((v) => form.venues.some((id) => String(id) === String(v.id))),
        });
        setForm(initialFormState);
        setErrors({});
        setStep(1);
      } else {
        toast.error(data?.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Venue manager registration error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const Err = ({ field }) =>
    errors[field] ? <p className="mt-1 text-[12px] text-red-500 font-['Poppins',sans-serif]">{errors[field]}</p> : null;

  const today = new Date().toISOString().split("T")[0];
  const visibleVenues = showAll ? venueOptions : venueOptions.slice(0, VISIBLE_VENUES);
  const hiddenCount = Math.max(venueOptions.length - VISIBLE_VENUES, 0);

  const cardCls = "w-full max-w-[560px] ms-auto rounded-[24px] md:rounded-[28px] bg-white p-5 sm:p-7 lg:p-8 shadow-[0_4px_30px_rgba(0,0,0,0.12)]";
  const h3Cls = "mt-4 md:mt-6 font-['Poppins',sans-serif] font-bold text-[#042C89] text-[18px] lg:text-[22px] leading-tight";

  return (
    <section
      className="relative isolate w-full overflow-hidden bg-[#042C89] bg-cover bg-bottom bg-no-repeat bg-[image:var(--bg-mobile)] md:bg-[image:var(--bg-desktop)]"
      style={{ "--bg-desktop": `url(${BG_DESKTOP})`, "--bg-mobile": `url(${BG_MOBILE})` }}
    >
      <Container className="px-5 md:px-6 pt-12 pb-10 sm:py-16 md:py-20 lg:py-24">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-6 lg:gap-12">
          {/* ===== LEFT ===== */}
          <div className="w-full md:w-[44%] lg:w-[46%] md:max-w-[520px] shrink-0">
            <h2 className="leading-[1.1]">
              <span className="block font-['Recline',sans-serif] font-bold text-white text-[30px] sm:text-[38px] md:text-[32px] lg:text-[40px] xl:text-[44px]">
                Ready to take
              </span>
              <span className="relative inline-block font-['Gasoek_One',sans-serif] text-[#0DD180] text-[36px] sm:text-[44px] md:text-[38px] lg:text-[48px] xl:text-[54px] mt-1">
                the lead?
                <img src={WHITELINE} alt="" aria-hidden="true" className="absolute left-0 -bottom-1.5 md:-bottom-2 w-full h-auto pointer-events-none select-none" />
              </span>
            </h2>

            <p className="mt-5 md:mt-7 max-w-[440px] font-['Poppins',sans-serif] text-white text-[15px] lg:text-[17px] leading-[1.5] md:leading-relaxed">
              <span className="md:hidden">It takes about 5 minutes. Our recruitment team will be in touch as soon as possible.</span>
              <span className="hidden md:inline">
                Tell us a little about yourself and let’s see if we’re a good fit. Our recruitment team will be in touch as soon as possible.
              </span>
            </p>

            {/* Mobile: sirf pehle 2 points ek row me. Desktop: sab 4 list me */}
            <ul className="mt-5 md:mt-6 flex flex-row flex-wrap gap-x-4 gap-y-2 md:flex-col md:gap-0 md:space-y-3">
              {LEFT_POINTS.map((p, i) => (
                <li key={p.d} className={`${i > 1 ? "hidden md:flex" : "flex"} items-center gap-2 md:gap-3`}>
                  <span className="w-[18px] h-[18px] md:w-[20px] md:h-[20px] rounded-full bg-[#0DD180] flex items-center justify-center shrink-0">
                    <CheckIcon className="w-3 h-3 text-white stroke-[3.5]" />
                  </span>
                  <span className="font-['Poppins',sans-serif] font-bold text-white text-[12px] md:text-[13px] lg:text-[15px]">
                    <span className="md:hidden">{p.m}</span>
                    <span className="hidden md:inline">{p.d}</span>
                  </span>
                </li>
              ))}
            </ul>

            <img
              src={LEAD_IMG}
              alt="Samba venue managers"
              className="hidden md:block mt-8 w-[260px] lg:w-[400px] h-[185px] lg:h-[280px] object-cover rounded-[20px] shadow-xl"
            />
          </div>

          {/* ===== RIGHT ===== */}
          <div className="w-full md:flex-1 md:max-w-[560px]">
            {summary ? (
              /* ===== SUCCESS ===== */
              <div className={cardCls}>
                <div className="flex flex-col items-center text-center">
                  <span className="w-[72px] h-[72px] rounded-full bg-[#0DD180]/15 flex items-center justify-center">
                    <span className="w-[48px] h-[48px] rounded-full bg-[#0DD180] flex items-center justify-center">
                      <CheckIcon className="w-6 h-6 text-white stroke-[3.5]" />
                    </span>
                  </span>
                  <h3 className="mt-4 font-['Poppins',sans-serif] font-bold text-[#042C89] text-[20px] lg:text-[24px]">Application sent!</h3>
                  <p className="mt-2 max-w-[360px] font-['Poppins',sans-serif] text-[#797A88] text-[12px] lg:text-[13.5px] leading-relaxed">
                    Thanks {summary.name}. Your application has gone to the team that runs the venues you picked.
                  </p>
                </div>

                {summary.venues.length > 0 && (
                  <div className="mt-6 rounded-[16px] bg-[#F4F6FB] p-4 lg:p-5">
                    <p className="font-['Poppins',sans-serif] font-bold text-[#00A6E3] text-[10px] lg:text-[11px] tracking-[0.04em] uppercase">
                      You applied for
                    </p>
                    <ul className="mt-3 space-y-2.5">
                      {summary.venues.map((v) => (
                        <li key={v.id} className="flex items-center justify-between gap-3">
                          <span className="flex items-center gap-2 font-['Poppins',sans-serif] font-bold text-[#042C89] text-[12px] lg:text-[13.5px]">
                            <CheckIcon className="w-3.5 h-3.5 text-[#0DD180] stroke-[3]" />
                            {v.name}
                          </span>
                          {v.slots.length > 0 && (
                            <span className="font-['Poppins',sans-serif] font-semibold text-[#797A88] text-[10.5px] lg:text-[12px] whitespace-nowrap">
                              {v.slots[0]}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <h4 className="mt-6 font-['Poppins',sans-serif] font-bold text-[#042C89] text-[14px] lg:text-[16px]">What happens next</h4>
                <ul className="mt-4 space-y-4">
                  {[
                    { n: 1, t: "We review it", s: "Usually within 3 working days.", c: "bg-[#0DD180] text-white" },
                    { n: 2, t: "Let’s talk", s: "A chat about you and what it means to lead a Samba venue.", c: "bg-[#00A6E3] text-white" },
                    { n: 3, t: "Assessment", s: "We show you how you lead in a real Samba session.", c: "bg-[#FFDE14] text-[#042C89]" },
                  ].map((x) => (
                    <li key={x.n} className="flex items-center gap-3.5">
                      <span className={`${x.c} w-7 h-7 rounded-full flex items-center justify-center font-['Poppins',sans-serif] font-bold text-[11px] shrink-0`}>{x.n}</span>
                      <div>
                        <p className="font-['Poppins',sans-serif] font-bold text-[#042C89] text-[12px] lg:text-[13.5px] leading-tight">{x.t}</p>
                        <p className="font-['Poppins',sans-serif] text-[#797A88] text-[11px] lg:text-[12px] mt-0.5">{x.s}</p>
                      </div>
                    </li>
                  ))}
                </ul>

                <a
                  href="/"
                  className="mt-7 flex items-center justify-center rounded-full border border-[#E8ECF5] py-3.5 font-['Poppins',sans-serif] font-bold text-[#042C89] text-[12px] lg:text-[13.5px] hover:bg-[#F4F6FB] transition-colors"
                >
                  Back to the homepage
                </a>
              </div>
            ) : (
              /* ===== FORM ===== */
              <form onSubmit={handleSubmit} noValidate className={cardCls}>
                {/* Progress */}
                <div className="grid grid-cols-4 gap-2">
                  {STEPS.map((label, i) => {
                    const n = i + 1;
                    return (
                      <button
                        key={label}
                        type="button"
                        onClick={() => n < step && setStep(n)}
                        className={`text-left ${n < step ? "cursor-pointer" : "cursor-default"}`}
                      >
                        <span className={`block h-[4px] rounded-full ${n <= step ? "bg-[#0DD180]" : "bg-[#E3E7EF]"}`} />
                        {/* Desktop/tablet: har step ka label */}
                        <span
                          className={`hidden sm:block mt-2 font-['Poppins',sans-serif] font-bold text-[10.5px] lg:text-[12.55px] whitespace-nowrap ${
                            step === n ? "text-[#042C89]" : "text-[#6B7280]"
                          }`}
                        >
                          {n}. {label}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Mobile: "Step 1 of 4 · About you" */}
                <p className="sm:hidden mt-3 font-['Poppins',sans-serif] font-bold text-[#042C89] text-[12px]">
                  Step {step} of 4 · {STEPS[step - 1]}
                </p>

                {/* ===== STEP 1 ===== */}
                {step === 1 && (
                  <>
                    <h3 className={h3Cls}>Tell us about you</h3>
                    <div className="mt-5 space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field label="First name" error={errors.firstName}>
                          <input className={inputCls(errors.firstName)} placeholder="First name" value={form.firstName} onChange={(e) => set("firstName", e.target.value)} />
                        </Field>
                        <Field label="Surname" error={errors.surname}>
                          <input className={inputCls(errors.surname)} placeholder="Surname" value={form.surname} onChange={(e) => set("surname", e.target.value)} />
                        </Field>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field label="Email" error={errors.email}>
                          <IconInput icon={Mail} type="email" placeholder="you@email.com" error={errors.email} value={form.email} onChange={(e) => set("email", e.target.value)} />
                        </Field>
                        <Field label="Phone" error={errors.phone}>
                          <IconInput icon={Phone} type="tel" placeholder="07…" error={errors.phone} value={form.phone} onChange={(e) => set("phone", e.target.value)} />
                        </Field>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field label="Date of birth" error={errors.dob}>
                          <IconInput icon={Calendar} type="date" max={today} error={errors.dob} value={form.dob} onChange={(e) => set("dob", e.target.value)} />
                        </Field>
                      </div>

                      <div>
                        <Field label="Your postcode" error={errors.postcode}>
                          <IconInput icon={MapPin} placeholder="e.g. M20 2RN" error={errors.postcode} value={form.postcode} onChange={(e) => set("postcode", e.target.value)} />
                        </Field>
                        <p className="mt-2 font-['Poppins',sans-serif] text-[#797A88] text-[11px] lg:text-[12.5px]">
                          We use this to find the Samba venues closest to you, anywhere in the UK.
                        </p>
                      </div>

                      <Field label="Do you have access to your own vehicle?">
                        <div className="max-w-[240px]">
                          <Segmented options={YES_NO} value={form.vehicle} onChange={(v) => set("vehicle", v)} />
                        </div>
                      </Field>
                    </div>
                  </>
                )}

                {/* ===== STEP 2 ===== */}
                {step === 2 && (
                  <>
                    <h3 className={h3Cls}>Which venues could you manage?</h3>
                    <p className="mt-1.5 font-['Poppins',sans-serif] text-[#797A88] text-[11.5px] lg:text-[13px] leading-relaxed">
                      These are the Samba venues closest to you. Tick every venue you could manage. You can pick more than one.
                    </p>

                    <div className="mt-4 flex items-center justify-between rounded-[12px] border border-[#E8ECF5] px-3.5 py-3">
                      <span className="flex items-center gap-2 font-['Poppins',sans-serif] font-bold text-[#042C89] text-[12px] lg:text-[13px] uppercase">
                        <MapPin className="w-4 h-4 text-[#00A6E3]" />
                        {form.postcode.trim() || "M20 2RN"}
                      </span>
                      <button type="button" onClick={() => setStep(1)} className="font-['Poppins',sans-serif] font-bold text-[#00A6E3] text-[11px] lg:text-[12px] cursor-pointer">
                        Change
                      </button>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <p className="font-['Poppins',sans-serif] font-bold text-[#042C89] text-[11.5px] lg:text-[12.5px]">
                        {venueOptions.length} nearest venues
                      </p>
                      {form.venues.length > 0 && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#E3F8EE] px-2.5 py-1 font-['Poppins',sans-serif] font-bold text-[#067A4B] text-[10.5px] lg:text-[11.5px]">
                          <CheckIcon className="w-3 h-3 stroke-[3]" /> {form.venues.length} selected
                        </span>
                      )}
                    </div>

                    <div className="mt-3 space-y-2.5">
                      {visibleVenues.map((v) => {
                        const checked = form.venues.some((id) => String(id) === String(v.id));
                        return (
                          <label
                            key={v.id}
                            className={`flex items-start gap-3 rounded-[14px] border-2 px-3.5 py-3 cursor-pointer transition-all ${
                              checked ? "border-[#00A6E3] bg-[#E6F4FB]" : "border-[#E8ECF5] bg-white hover:border-[#C9D3F0]"
                            }`}
                          >
                            <input type="checkbox" checked={checked} onChange={() => toggle("venues", v.id)} className="sr-only" />
                            <span
                              aria-hidden
                              className={`mt-0.5 w-[18px] h-[18px] rounded-[5px] border-2 flex items-center justify-center shrink-0 ${
                                checked ? "bg-[#042C89] border-[#042C89]" : "bg-white border-[#C9D3F0]"
                              }`}
                            >
                              {checked && <CheckIcon className="w-3 h-3 text-white stroke-[3.5]" />}
                            </span>
                            <span className="flex-1 min-w-0">
                              <span className="flex items-start justify-between gap-2">
                                <span className="font-['Poppins',sans-serif] font-bold text-[#042C89] text-[13px] lg:text-[14.5px] leading-tight">{v.name}</span>
                                {v.dist && <span className="font-['Poppins',sans-serif] text-[#797A88] text-[10.5px] lg:text-[11.5px] whitespace-nowrap">{v.dist}</span>}
                              </span>
                              {v.place && (
                                <span className="mt-1 flex items-center gap-1.5 font-['Poppins',sans-serif] text-[#797A88] text-[10.5px] lg:text-[11.5px]">
                                  <MapPin className="w-3 h-3 shrink-0" /> {v.place}
                                </span>
                              )}
                              {v.slots.length > 0 && (
                                <span className="mt-2 flex flex-wrap gap-1.5">
                                  {v.slots.map((s) => (
                                    <span key={s} className="inline-flex items-center gap-1 rounded-full bg-[#E6F4FB] px-2.5 py-1 font-['Poppins',sans-serif] font-bold text-[#042C89] text-[10px] lg:text-[11px]">
                                      <Clock className="w-3 h-3 text-[#00A6E3]" /> {s}
                                    </span>
                                  ))}
                                </span>
                              )}
                            </span>
                          </label>
                        );
                      })}
                    </div>

                    {hiddenCount > 0 && !showAll && (
                      <button
                        type="button"
                        onClick={() => setShowAll(true)}
                        className="mt-3 w-full inline-flex items-center justify-center gap-1.5 rounded-full border border-[#E8ECF5] py-2.5 font-['Poppins',sans-serif] font-bold text-[#042C89] text-[11.5px] lg:text-[12.5px] cursor-pointer hover:bg-[#F4F6FB]"
                      >
                        See {hiddenCount} more venues <ChevronDown className="w-4 h-4" />
                      </button>
                    )}

                    <Box
                      checked={form.anyVenue}
                      onChange={() => {
                        set("anyVenue", !form.anyVenue);
                        clearError("venues");
                      }}
                      className="mt-4 rounded-[12px] bg-[#FFF8D1] border border-[#FFE680] px-3.5 py-3"
                    >
                      I can’t see a venue that suits me, or I’m happy to manage any Samba venue near me.
                    </Box>
                    <Err field="venues" />
                  </>
                )}

                {/* ===== STEP 3 ===== */}
                {step === 3 && (
                  <>
                    <h3 className={h3Cls}>Your experience</h3>

                    <div className="mt-5 space-y-5">
                      <Field label="Which qualifications do you have?" hint="Tick all that apply" error={errors.qualifications}>
                        <div className="flex flex-wrap gap-2">
                          {QUALIFICATIONS.map((q) => (
                            <Chip key={q} label={q} active={form.qualifications.includes(q)} onClick={() => toggle("qualifications", q)} />
                          ))}
                        </div>
                      </Field>

                      <Field label="Years of football coaching experience">
                        <Segmented options={YEARS} value={form.years} onChange={(v) => set("years", v)} />
                      </Field>

                      <Field label="Years of management or team-leading experience">
                        <Segmented options={YEARS} value={form.mgmtYears} onChange={(v) => set("mgmtYears", v)} />
                      </Field>

                      <Field label="Which age groups have you coached?" error={errors.ageGroups}>
                        <div className="flex flex-wrap gap-2">
                          {AGE_GROUPS.map((a) => (
                            <Chip key={a} label={a} active={form.ageGroups.includes(a)} onClick={() => toggle("ageGroups", a)} />
                          ))}
                        </div>
                      </Field>

                      <Field label="DBS check (within the last year)?">
                        <Segmented options={DBS} value={form.dbs} onChange={(v) => set("dbs", v)} />
                      </Field>

                      <Field label="First aid (within the last 2 years)?">
                        <div className="max-w-[240px]">
                          <Segmented options={YES_NO} value={form.firstAid} onChange={(v) => set("firstAid", v)} />
                        </div>
                      </Field>

                      <Field label="Short cover note" error={errors.coverNote}>
                        <textarea
                          rows={4}
                          placeholder="Tell us about a team you’ve led, and why you’d love to run a Samba venue…"
                          value={form.coverNote}
                          onChange={(e) => set("coverNote", e.target.value)}
                          className={`${inputCls(errors.coverNote)} resize-none`}
                        />
                        <p className="mt-1 text-right font-['Poppins',sans-serif] text-[#797A88] text-[10.5px] lg:text-[11.5px]">
                          {form.coverNote.trim() ? form.coverNote.trim().split(/\s+/).length : 0} / 500 words
                        </p>
                      </Field>
                    </div>
                  </>
                )}

                {/* ===== STEP 4 ===== */}
                {step === 4 && (
                  <>
                    <h3 className={h3Cls}>Availability and CV</h3>

                    <div className="mt-5 space-y-5">
                      <Field label="Do you have full-time weekend availability?">
                        <Segmented options={WEEKEND} value={form.weekend} onChange={(v) => set("weekend", v)} />
                      </Field>

                      <Field label="Any weekday availability?" hint="Optional">
                        <div className="flex flex-wrap gap-2">
                          {WEEKDAYS.map((d) => (
                            <Chip key={d} label={d} active={form.weekdays.includes(d)} onClick={() => toggle("weekdays", d)} />
                          ))}
                        </div>
                      </Field>

                      <Field label="Earliest start date">
                        <div className="max-w-[240px]">
                          <IconInput icon={Calendar} type="date" min={today} error={false} value={form.startDate} onChange={(e) => set("startDate", e.target.value)} />
                        </div>
                      </Field>

                      <Field label="Upload your CV" error={errors.cv}>
                        {form.cv ? (
                          <div className="flex items-center gap-3 rounded-[12px] border border-[#0DD180] bg-[#E3F8EE] px-3.5 py-3">
                            <span className="w-8 h-8 rounded-[8px] bg-white flex items-center justify-center shrink-0">
                              <FileText className="w-4 h-4 text-[#042C89]" />
                            </span>
                            <div className="flex-1 min-w-0">
                              <p className="truncate font-['Poppins',sans-serif] font-bold text-[#042C89] text-[12px] lg:text-[13px]">{form.cv.name}</p>
                              <p className="font-['Poppins',sans-serif] font-semibold text-[#067A4B] text-[10.5px] lg:text-[11.5px]">
                                {Math.max(Math.round(form.cv.size / 1024), 1)} KB · Uploaded
                              </p>
                            </div>
                            <button
                              type="button"
                              aria-label="Remove CV"
                              onClick={() => set("cv", null)}
                              className="w-6 h-6 rounded-full bg-white flex items-center justify-center cursor-pointer hover:bg-[#F4F6FB]"
                            >
                              <X className="w-3.5 h-3.5 text-[#042C89]" />
                            </button>
                          </div>
                        ) : (
                          <label
                            className={`flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-[12px] border border-dashed bg-white px-4 py-6 text-center hover:bg-[#F4F6FB]/60 transition-all ${
                              errors.cv ? "border-red-500" : "border-[#C9D3F0]"
                            }`}
                          >
                            <span className="w-9 h-9 rounded-full bg-[#F0F2F8] flex items-center justify-center">
                              <FileText className="w-4 h-4 text-[#6C757D]" />
                            </span>
                            <span className="font-['Poppins',sans-serif] text-[12px] mt-1">
                              <span className="text-[#6941C6] font-medium">Click to upload</span>{" "}
                              <span className="text-[#667085]">or drag and drop</span>
                            </span>
                            <input
                              type="file"
                              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                              className="hidden"
                              onChange={(e) => set("cv", e.target.files?.[0] || null)}
                            />
                          </label>
                        )}
                        <p className="mt-1.5 font-['Poppins',sans-serif] text-[#797A88] text-[10.5px] lg:text-[11.5px]">PDF or Word, up to 5MB.</p>
                      </Field>

                      <Field label="How did you hear about us?" error={errors.source}>
                        <div className="flex flex-wrap gap-2">
                          {SOURCES.map((s) => (
                            <Chip key={s} label={s} active={form.source === s} onClick={() => set("source", s)} />
                          ))}
                        </div>
                      </Field>

                      <div className="space-y-3 pt-1">
                        <div>
                          <Box checked={form.rightToWork} onChange={() => set("rightToWork", !form.rightToWork)}>
                            <span className="font-bold">I have the right to work in the UK.</span>
                          </Box>
                          <Err field="rightToWork" />
                        </div>
                        <div>
                          <Box checked={form.consent} onChange={() => set("consent", !form.consent)}>
                            I agree that Samba Soccer Schools and the franchise partner who runs my chosen venues can store my details to process this application.
                          </Box>
                          <Err field="consent" />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* ===== BUTTONS ===== */}
                <div className="mt-6 flex items-center gap-3">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={() => setStep((s) => s - 1)}
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-[#E8ECF5] bg-white px-5 lg:px-6 py-4 font-['Poppins',sans-serif] font-bold text-[#042C89] text-[12px] lg:text-[14px] hover:bg-[#F4F6FB] transition-colors cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`flex-1 inline-flex items-center justify-center gap-2 rounded-full py-4 font-['Poppins',sans-serif] font-bold text-[13px] lg:text-[15px] transition-all duration-200 active:scale-[0.99] cursor-pointer ${
                      step === 4 ? "bg-[#0DD180] hover:bg-[#0bb86f] text-[#042C89]" : "bg-[#042C89] hover:bg-[#021840] text-white"
                    } ${isSubmitting ? "opacity-75 cursor-not-allowed" : ""}`}
                  >
                    {step === 4 ? (isSubmitting ? "Sending..." : "Send application") : NEXT_LABEL[step]}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ReadyToTakeTheLead;