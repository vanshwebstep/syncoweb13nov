import React, { useState, useEffect, useMemo } from 'react';
import { Check, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import { fetchClassById } from '../../../services/venueService';

const YELLOW_SPLASH = 'https://webstepdev.com/demo/syncoWebsiteImages/find-a-class/yellow.png';

const STATUS_COLOR = {
  few_left: 'text-[#9A5B00]',
  available: 'text-[#067A4B]',
  full: 'text-rose-600'
};

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const FULL_MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/**
 * Extract dynamic session dates from class API data (termGroups -> terms -> sessionsMap)
 */
export function extractDynamicDates(cls, venue) {
  const allDates = [];

  const termGroups = cls?.venue?.termGroups || venue?.termGroups || [];
  const directTerms = cls?.terms || venue?.terms || [];

  const termsList = [];
  if (Array.isArray(termGroups)) {
    termGroups.forEach((tg) => {
      if (Array.isArray(tg.terms)) {
        termsList.push(...tg.terms);
      }
    });
  }
  if (Array.isArray(directTerms)) {
    termsList.push(...directTerms);
  }

  // Parse termIds if provided on class
  let parsedTermIds = null;
  if (cls?.termIds) {
    try {
      const parsed = typeof cls.termIds === 'string' ? JSON.parse(cls.termIds) : cls.termIds;
      if (Array.isArray(parsed) && parsed.length > 0) {
        parsedTermIds = parsed.map(Number);
      }
    } catch {
      parsedTermIds = null;
    }
  }

  // Filter terms by termIds if specified, or by matching day if specified
  let filteredTerms = termsList;
  if (parsedTermIds && parsedTermIds.length > 0) {
    const matched = termsList.filter((t) => parsedTermIds.includes(Number(t.id)));
    if (matched.length > 0) {
      filteredTerms = matched;
    }
  } else if (cls?.day) {
    const clsDay = cls.day.toLowerCase();
    const matched = termsList.filter((t) => t.day && t.day.toLowerCase() === clsDay);
    if (matched.length > 0) {
      filteredTerms = matched;
    }
  }

  // Format time text from class start time
  const timeText = cls?.startTime
    ? `From ${cls.startTime.toLowerCase().replace(/\s+/g, '')}`
    : venue?.schedule?.classes?.[0]?.time
    ? `From ${venue.schedule.classes[0].time.split('-')[0].trim().toLowerCase()}`
    : 'From 7:15am';

  // Capacity calculation
  const cap = Number(cls?.capacity) || 0;
  const total = Number(cls?.totalCapacity) || 20;
  const spotsLeft = Math.max(0, total - cap);

  let statusType = 'available';
  let statusText = 'Spaces available';
  if (spotsLeft === 0) {
    statusType = 'full';
    statusText = 'Fully booked';
  } else if (spotsLeft <= 5) {
    statusType = 'few_left';
    statusText = `Only ${spotsLeft} place${spotsLeft === 1 ? '' : 's'} left`;
  }

  // Extract from sessionsMap
  filteredTerms.forEach((term) => {
    const exclusions = Array.isArray(term.exclusionDates) ? term.exclusionDates : [];
    const sessions = Array.isArray(term.sessionsMap) ? term.sessionsMap : [];

    sessions.forEach((s) => {
      const dStr = s.sessionDate || s.date || (typeof s === 'string' ? s : null);
      if (dStr && !exclusions.includes(dStr) && !allDates.some((x) => x.isoDate === dStr)) {
        try {
          const dateObj = new Date(dStr + 'T12:00:00Z');
          if (!isNaN(dateObj.getTime())) {
            const dayNum = String(dateObj.getUTCDate());
            const monthShort = MONTHS[dateObj.getUTCMonth()];
            const fullDate = `${DAYS[dateObj.getUTCDay()]} ${dayNum} ${FULL_MONTHS[dateObj.getUTCMonth()]}`;

            allDates.push({
              id: `date-${dStr}`,
              isoDate: dStr,
              dayNum,
              monthShort,
              fullDate,
              timeText,
              statusType,
              statusText,
              rawSession: s
            });
          }
        } catch (err) {
          console.warn('Error parsing session date:', dStr, err);
        }
      }
    });

    // Fallback: If sessionsMap is empty, generate dates between startDate and endDate
    if (sessions.length === 0 && term.startDate && term.endDate) {
      const targetDayName = (term.day || cls?.day || 'saturday').toLowerCase();
      const targetDayIdx = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].indexOf(targetDayName);
      if (targetDayIdx !== -1) {
        let cur = new Date(term.startDate + 'T12:00:00Z');
        const end = new Date(term.endDate + 'T12:00:00Z');
        while (cur <= end) {
          if (cur.getUTCDay() === targetDayIdx) {
            const dStr = cur.toISOString().split('T')[0];
            if (!exclusions.includes(dStr) && !allDates.some((x) => x.isoDate === dStr)) {
              const dayNum = String(cur.getUTCDate());
              const monthShort = MONTHS[cur.getUTCMonth()];
              const fullDate = `${DAYS[cur.getUTCDay()]} ${dayNum} ${FULL_MONTHS[cur.getUTCMonth()]}`;
              allDates.push({
                id: `date-${dStr}`,
                isoDate: dStr,
                dayNum,
                monthShort,
                fullDate,
                timeText,
                statusType,
                statusText,
                rawSession: null
              });
            }
          }
          cur.setUTCDate(cur.getUTCDate() + 1);
        }
      }
    }
  });

  // Graceful fallback: If no dates found at all, generate next 4 upcoming occurrences of target day
  if (allDates.length === 0) {
    const targetDayName = (cls?.day || venue?.schedule?.day || 'saturday').toLowerCase();
    const targetDayIdx = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].indexOf(targetDayName);
    const dayIdx = targetDayIdx !== -1 ? targetDayIdx : 6;

    let cur = new Date();
    while (cur.getDay() !== dayIdx) {
      cur.setDate(cur.getDate() + 1);
    }
    for (let i = 0; i < 4; i++) {
      const dStr = cur.toISOString().split('T')[0];
      const dayNum = String(cur.getDate());
      const monthShort = MONTHS[cur.getMonth()];
      const fullDate = `${DAYS[cur.getDay()]} ${dayNum} ${FULL_MONTHS[cur.getMonth()]}`;
      allDates.push({
        id: `date-${dStr}`,
        isoDate: dStr,
        dayNum,
        monthShort,
        fullDate,
        timeText,
        statusType,
        statusText,
        rawSession: null
      });
      cur.setDate(cur.getDate() + 7);
    }
  }

  // Sort ascending by date
  allDates.sort((a, b) => a.isoDate.localeCompare(b.isoDate));

  // Filter future session dates from today
  const todayStr = new Date().toISOString().split('T')[0];
  const upcoming = allDates.filter((x) => x.isoDate >= todayStr);

  return upcoming.length > 0 ? upcoming : allDates;
}

