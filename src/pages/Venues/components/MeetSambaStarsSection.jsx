import React from 'react';
import { Container } from '../../../components/common/Container';
import textureBg from 'https://webstepdev.com/demo/syncoWebsiteImages/texture.png';
import coachPortrait from 'https://webstepdev.com/demo/syncoWebsiteImages/venues/coach_1.png';
import { useVenue } from '../VenueContext';

export function MeetSambaStarsSection() {
  const { venue } = useVenue();
  const managerName = venue?.managerName || (venue?.admins?.firstName ? `${venue.admins.firstName} ${venue.admins.lastName || ''}`.trim() : "Coach Nilio");

  return (
    <section 
      className="py-16 bg-[#FFFFFF] text-slate-800 relative overflow-hidden font-sans "
      style={{
        backgroundImage: `url(${textureBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'multiply'
      }}
    >
      <Container className="relative z-10">
        <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-8 xl:gap-10 items-center max-w-[1076px] mx-auto">
          
          {/* Left Column: Yellow Frame Venue Manager Card */}
          <div className="w-full max-w-[440px] lg:max-w-[380px] xl:max-w-[440px] flex justify-center">
            <div className="bg-[#FFDE14] rounded-[34px] p-4 sm:p-8 space-y-3 w-full">
              
              {/* Coach Photo Container */}
              <div className="rounded-[23px]">
                <img
                  src={coachPortrait}
                  alt={`${managerName} - Venue Manager`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Coach Name & Title */}
              <div className="pt-2 px-1 text-[#042C89]">
                <h4 className="gasoek text-[27px] leading-none">
                  {managerName}
                </h4>
                <span className="recline text-xs sm:text-[27px] block pt-3">
                  Venue Manager
                </span>
              </div>

            </div>
          </div>

          {/* Right Column: Header Title & Story Paragraphs */}
          <div className="w-full lg:w-[500px] xl:w-[562px] space-y-5 text-center lg:text-left">
            
            {/* Header Titles */}
            <div>
              <h2 className="gasoek text-4xl sm:text-5xl lg:text-[52px] xl:text-[61px] text-[#042C89] leading-none">
                Meet the
              </h2>
              <h3 className="gasoek text-4xl sm:text-5xl lg:text-[52px] xl:text-[61px] text-[#0DD180] leading-none mt-1">
                Samba Stars
              </h3>
            </div>

            {/* Story Paragraphs */}
            <div className="space-y-7 text-[#042C89] font-medium poppins text-sm sm:text-[22px] leading-relaxed pt-5">
              <p>
                Great children’s coaching takes more than knowing football.
              </p>

              <p>
                Our Samba Stars teach the technique, bring the energy and know when to step in — and when to let children play.
              </p>
            </div>

          </div>

        </div>
      </Container>
    </section>
  );
}
