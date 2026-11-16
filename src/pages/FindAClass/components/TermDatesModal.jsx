import React, { useMemo, useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import { ModalShell } from './ModalShell';

const DAY_INDEX = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6
};
const DAY_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];
const MON_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const WEEK_HEAD = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

const toDate = (s) => {
  if (!s) return null;
  if (s instanceof Date) return s;
  if (typeof s !== 'string') return null;
  const parts = s.split('T')[0].split('-').map(Number);
  if (parts.length < 3 || isNaN(parts[0])) return null;
  return new Date(parts[0], parts[1] - 1, parts[2]);
};

const same = (a, b) =>
  a &&
  b &&
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const fmt = (d) => {
  if (!d) return '-';
  return `${DAY_SHORT[d.getDay()]} ${d.getDate()} ${MON_SHORT[d.getMonth()]}`;
};

function buildTerm(term, dow) {
  if (!term) return null;
  const start = toDate(term.startDate || term.start);
  const end = toDate(term.endDate || term.end);
  if (!start || !end) return null;

  let sessions = [];
  if (Array.isArray(term.sessionsMap) && term.sessionsMap.length > 0) {
    sessions = term.sessionsMap
      .map((s) => toDate(s.sessionDate))
      .filter(Boolean)
      .sort((a, b) => a - b);
  } else {
    const d = new Date(start);
    while (d.getDay() !== dow) d.setDate(d.getDate() + 1);
    while (d <= end) {
      sessions.push(new Date(d));
      d.setDate(d.getDate() + 7);
    }
  }

  const half = (term.exclusionDates || [])
    .map(toDate)
    .filter(Boolean);

  const totalSessions =
    term.totalSessions != null
      ? term.totalSessions
      : sessions.length;

  return { start, end, sessions, half, totalSessions };
}

