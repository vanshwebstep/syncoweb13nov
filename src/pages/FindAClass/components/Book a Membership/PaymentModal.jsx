import React, { useState } from 'react';
import { X, Lock, Loader2 } from 'lucide-react';

export function PaymentModal({
  isOpen,
  onClose,
  totalToday = '127.82',
  onPay,
  isProcessing = false
}) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  // Format Card Number (adds spaces every 4 digits)
  const handleCardNumberChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = val.replace(/(\d{4})/g, '$1 ').trim();
    setCardNumber(formatted);
  };

  // Format Expiry (MM / YY)
  const handleExpiryChange = (e) => {
    let val = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (val.length >= 3) {
      val = `${val.slice(0, 2)} / ${val.slice(2)}`;
    }
    setExpiry(val);
  };

  // Format CVC (3-4 digits)
  const handleCvcChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 4);
    setCvc(val);
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!cardNumber || cardNumber.replace(/\s/g, '').length < 15) {
      setError('Please enter a valid card number');
      return;
    }
    if (!expiry || expiry.length < 5) {
      setError('Please enter card expiry date (MM / YY)');
      return;
    }
    if (!cvc || cvc.length < 3) {
      setError('Please enter a valid 3-digit CVC');
      return;
    }
    setError('');
    if (onPay) {
      onPay({
        method: 'card',
        last4: cardNumber.slice(-4),
        expiry
      });
    }
  };

  const handleApplePay = () => {
    if (onPay) {
      onPay({
        method: 'apple_pay'
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fadeIn">
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-[28px] max-w-[480px] w-full p-6 sm:p-7 shadow-2xl z-10 animate-scaleUp">
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <h2 className="text-[22px] sm:text-[24px] font-bold text-[#0B2A8A] leading-tight">
              Pay £{totalToday} today
            </h2>
            <p className="text-[13px] text-[#64748B] mt-0.5">
              Sessions, starter pack and delivery.
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

        {/* Apple Pay Button */}
        <button
          type="button"
          onClick={handleApplePay}
          disabled={isProcessing}
          className="w-full h-[48px] bg-black hover:bg-neutral-900 text-white rounded-full font-bold text-[15px] flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-98 shadow-sm"
        >
          {/* Apple Logo SVG */}
          <svg className="w-4 h-4 fill-current mb-0.5" viewBox="0 0 170 170">
            <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.66-7.74-11.89-14.1-6.19-9.35-11.08-20.08-14.67-32.22-3.59-12.14-5.39-23.77-5.39-34.9 0-14.28 3.55-26.31 10.66-36.08 7.1-9.77 16.27-14.76 27.5-14.98 5.48 0 11.23 1.41 17.25 4.23 6.02 2.83 10.16 4.3 12.42 4.43 1.95 0 6.22-1.54 12.8-4.63 6.58-3.08 12.56-4.47 17.94-4.17 13.9.76 24.87 5.67 32.92 14.74-12.18 7.39-18.17 17.51-17.96 30.34.22 10.22 4.13 18.77 11.75 25.64 7.61 6.87 16.65 10.74 27.12 11.61-2.4 7.18-5.32 14.13-8.74 20.84zM119.22 33.09c0-7.39 2.65-14.48 7.96-21.28 5.3-6.8 11.89-11.06 19.76-12.79.76 1.74 1.14 3.49 1.14 5.23 0 7.39-2.73 14.7-8.19 21.93-5.46 7.23-12.18 11.45-20.16 12.67-.11-1.74-.51-3.66-.51-5.76z" />
          </svg>
          <span>Pay</span>
        </button>

        {/* Divider */}
        <div className="relative my-5 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#E2E8F0]" />
          </div>
          <span className="relative bg-white px-3 text-xs text-[#94A3B8] font-medium">
            or pay by card
          </span>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 text-red-600 text-xs font-bold p-3 rounded-xl border border-red-200">
            {error}
          </div>
        )}

        {/* Card Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#0B2A8A] mb-1.5">
              Card number
            </label>
            <input
              type="text"
              value={cardNumber}
              onChange={handleCardNumberChange}
              placeholder="1234 1234 1234 1234"
              className="w-full h-11 px-4 rounded-xl border border-[#CBD5E1] text-sm font-medium tracking-wider outline-none focus:border-[#0B2A8A]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#0B2A8A] mb-1.5">
                Expiry
              </label>
              <input
                type="text"
                value={expiry}
                onChange={handleExpiryChange}
                placeholder="MM / YY"
                className="w-full h-11 px-4 rounded-xl border border-[#CBD5E1] text-sm font-medium outline-none focus:border-[#0B2A8A]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#0B2A8A] mb-1.5">
                CVC
              </label>
              <input
                type="text"
                value={cvc}
                onChange={handleCvcChange}
                placeholder="123"
                className="w-full h-11 px-4 rounded-xl border border-[#CBD5E1] text-sm font-medium outline-none focus:border-[#0B2A8A]"
              />
            </div>
          </div>

          {/* Pay Button */}
          <button
            type="submit"
            disabled={isProcessing}
            className="w-full h-[50px] bg-[#00D084] hover:bg-[#00b875] text-white font-bold text-[15px] rounded-full flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98 shadow-sm disabled:opacity-60 mt-5"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing payment...</span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4 stroke-[2.5]" />
                <span>Pay £{totalToday}</span>
              </>
            )}
          </button>

          <p className="text-center text-[11px] text-[#94A3B8] flex items-center justify-center gap-1.5 pt-1">
            <Lock className="w-3 h-3 text-[#94A3B8]" />
            <span>Secured by Stripe</span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default PaymentModal;
