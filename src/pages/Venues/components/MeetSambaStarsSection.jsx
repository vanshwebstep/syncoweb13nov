import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../../../components/common/Container';
import { useModal } from '../../../context/ModalContext';
import coachPortrait from 'https://webstepdev.com/demo/syncoWebsiteImages/venues/imreggie.png';
import { useVenue } from '../VenueContext';

const BASE = 'https://webstepdev.com/demo/syncoWebsiteImages';
const WHITELINE = `${BASE}/roadtorio/whiteline.png`;
const COACH_BG = `${BASE}/venues/coachbg.png`;

export function MeetSambaStarsSection({ onBookTrial }) {
  const navigate = useNavigate();
  const { venue, venueName } = useVenue();
  const { openModal } = useModal();

  /* ====== Dynamic fields ====== */
  const venueManager = venue?.venueManager || venue?.raw?.venueManager;
  const rawManagerName =
    venue?.managerName ||
    venueManager?.fullName ||
    (venueManager?.firstName ? `${venueManager.firstName} ${venueManager.lastName || ''}`.trim() : null) ||
    (venue?.admins?.firstName ? `${venue.admins.firstName} ${venue.admins.lastName || ''}`.trim() : null);

  const managerName = rawManagerName || 'Reggie';
  const firstName =
    venue?.managerFirstName ||
    venueManager?.firstName ||
    (rawManagerName ? rawManagerName.split(' ')[0] : 'Reggie');

  const venueLabel = venue?.venueName || venueName || 'Chelsea Academy';
  const areaName = venue?.area && venue?.area !== '-' ? venue.area : (venueName ? venueName.split(' ')[0] : 'Chelsea');
  const dayName = venue?.primaryDay || venue?.schedule?.day || 'Saturday';

  const experienceYears = venueManager?.recruitmentDetails?.footballExperience
    ? parseInt(venueManager.recruitmentDetails.footballExperience, 10)
    : null;
  const yearsWithSamba = experienceYears || venue?.managerYears || 5;

  const photo = venue?.managerImage || venueManager?.profile || coachPortrait;
  const bio =
    venue?.managerBio ||
    `I look after every class at ${venueLabel}, from your child’s first session to their Copa de Samba. Every week I make sure each class is fun, safe and run the Samba way.`;

  const pills = venue?.managerBadges || [
    'DBS checked',
    'First aid trained',
    'FA qualified',
    `${yearsWithSamba} years at Samba`
  ];

  const handleBook = () => {
    if (onBookTrial) return onBookTrial(venue);
    const targetClass = venue?.classList?.find((c) => c.allowFreeTrial) || venue?.classList?.[0];
    const cId = targetClass?.classId ? `&classId=${targetClass.classId}` : '';
    navigate(`/book-trial?venue=${venue?.venueId || venue?.id || '5'}${cId}`);
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#042C89] py-12 sm:py-16 lg:py-[70px] font-sans">
      {/* Background image (navy + green wave) */}
      <img
        src={COACH_BG}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-right-bottom lg:object-bottom pointer-events-none select-none z-0"
      />

      <Container className="relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-9 lg:gap-14 max-w-[1100px] mx-auto">
          {/* ===== Left: yellow card (400 x 460) ===== */}
          <div className="w-full max-w-[400px] lg:w-[400px] shrink-0">
            <div className="bg-[#FFDE14] rounded-[28px] lg:rounded-[34px] p-3 lg:p-5 lg:h-[460px] flex flex-col">
              <div className="rounded-[20px] lg:rounded-[22px] overflow-hidden lg:w-[360px] lg:h-[350px] aspect-[360/340] lg:aspect-auto bg-[#1B4DB8]">
                <img
                  src={photo}
                  alt={`${managerName} - Venue Manager`}
                  onError={(e) => {
                    if (e.currentTarget.src !== coachPortrait) {
                      e.currentTarget.src = coachPortrait;
                    }
                  }}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              <div className="mt-auto pt-3 pb-1 px-1 text-[#042C89]">
                <h4 className="poppins font-bold text-[18px] lg:text-[22px] leading-tight">{managerName}</h4>
                <p className="poppins font-bold text-[12px] lg:text-[17px] leading-tight mt-1">
                  Venue Manager · Samba {areaName}
                </p>
              </div>
            </div>
          </div>

          {/* ===== Right ===== */}
          <div className="w-full lg:flex-1 text-left">
            <p className="poppins font-bold text-[#FFDE14] text-[10.5px] lg:text-[13px] tracking-[0.04em] uppercase">
              Meet your venue manager
            </p>

            <h2 className="mt-3 lg:mt-4 leading-[1.1]">
              <span className="recline block font-bold text-white text-[32px] sm:text-[36px] lg:text-[40px]">
                Hi, I’m {firstName}.
              </span>
              <span className="gasoek relative inline-block text-[#FFDE14] text-[34px] sm:text-[42px] lg:text-[48px] mt-1">
                See you {dayName}!
                <img src={WHITELINE} alt="" aria-hidden="true" className="absolute left-0 -bottom-1 w-full h-auto pointer-events-none select-none" />
              </span>
            </h2>

            <p className="poppins mt-6 lg:mt-7 max-w-[480px] text-white text-[14px] lg:text-[17px] leading-relaxed">{bio}</p>

            {/* Pills */}
            <div className="mt-5 lg:mt-6 flex flex-wrap gap-2 lg:gap-2.5">
              {pills.map((p) => (
                <span
                  key={p}
                  className="poppins inline-flex items-center gap-1.5 lg:gap-2 bg-white/10 border border-white/10 text-white font-semibold text-[10px] lg:text-[13px] px-3 lg:px-4 py-1.5 lg:py-2 rounded-full whitespace-nowrap"
                >
                  <Check className="w-3 h-3 lg:w-3.5 lg:h-3.5 text-[#0DD180] stroke-[3.5]" />
                  {p}
                </span>
              ))}
            </div>

            <button
              type="button"
              onClick={handleBook}
              className="poppins mt-7 w-full lg:w-auto inline-flex items-center justify-center gap-2 bg-[#0DD180] hover:bg-[#0bb86f] border-[3px] border-white lg:border-0 text-[#042C89] font-bold text-[14px] lg:text-[16px] px-7 lg:px-9 py-3.5 lg:py-4 rounded-full shadow-md transition-all duration-300 hover:scale-[1.03] active:scale-95 cursor-pointer whitespace-nowrap"
            >
              Book a FREE trial <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default MeetSambaStarsSection;