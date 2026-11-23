import React, { useState, useMemo } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../../context/ModalContext';
import { useVenue } from '../VenueContext';

const STARTER_PACK_IMG = 'https://webstepdev.com/demo/syncoWebsiteImages/venues/Starter%20pack%20box.png';

const fmt = (n) => `£${Number(n).toFixed(2)}`;

function stripHtml(html) {
  if (!html) return '';
  return html
    .replace(/<br\s*[\/]?>/gi, '|||')
    .replace(/<\/?li>/gi, '|||')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function parsePerks(html) {
  if (!html) return [];
  const text = stripHtml(html);
  return text
    .split(/\|\|\||\+/)
    .map((s) => s.trim().replace(/^[-•*]\s*/, '').replace(/\.$/, ''))
    .filter(Boolean);
}

const childLabel = (n) => `${n} ${n === 1 ? 'child' : 'children'}`;

export function VenueSubscriptionPlans() {
  const navigate = useNavigate();
  const { venue, venueName } = useVenue();
  const { openModal } = useModal();

  const [studentCount, setStudentCount] = useState(1);

  const rawPlans = useMemo(() => {
    return (
      venue?.paymentGroups?.[0]?.paymentPlans ||
      venue?.raw?.paymentGroups?.[0]?.paymentPlans ||
      venue?.paymentPlans ||
      []
    );
  }, [venue]);

  // Toggle options (1, 2, 3 children)
  const studentOptions = useMemo(() => {
    const counts = rawPlans.map((p) => Number(p.students)).filter(Boolean);
    return [...new Set([...counts, 1, 2, 3])].sort((a, b) => a - b);
  }, [rawPlans]);

  // Find plans for selected studentCount
  const matchedPlans = useMemo(() => {
    const forStudents = rawPlans.filter((p) => Number(p.students) === studentCount);
    const p12 = forStudents.find((p) => Number(p.duration) === 12);
    const p6 = forStudents.find((p) => Number(p.duration) === 6);

    const plansList = [];

    if (p12) {
      const totalPrice = Number(p12.price) || 540;
      const monthly = totalPrice / 12;
      const perSession = Number(p12.priceLesson) || (monthly / 4);
      plansList.push({
        id: p12.id || '12m',
        title: p12.title || '12 Month Membership',
        duration: 12,
        monthly,
        perSession,
        sessions: 38,
        joiningFee: Number(p12.joiningFee) || 0,
        raw: p12,
        isFeatured: true
      });
    } else {
      plansList.push({
        id: '12m',
        title: '12 Month Membership',
        duration: 12,
        monthly: 45 * studentCount,
        perSession: 11.25,
        sessions: 38,
        joiningFee: 0,
        raw: null,
        isFeatured: true
      });
    }

    if (p6) {
      const totalPrice = Number(p6.price) || 300;
      const monthly = totalPrice / 6;
      const perSession = Number(p6.priceLesson) || (monthly / 4);
      plansList.push({
        id: p6.id || '6m',
        title: p6.title || '6 Month Membership',
        duration: 6,
        monthly,
        perSession,
        sessions: 19,
        joiningFee: Number(p6.joiningFee) || 0,
        raw: p6,
        isFeatured: false
      });
    } else {
      plansList.push({
        id: '6m',
        title: '6 Month Membership',
        duration: 6,
        monthly: 50 * studentCount,
        perSession: 12.5,
        sessions: 19,
        joiningFee: 15 * studentCount,
        raw: null,
        isFeatured: false
      });
    }

    return plansList;
  }, [rawPlans, studentCount]);

  // Starter pack from venue
  const starter = venue?.starterPacks?.[0];
  const starterPrice = (Number(starter?.price) || 89.99) * studentCount;
  const starterOld = starterPrice > 49.99 * studentCount ? 89.99 * studentCount : null;
  const starterDesc = starter?.description || 'Includes uniform, skills ball, Skills Tracker Book & Drawstring bag';
  const starterItems = starter?.items || ['Samba kit', 'Road to Rio Skills Tracker', 'Skills Ball', 'Drawstring bag'];

  const noJoiningFee = matchedPlans.every((p) => !p.joiningFee);

  const venueIdVal = venue?.venueId || venue?.id || '5';

  const handleBookTrial = () => {
    navigate(`/book-trial?venue=${venueIdVal}`);
  };

  const handleBookMembership = (plan) => {
    const planIdParam = plan?.raw?.id ? `&planId=${plan.raw.id}` : '';
    navigate(`/book-membership?venue=${venueIdVal}${planIdParam}&students=${studentCount}`);
  };

  const featuresFor = (plan, isFeatured) => {
    const list = [`${plan.sessions} weekly sessions`];

    if (plan.raw?.membershipPackageDetails) {
      const parsed = parsePerks(plan.raw.membershipPackageDetails);
      parsed.forEach((item) => list.push(item));
    } else if (isFeatured) {
      list.push('Full Week Free Holiday Camp Pass', '20% Member Discount on all Camps');
    } else {
      list.push('3 Days Free Holiday Camp Pass', '15% Member Discount on all Camps');
    }

    list.push('Monthly by Direct Debit');
    list.push(plan.joiningFee === 0 ? 'No joining fee (£0)' : `${fmt(plan.joiningFee)} joining fee`);

    return list;
  };

  return (
    <section id="prices" className="py-12 sm:py-16 bg-white text-[#042C89] font-sans">
      <div className="max-w-[1050px] mx-auto px-4">
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
                : `Joining fee from ${fmt(Math.min(...matchedPlans.map((p) => p.joiningFee)))}`}
            </span>
          </div>
          <p className="poppins text-[15px] sm:text-[17px] text-slate-600 mt-5">
            Start with a FREE trial. If they love it, choose a plan.
          </p>
        </div>

        {/* Child count toggle */}
        <div className="flex justify-center mt-6">
          <div className="inline-flex items-center bg-white border border-slate-200 rounded-full p-1.5 shadow-sm">
            {studentOptions.map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setStudentCount(n)}
                className={`poppins px-6 sm:px-8 py-2.5 rounded-full text-[14.5px] font-semibold transition-all cursor-pointer ${
                  studentCount === n ? 'bg-[#042C89] text-white shadow-xs' : 'text-[#042C89] hover:bg-slate-50'
                }`}
              >
                {childLabel(n)}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8 items-stretch">
          {matchedPlans.map((plan) => {
            const featured = plan.isFeatured;
            return (
              <div
                key={plan.id}
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
                      <li key={i} className="flex items-start gap-2.5 text-[14px] font-medium leading-snug">
                        <Check className="w-4 h-4 shrink-0 text-[#0DD180] mt-0.5" strokeWidth={3} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-7 space-y-2.5">
                  <button
                    type="button"
                    onClick={handleBookTrial}
                    className={`w-full py-3.5 rounded-full text-[15px] font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      featured
                        ? 'bg-[#0DD180] hover:bg-[#0bb86f] text-[#042C89]'
                        : 'bg-[#042C89] hover:bg-[#031f63] text-white'
                    }`}
                  >
                    Start with a FREE trial
                    {featured && <ArrowRight className="w-4 h-4" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleBookMembership(plan)}
                    className={`w-full py-2.5 rounded-full text-[13.5px] font-semibold flex items-center justify-center transition-all cursor-pointer ${
                      featured
                        ? 'border border-white/30 text-white hover:bg-white/10'
                        : 'border border-[#042C89] text-[#042C89] hover:bg-[#042C89]/5'
                    }`}
                  >
                    Book membership directly
                  </button>
                </div>
              </div>
            );
          })}

          {/* Starter pack card */}
          <div className="poppins rounded-[28px] p-6 bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-2">
                <h3 className="gasoek text-[20px] leading-tight text-[#042C89]">Starter Pack</h3>
                <span className="bg-[#E6F4FB] text-[#042C89] text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  Official Kit
                </span>
              </div>
              <p className="text-[13px] text-slate-500 mt-2">{starterDesc}</p>

              <div className="flex items-center justify-center py-4 my-2">
                <img
                  src={STARTER_PACK_IMG}
                  alt="Starter pack box"
                  className="max-h-40 w-auto object-contain drop-shadow-md"
                  loading="lazy"
                />
              </div>

              <div className="space-y-1.5 mb-4">
                {starterItems.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0DD180]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <div className="flex items-baseline gap-2">
                <span className="gasoek text-[32px] leading-none text-[#042C89]">{fmt(starterPrice)}</span>
                {starterOld && (
                  <span className="text-[14px] text-slate-400 line-through">{fmt(starterOld)}</span>
                )}
              </div>
              <p className="text-[12px] font-semibold text-[#0A9F5F] mt-1.5">
                Included with membership when you join after your trial.
              </p>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <p className="poppins text-center text-[12px] text-slate-500 mt-8">
          First month is pro-rata. Then monthly by Direct Debit on the 1st of every month. Sibling and family bundles available.
        </p>
      </div>
    </section>
  );
}

export default VenueSubscriptionPlans;
