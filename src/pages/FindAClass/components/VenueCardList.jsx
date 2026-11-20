import React, { useMemo } from 'react';
import {
  MapPin,
  Calendar,
  Clock,
  ChevronRight,
  ArrowRight,
  Compass
} from 'lucide-react';

const pillBtn =
  'bg-white/[0.14] hover:bg-white/20 text-white font-bold text-[13px] px-4 py-1.5 rounded-full min-h-[40px] flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap';

const IMG_BASE = 'https://webstepdev.com/demo/syncoWebsiteImages/find-a-class';
const map = `${IMG_BASE}/map_3.png`;
const pound = `${IMG_BASE}/pound.png`;
const calc = `${IMG_BASE}/calc.png`;
const park = `${IMG_BASE}/park.png`;
const dir_2 = `${IMG_BASE}/dir_2.png`;
const calc_2 = `${IMG_BASE}/cal.png`;
const clock = `${IMG_BASE}/clock.png`;
const user = `${IMG_BASE}/user_2.png`;
const Vector = `${IMG_BASE}/Vector.png`;

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

// "Saturday 7:15 AM - 8:15 AM" -> "Saturday 7:15 - 8:15 am"
const formatTimeRange = (range = '') => {
  if (typeof range !== 'string') return range || '-';
  const m = range.match(
    /^(.*?)(\d{1,2}(?::\d{2})?)\s*(AM|PM)\s*[-–—]\s*(\d{1,2}(?::\d{2})?)\s*(AM|PM)\s*$/i
  );
  if (!m) return range;

  const [, prefix, start, p1, end, p2] = m;
  const suffix = (t) => <span className="lowercase ml-0.5">{t}</span>;

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

const fmtDate = (iso) => {
  if (!iso) return '';
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
};

const todayISO = () => {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${mm}-${dd}`;
};

/** Per-day term text: "Term runs until 31 Oct 2026" / "Next term starts 9 Jan 2027" */
const getTermText = (terms = [], day = '') => {
  const today = todayISO();
  const dayTerms = terms
    .filter((t) => !t.day || !day || t.day.toLowerCase() === day.toLowerCase())
    .filter((t) => (t.endDate || t.end) && (t.endDate || t.end) >= today)
    .sort((a, b) => String(a.startDate || a.start).localeCompare(String(b.startDate || b.start)));

  const t = dayTerms[0];
  if (!t) return '';
  const start = t.startDate || t.start;
  const end = t.endDate || t.end;
  if (start && start > today) return `Next term starts ${fmtDate(start)}`;
  return `Term runs until ${fmtDate(end)}`;
};

/** Cheapest per-lesson price for 1 child across payment plans */
const getFromPrice = (venue) => {
  const plans = venue.paymentGroups?.[0]?.paymentPlans || [];
  const prices = plans
    .filter((p) => p.students === 1 && p.priceLesson != null)
    .map((p) => Number(p.priceLesson))
    .filter((n) => !Number.isNaN(n));
  if (!prices.length) return null;
  return Math.min(...prices).toFixed(2);
};

/** Group classes by day, keeping API order */
const groupByDay = (classes = [], fallbackDay = '-') => {
  const order = [];
  const groups = {};
  classes.forEach((c) => {
    const day = c.day || fallbackDay;
    if (!groups[day]) {
      groups[day] = [];
      order.push(day);
    }
    groups[day].push(c);
  });
  return order.map((day) => ({ day, classes: groups[day] }));
};

const isFullClass = (c) => c.statusType === 'full' || c.status?.toLowerCase?.().includes('full');
const isLimitedClass = (c) =>
  c.statusType === 'few_left' ||
  c.statusType === 'limited' ||
  c.status?.toLowerCase?.().includes('left');

/* ------------------------------------------------------------------ */
/* Small components                                                    */
/* ------------------------------------------------------------------ */

function DesktopStatusBadge({ c }) {
  if (isLimitedClass(c)) {
    return (
      <span className="bg-[#FFF4E0] text-[#9A5B00] text-[12px] min-h-[28px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 whitespace-nowrap">
        <span className="w-1.5 h-1.5 rounded-full bg-[#FCAB28]" />
        <span>{c.statusText || c.status || (c.spacesLeft != null ? `${c.spacesLeft} left` : '-')}</span>
      </span>
    );
  }
  if (isFullClass(c)) {
    return (
      <span className="bg-[#FDECEC] text-[#C2383D] text-[12px] min-h-[28px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 whitespace-nowrap">
        <span className="w-1.5 h-1.5 rounded-full bg-[#E5484D]" />
        <span>{c.statusText || c.status || 'Full'}</span>
      </span>
    );
  }
  return (
    <span className="bg-[#E7FAF2] text-[#067A4B] text-[12px] min-h-[28px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 whitespace-nowrap">
      <span className="w-1.5 h-1.5 rounded-full bg-[#0DD180]" />
      <span>
        {c.spacesLeft != null ? `${c.spacesLeft} spaces` : c.statusText || c.status || 'Spaces'}
      </span>
    </span>
  );
}

function DesktopClassRow({ c }) {
  return (
    <div className="bg-[#F6F8FC] rounded-[15px] px-5 py-5 flex flex-wrap sm:flex-nowrap items-center justify-between gap-2.5">
      <div className="flex items-center gap-2 text-[16px] font-bold text-[#042C89] sm:min-w-[230px]">
        <img src={clock} className="w-4" alt="" />
        <span>{formatTimeRange(c.time)}</span>
      </div>

      <div className="flex items-center gap-2 text-[14px] font-normal text-[#34353B] flex-1">
        <img src={user} className="w-3" alt="" />
        <span>{c.ageGroup || c.className || '-'}</span>
      </div>

      <div className="shrink-0">
        <DesktopStatusBadge c={c} />
      </div>
    </div>
  );
}

function InfoChips({ venue, fromPrice, className = '' }) {
  const chips = [];

  if (venue.facility && venue.facility !== '-') chips.push({ k: 'facility', text: venue.facility });
  if (fromPrice) chips.push({ k: 'price', text: `From £${fromPrice} / lesson` });
  if (venue.starterPack) {
    const sp = venue.starterPack;
    chips.push({
      k: 'starter',
      text: sp.hasOffer ? `Starter pack £${sp.now} (was £${sp.was})` : `Starter pack £${sp.price}`
    });
  }
  if (venue.hasParking === false) chips.push({ k: 'park', text: 'No parking on site' });
  else if (venue.hasParking && venue.isCongested) chips.push({ k: 'park', text: 'Parking · busy area' });
  else if (venue.hasParking) chips.push({ k: 'park', text: 'Parking available' });

  if (!chips.length) return null;

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {chips.map((chip) => (
        <span
          key={chip.k}
          className="bg-[#F0F5FA] text-[#042C89] text-[12px] font-bold px-3 py-1 rounded-full whitespace-nowrap"
        >
          {chip.text}
        </span>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main                                                                */
/* ------------------------------------------------------------------ */

export function VenueCardList({
  venue,
  selectedAges = [],
  onOpenPrices,
  onOpenTermDates,
  onOpenDirections,
  onOpenParking,
  onBookTrial,
  onJoinWaitingList,
  onBookMembership
}) {
  const schedule = venue.schedule || {};
  const allClasses = schedule.classes || [];

  // Age filter (selectedAges was never used before)
  const classes = useMemo(
    () =>
      selectedAges.length > 0
        ? allClasses.filter((c) => !c.ageId || selectedAges.includes(c.ageId))
        : allClasses,
    [allClasses, selectedAges]
  );

  const dayGroups = useMemo(() => groupByDay(classes, schedule.day || '-'), [classes, schedule.day]);
  const bookableClasses = classes.filter((c) => !isFullClass(c));
  const terms = venue.terms || [];
  const fromPrice = useMemo(() => getFromPrice(venue), [venue]);

  const venueTitle = venue.venueName || venue.name || '-';
  const distanceStr =
    venue.distanceDisplay && venue.distanceDisplay !== '-'
      ? venue.distanceDisplay
      : venue.distanceMiles != null
        ? `${Number(venue.distanceMiles).toFixed(1)} mi`
        : null;
  const addressStr = venue.address || '-';
  const areaStr = venue.area && venue.area !== '-' ? venue.area : '';

  const noMatch = classes.length === 0;

  return (
    <>
      {/* ============================================================== */}
      {/* DESKTOP & TABLET VIEW (md and up)                              */}
      {/* ============================================================== */}
      <div className="hidden md:block bg-white rounded-2xl sm:rounded-[30px] border border-[#042C89]/10 overflow-hidden mb-4 sm:mb-5 transition-all">
        {/* Navy Header */}
        <div className="bg-[#0B2A8A] p-4 md:px-8 md:pt-5 md:pb-4 text-white flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="poppins text-[18px] sm:text-[21px] font-bold text-white leading-tight">
                {venueTitle}
              </h3>
              {distanceStr && (
                <span className="bg-[#FFE600] text-[#042C89] font-bold text-[12px] px-2 h-[28px] flex items-center justify-center rounded-full leading-none py-1">
                  {distanceStr}
                </span>
              )}
              {areaStr && (
                <span className="bg-white/[0.14] text-white font-bold text-[12px] px-2.5 h-[28px] flex items-center justify-center rounded-full leading-none py-1">
                  {areaStr}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5 text-[#C9D3F0] text-[14px] mt-1">
              <img src={map} alt="" className="w-3" />
              <span>{addressStr}</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <button type="button" onClick={() => onOpenPrices(venue)} className={pillBtn}>
              <img src={pound} className="h-3" alt="" />
              <span>Prices</span>
            </button>

            <button type="button" onClick={() => onOpenTermDates(venue)} className={pillBtn}>
              <img src={calc} className="w-3" alt="" />
              <span>Term dates</span>
            </button>

            <button type="button" onClick={() => onOpenDirections(venue)} className={pillBtn}>
              <img src={dir_2} className="w-3" alt="" />
              <span>Directions</span>
            </button>

            <button type="button" onClick={() => onOpenParking(venue)} className={pillBtn}>
              <img src={park} className="w-3" alt="" />
              <span>Parking</span>
            </button>
          </div>
        </div>

        {/* White Body */}
        <div className="px-4 py-4 md:pb-8 sm:px-8 sm:py-5 bg-white">
          <InfoChips venue={venue} fromPrice={fromPrice} className="mb-3" />

          {noMatch && (
            <p className="text-[#797A88] text-[14px] py-4">
              No classes at this venue match the selected age groups.
            </p>
          )}

          {dayGroups.map(({ day, classes: dayClasses }) => {
            const dayBookable = dayClasses.filter((c) => !isFullClass(c));
            const dayFull = dayClasses.filter((c) => isFullClass(c));
            const trialClass = dayBookable.find((c) => c.allowFreeTrial === true);
            const termText = getTermText(terms, day);

            return (
              <div key={day} className="mb-4 last:mb-0">
                {/* Day heading */}
                <div className="flex items-center justify-between flex-wrap gap-2 mt-1 pb-1.5 text-[#0B2A8A]">
                  <div className="flex items-center gap-2">
                    <img src={calc_2} className="w-4" alt="" />
                    <h4 className="font-bold text-[13px] sm:text-[16px] text-[#042C89]">{day}</h4>
                  </div>
                  {termText && (
                    <span className="text-[12px] text-[#797A88] font-regular">{termText}</span>
                  )}
                </div>

                <div className="space-y-2">
                  {/* Bookable classes + buttons */}
                  {dayBookable.length > 0 && (
                    <div className="flex flex-col lg:flex-row justify-between gap-4 lg:gap-5 items-stretch">
                      <div className="w-full lg:w-[70%] space-y-2">
                        {dayBookable.map((c) => (
                          <DesktopClassRow key={c.id} c={c} />
                        ))}
                      </div>

                      <div className="w-full lg:w-[30%] flex flex-col justify-center">
                        <div className="space-y-2 w-full lg:w-[90%] ms-auto">
                          {trialClass && (
                            <button
                              type="button"
                              onClick={() => onBookTrial(venue, trialClass)}
                              className="w-full bg-[#0B2A8A] hover:bg-[#09226E] text-white font-bold text-[14px] sm:text-[16px] h-[52px] px-6 rounded-full flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
                            >
                              <span>Book a FREE trial</span>
                              <img src={Vector} className="w-3" alt="" />
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => onBookMembership(venue, dayBookable[0])}
                            className="w-full bg-white hover:bg-slate-50 text-[#0B2A8A] border border-[#0B2A8A] font-bold text-[14px] sm:text-[16px] h-[52px] px-6 rounded-full flex items-center justify-center transition-all cursor-pointer active:scale-95"
                          >
                            Book a membership
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Full classes with waiting list */}
                  {dayFull.length > 0 && (
                    <div className="space-y-2">
                      {dayFull.map((c) => (
                        <div
                          key={c.id}
                          className="flex flex-col lg:flex-row justify-between gap-2 lg:gap-5 items-stretch lg:items-center"
                        >
                          <div className="w-full lg:w-[70%]">
                            <DesktopClassRow c={c} />
                          </div>

                          <div className="w-full lg:w-[30%]">
                            <div className="w-full lg:w-[80%] m-auto">
                              <button
                                type="button"
                                onClick={() => onJoinWaitingList(venue, c)}
                                className="w-full bg-[#E6F4FB] hover:bg-[#D2E7F8] text-[#0B2A8A] font-bold text-[14px] sm:text-[16px] h-[52px] px-6 rounded-full flex items-center justify-center transition-all cursor-pointer active:scale-95"
                              >
                                Join the waiting list
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}

                      <div className="flex lg:justify-end">
                        <div className="w-full lg:w-[30%]">
                          <p className="w-full lg:w-[80%] m-auto text-[#797A88] text-[13px] font-regular text-left">
                            We'll text you when a place opens up.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ============================================================== */}
      {/* MOBILE VIEW (only on < md)                                     */}
      {/* ============================================================== */}
      <div className="block md:hidden bg-white rounded-[22px] border border-[#E2E8F0] shadow-xs overflow-hidden mb-4 transition-all">
        {/* Header */}
        <div className="bg-[#042C89] p-4 py-5 text-white flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h3 className="poppins text-[19px] font-bold text-white leading-tight truncate">
              {venueTitle}
            </h3>

            <div className="flex items-center gap-1.5 text-[#C9D3F0] text-[13px] mt-1 truncate">
              <MapPin className="w-3.5 h-3.5 mb-0.5 text-[#C9D3F0] shrink-0" />
              <span className="truncate">{addressStr}</span>
            </div>
          </div>

          {distanceStr && (
            <span className="bg-[#FFE600] text-[#042C89] font-extrabold text-[12px] px-2.5 py-1 rounded-full whitespace-nowrap shrink-0 shadow-xs">
              {distanceStr}
            </span>
          )}
        </div>

        {/* Body */}
        <div className="p-4 pt-3.5 bg-white">
          <InfoChips venue={venue} fromPrice={fromPrice} className="mb-3" />

          {noMatch && (
            <p className="text-[#797A88] text-[13px] py-3">
              No classes at this venue match the selected age groups.
            </p>
          )}

          {dayGroups.map(({ day, classes: dayClasses }) => {
            const termText = getTermText(terms, day);

            return (
              <div key={day} className="mb-3 last:mb-0">
                {/* Day */}
                <div className="flex items-center justify-between gap-2 mb-2.5 text-[#042C89]">
                  <div className="flex items-center gap-2">
                    <img src={calc_2} className="w-3" alt="" />
                    <h4 className="font-bold text-[14px] text-[#042C89]">{day}</h4>
                  </div>
                  {termText && (
                    <span className="text-[11px] text-[#797A88] text-right">{termText}</span>
                  )}
                </div>

                <div className="space-y-2.5">
                  {dayClasses.map((c) => {
                    const isFull = isFullClass(c);
                    const isLimited = !isFull && (isLimitedClass(c) || (c.spacesLeft != null && Number(c.spacesLeft) <= 5 && Number(c.spacesLeft) > 0));
                    const statusText = isFull
                      ? 'full'
                      : isLimited
                        ? (c.spacesLeft != null ? `${c.spacesLeft} left` : c.status || 'limited')
                        : c.spacesLeft != null
                          ? `${c.spacesLeft} spaces`
                          : 'spaces';

                    return (
                      <div key={c.id} className="space-y-1.5">
                        <div className="bg-[#F8FAFC] border border-[#EDF2F7] rounded-[16px] p-3 flex items-center justify-between gap-3">
                          <div className="space-y-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <img src={clock} className="w-3" alt="" />
                              <span className="font-bold text-[14px] md:text-[15px] text-[#042C89] leading-tight truncate">
                                {formatTimeRange(c.time)}
                              </span>
                            </div>

                            <div className="flex items-center gap-2 text-[12px] md:text-[13px] text-[#64748B]">
                              <img src={user} className="w-3" alt="" />
                              <span className="truncate">
                                {c.ageSimple || c.className || c.ageGroup || '-'} · {c.level || '-'}
                              </span>
                            </div>
                          </div>

                          <div className="shrink-0">
                            {isFull ? (
                              <span className="bg-[#FFE4E6] text-[#E11D48] text-[12px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 whitespace-nowrap">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#E11D48]" />
                                <span>{statusText}</span>
                              </span>
                            ) : isLimited ? (
                              <span className="bg-[#FEF6EE] text-[#F79009] text-[12px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 whitespace-nowrap">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#F79009]" />
                                <span>{statusText}</span>
                              </span>
                            ) : (
                              <span className="bg-[#DCFCE7] text-[#16A34A] text-[12px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 whitespace-nowrap">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
                                <span>{statusText}</span>
                              </span>
                            )}
                          </div>
                        </div>

                        {isFull && bookableClasses.length > 0 && (
                          <button
                            type="button"
                            onClick={() => onJoinWaitingList(venue, c)}
                            className="w-full bg-[#FFF9F3] border border-[#FFE8D6] rounded-[14px] p-3 flex items-center justify-between gap-2 text-left cursor-pointer hover:bg-[#FFF2E6] active:scale-[0.99] transition-all"
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <Clock className="w-4 h-4 text-[#B45309] shrink-0" />
                              <span className="font-bold text-[13px] text-[#042C89] truncate">
                                Join the waiting list for this class
                              </span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-[#042C89] stroke-[2.5] shrink-0" />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* 4 Action Buttons */}
          <div className="grid grid-cols-4 gap-2 my-3.5">
            <button
              type="button"
              onClick={() => onOpenPrices(venue)}
              className="bg-[#F0F5FA] hover:bg-[#E2EDF8] rounded-[16px] py-2.5 px-1 flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95 text-center"
            >
              <span className="font-extrabold text-[15px] text-[#042C89] leading-none">£</span>
              <span className="text-[10px] font-bold text-[#042C89] whitespace-nowrap">Prices</span>
            </button>

            <button
              type="button"
              onClick={() => onOpenTermDates(venue)}
              className="bg-[#F0F5FA] hover:bg-[#E2EDF8] rounded-[16px] py-2.5 px-1 flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95 text-center"
            >
              <Calendar className="w-4 h-4 text-[#042C89] stroke-[2.5]" />
              <span className="text-[10px] font-bold text-[#042C89] whitespace-nowrap">Term dates</span>
            </button>

            <button
              type="button"
              onClick={() => onOpenDirections(venue)}
              className="bg-[#F0F5FA] hover:bg-[#E2EDF8] rounded-[16px] py-2.5 px-1 flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95 text-center"
            >
              <Compass className="w-4 h-4 text-[#042C89] stroke-[2.5]" />
              <span className="text-[10px] font-bold text-[#042C89] whitespace-nowrap">Directions</span>
            </button>

            <button
              type="button"
              onClick={() => onOpenParking(venue)}
              className="bg-[#F0F5FA] hover:bg-[#E2EDF8] rounded-[16px] py-2.5 px-1 flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95 text-center"
            >
              <span className="w-4 h-4 rounded border-2 border-[#042C89] flex items-center justify-center text-[10px] font-black text-[#042C89] leading-none">
                P
              </span>
              <span className="text-[10px] font-bold text-[#042C89] whitespace-nowrap">Parking</span>
            </button>
          </div>

          {/* CTA Section */}
          {noMatch ? null : bookableClasses.length === 0 ? (
            <button
              type="button"
              onClick={() => onJoinWaitingList(venue, classes[0])}
              className="w-full h-[50px] bg-[#E6F4FB] hover:bg-[#D4E8F8] text-[#042C89] font-bold text-[15px] rounded-full flex items-center justify-center cursor-pointer active:scale-98 transition-all"
            >
              Join the waiting list
            </button>
          ) : (
            <div className="space-y-2">
              {bookableClasses.some((c) => c.allowFreeTrial === true) && (
                <button
                  type="button"
                  onClick={() =>
                    onBookTrial(venue, bookableClasses.find((c) => c.allowFreeTrial === true))
                  }
                  className="w-full h-[50px] bg-[#042C89] hover:bg-[#03236E] text-white font-bold text-[15px] rounded-full flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-98 transition-all"
                >
                  <span>Book a FREE trial</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              )}

              <button
                type="button"
                onClick={() => onBookMembership(venue, bookableClasses[0])}
                className="w-full h-[50px] bg-white hover:bg-slate-50 text-[#042C89] border-2 border-[#042C89] font-bold text-[15px] rounded-full flex items-center justify-center cursor-pointer active:scale-98 transition-all"
              >
                Book a membership
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default VenueCardList;