export function Step2SelectDate({
  venue,
  classData,
  classId,
  selectedDate,
  setSelectedDate,
  onContinue,
  onBack
}) {
  const [internalClass, setInternalClass] = useState(classData || null);
  const [isLoading, setIsLoading] = useState(false);
  const [showAllDates, setShowAllDates] = useState(false);

  // Sync internal class if parent prop updates
  useEffect(() => {
    if (classData) {
      setInternalClass(classData);
    }
  }, [classData]);

  // Fetch class by ID if not passed from parent
  useEffect(() => {
    if (internalClass) return;

    const targetClassId =
      classId ||
      venue?.schedule?.classes?.[0]?.classId ||
      venue?.classes?.[Object.keys(venue?.classes || {})[0]]?.[0]?.classId ||
      12;

    if (targetClassId) {
      setIsLoading(true);
      fetchClassById(targetClassId)
        .then((cls) => {
          if (cls) setInternalClass(cls);
        })
        .catch((err) => console.warn('Could not load class for date picker:', err))
        .finally(() => setIsLoading(false));
    }
  }, [internalClass, classId, venue]);

  // Extract dynamic dates from the loaded class
  const availableDates = useMemo(() => {
    const dates = extractDynamicDates(internalClass, venue);
    return dates;
  }, [internalClass, venue]);

  // Pre-select first available date if nothing is selected or previous selection is invalid
  useEffect(() => {
    if (availableDates.length > 0) {
      if (!selectedDate || !availableDates.some((d) => d.id === selectedDate?.id || d.isoDate === selectedDate?.isoDate)) {
        setSelectedDate(availableDates[0]);
      }
    }
  }, [availableDates, selectedDate, setSelectedDate]);

  const displayedDates = showAllDates ? availableDates : availableDates.slice(0, 3);
  const canContinue = Boolean(selectedDate);

  return (
    <div className="space-y-4  animate-badge-fade-in pt-4 md:pt-0">
      {/* Step Heading */}
      <div className='pb-2 md:pb-4'>
        <h1 className="text-[28px] sm:text-[32px] lg:text-[38px] font-bold recline text-[#042C89] leading-[1]">
          Pick their <br />
          <span className="relative text-[42px] sm:text-[46px] gasoek font-normal inline-block text-[#00A6E3] mt-1">
            first session.
            <img
              src={YELLOW_SPLASH}
              alt=""
              className="absolute -bottom-1.5 left-0 w-full h-2.5 sm:h-3 object-fill pointer-events-none"
            />
          </span>
        </h1>

        <p className="text-[#797A88] font-bold text-[14px] sm:text-[16px] mt-2.5 sm:mt-5">
          Select the date for your FREE trial at {venue?.name || internalClass?.venue?.name || 'Chelsea Academy'}
        </p>
      </div>

      {/* Loading indicator */}
      {isLoading && availableDates.length === 0 ? (
        <div className="py-12 flex flex-col items-center justify-center gap-3 text-slate-500">
          <Loader2 className="w-8 h-8 animate-spin text-[#002B9A]" />
          <p className="text-sm font-semibold text-[#042C89]">Loading available session dates...</p>
        </div>
      ) : (
        /* Date Options */
        <div className="space-y-3" role="radiogroup" aria-label="Choose a session date">
          {displayedDates.map((item) => {
            const isSelected = selectedDate?.id === item.id || selectedDate?.isoDate === item.isoDate;

            return (
              <div
                key={item.id}
                role="radio"
                aria-checked={isSelected}
                tabIndex={0}
                onClick={() => setSelectedDate(item)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedDate(item);
                  }
                }}
                className={`rounded-[22px] p-3.5 sm:p-4 sm:py-3  sm:pe-6 flex items-center justify-between gap-3 sm:gap-4 transition-all cursor-pointer ${
                  isSelected
                    ? 'border-2 border-[#002B9A] bg-[#E6F4FB] shadow-xs'
                    : 'border border-[#C9D3F0] bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                  {/* Date Square */}
                  <div
                    className={`w-[54px] h-[54px] sm:w-[60px] sm:h-[60px] rounded-[16px] flex flex-col items-center justify-center leading-none shrink-0 ${
                      isSelected
                        ? 'bg-[#042C89] text-white'
                        : 'bg-[#F1F5F9] text-[#042C89]'
                    }`}
                  >
                    <span className="text-[20px] sm:text-[21px] font-bold">{item.dayNum}</span>
                    <span
                      className={`text-[10px] uppercase font-black mt-0.5  ${
                        isSelected ? 'text-[#FFDE14]' : 'text-[#797A88]'
                      }`}
                    >
                      {item.monthShort}
                    </span>
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-bold text-[#042C89] text-[15px] sm:text-[17px] leading-tight truncate">
                      {item.fullDate}
                    </h3>
                    <p className="text-[#797A88] text-[13px] sm:text-[14px] font-normal mt-0.5">{item.timeText}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {/* Status text on desktop only */}
                  <span
                    className={`hidden sm:inline-block text-xs font-bold ${
                      STATUS_COLOR[item.statusType] || 'text-[#067A4B]'
                    }`}
                  >
                    {item.statusText}
                  </span>

                  {/* Radio / Checkmark Circle */}
                  <div
                    className={`md:w-6 md:h-6 w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-[#002B9A] text-white shadow-xs'
                        : 'border-2 border-[#CBD5E1]'
                    }`}
                  >
                    {isSelected && <Check className="md:w-3.5 md:h-3.5 w-3 h-3 stroke-[3.5]" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* See more dates toggle */}
      {availableDates.length > 3 && (
        <div className="text-center pb-4 pt-1.5">
          <button
            type="button"
            onClick={() => setShowAllDates((prev) => !prev)}
            className="text-[#00A6E3] hover:underline font-bold text-[14px] sm:text-[15px] transition-colors cursor-pointer"
          >
            {showAllDates ? 'See fewer dates' : 'See more dates'}
          </button>
        </div>
      )}

      {/* Desktop / Tablet Navigation Row */}
      <div className="hidden sm:flex items-center justify-between pt-6 sm:pt-8 border-t border-[#E4E9F4]">
        <button
          type="button"
          onClick={onBack}
          className="text-[#042C89] hover:text-[#002B9A] font-bold text-[14px] flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
          <span>Back</span>
        </button>

        <button
          type="button"
          disabled={!canContinue}
          onClick={onContinue}
          className="bg-[#002B9A] min-w-[260px] hover:bg-[#00227A] disabled:opacity-40 text-white font-bold text-[15px] justify-center py-3.5 px-10 rounded-full flex items-center gap-2 shadow-sm transition-all cursor-pointer active:scale-95"
        >
          <span>Continue</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>

      {/* Mobile Sticky / Full-width Button */}
      <div className="block sm:hidden md:pt-2">
        <button
          type="button"
          disabled={!canContinue}
          onClick={onContinue}
          className="w-full h-[54px] rounded-full bg-[#002B9A] hover:bg-[#00227A] disabled:opacity-40 text-white font-bold text-[16px] flex items-center justify-center gap-2 shadow-sm active:scale-98 cursor-pointer"
        >
          <span>Continue</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
}

export default Step2SelectDate;
