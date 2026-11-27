import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, ArrowRight, MapPin, Compass } from 'lucide-react';

// "Saturday 7:15 AM - 8:15 AM" -> "Saturday 7:15 - 8:15 am" (am/pm lowercase)
const formatTimeRange = (range = '') => {
  if (typeof range !== 'string') return range || '-';
  const m = range.match(
    /^(.*?)(\d{1,2}(?::\d{2})?)\s*(AM|PM)\s*[-–—]\s*(\d{1,2}(?::\d{2})?)\s*(AM|PM)\s*$/i
  );
  if (!m) return range;

  const [, prefix, start, p1, end, p2] = m;
  const suffix = (t) => <span className="ml-0.5 lowercase">{t}</span>;

  if (p1.toUpperCase() === p2.toUpperCase()) {
    return (
      <>
        {prefix}
        {start} - {end}
        {suffix(p2)}
      </>
    );
  }

  return (
    <>
      {prefix}
      {start}
      {suffix(p1)} - {end}
      {suffix(p2)}
    </>
  );
};

export function VenueCardCompact({
  venue,
  isSelected,
  onSelect,
  onBookTrial,
  onBookMembership,
  onJoinWaitingList,
  onOpenDetails
}) {
  const navigate = useNavigate();
  const schedule = venue.schedule || {};
  const classes = schedule.classes || [];
  const isFullyBooked =
    classes.length > 0 &&
    classes.every(
      (c) =>
        c.statusType === 'full' ||
        c.status?.toLowerCase?.().includes('full') ||
        (c.spacesLeft != null && Number(c.spacesLeft) === 0)
    );
  const vId = venue.venueId || venue.id;

  const trialClass = classes.find(
    (c) =>
      c.allowFreeTrial === true &&
      c.statusType !== 'full' &&
      !c.status?.toLowerCase?.().includes('full') &&
      (c.spacesLeft == null || Number(c.spacesLeft) > 0)
  );
  const hasFreeTrial = Boolean(trialClass);

  const venueTitle = venue.venueName || venue.name || '-';
  const areaTitle = venue.area !== '-' ? venue.area : venueTitle;
  const distanceStr = venue.mapDistanceDisplay || venue.distanceDisplay || (venue.distanceMiles != null ? `${venue.distanceMiles} mi` : '-');
  const addressStr = venue.address || '-';

  return (
    <>
      {/* ============================================================== */}
      {/* DESKTOP VIEW (sm: and up)                                      */}
      {/* ============================================================== */}
      <div
        onClick={() => onSelect(venue)}
        className={`hidden sm:block rounded-[16px] p-4 sm:p-5 transition-all cursor-pointer bg-white ${
          isSelected
            ? 'border-2 border-[#042C89]'
            : 'border border-slate-200 hover:border-slate-300 shadow-xs'
        }`}
      >
        {/* Top Header: Venue Name & Distance Badge */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <h3
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/venues?id=${vId}`);
              }}
              className="poppins text-[16px] sm:text-[18px] font-bold text-[#042C89] tracking-tight hover:underline hover:text-[#0DD180] transition-colors"
              title="Click to view venue page"
            >
              {areaTitle}
            </h3>
            <span
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/venues?id=${vId}`);
              }}
              className="text-[#00A6E3] hover:text-[#042C89] text-[11px] font-bold flex items-center gap-0.5"
            >
              (view &rarr;)
            </span>
          </div>
          <span className="bg-[#E6F4FB] text-[#042C89] font-bold text-[12px] px-2.5 py-0.5 rounded-full shrink-0">
            {distanceStr}
          </span>
        </div>

        {/* Class Schedule Rows */}
        <div className="space-y-1.5 mb-3">
          {classes.map((c) => (
            <div
              key={c.id}
              className="bg-[#F6F8FC] rounded-xl p-4 flex items-center justify-between text-xs font-bold text-[#042C89]"
            >
              <div className="flex items-center gap-1.5 text-[14px] font-bold text-[#042C89]">
                <Clock className="w-3.5 h-3.5 text-[#00A3E0] shrink-0" />
                <span>{formatTimeRange(c.timeShort || c.time)}</span>
              </div>
              <span className="text-[#34353B] text-[13px] font-regular">
                {c.ageSimple || c.className || c.ageGroup || '-'}
              </span>
            </div>
          ))}
        </div>

        {/* Action Button: Show Free Trial ONLY if allowFreeTrial is true */}
        {isFullyBooked ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onJoinWaitingList(venue, classes[0]);
            }}
            className="w-full bg-[#E8F3FC] hover:bg-[#D4E8F8] text-[#042C89] font-bold text-[15px] py-3 px-4 rounded-full flex items-center justify-center transition-all active:scale-95 cursor-pointer"
          >
            Join the waiting list
          </button>
        ) : hasFreeTrial ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onBookTrial(venue, trialClass || classes[0]);
            }}
            className="w-full bg-[#042C89] hover:bg-[#0b3b8e] text-white font-bold text-[15px] py-3 px-4 rounded-full flex items-center justify-center gap-2 shadow-xs transition-all active:scale-95 cursor-pointer"
          >
            <span>Book a FREE trial</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (onBookMembership) onBookMembership(venue, trialClass || classes[0]);
              else if (onOpenDetails) onOpenDetails(venue);
              else onSelect(venue);
            }}
            className="w-full bg-[#042C89] hover:bg-[#0b3b8e] text-white font-bold text-[15px] py-3 px-4 rounded-full flex items-center justify-center gap-2 shadow-xs transition-all active:scale-95 cursor-pointer"
          >
            <span>Book a membership</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* ============================================================== */}
      {/* MOBILE VIEW (only on < sm)                                     */}
      {/* ============================================================== */}
      <div
        onClick={() => onSelect(venue)}
        className="block sm:hidden rounded-[24px] p-4 transition-all cursor-pointer bg-white border border-slate-200 shadow-md"
      >
        {/* Mobile drag handle */}
        <div className="w-12 h-1 bg-[#E2E8F0] rounded-full mx-auto mb-3" />

        {/* Top Header: Venue Name & Distance Badge */}
        <div className="flex items-center justify-between gap-2 mb-1">
          <h3
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/venues?id=${vId}`);
            }}
            className="poppins text-[18px] font-bold text-[#042C89] tracking-tight hover:underline hover:text-[#0DD180] transition-colors"
          >
            {venueTitle}
          </h3>
          <span className="bg-[#E6F4FB] text-[#042C89] font-bold text-[13px] px-3 py-1 rounded-full shrink-0">
            {distanceStr}
          </span>
        </div>

        {/* Address */}
        <div className="flex items-center gap-1.5 text-[13px] text-[#797A88] mb-3">
          <MapPin className="w-3.5 h-3.5 text-[#797A88] shrink-0" />
          <span className="truncate">{addressStr}</span>
        </div>

        {/* Class Schedule Rows */}
        <div className="space-y-2 mb-3.5">
          {classes.map((c) => (
            <div
              key={c.id}
              className="bg-[#F6F8FC] rounded-2xl py-3 md:px-4 px-2.5 flex items-center justify-between text-xs font-bold text-[#042C89]"
            >
              <div className="flex items-center gap-2 text-[12px] md:text-[14px] font-bold text-[#042C89]">
                <Clock className="w-4 h-4 text-[#00A3E0] shrink-0" />
                <span>{formatTimeRange(c.timeShort || c.time)}</span>
              </div>
              <span className="text-[#34353B] text-[11px] md:text-[13px] font-medium md:font-semibold">
                {c.ageGroup || c.ageSimple || c.className || '-'}
              </span>
            </div>
          ))}
        </div>

        {/* Action Buttons Row */}
        <div className="flex items-center gap-2.5">
          {isFullyBooked ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onJoinWaitingList(venue, classes[0]);
              }}
              className="flex-1 bg-[#E6F4FB] hover:bg-[#D4E8F8] text-[#042C89] font-bold text-[13px] h-[45px] md:h-[52px] rounded-full flex items-center justify-center transition-all active:scale-95 cursor-pointer"
            >
              Join the waiting list
            </button>
          ) : hasFreeTrial ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onBookTrial(venue, trialClass || classes[0]);
              }}
              className="flex-1 bg-[#042C89] hover:bg-[#03236e] text-white font-bold text-[13px] h-[45px] md:h-[52px] rounded-full flex items-center justify-center gap-2 shadow-xs transition-all active:scale-95 cursor-pointer"
            >
              <span>Book a FREE trial</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (onBookMembership) onBookMembership(venue, trialClass || classes[0]);
                else if (onOpenDetails) onOpenDetails(venue);
                else onSelect(venue);
              }}
              className="flex-1 bg-[#042C89] hover:bg-[#03236e] text-white font-bold text-[13px] h-[45px] md:h-[52px] rounded-full flex items-center justify-center gap-2 shadow-xs transition-all active:scale-95 cursor-pointer"
            >
              <span>Book a membership</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (onOpenDetails) {
                onOpenDetails(venue);
              } else {
                onSelect(venue);
              }
            }}
            className="bg-white border-2 border-[#042C89] hover:bg-slate-50 text-[#042C89] font-bold text-[13px] h-[45px] md:h-[52px] px-6 rounded-full flex items-center justify-center transition-all active:scale-95 cursor-pointer shrink-0"
          >
            Details
          </button>
        </div>
      </div>
    </>
  );
}

export default VenueCardCompact;
