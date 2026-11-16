import React, { useState, useEffect } from "react";
import { Container } from "../../../components/common/Container";
import { useToast } from "../../../components/common/Toaster";
import { Loader2, UserCheck } from "lucide-react";
import { checkParentEmail, createWaitingListBooking } from "../../../services/venueService";
import { SambaLoginModal } from "../../FindAClass/components/Book a Membership/SambaLoginModal";

const WL = "https://webstepdev.com/demo/syncoWebsiteImages/waitinglist";
const IMG = {
  backArrow: `${WL}/bluebackarrow.png`,
  nextArrow: `${WL}/whitenextarrow.png`,
  brownClock: `${WL}/brownclock.png`,
  skyClock: `${WL}/skyblueclock.png`,
  greenCheck: `${WL}/greencheck.png`,
  whiteCheck: `${WL}/withecheck.png`,
  greyUser: `${WL}/greyuser.png`,
  info: `${WL}/info.png`,
  pin: `${WL}/pin.png`,
  chat: `${WL}/chat.png`,
  yellowLine: `${WL}/yellowunderline.png`,
};

const TOTAL_STEPS = 5; // step 1 = 20%, 2 = 40%, 3 = 60%, last step = 90%

const DEFAULT_VENUE = {
  name: "Wimbledon",
  day: "Tuesdays",
  shortDay: "Tue",
  time: "4:00pm",
  address: "Pelham Road, London SW19 1NX",
  phone: "020 7205 2723",
  slots: {
    "4–5s": "4:00 – 5:00pm",
    "6–7s": "5:00 – 6:00pm",
    "8–9s": "6:00 – 7:00pm",
    "10–12s": "7:00 – 8:00pm",
  },
  alternative: { name: "Greenwich", day: "Saturdays" },
};

const COUNTS = [
  { value: 1, label: "child", display: "1" },
  { value: 2, label: "children", display: "2" },
  { value: 3, label: "children", display: "3" },
  { value: 4, label: "children", display: "4+" },
];

const perks = [
  "Free to join, leave anytime",
  "We text + email when a space opens",
  "3 hours to log in and book",
];

const RELATIONS = ["Mum", "Dad", "Guardian", "Other"];
const HEARD = [
  "Instagram / Facebook",
  "Google search",
  "Friend or family",
  "School or nursery",
  "Saw a session",
  "Other",
];

/* ---------- Helpers ---------- */
const emptyChild = () => ({
  firstName: "",
  lastName: "",
  dd: "",
  mm: "",
  yyyy: "",
  gender: "",
  needs: "",
});

function calcAge(d, m, y) {
  if (!d || !m || y.length !== 4) return null;
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

/* ---------- Icons (original images) ---------- */
const ImgIcon = ({ src, size }) => (
  <img
    src={src}
    alt=""
    aria-hidden="true"
    width={size}
    height={size}
    style={{ width: size, height: size }}
    className="object-contain  shrink-0 select-none"
  />
);

const ArrowLeft = ({ size = 16 }) => <ImgIcon src={IMG.backArrow} size={size} />;
const ArrowRight = ({ size = 16 }) => <ImgIcon src={IMG.nextArrow} size={size} />;
// tone: "sky" (About 1 min) | "brown" (waiting list pill)
const ClockIcon = ({ size = 14, tone = "sky" }) => (
  <ImgIcon src={tone === "brown" ? IMG.brownClock : IMG.skyClock} size={size} />
);
const PinIcon = ({ size = 13 }) => <ImgIcon src={IMG.pin} size={size} />;
// color "#fff" => white tick (for dark circles), otherwise green tick
const CheckIcon = ({ size = 13, color }) => (
  <ImgIcon src={color === "#fff" ? IMG.whiteCheck : IMG.greenCheck} size={size} />
);

// Green circle ke andar white check
const GreenCheckBadge = ({ size = 16 }) => (
  <span
    style={{ width: size, height: size }}
    className="rounded-full bg-[#0DD180] inline-flex items-center justify-center shrink-0"
  >
    <CheckIcon size={Math.round(size * 0.6)} color="#fff" />
  </span>
);

const UserIcon = ({ size = 16 }) => <ImgIcon src={IMG.greyUser} size={size} />;
const WhatsAppIcon = ({ size = 14 }) => <ImgIcon src={IMG.chat} size={size} />;

// default = info.png, custom colour (amber box) = inline svg
const InfoIcon = ({ color, size = 22 }) =>
  !color ? (
    <ImgIcon src={IMG.info} size={size} />
  ) : (
    <svg width={size} height={size} viewBox="0 0 24 24" className="shrink-0">
      <circle cx="12" cy="12" r="12" fill={color} />
      <rect x="11" y="10" width="2" height="7" rx="1" fill="#fff" />
      <circle cx="12" cy="7" r="1.3" fill="#fff" />
    </svg>
  );

const EyeIcon = ({ off }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
    <circle cx="12" cy="12" r="3" />
    {off && <path d="M4 4l16 16" />}
  </svg>
);

// currentColor arrow (text colour ke saath badalta hai)
const ArrowRightSvg = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

/* ---------- Shared UI ---------- */
const inputClass =
  "w-full h-[50px] bg-white border border-[#C9D3F0] rounded-[14px] px-4 text-[15px] text-[#34353B] poppins placeholder-[#9AA3B8] outline-none focus:border-[#042C89] transition-colors";
const labelClass = "block poppins text-[13px] font-bold text-[#042C89] mb-1.5";

function StepTop({ onBack, label, done }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <button
        type="button"
        onClick={onBack}
        aria-label="Back"
        className="w-[38px] h-[38px] rounded-full border border-[#C9D3F0] bg-white flex items-center justify-center hover:bg-[#F6F8FC] transition-colors cursor-pointer"
      >
        <ArrowLeft size={16} />
      </button>
      <span className="poppins inline-flex items-center gap-1.5 text-[#042C89] text-[14px] font-semibold">
        {done ? <GreenCheckBadge size={16} /> : <ClockIcon size={14} />}
        {label}
      </span>
    </div>
  );
}

