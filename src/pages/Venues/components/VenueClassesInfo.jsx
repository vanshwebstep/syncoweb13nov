import React, { useMemo, useState } from 'react';
import { ArrowRight, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../../../components/common/Container';
import { useModal } from '../../../context/ModalContext';
import { useVenue } from '../VenueContext';

const BASE = 'https://webstepdev.com/demo/syncoWebsiteImages';
const icon = (name) => `${BASE}/icons/${name}.png`;
const SWOOSH = `${BASE}/roadtorio/Swoosh.png`;
const STARTER_BOX = `${BASE}/venues/${encodeURIComponent('Starter pack box')}.png`;
const RECT_BG = `${BASE}/venues/rectanglebg.png`;

/* ====== Defaults (venue / API se na aaye to fallback) ====== */
const DEFAULT_CLASSES = [
  { time: '7:15 – 8:15am', ages: '4–5 Years', level: 'Beginner', spotsLeft: 4 },
  { time: '8:15 – 9:15am', ages: '6–7 Years', level: 'Intermediate', spotsLeft: 12 },
  { time: '9:15 – 10:15am', ages: '8–12 Years', level: 'Advanced', spotsLeft: 0 },
];

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const parseDate = (v) => {
  if (v instanceof Date) return v;
  if (typeof v === 'string' && /^\d{4}-\d{2}-\d{2}/.test(v)) {
    const [y, m, d] = v.slice(0, 10).split('-').map(Number);
    return new Date(y, m - 1, d);
  }
  return new Date(v);
};

// Agle 4 same-weekday dates (dayIndex: 0=Sun ... 6=Sat)
const nextDates = (dayIndex = 6, count = 4) => {
  const out = [];
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  const diff = (dayIndex - d.getDay() + 7) % 7;
  d.setDate(d.getDate() + (diff === 0 ? 7 : diff));
  for (let i = 0; i < count; i++) {
    out.push(new Date(d));
    d.setDate(d.getDate() + 7);
  }
  return out;
};

const STATUS = {
  few: { pill: 'bg-[#FFF1D6] text-[#8A5300]', dot: 'bg-[#F5A623]' },
  available: { pill: 'bg-[#E3F8EE] text-[#067A4B]', dot: 'bg-[#0DD180]' },
  full: { pill: 'bg-[#FDE8E8] text-[#C2383D]', dot: 'bg-[#E5484D]' },
};

// Class object ko normalize karo (API ke alag field names ke liye)
const normalizeClass = (c) => {
  const spots = c.spotsLeft ?? c.placesLeft ?? c.spacesLeft ?? (c.totalCapacity != null && c.capacity != null ? Math.max(0, c.totalCapacity - c.capacity) : 10);
  const status = c.status || (spots === 0 ? 'full' : spots > 0 && spots <= 5 ? 'few' : 'available');
  const statusText =
    c.statusText || (status === 'few' ? `Only ${spots} place${spots === 1 ? '' : 's'} left` : status === 'full' ? 'Fully booked' : 'Spaces available');
  return {
    time: c.time || [c.startTime, c.endTime].filter(Boolean).join(' – '),
    ages: c.ages || c.ageSimple || c.className || c.ageGroup || '',
    level: c.level || '',
    spotsLeft: spots,
    status,
    statusText,
    allowFreeTrial: c.allowFreeTrial !== false,
    classId: c.classId || c.id,
    raw: c.rawClass || c.raw || c,
  };
};

/* =====================================================================
   1. CLASSES AT {VENUE}
   ===================================================================== */
export function VenueClassesInfo({ onBookMembership, onBookTrial, onJoinWaitingList }) {
  const navigate = useNavigate();
  const { venue, venueName } = useVenue();
  const { openModal } = useModal();

  const name = venue?.venueName || venueName || 'Chelsea Academy';
  const address = venue?.address ? `${venue.address}${venue.postal_code ? `, ${venue.postal_code}` : ''}` : 'Lots Road, London SW10 0AB';
  const dayIndex = Number.isInteger(venue?.dayIndex) ? venue.dayIndex : 6;

  const dates = useMemo(() => {
    if (Array.isArray(venue?.trialDates) && venue.trialDates.length) {
      return venue.trialDates.map(parseDate).slice(0, 4);
    }
    return nextDates(dayIndex, 4);
  }, [venue, dayIndex]);

  const classes = useMemo(() => {
    if (Array.isArray(venue?.classList) && venue.classList.length > 0) {
      return venue.classList.map(normalizeClass);
    }
    if (Array.isArray(venue?.schedule?.classes) && venue.schedule.classes.length > 0) {
      return venue.schedule.classes.map(normalizeClass);
    }
    if (venue?.classes && typeof venue.classes === 'object') {
      const list = [];
      Object.entries(venue.classes).forEach(([day, dayClasses]) => {
        if (Array.isArray(dayClasses)) {
          dayClasses.forEach((c) => {
            const cap = Number(c.capacity) || 0;
            const total = Number(c.totalCapacity) || 20;
            const spotsLeft = Math.max(0, total - cap);
            const status = spotsLeft === 0 ? 'full' : spotsLeft <= 5 ? 'few' : 'available';
            const statusText = spotsLeft === 0 ? 'Fully booked' : spotsLeft <= 5 ? `Only ${spotsLeft} place${spotsLeft === 1 ? '' : 's'} left` : 'Spaces available';
            list.push({
              time: c.time || '-',
              ages: c.className || c.level || '-',
              level: c.level || '',
              spotsLeft,
              status,
              statusText,
              allowFreeTrial: c.allowFreeTrial !== false,
              classId: c.classId,
              raw: c
            });
          });
        }
      });
      if (list.length > 0) return list;
    }
    return DEFAULT_CLASSES.map(normalizeClass);
  }, [venue]);

  const [activeDate, setActiveDate] = useState(0);
  const selected = dates[activeDate] || dates[0];
  const selectedLabel = selected ? `${WEEKDAYS[selected.getDay()]} ${selected.getDate()} ${MONTHS[selected.getMonth()]}` : '';

  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${name} ${address}`)}`;
  const scrollTo = (id) => () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const venueIdVal = venue?.venueId || venue?.id || '5';

  const handleMembership = (c) => {
    if (onBookMembership) return onBookMembership(c.raw, selected);
    const cId = c.classId || c.raw?.classId;
    navigate(`/book-membership?venue=${venueIdVal}${cId ? `&classId=${cId}` : ''}`);
  };

  const handleTrial = (c) => {
    if (onBookTrial) return onBookTrial(c.raw, selected);
    const cId = c.classId || c.raw?.classId;
    navigate(`/book-trial?venue=${venueIdVal}${cId ? `&classId=${cId}` : ''}`);
  };

  const handleWaiting = (c) => {
    if (onJoinWaitingList) return onJoinWaitingList(c.raw);
    const cId = c.classId || c.raw?.classId;
    navigate(`/waiting-list?venue=${venueIdVal}${cId ? `&classId=${cId}` : ''}`);
  };

  const chipCls =
    'poppins inline-flex items-center gap-1.5 lg:gap-2 rounded-full bg-white/15 hover:bg-white/25 text-white font-bold text-[11.5px] lg:text-[13px] px-3.5 lg:px-4 py-2 transition-colors cursor-pointer whitespace-nowrap';

  return (
    <section id="class-times" className="mt-12 relative w-full bg-white py-12 sm:py-14 lg:py-16 overflow-hidden">
      <Container className="relative z-10">
        <div className="max-w-[1100px] mx-auto">
          {/* ===== Heading + trial dates ===== */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
            <div>
              <p className="poppins font-bold text-[#00A6E3] text-[10.5px] lg:text-[13px] tracking-[0.04em] uppercase">
                Weekly football classes for kids
              </p>
              <h2 className="mt-3 leading-[1.1]">
                <span className="recline block font-bold text-[#042C89] text-[30px] sm:text-[36px] lg:text-[40px]">Classes at</span>
                <span className="gasoek relative inline-block text-[#0DD180] text-[30px] sm:text-[52px] lg:text-[72px] mt-1">
                  {name}.
                  <img src={SWOOSH} alt="" aria-hidden="true" className="absolute left-0 -bottom-2 w-full h-auto pointer-events-none select-none" />
                </span>
              </h2>
              <p className="poppins mt-6 text-[#042C89] text-[15px] lg:text-[17px] leading-relaxed max-w-[420px] lg:max-w-none">
                Pick your child’s class and book their first session FREE.
              </p>
            </div>

            <div className="lg:text-right">
              <p className="poppins font-semibold text-[#797A88] text-[12px] lg:text-[14px]">Next four trial dates</p>
              <div className="mt-3 grid grid-cols-4 gap-2.5 lg:flex lg:gap-3 lg:justify-end">
                {dates.map((d, i) => {
                  const active = i === activeDate;
                  return (
                    <button
                      key={d.toISOString()}
                      type="button"
                      onClick={() => setActiveDate(i)}
                      className={`poppins w-full lg:w-[74px] rounded-[16px] border py-2.5 lg:py-3 text-center cursor-pointer transition-all ${
                        active ? 'bg-[#042C89] border-[#042C89]' : 'bg-white border-[#C9D3F0] hover:border-[#042C89]'
                      }`}
                    >
                      <span className={`block font-bold text-[10px] lg:text-[11px] uppercase ${active ? 'text-[#FFDE14]' : 'text-[#797A88]'}`}>
                        {WEEKDAYS[d.getDay()].slice(0, 3)}
                      </span>
                      <span className={`block font-bold text-[24px] lg:text-[28px] leading-none my-1 ${active ? 'text-white' : 'text-[#042C89]'}`}>{d.getDate()}</span>
                      <span className={`block font-bold text-[9px] lg:text-[10px] uppercase ${active ? 'text-[#FFDE14] lg:text-white/80' : 'text-[#797A88]'}`}>
                        {MONTHS[d.getMonth()].slice(0, 3)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ===== Timetable card ===== */}
          <div className="mt-8 rounded-[28px] border border-[#E8ECF5] overflow-hidden shadow-[0_6px_24px_rgba(4,44,137,0.05)] bg-white">
            {/* Header */}
            <div className="bg-[#042C89] px-5 sm:px-8 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="poppins font-bold text-white text-[19px] lg:text-[22px] leading-tight">{name}</h3>
                <p className="poppins mt-1.5 flex items-center gap-2 text-white/85 text-[11.5px] lg:text-[14px]">
                  <img src={icon('calwhite')} alt="" className="w-[14px] h-[14px] object-contain" />
                  {selectedLabel} · {address}
                </p>
              </div>
              <div className="flex flex-nowrap md:flex-wrap gap-2 lg:gap-2.5">
                <button type="button" onClick={scrollTo('prices')} className={chipCls}>
                  <img src={icon('poundwhite')} alt="" className="w-[13px] h-[13px] object-contain" /> Prices
                </button>
                <a href={mapsLink} target="_blank" rel="noopener noreferrer" className={chipCls}>
                  <img src={icon('dirwhite')} alt="" className="w-[13px] h-[13px] object-contain" /> Directions
                </a>
                <button type="button" onClick={scrollTo('parking')} className={chipCls}>
                  <img src={icon('parkwhite')} alt="" className="w-[13px] h-[13px] object-contain" /> Parking
                </button>
              </div>
            </div>

            {/* Rows */}
            <div className="p-3 sm:p-5 space-y-3">
              {classes.map((c) => {
                const st = STATUS[c.status] || STATUS.available;
                return (
                  <div
                    key={`${c.time}-${c.ages}-${c.classId || ''}`}
                    className="bg-[#F4F6FB] rounded-[18px] p-4 sm:px-6 lg:py-5 grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-3 lg:grid-cols-[210px_160px_170px_1fr] lg:gap-4"
                  >
                    {/* Time */}
                    <div className="flex items-center gap-2.5 lg:gap-3 lg:order-1">
                      <img src={icon('clocksky')} alt="" className="w-[18px] h-[18px] object-contain shrink-0" />
                      <span className="poppins font-bold text-[#042C89] text-[17px] lg:text-[18px] whitespace-nowrap">{c.time}</span>
                    </div>

                    {/* Status (mobile: time ke right me) */}
                    <div className="lg:order-3">
                      <span className={`${st.pill} poppins inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-bold text-[10.5px] lg:text-[12.5px] whitespace-nowrap`}>
                        <span className={`${st.dot} w-1.5 h-1.5 rounded-full`} />
                        {c.statusText}
                      </span>
                    </div>

                    {/* Ages + level (mobile: ek line me) */}
                    <div className="col-span-2 lg:col-span-1 lg:order-2">
                      <div className="flex items-baseline gap-2 lg:block">
                        <p className="poppins font-bold text-[#042C89] text-[15px] lg:text-[17px] leading-tight">{c.ages}</p>
                        {c.level && (
                          <p className="poppins text-[#797A88] text-[12.5px] lg:text-[13.5px] lg:mt-0.5">
                            <span className="lg:hidden mr-2">·</span>
                            {c.level}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="col-span-2 lg:col-span-1 lg:order-4">
                      {c.status === 'full' ? (
                        <div className="flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-center lg:justify-end">
                          <span className="poppins text-[#797A88] text-[11.5px] lg:text-[12.5px]">We’ll text you when a place opens.</span>
                          <button
                            type="button"
                            onClick={() => handleWaiting(c)}
                            className="poppins w-full lg:w-auto bg-[#E6F4FB] hover:bg-[#d3ebf7] text-[#042C89] font-bold text-[14px] px-6 lg:px-8 py-3.5 rounded-full transition-colors cursor-pointer whitespace-nowrap"
                          >
                            Join waiting list
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col-reverse gap-3 lg:flex-row lg:flex-wrap lg:items-center lg:justify-end">
                          <button
                            type="button"
                            onClick={() => handleMembership(c)}
                            className="poppins w-full lg:w-auto bg-white border-[1.5px] border-[#042C89] text-[#042C89] hover:bg-[#042C89] hover:text-white font-bold text-[14px] px-5 lg:px-7 py-3.5 rounded-full transition-all cursor-pointer whitespace-nowrap"
                          >
                            Book a membership
                          </button>
                          <button
                            type="button"
                            onClick={() => handleTrial(c)}
                            className="poppins w-full lg:w-auto inline-flex items-center justify-center gap-2 bg-[#042C89] hover:bg-[#021840] text-white font-bold text-[14px] lg:text-[15px] px-5 lg:px-7 py-3.5 rounded-full transition-all hover:scale-[1.03] active:scale-95 cursor-pointer whitespace-nowrap"
                          >
                            Book FREE trial <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Note */}
          <p className="poppins mt-6 flex items-start sm:items-center gap-2.5 font-semibold text-[#042C89] text-[12px] lg:text-[14px]">
            <Info className="w-4 h-4 text-[#34353B] shrink-0 mt-0.5 sm:mt-0" />
            Not sure which class? We place children by age, and the coach confirms their level at the trial.
          </p>
        </div>
      </Container>
    </section>
  );
}

/* =====================================================================
   2. HOW THE FREE TRIAL WORKS
   ===================================================================== */
const STEPS = [
  { n: 1, title: 'Book in 2 minutes', desc: 'Pick a class above and book your trial.', c: 'bg-[#0DD180] text-[#042C89]' },
  { n: 2, title: 'Arrive 10 mins early', desc: 'Meet the coach. Trainers and a water bottle is all they need.', c: 'bg-[#00A6E3] text-[#042C89]' },
  { n: 3, title: 'Coach finds their level', desc: 'After the session we tell you which group suits them best.', c: 'bg-[#FFDE14] text-[#042C89]' },
];

export function VenueFirstSession({ onBookTrial }) {
  const navigate = useNavigate();
  const { venue } = useVenue();
  const { openModal } = useModal();

  // Dynamic starter pack prices from venue
  const starterItem = venue?.starterPacks?.[0];
  const normalPrice = starterItem?.price ? `£${Number(starterItem.price).toFixed(2)}` : '£89.99';
  const offerPrice = starterItem?.offerPrice ? `£${Number(starterItem.offerPrice).toFixed(2)}` : '£49.99';
  const holdHours = venue?.starterPackHoldHours || 24;

  const handleBook = () => {
    if (onBookTrial) return onBookTrial(venue);
    const targetClass = venue?.classList?.find((c) => c.allowFreeTrial) || venue?.classList?.[0];
    const cId = targetClass?.classId ? `&classId=${targetClass.classId}` : '';
    navigate(`/book-trial?venue=${venue?.venueId || venue?.id || '5'}${cId}`);
  };

  return (
    <section className="relative w-full bg-[#F6F8FC] py-12 sm:py-14 lg:py-16 overflow-hidden">
      <Container className="relative z-10">
        <div className="max-w-[1100px] mx-auto">
          {/* ===== Heading ===== */}
          <div className="text-center">
            <p className="poppins font-bold text-[#00A6E3] text-[10.5px] lg:text-[13px] tracking-[0.04em] uppercase">How the free trial works</p>
            <h2 className="mt-3 leading-[1.1]">
              <span className="recline block font-bold text-[#042C89] text-[30px] sm:text-[36px] lg:text-[40px]">Your first</span>
              <span className="gasoek relative inline-block text-[#0DD180] text-[36px] sm:text-[44px] lg:text-[50px] mt-1">
                session.
                <img src={SWOOSH} alt="" aria-hidden="true" className="absolute left-0 -bottom-2 w-full h-auto pointer-events-none select-none" />
              </span>
            </h2>
            <p className="poppins mt-8 font-medium text-[#042C89] text-[14px] lg:text-[17px]">
              Here’s exactly what happens, so you both know what to expect.
            </p>
          </div>

          {/* ===== Steps ===== */}
          <div className="mt-8 lg:mt-12 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] items-stretch gap-3 md:gap-3">
            {STEPS.map((s, i) => (
              <React.Fragment key={s.n}>
                <div className="bg-white border border-[#E8ECF5] rounded-[18px] md:rounded-[22px] p-4 md:p-6 lg:p-7 shadow-[0_2px_10px_rgba(4,44,137,0.03)] flex items-start gap-4 md:block">
                  <span className={`${s.c} poppins w-[34px] h-[34px] md:w-[44px] md:h-[44px] shrink-0 rounded-full flex items-center justify-center font-bold text-[14px] lg:text-[20px]`}>
                    {s.n}
                  </span>
                  <div>
                    <h3 className="poppins md:mt-6 font-bold text-[#042C89] text-[15px] lg:text-[19px] leading-tight">{s.title}</h3>
                    <p className="poppins mt-1.5 md:mt-2 text-[#34353B] text-[12.5px] lg:text-[14px] leading-relaxed">{s.desc}</p>
                  </div>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="hidden md:flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-[#00A6E3]" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* ===== Offer banner (rectanglebg) ===== */}
          <div className="relative mt-8 lg:mt-14">
            <div
              className="relative overflow-hidden rounded-[24px] lg:rounded-[28px] bg-[#042C89] bg-cover bg-right-bottom bg-no-repeat px-6 sm:px-8 lg:pl-[240px] lg:pr-10 pt-7 pb-8 lg:py-9 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5"
              style={{ backgroundImage: `url(${RECT_BG})` }}
            >
              <div className="relative z-10 max-w-[560px]">
                <h3 className="poppins font-bold text-white text-[17px] lg:text-[20px] leading-tight">
                  <span className="block lg:inline text-[#FFDE14] lg:text-white text-[15px] lg:text-[20px] mb-1 lg:mb-0">Loved it?</span>{' '}
                  Join within {holdHours} hours of the trial
                </h3>
                <p className="poppins mt-2 text-white/85 text-[12.5px] lg:text-[15px] leading-relaxed">
                  Their place is held for {holdHours} hours and the starter pack is{' '}
                  <span translate="no" className="notranslate font-bold text-[#FFDE14]">{offerPrice}</span> instead of{' '}
                  <span translate="no" className="notranslate font-bold">{normalPrice}</span>.
                </p>
              </div>

              <button
                type="button"
                onClick={handleBook}
                className="poppins relative z-10 inline-flex items-center justify-center gap-2 bg-[#FFDE14] hover:bg-[#f2d100] text-[#042C89] font-bold text-[14px] lg:text-[16px] px-7 lg:px-9 py-3.5 lg:py-4 rounded-full shadow-md transition-all duration-300 hover:scale-[1.03] active:scale-95 cursor-pointer whitespace-nowrap self-start lg:self-auto"
              >
                Book a FREE trial <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5" />
              </button>
            </div>

            {/* Starter pack image: mobile = bottom-right (andar), desktop = top-left (bahar nikla hua) */}
            <img
              src={STARTER_BOX}
              alt="Samba starter pack"
              className="absolute z-20 right-3 bottom-3 w-[122px] h-[119px] lg:right-auto lg:bottom-auto lg:left-6 lg:-top-8 lg:w-[184px] lg:h-[179px] object-contain pointer-events-none select-none drop-shadow-xl"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

export default VenueClassesInfo;
