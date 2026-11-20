import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Clock, ChevronRight } from 'lucide-react';
import { Container } from '../../../components/common/Container';
import { useModal } from '../../../context/ModalContext';
import blueBgTexture from 'https://webstepdev.com/demo/syncoWebsiteImages/bluetexturedbg.png';

const WHITELINE = 'https://webstepdev.com/demo/syncoWebsiteImages/roadtorio/whiteline.png';

// Static sample data (screenshot wala). Real data API se aaye to yahan replace kar dena.
const CAMPS = [
  {
    name: 'Samba Chelsea',
    distance: '0.8 mi',
    venue: 'Chelsea Academy, SW10',
    dates: 'Easter · Mon 6 – Thu 9 Apr',
    time: '9am – 1pm · 4 hours a day',
    status: 'few',
    statusText: '8 places left',
  },
  {
    name: 'Samba Fulham',
    distance: '1.6 mi',
    venue: 'Hurlingham Park, SW6',
    dates: 'Easter · Tue 14 – Fri 17 Apr',
    time: '9am – 1pm · 4 hours a day',
    status: 'available',
    statusText: 'Places available',
  },
  {
    name: 'Samba Battersea',
    distance: '2.3 mi',
    venue: 'Battersea Park, SW11',
    dates: 'Easter · Mon 6 – Thu 9 Apr',
    time: '10am – 2pm · 4 hours a day',
    status: 'full',
    statusText: 'Fully booked',
  },
];

const STATUS_STYLES = {
  few: { pill: 'bg-[#FFF1D6] text-[#8A5300]', dot: 'bg-[#F5A623]' },
  available: { pill: 'bg-[#E3F8EE] text-[#067A4B]', dot: 'bg-[#0DD180]' },
  full: { pill: 'bg-[#FDE8E8] text-[#C2383D]', dot: 'bg-[#E5484D]' },
};

