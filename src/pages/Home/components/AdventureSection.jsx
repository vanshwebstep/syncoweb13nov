import React from 'react';
import { Container } from '../../../components/common/Container';
import { useModal } from '../../../context/ModalContext';

import texture1 from 'https://webstepdev.com/demo/syncoWebsiteImages/skill-tracker.png';
import vector from 'https://webstepdev.com/demo/syncoWebsiteImages/bluevector.png';
import adventureCardsImg from 'https://webstepdev.com/demo/syncoWebsiteImages/home/adventure-sticker-album-cards-alt.png';
import { useNavigate } from 'react-router-dom';

export function AdventureSection() {
  const { openModal } = useModal();
const navigate = useNavigate();
  return (
    <section
      className="py-16 pt-[100px] md:py-[80px] lg:py-[80px] xl:py-[110px] 2xl:py-[130px] md:pb-[60px] lg:pb-[90px] xl:pb-[130px] 2xl:pb-[160px] bg-[#f8fafc] text-slate-800 relative overflow-hidden font-sans"
      style={{
        backgroundImage: `url(${texture1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'multiply'
      }}
    >
      <Container className="relative z-10">
        <div className="flex flex-col md:flex-row relative gap-8 md:gap-0 lg:gap-12 items-center">

          {/* Left Column: Brazilian Sticker Album & Badges Collage */}
          <div className="flex justify-center items-center md:items-start w-full md:w-auto">
            <div className="adventure-sticker-image relative md:absolute md:left-0 xl:-left-4 2xl:-left-10 md:top-4 lg:-top-4 w-full max-w-[460px] sm:max-w-[500px] md:w-[280px] min-[900px]:w-[320px] lg:w-[380px] xl:w-[540px] 2xl:w-[660px] xl:max-w-none flex items-center justify-center">
              <img
                src={adventureCardsImg}
                alt="Samba Road to Rio Sticker Adventure"
                className="w-full object-contain drop-shadow-2xl hover:scale-103 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Right Column: Title, Road to Rio Badge, Description & CTA */}
          <div className="adventure-text-content w-full md:w-[415px] min-[900px]:w-[600px] min-[1200px]:w-[640px]  xl:w-[600px] 2xl:w-[640px] ms-auto space-y-5 md:space-y-4 lg:space-y-6 mt-6 md:mt-0">

            {/* Header Row + Green Badge */}
            <div className="flex flex-col sm:flex-row items-center sm:items-end justify-center md:justify-between gap-4">
              {/* Header Title */}
              <div className="text-center md:text-start">
                <h2 className="adventure-heading-top text-center md:text-start recline font-bold text-[57px] md:text-[48px] lg:text-[48px] xl:text-[62px] 2xl:text-[70px] text-[#042C89] leading-[0.5] md:leading-[1] lg:leading-[1] xl:leading-[0.5]">
                  One big
                </h2>
                <h3 className="adventure-heading-bottom text-center md:text-start gasoek text-[53px] md:text-[48px] lg:text-[48px] xl:text-[62px] 2xl:text-[70px] font-normal tracking-[1px] text-[#0DD180] relative inline-block">
                  adventure
                  <img className=" md:mt-2 mt-[-8px] lg:mt-2 md:-rotate-2 -rotate-[5deg] w-full md:w-[90%] h-6 md:h-5 lg:h-7 text-[#00A6E3]" src={vector} alt="" />

                </h3>
              </div>

              {/* Road to Rio 38 Sessions Green Badge */}
              <div className="road-to-rio-badge bg-[#0DD180] absolute max-[340px]:right-[5px] max-[340px]:top-[-50px] top-[-44px] right-5 md:relative rounded-[22px] md:rounded-[24px] lg:rounded-[28px] xl:rounded-[34px] 2xl:rounded-[38px] gasoek p-2.5 md:p-3 xl:p-4 2xl:p-5 text-center shrink-0 min-w-[110px] md:min-w-[115px] lg:min-w-[125px] xl:min-w-[135px] 2xl:min-w-[150px]">
                <span className="road-to-rio-badge-top block text-white text-[12px] md:text-[12px] lg:text-[14px] xl:text-[18px] 2xl:text-[22px] uppercase">
                  ROAD TO RIO
                </span>
                <span className="road-to-rio-badge-number block tracking-[1px] xl:tracking-[2px] text-4xl md:text-[38px] lg:text-[48px] xl:text-[68px] 2xl:text-[80px] text-[#FFDE14] font-bold leading-none my-0.5 xl:my-1 ">
                  38
                </span>
                <span className="road-to-rio-badge-bottom block text-[#042C89] text-[16px] md:text-[17px] lg:text-[20px] xl:text-[26px] 2xl:text-[32px] lowercase">
                  sessions
                </span>
              </div>
            </div>

            {/* Paragraphs */}
            <div className="space-y-3.5 md:space-y-3 lg:space-y-4 xl:space-y-5 2xl:space-y-6 poppins text-[#042C89] px-3 md:px-0 text-[16.9px] sm:text-[16px] md:text-[16px] lg:text-[16px] xl:text-[18.6px] 2xl:text-[20px] leading-relaxed font-medium pt-2 md:pt-3 lg:pt-4">
              <p>
                Road to Rio is how we turn weekly training sessions into a year-long adventure through Brazil, building towards one huge end of year tournament – the Copa de Samba.
              </p>

              <p>
                Every six weeks brings a new Brazilian city, a new football hero and new skills for children to discover.
              </p>

              <p className="font-bold text-[#042C89] text-base sm:text-[18px] md:text-[13.5px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px] pt-0.5 md:pt-1">
                Learn it. Practise it. Master it.
              </p>

              <p>
                Then comes Showcase Week – a chance to put those skills into play, earn the next badge and keep moving towards Rio.
              </p>

              <p className="font-bold text-[#00A6E3] text-[16px] sm:text-[18px] md:text-[13.5px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px] pt-0.5 md:pt-1">
                New skills. New challenges. One unforgettable year of football.
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-1">
              <button
              onClick={()=>navigate('/road-to-rio')}
                className="md:bg-[#042C89] bg-[#0DD180] hover:bg-[#021840] w-full md:w-max poppins md:text-white text-[#042C89] font-bold text-[16px] md:text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px] px-7 md:px-6 lg:px-7 xl:px-7 2xl:px-8 py-3.5 md:py-3 lg:py-3.5 xl:py-3.5 2xl:py-4 rounded-full shadow-xl transition-all cursor-pointer inline-flex items-center justify-center"
              >
                Discover Road To Rio
              </button>
            </div>

          </div>

        </div>
      </Container>
    </section>
  );
}
