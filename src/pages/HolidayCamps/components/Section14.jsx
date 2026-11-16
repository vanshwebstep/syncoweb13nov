import React from 'react';
import { Container } from '../../../components/common/Container';
import { useModal } from '../../../context/ModalContext';
import fourDayBanner from 'https://webstepdev.com/demo/syncoWebsiteImages/texture.png';
import ageIcon from 'https://webstepdev.com/demo/syncoWebsiteImages/holiday-camps/age.png';
import durationIcon from 'https://webstepdev.com/demo/syncoWebsiteImages/holiday-camps/duration.png';
import levelIcon from 'https://webstepdev.com/demo/syncoWebsiteImages/holiday-camps/level.png';
import layer from 'https://webstepdev.com/demo/syncoWebsiteImages/holiday-camps/blue_line.png';
import whatToBringIcon from 'https://webstepdev.com/demo/syncoWebsiteImages/holiday-camps/what_to_bring.png';

export function Section14() {
  const { openModal } = useModal();

  const infoCards = [
    {
      label: 'AGES',
      value: '4 - 12 Years Old',
      img: ageIcon,
      borderColor: 'border-[#0DD180]',
    },
    {
      label: 'DURATION',
      value: 'Four Days',
      img: durationIcon,
      borderColor: 'border-[#00A3E0]',
    },
    {
      label: 'LEVELS',
      value: 'Beginner to Advanced',
      img: levelIcon,
      borderColor: 'border-[#0DD180]',
    },
    {
      label: 'WHAT TO BRING',
      value: 'Kit, snack & water',
      img: whatToBringIcon,
      borderColor: 'border-[#00A3E0]',
    },
  ];

  return (
    <section className="relative w-full overflow-hidden md:py-14 py-8 ">
      {/* Subtle Pattern Background */}
      <img
        src={fourDayBanner}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
      />

      <Container className="relative z-10 w-full text-center">
        {/* Heading with Cyan Curved Underline */}
        <div className="inline-block mb-12 sm:mb-16">
          <h2 className="recline  text-[36px] sm:text-[48px]  leading-[1.04]">
            <span className="text-[#042C89]">Everything you </span> <br />
            <span className=" gasoek text-[#0DD180]">NEED TO KNOW</span>
          </h2>
          {/* Cyan Curved Underline SVG */}
          <div className="flex justify-center ">
         <img src={layer} alt="" className="w-[180px]  text-[#00A3E0]" />

          </div>
        </div>

        {/* 4 Info Cards Grid */}
        <div className="grid grid-cols-1 md:px-0 px-6 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-[1240px] mx-auto text-left mb-12">
          {infoCards.map((card, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-[20px] p-6 sm:p-7 border-r-[5px] border-b-[5px] ${card.borderColor} shadow-lg flex flex-col justify-between min-h-[230px] group transition-all duration-300 hover:-translate-y-2 hover:shadow-xl`}
            >
              {/* Icon Graphic */}
              <div className="h-[95px] flex items-center justify-start mb-4">
                <img
                  src={card.img}
                  alt={card.label}
                  className="max-h-[90px] max-w-[90px] object-contain group-hover:scale-105 transition-transform duration-300 select-none"
                />
              </div>

              {/* Label & Value */}
              <div>
                <p className="poppins text-[#64748B] font-bold text-[13px] sm:text-[14px]  uppercase mb-1">
                  {card.label}
                </p>
                <h3 className="poppins font-extrabold text-[#042C89] text-[18px] 2xl:text-[20px] leading-snug">
                  {card.value}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Button */}
        <div>
          <button
            onClick={() => openModal('venue')}
            className="bg-[#042C89] hover:bg-[#031538] active:scale-95 text-white font-semibold text-[14px] sm:text-[16px] px-7 py-3 rounded-full transition-all duration-200 cursor-pointer poppins"
          >
            Find your nearest camp
          </button>
        </div>
      </Container>
    </section>
  );
}

export { Section14 as NeedToKnowSection };
export default Section14;