export function Section3() {
  const [query, setQuery] = useState('');
  const { openModal } = useModal();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/venues?postcode=${encodeURIComponent(query.trim())}`);
    } else {
      openModal('venue');
    }
  };

  const goVenues = () => navigate(query.trim() ? `/venues?postcode=${encodeURIComponent(query.trim())}` : '/venues');

  return (
    <section className="relative w-full overflow-hidden bg-[#042C89] pt-10 pb-12 sm:py-16 lg:py-20">
      <img
        src={blueBgTexture}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover opacity-75 pointer-events-none select-none z-0"
      />

      <Container className="relative z-10 w-full px-5 md:px-6">
        {/* ===== Heading ===== */}
        <div className="text-left md:text-center">
          <p className="font-['Poppins',sans-serif] font-bold text-[#0DD180] text-[11px] lg:text-[13px] tracking-[0.06em] uppercase">
            <span className="md:hidden">Find a camp</span>
            <span className="hidden md:inline">Find a Skills Accelerator camp</span>
          </p>
          <h2 className="mt-2 md:mt-3 leading-[1.1]">
            <span className="block font-['Recline',sans-serif] font-bold text-white text-[30px] sm:text-[36px] lg:text-[44px]">
              Four days of Samba.
            </span>
            <span className="relative inline-block font-['Gasoek_One',sans-serif] text-[#FFDE14] text-[36px] sm:text-[44px] lg:text-[54px] mt-1">
              <span className="md:hidden">
                Somewhere
                <br />
                near you.
              </span>
              <span className="hidden md:inline">Somewhere near you.</span>
              <img src={WHITELINE} alt="" aria-hidden="true" className="absolute left-0 -bottom-1.5 md:-bottom-2 w-full h-auto pointer-events-none select-none" />
            </span>
          </h2>
          <p className="mt-6 md:mt-8 font-['Poppins',sans-serif] text-white text-[14px] lg:text-[17px] leading-[1.5] md:leading-normal">
            Enter your postcode to see upcoming camps, dates and availability.
          </p>
        </div>

        {/* ===== Search: mobile = white card (input + full-width button), desktop = pill ===== */}
        <form
          onSubmit={handleSubmit}
          className="mt-6 md:mt-8 mx-auto max-w-[766px] flex flex-col gap-3 md:flex-row md:items-center bg-white rounded-[20px] md:rounded-full p-3 md:pl-5 md:pr-2 md:py-2 shadow-2xl"
        >
          <div className="flex items-center flex-1 min-w-0 bg-[#F4F6FB] md:bg-transparent rounded-full md:rounded-none pl-4 pr-2 md:p-0">
            <MapPin className="w-4 h-4 text-[#042C89] shrink-0" />
            <input
              type="text"
              placeholder="Enter your postcode or town"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 min-w-0 bg-transparent px-3 py-3 text-[#042C89] placeholder-[#6B7280] text-[13px] lg:text-[15px] outline-none font-['Poppins',sans-serif]"
            />
          </div>
          <button
            type="submit"
            className="w-full md:w-auto shrink-0 bg-[#0DD180] hover:bg-[#0bbd73] active:scale-95 text-[#042C89] font-['Poppins',sans-serif] font-bold text-[13px] lg:text-[15px] px-6 lg:px-8 py-3.5 md:py-3 lg:py-3.5 rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap"
          >
            Find a camp
          </button>
        </form>

        {/* ===== Results header ===== */}
        <div className="mt-6 md:mt-10 mx-auto max-w-[1150px] flex items-center justify-between">
          <p className="font-['Poppins',sans-serif] font-bold text-white text-[13px] lg:text-[15px]">
            Camps near {query.trim() ? query.trim().toUpperCase() : 'SW10'}
          </p>
          <p className="font-['Poppins',sans-serif] font-semibold text-[#C9D3F0] text-[11px] lg:text-[13px]">Showing 3 of 9</p>
        </div>

        {/* ===== Camp cards ===== */}
        <div className="mt-3 md:mt-4 mx-auto max-w-[1150px] grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
          {CAMPS.map((c) => {
            const st = STATUS_STYLES[c.status];
            return (
              <div key={c.name} className="bg-white rounded-[20px] p-5 lg:p-6 shadow-xl text-left flex flex-col">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-['Poppins',sans-serif] font-bold text-[#042C89] text-[16px] lg:text-[18px] leading-tight">
                    {c.name}
                  </h3>
                  <span className="font-['Poppins',sans-serif] font-semibold text-[#4B5268] text-[11px] lg:text-[13px] whitespace-nowrap">
                    {c.distance}
                  </span>
                </div>

                {/* Mobile: venue row + status pill on same line */}
                <ul className="mt-3 space-y-2.5">
                  <li className="flex items-center justify-between gap-2 font-['Poppins',sans-serif] text-[#4B5268] text-[12px] lg:text-[13.5px]">
                    <span className="flex items-center gap-2.5 min-w-0">
                      <MapPin className="w-3.5 h-3.5 text-[#9AA3B5] shrink-0" />
                      <span className="truncate md:whitespace-normal">{c.venue}</span>
                    </span>
                    <span className={`${st.pill} md:hidden inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-['Poppins',sans-serif] font-semibold text-[10.5px] whitespace-nowrap shrink-0`}>
                      <span className={`${st.dot} w-1.5 h-1.5 rounded-full`} />
                      {c.statusText}
                    </span>
                  </li>
                  <li className="flex items-center gap-2.5 font-['Poppins',sans-serif] font-semibold text-[#042C89] text-[12px] lg:text-[13.5px]">
                    <Calendar className="w-3.5 h-3.5 text-[#00A6E3] shrink-0" />
                    {c.dates}
                  </li>
                  <li className="flex items-center gap-2.5 font-['Poppins',sans-serif] font-semibold text-[#042C89] text-[12px] lg:text-[13.5px]">
                    <Clock className="w-3.5 h-3.5 text-[#00A6E3] shrink-0" />
                    {c.time}
                  </li>
                </ul>

                <div className="mt-5 flex items-center justify-between gap-3">
                  {/* Desktop status pill */}
                  <span className={`${st.pill} hidden md:inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-['Poppins',sans-serif] font-semibold text-[10.5px] lg:text-[12px] whitespace-nowrap`}>
                    <span className={`${st.dot} w-1.5 h-1.5 rounded-full`} />
                    {c.statusText}
                  </span>

                  {c.status === 'full' ? (
                    <button
                      type="button"
                      onClick={() => openModal('venue')}
                      className="w-full md:w-auto bg-[#E6F4FB] hover:bg-[#d3ebf7] text-[#042C89] font-['Poppins',sans-serif] font-bold text-[11.5px] lg:text-[13px] px-4 lg:px-5 py-3 md:py-2.5 rounded-full transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Join waiting list
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={goVenues}
                      className="w-full md:w-auto bg-[#042C89] hover:bg-[#021840] text-white font-['Poppins',sans-serif] font-bold text-[11.5px] lg:text-[13px] px-4 lg:px-5 py-3 md:py-2.5 rounded-full transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Book this camp
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* ===== See all ===== */}
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={goVenues}
            className="inline-flex items-center gap-1.5 text-[#FFDE14] hover:underline font-['Poppins',sans-serif] font-bold text-[12px] lg:text-[14px] cursor-pointer"
          >
            See all camps near you <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </Container>
    </section>
  );
}

export { Section3 as CampSearchBanner };
export default Section3;