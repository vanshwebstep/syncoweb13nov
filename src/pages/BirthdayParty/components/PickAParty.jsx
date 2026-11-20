import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Container } from '../../../components/common/Container';
import { useModal } from '../../../context/ModalContext';

import silverBall from 'https://webstepdev.com/demo/syncoWebsiteImages/birthday-party/silver.png';
import goldBall from 'https://webstepdev.com/demo/syncoWebsiteImages/gold.png';
import greenCheck from 'https://webstepdev.com/demo/syncoWebsiteImages/birthday-party/greencheck.png';
import whiteCheck from 'https://webstepdev.com/demo/syncoWebsiteImages/birthday-party/whitecheck.png';
import clockIcon from 'https://webstepdev.com/demo/syncoWebsiteImages/birthday-party/clock.png';
import userIcon from 'https://webstepdev.com/demo/syncoWebsiteImages/birthday-party/user.png';
import bgImage from 'https://webstepdev.com/demo/syncoWebsiteImages/birthday-party/bgaakadnj.png';
import underline from 'https://webstepdev.com/demo/syncoWebsiteImages/roadtorio/whiteline.png';

const PACKAGES = [
  {
    id: 'Silver',
    title: 'SILVER',
    price: '£175',
    friends: 'Up to 12 friends',
    duration: '75 minutes',
    features: [
      { text: 'One Samba coach' },
      { text: 'Football games & challenges' },
      { text: 'Branded invitations' },
      { text: 'Medal for the birthday star' },
    ],
    ball: silverBall,
    check: greenCheck,
    cardBg: 'bg-white',
    titleColor: 'text-[#0DD180]',
    priceColor: 'text-[#00A6E3]',
    pillBg: 'bg-[#EEF3FB]',
    textColor: 'text-[#042C89]',
    divider: 'border-[#E5EAF3]',
    popular: false,
  },
  {
    id: 'Gold',
    title: 'GOLD',
    price: '£310',
    friends: 'Up to 20 friends',
    duration: '90 minutes',
    features: [
      { text: 'Two Samba coaches' },
      { text: 'Football games & challenges' },
      { text: 'Branded invitations' },
      { text: 'Medal for the birthday star' },
      { text: 'Medals for the tournament winners', bold: true },
      { text: 'Mini World Cup tournament', bold: true },
    ],
    ball: goldBall,
    check: whiteCheck,
    cardBg: 'bg-[#FFDE14]',
    titleColor: 'text-[#042C89]',
    priceColor: 'text-[#042C89]',
    pillBg: 'bg-white',
    textColor: 'text-[#042C89]',
    divider: 'border-[#042C89]/15',
    popular: true,
  },
];

