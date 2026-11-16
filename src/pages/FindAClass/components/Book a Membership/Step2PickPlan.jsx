import React, { useMemo } from 'react';
import { Check, ArrowRight, ArrowLeft } from 'lucide-react';

const YELLOW_SPLASH = 'https://webstepdev.com/demo/syncoWebsiteImages/find-a-class/yellow.png';

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

export function Step2PickPlan({
  paymentPlans = [],
  childrenCount = 1,
  selectedPlan,
  setSelectedPlan,
  onContinue,
  onBack
}) {
  // Normalize and parse plans from API matching student count
  const formattedPlans = useMemo(() => {
    const studentCount = Math.min(childrenCount, 3);
    let apiPlansForCount = (paymentPlans || []).filter(
      (p) => Number(p.students) === studentCount
    );

    // Fallbacks if no exact student match
    if (apiPlansForCount.length === 0) {
      apiPlansForCount = (paymentPlans || []).filter(
        (p) => Number(p.students) === 1
      );
    }
    if (apiPlansForCount.length === 0) {
      apiPlansForCount = paymentPlans || [];
    }

    // Sort by duration descending (12 months, 6 months, 1 month)
    const sorted = [...apiPlansForCount].sort(
      (a, b) => (Number(b.duration) || 0) - (Number(a.duration) || 0)
    );

    return sorted.map((p) => {
      const dur = Number(p.duration) || 1;
      const is12 = dur === 12;

      let badge = null;
      if (p.badge || p.label || p.priorityLabel) {
        badge = p.badge || p.label || p.priorityLabel;
      } else if (is12) {
        badge = 'MOST POPULAR';
      }

      const monthlyPrice = dur ? (Number(p.price) / dur).toFixed(2) : Number(p.price).toFixed(2);
      const apiFeatures = parsePackageFeatures(p);

      const subtitle = is12
        ? 'Best value'
        : p.priceLesson
        ? `£${Number(p.priceLesson).toFixed(2)} a session`
        : 'Flexible commitment';

      return {
        id: p.id,
        duration: dur,
        title: `${dur} month${dur > 1 ? 's' : ''}`,
        subtitle,
        isBestValue: is12,
        badge,
        monthlyPrice,
        totalPrice: Number(p.price),
        priceLesson: p.priceLesson ? Number(p.priceLesson).toFixed(2) : null,
        joiningFee: p.joiningFee,
        features:
          apiFeatures.length > 0
            ? apiFeatures
            : [
                `${dur * 4} weekly sessions`,
                p.priceLesson ? `£${Number(p.priceLesson).toFixed(2)} per lesson` : 'Weekly classes',
                'Priority tournament booking'
              ],
        raw: p
      };
    });
  }, [paymentPlans, childrenCount]);

  // If no plan selected yet, default to the 12-month plan (or first available)
  React.useEffect(() => {
    if (!selectedPlan && formattedPlans.length > 0) {
      const defaultP = formattedPlans.find((p) => p.duration === 12) || formattedPlans[0];
      setSelectedPlan(defaultP);
    }
  }, [selectedPlan, formattedPlans, setSelectedPlan]);

  const gridColsClass = formattedPlans.length >= 3 ? 'md:grid-cols-3' : '';

  return (
    <div className="space-y-5 sm:space-y-6 animate-badge-fade-in">
      {/* Step Heading */}
      <div className="pb-1">
        <h1 className="text-[32px] sm:text-[36px] lg:text-[42px] font-bold text-[#042C89] leading-[1.05] recline">
          Pick your <br />
          <span className="relative text-[44px] sm:text-[50px] gasoek font-normal inline-block text-[#0DD180] mt-1">
            plan.
            <img
              src={YELLOW_SPLASH}
              alt=""
              className="absolute -bottom-2 left-0 w-[98%] object-fill pointer-events-none"
            />
          </span>
        </h1>

        <p className="text-[#797A88] font-bold text-[13px] sm:text-[14px] mt-4 sm:mt-5">
          No joining fee. Terms shown before you pay.
        </p>
      </div>

      {/* Plans Grid */}
      <div className={`grid grid-cols-2 ${gridColsClass} gap-3 items-stretch pt-2`}>
        {formattedPlans.map((plan) => {
          const isSelected =
            selectedPlan?.id === plan.id ||
            selectedPlan?.duration === plan.duration;

          return (
            <div
              key={plan.id || plan.duration}
              onClick={() => setSelectedPlan(plan)}
              className={`rounded-[16px] px-4 py-4 relative transition-all cursor-pointer min-w-0 ${
                isSelected
                  ? 'border-2 border-[#0B2A8A] bg-[#E6F5FC]'
                  : 'border border-[#C9D3F0] bg-white hover:border-slate-300'
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-[9px] left-4 bg-[#FFE600] text-[#0B2A8A] font-extrabold text-[8px] leading-none px-2 py-[4px] rounded-full uppercase tracking-wide">
                  {plan.badge}
                </div>
              )}

              {/* Title + Radio */}
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="text-[14px] sm:text-[15px] font-bold text-[#0B2A8A] leading-tight">
                    {plan.title}
                  </h3>
                  <div
                    className={`text-[10px] sm:text-[11px] mt-1 leading-none ${
                      plan.isBestValue
                        ? 'font-bold text-[#0A9460]'
                        : 'font-medium text-[#797A88]'
                    }`}
                  >
                    {plan.subtitle}
                  </div>
                </div>

                <div
                  className={`w-[18px] h-[18px] rounded-full flex items-center justify-center shrink-0 transition-all ${
                    isSelected
                      ? 'bg-[#0B2A8A] text-white'
                      : 'border border-[#C9D3F0] bg-white'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 stroke-[3.5]" />}
                </div>
              </div>

              {/* Price */}
              <div className="mt-3 mb-4 flex items-baseline gap-1">
                <span className="text-[28px] sm:text-[32px] font-black text-[#0B2A8A] leading-none tracking-tight">
                  £{plan.monthlyPrice}
                </span>
                <span className="text-[#797A88] font-medium text-[10px] sm:text-[11px] leading-none">
                  /month
                </span>
              </div>

              {/* Features */}
              <ul className="space-y-2">
                {plan.features.map((feat, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-[10px] sm:text-[11px] text-[#1E1E2E] font-semibold leading-snug"
                  >
                    <Check className="w-3 h-3 text-[#0DD180] stroke-[3.5] shrink-0 mt-px" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-7 mt-2 border-t border-[#E2E4EC]">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 text-[#002B9A] hover:underline font-bold text-[11px] sm:text-[12px] cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>

        <button
          type="button"
          onClick={onContinue}
          className="bg-[#002B9A] hover:bg-[#001f70] text-white font-bold text-[13px] sm:text-[14px] w-[200px] sm:w-[205px] h-[42px] rounded-full flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
        >
          <span>Continue</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

export default Step2PickPlan;