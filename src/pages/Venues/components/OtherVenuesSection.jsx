import React from 'react';
import { MapPin, Calendar, ArrowRight, Sparkles, Navigation } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../../../components/common/Container';
import { useVenue } from '../VenueContext';

const SWOOSH = 'https://webstepdev.com/demo/syncoWebsiteImages/roadtorio/Swoosh.png';

export function OtherVenuesSection() {
  const navigate = useNavigate();
  const { allVenues, venue, changeVenue } = useVenue();

  if (!allVenues || allVenues.length === 0) return null;

  const currentId = venue?.venueId || venue?.id;
  const otherVenues = allVenues.filter(
    (v) => String(v.venueId || v.id) !== String(currentId)
  );

  if (otherVenues.length === 0) return null;

  const handleSelectVenue = (v) => {
    if (changeVenue) {
      changeVenue(v.venueId || v.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate(`/venues?id=${v.venueId || v.id}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBookTrial = (v, e) => {
    e.stopPropagation();
    navigate(`/book-trial?venue=${v.venueId || v.id}`);
  };

  return (
    <section className="py-14 sm:py-20 bg-[#F4F6FB] poppins">
      <Container>
        <div className="max-w-[1100px] mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10 sm:mb-14">
            <span className="block text-[13px] font-semibold uppercase tracking-wider text-[#00A6E3]">
              More Locations
            </span>
            <h2 className="mt-3 leading-[1.1]">
              <span className="recline block font-bold text-[#042C89] text-[30px] sm:text-[38px] lg:text-[44px]">
                Explore other Samba
              </span>
              <span className="gasoek relative inline-block text-[#0DD180] text-[34px] sm:text-[46px] lg:text-[54px] mt-1">
                venues.
                <img
                  src={SWOOSH}
                  alt=""
                  aria-hidden="true"
                  className="absolute left-0 -bottom-2 w-full h-auto pointer-events-none select-none"
                />
              </span>
            </h2>
            <p className="mt-6 text-[#797A88] text-[14px] sm:text-[16px] max-w-[560px] mx-auto">
              Find another Samba Soccer School near you with the same Brazilian flair, expert coaching, and free trial sessions.
            </p>
          </div>

          {/* Venues Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {otherVenues.map((v) => {
              const vName = v.venueName || v.name;
              const area = v.area && v.area !== '-' ? v.area : vName;
              const day = v.primaryDay || (v.schedule?.day) || 'Saturday';
              const facility = v.facility || 'Indoor';
              const address = v.address || '';
              const postcode = v.postal_code || v.postcode || '';
              const classesCount = v.classList?.length || v.schedule?.classes?.length || 0;
              const ages = v.ageRange || '4–12';

              return (
                <div
                  key={v.venueId || v.id}
                  onClick={() => handleSelectVenue(v)}
                  className="bg-white rounded-[24px] border border-[#E8ECF5] p-6 shadow-sm hover:shadow-md hover:border-[#042C89]/30 transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Badges */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="bg-[#E6F4FB] text-[#042C89] font-bold text-[11.5px] px-3 py-1 rounded-full uppercase tracking-wide">
                        {area}
                      </span>
                      <span className="bg-[#F0F5FA] text-[#042C89] font-semibold text-[11.5px] px-3 py-1 rounded-full">
                        {facility}
                      </span>
                    </div>

                    {/* Venue Title */}
                    <h3 className="text-[19px] sm:text-[21px] font-bold text-[#042C89] group-hover:text-[#0DD180] transition-colors leading-tight">
                      {vName}
                    </h3>

                    {/* Address */}
                    <p className="mt-2 text-[13.5px] text-[#797A88] flex items-center gap-1.5 line-clamp-1">
                      <MapPin className="w-3.5 h-3.5 text-[#00A6E3] shrink-0" />
                      <span>{address}{postcode ? `, ${postcode}` : ''}</span>
                    </p>

                    {/* Details row */}
                    <div className="mt-4 pt-4 border-t border-[#F0F4FA] flex flex-wrap items-center gap-4 text-xs font-semibold text-[#042C89]">
                      <span className="flex items-center gap-1.5 bg-[#FFF9D6] text-[#8A5300] px-2.5 py-1 rounded-md">
                        <Calendar className="w-3.5 h-3.5" /> Every {day}
                      </span>
                      <span className="bg-[#E3F8EE] text-[#067A4B] px-2.5 py-1 rounded-md">
                        Ages {ages}
                      </span>
                      {classesCount > 0 && (
                        <span className="text-[#797A88]">
                          {classesCount} class time{classesCount === 1 ? '' : 's'}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 pt-4 border-t border-[#F0F4FA] flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => handleSelectVenue(v)}
                      className="text-[#042C89] font-bold text-[14px] flex items-center gap-1.5 group-hover:underline cursor-pointer"
                    >
                      <span>View venue</span>
                      <ArrowRight className="w-4 h-4 text-[#0DD180] group-hover:translate-x-1 transition-transform" />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => handleBookTrial(v, e)}
                      className="bg-[#042C89] hover:bg-[#031f63] text-white text-xs font-bold px-4 py-2.5 rounded-full transition-all cursor-pointer whitespace-nowrap active:scale-95"
                    >
                      Book FREE trial
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default OtherVenuesSection;
