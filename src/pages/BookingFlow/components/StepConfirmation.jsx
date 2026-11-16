import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  MapPin, 
  Calendar, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  Sparkles, 
  Navigation,
  ArrowRight
} from 'lucide-react';

export function StepConfirmation({
  venue,
  selectedDate,
  childrenData = [],
  parentData,
  onReset
}) {
  const handleOpenDirections = () => {
    const dest = encodeURIComponent(venue?.address || venue?.name || 'Chelsea Academy');
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${dest}`, '_blank');
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-badge-fade-in text-center sm:text-left">
      {/* Header Banner */}
      <div className="bg-[#E8FBF1] border border-[#BCECD4] rounded-3xl p-6 sm:p-8 text-center space-y-3">
        <div className="w-16 h-16 rounded-full bg-[#0DD180] text-white flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
        </div>

        <h1 className="recline text-2xl sm:text-3xl lg:text-4xl font-black text-[#061838]">
          Your FREE Trial is Confirmed! 🎉
        </h1>

        <p className="text-slate-600 font-semibold text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
          We can't wait to welcome your family to Samba Soccer Schools! A confirmation SMS and email have been sent to{' '}
          <strong className="text-[#061838]">{parentData?.phone || 'your phone'}</strong> and{' '}
          <strong className="text-[#061838]">{parentData?.email || 'your email'}</strong>.
        </p>
      </div>

      {/* Reservation Details Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-5 text-left">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h2 className="font-black text-base sm:text-lg text-[#061838]">
            Booking Summary
          </h2>
          <span className="bg-[#FFE600] text-[#061838] text-[10px] sm:text-xs font-black px-3 py-1 rounded-full uppercase">
            Confirmed Reservation
          </span>
        </div>

        {/* Venue & Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#F0F7FF] text-[#00A3E0] flex items-center justify-center shrink-0 mt-0.5">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <span className="text-slate-400 font-bold block text-[11px] uppercase tracking-wider">
                Venue
              </span>
              <span className="font-black text-[#061838] text-sm sm:text-base">
                {venue?.name || 'Chelsea Academy'}
              </span>
              <p className="text-slate-500 font-medium text-xs mt-0.5">
                {venue?.address || 'Lots Road, London SW10 0AB'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#E8FBF1] text-[#0DD180] flex items-center justify-center shrink-0 mt-0.5">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <span className="text-slate-400 font-bold block text-[11px] uppercase tracking-wider">
                Date & Time
              </span>
              <span className="font-black text-[#061838] text-sm sm:text-base">
                {selectedDate?.fullDate || 'Saturday 24 October'}
              </span>
              <p className="text-slate-500 font-medium text-xs mt-0.5">
                {selectedDate?.timeText || 'From 7:15am'}
              </p>
            </div>
          </div>
        </div>

        {/* Registered Children */}
        <div className="border-t border-slate-100 pt-4">
          <span className="text-slate-400 font-bold block text-[11px] uppercase tracking-wider mb-2.5">
            Registered Players
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {childrenData.map((child, idx) => (
              <div 
                key={idx}
                className="bg-[#F8FAFC] border border-slate-200/70 rounded-2xl p-3 flex items-center gap-3"
              >
                <div className={`w-8 h-8 rounded-full ${idx === 0 ? 'bg-[#00A3E0]' : 'bg-[#0DD180]'} text-white font-black text-xs flex items-center justify-center shrink-0 shadow-2xs`}>
                  {child?.firstName?.charAt(0) || 'P'}
                </div>
                <div>
                  <div className="font-extrabold text-[#061838] text-xs sm:text-sm">
                    {child?.firstName || `Child ${idx + 1}`} {child?.lastName || ''}
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">
                    {child?.ageGroupText || `${child?.age || '5'} Years`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What to bring reminder */}
        <div className="bg-[#FFF9E6] border border-[#FDE68A] rounded-2xl p-4 text-xs space-y-1">
          <div className="font-black text-[#061838] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>What to bring to your session:</span>
          </div>
          <p className="text-slate-700 font-medium leading-relaxed">
            Please dress your child in comfortable sports kit/shorts, bring a labelled water bottle, and wear trainers or turf shoes (no metal studs). Arrive 10 minutes early to meet their coach!
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
        <button
          type="button"
          onClick={handleOpenDirections}
          className="w-full sm:flex-1 bg-[#061838] hover:bg-[#0b3b8e] text-white font-extrabold text-sm py-3.5 px-6 rounded-full flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer active:scale-95"
        >
          <Navigation className="w-4 h-4 text-[#00A3E0]" />
          <span>Get Directions to Venue</span>
        </button>

        <Link
          to="/find-a-class"
          className="w-full sm:flex-1 border-2 border-[#061838] hover:bg-slate-50 text-[#061838] font-extrabold text-sm py-3 px-6 rounded-full flex items-center justify-center gap-2 transition-all"
        >
          <span>Back to Find a Class</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

export default StepConfirmation;
