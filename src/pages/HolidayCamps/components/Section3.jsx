import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../../../components/common/Container';
import { useModal } from '../../../context/ModalContext';
import blueBgTexture from 'https://webstepdev.com/demo/syncoWebsiteImages/bluetexturedbg.png';

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

  return (
    <section className="relative w-full overflow-hidden bg-[#042C89] py-14 sm:py-16">
      {/* Blue Textured Pattern Background */}
      <img
        src={blueBgTexture}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover opacity-75 pointer-events-none select-none z-0"
      />

      <Container className="relative z-10 w-full text-center">
        <div className="max-w-[700px] mx-auto flex flex-col items-center">
          {/* Badge Pill */}
          <div className="inline-block bg-white/10  px-4 py-1 rounded-full mb-4 sm:mb-5 backdrop-blur-xs">
            <span className="text-[#0DD180] text-[11px] sm:text-[14px] font-bold  uppercase poppins">
              FIND A SKILLS ACCELERATOR CAMP
            </span>
          </div>

          {/* Heading */}
          <h2 className="gasoek uppercase text-[34px] sm:text-[40px] leading-[1.2] md:leading-[1.06] mb-3">
            <span className="text-[#FFE600] block">FOUR DAYS OF SAMBA.</span>
            <span className="text-white block">SOMEWHERE NEAR YOU.</span>
          </h2>

          {/* Subtext */}
          <p className="poppins text-white text-[14px] text-white sm:text-[16px] font-medium mb-7 ">
            Enter your postcode to see upcoming camps, dates and availability.
          </p>

          {/* Search Form */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center md:flex-row flex-col bg-white rounded-[12px] p-3  md:rounded-full  sm:p-2 max-w-[800px] w-full shadow-2xl transition-all focus-within:ring-2 focus-within:ring-[#0DD180]"
          >
            <input
              type="text"
              placeholder="Enter postcode or town"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 min-w-0 bg-transparent text-center md:text-start px-4 sm:px-5 py-4 md:py-2 text-[#475569] placeholder-[#475569] text-sm sm:text-base outline-none poppins"
            />
            <button
              type="submit"
              className="shrink-0 w-full md:w-max md bg-[#0DD180] hover:bg-[#0bbd73] active:scale-95 text-white font-semibold text-xs sm:text-[18px] px-5 sm:px-7 py-2.5 sm:py-4 rounded-full transition-all duration-200 cursor-pointer shadow-sm poppins whitespace-nowrap"
            >
              Find a camp
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
}

export { Section3 as CampSearchBanner };
export default Section3;
