import React from 'react';
import { Container } from '../../../components/common/Container';
import textureBg from 'https://webstepdev.com/demo/syncoWebsiteImages/skill-tracker.png';
import { useVenue } from '../VenueContext';
import { CleanVenueMap } from '../../../components/common/CleanVenueMap';

export function VenueBottomClassesInfo() {
  const { venue, venueName, area } = useVenue();

  const infoList = [
    {
      title: "Address",
      value: venue?.address || `Wandsworth High St, ${venueName} SW18 2PU.`,
      borderColor: "bg-[#0DD180]"
    },
    {
      title: "Parking",
      value: venue?.hasParking
        ? (venue.parkingNote && venue.parkingNote.toLowerCase() !== 'yes'
            ? `Parking available on site. ${venue.parkingNote}`
            : "Parking available on site.")
        : (venue ? "No dedicated parking on site." : "Free car park on site, 120 spaces."),
      borderColor: "bg-[#FFDE14]"
    },
    {
      title: "Facilities",
      value: venue?.facility ? `${venue.facility} sports facility with complete amenities.` : "Changing rooms, café & viewing area.",
      borderColor: "bg-[#00A6E3]"
    },
    {
      title: "Indoor/outdoor",
      value: `${venue?.facility || "Indoor"} sports hall — all weather.`,
      borderColor: "bg-[#FFDE14]"
    },
    {
      title: "What to bring",
      value: "Trainers, water bottle, shin pads.",
      borderColor: "bg-[#0DD180]"
    }
  ];

  return (
    <section 
      className="py-16 sm:py-24  text-slate-800 relative overflow-hidden"
      style={{
        backgroundImage: `url(${textureBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'multiply'
      }}
    >
    
      <Container className="relative z-10">
        <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-8 xl:gap-10 max-w-[1222px] items-stretch">
          
          {/* Left Column: Interactive Map Frame */}
          <div className="w-full lg:w-[440px] xl:w-[588px]">
            <div className="w-full max-w-[588px] mx-auto lg:mx-0 h-full min-h-[380px] sm:min-h-[480px] lg:min-h-[660px] rounded-[20px] overflow-hidden shadow-2xl border-[6px] border-white bg-slate-200 relative">
              <CleanVenueMap venue={venue} venueName={venueName} />
            </div>
          </div>

          {/* Right Column: Section Header & 5 Info Blocks */}
          <div className="w-full lg:max-w-[488px] xl:max-w-[588px] space-y-6 flex flex-col justify-center">
            
            {/* Header */}
            <div>
              <h2 className="recline font-extrabold text-4xl sm:text-5xl md:text-[54px] lg:text-[54px] xl:text-[74px] text-[#042C89] leading-tight md:leading-[1.1]">
                Classes at
              </h2>
              <div className="text-4xl sm:text-5xl md:text-[52px] lg:text-[52px] xl:text-[74px] gasoek text-[#0DD180] leading-none mt-1">
                {venueName}
              </div>

              {/* Description */}
              <p className="text-slate-600 poppins text-xs sm:text-[18px] leading-relaxed max-w-xl pt-3">
                You'll find us at {venueName}{area ? ` in ${area}` : ''}, {venue?.address || 'conveniently situated with great transport links and sports facilities'}.
              </p>
            </div>

            {/* 5 Key Information Blocks */}
          <div className="space-y-8 pt-2">
              {infoList.map((item, idx) => (
                <div 
                  key={idx} 
                  className="relative pl-6 py-1.5"
                >
                  <div className={`absolute left-0 top-0 bottom-0 w-[6px] h-full rounded-full ${item.borderColor}`}></div>
                  <h3 className="recline font-extrabold text-[#042C89] text-base sm:text-[24px] leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 font-medium poppins text-xs sm:text-[15px]">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>
      </Container>
    </section>
  );
}
