import React from 'react';
import { Container } from '../../../components/common/Container';
import textureBg from 'https://webstepdev.com/demo/syncoWebsiteImages/every-week.png';
import managerPhoto from 'https://webstepdev.com/demo/syncoWebsiteImages/venues/coach_1.png';
import { useVenue } from '../VenueContext';

export function AskVenueManagerSection() {
  const { venue, venueName } = useVenue();
  const managerName = venue?.managerName || (venue?.admins?.firstName ? `${venue.admins.firstName} ${venue.admins.lastName || ''}`.trim() : "Coach Nilio");

  return (
    <section 
      className="py-16 sm:py-24 text-white relative overflow-hidden font-sans border-t border-white/10"
      style={{
        backgroundImage: `url(${textureBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'soft-light'
      }}
    >
      {/* Right Side Wavy Wave Graphic Overlay */}

      <Container className="relative z-10">
        <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-8 xl:gap-10 items-center max-w-[1090px] mx-auto">
          
          {/* Left Column: Heading & Paragraphs */}
          <div className="w-full max-w-[562px] lg:max-w-[500px] xl:max-w-[562px] space-y-6 text-center lg:text-left">
            
            {/* Header Titles */}
            <div>
              <h2 className="gasoek text-4xl sm:text-[48px] lg:text-[50px] xl:text-[61px] text-[#FFDE14] leading-none">
                Got a question?
              </h2>
              <h3 className="recline font-extrabold text-3xl sm:text-[44px] lg:text-[48px] xl:text-[57px] text-white leading-tight mt-1">
                Ask {managerName}
              </h3>
            </div>

            {/* Subtitles */}
            <div className="space-y-1.5 text-white poppins pt-2">
              <h4 className="font-extrabold sm:text-[22px] text-white">
                Not sure which class to choose?
              </h4>
              <p className="text-white text-[22px]">
                Wondering what happens at their first session?
                {managerName} is here to help.
              </p>
             
            </div>

          </div>

          {/* Right Column: White Venue Manager Card */}
          <div className="w-full max-w-[440px] lg:max-w-[380px] xl:max-w-[440px] flex justify-center lg:justify-end">
            <div className="bg-white rounded-[34px] p-5 shadow-2xl space-y-3 w-full border border-slate-100 text-[#052975] transform hover:-translate-y-1 transition-transform">
              
              {/* Photo Container */}
              <div className="rounded-2xl overflow-hidden shadow-sm h-52 sm:h-70 border border-slate-100 bg-slate-100">
                <img
                  src={managerPhoto}
                  alt={`${managerName} - Venue Manager`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text Labels */}
              <div className="pt-1">
                <h4 className="gasoek text-[27px] leading-none text-[#052975]">
                  {managerName}
                </h4>
                <span className="recline font-bold text-xs sm:text-[27px] text-[#052975] block pt-3">
                  Venue Manager
                </span>
              </div>

            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