function Progress({ step, pct }) {
  const width = pct != null ? pct : (step / TOTAL_STEPS) * 100;
  return (
    <div className="h-[8px] w-full bg-[#E6EAF3] rounded-full overflow-hidden mb-5">
      <div
        className="h-full bg-[#0DD180] rounded-full transition-all duration-300"
        style={{ width: `${width}%` }}
      />
    </div>
  );
}

function WaitingPill({ venue, className = "inline-flex" }) {
  return (
    <span className={`poppins ${className} items-center gap-1.5 bg-[#FFF4E0] text-[#9A5B00] text-[12px] font-semibold px-3 py-1.5 rounded-full mb-6 sm:mb-8`}>
      <ClockIcon size={12} tone="brown" />
      Waiting list · {venue.name} · {venue.shortDay} {venue.time}
    </span>
  );
}

function Heading({ line1, line2 }) {
  return (
    <h2 className="mb-3">
      <span className="recline block text-[#042C89] font-bold text-[30px] sm:text-[38px] leading-[1.1]">
        {line1}
      </span>
      <span className="relative inline-block">
        <span className="gasoek block text-[#0DD180] text-[36px] sm:text-[46px] leading-[1.1]">
          {line2}
        </span>
        {/* w-0 + min-w-full => line ki width hamesha text ke barabar */}
        <img src={IMG.yellowLine} alt="" className="block w-0 min-w-full h-auto -mt-1" />
      </span>
    </h2>
  );
}

