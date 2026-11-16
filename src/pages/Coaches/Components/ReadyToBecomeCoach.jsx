// ReadyToBecomeCoach.jsx
import React, { useState, useEffect } from "react";
import { Container } from "../../../components/common/Container";
import { useToast } from "../../../components/common/Toaster";
import { fetchVenues } from "../../../services/venueService";

/* ====== REPLACE THESE PATHS LATER ====== */
const BG_DESKTOP = "https://webstepdev.com/demo/syncoWebsiteImages/coaches/ready-image.png"; // dark blue pattern + green wave
const BG_MOBILE = "https://webstepdev.com/demo/syncoWebsiteImages/coaches/ready-image-mobile.png";
/* ======================================= */

const ENDPOINT = "/api/open/recruitment/coach/candidate-profile";

const QUALIFICATIONS = [
  "FA Level 1",
  "FA Level 2",
  "DBS (within the year)",
  "Futsal Level 1",
  "UEFA B",
  "First Aid (within 2 years)",
];
const AGE_GROUPS = ["4-5 years", "6-7 years", "8-9 years", "10-11 years"];
const YEARS = ["None", "1 Year", "2 Years", "3 Years", "4 Years", "5+ Years"];
const DEFAULT_VENUES = [
  { id: 61, name: "Kings Cross / SAT (11am-1pm)" },
  { id: 54, name: "Camden / SUN (10am-12pm)" },
  { id: 78, name: "Islington / SAT (2pm-4pm)" },
];
const SOURCES = ["Indeed", "Facebook", "Google", "Referral", "Other"];

const inputCls =
  "w-full rounded-[6px] bg-[#F6F6F6] px-3.5 sm:px-4 py-2.5 sm:py-3 text-[12.5px] sm:text-[13px] lg:text-[14px] text-[#000] placeholder:text-[#B2B4C0] outline-none focus:bg-white  transition-all poppins";
const labelCls = "mb-1.5 block text-[12.5px] sm:text-[13px] xl:text-[14px] 2xl:text-[16px] text-[#101014] font-medium poppins";
const questionCls = "mb-2 text-[12.5px] sm:text-[13px] xl:text-[14px] 2xl:text-[16px] text-[#101014] font-medium poppins";

const Field = ({ label, error, children }) => (
  <div>
    <label className={labelCls}>{label}</label>
    {children}
    {error && (
      <p className="mt-1 text-[12px] text-red-500 poppins">{error}</p>
    )}
  </div>
);

/* ====== CUSTOM RADIO ====== */
const Radio = ({ name, value, checked, onChange }) => (
  <label className="flex cursor-pointer items-center gap-2.5 sm:gap-3 text-[12px] sm:text-[13px] xl:text-[14px] text-[#5F5F6D] poppins">
    <input
      type="radio"
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
      className="peer sr-only"
    />
    <span
      aria-hidden
      className={`
        flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-[1.5px] bg-white
        transition-all duration-150
        peer-focus-visible:ring-2 peer-focus-visible:ring-[#0DD180]/40
        ${checked ? "border-[#0DD180]" : "border-[#D0D5DD]"}
      `}
    >
      <span
        className={`
          h-2 w-2 rounded-full bg-[#0DD180] transition-transform duration-150
          ${checked ? "scale-100" : "scale-0"}
        `}
      />
    </span>
    {value}
  </label>
);

/* ====== CUSTOM CHECKBOX ====== */
const Check = ({ label, checked, onChange }) => (
  <label className="flex cursor-pointer items-center gap-2.5 sm:gap-3 text-[12px] sm:text-[13px] xl:text-[14px] text-[#5F5F6D] poppins">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="peer sr-only"
    />
    <span
      aria-hidden
      className={`
        flex h-4 w-4 shrink-0 items-center justify-center rounded-[5px] border-[1.5px]
        transition-all duration-150
        peer-focus-visible:ring-2 peer-focus-visible:ring-[#0DD180]/40
        ${checked ? "border-[#0DD180] bg-[#0DD180]/5" : "border-[#D0D5DD] bg-white"}
      `}
    >
      <svg
        viewBox="0 0 14 14"
        fill="none"
        className={`h-2 w-2 transition-transform duration-150 ${checked ? "scale-100" : "scale-0"}`}
      >
        <path
          d="M2.5 7.5L5.5 10.5L11.5 3.5"
          stroke="#0DD180"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
    {label}
  </label>
);

