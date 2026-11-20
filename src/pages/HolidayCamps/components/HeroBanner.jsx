import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Star, Calendar, Clock, Users } from 'lucide-react';
import { Container } from '../../../components/common/Container';
import { useModal } from '../../../context/ModalContext';

const BASE = 'https://webstepdev.com/demo/syncoWebsiteImages/holiday-camps';
const img = (name, ext = 'png') => `${BASE}/${encodeURIComponent(name)}.${ext}`;
const SWOOSH = 'https://webstepdev.com/demo/syncoWebsiteImages/roadtorio/Swoosh.png';
const GOOGLE = 'https://webstepdev.com/demo/syncoWebsiteImages/google.png';

// hideMobile: mobile pe nahi dikhega (screenshot me sirf 3 pills hain)
const PILLS = [
  { icon: Calendar, text: '4 days' },
  { icon: Clock, text: '4 hours a day' },
  { icon: Users, text: 'Ages 4–12' },
  { icon: Star, text: 'All abilities', hideMobile: true },
];

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

  return (
    <section className="relative w-full overflow-hidden bg-[#042C89]">
      {/* Background */}
      <img
        src={img('skillaccleratorbg')}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-bottom pointer-events-none select-none z-0"
      />

      <Container className="relative z-10 px-5 lg:px-8 pt-8 pb-16 lg:pt-[100px] lg:pb-[100px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">
          {/* ===== Left ===== */}
          <div className="lg:col-span-6">
            <h1 className="leading-[1.1]">
              <span className="block font-['Recline',sans-serif] font-bold text-white text-[34px] sm:text-[44px] lg:text-[54px]">
                Skills Accelerator
              </span>
              <span className="relative inline-block font-['Gasoek_One',sans-serif] text-[#0DD180] text-[40px] sm:text-[52px] lg:text-[68px] mt-1">
                holiday camps.
                <img src={SWOOSH} alt="" aria-hidden="true" className="absolute left-0 -bottom-2 w-full h-auto pointer-events-none select-none" />
              </span>
            </h1>

            <p className="mt-6 lg:mt-8 font-['Poppins',sans-serif] font-bold text-white text-[16px] sm:text-[18px] lg:text-[21px] leading-snug">
              Four days. Six Brazilian legends. Twelve skills to master.
            </p>

            <p className="mt-3 max-w-[540px] font-['Poppins',sans-serif] text-white text-[14px] lg:text-[17px] leading-relaxed">
              Turn the school holidays into four days of Samba: an action-packed Road to Rio adventure with ball
              mastery, new skills and a Copa de Samba finale.
            </p>

            {/* Search: mobile = input + alag full-width button, desktop = single pill */}
            <form
              onSubmit={handleSearch}
              className="mt-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-0 lg:bg-white lg:rounded-full lg:border-[5px] lg:border-white/90 lg:pl-4 lg:pr-1.5 lg:py-1.5 max-w-[540px] lg:shadow-2xl"
            >
              <div className="flex items-center flex-1 min-w-0 bg-white rounded-full pl-4 pr-2 py-1 lg:bg-transparent lg:p-0">
                <MapPin className="w-4 h-4 text-[#042C89] shrink-0" />
                <input
                  type="text"
                  placeholder="Enter your postcode or town"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                  className="flex-1 min-w-0 bg-transparent px-3 py-3 lg:py-2.5 text-[#042C89] placeholder-[#6B7280] text-[14px] lg:text-[15px] outline-none font-['Poppins',sans-serif]"
                />
              </div>
              <button
                type="submit"
                className="w-full lg:w-auto bg-[#0DD180] hover:bg-[#0bbd73] active:scale-95 text-[#042C89] font-['Poppins',sans-serif] font-bold text-[15px] lg:text-[15px] px-4 lg:px-6 py-3.5 lg:py-3 rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap"
              >
                Find a holiday camp
              </button>
            </form>

            {/* Pills */}
            <div className="mt-5 flex flex-wrap gap-2 lg:gap-2.5">
              {PILLS.map(({ icon: Icon, text, hideMobile }) => (
                <span
                  key={text}
                  className={`${
                    hideMobile ? 'hidden sm:inline-flex' : 'inline-flex'
                  } items-center gap-1.5 lg:gap-2 bg-[#12399B] lg:bg-[#042C89] border border-white/10 text-white font-['Poppins',sans-serif] font-semibold text-[11.5px] lg:text-[13.5px] px-3 lg:px-4 py-2 rounded-full whitespace-nowrap`}
                >
                  <Icon className="w-3.5 h-3.5 text-[#FFDE14]" />
                  {text}
                </span>
              ))}
            </div>
          </div>

          {/* ===== Right: photo + floating cards ===== */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end mt-2 mb-14 lg:mt-0 lg:mb-0">
            <div className="relative w-full max-w-[480px] lg:max-w-none lg:w-[520px] lg:h-[560px]">
              <img
                src={img('holidaymainimg')}
                alt="Child at Skills Accelerator holiday camp"
                className="w-full h-auto lg:h-full object-cover rounded-[20px] lg:rounded-[32px]"
              />

              {/* Rating card */}
              <div className="absolute -top-5 right-2 lg:-top-6 lg:-right-8 bg-white rounded-[14px] lg:rounded-[16px] shadow-xl px-4 py-3 flex items-center gap-3">
                <span className="font-['Poppins',sans-serif] font-bold text-[#042C89] text-[24px] lg:text-[30px] leading-none">
                  4.8
                </span>
                <div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-[#FFDE14] text-[#FFDE14]" />
                    ))}
                  </div>
                  <p className="font-['Poppins',sans-serif] font-semibold text-[#797A88] text-[11px] lg:text-[12px] mt-1">
                    Google rating
                  </p>
                </div>
              </div>

              {/* Review card */}
              <div className="absolute left-3 right-3 -bottom-12 lg:left-[-45px] lg:right-auto lg:bottom-[30px] lg:w-[260px] bg-white rounded-[14px] lg:rounded-[16px] shadow-xl p-4">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <img src={GOOGLE} alt="Google" className="w-4 h-4 object-contain" />
                    <span className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-2.5 h-2.5 fill-[#FFDE14] text-[#FFDE14]" />
                      ))}
                    </span>
                  </span>
                  <span className="font-['Poppins',sans-serif] font-semibold text-[#797A88] text-[10px] lg:text-[11.5px]">
                    Google review
                  </span>
                </div>

                <p className="mt-2.5 font-['Poppins',sans-serif] font-bold text-[#042C89] text-[12px] lg:text-[13.5px] leading-snug">
                  “My son attended the summer camp this year and had an amazing time! The coaches created such a
                  memorable, fun and educational atmosphere!”
                </p>

                <div className="mt-3 pt-3 border-t border-[#E5EAF3] flex items-center gap-2.5">
                  <img src={img('Avatar')} alt="" className="w-8 h-8 rounded-full object-cover shrink-0" />
                  <div>
                    <p className="font-['Poppins',sans-serif] font-bold text-[#042C89] text-[12px] lg:text-[13px] leading-tight">
                      Huda Almashjari
                    </p>
                    <p className="font-['Poppins',sans-serif] text-[#7A8199] text-[10px] lg:text-[11.5px] mt-0.5">
                      Parent · Summer holiday camp
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default HeroBanner;