import React from 'react';
import { Container } from '../../../components/common/Container';
import { useModal } from '../../../context/ModalContext';

// Background & Assets
import momentBanner from 'https://webstepdev.com/demo/syncoWebsiteImages/momentBanner.png';
import pickRioMascot from 'https://webstepdev.com/demo/syncoWebsiteImages/birthday-party/pickrio.png';
import silverBall from 'https://webstepdev.com/demo/syncoWebsiteImages/birthday-party/silver.png';
import goldBall from 'https://webstepdev.com/demo/syncoWebsiteImages/gold.png';
import greenCheck from 'https://webstepdev.com/demo/syncoWebsiteImages/birthday-party/greencheck.png';
import whiteCheck from 'https://webstepdev.com/demo/syncoWebsiteImages/birthday-party/whitecheck.png';
import clockIcon from 'https://webstepdev.com/demo/syncoWebsiteImages/birthday-party/clock.png';
import userIcon from 'https://webstepdev.com/demo/syncoWebsiteImages/birthday-party/user.png';

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
      className="relative w-full overflow-hidden px-6 md:px-0  lg:py-12 md:pt-[180px] pt-16 pb-14"
      style={{
        backgroundImage: `url(${momentBanner})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Container className="relative z-10">
        <div className="pick-a-party-grid grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 max-w-[1215px] m-auto items-center">
          {/* Left Column: Mascot with Balloons & Big Heading */}
          <div className="pick-a-party-title-col lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* 3D Mascot with balloons */}
           

            {/* Heading */}
            <h2 className="gasoek text-[46px] xs:text-[54px] sm:text-[60px] md:text-[52px] lg:text-[67px] relative leading-[1.02]">
            

               <div className="flex items-end mb-4">
                  <span className="text-[#FFDE14] block">
                Pick
              </span>
              <img
                src={pickRioMascot}
                alt="Samba Mascot with balloons"
                className="pick-rio-mascot w-full absolute top-[-51px] md:top-[-120px] lg:top-[-140px] xl:top-[-200px] -right-[1rem] md:right-0 lg:right-[-1rem] xl:right-[-2.5rem] w-[200px] h-[130px] md:w-[300px] md:h-[220px] lg:w-[320px] lg:h-[240px] xl:w-[450px] xl:h-[330px] object-contain"
              />
            </div>
              <span className="text-white block">
                their party
              </span>
            </h2>
          </div>

          {/* Right Column: 2 Cards (Silver & Gold) */}
          <div className="pick-a-party-cards-col lg:col-span-7">
            <div className="pick-a-party-cards-grid grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-[660px] mx-auto lg:max-w-[600px] lg:ms-auto items-stretch">
              {/* 1. SILVER CARD */}
              <div className="pick-party-card bg-white rounded-[20px] p-5 border-8 border-[#CBD4E1] relative flex flex-col justify-between overflow-hidden">
                {/* Top-Right Soccer Ball Illustration */}
                <div className="flex justify-end  pointer-events-none">
                  <img src={silverBall} alt="" className="w-[100px] md:w-[96px] lg:w-[126px] h-full object-contain" />
                </div>

                <div>
                  {/* Card Title & Price */}
                  <div className="text-left mb-6 mt-3">
                    <span className="gasoek text-[#0DD180] text-2xl sm:text-[32px] block uppercase tracking-wide">
                      SILVER
                    </span>
                    <span translate="no" className="notranslate gasoek text-[#00A6E3] text-[44px] sm:text-[54px] md:text-[46px] lg:text-[64px] leading-none block mt-1">
                     £175
                    </span>
                  </div>

                  {/* Friends & Duration */}
                  <div className="space-y-3 mb-6 mt-16 text-left">
                    <div className="flex items-center gap-2.5 text-[#042C89] poppins font-semibold text-sm sm:text-[14px]">
                      <img src={userIcon} alt="" className="w-4 h-4" />
                      <span>Up to 12 friends</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-[#042C89] poppins font-semibold text-sm sm:text-[14px]">
                      <img src={clockIcon} alt="" className="w-4 h-4" />
                      <span>75 minutes</span>
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-3 text-left mb-8">
                    <div className="flex items-center gap-2.5 text-[#797A88] poppins text-xs sm:text-[14px] font-normal">
                      <img src={greenCheck} alt="" className="w-3.5 h-3.5 object-contain shrink-0" />
                      <span>One Samba Soccer coach</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-[#797A88] poppins text-xs sm:text-[14px] font-normal">
                      <img src={greenCheck} alt="" className="w-3.5 h-3.5 object-contain shrink-0" />
                      <span>Football games & challenges</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-[#797A88] poppins text-xs sm:text-[14px] font-normal">
                      <img src={greenCheck} alt="" className="w-3.5 h-3.5 object-contain shrink-0" />
                      <span>Branded invitations</span>
                    </div>
                  </div>
                </div>

                {/* Button */}
                <button
                  onClick={() => handleEnquire('Silver')}
                  className="w-full bg-[#042C89] hover:bg-[#021840] text-white font-semibold py-2  rounded-full text-center text-sm sm:text-[12px] poppins "
                >
                  Enquire about silver
                </button>
              </div>

              {/* 2. GOLD CARD */}
              <div className="pick-party-card bg-[#FFDE14] mt-8 md:mt-0 rounded-[20px] p-5 shadow-2xl relative flex flex-col justify-between overflow-hidden">
                {/* Top-Right Soccer Ball Illustration */}
                <div className="flex justify-end mt-8 pointer-events-none">
                  <img src={goldBall} alt="" className="w-[100px] md:w-[96px] lg:w-[126px] h-full object-contain" />
                </div>

                <div>
                  {/* Card Title & Price */}
                  <div className="text-left mb-6">
                    <span className="gasoek text-[#042C89] text-2xl sm:text-[32px] block uppercase tracking-wide">
                      GOLD
                    </span>
                    <span translate="no" className="notranslate gasoek text-[#042C89] text-[44px] sm:text-[54px] md:text-[46px] lg:text-[64px] leading-none block mt-1">
                      £310
                    </span>
                  </div>

                  {/* Friends & Duration */}
                  <div className="space-y-3 mb-6 text-left">
                    <div className="flex items-center gap-2.5 text-[#042C89] poppins font-semibold text-sm sm:text-[14px]">
                      <img src={userIcon} alt="" className="w-4 h-4 object-contain shrink-0" />
                      <span>Up to 20 friends</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-[#042C89] poppins font-semibold text-sm sm:text-[14px]">
                      <img src={clockIcon} alt="" className="w-4 h-4 object-contain shrink-0" />
                      <span>90 minutes</span>
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-3 text-left mb-8">
                    <div className="flex items-start gap-2.5 text-[#042C89] poppins text-xs sm:text-[14px] font-normal">
                      <img src={whiteCheck} alt="" className="w-3.5 h-3.5 object-contain shrink-0 mt-0.5" />
                      <span>Two Samba Soccer coaches</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-[#042C89] poppins text-xs sm:text-[14px] font-normal">
                      <img src={whiteCheck} alt="" className="w-3.5 h-3.5 object-contain shrink-0 mt-0.5" />
                      <span>Football games & challenges</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-[#042C89] poppins text-xs sm:text-[14px] font-normal">
                      <img src={whiteCheck} alt="" className="w-3.5 h-3.5 object-contain shrink-0 mt-0.5" />
                      <span>Branded invitations</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-[#042C89] poppins text-xs sm:text-[14px] font-normal">
                      <img src={whiteCheck} alt="" className="w-3.5 h-3.5 object-contain shrink-0 mt-0.5" />
                      <span>Medals for competition winners</span>
                    </div>
                  </div>
                </div>

                {/* Button */}
                <button
                  onClick={() => handleEnquire('Gold')}
                  className="w-full bg-[#042C89] hover:bg-[#021840] text-white font-semibold py-2  rounded-full text-center text-sm sm:text-[12px] poppins "
                >
                  Enquire about gold
                </button>
              </div>
            <p className="poppins col-span-1 md:col-span-2 italic text-white text-xs sm:text-[14px] mt-6 md:mt-4 lg:mt-0 font-medium text-center pr-2">
              Venue hire, food and drinks are not included.
            </p>
            </div>

            {/* Disclaimer Footnote */}
          </div>
        </div>
      </Container>

      {/* Bottom accent stripe */}
    </section>
  );
}

export default PickAParty;
