import React, { useState, useMemo } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { useModal } from '../../../context/ModalContext';
import { useVenue } from '../VenueContext';

const STARTER_PACK_IMG = 'https://webstepdev.com/demo/syncoWebsiteImages/venues/Starter%20pack%20box.png';

const fmt = (n) => `£${Number(n).toFixed(2)}`;

// Sibling multiplier when venue has no explicit plan for that student count
const getMultiplier = (n) => (n <= 1 ? 1 : n === 2 ? 1.85 : 1 + (n - 1) * 0.825);

const childLabel = (n) => `${n} ${n === 1 ? 'child' : 'children'}`;

export function VenueSubscriptionPlans() {
  const { venue, venueName } = useVenue();
  const { openModal } = useModal();

  const [studentCount, setStudentCount] = useState(1);

  // First class / term kept for modal payload
  const activeClass = useMemo(() => {
    if (!venue?.classes || typeof venue.classes !== 'object') return null;
    for (const [day, list] of Object.entries(venue.classes)) {
      if (Array.isArray(list) && list.length > 0) {
        return { ...list[0], day: day.charAt(0).toUpperCase() + day.slice(1) };
      }
    }
    return null;
  }, [venue]);

  const activeTerm = useMemo(
    () => (Array.isArray(venue?.terms) && venue.terms.length > 0 ? venue.terms[0] : null),
    [venue]
  );

  const rawPlans = venue?.paymentGroups?.[0]?.paymentPlans;

  // Toggle options (always 1-3, plus anything configured in API)
  const studentOptions = useMemo(() => {
    const counts = Array.isArray(rawPlans)
      ? rawPlans.map((p) => Number(p.students)).filter(Boolean)
      : [];
    return [...new Set([...counts, 1, 2, 3])].sort((a, b) => a - b);
  }, [rawPlans]);

  // Base plans -> one per duration/students combo
  const basePlans = useMemo(() => {
    if (Array.isArray(rawPlans) && rawPlans.length > 0) {
      const byDuration = new Map();
      rawPlans.forEach((p) => {
        const duration = Number(p.duration) || (/12/.test(p.title || '') ? 12 : /6/.test(p.title || '') ? 6 : 1);
        const students = Number(p.students) || 1;
        const key = `${duration}-${students}`;
        byDuration.set(key, { ...p, duration, students });
      });
      return [...byDuration.values()];
    }
    return [
      { id: '12m', title: '12-month plan', duration: 12, students: 1, price: 51.99 * 12, sessions: 38, joiningFee: 0 },
      { id: '6m', title: '6-month plan', duration: 6, students: 1, price: 61.99 * 6, sessions: 19, joiningFee: 0 }
    ];
  }, [rawPlans]);

  // Build a plan card model for n students
  const buildPlan = (duration, n) => {
    const explicit = basePlans.find((p) => p.duration === duration && p.students === n);
    const base =
      explicit ||
      basePlans.find((p) => p.duration === duration && p.students === 1) ||
      basePlans.find((p) => p.duration === duration);
    if (!base) return null;

    const mult = explicit ? 1 : getMultiplier(n);
    const total = Number(base.price) * mult;
    const monthly = total / duration;
    const sessions =
      Number(base.sessions || base.totalSessions || base.totalLessons) ||
      Math.round(duration * 4 * 0.79);
    const perSession = base.priceLesson
      ? Number(base.priceLesson) * mult
      : total / ((sessions * (explicit ? 1 : n)) || 1);
    const joiningFee = Number(base.joiningFee) || 0;

    return {
      id: base.id,
      title: base.title || `${duration}-month plan`,
      duration,
      monthly,
      perSession,
      sessions,
      joiningFee: joiningFee * n,
      raw: base
    };
  };

  const durations = useMemo(
    () => [...new Set(basePlans.map((p) => p.duration))].sort((a, b) => b - a).slice(0, 2),
    [basePlans]
  );

  const plans = useMemo(
    () => durations.map((d) => buildPlan(d, studentCount)).filter(Boolean),
    [durations, studentCount, basePlans]
  );

  // Footer: show prices for 2 children (or selected count if > 1)
  const footerCount = studentCount > 1 ? studentCount : 2;
  const footerPrices = useMemo(
    () => durations.map((d) => buildPlan(d, footerCount)).filter(Boolean),
    [durations, footerCount, basePlans]
  );

  const noJoiningFee = plans.every((p) => !p.joiningFee);

  // Starter pack
  const starter = venue?.starterPacks?.[0];
  const starterPrice = (Number(starter?.price) || 49.99) * studentCount;
  const starterOld =
    (Number(starter?.originalPrice || starter?.mrp || starter?.comparePrice) || 89.99) * (starter?.originalPrice || starter?.mrp || starter?.comparePrice ? studentCount : studentCount);
  const starterDesc = starter?.description || 'Kit, skills ball, Skills Tracker + bag';

  const openBooking = (plan) =>
    openModal('booking', {
      venueName,
      planName: plan?.title,
      planPrice: plan ? fmt(plan.monthly) : undefined,
      className: activeClass?.className,
      classTitle: activeClass?.className,
      level: activeClass?.level,
      time: activeClass?.time,
      day: activeClass?.day,
      termName: activeTerm?.name,
      students: childLabel(studentCount)
    });

  const featuresFor = (plan, isFeatured) => {
    const list = [`${plan.sessions} weekly sessions`];
    if (isFeatured) {
      list.push('£20 holiday camp credit', 'First pick of camps', 'Monthly by Direct Debit');
    } else {
      list.push('Shorter commitment', 'Monthly by Direct Debit');
      list.push(plan.joiningFee ? `${fmt(plan.joiningFee)} joining fee` : 'No joining fee');
    }
    return list;
  };

  return (
    <section className="py-12 sm:py-16 bg-white text-[#042C89] font-sans">
      <div className="max-w-[1000px] mx-auto px-4">
        {/* Heading */}
        <div className="text-center">
          <span className="block text-[13px] font-semibold uppercase tracking-wider text-[#0A6BD6]">
            Prices
          </span>
          <h2 className="gasoek text-[32px] sm:text-[40px] leading-tight text-[#042C89] mt-2">
            Simple prices.
          </h2>
          <div className="relative inline-block mt-1">
            <span
              className="absolute left-0 right-0 bottom-1 h-[6px] bg-[#FFE600] rounded-full"
              aria-hidden="true"
            />
            <span className="gasoek relative text-[38px] sm:text-[50px] leading-tight text-[#0DD180]">
              {noJoiningFee
                ? 'No joining fee.'
                : `Joining fee ${fmt(Math.min(...plans.map((p) => p.joiningFee)))}`}
            </span>
          </div>
          <p className="poppins text-[15px] sm:text-[17px] text-slate-600 mt-5">
            Start with a FREE trial. If they love it, choose a plan.
          </p>
        </div>

        {/* Child toggle */}
        <div className="flex justify-center mt-6">
          <div className="inline-flex items-center bg-white border border-slate-200 rounded-full p-1.5 shadow-sm">
            {studentOptions.map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setStudentCount(n)}
                className={`poppins px-6 sm:px-8 py-2.5 rounded-full text-[14.5px] font-semibold transition-all cursor-pointer ${
                  studentCount === n ? 'bg-[#042C89] text-white' : 'text-[#042C89] hover:bg-slate-50'
                }`}
              >
                {childLabel(n)}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8 items-stretch">
          {plans.map((plan, idx) => {
            const featured = idx === 0;
            return (
              <div
                key={plan.id || idx}
                className={`poppins rounded-[28px] p-6 flex flex-col justify-between ${
                  featured
                    ? 'bg-[#042C89] text-white shadow-xl md:-my-3'
                    : 'bg-white text-[#042C89] border border-slate-200 shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="gasoek text-[20px] leading-tight">{plan.title}</h3>
                    {featured && (
                      <span className="bg-[#FFE600] text-[#042C89] text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wide shrink-0">
                        Most popular
                      </span>
                    )}
                  </div>

                  <div className="mt-4 flex items-baseline gap-1.5">
                    <span
                      className={`gasoek text-[40px] sm:text-[48px] leading-none ${
                        featured ? 'text-[#FFE600]' : 'text-[#042C89]'
                      }`}
                    >
                      {fmt(plan.monthly)}
                    </span>
                    <span className={`text-[15px] ${featured ? 'text-white/80' : 'text-slate-500'}`}>/month</span>
                  </div>

                  <p className="text-[14px] font-semibold mt-1 text-[#0DD180]">
                    {featured ? 'Best value · ' : ''}
                    {fmt(plan.perSession)} a session
                  </p>

                  <div className={`border-t my-5 ${featured ? 'border-white/20' : 'border-slate-200'}`} />

                  <ul className="space-y-3">
                    {featuresFor(plan, featured).map((f, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-[14.5px] font-medium">
                        <Check className="w-4 h-4 shrink-0 text-[#0DD180]" strokeWidth={3} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => openBooking(plan)}
                  className={`mt-7 w-full py-3.5 rounded-full text-[15px] font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    featured
                      ? 'bg-[#0DD180] hover:bg-[#0bb86f] text-[#042C89]'
                      : 'bg-white border-2 border-[#042C89] text-[#042C89] hover:bg-[#042C89] hover:text-white'
                  }`}
                >
                  Start with a FREE trial
                  {featured && <ArrowRight className="w-4 h-4" />}
                </button>
              </div>
            );
          })}

          {/* Starter pack */}
          <div className="poppins rounded-[28px] p-6 bg-white border border-slate-200 shadow-sm flex flex-col">
            <h3 className="gasoek text-[20px] leading-tight text-[#042C89]">Starter pack</h3>
            <p className="text-[13px] text-slate-500 mt-1">{starterDesc}</p>

            <div className="flex-1 flex items-center justify-center py-4 min-h-[160px]">
              <img
                src={STARTER_PACK_IMG}
                alt="Starter pack box"
                className="max-h-48 w-auto object-contain"
                loading="lazy"
              />
            </div>

            <div className="flex items-baseline gap-2">
              <span className="gasoek text-[32px] leading-none text-[#042C89]">{fmt(starterPrice)}</span>
              {starterOld > starterPrice && (
                <span className="text-[14px] text-slate-400 line-through">{fmt(starterOld)}</span>
              )}
            </div>
            <p className="text-[13px] font-semibold text-[#0A9F5F] mt-2">
              When you join within 24 hours of your FREE trial.
            </p>
          </div>
        </div>

        {/* Footer note */}
        <p className="poppins text-center text-[12px] text-slate-500 mt-8">
          First month is pro-rata. Then monthly by Direct Debit on the 1st.{' '}
          {footerPrices.length > 0 && (
            <>
              {footerCount} children:{' '}
              {footerPrices.map((p, i) => (
                <span key={p.id || i}>
                  {fmt(p.monthly)} ({p.duration} months)
                  {i < footerPrices.length - 1 ? ' or ' : ''}
                </span>
              ))}
              .
            </>
          )}
        </p>
      </div>
    </section>
  );
}