export function PickAParty() {
  const { openModal } = useModal();

  const handleEnquire = (packageName) => {
    const appSection = document.getElementById('samba-application');
    if (appSection) {
      appSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      openModal('booking', { package: packageName });
    }
  };

  return (
    <section
      id="packages"
      className="relative w-full overflow-hidden px-4 md:px-0 pt-12 pb-10 lg:pt-24 lg:pb-16"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#042C89',
      }}
    >
      <Container className="relative z-10">
        {/* ===== Heading ===== */}
        <div className="text-center">
          <h2 className="leading-[1.1]">
            <span className="block font-['Recline',sans-serif] font-bold text-white text-[30px] sm:text-[40px] lg:text-[46.78px]">
              Pick
            </span>
            <span className="relative inline-block font-['Gasoek_One',sans-serif] text-[#FFDE14] text-[36px] sm:text-[48px] lg:text-[58.47px] mt-1">
              their party.
              <img src={underline} alt="" aria-hidden="true" className="absolute left-0 -bottom-2 w-full h-auto pointer-events-none select-none" />
            </span>
          </h2>
          <p className="mt-4 lg:mt-6 font-['Poppins',sans-serif] text-[#C9D3F0] text-[13px] lg:text-[17px]">
            Two packages to choose from.
          </p>
        </div>

        {/* ===== Cards ===== */}
        <div className="mt-8 lg:mt-10 grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-7 max-w-[760px] mx-auto items-stretch">
          {PACKAGES.map((p) => (
            <div
              key={p.id}
              className={`${p.cardBg} relative flex flex-col rounded-[24px] px-5 pt-5 pb-5 lg:px-7 lg:pt-6 lg:pb-7 overflow-hidden shadow-2xl`}
            >
              {p.popular && (
                <span className="absolute top-4 left-5 bg-[#042C89] text-white font-['Poppins',sans-serif] font-bold text-[8.5px] tracking-wide uppercase px-3 py-1.5 rounded-full">
                  Most popular
                </span>
              )}

              {/* Ball */}
              <div className="flex justify-end pointer-events-none">
                <img src={p.ball} alt="" className="w-[88px] lg:w-[110px] h-auto object-contain" />
              </div>

              {/* Title + price */}
              <div className="-mt-3 lg:-mt-2">
                <span className={`block font-['Gasoek_One',sans-serif] uppercase ${p.titleColor} text-[22px] lg:text-[32px] leading-none`}>
                  {p.title}
                </span>
                <div className="flex items-end gap-2 mt-1">
                  <span
                    translate="no"
                    className={`notranslate font-['Gasoek_One',sans-serif] ${p.priceColor} text-[42px] lg:text-[54.78px] leading-none`}
                  >
                    {p.price}
                  </span>
                  <span className="font-['Poppins',sans-serif] font-medium text-[#6B7280] text-[11px] lg:text-[12.97px] pb-1">
                    per party
                  </span>
                </div>
              </div>

              {/* Pills */}
              <div className="mt-4 flex flex-wrap gap-2">
                <span className={`${p.pillBg} ${p.textColor} inline-flex items-center gap-1.5 font-['Poppins',sans-serif] font-semibold text-[11px] lg:text-[12.51px] px-3 py-1.5 rounded-full`}>
                  <img src={userIcon} alt="" className="w-3.5 h-3.5 object-contain" />
                  {p.friends}
                </span>
                <span className={`${p.pillBg} ${p.textColor} inline-flex items-center gap-1.5 font-['Poppins',sans-serif] font-semibold text-[11px] lg:text-[12.51px] px-3 py-1.5 rounded-full`}>
                  <img src={clockIcon} alt="" className="w-3.5 h-3.5 object-contain" />
                  {p.duration}
                </span>
              </div>

              {/* Divider */}
              <div className={`mt-4 lg:mt-5 border-t ${p.divider}`} />

              {/* Features */}
              <ul className="mt-4 lg:mt-5 space-y-2.5 lg:space-y-3">
                {p.features.map((f) => (
                  <li key={f.text} className="flex items-center gap-2.5">
                    {f.bold ? (
                      <span className="w-[14px] h-[14px] rounded-full bg-[#042C89] flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 text-white stroke-[3.5]" />
                      </span>
                    ) : (
                      <img src={p.check} alt="" className="w-[14px] h-[14px] object-contain shrink-0" />
                    )}
                    <span
                      className={`font-['Poppins',sans-serif] text-[#042C89] text-[12px] lg:text-[13.9px] ${
                        f.bold ? 'font-bold' : 'font-normal'
                      }`}
                    >
                      {f.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Button */}
              <button
                type="button"
                onClick={() => handleEnquire(p.id)}
                className="mt-auto pt-0 w-full"
              >
                <span className="mt-6 lg:mt-8 flex items-center justify-center gap-2 w-full bg-[#042C89] hover:bg-[#021840] text-white font-['Poppins',sans-serif] font-semibold text-[12.5px] lg:text-[13.9px] py-3.5 rounded-full transition-colors cursor-pointer">
                  Enquire about {p.id} <ArrowRight className="w-4 h-4" />
                </span>
              </button>
            </div>
          ))}
        </div>

        {/* Footnote */}
        <p className="mt-5 lg:mt-6 text-center font-['Poppins',sans-serif] text-white/90 text-[11px] lg:text-[13px]">
          Prices are per party. Venue hire, food and drinks aren't included.
        </p>
      </Container>
    </section>
  );
}

export default PickAParty;