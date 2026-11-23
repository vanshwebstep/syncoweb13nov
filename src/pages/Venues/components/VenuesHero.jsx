import React, { useState } from 'react';
import { ArrowRight, Check, Star, ChevronDown, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../../../components/common/Container';
import { useModal } from '../../../context/ModalContext';
import { useVenue } from '../VenueContext';

const BASE = 'https://webstepdev.com/demo/syncoWebsiteImages';
const VENUE_BG = `${BASE}/venues/venuemainbg.png`;
const VENUE_BG_MOBILE = `${BASE}/venues/venuemainbgmobile.png`;
const DEFAULT_VENUE_IMG = `${BASE}/venues/venuemainimg.png`;
const WHITELINE = `${BASE}/roadtorio/whiteline.png`;
const icon = (name) => `${BASE}/icons/${name}.png`;

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const getNextDateForDay = (dayIndex = 6) => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  const diff = (dayIndex - d.getDay() + 7) % 7;
  d.setDate(d.getDate() + (diff === 0 ? 7 : diff));
  return d;
};

export function VenuesHero({ venue: propVenue, onBookTrial, onSeeTimes }) {
  const navigate = useNavigate();
  const { openModal } = useModal();
  const venueCtx = useVenue();

  const venue = propVenue || venueCtx?.venue || {};
  const allVenues = venueCtx?.allVenues || [];
  const changeVenue = venueCtx?.changeVenue;

  const areaName = venue.area && venue.area !== '-' ? venue.area : (venue.venueName || 'Chelsea');
  const venueName = venue.venueName || venue.name || 'Chelsea Academy';
  const fullAddress = venue.address ? `${venue.address}${venue.postal_code ? `, ${venue.postal_code}` : ''}` : 'Lots Road, SW10 0AB';

  // Day & index
  const dayName = venue.primaryDay || (venue.schedule?.day) || 'Saturday';
  const dayLabel = `${dayName}s`;
  const dayIndex = Number.isInteger(venue.dayIndex) ? venue.dayIndex : 6;

  // Next trial date
  const nextDateObj = getNextDateForDay(dayIndex);
  const trialDate = `${WEEKDAYS[nextDateObj.getDay()]} ${nextDateObj.getDate()} ${MONTHS[nextDateObj.getMonth()]}`;

  // Age range
  const ages = venue.ageRange || '4–12';
  const facility = venue.facility && venue.facility !== '-' ? `${venue.facility} sports facility` : 'Indoor sports hall';

  const sinceYear = 2009;
  const rating = '4.8';
  const ratingNote = 'From hundreds of parents';
  const childrenCount = '20,000+';
  const yearsOfSamba = Math.max(new Date().getFullYear() - sinceYear, 0);

  const handleBook = () => {
    if (onBookTrial) return onBookTrial(venue);
    const targetClass = venue.classList?.find((c) => c.allowFreeTrial) || venue.classList?.[0];
    const cId = targetClass?.classId ? `&classId=${targetClass.classId}` : '';
    navigate(`/book-trial?venue=${venue.venueId || venue.id || '5'}${cId}`);
  };

  const handleSeeTimes = () => {
    if (onSeeTimes) return onSeeTimes(venue);
    const el = document.getElementById('class-times');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const pills = [
    { icon: 'calyellow', text: dayLabel },
    { icon: 'usersyellow', text: `Ages ${ages}` },
    { icon: 'homeyellow', text: facility },
  ].filter((p) => p.text);

  const stats = [
    { icon: 'starblue', tint: '#E3F8EE', title: `${rating} on Google`, sub: ratingNote },
    { icon: 'calblue', tint: '#E6F4FB', title: `Since ${sinceYear}`, sub: `${yearsOfSamba}+ years of Samba` },
    { icon: 'usersblue', tint: '#E3F8EE', title: `${childrenCount} children`, sub: 'Coached across the UK' },
    { icon: 'shieldblue', tint: '#E6F4FB', title: 'DBS-checked', sub: 'Every coach trained' },
  ];

  /* Buttons + note: desktop pe left column me, mobile pe photo ke neeche */
  const cta = (
    <>
      <div className="flex flex-col items-stretch gap-3 lg:flex-row lg:flex-wrap lg:items-center">
        <button
          type="button"
          onClick={handleBook}
          className="poppins inline-flex w-full lg:w-auto items-center justify-center gap-2 bg-[#0DD180] hover:bg-[#0bb86f] text-[#042C89] font-bold text-[16px] lg:text-[18px] px-7 lg:px-9 py-4 rounded-full shadow-md transition-all duration-300 hover:scale-[1.03] active:scale-95 cursor-pointer whitespace-nowrap"
        >
          Book a FREE trial <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5" />
        </button>
        <button
          type="button"
          onClick={handleSeeTimes}
          className="poppins inline-flex w-full lg:w-auto items-center justify-center border-[1.5px] border-white text-white hover:bg-white hover:text-[#042C89] font-bold text-[16px] lg:text-[18px] px-7 lg:px-9 py-4 rounded-full transition-all duration-300 cursor-pointer whitespace-nowrap"
        >
          See class times
        </button>
      </div>

      <p className="poppins mt-4 lg:mt-6 flex items-center justify-center lg:justify-start gap-2 text-white/90 text-[12.5px] lg:text-[14px]">
        <Check className="w-4 h-4 text-[#0DD180] stroke-[3]" /> Takes 2 minutes to book
      </p>
    </>
  );

  return (
    <>
      <section className="relative w-full overflow-hidden bg-[#042C89] z-[9]">
        {/* Background: desktop */}
        <img
          src={VENUE_BG}
          alt=""
          aria-hidden="true"
          className="hidden lg:block absolute inset-0 w-full h-full object-cover object-bottom pointer-events-none select-none z-0"
        />
        {/* Background: mobile */}
        <img
          src={VENUE_BG_MOBILE}
          alt=""
          aria-hidden="true"
          className="block lg:hidden absolute inset-0 w-full h-full object-cover object-bottom pointer-events-none select-none z-0"
        />

        <Container className="relative z-10 pt-10 pb-20 lg:pt-[60px] lg:pb-[210px]">
          {/* Venue Switcher dropdown */}
          {allVenues && allVenues.length > 1 && (
            <div className="mb-6 flex items-center gap-2 flex-wrap">
              <span className="poppins text-xs font-semibold text-white/80 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#FFDE14]" /> Choose Venue:
              </span>
              <div className="relative inline-block">
                <select
                  value={venue.venueId || venue.id || ''}
                  onChange={(e) => changeVenue && changeVenue(e.target.value)}
                  className="poppins appearance-none bg-[#0F3FA8] hover:bg-[#1449BD] text-white border border-white/20 font-bold text-[12px] lg:text-[13px] px-4 py-2 pr-8 rounded-full cursor-pointer focus:outline-none shadow-sm transition-colors"
                >
                  {allVenues.map((item) => (
                    <option
                      key={item.venueId || item.id}
                      value={item.venueId || item.id}
                      className="bg-[#042C89] text-white"
                    >
                      {item.venueName || item.name} ({item.area || item.postal_code})
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-white/80 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">
            {/* ===== Left ===== */}
            <div className="lg:col-span-6">
              <p className="poppins font-bold text-[#FFDE14] text-[10.5px] lg:text-[13px] tracking-[0.04em] uppercase">
                Samba {areaName} · {fullAddress}
              </p>

              <h1 className="mt-3 lg:mt-4 leading-[1.1]">
                <span className="recline block font-bold text-white text-[34px] sm:text-[44px] lg:text-[58px]">
                  Football classes
                </span>
                <span className="gasoek relative inline-block text-[#FFDE14] text-[42px] sm:text-[54px] lg:text-[78px] mt-1">
                  in {areaName}.
                  <img src={WHITELINE} alt="" aria-hidden="true" className="absolute left-0 -bottom-2 w-full h-auto pointer-events-none select-none" />
                </span>
              </h1>

              <p className="poppins mt-6 lg:mt-8 max-w-[520px] text-white text-[15px] sm:text-[16px] lg:text-[19px] leading-relaxed">
                Brazilian-inspired weekly football for ages {ages}.{' '}
                <span className="font-bold lg:font-normal">
                  <span className="lg:hidden">Skills, confidence and flair.</span>
                  <span className="hidden lg:inline">Skills, confidence and flair, every {dayName}.</span>
                </span>
              </p>

              {/* Pills */}
              <div className="mt-5 lg:mt-6 flex flex-wrap gap-2 lg:gap-2.5">
                {pills.map((p) => (
                  <span
                    key={p.text}
                    className="poppins inline-flex items-center gap-1.5 lg:gap-2 bg-[#0F3FA8] border border-white/10 text-white font-semibold text-[11px] lg:text-[14px] px-3 lg:px-4 py-2 rounded-full whitespace-nowrap"
                  >
                    <img src={icon(p.icon)} alt="" className="w-[13px] h-[13px] lg:w-[14px] lg:h-[14px] object-contain" />
                    {p.text}
                  </span>
                ))}
              </div>

              {/* Buttons (desktop only) */}
              <div className="hidden lg:block mt-7">{cta}</div>
            </div>

            {/* ===== Right: photo + floating cards ===== */}
            <div className="lg:col-span-6 flex justify-center lg:justify-end">
              <div className="relative w-full lg:w-[520px] lg:max-w-none pr-3 pb-3 lg:p-0">
                {/* Yellow frame */}
                <span aria-hidden="true" className="absolute inset-0 left-3 top-3 lg:left-0 lg:top-0 lg:translate-x-[14px] lg:translate-y-[14px] rounded-[24px] lg:rounded-[28px] bg-[#FFDE14]" />

                <img
                  src={DEFAULT_VENUE_IMG}
                  alt={`Samba ${venueName} football class`}
                  className="relative w-full aspect-[345/330] lg:aspect-auto lg:h-[560px] object-cover rounded-[24px] lg:rounded-[28px]"
                />

                {/* Rating card */}
                <div className="absolute -top-4 right-5 lg:-top-5 lg:-right-8 bg-white rounded-[16px] shadow-xl px-4 py-3 flex items-center gap-3 z-10">
                  <span className="poppins font-bold text-[#042C89] text-[24px] lg:text-[30px] leading-none">{rating}</span>
                  <div>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-[#FFDE14] text-[#FFDE14]" />
                      ))}
                    </div>
                    <p className="poppins font-semibold text-[#797A88] text-[11px] lg:text-[12px] mt-1">Google rating</p>
                  </div>
                </div>

                {/* Next free trial card */}
                {trialDate && (
                  <div className="absolute left-4 bottom-7 lg:-left-[52px] lg:bottom-[44px] w-[230px] lg:w-[300px] bg-white rounded-[16px] shadow-xl p-4 z-10">
                    <p className="poppins font-bold text-[#00A6E3] text-[10px] lg:text-[11px] tracking-[0.04em] uppercase">Next free trial</p>
                    <p className="poppins mt-1 font-bold text-[#042C89] text-[16px] lg:text-[19px] leading-tight">{trialDate}</p>
                    <div className="mt-3 pt-3 border-t border-[#E5EAF3] flex items-center gap-2.5">
                      <span className="w-8 h-8 rounded-full bg-[#FFDE14] flex items-center justify-center shrink-0">
                        <img src={icon('pinblue')} alt="" className="w-[14px] h-[14px] object-contain" />
                      </span>
                      <div className="min-w-0">
                        <p className="poppins font-bold text-[#042C89] text-[12px] lg:text-[13px] leading-tight truncate">{venueName}</p>
                        <p className="poppins text-[#797A88] text-[10.5px] lg:text-[11.5px] mt-0.5 truncate">{fullAddress}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Buttons (mobile only, photo ke neeche) */}
            <div className="lg:hidden">{cta}</div>
          </div>
        </Container>
      </section>

      {/* ===== Trust bar ===== */}
      <div className="relative z-20 -mt-10 lg:-mt-[46px] m-auto pb-8 lg:pb-10">
        <Container className="m-auto flex justify-center">
          <div className="relative lg:absolute lg:-bottom-12 mx-auto w-full lg:w-auto max-w-[1100px] grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-0 lg:bg-white lg:rounded-[24px] lg:border lg:border-[#E8ECF5] lg:shadow-[0_8px_30px_rgba(4,44,137,0.08)] lg:px-8 lg:py-6 lg:divide-x lg:divide-[#E8ECF5]">
            {stats.map((s) => (
              <div
                key={s.title}
                className="flex flex-col items-start gap-3 bg-white rounded-[20px] border border-[#E8ECF5] shadow-[0_6px_20px_rgba(4,44,137,0.06)] p-4 lg:bg-transparent lg:rounded-none lg:border-0 lg:shadow-none lg:p-0 lg:flex-row lg:items-center lg:px-5 first:lg:pl-0 last:lg:pr-0"
              >
                <span className="w-[42px] h-[42px] lg:w-[48px] lg:h-[48px] rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: s.tint }}>
                  <img src={icon(s.icon)} alt="" className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] object-contain" />
                </span>
                <div>
                  <p className="poppins font-bold text-[#042C89] text-[13.5px] lg:text-[15.5px] leading-tight">{s.title}</p>
                  <p className="poppins text-[#797A88] text-[11px] lg:text-[12.5px] mt-1 lg:mt-0.5 leading-snug">{s.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </>
  );
}

export default VenuesHero;