/* check=false => selected hone par bhi tick circle nahi (mobile step 3 chips) */
function Chip({ label, selected, onClick, mobileCheck = true }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative poppins h-[48px] px-2 sm:px-4 rounded-[14px] border-2 text-[12.5px] sm:text-[14px] font-bold transition-colors cursor-pointer w-full ${selected
          ? "bg-[#E6F4FB] border-[#042C89] text-[#042C89]"
          : "bg-white border-[#C9D3F0] text-[#34353B] hover:border-[#00A6E3]"
        }`}
    >
      {label}
      {selected && (
        <span
          className={`absolute top-1/2 -translate-y-1/2 right-2.5 w-[16px] h-[16px] rounded-full bg-[#042C89] items-center justify-center ${mobileCheck ? "flex" : "hidden sm:flex"
            }`}
        >
          <CheckIcon size={9} color="#fff" />
        </span>
      )}
    </button>
  );
}

/*
  Bottom bar:
  - mobile : poori width ki white strip (container se bahar tak), upar border
  - sm+    : pehle jaisa — sirf upar ek line
*/
function BottomBar({ children }) {
  return (
    <div className="relative isolate pt-4 pb-5 sm:pt-8 sm:pb-0 border-[#E6EAF3] sm:border-t before:absolute before:inset-y-0 before:-left-[100vw] before:-right-[100vw] before:-z-10 before:bg-white before:border-t before:border-[#E6EAF3] sm:before:hidden">
      {children}
    </div>
  );
}

function NavButtons({ onBack, onNext, nextLabel = "Continue", loading = false, disabled = false }) {
  return (
    <BottomBar>
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          disabled={disabled || loading}
          className="poppins hidden sm:inline-flex items-center gap-2 text-[#042C89] font-bold text-[15px] cursor-pointer hover:underline disabled:opacity-50"
        >
          <ArrowLeft size={14} />
          <span>Back</span>
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={disabled || loading}
          className="poppins flex-1 sm:max-w-[300px] h-[48px] sm:h-[52px] bg-[#042C89] hover:bg-[#071d63] text-white font-bold text-[15px] sm:text-[17px] rounded-full inline-flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span key="loading" className="inline-flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Verifying...</span>
            </span>
          ) : (
            <span key="content" className="inline-flex items-center gap-2">
              <span>{nextLabel}</span>
              <ArrowRight size={16} />
            </span>
          )}
        </button>
      </div>
    </BottomBar>
  );
}

/* ---------- STEP 1: Who's joining ---------- */
function StepWhoJoining({ venue, count, setCount, onNext, onBack, onOpenLogin }) {
  return (
    <>
      <StepTop onBack={onBack} label="About 1 min" />
      <Progress step={1} />
      <WaitingPill venue={venue} />
      <Heading line1="Who’s joining" line2="the list?" />

      {/* Existing Member Notice */}
      <div className="bg-[#EBF7FC] border border-[#BCE3F5] rounded-[14px] p-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#00A6E3] flex items-center justify-center shrink-0">
            <UserCheck className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="poppins text-[13px] sm:text-[14px] font-semibold text-[#042C89]">
              Already a Samba member?
            </p>
            <p className="poppins text-[12px] text-[#555660]">
              Log in to your portal to request a class change instead.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onOpenLogin}
          className="self-start sm:self-center px-4 py-1.5 rounded-full bg-[#042C89] hover:bg-[#032066] text-white text-[12px] font-semibold poppins transition-colors cursor-pointer"
        >
          Member Login
        </button>
      </div>

      <p className="poppins text-[#797A88] text-[15px] sm:text-[16px] font-semibold mb-6 sm:mb-8">
        How many children would you like to add?
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {COUNTS.map((c) => {
          const selected = count === c.value;
          return (
            <button
              key={c.value}
              type="button"
              onClick={() => setCount(c.value)}
              className={`relative w-full sm:max-w-[168px] h-[110px] sm:h-[150px] rounded-[16px] sm:rounded-[18px] border-2 flex flex-col items-center justify-center transition-colors cursor-pointer ${selected
                  ? "bg-[#E6F4FB] border-[#042C89]"
                  : "bg-white border-[#C9D3F0] hover:border-[#00A6E3]"
                }`}
            >
              {selected && (
                <span className="absolute top-2.5 right-2.5 w-[18px] h-[18px] rounded-full bg-[#042C89] flex items-center justify-center">
                  <CheckIcon size={10} color="#fff" />
                </span>
              )}
              <span className="poppins text-[#34353B] font-bold text-[34px] sm:text-[44px] leading-none">{c.display}</span>
              <span className="poppins text-[#797A88] text-[11px] sm:text-[12px] mt-2">{c.label}</span>
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-3 bg-[#EEF1F8] rounded-[12px] px-4 py-3.5 mb-6 sm:mb-8">
        <div className="shrink-0 w-[26px]  h-[26px] flex justify-center items-center p-1.5 rounded-full bg-[#34353B]">
          <InfoIcon />
        </div>
        <span className="poppins text-[#34353B]  text-[12px] sm:text-[13px] font-semibold">
          Each child joins the list for their own age group.
        </span>
      </div>

      <NavButtons onBack={onBack} onNext={onNext} />
    </>
  );
}

/* ---------- STEP 2: Tell us about your child ---------- */
function StepChild({ venue, child, update, index, total, onNext, onBack, onTrial }) {
  const name = child.firstName.trim();
  const age = calcAge(child.dd, child.mm, child.yyyy);
  const group = groupFor(age);
  const slot = group ? venue.slots[group] : null;
  const dobComplete = child.dd && child.mm && child.yyyy.length === 4;
  const pron = child.gender === "Boy" ? "he" : child.gender === "Girl" ? "she" : "they";
  const who = name || "Your child";

  const dobField = (key, ph, max) => (
    <input
      type="text"
      inputMode="numeric"
      maxLength={max}
      placeholder={ph}
      value={child[key]}
      onChange={(e) => update({ [key]: e.target.value.replace(/\D/g, "") })}
      className={`${inputClass} min-w-0 text-center font-bold px-2 ${key === "yyyy" ? "flex-[1.6] sm:flex-none sm:w-[150px]" : "flex-1 sm:flex-none sm:w-[96px]"
        }`}
    />
  );

  return (
    <>
      <StepTop onBack={onBack} label="About 1 min" />
      <Progress step={2} />
      <WaitingPill venue={venue} />
      <Heading line1="Tell us about" line2={total > 1 ? `your child.` : "your child."} />
      <div className="mb-5 sm:mb-7" />

      <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-5">
        <div>
          <label className={labelClass}>First name</label>
          <input type="text" placeholder="First name" value={child.firstName} onChange={(e) => update({ firstName: e.target.value })} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Last name</label>
          <input type="text" placeholder="Last name" value={child.lastName} onChange={(e) => update({ lastName: e.target.value })} className={inputClass} />
        </div>
      </div>

      <label className={labelClass}>Date of birth</label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
        <div className="flex gap-3 sm:gap-4">
          {dobField("dd", "DD", 2)}
          {dobField("mm", "MM", 2)}
          {dobField("yyyy", "YYYY", 4)}
        </div>

        {dobComplete && age != null && (
          <div className="flex items-center gap-3 bg-[#FFF4E0] rounded-[14px] px-4 py-2.5">
            <div className="shrink-0 w-[26px]  h-[26px] flex justify-center items-center p-1.5 rounded-full bg-[#34353B]">
              <InfoIcon color="#9A5B00" size={20} />
            </div>
            <span className="poppins text-[#9A5B00] text-[11px] sm:text-[12px] font-bold leading-snug">
              {group ? (
                <>
                  {who} is {age}, so {pron}’ll join the waiting list for
                  <br />
                  {groupToYears(group)} · {venue.shortDay} {slot}
                </>
              ) : (
                <>Sorry, we don’t have a waiting list for age {age} yet.</>
              )}
            </span>
          </div>
        )}
      </div>

      {group && venue.alternative && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2 bg-[#E7FAF2] rounded-[12px] px-4 py-3 sm:py-3.5 mb-5 sm:mb-7">
          <span className="poppins text-[#067A4B] text-[11px] sm:text-[14px] font-bold">
            Good news: {venue.alternative.name} has a {group} space
            <span className="hidden sm:inline"> on {venue.alternative.day}.</span>
          </span>
          <button
            type="button"
            onClick={onTrial}
            className="poppins text-[#067A4B] text-[11px] sm:text-[13px] font-bold hover:underline cursor-pointer text-left sm:whitespace-nowrap"
          >
            Book a FREE trial there instead →
          </button>
        </div>
      )}

      <div className="border-t border-[#E6EAF3] pt-5 sm:pt-6 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5">
          <div>
            <label className={labelClass}>{name || "Your child"} is a…</label>
            <div className="grid grid-cols-2 gap-3">
              {["Boy", "Girl"].map((g) => (
                <Chip key={g} label={g} selected={child.gender === g} onClick={() => update({ gender: g })} />
              ))}
            </div>
          </div>
          <div>
            <label className={labelClass}>Any medical or additional needs?</label>
            <div className="grid grid-cols-2 gap-3">
              {["No", "Yes"].map((v) => (
                <Chip key={v} label={v} selected={child.needs === v} onClick={() => update({ needs: v })} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <NavButtons onBack={onBack} onNext={() => onNext({ age, group })} />
    </>
  );
}

/* ---------- STEP 3: About you (parent) ---------- */
function StepParent({ venue, parent, update, childName, onNext, onBack, isCheckingEmail = false }) {
  return (
    <>
      <StepTop onBack={onBack} label="Under a minute" done />
      <Progress step={3} />
      <WaitingPill venue={venue} />
      <Heading line1="Now, a little" line2="about you." />
      <p className="poppins text-[#797A88] text-[13px] sm:text-[14px] mb-5 sm:mb-7">
        We’ll text and email you when a space opens.
      </p>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4">
        <div>
          <label className={labelClass}>First name</label>
          <input type="text" placeholder="First name" value={parent.firstName} onChange={(e) => update({ firstName: e.target.value })} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Last name</label>
          <input type="text" placeholder="Last name" value={parent.lastName} onChange={(e) => update({ lastName: e.target.value })} className={inputClass} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5 sm:mb-6">
        <div>
          <label className={labelClass}>Email</label>
          <input type="email" placeholder="name@email.com" value={parent.email} onChange={(e) => update({ email: e.target.value })} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Mobile number</label>
          <div className="flex items-center h-[50px] bg-white border border-[#C9D3F0] rounded-[14px] focus-within:border-[#042C89] transition-colors">
            <span className="poppins font-bold text-[#34353B] text-[14px] pl-4 pr-3 border-r border-[#C9D3F0] h-[24px] flex items-center">
              +44
            </span>
            <input
              type="tel"
              placeholder="07700 900123"
              value={parent.phone}
              onChange={(e) => update({ phone: e.target.value })}
              className="flex-1 min-w-0 h-full bg-transparent px-3 text-[15px] text-[#34353B] poppins placeholder-[#9AA3B8] outline-none"
            />
          </div>
        </div>
      </div>

      <div className="mb-5 sm:mb-6">
        <label className={labelClass}>You are {childName ? `${childName}’s` : "their"}…</label>
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {RELATIONS.map((r) => (
            <Chip
              key={r}
              label={r}
              mobileCheck={false}
              selected={parent.relation === r}
              onClick={() => update({ relation: r })}
            />
          ))}
        </div>
      </div>

      <div className="mb-6 sm:mb-8">
        <label className={labelClass}>How did you hear about us?</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
          {HEARD.map((h) => (
            <Chip
              key={h}
              label={h}
              mobileCheck={false}
              selected={parent.heard === h}
              onClick={() => update({ heard: h })}
            />
          ))}
        </div>
      </div>

      <NavButtons onBack={onBack} onNext={onNext} loading={isCheckingEmail} />
    </>
  );
}

/* ---------- STEP 4: Last step (conditional auth / join waiting list) ---------- */
function StepJoin({
  venue,
  kids,
  childName,
  parent,
  updateParent,
  account,
  accountStatus,
  update,
  onSubmit,
  onBack,
  onEdit,
  isSubmitting
}) {
  const [mode, setMode] = useState(() => {
    if (accountStatus?.checked) {
      return accountStatus.exists ? 'login' : 'register';
    }
    return 'login';
  });
  const [email, setEmail] = useState(accountStatus?.email || account.email || parent.email || '');
  const [password, setPassword] = useState(account.password || '');
  const [showPw, setShowPw] = useState(false);
  const [agree, setAgree] = useState(account.agree || false);
  const [error, setError] = useState('');
  const [existingParentInfo, setExistingParentInfo] = useState(accountStatus?.parentInfo || null);

  useEffect(() => {
    if (accountStatus?.checked) {
      setMode(accountStatus.exists ? 'login' : 'register');
      if (accountStatus.parentInfo) setExistingParentInfo(accountStatus.parentInfo);
      if (accountStatus.email) setEmail(accountStatus.email);
    }
  }, [accountStatus]);

  const handleEmailChange = (val) => {
    setEmail(val);
    update({ email: val });
    if (error) setError('');
  };

  const handleLoginSubmit = async (e) => {
    e?.preventDefault();
    if (isSubmitting) return;

    if (!password) {
      setError('Please enter your password');
      return;
    }

    setError('');

    try {
      await onSubmit?.({
        email: email.trim(),
        password,
        firstName: existingParentInfo?.firstName || parent.firstName,
        lastName: existingParentInfo?.lastName || parent.lastName,
        isExistingAccount: true
      });
    } catch (err) {
      console.error('Waiting list submit error:', err);
      setError(err.message || 'Incorrect password. Please try again.');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e?.preventDefault();
    if (isSubmitting) return;

    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError('Please enter a valid email address');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    if (!agree) {
      setError('Please agree to the Terms & Conditions and Privacy Policy');
      return;
    }

    setError('');
    await onSubmit?.({
      email: email.trim(),
      password,
      firstName: parent.firstName?.trim() || '',
      lastName: parent.lastName?.trim() || '',
      isExistingAccount: false
    });
  };

  const MobileSummary = (
    <div className="lg:hidden bg-[#042C89] rounded-[18px] px-5 py-4 mt-5 mb-4">
      <div className="flex items-center justify-between mb-2">
        <span className="poppins text-[#FFDE14] text-[10px] font-bold uppercase tracking-wide">Your waiting list</span>
        <button type="button" onClick={onEdit} className="poppins text-white text-[12px] font-semibold hover:underline cursor-pointer">
          Edit
        </button>
      </div>
      <h3 className="poppins text-white font-bold text-[16px] leading-tight mb-1.5">
        {venue.name} · {venue.day}
      </h3>
      <p className="poppins text-[#C9D3F0] text-[12px] inline-flex items-center gap-1.5">
        <PinIcon size={12} />
        {venue.address}
      </p>
      <div className="border-t border-white/15 mt-3 pt-3 space-y-2">
        {kids.map((c, i) => {
          const g = groupFor(calcAge(c.dd, c.mm, c.yyyy));
          return (
            <p key={i} className="poppins text-white text-[12px] font-semibold flex items-center gap-2">
              <UserIcon size={13} />
              <span>
                {c.firstName.trim() || `Child ${i + 1}`}
                {g ? ` · ${groupToYears(g)} · ${venue.slots?.[g] || ""}` : ""}
              </span>
            </p>
          );
        })}
      </div>
    </div>
  );

  const SpaceInfoBox = (
    <div className="flex items-center gap-3 bg-[#EEF1F8] rounded-[12px] px-4 py-3.5 mb-5 sm:mb-7">
      <div className="shrink-0 w-[26px] h-[26px] flex justify-center items-center p-1.5 rounded-full bg-[#34353B]">
        <InfoIcon />
      </div>
      <span className="poppins text-[#34353B] text-[11px] sm:text-[13px] font-semibold">
        When a space opens, we’ll text and email you a link to log in and book within 24 hours.
      </span>
    </div>
  );

  if (mode === 'login') {
    return (
      <form onSubmit={handleLoginSubmit} noValidate>
        <StepTop onBack={onBack} label="Last step" done />
        <Progress pct={90} />
        <WaitingPill venue={venue} className="hidden sm:inline-flex" />
        <Heading line1="Welcome back:" line2="log in." />
        <p className="poppins hidden lg:block text-[#797A88] text-[14px] font-medium mb-7">
          An account already exists for this email. Enter your password to join the waiting list.
        </p>

        {MobileSummary}
        {SpaceInfoBox}

        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div>
            <h3 className="poppins text-[#042C89] font-bold text-[16px] leading-tight">
              Log in to your Samba account
            </h3>
            <p className="poppins text-[#797A88] text-[12px] sm:text-[13px] mt-0.5">
              {existingParentInfo?.firstName
                ? `Welcome back, ${existingParentInfo.firstName}!`
                : "Enter your password to continue."}
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#EBF7FC] text-[#002B9A] border border-[#C9D3F0]">
            <UserCheck className="w-3.5 h-3.5" />
            Existing Account
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className={labelClass}>Account email</label>
              <button
                type="button"
                onClick={onBack}
                className="poppins text-[#00A6E3] text-[11px] font-bold hover:underline cursor-pointer"
              >
                Change email
              </button>
            </div>
            <input
              type="email"
              value={email}
              readOnly
              className={`${inputClass} bg-[#F6F8FC] text-[#475569] cursor-not-allowed`}
            />
            <span className="poppins text-[#797A88] text-[11px] block mt-1.5">
              Verified existing parent account
            </span>
          </div>

          <div>
            <label className={labelClass}>Password</label>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  update({ password: e.target.value });
                  if (error) setError('');
                }}
                disabled={isSubmitting}
                className={`${inputClass} pr-12`}
              />
              <button
                type="button"
                onClick={() => setShowPw((s) => !s)}
                aria-label={showPw ? "Hide password" : "Show password"}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#797A88] hover:text-[#042C89] cursor-pointer"
              >
                <EyeIcon off={showPw} />
              </button>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="poppins text-[#797A88] text-[11px]">Enter your password</span>
              <a
                href="https://parent-dash.netlify.app/auth/forgot-password"
                target="_blank"
                rel="noreferrer"
                className="poppins text-[#00A6E3] text-[11px] font-bold hover:underline"
              >
                Forgot password?
              </a>
            </div>
          </div>
        </div>

        <div className="mb-5">
          <button
            type="button"
            onClick={() => {
              setMode('register');
              setPassword('');
              setError('');
            }}
            className="poppins text-[#00A6E3] text-[12px] font-bold hover:underline cursor-pointer"
          >
            Need to create a new account instead?
          </button>
        </div>

        {error && (
          <p role="alert" className="poppins text-xs font-bold text-rose-500 mb-4">
            {error}
          </p>
        )}

        <BottomBar>
          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={onBack}
              disabled={isSubmitting}
              className="poppins hidden sm:inline-flex items-center gap-2 text-[#042C89] font-bold text-[15px] cursor-pointer hover:underline disabled:opacity-40"
            >
              <ArrowLeft size={14} />
              <span>Back</span>
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="poppins flex-1 sm:max-w-[300px] h-[48px] sm:h-[52px] bg-[#0DD180] hover:bg-[#0bbb71] text-[#042C89] sm:text-white font-bold text-[15px] sm:text-[17px] rounded-full inline-flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer disabled:opacity-70"
            >
              {isSubmitting ? (
                <span key="loading" className="inline-flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Joining...</span>
                </span>
              ) : (
                <span key="content" className="inline-flex items-center gap-2">
                  <span>Join waiting list</span>
                  <ArrowRightSvg size={16} />
                </span>
              )}
            </button>
          </div>
          <p className="poppins text-[#797A88] text-[11px] sm:text-[12px] text-center mt-3 sm:mt-4">
            Free to join · Leave anytime
          </p>
        </BottomBar>
      </form>
    );
  }

  // mode === 'register'
  return (
    <form onSubmit={handleRegisterSubmit} noValidate>
      <StepTop onBack={onBack} label="Last step" done />
      <Progress pct={90} />
      <WaitingPill venue={venue} className="hidden sm:inline-flex" />
      <Heading line1="Last step:" line2="join the list." />
      <p className="poppins hidden lg:block text-[#797A88] text-[14px] font-medium mb-7">
        Check the details on the right, then create your Samba account.
      </p>

      {MobileSummary}
      {SpaceInfoBox}

      <h3 className="poppins text-[#042C89] font-bold text-[16px] leading-tight">
        Create your Samba account
      </h3>
      <p className="poppins text-[#797A88] text-[12px] sm:text-[13px] mb-4">
        You’ll use this to book when {childName ? `${childName}’s` : "your child’s"} space opens.
        <span className="hidden sm:inline"> It registers you in Synco.</span>
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
        <div>
          <label className={labelClass}>Account email</label>
          <input
            type="email"
            placeholder="name@email.com"
            value={email}
            onChange={(e) => handleEmailChange(e.target.value)}
            disabled={isSubmitting}
            className={inputClass}
          />
          <button
            type="button"
            onClick={() => { setMode('login'); setError(''); }}
            className="poppins text-[#00A6E3] text-[12px] font-bold mt-2 hover:underline cursor-pointer block"
          >
            Have an account? Log in
          </button>
        </div>

        <div>
          <label className={labelClass}>Create a password</label>
          <div className="relative">
            <input
              type={showPw ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                update({ password: e.target.value });
                if (error) setError('');
              }}
              disabled={isSubmitting}
              className={`${inputClass} pr-12`}
            />
            <button
              type="button"
              onClick={() => setShowPw((s) => !s)}
              aria-label={showPw ? "Hide password" : "Show password"}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#797A88] hover:text-[#042C89] cursor-pointer"
            >
              <EyeIcon off={showPw} />
            </button>
          </div>
          <span className="poppins text-[#797A88] text-[11px] block mt-1.5">
            At least 8 characters
          </span>
        </div>
      </div>

      {/* Terms */}
      <label className="flex items-center gap-3 cursor-pointer select-none mb-6">
        <span
          onClick={() => {
            if (isSubmitting) return;
            const nextAgree = !agree;
            setAgree(nextAgree);
            update({ agree: nextAgree });
            if (error) setError('');
          }}
          className={`w-[20px] h-[20px] shrink-0 rounded-[6px] border-2 flex items-center justify-center transition-colors cursor-pointer ${
            agree ? "bg-[#0DD180] border-[#0DD180]" : "border-[#C9D3F0] bg-white"
          }`}
        >
          {agree && <CheckIcon size={11} color="#fff" />}
        </span>
        <span className="poppins text-[11px] sm:text-[14px] text-[#34353B]">
          I agree to the{" "}
          <a href="/terms-and-conditions" target="_blank" rel="noreferrer" className="text-[#00A6E3] font-bold hover:underline">
            Terms &amp; Conditions
          </a>{" "}
          and{" "}
          <a href="/privacy-policy" target="_blank" rel="noreferrer" className="text-[#00A6E3] font-bold hover:underline">
            Privacy Policy
          </a>
          .
        </span>
      </label>

      {error && (
        <p role="alert" className="poppins text-xs font-bold text-rose-500 mb-4">
          {error}
        </p>
      )}

      <BottomBar>
        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBack}
            disabled={isSubmitting}
            className="poppins hidden sm:inline-flex items-center gap-2 text-[#042C89] font-bold text-[15px] cursor-pointer hover:underline disabled:opacity-40"
          >
            <ArrowLeft size={14} />
            <span>Back</span>
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="poppins flex-1 sm:max-w-[300px] h-[48px] sm:h-[52px] bg-[#0DD180] hover:bg-[#0bbb71] text-[#042C89] font-bold text-[15px] sm:text-[17px] rounded-full inline-flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer disabled:opacity-70"
          >
            {isSubmitting ? (
              <span key="loading" className="inline-flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Joining...</span>
              </span>
            ) : (
              <span key="content" className="inline-flex items-center gap-2">
                <span>Join the waiting list</span>
                <ArrowRightSvg size={16} />
              </span>
            )}
          </button>
        </div>
        <p className="poppins text-[#797A88] text-[11px] sm:text-[12px] text-center mt-3 sm:mt-4">
          Free to join · Leave anytime
        </p>
      </BottomBar>
    </form>
  );
}