const initialFormState = {
  firstName: "",
  surname: "",
  email: "",
  phone: "",
  age: "",
  postcode: "",
  vehicle: "Yes",
  qualifications: [],
  years: "1 Year",
  ageGroups: [],
  venues: [],
  cv: null,
  coverNote: "",
  source: "Indeed",
};

const ReadyToBecomeCoach = () => {
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [venueOptions, setVenueOptions] = useState(DEFAULT_VENUES);

  useEffect(() => {
    let isMounted = true;
    fetchVenues()
      .then((data) => {
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setVenueOptions(
            data.map((v) => ({
              id: v.venueId || v.id || v.venueName,
              name: v.venueName || v.area || `Venue ${v.venueId}`,
            }))
          );
        }
      })
      .catch((err) => {
        console.warn("Could not load dynamic venues, using defaults:", err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const set = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const toggle = (key, value) => {
    setForm((f) => {
      const currentList = f[key] || [];
      return {
        ...f,
        [key]: currentList.includes(value)
          ? currentList.filter((v) => v !== value)
          : [...currentList, value],
      };
    });
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const validateSection1 = (data) => {
    const errs = {};

    if (!data.firstName?.trim()) {
      errs.firstName = "First name is required";
    }

    if (!data.surname?.trim()) {
      errs.surname = "Surname is required";
    }

    const emailTrimmed = data.email?.trim() || "";
    if (!emailTrimmed) {
      errs.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed)) {
      errs.email = "Enter a valid email address";
    }

    const rawPhone = data.phone?.trim() || "";
    if (!rawPhone) {
      errs.phone = "Telephone number is required";
    } else {
      const digits = rawPhone.replace(/\D/g, "");
      const hasAllowedChars = /^[0-9+\s-]+$/.test(rawPhone);
      if (!hasAllowedChars || digits.length < 10 || digits.length > 15) {
        errs.phone = "Enter a valid telephone number (10-15 digits)";
      }
    }

    const rawAge = data.age !== undefined && data.age !== null ? String(data.age).trim() : "";
    if (!rawAge) {
      errs.age = "Age is required";
    } else {
      const ageNum = Number(rawAge);
      if (isNaN(ageNum) || !/^\d+$/.test(rawAge)) {
        errs.age = "Enter a valid age";
      } else if (ageNum < 18) {
        errs.age = "Age must be at least 18";
      }
    }

    const rawPostcode = data.postcode?.trim() || "";
    if (!rawPostcode) {
      errs.postcode = "London Postcode is required";
    } else {
      const ukPostcodeRegex = /^[A-Z]{1,2}[0-9][A-Z0-9]?\s?[0-9][A-Z]{2}$/i;
      if (!ukPostcodeRegex.test(rawPostcode)) {
        errs.postcode = "Enter a valid UK postcode format (e.g. SW1A 1AA)";
      }
    }

    return errs;
  };

  const validateSection2 = (data) => {
    const errs = {};

    if (!data.qualifications || data.qualifications.length === 0) {
      errs.qualifications = "Please select at least one qualification";
    }

    if (!data.ageGroups || data.ageGroups.length === 0) {
      errs.ageGroups = "Please select at least one age group";
    }

    return errs;
  };

  const validateSection3 = (data) => {
    const errs = {};

    if (!data.cv) {
      errs.cv = "Please upload your CV";
    } else {
      const allowedExtensions = [".pdf", ".doc", ".docx"];
      const fileName = (data.cv.name || "").toLowerCase();
      const hasValidExt = allowedExtensions.some((ext) => fileName.endsWith(ext));
      const validMimes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      const hasValidMime = validMimes.includes(data.cv.type);

      if (!hasValidExt && !hasValidMime) {
        errs.cv = "CV must be a PDF, DOC, or DOCX file";
      } else if (data.cv.size > 5 * 1024 * 1024) {
        errs.cv = "CV file size must be less than 5MB";
      }
    }

    const rawCover = data.coverNote?.trim() || "";
    if (!rawCover) {
      errs.coverNote = "Cover note is required";
    } else {
      const words = rawCover.split(/\s+/).filter(Boolean);
      if (words.length > 500) {
        errs.coverNote = "Cover note must not exceed 500 words";
      }
    }

    if (!data.source) {
      errs.source = "Please select how you heard about us";
    }

    return errs;
  };

  const handleNext = () => {
    if (step === 1) {
      const s1Errors = validateSection1(form);
      if (Object.keys(s1Errors).length > 0) {
        setErrors(s1Errors);
        return;
      }
      setErrors({});
      setStep(2);
    } else if (step === 2) {
      const s2Errors = validateSection2(form);
      if (Object.keys(s2Errors).length > 0) {
        setErrors(s2Errors);
        return;
      }
      setErrors({});
      setStep(3);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (step < 3) {
      handleNext();
      return;
    }

    // Step 3 submission: Validate whole form
    const errs1 = validateSection1(form);
    const errs2 = validateSection2(form);
    const errs3 = validateSection3(form);
    const allErrors = { ...errs1, ...errs2, ...errs3 };

    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      if (Object.keys(errs1).length > 0) {
        setStep(1);
      } else if (Object.keys(errs2).length > 0) {
        setStep(2);
      } else {
        setStep(3);
      }
      return;
    }

    setIsSubmitting(true);

    try {
      const rawBase = import.meta.env.VITE_API_BASE_URL || "https://api.grabbite.com";
      const baseUrl = rawBase.replace(/\/+$/, "");
      const apiUrl = `${baseUrl}${ENDPOINT}`;

      const formData = new FormData();
      formData.append("firstName", form.firstName.trim());
      formData.append("lastName", form.surname.trim());
      formData.append("email", form.email.trim());
      formData.append("phoneNumber", form.phone.trim());
      formData.append("age", String(form.age).trim());
      formData.append("postcode", form.postcode.trim());
      formData.append("howDidYouHear", form.source);
      formData.append("accessToOwnVehicle", form.vehicle === "Yes" ? "true" : "false");
      formData.append("whichQualificationYouHave", JSON.stringify(form.qualifications));
      formData.append("footballExperience", form.years);

      const formattedVenues = form.venues.map((v) => {
        const num = Number(v);
        return !isNaN(num) && String(num) === String(v).trim() ? num : v;
      });
      formData.append("availableVenueWork", JSON.stringify(formattedVenues));

      if (form.cv) {
        formData.append("uploadCv", form.cv);
      }
      formData.append("coverNote", form.coverNote.trim());
      formData.append("ageGroupExperience", form.ageGroups.join(", "));

      const response = await fetch(apiUrl, {
        method: "POST",
        body: formData,
      });

      let data = null;
      try {
        data = await response.json();
      } catch {
        // Non-JSON response
      }

      if (response.ok && data?.status !== false) {
        toast.success(data?.message || "Application submitted successfully!");
        setForm(initialFormState);
        setErrors({});
        setStep(1);
      } else {
        const errorMsg = data?.message || "Something went wrong. Please try again.";
        toast.error(errorMsg);
      }
    } catch (error) {
      console.error("Coach registration error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="
        relative isolate w-full overflow-hidden bg-[#1B2F8E]
        bg-cover bg-bottom bg-no-repeat
        bg-[image:var(--bg-mobile)] md:bg-[image:var(--bg-desktop)]
      "
      style={{
        "--bg-desktop": `url(${BG_DESKTOP})`,
        "--bg-mobile": `url(${BG_MOBILE})`,
      }}
    >
      <Container className="py-14 sm:py-16 md:py-20 lg:py-24">
        {/* LEFT: TEXT */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-6 lg:gap-10 xl:gap-[50px] 2xl:gap-[60px]">
          <div className="w-full md:w-[42%] lg:w-[40%] xl:w-[42%] md:max-w-[480px] shrink-0">
            <h2 className="leading-[1.08] md:leading-[1.02]">
              <span
                className="
                block recline font-bold text-white
                text-[36px] sm:text-[42px] md:text-[36px] lg:text-[46px] xl:text-[56px] 2xl:text-[66px]
              "
              >
                Ready to
              </span>
              <span
                className="
                block recline font-bold text-white
                text-[36px] sm:text-[42px] md:text-[36px] lg:text-[46px] xl:text-[56px] 2xl:text-[66px]
              "
              >
                become a
              </span>
              <span
                className="
                block gasoek text-[#0DD180]
                text-[36px] sm:text-[42px] md:text-[36px] lg:text-[46px] xl:text-[52px] 2xl:text-[58px]
              "
              >
                Samba Coach?
              </span>
            </h2>

            <p className="mt-5 sm:mt-7 poppins text-[14px] sm:text-[15px] md:text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px] leading-[1.65] font-medium text-white/90">
              Tell us a little about yourself and let&apos;s see if we&apos;re a
              good fit. Our recruitment team will reach out to you as soon as
              possible.
            </p>
          </div>

          {/* RIGHT: FORM CARD */}
          <div className="w-full md:flex-1 md:max-w-[620px] ms-auto">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="
                rounded-[24px] sm:rounded-[28px] md:rounded-[32px] bg-white
                p-5 sm:p-7 md:p-6 lg:p-8 xl:p-10 2xl:p-12 shadow-[0_4px_30px_rgba(0,0,0,0.1)]
              "
            >
              {/* TABS */}
              <div className="mb-5 sm:mb-6 flex items-center pb-2 sm:pb-3 gap-3 sm:gap-6 lg:gap-8 text-[12.5px] sm:text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px]">
                {[1, 2, 3].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => n < step && setStep(n)}
                    className={`
                  pb-2 transition poppins
                  ${
                    step === n
                      ? "border-b-[4px] md:border-b-[5px] border-[#0DD180] px-3 sm:px-4 rounded-[5px] font-bold text-[#0DD180]"
                      : "border-b-[4px] md:border-b-[5px] px-2.5 sm:px-3 border-transparent text-[#9E9EB3] hover:text-[#7A7A8C]"
                  }
                `}
                  >
                    Section {n}
                  </button>
                ))}
              </div>

              {/* STEP 1 */}
              {step === 1 && (
                <div className="space-y-4 sm:space-y-5 pb-8 sm:pb-10">
                  <Field label="First Name" error={errors.firstName}>
                    <input
                      className={`${inputCls} ${errors.firstName ? "border border-red-500 ring-1 ring-red-500/20" : ""}`}
                      placeholder="First Name"
                      value={form.firstName}
                      onChange={(e) => set("firstName", e.target.value)}
                    />
                  </Field>
                  <Field label="Surname" error={errors.surname}>
                    <input
                      className={`${inputCls} ${errors.surname ? "border border-red-500 ring-1 ring-red-500/20" : ""}`}
                      placeholder="Surname"
                      value={form.surname}
                      onChange={(e) => set("surname", e.target.value)}
                    />
                  </Field>
                  <Field label="Email Address" error={errors.email}>
                    <input
                      type="email"
                      className={`${inputCls} ${errors.email ? "border border-red-500 ring-1 ring-red-500/20" : ""}`}
                      placeholder="Email Address"
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                    />
                  </Field>
                  <Field label="Telephone Number" error={errors.phone}>
                    <input
                      type="tel"
                      className={`${inputCls} ${errors.phone ? "border border-red-500 ring-1 ring-red-500/20" : ""}`}
                      placeholder="Telephone Number"
                      value={form.phone}
                      onChange={(e) => set("phone", e.target.value)}
                    />
                  </Field>
                  <Field label="Age" error={errors.age}>
                    <input
                      type="number"
                      min="18"
                      className={`${inputCls} ${errors.age ? "border border-red-500 ring-1 ring-red-500/20" : ""}`}
                      placeholder="Age"
                      value={form.age}
                      onChange={(e) => set("age", e.target.value)}
                    />
                  </Field>
                  <Field label="London Postcode" error={errors.postcode}>
                    <input
                      className={`${inputCls} ${errors.postcode ? "border border-red-500 ring-1 ring-red-500/20" : ""}`}
                      placeholder="London Postcode"
                      value={form.postcode}
                      onChange={(e) => set("postcode", e.target.value)}
                    />
                  </Field>
                </div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <div className="space-y-4 sm:space-y-5 pb-8 sm:pb-10">
                  <div>
                    <p className={questionCls}>
                      Do you have access to your own vehicle?
                    </p>
                    <div className="space-y-3">
                      {["Yes", "No"].map((v) => (
                        <Radio
                          key={v}
                          name="vehicle"
                          value={v}
                          checked={form.vehicle === v}
                          onChange={() => set("vehicle", v)}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className={questionCls}>
                      Please select which qualifications you have
                    </p>
                    <div className="space-y-2">
                      {QUALIFICATIONS.map((q) => (
                        <Check
                          key={q}
                          label={q}
                          checked={form.qualifications.includes(q)}
                          onChange={() => toggle("qualifications", q)}
                        />
                      ))}
                    </div>
                    {errors.qualifications && (
                      <p className="mt-1 text-[12px] text-red-500 poppins">
                        {errors.qualifications}
                      </p>
                    )}
                  </div>

                  <div>
                    <p className={questionCls}>
                      How many years football coaching experience do you have?
                    </p>
                    <div className="relative">
                      <select
                        value={form.years}
                        onChange={(e) => set("years", e.target.value)}
                        className="w-full rounded-lg bg-[#FFFFFF] px-4 py-3 text-[12.5px] xl:text-[14px] text-[#101828] outline-none focus:bg-white  border border-[#D0D5DD] poppins transition-all"
                      >
                        {YEARS.map((y) => (
                          <option key={y} value={y}>
                            {y}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <p className={questionCls}>
                      Which age groups do you have experience working with? Please
                      select from the options
                    </p>
                    <div className="space-y-3">
                      {AGE_GROUPS.map((a) => (
                        <Check
                          key={a}
                          label={a}
                          checked={form.ageGroups.includes(a)}
                          onChange={() => toggle("ageGroups", a)}
                        />
                      ))}
                    </div>
                    {errors.ageGroups && (
                      <p className="mt-1 text-[12px] text-red-500 poppins">
                        {errors.ageGroups}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <p className={`${questionCls} pb-2`}>
                      Please select which venues you are available for work
                    </p>
                    <div className="relative">
                      <select
                        value=""
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val && !form.venues.includes(val)) {
                            set("venues", [...form.venues, val]);
                          }
                        }}
                        className="w-full rounded-[8px] bg-[#fff] px-4 py-2.5 shadow-sm text-[13px] xl:text-[14px] 2xl:text-[16px] text-[#797A88] border border-[#D0D5DD] outline-none focus:bg-white  poppins transition-all"
                      >
                        <option value="">
                          {form.venues.length > 0 ? "Add another venue" : "Select venue"}
                        </option>
                        {venueOptions.map((v) => (
                          <option key={v.id} value={v.id}>
                            {v.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {form.venues.length > 0 && (
                      <div className="mt-2.5 flex flex-wrap gap-2">
                        {form.venues.map((vId) => {
                          const matched = venueOptions.find(
                            (item) => String(item.id) === String(vId)
                          );
                          const displayName = matched ? matched.name : vId;
                          return (
                            <span
                              key={vId}
                              className="inline-flex items-center gap-1.5 rounded-[16px] bg-[#0DD180]/15 px-2.5 py-1 text-[10px] 2xl:text-[12px] font-medium text-[#027A48] poppins"
                            >
                              {displayName}
                              <button
                                type="button"
                                aria-label={`Remove ${displayName}`}
                                onClick={() => toggle("venues", vId)}
                                className="text-[12px] leading-none hover:text-[#12B76A]"
                              >
                                ×
                              </button>
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  <div>
                    <p className={`${questionCls} pb-2`}>Please upload your CV</p>
                    <label
                      className={`
                    flex cursor-pointer flex-col items-center justify-center gap-1.5
                    rounded-[8px] border bg-white shadow-[0_1px_2px_rgba(16,24,40,0.05)]
                    px-4 py-6 text-center hover:bg-slate-50/50 transition-all
                    ${errors.cv ? "border-red-500 ring-1 ring-red-500/20" : "border-[#EAECF0]"}
                  `}
                    >
                      <div
                        aria-hidden
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F0F2F8] text-[15px] text-[#6C757D]"
                      >
                        <svg className="w-5 h-5 text-[#6C757D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                      </div>
                      <span className="text-[12px] poppins mt-1">
                        <span className=" text-[#6941C6] font-medium">
                          Click to upload
                        </span>{" "}
                        <span className="text-[#667085]">or drag and drop</span>
                      </span>
                      <span className="text-[12px] text-[#667085] poppins truncate max-w-full px-2">
                        {form.cv
                          ? form.cv.name
                          : "PDF, DOC or DOCX (max. 5MB)"}
                      </span>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        className="hidden"
                        onChange={(e) => set("cv", e.target.files?.[0] || null)}
                      />
                    </label>
                    {errors.cv && (
                      <p className="mt-1 text-[12px] text-red-500 poppins">
                        {errors.cv}
                      </p>
                    )}
                  </div>

                  <div>
                    <p className={questionCls}>
                      Please Add a short cover note (500 words max)
                    </p>
                    <textarea
                      rows={5}
                      placeholder="Message"
                      value={form.coverNote}
                      onChange={(e) => set("coverNote", e.target.value)}
                      className={`
                        w-full resize-none rounded-[8px] border bg-white
                        px-[14px] py-[10px] text-[14px] xl:text-[16px] leading-[1.5]
                        text-[#5F5F6D] placeholder:text-[#5F5F6D]
                        shadow-[0_1px_2px_rgba(16,24,40,0.05)]
                        outline-none transition-all poppins
                        focus:border-[#0DD180] focus:ring-4 focus:ring-[#0DD180]/15
                        ${errors.coverNote ? "border-red-500 ring-1 ring-red-500/20" : "border-[#D0D5DD]"}
                      `}
                    />
                    {errors.coverNote && (
                      <p className="mt-1 text-[12px] text-red-500 poppins">
                        {errors.coverNote}
                      </p>
                    )}
                  </div>

                  <div>
                    <p className={questionCls}>
                      How did you hear about this opportunity?
                    </p>
                    <div className="space-y-2">
                      {SOURCES.map((s) => (
                        <Radio
                          key={s}
                          name="source"
                          value={s}
                          checked={form.source === s}
                          onChange={() => set("source", s)}
                        />
                      ))}
                    </div>
                    {errors.source && (
                      <p className="mt-1 text-[12px] text-red-500 poppins">
                        {errors.source}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* BUTTON */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`
                  mt-6 sm:mt-8 w-full rounded-full bg-[#0DD180] hover:bg-[#0bbd73] py-3
                  text-[14px] sm:text-[15px] lg:text-[16px] xl:text-[18px] font-bold text-white
                  active:scale-98 transition-all duration-200 poppins
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-[#042C89]
                  ${isSubmitting ? "opacity-75 cursor-not-allowed" : ""}
                `}
              >
                {step === 3 ? (isSubmitting ? "Sending..." : "Send") : "Next"}
              </button>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ReadyToBecomeCoach;