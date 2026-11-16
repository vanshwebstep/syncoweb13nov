import React, { useState } from 'react';
import { X, Bell, CheckCircle2, MapPin, Clock, ArrowRight } from 'lucide-react';

export function WaitingListModal({ isOpen, onClose, venue, selectedClass }) {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [parentName, setParentName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen || !venue) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-7 shadow-2xl relative my-auto animate-badge-fade-in border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-3">
          <div>
            <span className="bg-[#FFF4E5] text-[#D97706] text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full inline-block mb-1">
              High Demand Session
            </span>
            <h2 className="text-2xl sm:text-[26px] font-extrabold text-[#061838] tracking-tight flex items-center gap-2">
              <Bell className="w-6 h-6 text-[#00A3E0]" />
              <span>Join Waiting List</span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm font-medium mt-0.5">
              {venue.venueName || venue.name || '-'} · {selectedClass?.time || '-'}
            </p>
          </div>
          <button
            onClick={handleReset}
            aria-label="Close dialog"
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#E8FBF1] text-[#0DD180] flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-[#061838]">
              You're on the Priority List!
            </h3>

            <p className="text-slate-600 text-xs sm:text-sm max-w-sm mx-auto leading-relaxed">
              We'll send an instant SMS alert to <strong className="text-[#061838]">{phone}</strong> the moment a space opens up at {venue.venueName || venue.name || '-'}.
            </p>

            <button
              type="button"
              onClick={handleReset}
              className="w-full bg-[#061838] hover:bg-[#0b3b8e] text-white font-bold text-sm py-3 px-6 rounded-full shadow-xs transition-all mt-4"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            <div className="bg-[#FFF4E5] text-[#D97706] border border-[#FDE68A] rounded-2xl p-3.5 text-xs font-semibold leading-relaxed">
              This class is currently at full capacity. Join the waiting list to get first priority when a spot opens up.
            </div>

            <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-3.5 text-xs space-y-1.5">
              <div className="font-extrabold text-[#061838]">{venue.venueName || venue.name || '-'}</div>
              <div className="text-slate-600 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#00A3E0]" />
                <span>{selectedClass?.time || '-'} · {selectedClass?.ageGroup || selectedClass?.className || '-'}</span>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Parent / Guardian Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. David Beckham"
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-[#061838] focus:border-[#00A3E0] focus:bg-white outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Mobile Number (for instant text alert) *
              </label>
              <input
                type="tel"
                required
                placeholder="07123 456789"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-[#061838] focus:border-[#00A3E0] focus:bg-white outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="david@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-[#061838] focus:border-[#00A3E0] focus:bg-white outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#E8F3FC] hover:bg-[#D4E8F8] text-[#061838] font-bold text-sm py-3.5 px-6 rounded-full flex items-center justify-center gap-2 transition-all mt-4"
            >
              <span>Join Priority Waiting List</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default WaitingListModal;
