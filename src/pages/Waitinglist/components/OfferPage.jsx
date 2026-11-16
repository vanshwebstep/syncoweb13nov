import React, { useEffect, useState, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Container } from "../../../components/common/Container";
import { useToast } from "../../../components/common/Toaster";
import { loginParent } from "../../../services/venueService";

const BASE = "https://webstepdev.com/demo/syncoWebsiteImages/waitinglist";
const IMG = {
  hero: `${BASE}/offerpageherobg.png`,
  heroMobile: `${BASE}/offerpageherobgmobile.png`,
  whiteLine: `${BASE}/whiteunderline.png`,
  skyClock: `${BASE}/skyblueclock.png`,
  user: `${BASE}/user.png`,
  gift: `${BASE}/gift.png`,
  nextArrow: `${BASE}/whitenextarrow.png`,
};

const pad = (n) => String(Math.max(0, n)).padStart(2, "0");

function useOfferCountdown(deadlineMs, durationHours = 3) {
  const [target] = useState(() =>
    deadlineMs ? new Date(deadlineMs).getTime() : Date.now() + durationHours * 3600 * 1000
  );
  const calc = () => Math.max(0, Math.floor((target - Date.now()) / 1000));
  const [left, setLeft] = useState(calc);

  useEffect(() => {
    const t = setInterval(() => setLeft(calc()), 1000);
    return () => clearInterval(t);
  }, [target]);

  return {
    hours: pad(Math.floor(left / 3600)),
    mins: pad(Math.floor((left % 3600) / 60)),
    secs: pad(left % 60),
    expired: left === 0,
    targetDate: new Date(target)
  };
}

const EyeIcon = ({ off }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
    <circle cx="12" cy="12" r="3" />
    {off && <path d="M4 4l16 16" />}
  </svg>
);

const inputClass =
  "w-full h-[50px] bg-white border border-[#C9D3F0] rounded-[14px] px-4 text-[16px] text-[#34353B] poppins placeholder-[#9AA3B8] outline-none focus:bg-[#F6F8FC] focus:border-[#C9D3F0] transition-colors";
const labelClass = "block poppins text-[13px] sm:text-[14px] font-bold text-[#042C89] mb-1.5";

function TimeBox({ value, label }) {
  return (
    <div className="flex-1 sm:flex-none sm:w-[162.7px] h-[84px] sm:h-[96px] bg-white rounded-[18px] flex flex-col items-center justify-center shadow-[0_8px_20px_rgba(0,0,0,0.12)]">
      <span className="gasoek text-[#042C89] text-[32px] sm:text-[40px] leading-none">{value}</span>
      <span className="poppins text-[#797A88] text-[12px] mt-1.5">{label}</span>
    </div>
  );
}

