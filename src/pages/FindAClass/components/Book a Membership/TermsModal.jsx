import React from 'react';
import { X } from 'lucide-react';

export function TermsModal({ isOpen, onClose, onAgree, planDuration = 12, monthlyPrice = '51.99' }) {
  if (!isOpen) return null;

  const handleAgree = () => {
    if (onAgree) onAgree();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fadeIn">
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-[28px] max-w-[620px] w-full p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] flex flex-col animate-scaleUp">
        {/* Header */}
        <div className="flex items-start justify-between mb-4 shrink-0">
          <div>
            <h2 className="text-[22px] sm:text-[24px] font-bold text-[#0B2A8A] leading-tight">
              Terms and conditions
            </h2>
            <p className="text-[13px] sm:text-[14px] text-[#64748B] mt-0.5">
              {planDuration} month membership plan
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#0B2A8A] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Scrollable Clauses */}
        <div className="overflow-y-auto pr-1 space-y-4 text-[12px] sm:text-[13px] text-[#334155] leading-relaxed py-2">
          <div>
            <h4 className="font-bold text-[#0B2A8A] text-[13px] sm:text-[14px] mb-1">
              1. Term
            </h4>
            <p>
              The {planDuration} month plan runs for {planDuration} months from the date of your first full monthly instalment and will automatically renew at the end of this period. To prevent renewal, give at least one month’s notice before the end of the initial {planDuration} month term. After that, the membership continues on a rolling monthly basis with two months’ notice to cancel.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-[#0B2A8A] text-[13px] sm:text-[14px] mb-1">
              2. What is included
            </h4>
            <p>
              {planDuration === 12 ? '38' : '19'} classes at one of our venues across {planDuration} months, and exclusive access to our end-of-year tournament (details and RSVP sent at the start of the Summer term).
            </p>
          </div>

          <div>
            <h4 className="font-bold text-[#0B2A8A] text-[13px] sm:text-[14px] mb-1">
              3. Starter pack
            </h4>
            <p>
              Mandatory for all new members: full uniform (T-shirt, shorts, socks), Samba skills ball, Skills Tracker book and string bag. £89.99 for one student, reduced by £40 per child if you sign up within 24 hours of your free trial.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-[#0B2A8A] text-[13px] sm:text-[14px] mb-1">
              4. Fees
            </h4>
            <p>
              If you enrol during a month you pay only for the classes left that month, plus the starter pack. Your plan then starts on the 1st of the following month. Monthly fees are due on the 1st of each month: {planDuration === 12 ? '38' : '19'} lessons over {planDuration} months, split into {planDuration} equal payments of £{monthlyPrice}.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-[#0B2A8A] text-[13px] sm:text-[14px] mb-1">
              5. Leaving early
            </h4>
            <p>
              You can cancel at any time, but if you cancel before the end of your {planDuration}-month contract the remaining balance of your plan is due. Exceptional circumstances can be reviewed by writing to admin@sambasoccerschools.com.
            </p>
          </div>

          <p className="text-[#64748B] italic pt-1">
            Full terms also in your confirmation email.
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-4 mt-2 border-t border-[#E2E8F0] shrink-0">
          <button
            type="button"
            onClick={handleAgree}
            className="w-full bg-[#00D084] hover:bg-[#00b875] text-white font-bold text-[15px] py-3.5 rounded-full shadow-sm transition-all cursor-pointer active:scale-98"
          >
            I agree
          </button>
        </div>
      </div>
    </div>
  );
}

export default TermsModal;
