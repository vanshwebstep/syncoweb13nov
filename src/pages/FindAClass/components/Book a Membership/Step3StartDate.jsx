import React, { useMemo, useEffect } from 'react';
import { Check, ArrowRight, ArrowLeft } from 'lucide-react';

const YELLOW_SPLASH = 'https://webstepdev.com/demo/syncoWebsiteImages/find-a-class/yellow.png';

const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];
const FULL_MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export function Step3StartDate({
  selectedClass,
  terms = [],
  selectedPlan,
  selectedDate,
  setSelectedDate,
  onContinue,
  onBack,
  onBreakdownChange
}) {
  const dayName = selectedClass?.day
    ? selectedClass.day.charAt(0).toUpperCase() + selectedClass.day.slice(1)
    : 'Tuesday';
  const dayAbbr = dayName.slice(0, 3).toUpperCase();
  const dayPlural = dayName.endsWith('s') ? dayName : `${dayName}s`;

  // Compute the next 4 dates dynamically from API terms or upcoming dates
  const availableDates = useMemo(() => {
    // 1. Try to find session dates from API terms
    const termDates = [];
    if (Array.isArray(terms)) {
      terms.forEach((term) => {
        if (Array.isArray(term.sessionsMap)) {
          term.sessionsMap.forEach((s) => {
            if (s.sessionDate) {
              const d = new Date(s.sessionDate);
              if (!isNaN(d.getTime())) {
                termDates.push(d);
              }
            }
          });
        }
      });
    }

    // Filter future dates
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    let futureDates = termDates
      .filter((d) => d >= now)
      .sort((a, b) => a - b);

    // 2. If no valid upcoming dates in API terms, generate next 4 occurrences of this weekday
    if (futureDates.length < 4) {
      const DAY_MAP = {
        sunday: 0,
        monday: 1,
        tuesday: 2,
        wednesday: 3,
        thursday: 4,
        friday: 5,
        saturday: 6
      };
      const targetDay = DAY_MAP[dayName.toLowerCase()] ?? 2; // default Tuesday

      const generated = [];
      const cursor = new Date(now);
      // find next occurrence
      let daysToAdd = (targetDay - cursor.getDay() + 7) % 7;
      if (daysToAdd === 0) daysToAdd = 7;
      cursor.setDate(cursor.getDate() + daysToAdd);

      for (let i = 0; i < 4; i++) {
        generated.push(new Date(cursor));
        cursor.setDate(cursor.getDate() + 7);
      }
      futureDates = generated;
    }

    // Format the top 4 dates
    return futureDates.slice(0, 4).map((d) => {
      const dayNum = d.getDate();
      const monthAbbr = MONTH_NAMES[d.getMonth()];
      const monthFull = FULL_MONTHS[d.getMonth()];
      const year = d.getFullYear();
      const isoDate = `${year}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;

      return {
        isoDate,
        dateObj: d,
        dayAbbr,
        dayNum,
        monthAbbr,
        monthFull,
        year,
        displayShort: `${dayAbbr.charAt(0) + dayAbbr.slice(1).toLowerCase()} ${dayNum} ${monthAbbr}`,
        formattedDate: `${dayName} ${dayNum} ${monthFull} ${year}`
      };
    });
  }, [terms, dayName, dayAbbr]);

  // Set default selected date
  useEffect(() => {
    if (!selectedDate && availableDates.length > 0) {
      setSelectedDate(availableDates[0]);
    }
  }, [selectedDate, availableDates, setSelectedDate]);

  // Calculate payment breakdown based on selected plan and start date
  const paymentBreakdown = useMemo(() => {
    const activeDate = selectedDate || availableDates[0];
    if (!activeDate) return null;

    const monthlyPrice = Number(selectedPlan?.monthlyPrice || 51.99);
    const duration = selectedPlan?.duration || 12;

    // Determine how many sessions remain in the starting month
    const startMonth = activeDate.dateObj.getMonth();
    const sessionsThisMonth = availableDates.filter(
      (d) => d.dateObj.getMonth() === startMonth
    ).length || 2;

    // Session price
    const perSession = Number(
      selectedPlan?.priceLesson || (monthlyPrice / 4)
    );
    const proratedAmount = (sessionsThisMonth * perSession).toFixed(2);

    // Next month for 1st direct debit
    const nextMonthIdx = (startMonth + 1) % 12;
    const nextMonthAbbr = MONTH_NAMES[nextMonthIdx];

    return {
      sessionsLeft: sessionsThisMonth,
      monthName: activeDate.monthFull,
      perSession: perSession.toFixed(2),
      proratedAmount,
      nextMonthDirectDebit: `1 ${nextMonthAbbr}`,
      monthlyPrice: monthlyPrice.toFixed(2),
      duration
    };
  }, [selectedDate, availableDates, selectedPlan]);

  // Sync breakdown with parent
  useEffect(() => {
    if (paymentBreakdown && onBreakdownChange) {
      onBreakdownChange(paymentBreakdown);
    }
  }, [paymentBreakdown, onBreakdownChange]);

  return (
    <div className="space-y-5 sm:space-y-6 animate-badge-fade-in">
      {/* Step Heading */}
      <div className="pb-1">
        <h1 className="text-[32px] sm:text-[36px] lg:text-[42px] font-bold text-[#042C89] leading-[1.05] recline">
          When would they <br />
          <span className="relative text-[44px] sm:text-[50px] gasoek font-normal inline-block text-[#0DD180] mt-1">
            like to start?
            <img
              src={YELLOW_SPLASH}
              alt=""
              className="absolute -bottom-2 left-0 w-[98%] object-fill pointer-events-none"
            />
          </span>
        </h1>

        <p className="text-[#797A88] font-bold text-[13px] sm:text-[14px] mt-4 sm:mt-5">
          Pick the first session. {dayPlural} only.
        </p>
      </div>

      {/* The next 4 dates you can start */}
      <div>
        <h4 className="text-[12px] sm:text-[13px] font-bold text-[#042C89] mb-3">
          The next 4 dates you can start
        </h4>

        <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
          {availableDates.map((item) => {
            const isSelected = selectedDate?.isoDate === item.isoDate;

            return (
              <button
                key={item.isoDate}
                type="button"
                onClick={() => setSelectedDate(item)}
                className={`rounded-[16px] px-2 py-3.5 sm:py-4 text-center transition-all cursor-pointer min-w-0 border ${
                  isSelected
                    ? 'bg-[#042C89] border-[#042C89]'
                    : 'bg-white border-[#CFD6F3] hover:border-[#9FB0E8]'
                }`}
              >
                <div
                  className={`text-[8px] sm:text-[9px] font-bold uppercase tracking-wide leading-none ${
                    isSelected ? 'text-white' : 'text-[#042C89]'
                  }`}
                >
                  {item.dayAbbr}
                </div>

                <div
                  className={`gasoek font-normal text-[28px] sm:text-[34px] leading-none my-3 ${
                    isSelected ? 'text-[#FFE100]' : 'text-[#042C89]'
                  }`}
                >
                  {item.dayNum}
                </div>

                <div
                  className={`text-[8px] sm:text-[9px] font-bold leading-none ${
                    isSelected ? 'text-white' : 'text-[#042C89]'
                  }`}
                >
                  {item.monthAbbr}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* How payments work Box */}
      {paymentBreakdown && (
        <div className="bg-white border border-[#E2E4EC] rounded-[16px] px-4 py-4 sm:px-5">
          <h4 className="text-[12px] sm:text-[13px] font-bold text-[#042C89] mb-3.5">
            How payments work
          </h4>

          {/* Timeline */}
          <div className="relative space-y-3.5">
            {/* Dotted connector */}
            <div className="absolute left-[7px] top-3 bottom-3 border-l-2 border-dotted border-[#0DD180]" />

            {/* Today */}
            <div className="flex items-start justify-between gap-4 relative pl-6">
              <div className="absolute left-0 top-[2px] w-[15px] h-[15px] rounded-full bg-[#0DD180]" />
              <div className="min-w-0">
                <p className="font-bold text-[11px] sm:text-[12px] text-[#042C89] leading-tight">
                  Today
                </p>
                <p className="text-[#797A88] text-[9px] sm:text-[10px] mt-0.5 leading-tight">
                  {paymentBreakdown.sessionsLeft} sessions left in {paymentBreakdown.monthName} ({paymentBreakdown.sessionsLeft} × £{paymentBreakdown.perSession})
                </p>
              </div>
              <span className="font-bold text-[11px] sm:text-[12px] text-[#042C89] shrink-0">
                £{paymentBreakdown.proratedAmount}
              </span>
            </div>

            {/* First Direct Debit */}
            <div className="flex items-start justify-between gap-4 relative pl-6">
              <div className="absolute left-0 top-[2px] w-[15px] h-[15px] rounded-full border-2 border-[#0DD180] bg-white" />
              <div className="min-w-0">
                <p className="font-bold text-[11px] sm:text-[12px] text-[#042C89] leading-tight">
                  {paymentBreakdown.nextMonthDirectDebit}
                </p>
                <p className="text-[#797A88] text-[9px] sm:text-[10px] mt-0.5 leading-tight">
                  First monthly Direct Debit
                </p>
              </div>
              <span className="font-bold text-[11px] sm:text-[12px] text-[#042C89] shrink-0">
                £{paymentBreakdown.monthlyPrice}
              </span>
            </div>

            {/* 1st of each month */}
            <div className="flex items-start justify-between gap-4 relative pl-6">
              <div className="absolute left-0 top-[2px] w-[15px] h-[15px] rounded-full border-2 border-[#0DD180] bg-white" />
              <div className="min-w-0">
                <p className="font-bold text-[11px] sm:text-[12px] text-[#042C89] leading-tight">
                  1st of each month
                </p>
                <p className="text-[#797A88] text-[9px] sm:text-[10px] mt-0.5 leading-tight">
                  Then every month, {paymentBreakdown.duration} months
                </p>
              </div>
              <span className="font-bold text-[11px] sm:text-[12px] text-[#042C89] shrink-0">
                £{paymentBreakdown.monthlyPrice}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Starting mid-month Callout */}
      <div className="bg-[#E6F8EE] rounded-[12px] px-3.5 py-3 flex items-center gap-3 text-left">
        <div className="w-5 h-5 rounded-full bg-[#0A6B45] text-white flex items-center justify-center shrink-0">
          <Check className="w-3 h-3 stroke-[3.5]" />
        </div>
        <div>
          <p className="font-bold text-[10px] sm:text-[11px] text-[#0A4F34] leading-tight">
            Starting mid-month? No problem.
          </p>
          <p className="text-[9px] sm:text-[10px] text-[#2F7A5A] mt-0.5 leading-tight">
            You only pay for the sessions left this month.
          </p>
        </div>
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

export default Step3StartDate;