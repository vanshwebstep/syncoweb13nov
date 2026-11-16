import React from 'react';
import { Container } from '../../../components/common/Container';
import { useModal } from '../../../context/ModalContext';
import ctaPhoto from 'https://webstepdev.com/demo/syncoWebsiteImages/venues/ready.png';
import final_cta from 'https://webstepdev.com/demo/syncoWebsiteImages/final-cta.png';
import { useVenue } from '../VenueContext';

export function ReadyToBeginCTABanner() {
  const { venue, venueName, area } = useVenue();
  const { openModal } = useModal();
  const locationLabel = area || venueName;

  return (
    <section className="py-16 bg-[#f8fafc] relative overflow-hidden font-sans ">
      <Container>
        
        {/* Outer Wavy Brazilian Banner Card */}
        <div style={{
                backgroundImage: `url(${final_cta})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundBlendMode: 'multiply'
              }} className=" p-4 sm:p-12 relative rounded-[60px] ">
          
          {/* Inner White Box Container */}
          <div className="bg-white relative rounded-[60px] p-6 sm:p-10 shadow-xl z-10 mx-auto max-w-[940px] flex flex-col lg:flex-row items-center justify-between gap-6 border border-slate-100">
            
            {/* Photo Frame for Mobile/Tablet (<xl) */}
            <div className="flex xl:hidden justify-center items-center mb-4 lg:mb-0 lg:w-[300px] shrink-0 rounded-3xl transform -rotate-2">
              <img
                src={ctaPhoto}
                alt="Coach with student"
                className="w-full h-auto rounded-3xl shadow-lg"
              />
            </div>

            {/* Left Tilted Photo Frame (Green Border) - Desktop/Laptop (>=xl) only */}
            <div className="hidden xl:block xl:w-[400px] absolute top-[-10px] xl:left-[-150px] rounded-3xl transform -rotate-3">
              <img
                src={ctaPhoto}
                alt="Coach with student"
                className="w-full h-full rounded-3xl"
              />
            </div>

            {/* Right Content Column */}
            <div className="text-center lg:text-left space-y-3 max-w-[540px] xl:max-w-[592px] w-full xl:ml-auto">
              
              {/* Top Subtitle */}
              <p className="recline text-sm sm:text-[28px] text-[#042C89]">
                The road begins in {locationLabel} but ends in Rio.
              </p>

              {/* Headline */}
              <h2 className="gasoek text-3xl sm:text-4xl lg:text-[44px] xl:text-[52px] text-[#0DD180] leading-[1.2] tracking-[1.5px]">
                Is your child ready
                to begin?
              </h2>

              {/* Paragraph Copy */}
              <p className="text-[#475569] poppins font-medium text-xs sm:text-[20px] leading-relaxed">
                Come and experience a free Samba Skills Discovery at {venueName} — meet their Samba Stars, find their starting level and begin the adventure.
              </p>

              {/* Dark Navy Button */}
              <div className="pt-2">
                <button
                  onClick={() => openModal('booking', { venueName, area })}
                  className="bg-[#052975] hover:bg-[#042C89] text-white font-bold poppins text-xs sm:text-[20px] px-8 py-5 rounded-full shadow-lg transition-all cursor-pointer inline-block"
                >
                  Book a free discovery call
                </button>
              </div>

            </div>

          </div>

        </div>

      </Container>
    </section>
  );
}
