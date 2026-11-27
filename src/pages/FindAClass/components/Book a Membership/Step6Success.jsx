import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  Calendar,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Play,
  X,
  Package,
  Clock,
  Sparkles,
  Users,
  BookmarkCheck,
  ExternalLink
} from 'lucide-react';
import { Container } from '../../../../components/common/Container';
import { ChildAvatar } from './ChildAvatar';

export function Step6Success({
  venue,
  selectedClass,
  selectedPlan,
  selectedDate,
  childrenData = [],
  parentData,
  kitsData = [],
  bookingResult
}) {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const venueTitle = venue?.venueName || venue?.name || 'Wimbledon Community Sports Hub';
  const venueAddress = venue?.address || 'Tunnel Avenue, London';
  const classTime =
    selectedClass?.time ||
    (selectedClass?.startTime ? `${selectedClass.startTime} – ${selectedClass.endTime}` : '4:00 – 5:00pm');
  const classDay = selectedClass?.day
    ? selectedClass.day.charAt(0).toUpperCase() + selectedClass.day.slice(1)
    : 'Tuesday';
  const classAge = selectedClass?.className || selectedClass?.ageGroup || '4–5 Years';

  // Persistent booking reference (never changes across re-renders)
  const bookingRef = useMemo(() => {
    if (bookingResult?.data?.bookingId) return bookingResult.data.bookingId;
    if (bookingResult?.bookingId) return bookingResult.bookingId;
    const cached = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('samba_last_booking_ref') : null;
    if (cached) return cached;
    const freshRef = 'SAMBA-' + Math.floor(100000 + Math.random() * 900000);
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem('samba_last_booking_ref', freshRef);
    }
    return freshRef;
  }, [bookingResult]);

  const totalChildren = childrenData.length || 1;
  const planDuration = selectedPlan?.duration || 12;
  const parentName = parentData?.firstName || 'Parent';

  const firstSessionDate =
    selectedDate?.formattedDate ||
    selectedDate?.displayShort ||
    'Next scheduled session';

  return (
    <div className="py-8 sm:py-12 animate-badge-fade-in">
      <Container className="max-w-3xl">
        <div className="bg-white rounded-[28px] border border-[#E2E8F0] shadow-sm p-6 sm:p-10 text-center space-y-7">
          {/* Success Check Icon */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#10B981] flex items-center justify-center mx-auto shadow-xs">
            <CheckCircle2 className="w-9 h-9 sm:w-11 sm:h-11 stroke-[2.2]" />
          </div>

          {/* Heading */}
          <div>
            <span className="inline-block bg-[#EBF7FC] text-[#002B9A] font-extrabold text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider mb-3">
              Membership Confirmed
            </span>
            <h1 className="text-[28px] sm:text-[36px] font-black text-[#042C89] leading-tight">
              You’re all set for Samba Soccer! 🎉
            </h1>
            <p className="text-[#64748B] text-[14px] sm:text-[16px] mt-2 max-w-lg mx-auto leading-relaxed">
              Welcome to the family, <strong>{parentName}</strong>! Confirmation details, your starter pack tracking, and direct debit mandate have been sent to{' '}
              <strong className="text-[#042C89]">{parentData?.email || 'your email'}</strong>.
            </p>
          </div>

          {/* Booking Reference Pill (Persistent) */}
          <div className="flex items-center justify-center gap-2">
            <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
              Booking Reference:
            </span>
            <span className="text-xs sm:text-sm font-black text-[#002B9A] bg-[#EEF1F8] px-4 py-1.5 rounded-full border border-[#CBD5E1] tracking-wide select-all">
              {bookingRef}
            </span>
          </div>

          {/* Samba Connect Account Hub (User is now logged in) */}
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[24px] p-5 sm:p-6 text-left space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#002B9A] text-white flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-[#042C89] text-[15px] sm:text-base leading-tight">
                    Samba Connect Account Active
                  </h3>
                  <span className="text-xs text-[#64748B]">
                    Logged in as {parentData?.email || 'parent'}
                  </span>
                </div>
              </div>

              <span className="text-xs font-bold text-[#0D7A4A] bg-[#ECFDF5] px-2.5 py-1 rounded-full border border-[#A7F3D0]">
                Active Member
              </span>
            </div>

            {/* Quick Access Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Card 1: My Bookings */}
              <div className="bg-white border border-[#E2E8F0] rounded-xl p-3.5 space-y-1">
                <div className="flex items-center gap-1.5 text-[#002B9A] font-bold text-xs">
                  <BookmarkCheck className="w-3.5 h-3.5" />
                  <span>My Bookings</span>
                </div>
                <p className="text-xs text-[#042C89] font-extrabold truncate">
                  {planDuration}-Month Plan
                </p>
                <p className="text-[11px] text-[#64748B]">Ref: {bookingRef}</p>
              </div>

              {/* Card 2: My Children */}
              <div className="bg-white border border-[#E2E8F0] rounded-xl p-3.5 space-y-1">
                <div className="flex items-center gap-1.5 text-[#002B9A] font-bold text-xs">
                  <Users className="w-3.5 h-3.5" />
                  <span>{totalChildren > 1 ? 'My Children' : 'My Child'}</span>
                </div>
                <p className="text-xs text-[#042C89] font-extrabold truncate">
                  {childrenData.map((c) => c.firstName).filter(Boolean).join(', ') || 'Enrolled'}
                </p>
                <p className="text-[11px] text-[#64748B]">{classAge} · {classDay}s</p>
              </div>

              {/* Card 3: Upcoming Sessions */}
              <div className="bg-white border border-[#E2E8F0] rounded-xl p-3.5 space-y-1">
                <div className="flex items-center gap-1.5 text-[#002B9A] font-bold text-xs">
                  <Calendar className="w-3.5 h-3.5 text-[#00D084]" />
                  <span>First Session</span>
                </div>
                <p className="text-xs text-[#042C89] font-extrabold truncate">
                  {firstSessionDate}
                </p>
                <p className="text-[11px] text-[#64748B]">{classTime}</p>
              </div>
            </div>

            {/* Direct Dashboard Link */}
            <div className="pt-2 flex justify-end">
              <a
                href="https://parent-dash.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#002B9A] hover:underline"
              >
                <span>Open Samba Connect Dashboard</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Confirmed Children Details */}
          <div className="space-y-3.5 text-left">
            <h3 className="text-sm font-extrabold text-[#042C89] uppercase tracking-wider">
              {totalChildren > 1 ? `Confirmed Members (${totalChildren} Children)` : 'Confirmed Member Details'}
            </h3>

            <div className="grid grid-cols-1 gap-3">
              {childrenData.map((child, idx) => {
                const childFullName = child.firstName
                  ? `${child.firstName} ${child.lastName || ''}`.trim()
                  : `Child ${idx + 1}`;
                const kitSize = kitsData?.[idx]?.kitSize || 'S';
                const bookLevel = kitsData?.[idx]?.bookLevel || 'Beginners';

                return (
                  <div
                    key={idx}
                    className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[20px] p-4 sm:p-5 space-y-3"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
                      <div className="flex items-center gap-2.5">
                        <ChildAvatar firstName={childFullName} lastName={child.lastName} size="sm" />
                        <div>
                          <h4 className="font-bold text-[#0F172A] text-sm sm:text-base leading-tight">
                            {childFullName}
                          </h4>
                          <span className="text-xs text-[#64748B]">
                            Age {child.age || 5} · {classAge}
                          </span>
                        </div>
                      </div>

                      <span className="text-xs font-bold text-[#0D7A4A] bg-[#ECFDF5] px-2.5 py-1 rounded-full border border-[#A7F3D0]">
                        Registered
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-[13px]">
                      <div>
                        <span className="text-[#64748B] block font-medium">Venue</span>
                        <span className="font-bold text-[#042C89]">
                          {venueTitle}
                        </span>
                        <span className="text-[11px] text-[#64748B] block truncate">{venueAddress}</span>
                      </div>

                      <div>
                        <span className="text-[#64748B] block font-medium">Weekly Schedule</span>
                        <span className="font-bold text-[#042C89] flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#002B9A]" />
                          <span>{classDay}s · {classTime}</span>
                        </span>
                      </div>

                      <div>
                        <span className="text-[#64748B] block font-medium">Starter Pack</span>
                        <span className="font-bold text-[#042C89] flex items-center gap-1">
                          <Package className="w-3.5 h-3.5 text-[#00A3E0]" />
                          <span>Size {kitSize} · {bookLevel} Book</span>
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Explainer Video Section: How it works (Ready for client YouTube link) */}
          <div className="bg-gradient-to-br from-[#042C89] to-[#0A1E5C] text-white rounded-[24px] p-6 text-left relative overflow-hidden shadow-md">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-5 relative z-10">
              <div className="space-y-1.5 max-w-md">
                <span className="inline-block bg-[#FFE600] text-[#042C89] font-black text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  How It Works Video
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white leading-tight">
                  What to expect at your child’s first Samba session
                </h3>
                <p className="text-xs sm:text-sm text-white/80">
                  See how our FA-qualified coaches welcome your child, structure fun Brazilian football drills, and make sure they have a blast on day one!
                </p>
              </div>

              {/* Play video button */}
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(true)}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#00D084] hover:bg-[#00b875] text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer shrink-0"
                aria-label="Play explainer video"
              >
                <Play className="w-6 h-6 fill-current ml-0.5" />
              </button>
            </div>
          </div>

          {/* Action Links */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/find-a-class"
              className="text-[#002B9A] hover:underline font-bold text-xs sm:text-[13px]"
            >
              ← Back to Find a Class
            </Link>
          </div>
        </div>
      </Container>

      {/* Explainer Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fadeIn">
          <div className="absolute inset-0" onClick={() => setIsVideoModalOpen(false)} />
          <div className="relative bg-black rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl z-10 aspect-video">
            <button
              type="button"
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center cursor-pointer transition-colors"
              aria-label="Close video"
            >
              <X className="w-5 h-5" />
            </button>
            <iframe
              className="w-full h-full"
              src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="Samba Soccer Schools - How It Works"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Step6Success;