export function OfferPage({ data: propData, onLogin, onKeep, onRemove, onForgot }) {
  const toast = useToast();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Extract from URL query params or fallback
  const childName = searchParams.get('child') || searchParams.get('childName') || propData?.childName || "Leo";
  const emailParam = searchParams.get('email') || propData?.email || "sarah@email.com";
  const venueName = searchParams.get('venue') || propData?.venue?.name || "Wimbledon";
  const venueAddress = searchParams.get('address') || propData?.venue?.address || "Pelham Road, London SW19 1NX";
  const timeParam = searchParams.get('time') || propData?.time || "4:00 – 5:00pm";
  const ageGroupParam = searchParams.get('ageGroup') || propData?.ageGroup || "4–5 Years";
  const levelParam = searchParams.get('level') || propData?.level || "Beginner";
  const venueId = searchParams.get('venueId') || "5";
  const classId = searchParams.get('classId') || "12";

  // Transfer check: transfer offers last 24 hours; new family waiting list offers last 3 hours
  const isTransfer = searchParams.get('type') === 'transfer' || propData?.type === 'transfer';
  const durationHours = isTransfer ? 24 : 3;

  const deadlineParam = searchParams.get('deadline') || propData?.deadline;
  const { hours, mins, secs, expired, targetDate } = useOfferCountdown(deadlineParam, durationHours);

  const formattedBookBy = useMemo(() => {
    const hoursStr = targetDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dayStr = targetDate.toLocaleDateString([], { weekday: 'short', day: 'numeric', month: 'short' });
    return `${hoursStr} (${dayStr})`;
  }, [targetDate]);

  const [email, setEmail] = useState(emailParam);
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return toast.error("Please enter a valid email address.");
    if (!password) return toast.error("Please enter your password.");
    setLoading(true);

    try {
      if (onLogin) {
        await onLogin({ email, password });
      } else {
        await loginParent(email, password);
      }
      toast.success("Logged in successfully! Redirecting to secure your spot...");
      setTimeout(() => {
        // Redirect to booking trial or membership
        if (isTransfer) {
          navigate(`/book-membership?venueId=${venueId}&classId=${classId}&transfer=true&child=${encodeURIComponent(childName)}`);
        } else {
          navigate(`/book-trial?venueId=${venueId}&classId=${classId}&offer=accepted&child=${encodeURIComponent(childName)}`);
        }
      }, 800);
    } catch (err) {
      toast.error(err?.message || "Login failed. Please check your password.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeepOnList = () => {
    if (onKeep) {
      onKeep();
    } else {
      toast.info(`Moved ${childName} to the back of the queue. We'll text you when the next space opens.`);
      navigate(`/waiting-list/offer-expired?child=${encodeURIComponent(childName)}&venue=${encodeURIComponent(venueName)}`);
    }
  };

  const handleRemoveFromList = () => {
    if (onRemove) {
      onRemove();
    } else {
      toast.info(`${childName} has been removed from the waiting list.`);
      navigate('/find-a-class');
    }
  };

  return (
    <div className="w-full bg-[#F6F8FC]">
      {/* ---------- HERO ---------- */}
      <section className="relative w-full bg-[#042C89] overflow-hidden">
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
          <div className="text-center pt-10 pb-12 sm:pt-12 sm:pb-14 lg:pt-14 lg:pb-16">
            <span className="poppins block text-[#FFDE14] font-semibold text-[12px] sm:text-[13px] tracking-wide uppercase mb-3">
              {isTransfer ? "Transfer space held for 24 hours" : "Space held for 3 hours"}
            </span>

            <h1 className="mb-6">
              <span className="recline block text-white font-bold text-[30px] sm:text-[34px] lg:text-[38px] leading-[1.1] mb-1">
                A space is ready
              </span>
              <span className="inline-block">
                <span className="gasoek block text-[#FFDE14] uppercase text-[40px] sm:text-[48px] lg:text-[54px] leading-[1.05]">
                  for {childName}!
                </span>
                <img src={IMG.whiteLine} alt="" className="block w-0 min-w-full h-auto -mt-1" />
              </span>
            </h1>

            {/* Countdown */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-6 max-w-[560px] mx-auto">
              <TimeBox value={hours} label="hours" />
              <TimeBox value={mins} label="mins" />
              <TimeBox value={secs} label="secs" />
            </div>

            <p className="poppins text-white text-[14px] font-semibold">
              {expired ? "This offer has now expired." : `Book by ${formattedBookBy}`}
            </p>
          </div>
        </Container>
      </section>

      {/* ---------- BODY ---------- */}
      <section className="py-8 md:py-14">
        <Container>
          <div className="max-w-[1000px] mx-auto text-left">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
              {/* LEFT: session card */}
              <div className="w-full lg:w-[42%] bg-white rounded-[22px] border border-[#E6EAF3] shadow-[0_8px_24px_rgba(4,44,137,0.06)] p-4 sm:p-6">
                <div className="flex items-center gap-4 sm:gap-5 sm:pb-4 sm:border-b sm:border-[#E6EAF3] sm:mb-4">
                  {/* Calendar / Offer Badge */}
                  <div className="w-[64px] h-[72px] sm:w-[82px] sm:h-[92px] bg-[#FFDE14] rounded-[14px] sm:rounded-[16px] flex flex-col items-center justify-center shrink-0">
                    <span className="poppins text-[#042C89] text-[11px] sm:text-[13px] font-bold leading-none">OFFER</span>
                    <span className="gasoek text-[#042C89] text-[26px] sm:text-[32px] leading-none my-1">{durationHours}H</span>
                    <span className="poppins text-[#042C89] text-[10px] sm:text-[12px] font-bold leading-none">FREE</span>
                  </div>

                  <div className="min-w-0">
                    <h3 className="poppins text-[#042C89] font-bold text-[16px] sm:text-[20px] leading-tight">{venueName}</h3>
                    <p className="poppins text-[#797A88] text-[11px] sm:text-[13px] mb-2">{venueAddress}</p>
                    <p className="poppins inline-flex items-center gap-1.5 text-[#34353B] text-[12px] sm:text-[14px] font-bold mb-1">
                      <img src={IMG.skyClock} alt="" className="w-[13px] h-[13px] sm:w-[14px] sm:h-[14px] object-contain" />
                      {childName} · {timeParam}
                    </p>
                    <p className="poppins flex items-center gap-1.5 text-[#34353B] text-[12px] sm:text-[14px] font-bold">
                      <img src={IMG.user} alt="" className="w-[13px] h-[13px] sm:w-[14px] sm:h-[14px] object-contain" />
                      {ageGroupParam} · {levelParam}
                    </p>
                  </div>
                </div>

                <p className="poppins hidden sm:inline-flex items-center gap-2 text-[#067A4B] text-[14px] font-bold">
                  <img src={IMG.gift} alt="" className="w-[16px] h-[16px] object-contain" />
                  Your first session is FREE
                </p>
              </div>

              {/* RIGHT: login */}
              <form
                onSubmit={submit}
                className="w-full lg:flex-1 bg-transparent sm:bg-white rounded-none sm:rounded-[22px] border-0 sm:border border-[#E6EAF3] shadow-none sm:shadow-[0_8px_24px_rgba(4,44,137,0.06)] p-0 sm:p-7"
              >
                <h2 className="recline text-[#042C89] font-bold text-[16px] sm:text-[20px] leading-tight mb-1">
                  Log in to secure this spot
                </h2>
                <p className="poppins text-[#797A88] text-[12px] sm:text-[14px] mb-4 sm:mb-5">
                  {childName}’s details are already saved in your Samba Connect account.
                </p>

                <div className="mb-4">
                  <label className={labelClass}>Account email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                    placeholder="name@email.com"
                  />
                </div>

                <div className="mb-2">
                  <label className={labelClass}>Password</label>
                  <div className="relative">
                    <input
                      type={showPw ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`${inputClass} pr-12`}
                      placeholder="Your password"
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
                </div>

                <div className="text-right mb-5">
                  <button
                    type="button"
                    onClick={() => onForgot?.()}
                    className="poppins text-[#00A6E3] text-[12px] sm:text-[13px] font-bold hover:underline cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading || expired}
                  className="poppins w-full h-[52px] bg-[#0DD180] hover:bg-[#0bbb71] text-white font-bold text-[16px] sm:text-[17px] rounded-full inline-flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
                >
                  {loading ? "Logging in..." : `Log in & claim ${childName}’s spot`}
                  {!loading && <img src={IMG.nextArrow} alt="" className="w-[16px] h-[16px] object-contain" />}
                </button>
              </form>
            </div>

            {/* Bottom actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 sm:gap-8 mt-4 sm:mt-8">
              <button
                type="button"
                onClick={handleKeepOnList}
                className="poppins w-full sm:w-auto h-[46px] px-8 bg-white border-2 border-[#042C89] text-[#042C89] font-bold text-[14px] rounded-full hover:bg-[#F6F8FC] transition-colors cursor-pointer"
              >
                Not now, keep me on the list
              </button>
              <button
                type="button"
                onClick={handleRemoveFromList}
                className="poppins text-[#E5484D] font-bold text-[13px] sm:text-[14px] hover:underline cursor-pointer"
              >
                Remove {childName} from the list
              </button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

export default OfferPage;