import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Building2, Lock, ShieldCheck, Loader2 } from 'lucide-react';

const YELLOW_SPLASH = 'https://webstepdev.com/demo/syncoWebsiteImages/find-a-class/yellow.png';

export function Step8MonthlyPayments({
  selectedPlan,
  paymentBreakdown,
  parentData = {},
  totalChildren = 1,
  onSubmitDirectDebit,
  onBack,
  isSubmitting = false,
  submitError = ''
}) {
  const defaultName = `${parentData?.firstName || ''} ${parentData?.lastName || ''}`.trim() || 'Parent User';
  const [accountHolderName, setAccountHolderName] = useState(defaultName);
  const [sortCode, setSortCode] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [provider, setProvider] = useState('gocardless'); // 'gocardless' or 'accesspaysuite'
  const [agreedToMandate, setAgreedToMandate] = useState(true);
  const [formError, setFormError] = useState('');

  const monthlyPriceNum = Number(
    selectedPlan?.monthlyPrice ||
    paymentBreakdown?.monthlyPrice ||
    51.99
  );
  const totalMonthly = (monthlyPriceNum * totalChildren).toFixed(2);
  const nextDebitDate = paymentBreakdown?.nextMonthDirectDebit || '1st of next month';
  const planDuration = selectedPlan?.duration || 12;

  // Format Sort Code (XX-XX-XX)
  const handleSortCodeChange = (e) => {
    let val = e.target.value.replace(/\D/g, '').slice(0, 6);
    if (val.length > 4) {
      val = `${val.slice(0, 2)}-${val.slice(2, 4)}-${val.slice(4)}`;
    } else if (val.length > 2) {
      val = `${val.slice(0, 2)}-${val.slice(2)}`;
    }
    setSortCode(val);
  };

  // Format Account Number (8 digits)
  const handleAccountNumberChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 8);
    setAccountNumber(val);
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    setFormError('');

    const cleanSort = sortCode.replace(/\D/g, '');
    if (!accountHolderName.trim()) {
      setFormError('Please enter the bank account holder name');
      return;
    }
    if (!cleanSort || cleanSort.length < 6) {
      setFormError('Please enter a valid 6-digit sort code (e.g. 20-00-00)');
      return;
    }
    if (!accountNumber || accountNumber.length < 8) {
      setFormError('Please enter a valid 8-digit account number (e.g. 55779911)');
      return;
    }
    if (!agreedToMandate) {
      setFormError('Please accept the Direct Debit mandate to complete registration');
      return;
    }

    if (onSubmitDirectDebit) {
      onSubmitDirectDebit({
        paymentType: provider,
        account_holder_name: accountHolderName.trim(),
        branch_code: cleanSort,
        account_number: accountNumber
      });
    }
  };

  const displayedError = formError || submitError;

  return (
    <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-7 animate-badge-fade-in">
      {/* Step Heading */}
      <div className="pb-1">
        <span className="inline-block bg-[#EBF7FC] text-[#002B9A] font-extrabold text-[11px] sm:text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider mb-2.5">
          Step 2 of 2 · Monthly Direct Debit
        </span>
        <h1 className="text-[32px] sm:text-[36px] lg:text-[42px] font-bold text-[#042C89] leading-[1.05] recline">
          Set up your <br />
          <span className="relative text-[44px] sm:text-[50px] gasoek font-normal inline-block text-[#0DD180] mt-1">
            monthly payments.
            <img
              src={YELLOW_SPLASH}
              alt=""
              className="absolute -bottom-2 left-0 w-[98%] object-fill pointer-events-none"
            />
          </span>
        </h1>

        <p className="text-[#64748B] text-[13px] sm:text-[14px] mt-3 sm:mt-4 leading-relaxed">
          Your initial payment was processed. Set up your recurring Direct Debit instruction below for monthly fees starting from <strong>{nextDebitDate}</strong>.
        </p>
      </div>

      {displayedError && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-xs sm:text-sm font-bold">
          {displayedError}
        </div>
      )}

      {/* Monthly Plan Breakdown Card */}
      <div className="bg-white rounded-[22px] border border-[#E2E8F0] p-5 sm:p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-full bg-[#EBF7FC] text-[#002B9A] flex items-center justify-center font-bold">
              <Building2 className="w-4 h-4" />
            </span>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-[#042C89]">
                Monthly Direct Debit
              </h4>
              <span className="text-xs text-[#64748B]">
                {planDuration}-month commitment · Renews monthly on the 1st
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-lg sm:text-2xl font-black text-[#042C89] block">
              £{totalMonthly}
            </span>
            <span className="text-[11px] text-[#64748B]">/ month</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-[13px]">
          <div className="bg-[#F8FAFC] p-3 rounded-xl">
            <span className="text-[#64748B] block font-medium">First Collection Date</span>
            <span className="font-bold text-[#042C89]">{nextDebitDate}</span>
          </div>
          <div className="bg-[#F8FAFC] p-3 rounded-xl">
            <span className="text-[#64748B] block font-medium">Payment Provider</span>
            <span className="font-bold text-[#042C89] capitalize">
              {provider === 'gocardless' ? 'GoCardless (Direct Debit)' : 'Access PaySuite (Direct Debit)'}
            </span>
          </div>
        </div>
      </div>

      {/* Provider Toggle Pill (optional switch between GoCardless and AccessPaySuite) */}
      <div className="flex items-center justify-between bg-[#EEF1F8] p-1.5 rounded-full max-w-sm">
        <button
          type="button"
          onClick={() => setProvider('gocardless')}
          className={`flex-1 py-1.5 px-3 rounded-full text-xs font-bold transition-all cursor-pointer ${
            provider === 'gocardless'
              ? 'bg-white text-[#0B2A8A] shadow-xs'
              : 'text-[#64748B] hover:text-[#0B2A8A]'
          }`}
        >
          GoCardless
        </button>
        <button
          type="button"
          onClick={() => setProvider('accesspaysuite')}
          className={`flex-1 py-1.5 px-3 rounded-full text-xs font-bold transition-all cursor-pointer ${
            provider === 'accesspaysuite'
              ? 'bg-white text-[#0B2A8A] shadow-xs'
              : 'text-[#64748B] hover:text-[#0B2A8A]'
          }`}
        >
          Access PaySuite
        </button>
      </div>

      {/* Bank Account Details Card */}
      <div className="bg-white rounded-[22px] border border-[#E2E8F0] p-5 sm:p-6 shadow-2xs space-y-4">
        <h4 className="text-[15px] sm:text-[16px] font-bold text-[#042C89]">
          UK Bank Account Details
        </h4>

        <div className="space-y-3.5">
          {/* Account Holder Name */}
          <div>
            <label className="block text-xs font-bold text-[#042C89] mb-1.5">
              Account holder name
            </label>
            <input
              type="text"
              value={accountHolderName}
              onChange={(e) => setAccountHolderName(e.target.value)}
              placeholder="e.g. Rahul Sharma"
              className="w-full h-11 px-4 rounded-xl border border-[#CBD5E1] text-sm font-medium outline-none focus:border-[#042C89] placeholder:text-[#94A3B8]"
            />
          </div>

          {/* Sort Code & Account Number */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-xs font-bold text-[#042C89] mb-1.5">
                Sort code
              </label>
              <input
                type="text"
                value={sortCode}
                onChange={handleSortCodeChange}
                placeholder="20-00-00"
                className="w-full h-11 px-4 rounded-xl border border-[#CBD5E1] text-sm font-medium tracking-wider outline-none focus:border-[#042C89] placeholder:text-[#94A3B8]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#042C89] mb-1.5">
                Account number
              </label>
              <input
                type="text"
                value={accountNumber}
                onChange={handleAccountNumberChange}
                placeholder="55779911"
                className="w-full h-11 px-4 rounded-xl border border-[#CBD5E1] text-sm font-medium tracking-wider outline-none focus:border-[#042C89] placeholder:text-[#94A3B8]"
              />
            </div>
          </div>
        </div>

        {/* Direct Debit Guarantee Notice */}
        <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3.5 flex items-start gap-3">
          <div className="w-5 h-5 rounded-full bg-[#00D084] text-white flex items-center justify-center shrink-0 mt-0.5">
            <ShieldCheck className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>
          <div className="text-[11px] sm:text-xs text-[#64748B] leading-relaxed">
            <strong className="text-[#042C89]">The Direct Debit Guarantee:</strong> Payments are protected by the Direct Debit Guarantee. If an error is made, you are entitled to a full and immediate refund from your bank. You can cancel at any time.
          </div>
        </div>

        {/* Mandate Agreement Checkbox */}
        <label className="flex items-start gap-3 cursor-pointer pt-1 select-none">
          <input
            type="checkbox"
            checked={agreedToMandate}
            onChange={(e) => setAgreedToMandate(e.target.checked)}
            className="w-4 h-4 rounded text-[#00D084] mt-0.5 accent-[#00D084]"
          />
          <span className="text-xs text-[#334155] leading-snug">
            I confirm that I am the account holder and authorized to set up Direct Debit payments on this account.
          </span>
        </label>
      </div>

      {/* Navigation Footer */}
      <div className="pt-6 border-t border-[#E2E8F0] flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-[#002B9A] hover:underline font-bold text-xs sm:text-[13px] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to review</span>
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#00D084] hover:bg-[#00b875] disabled:opacity-50 text-white font-bold text-xs sm:text-[14px] px-8 sm:px-9 py-3.5 rounded-full flex items-center gap-2 shadow-sm transition-all cursor-pointer active:scale-95"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Setting up Direct Debit...</span>
            </>
          ) : (
            <>
              <Lock className="w-4 h-4 stroke-[2.5]" />
              <span>Confirm Direct Debit & Complete</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

export default Step8MonthlyPayments;
