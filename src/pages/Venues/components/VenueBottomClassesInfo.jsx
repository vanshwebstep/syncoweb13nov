import React from 'react';
import { ArrowRight, Navigation } from 'lucide-react';
import { Container } from '../../../components/common/Container';
import { useVenue } from '../VenueContext';
import { useModal } from '../../../context/ModalContext';
import { CleanVenueMap } from '../../../components/common/CleanVenueMap';

const ICON_BASE = 'https://webstepdev.com/demo/syncoWebsiteImages/icons/';

export function VenueBottomClassesInfo() {
  const { venue, venueName } = useVenue();
  const { openModal } = useModal();

  const parkingText = venue?.hasParking
    ? venue.parkingNote && venue.parkingNote.toLowerCase() !== 'yes'
      ? venue.parkingNote
      : 'Parking available on site.'
    : venue
    ? 'No dedicated parking on site.'
    : 'Free on-street parking on Saturdays.';

  const station = venue?.nearestStation || venue?.station || venue?.nearbyStation;

  const infoList = [
    {
      title: 'Address',
      icon: 'pinblue.png',
      value: venue?.address || 'Lots Road, London SW10 0AB',
    },
    {
      title: 'Parking',
      icon: 'park.png',
      value: parkingText,
    },
    {
      title: 'Nearest station',
      icon: 'train.png',
      value: station || 'Imperial Wharf, 6 min walk',
    },
    {
      title: 'Indoor / outdoor',
      icon: 'home.png',
      value: venue?.facility
        ? `${venue.facility} sports facility, all weather`
        : 'Indoor sports hall, all weather',
    },
    {
      title: 'What to bring',
      icon: 'shirt.png',
      value: venue?.whatToBring || 'Trainers, water bottle. Kit if they’re a member.',
    },
  ];

  const handleDirections = () => {
    const lat = venue?.latitude || venue?.lat;
    const lng = venue?.longitude || venue?.lng || venue?.lon;
    const query =
      lat && lng
        ? `${lat},${lng}`
        : encodeURIComponent(venue?.address || venueName || '');
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank', 'noopener,noreferrer');
  };

  const handleBook = () => {
    openModal('booking', { venueName });
  };

  return (
    <section className="py-12 sm:py-20 bg-white relative overflow-hidden">
      <Container className="relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 max-w-[1200px] mx-auto">
          {/* Left: Map 600 x 500 */}
          <div className="w-full lg:w-[600px] lg:shrink-0">
            <div className="w-full h-[320px] sm:h-[400px] lg:w-[600px] lg:h-[500px] rounded-[28px] overflow-hidden bg-slate-200 relative">
              <CleanVenueMap venue={venue} venueName={venueName} />
            </div>
          </div>

          {/* Right: Info */}
          <div className="w-full lg:flex-1 lg:max-w-[480px] poppins">
            {/* Heading */}
            <div className="mb-6">
              <h2 className="recline font-extrabold text-[40px] leading-none text-[#042C89]">
                Finding
              </h2>
              <div className="relative inline-block mt-1">
                <span
                  className="absolute left-0 right-0 bottom-1 h-[6px] bg-[#FFE600] rounded-full"
                  aria-hidden="true"
                />
                <span className="gasoek relative text-[50px] leading-none text-[#0DD180]">
                  us.
                </span>
              </div>
            </div>

            {/* Info rows */}
            <div className="space-y-4">
              {infoList.map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="w-[44px] h-[44px] rounded-full bg-[#E8F1FA] flex items-center justify-center shrink-0">
                    <img
                      src={`${ICON_BASE}${item.icon}`}
                      alt=""
                      className="w-[20px] h-[20px] object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-[#042C89] leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-[14px] text-slate-600 font-medium leading-snug mt-0.5">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-3 mt-8">
              <button
                type="button"
                onClick={handleDirections}
                className="flex items-center justify-center gap-2 bg-[#E8F1FA] hover:bg-[#d8e8f7] text-[#042C89] text-[15px] font-bold px-8 py-3.5 rounded-full transition-all cursor-pointer min-w-[170px]"
              >
                <Navigation className="w-4 h-4" strokeWidth={2.5} />
                Directions
              </button>
              <button
                type="button"
                onClick={handleBook}
                className="flex items-center justify-center gap-2 bg-[#042C89] hover:bg-[#031f63] text-white text-[15px] font-bold px-8 py-3.5 rounded-full transition-all cursor-pointer"
              >
                Book a FREE trial
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}