/* ---------- Right: Summary (desktop only) ---------- */
function SummaryCard({ venue, count, kids, showChildren, onChange }) {
  return (
    <aside className="hidden lg:block w-full lg:w-[360px] lg:shrink-0">
      <div className="bg-white rounded-[22px] overflow-hidden shadow-[0_10px_30px_rgba(4,44,137,0.08)] border border-[#E6EAF3]">
        <div className="bg-[#042C89] px-6 pt-5 pb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="poppins text-[#FFDE14] text-[11px] font-bold uppercase tracking-wide">Your waiting list</span>
            <button type="button" onClick={onChange} className="poppins text-white text-[13px] font-semibold hover:underline cursor-pointer">
              Change
            </button>
          </div>
          <h3 className="poppins text-white font-bold text-[20px] leading-tight mb-2">
            {venue.name} · {venue.day}
          </h3>
          <p className="poppins text-[#C9D3F0] text-[13px] inline-flex items-center gap-1.5">
            <PinIcon size={13} />
            {venue.address}
          </p>
        </div>

        <div className="px-6 py-5">
          <div className="pb-4 border-b border-[#E6EAF3] mb-4 space-y-3">
            {showChildren ? (
              kids.map((c, i) => {
                const g = groupFor(calcAge(c.dd, c.mm, c.yyyy));
                return (
                  <div key={i} className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="w-[30px] h-[30px] rounded-full bg-[#00A6E3] text-white poppins font-bold text-[13px] flex items-center justify-center shrink-0">
                        {(c.firstName.trim()[0] || "?").toUpperCase()}
                      </span>
                      <div className="min-w-0">
                        <p className="poppins text-[#34353B] text-[14px] font-bold leading-tight truncate">
                          {c.firstName || `Child ${i + 1}`}
                        </p>
                        <p className="poppins text-[#797A88] text-[12px]">
                          {g ? `${groupToYears(g)} · ${venue.shortDay} ${venue.slots[g]}` : "Details next"}
                        </p>
                      </div>
                    </div>
                    <span className="poppins bg-[#FFF4E0] text-[#9A5B00] text-[11px] font-semibold px-2.5 py-1 rounded-full shrink-0">
                      Waiting list
                    </span>
                  </div>
                );
              })
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-[34px] h-[34px] rounded-full bg-[#EEF1F8] flex items-center justify-center">
                    <UserIcon size={16} />
                  </span>
                  <div>
                    <p className="poppins text-[#797A88] text-[15px] font-semibold leading-tight">
                      {count > 1 ? `Your children (${count === 4 ? "4+" : count})` : "Your child"}
                    </p>
                    <p className="poppins text-[#797A88] text-[12px]">Details next</p>
                  </div>
                </div>
                <span className="poppins bg-[#FFF4E0] text-[#9A5B00] text-[11px] font-semibold px-2.5 py-1 rounded-full">
                  Waiting list
                </span>
              </div>
            )}
          </div>

          <ul className="space-y-3">
            {perks.map((p) => (
              <li key={p} className="flex items-center gap-2.5">
                <GreenCheckBadge size={16} />
                <span className="poppins text-[#34353B] text-[14px] font-bold">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex items-center justify-between px-2 mt-6">
        <span className="poppins inline-flex items-center gap-2 text-[#042C89] text-[14px] font-bold">
          <WhatsAppIcon size={14} />
          Questions? WhatsApp us
        </span>
        <span className="poppins text-[#797A88] text-[13px]">{venue.phone}</span>
      </div>
    </aside>
  );
}

/* ---------- Main ---------- */
const WhoJoining = ({ venue = DEFAULT_VENUE, selectedClass = null, onExit, onTrial, onLogin, onSubmit, onComplete }) => {
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(1);
  const [childIdx, setChildIdx] = useState(0);
  const [kids, setKids] = useState([emptyChild()]);
  const [parent, setParent] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    relation: "",
    heard: "",
  });
  const [account, setAccount] = useState({ email: "", password: "", agree: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const handleLoginSuccess = (userData) => {
    setParent((p) => ({
      ...p,
      firstName: userData.firstName || p.firstName,
      lastName: userData.lastName || p.lastName,
      email: userData.email || p.email,
      phone: userData.phone || p.phone,
    }));
    toast.success("Logged in! Your details have been auto-filled.");
  };

  const total = count;
  const updateChild = (patch) =>
    setKids((prev) => prev.map((c, i) => (i === childIdx ? { ...c, ...patch } : c)));
  const updateParent = (patch) => setParent((p) => ({ ...p, ...patch }));
  const updateAccount = (patch) => setAccount((a) => ({ ...a, ...patch }));

  const fromStep1 = () => {
    setKids((prev) => Array.from({ length: count }, (_, i) => prev[i] || emptyChild()));
    setChildIdx(0);
    setStep(2);
  };

  const fromStep2 = ({ age, group }) => {
    const c = kids[childIdx];
    if (!c.firstName.trim() || !c.lastName.trim()) return toast.error("Please enter the child’s first and last name.");
    if (age == null) return toast.error("Please enter a valid date of birth.");
    if (!group) return toast.error(`Sorry, we don’t have a waiting list for age ${age} yet.`);
    if (!c.gender) return toast.error("Please select boy or girl.");
    if (!c.needs) return toast.error("Please tell us about any medical or additional needs.");

    if (childIdx < total - 1) setChildIdx(childIdx + 1);
    else setStep(3);
  };

  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [accountStatus, setAccountStatus] = useState(null);

  const fromStep3 = async () => {
    const { firstName, lastName, email, phone, relation, heard } = parent;
    if (!firstName.trim() || !lastName.trim()) return toast.error("Please enter your first and last name.");
    if (!/^\S+@\S+\.\S+$/.test(email)) return toast.error("Please enter a valid email address.");
    if (phone.replace(/\D/g, "").length < 9) return toast.error("Please enter a valid mobile number.");
    if (!relation) return toast.error("Please select your relationship to the child.");
    if (!heard) return toast.error("Please tell us how you heard about us.");

    setIsCheckingEmail(true);
    try {
      const trimmedEmail = email.trim();
      const res = await checkParentEmail(trimmedEmail);
      setAccountStatus({
        checked: true,
        exists: Boolean(res?.exists),
        email: trimmedEmail,
        parentInfo: res?.data || null
      });
      setAccount((a) => ({ ...a, email: trimmedEmail }));
      setIsCheckingEmail(false);
      setStep(4);
    } catch (err) {
      console.error("Email verification error:", err);
      toast.error(err.message || "Unable to verify email. Please try again.");
      setIsCheckingEmail(false);
    }
  };

  const fromStep4 = async (authData) => {
    setIsSubmitting(true);
    try {
      const venueId = Number(venue?.venueId || venue?.id) || 5;
      const totalStudents = kids.length;

      const students = kids.map((c) => {
        const age = calcAge(c.dd, c.mm, c.yyyy) || 6;
        const g = groupFor(age);

        let clsId = c.classScheduleId || selectedClass?.classId || selectedClass?.id;
        if (!clsId && venue?.schedule?.classes?.length) {
          const matched = venue.schedule.classes.find((cl) => {
            const n = (cl.className || cl.ageGroup || '').toLowerCase();
            if (g === '4–5s' && (n.includes('4') || n.includes('5'))) return true;
            if (g === '6–7s' && (n.includes('6') || n.includes('7'))) return true;
            if (g === '8–9s' && (n.includes('8') || n.includes('9'))) return true;
            if (g === '10–12s' && (n.includes('10') || n.includes('11') || n.includes('12'))) return true;
            return false;
          });
          clsId = matched?.classId || venue.schedule.classes[0]?.classId;
        }
        if (!clsId) clsId = 12;

        let gender = 'male';
        if (c.gender) {
          const genLower = c.gender.toLowerCase();
          if (genLower.includes('girl') || genLower.includes('female')) gender = 'female';
        }

        const mm = String(c.mm || '01').padStart(2, '0');
        const dd = String(c.dd || '01').padStart(2, '0');
        const yyyy = c.yyyy || '2019';

        return {
          studentFirstName: c.firstName.trim() || 'Child',
          studentLastName: c.lastName.trim() || parent.lastName.trim() || 'Student',
          dateOfBirth: `${yyyy}-${mm}-${dd}`,
          age,
          gender,
          medicalInformation: c.needs?.trim() || 'NA',
          classScheduleId: Number(clsId)
        };
      });

      let phone = (parent.phone || '').trim();
      if (!phone.startsWith('+')) {
        const digits = phone.replace(/\D/g, '');
        if (digits.startsWith('0')) {
          phone = '+44' + digits.slice(1);
        } else if (digits.startsWith('44')) {
          phone = '+' + digits;
        } else if (digits.length >= 10) {
          phone = '+44' + digits;
        } else {
          phone = '+44' + digits;
        }
      }

      let relation = parent.relation || 'Father';
      if (relation === 'Mum') relation = 'Mother';
      if (relation === 'Dad') relation = 'Father';

      const resolvedEmail = (authData?.email || account.email || parent.email || '').trim();
      const resolvedFirstName = (authData?.firstName || parent.firstName || 'Parent').trim();
      const resolvedLastName = (authData?.lastName || parent.lastName || 'Guardian').trim();
      const resolvedPassword = authData?.password || account.password || '123456';

      const parents = [
        {
          parentFirstName: resolvedFirstName,
          parentLastName: resolvedLastName,
          parentEmail: resolvedEmail,
          parentPhoneNumber: phone,
          relationToChild: relation,
          interestReason: "To build my child's confidence",
          interestReasonOther: "NA",
          howDidYouHear: parent.heard || "Other",
          isCustomReason: false
        }
      ];

      const emergency = {
        sameAsAbove: true,
        emergencyFirstName: resolvedFirstName,
        emergencyLastName: resolvedLastName,
        emergencyPhoneNumber: phone,
        emergencyRelation: relation
      };

      const payload = {
        interest: "Medium",
        venueId,
        totalStudents,
        password: resolvedPassword,
        students,
        parents,
        emergency
      };

      console.log('Submitting waiting list payload:', payload);
      let result;
      if (onSubmit) {
        result = await onSubmit({ venue, children: kids, parent, account: { email: resolvedEmail, password: resolvedPassword }, payload });
      } else {
        result = await createWaitingListBooking(payload);
      }
      console.log('Waiting list response:', result);

      if (result?.token) {
        try {
          localStorage.setItem('parent_token', result.token);
        } catch (e) {}
      }

      toast.success("You’re on the waiting list!");
      onComplete?.({
        venue,
        kids,
        parent: {
          ...parent,
          firstName: resolvedFirstName,
          lastName: resolvedLastName,
          email: resolvedEmail
        },
        email: resolvedEmail,
        bookingResult: result
      });
    } catch (err) {
      console.error('Error submitting waiting list:', err);
      toast.error(err.message || "Something went wrong. Please try again.");
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  const goBack = () => {
    if (step === 1) return onExit?.();
    if (step === 2 && childIdx > 0) return setChildIdx(childIdx - 1);
    if (step === 3) {
      setChildIdx(total - 1);
      return setStep(2);
    }
    setStep(step - 1);
  };

  return (
    <section className="relative w-full pt-6 pb-0 md:pt-10 md:py-14 bg-[#F6F8FC] overflow-x-clip">
      <Container>
        <div className="flex flex-col lg:flex-row justify-between gap-5 lg:gap-10 max-w-[1200px] mx-auto">
          {/* LEFT */}
          <div className="w-full lg:flex-1 lg:min-w-0 text-left">
            {step === 1 && (
              <StepWhoJoining
                venue={venue}
                count={count}
                setCount={setCount}
                onNext={fromStep1}
                onBack={goBack}
                onOpenLogin={() => {
                  if (onLogin) onLogin();
                  else setLoginModalOpen(true);
                }}
              />
            )}

            {step === 2 && (
              <StepChild
                key={childIdx}
                venue={venue}
                child={kids[childIdx]}
                update={updateChild}
                index={childIdx}
                total={total}
                onNext={fromStep2}
                onBack={goBack}
                onTrial={() => onTrial?.(kids[childIdx])}
              />
            )}

            {step === 3 && (
              <StepParent
                venue={venue}
                parent={parent}
                update={updateParent}
                childName={kids[0]?.firstName.trim()}
                onNext={fromStep3}
                onBack={goBack}
                isCheckingEmail={isCheckingEmail}
              />
            )}

            {step === 4 && (
              <StepJoin
                venue={venue}
                kids={kids}
                childName={kids[0]?.firstName.trim()}
                parent={parent}
                updateParent={updateParent}
                account={account}
                accountStatus={accountStatus}
                update={updateAccount}
                onSubmit={fromStep4}
                onBack={goBack}
                onEdit={() => setStep(1)}
                onLogin={() => onLogin?.()}
                isSubmitting={isSubmitting}
              />
            )}
          </div>

          {/* RIGHT (desktop only) */}
          <SummaryCard
            venue={venue}
            count={count}
            kids={kids}
            showChildren={step >= 3}
            onChange={() => setStep(1)}
          />
        </div>
      </Container>

      {/* Samba Connect Login Modal for Existing Members */}
      <SambaLoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </section>
  );
};

export default WhoJoining;