import React from 'react';
import {
  Check,
  Mail,
  Calendar,
  Compass,
  ArrowRight
} from 'lucide-react';
import { Container } from '../../../components/common/Container';

const YELLOW_SPLASH = 'https://webstepdev.com/demo/syncoWebsiteImages/find-a-class/yellow-splash-2.png';
const SPLASH = 'https://webstepdev.com/demo/syncoWebsiteImages/find-a-class/yellow.png';
const dir = 'https://webstepdev.com/demo/syncoWebsiteImages/find-a-class/dir.png';
const shoe = 'https://webstepdev.com/demo/syncoWebsiteImages/find-a-class/shoe.png';
const shirt = 'https://webstepdev.com/demo/syncoWebsiteImages/find-a-class/shirt.png';
const bottle = 'https://webstepdev.com/demo/syncoWebsiteImages/find-a-class/bottle.png';
const wtsp = 'https://webstepdev.com/demo/syncoWebsiteImages/find-a-class/chat.png';
const clock_main = 'https://webstepdev.com/demo/syncoWebsiteImages/find-a-class/clock_main.png';
const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const pad = (n) => String(n).padStart(2, '0');

function getSessionDate(selectedDate) {
  if (!selectedDate) return null;
  if (selectedDate.isoDate) {
    const [y, m, d] = selectedDate.isoDate.split('-').map(Number);
    if (y && m && d) return { y, m, d };
  }
  const m = MONTHS.indexOf(selectedDate.monthShort);
  const d = parseInt(selectedDate.dayNum, 10);
  if (m < 0 || !d) return null;
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let y = now.getFullYear();
  if (new Date(y, m, d) < today) y += 1;
  return { y, m: m + 1, d };
}

function parseRange(str) {
  const match = /(\d{1,2}):(\d{2})\s*[–-]\s*(\d{1,2}):(\d{2})\s*(am|pm)/i.exec(str || '');
  if (!match) return null;
  const sh = +match[1];
  const sm = +match[2];
  const eh = +match[3];
  const em = +match[4];
  const pm = match[5].toLowerCase() === 'pm';
  const startPm = pm && sh % 12 <= eh % 12;
  const to24 = (h, isPm) => (h % 12) + (isPm ? 12 : 0);
  return { start: to24(sh, startPm) * 60 + sm, end: to24(eh, pm) * 60 + em };
}

const fmtDateTime = ({ y, m, d }, mins) =>
  `${y}${pad(m)}${pad(d)}T${pad(Math.floor(mins / 60))}${pad(mins % 60)}00`;

// WhatsApp brand icon
const WhatsAppIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

