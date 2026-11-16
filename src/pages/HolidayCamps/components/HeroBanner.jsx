import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../../../components/common/Container';
import { useModal } from '../../../context/ModalContext';

const heroBg = 'https://webstepdev.com/demo/syncoWebsiteImages/holiday-camps/hero_banner.png';
const heroBgMb = 'https://webstepdev.com/demo/syncoWebsiteImages/holiday-camps/hero_mobile.png';
const bannerLayer = 'https://webstepdev.com/demo/syncoWebsiteImages/holiday-camps/banner_layer.png';

export function HeroBanner() {
  const [postcode, setPostcode] = useState('');
  const { openModal } = useModal();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (postcode.trim()) {
      navigate(`/venues?postcode=${encodeURIComponent(postcode.trim())}`);
    } else {
      openModal('venue');
    }
  };

  const pillBadges = [
    '12 skills to master',
    'More time on the ball',
    'One Copa de Samba finale.',
  ];

  return (
    <section className="relative w-full px-2 md:px-0 overflow-hidden 2xl:min-h-[720px] flex items-center bg-[#071b40]">
      {/* Background Hero Image */}
      <img
        src={heroBg}
        alt="Skills Accelerator Holiday Camps"
        className="hidden md:block absolute inset-0 w-full h-full object-cover object-[70%_center] md:object-top pointer-events-none select-none z-0"
      />
      <img
        src={heroBgMb}
        alt="Skills Accelerator Holiday Camps"
        className="md:hidden absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none z-0"
      />

      {/* Content Container */}
      <Container className="relative z-10 w-full pt-16 pb-12 sm:py-24 lg:pb-[120px] lg:pt-[130px] 2xl:pb-[160px] 2xl:pt-[160px]">
        <div className="holiday-camps-hero-content text-left lg:max-w-[75%]">
          {/* Main 2-Line Heading */}
          <h1 className="gasoek text-white uppercase text-[36px] md:text-[56px] xl:text-[67px] 2xl:text-[72px] leading-[1.2] md:leading-[1.02]">
            SKILLS ACCELERATOR <br />
            <span className="text-[#FFE600]">HOLIDAY <br className="md:hidden block" /> CAMPS</span>
          </h1>

          {/* Subheading */}
          <p className="poppins font-bold text-white text-[17px] sm:text-[20px] md:text-[22px] xl:text-[28px] 2xl:text-[31px] mt-4 sm:mt-5 mb-6 leading-snug">
            Four days. Six Brazilian legends. Twelve skills to master.
          </p>

          {/* Description Paragraph */}
          <p className="poppins text-[#FDFDFF] text-[14px] sm:text-[15px] md:text-[18px] leading-relaxed mb-6 font-normal">
            Turn the school holidays into four days of Samba. An action-packed Road to Rio adventure filled 
            with ball mastery, Brazilian legends, new skills and a Copa de Samba finale.
          </p>

          {/* 3 Dark Olive/Gold Pill Badges */}
          <div className="flex md:flex-row flex-col flex-wrap md:items-center gap-2 sm:gap-3 mb-7">
            {pillBadges.map((badge, idx) => (
              <span
                key={idx}
                className="inline-flex items-center w-max px-4 sm:px-5 py-2 rounded-full text-white text-[12px] sm:text-[18px] font-semibold bg-[#7F7C56] poppins"
              >
                {badge}
              </span>
            ))}
          </div>

          {/* Postcode Search Input Bar */}
          <form
            onSubmit={handleSearch}
            className="flex items-center md:flex-row flex-col rounded-[20px] bg-white md:rounded-full p-2 pb-3 sm:p-4 max-w-[640px] w-full shadow-2xl transition-shadow focus-within:shadow-emerald-500/20"
          >
            <input
              type="text"
              placeholder="Enter your postcode"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
              className="flex-1 min-w-0 bg-transparent text-center md:text-start px-3.5 sm:px-5 md:py-2 py-5 text-slate-800 placeholder-[#475569] text-sm sm:text-[16px] outline-none poppins"
            />
            <button
              type="submit"
              className="bg-[#0DD180] w-full md:w-max hover:bg-[#0bbd73] active:scale-95 text-white font-semibold text-xs sm:text-[16px] px-4 sm:px-6 py-2.5 sm:py-4 rounded-full transition-all duration-200 cursor-pointer poppins whitespace-nowrap"
            >
              Find a holiday camp
            </button>
          </form>
        </div>
      </Container>

      {/* Bottom Wave Curve Overlay */}
      <img
        src={bannerLayer}
        alt=""
        aria-hidden="true"
        className="absolute md:block hidden bottom-0 left-0 w-full pointer-events-none select-none z-10 translate-y-[2px]"
      />
    </section>
  );
}

export default HeroBanner;