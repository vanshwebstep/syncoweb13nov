import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container } from '../../../components/common/Container';
import textureBg from 'https://webstepdev.com/demo/syncoWebsiteImages/skill-tracker.png';
import { CleanVenueMap } from '../../../components/common/CleanVenueMap';

import { useVenue } from '../VenueContext';

export function VenueClassesInfo() {
  const { venue, venueName } = useVenue();

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
      value: venue?.facility ? `${venue.facility} facility with complete amenities.` : "Changing rooms, café & viewing area.",
      borderColor: "bg-[#0DD180]"
    },
    {
      title: "Indoor/outdoor",
      value: `${venue?.facility || "Indoor"} sports pitch — all weather.`,
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
      className="py-16 sm:py-20 sm:pt-[210px] bg-[#f8fafc] -mt-[140px] text-slate-800 relative overflow-hidden font-sans "
      style={{
        backgroundImage: `url(${textureBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'multiply'
      }}
    >
      <Container className="relative z-10">
        <div className="flex flex-col lg:flex-row max-w-[1250px] m-auto gap-8 lg:gap-8 xl:gap-[70px] items-stretch">
          
          {/* Left Column: Interactive Map Frame */}
          <div className="w-full lg:w-[440px] xl:w-[588px] flex">
            <div className="w-full h-full min-h-[380px] sm:min-h-[460px] rounded-[20px] overflow-hidden border-[8px] border-white bg-slate-200 relative">
              <CleanVenueMap venue={venue} venueName={venueName} />
            </div>
          </div>

          {/* Right Column: Section Header & 5 Info Blocks */}
          <div className="w-full lg:flex-1 space-y-6 flex flex-col justify-between">
            
            {/* Header */}
            <div>
              <h2 className="recline font-extrabold text-4xl sm:text-5xl md:text-[54px] lg:text-[54px] xl:text-[74px] text-[#042C89] leading-tight md:leading-[1.1] lg:leading-[1.1] xl:leading-[0.7]">
                Classes at
              </h2>
              <div className="gasoek text-4xl sm:text-5xl md:text-[52px] lg:text-[52px] xl:text-[70px] text-[#0DD180] font-regular leading-none mt-1">
                {venueName}
              </div>

              {/* Description */}
              <p className="text-[#27364B] font-light text-[18px] poppins  leading-relaxed max-w-xl pt-8">
                You’ll find us at {venueName}, just near central transport links. Ample parking, accessibility, & facility information provided below. Our weekly classes bring the Samba Method to children across {venueName} and local areas.
              </p>
            </div>

            {/* 5 Key Information Blocks */}
         <div className="space-y-4 pt-2">
              {infoList.map((item, idx) => (
                <div 
                  key={idx} 
                  className="relative pl-6 py-1.5"
                >
                  <div className={`absolute left-0 top-0 bottom-0 w-[6px] h-full rounded-full ${item.borderColor}`}></div>
                  <h3 className="recline font-extrabold text-[#042C89] text-base sm:text-[24px] leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-[#475569] font-medium poppins text-xs sm:text-[15px]">
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
