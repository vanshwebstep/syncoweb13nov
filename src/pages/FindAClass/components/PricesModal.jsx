import React, { useState, useMemo, useEffect } from 'react';
import { Check, Gift } from 'lucide-react';
import { ModalShell } from './ModalShell';
import { fetchVenueByIdOrName } from '../../../services/venueService';

const months = 'https://webstepdev.com/demo/syncoWebsiteImages/find-a-class/12-months.png';
const month = 'https://webstepdev.com/demo/syncoWebsiteImages/find-a-class/1-month.png';
const months_6 = 'https://webstepdev.com/demo/syncoWebsiteImages/find-a-class/6-months.png';
const sambalayer = 'https://webstepdev.com/demo/syncoWebsiteImages/find-a-class/green-vector-2.png';
const sambakit = 'https://webstepdev.com/demo/syncoWebsiteImages/find-a-class/samba-kit.png';

const Tick = () => (
  <span className="w-4 h-4 rounded-full bg-[#00D084] flex items-center justify-center shrink-0 mt-0.5">
    <Check className="w-2.5 h-2.5 text-white" strokeWidth={3.5} />
  </span>
);

function stripHtml(html) {
  if (!html) return '';
  return html
    .replace(/<br\s*[\/]?>/gi, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function parsePackageFeatures(plan) {
  if (!plan) return [];
  const details = plan.membershipPackageDetails || plan.HolidayCampPackage;
  if (!details) return [];

  const list = [];
  let text = details
    .replace(/<br\s*[\/]?>/gi, '|||')
    .replace(/<\/?li>/gi, '|||')
    .replace(/[\r\n]+/g, '|||');

  text = stripHtml(text);
  const rawParts = text.split(/\|\|\||\+/);

  rawParts.forEach((part) => {
    let clean = part.replace(/^[-•*]\s*/, '').trim();
    clean = clean.replace(/\.$/, '').trim();
    if (clean) list.push(clean);
  });

  return list;
}

export function PricesModal({ isOpen, onClose, venue }) {
  const [children, setChildren] = useState(1);
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [liveVenueData, setLiveVenueData] = useState(null);

  // Fetch full live venue details by ID if venue.paymentGroups is missing
  useEffect(() => {
    if (!isOpen || !venue) return;
    const vId = venue.venueId != null ? venue.venueId : venue.id;
    const hasPlans = (venue.paymentGroups?.[0]?.paymentPlans?.length || 0) > 0;

    // Reset when venue changes
    setLiveVenueData(null);

    if (!hasPlans && vId) {
      fetchVenueByIdOrName(vId)
        .then((data) => {
          if (data) setLiveVenueData(data);
        })
        .catch((err) => console.warn('Could not fetch venue payment plans in PricesModal:', err));
    }
  }, [isOpen, venue]);

  const activeVenue = liveVenueData || venue;

  // Extract all payment plans from active venue
  const allPaymentPlans = useMemo(() => {
    return (
      activeVenue?.paymentGroups?.[0]?.paymentPlans ||
      activeVenue?.paymentPlans ||
      activeVenue?.raw?.paymentGroups?.[0]?.paymentPlans ||
      []
    );
  }, [activeVenue]);

  // Plans matching selected child count
  const plansForStudentCount = useMemo(() => {
    const matched = allPaymentPlans.filter(
      (p) => Number(p.students) === Number(children)
    );
    if (matched.length > 0) {
      // Sort: 12 months first, then 6 months, then 1 month (duration descending)
      return [...matched].sort((a, b) => (Number(b.duration) || 0) - (Number(a.duration) || 0));
    }
    // Fallback: 1 student plans or all plans
    const fallback1 = allPaymentPlans.filter((p) => Number(p.students) === 1);
    if (fallback1.length > 0) {
      return [...fallback1].sort((a, b) => (Number(b.duration) || 0) - (Number(a.duration) || 0));
    }
    return [...allPaymentPlans].sort((a, b) => (Number(b.duration) || 0) - (Number(a.duration) || 0));
  }, [allPaymentPlans, children]);

  // Default select 12m plan or first plan
  useEffect(() => {
    if (plansForStudentCount.length > 0) {
      const defaultP = plansForStudentCount.find((p) => Number(p.duration) === 12) || plansForStudentCount[0];
      setSelectedPlanId(defaultP?.id);
    }
  }, [plansForStudentCount]);

  // Dynamic priority badges / labels
  const getPlanBadge = (p) => {
    if (p.badge || p.label || p.priorityLabel) {
      return {
        text: p.badge || p.label || p.priorityLabel,
        className: 'bg-[#FFE600] text-[#042C89]'
      };
    }
    const dur = Number(p.duration);
    if (dur === 12) {
      return {
        text: 'BEST VALUE',
        className: 'bg-[#FFE600] text-[#042C89]'
      };
    }
    if (dur === 6) {
      return {
        text: 'MOST POPULAR',
        className: 'bg-[#00D084] text-white'
      };
    }
    if (dur === 1) {
      return {
        text: 'FLEXIBLE',
        className: 'bg-[#E2EDF8] text-[#042C89]'
      };
    }
    return null;
  };

  // Duration icon renderer
  const renderDurationIcon = (duration) => {
    const dur = Number(duration);
    if (dur === 12) {
      return <img src={months} className="w-12 h-12 object-contain shrink-0" alt="12 months" />;
    }
    if (dur === 6) {
      return <img src={months_6} className="w-12 h-12 object-contain shrink-0" alt="6 months" />;
    }
         return <img src={month} className="w-12 h-12 object-contain shrink-0" alt="6 months" />;

  };

  const starter =
    activeVenue?.starterPack ||
    activeVenue?.starterPacks?.[0] ||
    activeVenue?.raw?.starterPacks?.[0];

  const hasFreeTrial = Boolean(
    activeVenue?.schedule?.classes?.some((c) => c.allowFreeTrial === true)
  );

  // Dynamic starter pack items directly from API starter.items
  const starterItems = useMemo(() => {
    const directItems =
      starter?.items ||
      activeVenue?.starterPacks?.[0]?.items ||
      activeVenue?.raw?.starterPacks?.[0]?.items;

    if (Array.isArray(directItems) && directItems.length > 0) {
      return directItems.map((item) => {
        if (typeof item === 'string') return item;
        return item?.name || item?.title || String(item);
      });
    }

    const desc = starter?.description;
    if (desc && desc !== '-') {
      const clean = desc.replace(/^includes\s+/i, '').trim();
      return clean
        .split(/[,&]/)
        .map((s) => s.trim())
        .filter(Boolean)
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1));
    }

    return [
      'Samba kit',
      'Road to Rio Skills Tracker',
      'Skills Ball',
      'Drawstring bag'
    ];
  }, [starter, activeVenue]);

  const planCardClass = (active) =>
    `relative rounded-[22px] sm:rounded-[24px] p-5 sm:p-6 bg-white transition-all cursor-pointer text-left flex flex-col justify-between ${
      active
        ? 'border-2 border-[#042C89] shadow-sm ring-1 ring-[#042C89]/20'
        : 'border border-[#E2E8F0] hover:border-slate-300'
    }`;

  const venueTitle = activeVenue?.venueName || activeVenue?.name || '-';

  const numPlans = plansForStudentCount.length;
  const modalMaxWidth =
    numPlans >= 3
      ? 'max-w-[880px]'
      : numPlans === 2
      ? 'max-w-[660px]'
      : 'max-w-[520px]';

  const gridColsClass =
    numPlans >= 3
      ? 'grid-cols-1 md:grid-cols-3'
      : numPlans === 2
      ? 'grid-cols-1 sm:grid-cols-2'
      : 'grid-cols-1';

  if (!isOpen) return null;

  return (
    <ModalShell
      isOpen={isOpen}
      onClose={onClose}
      title="Prices"
      subtitle={`${venueTitle} · weekly classes`}
      maxWidth={modalMaxWidth}
      headerDivider={true}
    >
      {/* Child count tabs */}
      <div className="bg-[#F1F5F9] rounded-full p-1 sm:p-1.5 flex items-center mb-3.5">
        {[1, 2, 3].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setChildren(n)}
            className={`flex-1 h-10 rounded-full text-[13px] sm:text-[14px] font-bold transition-all cursor-pointer ${
              children === n
                ? 'bg-[#042C89] text-white shadow-sm'
                : 'text-[#042C89] hover:text-[#042C89]'
            }`}
          >
            {n} {n === 1 ? 'child' : 'children'}
          </button>
        ))}
      </div>

      {/* Free banner (shown if trial available) */}
      {hasFreeTrial ? (
        <div className="bg-[#E8FAF0] text-[#0D7A4A] rounded-2xl px-4 py-3 flex items-center gap-2.5 text-[13px] sm:text-[14px] font-bold mb-4">
          <Gift className="w-4 h-4 text-[#0D7A4A] shrink-0" strokeWidth={2.2} />
          <span>Your first session is FREE</span>
        </div>
      ) : (
        <div className="bg-[#F0F5FA] text-[#042C89] rounded-2xl px-4 py-3 flex items-center gap-2.5 text-[13px] sm:text-[14px] font-bold mb-4">
          <span className="w-2 h-2 rounded-full bg-[#00A3E0]" />
          <span>Membership plans &amp; flexible options</span>
        </div>
      )}

      {/* Dynamic Plans Grid */}
      <div className={`grid ${gridColsClass} gap-3.5 sm:gap-4 mb-4`}>
        {plansForStudentCount.map((planItem) => {
          const isSelected = selectedPlanId === planItem.id;
          const badge = getPlanBadge(planItem);
          const subtitle = planItem.termsAndCondition ? stripHtml(planItem.termsAndCondition) : null;
          const features = parsePackageFeatures(planItem);

          return (
            <div
              key={planItem.id}
              onClick={() => setSelectedPlanId(planItem.id)}
              className={planCardClass(isSelected)}
              role="button"
              tabIndex={0}
            >
              <div>
                <div className="flex items-start justify-between mb-3 gap-2">
                  <div className="flex md:block items-center gap-3">
                    {renderDurationIcon(planItem.duration)}
                    <div className="block md:hidden">
                      <p className="text-[16px] sm:text-[17px] font-bold text-[#042C89] leading-tight">
                        {planItem.title}
                      </p>
                      {subtitle && (
                        <p className="text-[12px] text-[#64748B] font-normal mt-0.5 line-clamp-2">
                          {subtitle}
                        </p>
                      )}
                    </div>
                  </div>
                  {badge && (
                    <span
                      className={`${badge.className} text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider leading-none shadow-sm shrink-0`}
                    >
                      {badge.text}
                    </span>
                  )}
                </div>

                <p className="hidden md:block text-[17px] font-bold text-[#042C89] leading-tight">
                  {planItem.title}
                </p>
                {subtitle && (
                  <p
                    className="hidden md:block text-[12px] sm:text-[13px] text-[#797A88] font-normal mt-1 line-clamp-2"
                    title={subtitle}
                  >
                    {subtitle}
                  </p>
                )}

                <div className="mt-3.5 flex items-baseline leading-none flex-wrap gap-1.5">
                  <span className="text-[26px] sm:text-[30px] font-black text-[#042C89] tracking-tight">
                    £{planItem.price}
                  </span>
                  {planItem.priceLesson != null && (
                    <span className="text-[12px] text-[#64748B] font-bold">
                      (£{planItem.priceLesson}/lesson)
                    </span>
                  )}
                </div>

                {planItem.joiningFee != null && (
                  <p className="text-[11px] text-[#797A88] font-medium mt-1">
                    {Number(planItem.joiningFee) > 0
                      ? `+ £${planItem.joiningFee} joining fee`
                      : 'Zero joining fee'}
                  </p>
                )}
              </div>

              {features.length > 0 && (
                <div className="mt-3">
                  <div className="border-t border-[#E2E8F0] my-3" />
                  <ul className="space-y-2 text-[12px] sm:text-[13px] text-[#34353B] font-normal leading-snug">
                    {features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Tick />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ============================================================== */}
      {/* STARTER PACK - MOBILE (only on < sm)                           */}
      {/* ============================================================== */}
      {starter && (
        <div className="block sm:hidden rounded-[24px] bg-[#042C89] overflow-hidden">
          <div className="relative flex bg-no-repeat bg-left">
            <img src={sambakit} className="absolute left-0 top-0 z-[9] w-[200px]" alt="" />
            <img src={sambalayer} className="absolute h-[80%] left-0 bottom-0 w-[140px]" alt="" />

            <div className="flex-1 py-5 pr-4 pb-8 flex flex-col items-end text-right">
              <span className="inline-block bg-[#FFE600] text-[#042C89] text-[11px] font-bold px-3.5 py-2 rounded-full leading-none shadow-sm">
                24h sign-up offer
              </span>

              <p className="text-[#C9D3F0] text-[14px] font-bold leading-tight mt-4">
                {starter.title || 'Starter pack'}
              </p>

              <p className="leading-tight mt-1.5 flex items-baseline justify-end">
                <span className="text-[#FFDE14] text-[13px] font-bold line-through">
                  £{starter.was || starter.price || '89.99'}
                </span>
                <span className="text-[#C9D3F0] text-[10px] font-bold ml-1.5">per child</span>
              </p>

              <p className="text-white leading-none mt-1.5 flex items-baseline justify-end">
                <span className="text-[23px] font-bold tracking-tight">
                  £{starter.now || '49.99'}
                </span>
                <span className="text-[#C9D3F0] text-[14px] font-bold ml-1.5">/child</span>
              </p>

              <span className="inline-block bg-white/15 text-white text-[10px] font-bold px-3 py-1.5 rounded-full leading-none mt-2.5">
                + delivery fee
              </span>
            </div>
          </div>

          <div className="bg-[#03236E] -mt-4 z-[99] relative px-5 py-4 text-white text-[12px] font-normal leading-relaxed">
            {starterItems && starterItems.length > 0 ? (
              <ul className="space-y-2">
                {starterItems.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 font-bold">
                    <span className="w-4 h-4 rounded-full bg-[#00D084] flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5 text-white" strokeWidth={3.5} />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              starter.description || '-'
            )}
          </div>
        </div>
      )}

      {/* Mobile footer notes */}
      {starter && (
        <div className="block sm:hidden">
          <p className="text-[#9A5B00] text-[12px] font-bold mt-4 leading-snug">
            Join within 24 hours of the free trial to get this price.
          </p>
          <p className="text-[#797A88] text-[12px] font-normal mt-1 leading-snug">
            After that, the starter pack is £{starter.was || starter.price || '89.99'} per child (one-off). Delivery fee is added at checkout.
          </p>
        </div>
      )}

      {/* ============================================================== */}
      {/* STARTER PACK - DESKTOP (sm and up)                             */}
      {/* ============================================================== */}
      {starter && (
        <div
          className="hidden sm:flex relative rounded-[24px] bg-[#042C89] overflow-hidden sm:flex-row items-stretch min-h-[172px] bg-no-repeat bg-left"
          style={{
            backgroundImage: `url(/images/find-a-class/starter-pack-bg.png)`,
            backgroundSize: 'auto 100%'
          }}
        >
          <div className="w-full sm:w-[32%] md:min-h-[130px] sm:min-h-0 shrink-0" />

          <div className="flex-1 py-4 sm:py-4.5 pr-4 sm:pr-5 pl-4 sm:pl-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-2">
            <div className="shrink-0">
              <span className="inline-block bg-[#FFE600] text-[#042C89] text-[12px] font-bold px-2.5 py-2 rounded-full leading-none mb-1.5 shadow-sm">
                24h sign-up offer
              </span>
              <p className="text-white text-[13px] sm:text-[15px] font-bold leading-tight">
                {starter.title || 'Starter pack'}
              </p>
              <p className="leading-tight mt-1 flex items-baseline">
                <span className="text-[#FFDE14] text-[15px] font-bold line-through">
                  £{starter.was || starter.price || '89.99'}
                </span>
                <span className="text-[#C9D3F0] text-[11px] font-bold ml-1.5">per child</span>
              </p>
              <p className="text-white leading-none mt-1 flex items-baseline">
                <span className="text-[28px] sm:text-[30px] font-bold">
                  £{starter.now || '49.99'}
                </span>
                <span className="text-[#C9D3F0] text-[12px] font-bold ml-1.5">per child</span>
              </p>
              <div className="mt-1.5">
                <span className="inline-block bg-[#FFFFFF]/15 text-white text-[11px] font-bold px-2.5 py-1.5 rounded-full leading-none">
                  + delivery fee
                </span>
              </div>
            </div>

            <div className="hidden sm:block w-[1px] bg-white/20 self-stretch my-2 shrink-0 mx-2" />

            <ul className="space-y-2 text-white text-[12px] font-bold shrink-0">
              {starterItems.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#00D084] flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 text-white" strokeWidth={3.5} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Desktop footer notes */}
      {starter && (
        <div className="hidden sm:block mt-3">
          <p className="text-[#9A5B00] text-[12px] font-bold leading-snug">
            Join within 24 hours of the free trial to get this price.
          </p>
          <p className="text-[#797A88] text-[12px] font-normal mt-0.5 leading-snug">
            After that, the starter pack is £{starter.was || starter.price || '89.99'} per child (one-off). Delivery fee is added at checkout.
          </p>
        </div>
      )}
    </ModalShell>
  );
}

export default PricesModal;