function TermCalendar({ built, dow, today }) {
  const next = built.sessions.find((s) => s >= today);
  const initial = today >= built.start && today <= built.end ? today : built.start;
  const [cursor, setCursor] = useState(new Date(initial.getFullYear(), initial.getMonth(), 1));

  const first = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
  const offset = (first.getDay() + 6) % 7;
  const daysInMonth = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < offset; i += 1) cells.push(null);
  for (let d = 1; d <= daysInMonth; d += 1) cells.push(new Date(cursor.getFullYear(), cursor.getMonth(), d));

  const minM = built.start.getFullYear() * 12 + built.start.getMonth();
  const maxM = built.end.getFullYear() * 12 + built.end.getMonth();
  const curM = cursor.getFullYear() * 12 + cursor.getMonth();
  const dowCol = (dow + 6) % 7;

  return (
    <div>
      <div className="border-t border-[#E2E8F0] my-4" />

      {/* Month Navigator */}
      <div className="flex items-center justify-between mb-4 px-1">
        <button
          type="button"
          disabled={curM <= minM}
          onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}
          className="w-8 h-8 rounded-full bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#061838] flex items-center justify-center disabled:opacity-30 cursor-pointer transition-colors"
        >
          <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
        </button>
        <span className="text-[15px] font-bold text-[#042C89]">
          {MONTHS[cursor.getMonth()]} {cursor.getFullYear()}
        </span>
        <button
          type="button"
          disabled={curM >= maxM}
          onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}
          className="w-8 h-8 rounded-full bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#042C89] flex items-center justify-center disabled:opacity-30 cursor-pointer transition-colors"
        >
          <ChevronRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>

      {/* Day Headers */}
      <div className="grid grid-cols-7 text-center mb-2">
        {WEEK_HEAD.map((h, i) => (
          <span
            key={i}
            className={`text-[11px] ${
              i === dowCol ? 'text-[#042C89] font-bold' : 'text-[#797A88] font-bold'
            }`}
          >
            {h}
          </span>
        ))}
      </div>

      {/* Day Cells */}
      <div className="grid grid-cols-7 gap-y-2 text-center">
        {cells.map((date, i) => {
          if (!date) return <span key={i} className="w-9 h-9 mx-auto" />;

          const isSession = built.sessions.some((s) => same(s, date));
          const isHalf = built.half.some((s) => same(s, date));
          const isNext = next && same(next, date);
          const isToday = same(date, today);
          const inTerm = date >= built.start && date <= built.end;

          let cellNode;

          if (isNext) {
            cellNode = (
              <span className="w-9 h-9 mx-auto rounded-full bg-[#00D084] text-[#042C89] font-bold flex items-center justify-center text-[13px] shadow-sm">
                {date.getDate()}
              </span>
            );
          } else if (isSession && date < today) {
            cellNode = (
              <span className="w-9 h-9 mx-auto rounded-full bg-[#EEF3FB] text-[#64748B] font-bold flex items-center justify-center text-[13px]">
                {date.getDate()}
              </span>
            );
          } else if (isSession) {
            cellNode = (
              <span className="w-9 h-9 mx-auto rounded-full bg-[#042C89] text-white font-bold flex items-center justify-center text-[13px]">
                {date.getDate()}
              </span>
            );
          } else if (isHalf) {
            cellNode = (
              <span className="relative w-9 h-9 mx-auto rounded-full border border-[#D0DBEA] text-[#797A88] font-bold flex items-center justify-center text-[13px] overflow-hidden">
                <svg className="absolute inset-0 w-full h-full text-[#94A3B8]" viewBox="0 0 36 36">
                  <line x1="6" y1="30" x2="30" y2="6" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                <span className="relative z-10">{date.getDate()}</span>
              </span>
            );
          } else if (isToday) {
            cellNode = (
              <span className="w-9 h-9 mx-auto rounded-full border-2 border-[#00A3E0] text-[#00A3E0] font-bold flex items-center justify-center text-[13px]">
                {date.getDate()}
              </span>
            );
          } else {
            cellNode = (
              <span
                className={`w-9 h-9 mx-auto rounded-full flex items-center justify-center text-[13px] ${
                  inTerm ? 'text-[#282829] font-normal' : 'text-[#9AA3B8] font-normal'
                }`}
              >
                {date.getDate()}
              </span>
            );
          }

          return <div key={i}>{cellNode}</div>;
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between border-t border-[#E2E8F0] mt-5 pt-3.5 px-2 text-[12px] font-bold text-[#061838]">
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#EEF3FB] border border-[#CBD5E1]" />
          <span>Done</span>
        </span>
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#042C89]" />
          <span>Session</span>
        </span>
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#00D084]" />
          <span>Next</span>
        </span>
        <span className="flex items-center gap-2">
          <span className="relative w-3.5 h-3.5 rounded-full border border-[#94A3B8] overflow-hidden flex items-center justify-center">
            <svg className="w-full h-full text-[#94A3B8]" viewBox="0 0 14 14">
              <line x1="2" y1="12" x2="12" y2="2" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </span>
          <span>Half term</span>
        </span>
      </div>
    </div>
  );
}

export function TermDatesModal({ isOpen, onClose, venue }) {
  const terms = useMemo(() => {
    return Array.isArray(venue?.terms) ? venue.terms : [];
  }, [venue]);

  const venueDay = (venue?.schedule?.day || venue?.terms?.[0]?.day || 'Saturday');
  const dayLower = venueDay.toLowerCase();
  const dow = DAY_INDEX[dayLower] ?? 6;

  const today = useMemo(() => {
    const t = new Date();
    return new Date(t.getFullYear(), t.getMonth(), t.getDate());
  }, []);

  const built = useMemo(() => {
    return terms
      .map((t) => {
        const b = buildTerm(t, dow);
        return b ? { t, b } : null;
      })
      .filter(Boolean);
  }, [terms, dow]);

  const currentId =
    (built.find(({ b }) => today >= b.start && today <= b.end) || built[0])?.t?.id || null;
  const [openId, setOpenId] = useState(null);
  const active = openId !== null ? openId : currentId;

  const venueTitle = venue?.venueName || venue?.name || '-';

  if (!isOpen) return null;

  return (
    <ModalShell
      isOpen={isOpen}
      onClose={onClose}
      title="Term dates"
      subtitle={`${venueTitle} · ${venueDay}s`}
      maxWidth="max-w-[500px]"
      headerDivider={true}
    >
      {built.length === 0 ? (
        <div className="py-8 text-center text-slate-400">
          <p className="font-bold text-sm">No term dates available for this venue.</p>
        </div>
      ) : (
        <div className="space-y-3.5">
          {built.map(({ t, b }) => {
            const open = active === t.id;
            const isNow = today >= b.start && today <= b.end;

            return (
              <div
                key={t.id}
                className={`rounded-[22px] sm:rounded-[24px] p-5 sm:p-5.5 bg-white transition-all shadow-sm ${
                  open
                    ? 'border-2 border-[#042C89]'
                    : 'border border-[#E2E8F0] hover:border-slate-300'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <span className="md:w-10 md:h-10 w-8 h-8 rounded-full bg-[#EEF4FF] text-[#042C89] flex items-center justify-center shrink-0">
                    <Calendar className="md:w-5 md:h-5 w-4 text-[#042C89] stroke-[3]" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="md:text-[16px] text-[14px] font-bold text-[#042C89] leading-tight">
                          {t.name || '-'}
                        </span>
                        {isNow && (
                          <span className="bg-[#00D084] text-[#042C89] text-[10px] font-bold px-2 py-1.5 rounded-full uppercase leading-none">
                            NOW
                          </span>
                        )}
                      </div>
                      <span className="text-[12px] font-bold text-[#00A6E3] whitespace-nowrap">
                        {b.totalSessions != null ? `${b.totalSessions} sessions` : `${b.sessions.length} sessions`}
                      </span>
                    </div>
                    <p className="md:text-[13px] text-[11px] text-[#34353B] font-semibold md:font-normal mt-1">
                      {fmt(b.start)} – {fmt(b.end)} {b.end.getFullYear()}
                    </p>
                    <button
                      type="button"
                      onClick={() => setOpenId(open ? '__none__' : t.id)}
                      className="mt-2 text-[13px] font-bold text-[#00A6E3] flex items-center gap-1.5 cursor-pointer hover:underline"
                    >
                      <span>{open ? 'Hide calendar' : 'Show calendar'}</span>
                      {open ? (
                        <ChevronUp className="w-4 h-4 stroke-[2.5]" />
                      ) : (
                        <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                      )}
                    </button>
                  </div>
                </div>

                {open && <TermCalendar built={b} dow={dow} today={today} />}
              </div>
            );
          })}
        </div>
      )}
    </ModalShell>
  );
}

export default TermDatesModal;
