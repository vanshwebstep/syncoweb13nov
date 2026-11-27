import React, { useMemo } from 'react';
import { MapPin, Clock } from 'lucide-react';

export function MembershipSidebar({
  venue,
  selectedClass,
  selectedPlan,
  selectedDate,
  childrenData = [],
  childrenCount = 1,
  kitSize = null,
  kitsData = [],
  paymentBreakdown = null,
  isTrialOffer = false,
  isTransfer = false,
  showPaymentSummary = false,
  currentStep = '',
  totalToday = null,
  appliedDiscount = 0
}) {
  const venueTitle = venue?.venueName || venue?.name || 'Wimbledon';
  const classDay = selectedClass?.day
    ? selectedClass.day.charAt(0).toUpperCase() + selectedClass.day.slice(1)
    : 'Tuesday';
  const classDayPlural = classDay.endsWith('s') ? classDay : `${classDay}s`;
  const classTime =
    selectedClass?.time ||
    (selectedClass?.startTime ? `${selectedClass.startTime} – ${selectedClass.endTime}` : '4:00 – 5:00pm');
  const classAge = selectedClass?.className || selectedClass?.ageGroup || '4–5 Years';
  const classLevel = selectedClass?.level || 'Beginners';

  // Format short top pill label e.g. "Membership · Wimbledon · Tue 4:00pm"
  const shortDay = classDay.slice(0, 3);
  const startTimeSimple = selectedClass?.startTime || (classTime ? classTime.split('–')[0].trim() : '4:00pm');
  const topPillText = `Membership · ${venueTitle} · ${shortDay} ${startTimeSimple}`;

  // Plan row label: e.g. "12 months · £51.99"
  const planDuration = selectedPlan?.duration || 12;
  const singleMonthlyPrice = Number(
    selectedPlan?.monthlyPrice ||
    (selectedPlan?.price ? selectedPlan.price / planDuration : 51.99)
  );
  const totalMonthlyPrice = (singleMonthlyPrice * childrenCount).toFixed(2);

  const hasPlan = Boolean(selectedPlan);
  const planLabel = hasPlan
    ? `${planDuration} months · £${singleMonthlyPrice.toFixed(2)}`
    : 'Choose a plan';

  // Starts row label: e.g. "Tue 17 Nov"
  const hasDate = Boolean(selectedDate);
  const startsLabel = useMemo(() => {
    if (!selectedDate) return 'Pick a date';
    const dayStr = selectedDate.dayAbbr
      ? selectedDate.dayAbbr.charAt(0).toUpperCase() + selectedDate.dayAbbr.slice(1).toLowerCase()
      : shortDay;
    const dayNum = selectedDate.dayNum || selectedDate.date || '';
    const month = selectedDate.monthAbbr || '';
    if (dayNum && month) return `${dayStr} ${dayNum} ${month}`;
    return selectedDate.displayShort || selectedDate.formattedDate || 'Pick a date';
  }, [selectedDate, shortDay]);

  // Child row label: e.g. "Leo Smith · age 5" vs "Next step"
  // On early steps (children-count, pick-plan, start-date), child is always "Next step"
  const isEarlyStep =
    !currentStep ||
    currentStep === 'children-count' ||
    currentStep === 'pick-plan' ||
    currentStep === 'start-date';

  const hasChildDetails = !isEarlyStep && childrenData.some((c) => Boolean(c?.firstName?.trim()));

  // Kit size row label: e.g. "S · Beginners book" vs "Later step"
  // Starting steps mai Kit size hamesha "Later step" rahega.
  // Sirf starter-pack, check-and-pay aur monthly-payments step par hi kit label dikhega.
  const isKitStepOrLater =
    Boolean(showPaymentSummary) ||
    currentStep === 'starter-pack' ||
    currentStep === 'check-and-pay' ||
    currentStep === 'monthly-payments';

  const kitLabel = useMemo(() => {
    if (!isKitStepOrLater) return 'Later step';
    const primaryAge = Number(childrenData?.[0]?.age) || 5;
    const bookLevel = primaryAge <= 5 ? 'Beginners' : primaryAge <= 8 ? 'Intermediate' : 'Advanced';
    const size = kitSize || kitsData?.[0]?.kitSize || 'S';
    return `${size} · ${bookLevel} book`;
  }, [isKitStepOrLater, kitSize, kitsData, childrenData]);

  // Next direct debit date label: e.g. "1 Dec"
  const nextMonthName = useMemo(() => {
    if (paymentBreakdown?.nextMonthDirectDebit) {
      return paymentBreakdown.nextMonthDirectDebit;
    }
    if (selectedDate?.dateObj || selectedDate?.isoDate) {
      const d = selectedDate.dateObj ? new Date(selectedDate.dateObj) : new Date(selectedDate.isoDate);
      if (!isNaN(d.getTime())) {
        const nextMonth = new Date(d.getFullYear(), d.getMonth() + 1, 1);
        const SHORT_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `1 ${SHORT_MONTHS[nextMonth.getMonth()]}`;
      }
    }
    return '1st of next month';
  }, [paymentBreakdown, selectedDate]);

  // Dynamic Today calculation if not explicitly provided
  const computedTotalToday = useMemo(() => {
    if (totalToday) return totalToday;
    const sessions = Number(paymentBreakdown?.sessionsLeft) || 2;
    const perSession =
      Number(paymentBreakdown?.perSession) ||
      (selectedPlan?.priceLesson ? Number(selectedPlan.priceLesson) : 16.42);
    const sessionsCost = sessions * perSession * childrenCount;
    const kitPrice = isTransfer ? 0 : 89.99 - (isTrialOffer ? 40.0 : 0);
    const kitsCost = kitPrice * childrenCount;
    const delivery = isTransfer ? 0 : childrenCount === 1 ? 4.99 : 4.99 + (childrenCount - 1) * 2.0;
    const rawTotal = sessionsCost + kitsCost + delivery - (Number(appliedDiscount) || 0);
    return Math.max(0, rawTotal).toFixed(2);
  }, [totalToday, paymentBreakdown, selectedPlan, childrenCount, isTrialOffer, isTransfer, appliedDiscount]);

  // Only show payment breakdown at check-and-pay and monthly-payments steps
  const shouldShowPrice = showPaymentSummary || currentStep === 'check-and-pay' || currentStep === 'monthly-payments';

  return (
    <aside className="w-full space-y-3.5">
      {/* Top Location / Class Pill (matching screenshots 3-7) */}
      <div className="bg-white border border-[#CBD5E1] rounded-full px-4 py-2 flex items-center gap-2 text-xs sm:text-[13px] font-bold text-[#0B2A8A] shadow-2xs w-fit">
        <MapPin className="w-3.5 h-3.5 text-[#0B2A8A] shrink-0" />
        <span className="truncate">{topPillText}</span>
      </div>

      {/* Main Sidebar Card */}
      <div className="bg-white rounded-[24px] shadow-sm border border-[#E2E8F0] overflow-hidden">
        {/* Navy Header */}
        <div className="bg-[#0B2A8A] p-5 sm:p-6 text-white">
          <span className="text-[#FFDE14] text-[11px] font-bold uppercase tracking-wider block mb-1">
            YOUR MEMBERSHIP
          </span>

          <h3 className="text-[18px] sm:text-[20px] font-bold text-white leading-tight">
            {venueTitle} · {classDayPlural}
          </h3>

          <div className="flex items-center gap-1.5 text-white/80 text-[12px] sm:text-[13px] mt-1.5">
            <Clock className="w-3.5 h-3.5 text-white/80 shrink-0" />
            <span className="truncate">
              {classTime} · {classAge} · {classLevel}
            </span>
          </div>
        </div>

        {/* White Summary Body */}
        <div className="p-5 sm:p-6 space-y-3 bg-white text-[13px] sm:text-[14px]">
          {/* Row 1: Plan */}
          <div className="flex items-center justify-between">
            <span className="text-[#64748B] font-medium">Plan</span>
            <span
              className={`text-right ${
                hasPlan ? 'font-bold text-[#0B2A8A]' : 'font-semibold text-[#64748B]'
              }`}
            >
              {planLabel}
            </span>
          </div>

          {/* Row 2: Starts */}
          <div className="flex items-center justify-between">
            <span className="text-[#64748B] font-medium">Starts</span>
            <span
              className={`text-right ${
                hasDate ? 'font-bold text-[#0B2A8A]' : 'font-semibold text-[#64748B]'
              }`}
            >
              {startsLabel}
            </span>
          </div>

          {/* Row 3: Child */}
          <div className="flex items-center justify-between">
            <span className="text-[#64748B] font-medium">
              {childrenCount > 1 ? 'Children' : 'Child'}
            </span>
            {hasChildDetails ? (
              <div className="text-right">
                {childrenData.slice(0, childrenCount).map((c, idx) => {
                  const name = `${c?.firstName || ''} ${c?.lastName || ''}`.trim() || `Child ${idx + 1}`;
                  const ageText = c?.age ? ` · age ${c.age}` : '';
                  return (
                    <span key={idx} className="font-bold text-[#0B2A8A] block">
                      {name}{ageText}
                    </span>
                  );
                })}
              </div>
            ) : (
              <span className="font-semibold text-[#64748B]">Next step</span>
            )}
          </div>

          {/* Row 4: Kit size */}
          <div className="flex items-center justify-between">
            <span className="text-[#64748B] font-medium">Kit size</span>
            <span
              className={`text-right ${
                isKitStepOrLater
                  ? 'font-bold text-[#0B2A8A]'
                  : 'font-semibold text-[#64748B]'
              }`}
            >
              {isKitStepOrLater ? kitLabel : 'Later step'}
            </span>
          </div>

          {/* Bottom Price Breakdown (ONLY visible on the check-and-pay step, matching screenshot 7) */}
          {shouldShowPrice && (
            <div className="border-t border-[#F1F5F9] pt-3.5 mt-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[#0B2A8A] font-extrabold text-[15px] sm:text-[16px]">
                  Today
                </span>
                <span className="text-[#0B2A8A] font-extrabold text-[17px] sm:text-[18px]">
                  £{computedTotalToday}
                </span>
              </div>

              <div className="flex items-center justify-between text-[12px] sm:text-[13px]">
                <span className="text-[#64748B] font-medium">
                  Monthly from {nextMonthName}
                </span>
                <span className="text-[#0B2A8A] font-bold">
                  £{totalMonthlyPrice}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* WhatsApp Link below card (matching screenshots 2-7) */}
      <a
        href="https://wa.me/447400000000?text=Hi%2C%20I%20have%20a%20question%20about%20Samba%20Soccer%20membership"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-[#0B2A8A] font-bold text-[13px] sm:text-[14px] px-1 transition-colors group cursor-pointer hover:underline"
      >
        <span className="w-5 h-5 rounded-full bg-[#10B981] flex items-center justify-center text-white shrink-0">
          <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.303-.058.116-.087.188-.173.289l-.26.303c-.087.087-.177.181-.076.355.101.173.449.741.964 1.2.662.591 1.221.774 1.394.86.173.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.072.043.419-.101.824z" />
          </svg>
        </span>
        <span>Questions? WhatsApp us</span>
      </a>
    </aside>
  );
}

export default MembershipSidebar;
