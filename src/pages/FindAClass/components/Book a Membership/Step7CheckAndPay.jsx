import React, { useState, useMemo } from 'react';
import { ArrowLeft, ArrowRight, Tag, List, BookOpen, Check, Sparkles, Loader2 } from 'lucide-react';
import { TermsModal } from './TermsModal';
import { PaymentModal } from './PaymentModal';
import { ChildAvatar } from './ChildAvatar';
import { applyDiscountCode } from '../../../../services/venueService';

const YELLOW_SPLASH = 'https://webstepdev.com/demo/syncoWebsiteImages/find-a-class/yellow.png';

export function Step7CheckAndPay({
  selectedPlan,
  selectedDate,
  childrenData = [],
  paymentBreakdown = null,
  isTrialOffer = false,
  isTransfer = false,
  kitsData = [],
  onBack,
  onFinalSubmit,
  isSubmitting = false,
  parentData = {},
  deliveryAddress = {},
  submitError = '',
  appliedDiscount: externalAppliedDiscount,
  setAppliedDiscount: externalSetAppliedDiscount,
  discountCode: externalDiscountCode,
  setDiscountCode: externalSetDiscountCode
}) {
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [internalDiscountCode, setInternalDiscountCode] = useState('');
  const [internalAppliedDiscount, setInternalAppliedDiscount] = useState(0);

  const discountCode = externalDiscountCode !== undefined ? externalDiscountCode : internalDiscountCode;
  const setDiscountCode = externalSetDiscountCode || setInternalDiscountCode;

  const appliedDiscount = externalAppliedDiscount !== undefined ? externalAppliedDiscount : internalAppliedDiscount;
  const setAppliedDiscount = externalSetAppliedDiscount || setInternalAppliedDiscount;

  const [discountMessage, setDiscountMessage] = useState('');
  const [isDiscountSuccess, setIsDiscountSuccess] = useState(false);
  const [isApplyingDiscount, setIsApplyingDiscount] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(true);
  const [mediaConsent, setMediaConsent] = useState(false);

  const totalChildren = childrenData.length || 1;
  const primaryChild = childrenData?.[0] || {};
  const childName = primaryChild.firstName || 'your child';
  const planDuration = selectedPlan?.duration || 12;

  // Monthly single child price
  const baseMonthlyPrice = Number(
    selectedPlan?.monthlyPrice ||
    (selectedPlan?.price ? (selectedPlan.price / planDuration) : 51.99)
  );

  // Total monthly direct debit across all children
  const totalMonthlyDirectDebit = (baseMonthlyPrice * totalChildren).toFixed(2);

  // Dynamic pro-rata session calculations
  const startMonthName = paymentBreakdown?.monthName || selectedDate?.monthFull || 'November';
  const sessionsCount = Number(paymentBreakdown?.sessionsLeft) || 2;
  const pricePerSession = Number(
    paymentBreakdown?.perSession ||
    (selectedPlan?.priceLesson ? Number(selectedPlan.priceLesson) : 16.42)
  );
  const sessionsTotal = sessionsCount * pricePerSession * totalChildren;

  // Starter pack calculation
  const baseStarterPrice = 89.99;
  const trialDiscountPerChild = isTrialOffer ? 40.0 : 0.0;
  const starterPricePerChild = isTransfer ? 0.0 : (baseStarterPrice - trialDiscountPerChild);
  const starterPackTotal = starterPricePerChild * totalChildren;

  // Delivery fee calculation (£4.99 for 1st, +£2.00 for subsequent children; £0 for transfers)
  const deliveryFee = isTransfer ? 0.0 : (totalChildren === 1 ? 4.99 : 4.99 + (totalChildren - 1) * 2.0);

  // Next direct debit date
  const nextDebitDate = paymentBreakdown?.nextMonthDirectDebit || '1st of next month';

  // Total Today calculation
  const totalTodayNum = Math.max(0, sessionsTotal + starterPackTotal + deliveryFee - appliedDiscount);
  const totalTodayFormatted = totalTodayNum.toFixed(2);

  const handleApplyDiscount = async () => {
    const cleanCode = discountCode.trim();
    if (!cleanCode) {
      setDiscountMessage('Please enter a discount code.');
      setIsDiscountSuccess(false);
      return;
    }

    setIsApplyingDiscount(true);
    setDiscountMessage('');

    try {
      const starterPackAmount = starterPackTotal > 0 ? Number(starterPackTotal.toFixed(2)) : 89.99;
      const result = await applyDiscountCode({
        starterPack: starterPackAmount,
        code: cleanCode
      });

      console.log('Discount API response:', result);

      // Extract discount amount from API response
      const dataObj = result?.data || result;
      let discountVal = 0;

      if (dataObj?.discountAmount != null) {
        discountVal = Number(dataObj.discountAmount);
      } else if (dataObj?.discount != null) {
        discountVal = Number(dataObj.discount);
      } else if (dataObj?.amount != null) {
        discountVal = Number(dataObj.amount);
      } else if (dataObj?.discountedStarterPack != null) {
        const newPrice = Number(dataObj.discountedStarterPack);
        discountVal = Math.max(0, starterPackAmount - newPrice);
      } else if (dataObj?.discountedPrice != null && dataObj?.originalPrice != null) {
        discountVal = Math.max(0, Number(dataObj.originalPrice) - Number(dataObj.discountedPrice));
      } else if (dataObj?.percentage != null || dataObj?.discountPercentage != null) {
        const pct = Number(dataObj.percentage || dataObj.discountPercentage);
        discountVal = (starterPackAmount * pct) / 100;
      } else {
        discountVal = 10;
      }

      setAppliedDiscount(discountVal);
      setIsDiscountSuccess(true);
      setDiscountMessage(result?.message || `Discount applied! Saved £${discountVal.toFixed(2)}.`);
    } catch (error) {
      setAppliedDiscount(0);
      setIsDiscountSuccess(false);
      setDiscountMessage(error?.message || 'Invalid discount code.');
    } finally {
      setIsApplyingDiscount(false);
    }
  };

  const handleRemoveDiscount = () => {
    setAppliedDiscount(0);
    setDiscountCode('');
    setDiscountMessage('');
    setIsDiscountSuccess(false);
  };

  const handleOpenPayment = () => {
    if (!agreedToTerms) {
      alert('Please agree to the Terms and Conditions to proceed.');
      return;
    }
    setIsPaymentOpen(true);
  };

  const handleProcessPayment = (paymentData) => {
    if (onFinalSubmit) {
      onFinalSubmit({
        ...paymentData,
        totalPaid: totalTodayFormatted,
        agreedToTerms,
        mediaConsent,
        totalChildren,
        starterPackTotal: starterPackTotal.toFixed(2),
        deliveryFee: deliveryFee.toFixed(2),
        discountCode: appliedDiscount > 0 ? discountCode.trim().toUpperCase() : null,
        appliedDiscount: appliedDiscount > 0 ? appliedDiscount : 0,
        isTrialOffer
      });
    }
  };

  return (
    <div className="space-y-6 sm:space-y-7 animate-badge-fade-in">
      {/* Step Heading */}
      <div className="pb-2">
        <h1 className="text-[32px] sm:text-[36px] lg:text-[42px] font-bold text-[#042C89] leading-[1.05] recline">
          Check and <br />
          <span className="relative text-[44px] sm:text-[50px] gasoek font-normal inline-block text-[#0DD180] mt-1">
            pay today.
            <img
              src={YELLOW_SPLASH}
              alt=""
              className="absolute -bottom-2 left-0 w-[98%] object-fill pointer-events-none"
            />
          </span>
        </h1>
      </div>

      {/* Children Summary Chips (if multi-child) */}
      {totalChildren > 1 && (
        <div className="bg-[#EEF1F8] p-3 rounded-2xl flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-[#042C89] mr-1">Booking for:</span>
          {childrenData.map((child, i) => (
            <div
              key={i}
              className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-full border border-[#CBD5E1] text-xs font-bold text-[#042C89]"
            >
              <ChildAvatar firstName={child.firstName || `Child ${i + 1}`} lastName={child.lastName} size="xs" />
              <span>{child.firstName || `Child ${i + 1}`}</span>
              <span className="text-[#64748B] font-medium text-[11px]">
                (Kit: {kitsData?.[i]?.kitSize || 'S'})
              </span>
            </div>
          ))}
        </div>
      )}

      {/* 24-Hour Trial Discount Notice Banner */}
      {isTrialOffer && (
        <div className="bg-[#EBF7FC] border border-[#002B9A] rounded-[18px] p-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-full bg-[#FFE600] text-[#042C89] flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 fill-current" />
            </span>
            <div>
              <p className="text-xs sm:text-sm font-bold text-[#042C89]">
                24-Hour Trial Offer Applied!
              </p>
              <p className="text-[11px] sm:text-xs text-[#0369A1]">
                You’ve saved <strong>£{(trialDiscountPerChild * totalChildren).toFixed(2)}</strong> (£40 per child) on the starter packs.
              </p>
            </div>
          </div>
          <span className="font-black text-xs sm:text-sm text-[#0D7A4A] bg-white px-2.5 py-1 rounded-full border border-[#A7F3D0]">
            -£{(trialDiscountPerChild * totalChildren).toFixed(2)}
          </span>
        </div>
      )}

      {/* Card 1: To Pay Today */}
      <div className="bg-white rounded-[24px] border border-[#E2E8F0] p-5 sm:p-7 shadow-2xs space-y-4">
        <h3 className="text-[17px] sm:text-[18px] font-bold text-[#042C89]">
          To pay today
        </h3>

        <div className="space-y-2.5 text-[14px] sm:text-[15px]">
          {/* Pro-rata sessions */}
          <div className="flex items-center justify-between text-[#334155]">
            <span>
              {sessionsCount} sessions left in {startMonthName} (pro-rata)
            </span>
            <span className="font-bold text-[#0B2A8A]">
              £{sessionsTotal.toFixed(2)}
            </span>
          </div>

          {/* Starter Pack */}
          <div className="flex items-center justify-between text-[#334155]">
            <div>
              <span>
                Starter pack
                {isTransfer && (
                  <span className="text-xs font-bold text-[#0D7A4A] bg-[#ECFDF5] px-2 py-0.5 rounded-full ml-1.5">
                    Transfer (£0)
                  </span>
                )}
              </span>
              {totalChildren > 1 && !isTransfer && (
                <span className="text-xs text-[#64748B] block">
                  {totalChildren} × £{starterPricePerChild.toFixed(2)} per box
                </span>
              )}
              {isTransfer && (
                <span className="text-xs text-[#0D7A4A] block">
                  Existing kit carries over · Fee waived
                </span>
              )}
            </div>
            <span className="font-bold text-[#0B2A8A]">
              £{starterPackTotal.toFixed(2)}
            </span>
          </div>

          {/* Delivery fee */}
          <div className="flex items-center justify-between text-[#334155]">
            <div>
              <span>Delivery by Royal Mail</span>
              {totalChildren > 1 && !isTransfer && (
                <span className="text-xs text-[#64748B] block">
                  Combined shipping for {totalChildren} children
                </span>
              )}
              {isTransfer && (
                <span className="text-xs text-[#64748B] block">
                  No delivery required
                </span>
              )}
            </div>
            <span className="font-bold text-[#0B2A8A]">
              {isTransfer ? 'Free' : `£${deliveryFee.toFixed(2)}`}
            </span>
          </div>

          {/* Applied discount code */}
          {appliedDiscount > 0 && (
            <div className="flex items-center justify-between text-[#0D7A4A] font-bold">
              <span>Promo code discount</span>
              <span>-£{appliedDiscount.toFixed(2)}</span>
            </div>
          )}
        </div>

        <div className="border-t border-[#E2E8F0] pt-4">
          <div className="flex items-baseline justify-between">
            <span className="text-[18px] sm:text-[20px] font-black text-[#042C89]">
              Total today
            </span>
            <span className="text-[24px] sm:text-[28px] font-black text-[#042C89]">
              £{totalTodayFormatted}
            </span>
          </div>

          <p className="text-[12px] sm:text-[13px] text-[#64748B] mt-1 leading-snug">
            No joining fee. £{totalMonthlyDirectDebit} by Direct Debit on the 1st of each month starting from {nextDebitDate}
            {totalChildren > 1 ? ` (covers all ${totalChildren} children).` : '.'}
          </p>
        </div>
      </div>

      {/* Card 2: Discount Code */}
      <div className="space-y-1.5">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Tag className="w-4 h-4 text-[#94A3B8] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={discountCode}
              onChange={(e) => {
                setDiscountCode(e.target.value);
                if (discountMessage && !isDiscountSuccess) setDiscountMessage('');
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleApplyDiscount();
                }
              }}
              placeholder="Discount code (e.g. HZWK5R)"
              disabled={isApplyingDiscount || appliedDiscount > 0}
              className="w-full h-[50px] pl-11 pr-4 rounded-full bg-white border border-[#CBD5E1] text-[14px] font-medium text-[#042C89] placeholder-[#94A3B8] outline-none focus:border-[#042C89] uppercase tracking-wider disabled:bg-[#F8FAFC]"
            />
          </div>

          {appliedDiscount > 0 ? (
            <button
              type="button"
              onClick={handleRemoveDiscount}
              className="h-[50px] px-6 sm:px-7 rounded-full bg-red-50 hover:bg-red-100 text-red-600 font-bold text-[14px] transition-all cursor-pointer active:scale-95"
            >
              Remove
            </button>
          ) : (
            <button
              type="button"
              onClick={handleApplyDiscount}
              disabled={isApplyingDiscount || !discountCode.trim()}
              className="h-[50px] px-6 sm:px-7 rounded-full bg-[#E8F3FA] hover:bg-[#d9ecf7] disabled:opacity-60 text-[#042C89] font-bold text-[14px] transition-all cursor-pointer active:scale-95 flex items-center justify-center gap-2"
            >
              {isApplyingDiscount ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Applying...</span>
                </>
              ) : (
                <span>Apply</span>
              )}
            </button>
          )}
        </div>

        {discountMessage && (
          <p
            className={`text-xs px-2 font-medium flex items-center gap-1.5 ${
              isDiscountSuccess ? 'text-[#0D7A4A] font-bold' : 'text-red-500'
            }`}
          >
            {isDiscountSuccess && <Sparkles className="w-3.5 h-3.5" />}
            <span>{discountMessage}</span>
          </p>
        )}

        <p className="text-[11px] sm:text-[12px] text-[#797A88] px-2">
          Codes apply to pro-rata sessions and starter pack.
        </p>
      </div>

      {/* Card 3: Terms and Conditions */}
      <div className="bg-white rounded-[24px] border border-[#E2E8F0] p-5 sm:p-7 shadow-2xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#E8F3FA] flex items-center justify-center shrink-0 text-[#00A3E0]">
            <List className="w-4 h-4 stroke-[2.5]" />
          </div>
          <div>
            <h4 className="text-[15px] sm:text-[16px] font-bold text-[#042C89] leading-tight">
              Terms and conditions
            </h4>
            <p className="text-[12px] sm:text-[13px] text-[#64748B] mt-0.5">
              {planDuration}-month plan · please read before you pay
            </p>
          </div>
        </div>

        <div className="border-t border-[#E2E8F0] pt-3 divide-y divide-[#F1F5F9] text-[13px] sm:text-[14px]">
          <div className="grid grid-cols-12 py-2.5">
            <span className="col-span-4 sm:col-span-3 font-bold text-[#042C89]">Length</span>
            <span className="col-span-8 sm:col-span-9 text-[#334155]">
              {planDuration} months from {nextDebitDate}, then rolling monthly
            </span>
          </div>

          <div className="grid grid-cols-12 py-2.5">
            <span className="col-span-4 sm:col-span-3 font-bold text-[#042C89]">Leaving early</span>
            <span className="col-span-8 sm:col-span-9 text-[#334155]">
              Remaining balance of the plan is due
            </span>
          </div>

          <div className="grid grid-cols-12 py-2.5">
            <span className="col-span-4 sm:col-span-3 font-bold text-[#042C89]">Auto Renewal</span>
            <span className="col-span-8 sm:col-span-9 text-[#334155]">
              Give 1 month’s notice before your {planDuration} months end to stop renewal.
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsTermsOpen(true)}
          className="w-full h-11 rounded-full bg-[#E8F3FA] hover:bg-[#d9ecf7] text-[#042C89] font-bold text-[13px] flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98"
        >
          <BookOpen className="w-4 h-4" />
          <span>Read the full terms</span>
        </button>
      </div>

      {/* Checkboxes */}
      <div className="space-y-3 pt-1">
        {/* Required terms checkbox */}
        <label className="flex items-start gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="sr-only"
          />
          <div
            className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-all ${
              agreedToTerms
                ? 'bg-[#00D084] text-white shadow-xs'
                : 'border-2 border-[#CBD5E1] bg-white'
            }`}
          >
            {agreedToTerms && <Check className="w-3.5 h-3.5 stroke-[3.5]" />}
          </div>
          <span className="text-[13px] sm:text-[14px] text-[#334155] font-medium leading-snug">
            I agree to the{' '}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setIsTermsOpen(true);
              }}
              className="text-[#00A3E0] hover:underline font-bold"
            >
              {planDuration}-month plan Terms and Conditions
            </button>
          </span>
        </label>

        {/* Optional media consent checkbox */}
        <label className="flex items-start gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={mediaConsent}
            onChange={(e) => setMediaConsent(e.target.checked)}
            className="sr-only"
          />
          <div
            className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-all ${
              mediaConsent
                ? 'bg-[#00D084] text-white shadow-xs'
                : 'border-2 border-[#CBD5E1] bg-white'
            }`}
          >
            {mediaConsent && <Check className="w-3.5 h-3.5 stroke-[3.5]" />}
          </div>
          <span className="text-[13px] sm:text-[14px] text-[#64748B] font-medium leading-snug">
            I’m happy for {totalChildren > 1 ? 'my children' : childName} to appear in Samba photos and videos (optional)
          </span>
        </label>
      </div>

      {/* Submission Error Banner */}
      {submitError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold">
          {submitError}
        </div>
      )}

      {/* Navigation Footer */}
      <div className="pt-6 border-t border-[#E2E8F0]">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 text-[#002B9A] hover:underline font-bold text-xs sm:text-[13px] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <button
            type="button"
            onClick={handleOpenPayment}
            disabled={!agreedToTerms || isSubmitting}
            className="bg-[#00D084] hover:bg-[#00b875] disabled:opacity-50 text-white font-bold text-xs sm:text-[14px] px-8 sm:px-9 py-3.5 rounded-full flex items-center gap-2 shadow-sm transition-all cursor-pointer active:scale-95"
          >
            <span>Pay £{totalTodayFormatted} today</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        <p className="text-center text-[11px] text-[#94A3B8] mt-3">
          Secured with 256-bit encryption · AccessPaySuite & GoCardless
        </p>
      </div>

      {/* Terms Modal */}
      <TermsModal
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
        onAgree={() => setAgreedToTerms(true)}
        planDuration={planDuration}
        monthlyPrice={baseMonthlyPrice.toFixed(2)}
      />

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        totalToday={totalTodayFormatted}
        onPay={handleProcessPayment}
        isProcessing={isSubmitting}
        parentData={parentData}
        deliveryAddress={deliveryAddress}
        submitError={submitError}
      />
    </div>
  );
}

export default Step7CheckAndPay;
