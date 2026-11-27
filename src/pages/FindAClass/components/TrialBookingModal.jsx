import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle2, Trophy, Sparkles, MapPin, ArrowRight, Loader2, ChevronDown } from 'lucide-react';
import { bookFreeTrial } from '../../../services/venueService';
import { COUNTRY_CODES } from './Book a Membership/SambaLoginModal';

export function TrialBookingModal({ isOpen, onClose, venue, selectedClass }) {
  const [formData, setFormData] = useState({
    childName: '',
    childAge: '5',
    experience: 'Beginner',
    parentName: '',
    dialCode: '44',
    parentPhone: '',
    parentEmail: '',
    consent: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [bookingId, setBookingId] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen || !venue) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const childNames = formData.childName.trim().split(' ');
      const studentFirstName = childNames[0] || 'Child';
      const studentLastName = childNames.slice(1).join(' ') || 'Student';

      const parentNames = formData.parentName.trim().split(' ');
      const parentFirstName = parentNames[0] || 'Parent';
      const parentLastName = parentNames.slice(1).join(' ') || 'Guardian';

      const venueId = Number(venue?.venueId || venue?.id) || 5;
      const classScheduleId = Number(
        selectedClass?.classId ||
        selectedClass?.id ||
        venue?.schedule?.classes?.[0]?.classId ||
        12
      );

      // Next Saturday YYYY-MM-DD
      const nextDate = new Date();
      nextDate.setDate(nextDate.getDate() + ((6 - nextDate.getDay() + 7) % 7 || 7));
      const trialDate = nextDate.toISOString().split('T')[0];

      let rawPhone = (formData.parentPhone || '').trim();
      let dialCode = formData.dialCode || '44';
      let cleanPhone = rawPhone;
      if (cleanPhone.startsWith('+')) {
        if (cleanPhone.startsWith('+91')) {
          dialCode = '91';
          cleanPhone = cleanPhone.slice(3).trim();
        } else if (cleanPhone.startsWith('+44')) {
          dialCode = '44';
          cleanPhone = cleanPhone.slice(3).trim();
        } else {
          cleanPhone = cleanPhone.replace(/^\+/, '').trim();
        }
      }

      const digits = cleanPhone.replace(/\D/g, '');
      let localDigits = digits;
      if (localDigits.startsWith('0')) {
        localDigits = localDigits.slice(1);
      } else if (localDigits.startsWith(dialCode) && localDigits.length > 10) {
        localDigits = localDigits.slice(dialCode.length);
      }
      const formattedPhoneNumber = localDigits ? `+${dialCode}${localDigits}` : `+${dialCode}7700900123`;

      const ageNum = Number(formData.childAge) || 5;
      const birthYear = new Date().getFullYear() - ageNum;
      const dateOfBirth = `${birthYear}-01-01`;

      const payload = {
        venueId,
        trialDate,
        totalStudents: 1,
        students: [
          {
            studentFirstName,
            studentLastName,
            dateOfBirth,
            age: ageNum,
            gender: 'female',
            medicalInformation: 'NA',
            classScheduleId
          }
        ],
        password: 'password123',
        parents: [
          {
            parentFirstName,
            parentLastName,
            parentEmail: formData.parentEmail,
            parentPhoneNumber: formattedPhoneNumber,
            dialCode,
            relationToChild: 'mother',
            howDidYouHear: 'Website',
            interestReason: 'To improve their technical football skills',
            interestReasonOther: 'NA',
            password: 'password123'
          }
        ]
      };

      console.log('TrialBookingModal submitting payload:', payload);
      const res = await bookFreeTrial(payload);
      console.log('Trial booking response:', res);
      if (res?.data?.bookingId) {
        setBookingId(res.data.bookingId);
      }
      setIsSubmitted(true);
    } catch (err) {
      console.error('Error in TrialBookingModal:', err);
      setError(err.message || 'Failed to submit free trial booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setError('');
    setBookingId('');
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
            <span className="bg-[#E8FBF1] text-[#0DD180] text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full inline-block mb-1">
              100% Free · No Card Required
            </span>
            <h2 className="text-2xl sm:text-[26px] font-extrabold text-[#061838] tracking-tight">
              Book a FREE Trial
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm font-medium mt-0.5">
              {venue.venueName || venue.name || '-'} · {selectedClass?.time || venue.schedule?.classes?.[0]?.time || '-'}
            </p>
          </div>
          <button
            onClick={handleReset}
            aria-label="Close dialog"
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          /* Confirmation Success State */
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#E8FBF1] text-[#0DD180] flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-[#061838]">
              You're Booked In! 🎉
            </h3>

            {bookingId && (
              <div>
                <span className="bg-[#FFE600] text-[#061838] text-xs font-black px-4 py-1.5 rounded-full inline-block shadow-sm">
                  Booking Reference: {bookingId}
                </span>
              </div>
            )}

            <p className="text-slate-600 text-xs sm:text-sm max-w-sm mx-auto leading-relaxed">
              We've reserved a free place for <strong className="text-[#061838]">{formData.childName || 'your child'}</strong> at <strong>{venue.venueName || venue.name || '-'}</strong>.
            </p>

            <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-4 text-left space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-700">
                <MapPin className="w-4 h-4 text-[#00A3E0]" />
                <span className="font-semibold">{venue.address || '-'}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Clock className="w-4 h-4 text-[#0DD180]" />
                <span className="font-semibold">{selectedClass?.time || '-'}</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400">
              A confirmation text message and email have been sent to <strong>{formData.parentPhone || formData.parentEmail || 'your contact details'}</strong>.
            </p>

            <button
              type="button"
              onClick={handleReset}
              className="w-full bg-[#061838] hover:bg-[#0b3b8e] text-white font-bold text-sm py-3 px-6 rounded-full shadow-xs transition-all mt-4 cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          /* Booking Form */
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            <div className="bg-[#F0F7FF] rounded-2xl p-3.5 flex items-center justify-between text-xs border border-[#00A3E0]/20">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#00A3E0]" />
                <span className="font-bold text-[#061838]">
                  {selectedClass?.ageGroup || selectedClass?.className || '-'}
                </span>
              </div>
              <span className="bg-[#0DD180] text-white font-extrabold text-[10px] px-2 py-0.5 rounded-full">
                FREE
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Child's Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Leo Silva"
                  value={formData.childName}
                  onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-[#061838] focus:border-[#00A3E0] focus:bg-white outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Child's Age *
                </label>
                <select
                  value={formData.childAge}
                  onChange={(e) => setFormData({ ...formData, childAge: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-[#061838] focus:border-[#00A3E0] focus:bg-white outline-none"
                >
                  <option value="4">4 Years Old</option>
                  <option value="5">5 Years Old</option>
                  <option value="6">6 Years Old</option>
                  <option value="7">7 Years Old</option>
                  <option value="8">8 Years Old</option>
                  <option value="9">9 Years Old</option>
                  <option value="10">10 Years Old</option>
                  <option value="11">11 Years Old</option>
                  <option value="12">12 Years Old</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Parent / Guardian Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Sarah Silva"
                value={formData.parentName}
                onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-[#061838] focus:border-[#00A3E0] focus:bg-white outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Mobile Number (for SMS confirmation) *
                </label>
                <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl overflow-hidden focus-within:border-[#00A3E0] focus-within:bg-white">
                  <div className="relative flex items-center pl-3 pr-2 border-r border-slate-200 bg-white h-full shrink-0">
                    <select
                      value={formData.dialCode || '44'}
                      onChange={(e) => setFormData({ ...formData, dialCode: e.target.value })}
                      className="appearance-none bg-transparent pr-4 text-xs font-bold text-[#061838] outline-none cursor-pointer"
                    >
                      {COUNTRY_CODES.map((c) => (
                        <option key={c.code} value={c.code}>
                          +{c.code}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-3 h-3 text-slate-400 absolute right-0.5 pointer-events-none" />
                  </div>
                  <input
                    type="tel"
                    required
                    placeholder="07123 456789"
                    value={formData.parentPhone}
                    onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                    className="flex-1 px-3 py-2 text-sm text-[#061838] outline-none bg-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="sarah@example.com"
                  value={formData.parentEmail}
                  onChange={(e) => setFormData({ ...formData, parentEmail: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-[#061838] focus:border-[#00A3E0] focus:bg-white outline-none"
                />
              </div>
            </div>

            {error && (
              <p className="text-xs font-bold text-rose-500">{error}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#061838] hover:bg-[#0b3b8e] text-white font-bold text-sm py-3.5 px-6 rounded-full flex items-center justify-center gap-2 shadow-xs transition-all mt-4 cursor-pointer disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting booking...</span>
                </>
              ) : (
                <>
                  <span>Confirm FREE Trial Booking</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default TrialBookingModal;