export function Step7SuccessScreen({
  venue,
  selectedDate,
  childrenData = [],
  parentData,
  bookingResult
}) {
  const childrenNames = childrenData
    .map((c) => c?.firstName?.trim().toUpperCase())
    .filter(Boolean);

  let headlineNames = 'LEO & MIA';
  let isSingle = false;
  if (childrenNames.length === 1) {
    headlineNames = childrenNames[0];
    isSingle = true;
  } else if (childrenNames.length === 2) {
    headlineNames = `${childrenNames[0]} & ${childrenNames[1]}`;
  } else if (childrenNames.length > 2) {
    headlineNames = `${childrenNames.slice(0, -1).join(', ')} & ${childrenNames[childrenNames.length - 1]}`;
  }

  const displayChildren = childrenData.length > 0
    ? childrenData
    : [
        { firstName: 'Leo', sessionTime: '7:15 – 8:15am' },
        { firstName: 'Mia', sessionTime: '8:15 – 9:15am' }
      ];

  const getChildTime = (child, idx) => {
    if (child?.sessionTime) return child.sessionTime.replace(/^[A-Za-z]+,?\s*/, '');
    if (child?.ageGroupText) {
      const parts = child.ageGroupText.split('·');
      if (parts.length > 1) return parts[parts.length - 1].trim();
    }
    return idx === 1 ? '8:15 – 9:15am' : '7:15 – 8:15am';
  };

  const venueName = venue?.name || 'Chelsea Academy';
  const venueAddress = venue?.address || 'Lots Road, London SW10 0AB';

  const sessionDate = getSessionDate(selectedDate);
  const weekday = sessionDate
    ? new Date(sessionDate.y, sessionDate.m - 1, sessionDate.d)
        .toLocaleDateString('en-GB', { weekday: 'short' })
        .toUpperCase()
    : (selectedDate?.dayShort || 'SAT');
  const hero = 'https://webstepdev.com/demo/syncoWebsiteImages/find-a-class/Hero.png';

  const handleAddToCalendar = () => {
    const title = encodeURIComponent(`Samba Soccer Schools Free Trial - ${venueName}`);
    const location = encodeURIComponent(venueAddress);
    const details = encodeURIComponent(
      'Please arrive 10 minutes early. Bring a water bottle and wear sports trainers/kit.'
    );

    let dates = '';
    const date = sessionDate;
    if (date) {
      const ranges = childrenData.map((c) => parseRange(c?.sessionTime)).filter(Boolean);
      if (ranges.length) {
        const start = Math.min(...ranges.map((r) => r.start));
        const end = Math.max(...ranges.map((r) => r.end));
        dates = `&dates=${fmtDateTime(date, start)}/${fmtDateTime(date, end)}&ctz=Europe%2FLondon`;
      } else {
        const next = new Date(date.y, date.m - 1, date.d + 1);
        const day = `${date.y}${pad(date.m)}${pad(date.d)}`;
        const nextDay = `${next.getFullYear()}${pad(next.getMonth() + 1)}${pad(next.getDate())}`;
        dates = `&dates=${day}/${nextDay}`;
      }
    }

    window.open(
      `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&location=${location}&details=${details}${dates}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const handleOpenDirections = () => {
    const dest = encodeURIComponent(venue?.address || venue?.name || 'Chelsea Academy Lots Road');
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${dest}`, '_blank', 'noopener,noreferrer');
  };

  const bringItems = [
    { icon: shoe, text: 'Trainers or astro boots' },
    { icon: bottle, text: 'Water bottle' },
    { icon: shirt, text: 'Comfy sports clothes' },
    { icon: clock_main, text: 'Arrive 10 mins early' }
  ];

  const nextSteps = [
    { title: 'They experience a real session', sub: 'Small groups, 1 coach to 10.' },
    { title: 'The coach assesses their level', sub: "We'll tell you which group suits them best." },
    { title: 'Loved it? Join online.', sub: 'Your 24-hour offer will be waiting.' }
  ];

  return (
    <div className="w-full pb-10 animate-badge-fade-in font-sans">
      {/* 1. Hero */}
      <section
        className="relative w-full text-white pt-8 pb-10 sm:pt-10 sm:pb-14 overflow-hidden text-center"
        style={{
          backgroundImage: `url(${hero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <Container className="relative z-10  max-w-4xl px-4">
          {/* White circle with checkmark */}
          <h3 className='text-[#FFDE14] text-[11px] font-bold uppercase py-2 block md:hidden'>Free Trial confirmed</h3>
          <div className="w-[52px] h-[52px] sm:w-14 sm:h-14 rounded-full bg-white text-[#00D084] flex items-center justify-center mx-auto mb-3.5">
            <Check className="w-7 h-7 stroke-[3.5]" />
          </div>

          {/* Headline Name */}
          <h1 className="gasoek font-normal text-[28px] sm:text-5xl lg:text-[54px] text-[#FFDE14] leading-none uppercase">
            {headlineNames}
          </h1>

          {/* Headline Sub: ARE BOOKED IN! */}
          <div className="relative inline-block mt-2 sm:mt-3">
            <span className="gasoek font-normal text-[30px] sm:text-4xl lg:text-[40px] text-white leading-none uppercase">
              {isSingle ? 'IS BOOKED IN!' : 'ARE BOOKED IN!'}
            </span>
            <img
              src={YELLOW_SPLASH}
              alt=""
              className="absolute hidden md:block -bottom-1.5 left-0 w-full  sm:h-3 object-fill pointer-events-none"
            />
            <img
              src={SPLASH}
              alt=""
              className="absolute md:hidden block -bottom-1.5 left-0 w-full  sm:h-3 object-fill pointer-events-none"
            />
          </div>

          {/* Email badge */}
          <div className="mt-6 sm:mt-6">
            <div className="bg-white/20 text-white text-[13px] font-bold py-2 px-4 sm:px-5 rounded-full inline-flex items-center gap-2 max-w-full">
              <Mail className="w-3.5 h-3.5 text-white shrink-0" />
              <span className="truncate">
                {parentData?.email ? `Details sent to ${parentData.email}` : 'Details sent to sarah@email.com'}
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Content grid */}
      <Container className="max-w-[1200px] mt-6 sm:mt-10 px-4">
        <div className="grid grid-cols-1  m-auto lg:grid-cols-12 gap-6 lg:gap-16 items-start">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-6 space-y-6">
            {/* Venue & Date Card */}
            <div className="bg-white rounded-[22px] border border-[#042C89]/10 p-5">
              <div className="flex items-start gap-3.5 mb-4">
                {/* Yellow Date Square */}
                <div className="md:w-[96px] w-[80px] h-[106px] rounded-[14px] bg-[#FFE600] text-[#042C89] flex flex-col items-center justify-center font-black leading-none shrink-0">
                  <span className="text-[11px] md:text-[13px] uppercase tracking-wider font-extrabold">{weekday}</span>
                  <span className="md:text-[38px] text-[32px] font-black my-1 leading-none">{selectedDate?.dayNum || '24'}</span>
                  <span className="text-[11px] md:text-[13px] uppercase font-extrabold tracking-wider">
                    {selectedDate?.monthShort || 'OCT'}
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-base sm:text-[20px] font-bold text-[#042C89] leading-tight">{venueName}</h3>
                  <p className="text-[#797A88] text-[13px] font-medium truncate mt-0.5">{venueAddress}</p>

                  <div className="mt-2 space-y-1 text-[11px] md:text-[14px]">
                    {displayChildren.map((child, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 font-bold text-[#34353B]">
                        <img
                          src={clock_main}
                          alt=""
                          className="w-3.5 h-3.5 object-contain shrink-0"
                        />
                        <span>
                          {child?.firstName || (idx === 1 ? 'Mia' : 'Leo')} · {getChildTime(child, idx)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleAddToCalendar}
                  className="bg-[#E6F3FB] hover:bg-[#D6EAF8] text-[#042C89] font-bold text-[12px] md:text-[15px] h-[54px] px-3 rounded-full flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#042C89] stroke-[2.5]" />
                  <span>Add to calendar</span>
                </button>

                <button
                  type="button"
                  onClick={handleOpenDirections}
                  className="bg-[#E6F3FB] hover:bg-[#D6EAF8] text-[#042C89] font-bold text-[12px] md:text-[15px] h-[54px] px-3 rounded-full flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <img src={dir} alt="" className="w-3.5 h-3.5 object-contain" />
                  <span>Directions</span>
                </button>
              </div>
            </div>

            {/* What to bring */}
            <div>
              <h3 className="recline text-[28px] font-bold text-[#042C89] leading-[1.05] mb-3.5">
                What to <br />
                <span className="relative inline-block text-[#0DD180] text-[30px] gasoek font-normal">
                  bring.
                  <img
                    src={YELLOW_SPLASH}
                    alt=""
                    className="absolute -bottom-[9px] left-0 w-full  object-fill pointer-events-none"
                  />
                </span>
              </h3>

              <div className="grid grid-cols-2 gap-4 md:gap-3">
                {bringItems.map(({ icon, text }, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-[14px] px-4 py-5 flex items-center gap-3 text-[14px] font-bold text-[#042C89]"
                  >
                    <img src={icon} alt="" className="w-5 h-5 object-contain shrink-0" />
                    <span className="leading-tight">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-6 space-y-6">
            {/* What happens next */}
            <div className='pb-6'>
              <h3 className="recline text-[28px] font-bold text-[#042C89] leading-[1.05] mb-4">
                What happens <br />
                <span className="relative inline-block text-[30px] text-[#00A6E3] gasoek font-normal">
                  next.
                  <img
                    src={YELLOW_SPLASH}
                    alt=""
                    className="absolute -bottom-1.5 left-0 w-full  object-fill pointer-events-none"
                  />
                </span>
              </h3>

              <div className="space-y-6 pt-4">
                {nextSteps.map((step, idx) => (
                  <div key={idx} className="relative flex items-start gap-4">
                    {idx < nextSteps.length - 1 && (
                      <div className="absolute left-[13px] top-[30px] bottom-[-22px] w-0 border-l-2 border-dashed border-[#0DD180]" />
                    )}
                    <div className="w-7 h-7 rounded-full bg-[#00D084] text-[#042C89] font-bold text-[16px] flex items-center justify-center shrink-0 relative z-10">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-[#042C89] text-[16px] leading-tight">{step.title}</h4>
                      <p className="text-[#797A88] text-[14px] font-normal mt-0.5">{step.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Account CTA Card */}
            <div className="bg-[#042C89] max-w-[500px] text-white rounded-[22px] p-5 sm:p-6 sm:pb-4 space-y-1">
              <h4 className="font-bold text-[15px] sm:text-[18px] leading-tight">
                Your Samba Connect account is ready
              </h4>
              <p className="text-[#C9D3F0] text-[14px] font-normal">Manage bookings and track progress.</p>
              <a
                href="https://parent-dash.netlify.app/"
                target="_blank"
                rel="noreferrer"
                className="w-full bg-[#FFE600] hover:bg-[#ffd700] text-[#042C89] font-bold text-xs sm:text-[15px] h-[48px] rounded-full flex items-center justify-center gap-2 mt-4 transition-all cursor-pointer active:scale-95"
              >
                <span>Go to my Samba Connect account</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
              </a>
            </div>

            {/* Help & Alternate Dates */}
            <div className="space-y-3 max-w-[500px]">
              <a
                href="https://wa.me/442072052723"
                target="_blank"
                rel="noreferrer"
                className="w-full bg-white border-[1.5px] border-[#0DD180] hover:bg-emerald-50 text-[#067A4B] font-bold text-xs sm:text-[16px] h-[48px] rounded-full flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
<img src={wtsp} className='w-4' alt="" />                <span>Questions? WhatsApp us</span>
              </a>

              <div className="text-center pt-2 pb-6">
                <a href="/find-a-class" className="text-[14px] font-bold text-[#00A6E3] hover:underline">
                  Need a different date? Manage booking
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Step7SuccessScreen;