import React, { useMemo } from 'react';
import { MapPin, Clock, MessageCircle, Sparkles } from 'lucide-react';
import { ChildAvatar } from './ChildAvatar';

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
  totalToday = null
}) {
  const venueTitle = venue?.venueName || venue?.name || 'Wimbledon';
  const classDay = selectedClass?.day
    ? selectedClass.day.charAt(0).toUpperCase() + selectedClass.day.slice(1)
    : 'Tuesday';
  const classDayPlural = classDay.endsWith('s') ? classDay : `${classDay}s`;
  const classTime = selectedClass?.time || (selectedClass?.startTime ? `${selectedClass.startTime} – ${selectedClass.endTime}` : '4:00 – 5:00pm');
  const classAge = selectedClass?.className || selectedClass?.ageGroup || '4–5 Years';
  const classLevel = selectedClass?.level || 'Beginners';

  // Format short top pill label e.g. "Membership · Wimbledon · Tue 4:00pm"
  const shortDay = classDay.slice(0, 3);
  const startTimeSimple = selectedClass?.startTime || (classTime ? classTime.split('–')[0].trim() : '4:00pm');
  const topPillText = `Membership · ${venueTitle} · ${shortDay} ${startTimeSimple}`;

  // Plan row label
  const planDuration = selectedPlan?.duration || 12;
  const singleMonthlyPrice = Number(
    selectedPlan?.monthlyPrice ||
    (selectedPlan?.price ? (selectedPlan.price / planDuration) : 51.99)
  );
  const totalMonthlyPrice = (singleMonthlyPrice * childrenCount).toFixed(2);

  const planLabel = selectedPlan
    ? `${planDuration} months · £${singleMonthlyPrice.toFixed(2)}/mo`
    : 'Choose a plan';

  // Starts row label
  const startsLabel = selectedDate?.displayShort || selectedDate?.formattedDate || (selectedDate?.date ? `${shortDay} ${selectedDate.date}` : 'Pick a date');

  // Next direct debit date label
  const nextMonthName = paymentBreakdown?.nextMonthDirectDebit || '1st of next month';

  // Dynamic Today calculation if not explicitly provided
  const computedTotalToday = useMemo(() => {
    if (totalToday) return totalToday;
    const sessions = Number(paymentBreakdown?.sessionsLeft) || 2;
    const perSession = Number(paymentBreakdown?.perSession) || (selectedPlan?.priceLesson ? Number(selectedPlan.priceLesson) : 16.42);
    const sessionsCost = sessions * perSession * childrenCount;
    const kitPrice = isTransfer ? 0 : (89.99 - (isTrialOffer ? 40.0 : 0));
    const kitsCost = kitPrice * childrenCount;
    const delivery = isTransfer ? 0 : (childrenCount === 1 ? 4.99 : 4.99 + (childrenCount - 1) * 2.0);
    return (sessionsCost + kitsCost + delivery).toFixed(2);
  }, [totalToday, paymentBreakdown, selectedPlan, childrenCount, isTrialOffer, isTransfer]);

  return (
    <aside className="w-full space-y-4">
      {/* Top Location / Class Pill */}
      <div className="bg-white border border-[#E2E8F0] rounded-full px-4 py-2.5 flex items-center gap-2 text-xs sm:text-[13px] font-bold text-[#0B2A8A] shadow-xs">
        <MapPin className="w-4 h-4 text-[#00A3E0] shrink-0" />
        <span className="truncate">{topPillText}</span>
      </div>

      {/* Main Sidebar Card */}
      <div className="bg-white rounded-[24px] shadow-sm border border-[#E2E8F0] overflow-hidden">
        {/* Navy Header */}
        <div className="bg-[#0B2A8A] p-5 sm:p-6 text-white">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[#FFDE14] text-[11px] font-bold uppercase tracking-wider block">
              YOUR MEMBERSHIP
            </span>
            {isTrialOffer && (
              <span className="bg-[#FFE600] text-[#042C89] font-black text-[9px] px-2 py-0.5 rounded-full uppercase flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 fill-current" />
                24H OFFER
              </span>
            )}
          </div>

          <h3 className="text-[18px] sm:text-[20px] font-bold text-white leading-tight">
            {venueTitle} · {classDayPlural}
          </h3>

          <div className="flex items-center gap-1.5 text-[#C9D3F0] text-[12px] sm:text-[13px] mt-2">
            <Clock className="w-3.5 h-3.5 text-[#00D084] shrink-0" />
            <span className="truncate">
              {classTime} · {classAge} · {classLevel}
            </span>
          </div>
        </div>

        {/* White Summary Body */}
        <div className="p-5 sm:p-6 space-y-3.5 bg-white text-[13px] sm:text-[14px]">
          {/* Plan Row */}
          <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
            <span className="text-[#64748B] font-medium">Plan</span>
            <span
              className={`font-bold ${
                selectedPlan ? 'text-[#0B2A8A]' : 'text-[#64748B]'
              }`}
            >
              {planLabel}
            </span>
          </div>

          {/* Starts Row */}
          <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
            <span className="text-[#64748B] font-medium">Starts</span>
            <span
              className={`font-bold ${
                selectedDate ? 'text-[#0B2A8A]' : 'text-[#64748B]'
              }`}
            >
              {startsLabel}
            </span>
          </div>

          {/* Children List Row(s) */}
          <div className="pb-3 border-b border-[#F1F5F9] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[#64748B] font-medium">
                {childrenCount > 1 ? `Children (${childrenCount})` : 'Child'}
              </span>
            </div>

            {childrenData.slice(0, childrenCount).map((c, idx) => {
              const hasName = Boolean(c?.firstName);
              const nameText = hasName ? `${c.firstName} ${c.lastName || ''}`.trim() : `Child ${idx + 1}`;
              const ageText = c?.age ? ` · Age ${c.age}` : '';
              const cKit = kitsData?.[idx]?.kitSize || (idx === 0 ? kitSize : null) || 'S';

              return (
                <div key={idx} className="flex items-center justify-between bg-slate-50 p-2 rounded-xl text-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <ChildAvatar firstName={nameText} lastName={c?.lastName} size="xs" />
                    <span className="font-bold text-[#0B2A8A] truncate">
                      {nameText}{ageText}
                    </span>
                  </div>
                  <span className="text-[#00A3E0] font-bold shrink-0">
                    Kit: {cKit}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Payment Summary breakdown */}
          <div className="pt-1 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[#0B2A8A] font-black text-[15px] sm:text-[16px]">
                Today
              </span>
              <span className="text-[#0B2A8A] font-black text-[16px] sm:text-[18px]">
                £{computedTotalToday}
              </span>
            </div>

            <div className="flex items-center justify-between text-[12px] sm:text-[13px]">
              <span className="text-[#64748B] font-medium">
                Monthly from {nextMonthName}
              </span>
              <span className="text-[#0B2A8A] font-bold">
                £{totalMonthlyPrice}/mo
              </span>
            </div>

            {isTransfer && (
              <p className="text-[11px] font-bold text-[#0D7A4A] bg-[#ECFDF5] px-2.5 py-1 rounded-lg">
                Transfer booking · £0 Starter pack
              </p>
            )}

            {!isTransfer && isTrialOffer && (
              <p className="text-[11px] font-bold text-[#0D7A4A] bg-[#ECFDF5] px-2.5 py-1 rounded-lg">
                Includes £40 Trial discount per child
              </p>
            )}
          </div>
        </div>
      </div>

      {/* WhatsApp Support Link */}
      <a
        href="https://wa.me/447400000000?text=Hi%2C%20I%20have%20a%20question%20about%20Samba%20Soccer%20membership"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-[#00A3E0] hover:text-[#0088ba] text-[13px] font-bold px-2 py-1 transition-colors group cursor-pointer"
      >
        <span className="w-5 h-5 rounded-full bg-[#E8FAF0] flex items-center justify-center text-[#10B981] group-hover:scale-110 transition-transform">
          <MessageCircle className="w-3.5 h-3.5 fill-[#10B981] text-white" />
        </span>
        <span className="text-[#0B2A8A] font-bold group-hover:underline">
          Questions? WhatsApp us
        </span>
      </a>
    </aside>
  );
}

export default MembershipSidebar;
