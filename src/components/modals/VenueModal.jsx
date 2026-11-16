import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, X, ArrowUpRight, ChevronDown, Loader2 } from 'lucide-react';
import map from 'https://webstepdev.com/demo/syncoWebsiteImages/Location2.png';
import { fetchVenues, groupVenuesByArea, searchVenues, findNearestVenue } from '../../services/venueService';

const FALLBACK_REGIONS = [
  {
    name: "London",
    count: 69,
    venues: [
      { venueName: "Central London" },
      { venueName: "North London" },
      { venueName: "South London" },
      { venueName: "East London" },
      { venueName: "West London" }
    ]
  },
  {
    name: "Surrey",
    count: 7,
    venues: [
      { venueName: "Guildford" },
      { venueName: "Woking" },
      { venueName: "Epsom" },
      { venueName: "Kingston" }
    ]
  },
  {
    name: "Wales",
    count: 6,
    venues: [
      { venueName: "Cardiff" },
      { venueName: "Swansea" },
      { venueName: "Newport" }
    ]
  },
  {
    name: "Essex",
    count: 6,
    venues: [
      { venueName: "Chelmsford" },
      { venueName: "Brentwood" },
      { venueName: "Colchester" }
    ]
  },
  {
    name: "Medway",
    count: 5,
    venues: [
      { venueName: "Chatham" },
      { venueName: "Gillingham" },
      { venueName: "Rochester" }
    ]
  },
  {
    name: "Kent",
    count: 5,
    venues: [
      { venueName: "Maidstone" },
      { venueName: "Canterbury" },
      { venueName: "Tunbridge Wells" }
    ]
  },
  {
    name: "Greater Manchester",
    count: 4,
    venues: [
      { venueName: "Manchester City Centre" },
      { venueName: "Salford" },
      { venueName: "Stockport" },
      { venueName: "Trafford" }
    ]
  }
];

export function VenueModal({ isOpen, onClose, postcode: initialPostcode, venue: initialVenue }) {
  const [postcode, setPostcode] = useState(initialPostcode || initialVenue || '');
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedRegion, setExpandedRegion] = useState(null);
  const [isLocating, setIsLocating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (initialPostcode) {
      setPostcode(initialPostcode);
    } else if (initialVenue) {
      setPostcode(initialVenue);
    }
  }, [initialPostcode, initialVenue]);

  useEffect(() => {
    let isMounted = true;
    if (isOpen) {
      setLoading(true);
      fetchVenues()
        .then((data) => {
          if (isMounted) {
            setVenues(data || []);
            setLoading(false);
          }
        })
        .catch((err) => {
          if (isMounted) {
            console.error('Error loading venues from API:', err);
            setError('Failed to fetch live venues');
            setLoading(false);
          }
        });
    }
    return () => {
      isMounted = false;
    };
  }, [isOpen]);

  const filteredVenues = useMemo(() => {
    return searchVenues(venues, postcode);
  }, [venues, postcode]);

  const regions = useMemo(() => {
    if (venues.length > 0) {
      return groupVenuesByArea(filteredVenues);
    }
    return FALLBACK_REGIONS;
  }, [venues, filteredVenues]);

  const totalLocationCount = venues.length > 0 ? venues.length : 137;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleSelectVenue = (venueName, venueObj = null) => {
    onClose();
    const idParam = venueObj?.venueId ? `&id=${venueObj.venueId}` : '';
    navigate(`/venues?name=${encodeURIComponent(venueName)}${idParam}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const term = postcode.trim();
    if (!term) {
      handleSelectVenue('London');
      return;
    }
    if (filteredVenues.length > 0) {
      const match = filteredVenues[0];
      handleSelectVenue(match.venueName || match.area || term, match);
    } else {
      handleSelectVenue(term);
    }
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      setPostcode('SW1A 1AA');
      handleSelectVenue('London');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocating(false);
        const { latitude, longitude } = pos.coords;
        const nearest = findNearestVenue(venues, latitude, longitude);
        if (nearest) {
          setPostcode(nearest.postal_code || nearest.area || nearest.venueName);
          handleSelectVenue(nearest.venueName, nearest);
        } else {
          setPostcode('SW1A 1AA');
          handleSelectVenue('London');
        }
      },
      (err) => {
        setIsLocating(false);
        console.warn('Geolocation denied / error:', err);
        setPostcode('SW1A 1AA');
        handleSelectVenue('London');
      },
      { timeout: 8000 }
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#0B1527]/75 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-[700px] bg-white rounded-[20px] shadow-2xl overflow-hidden z-10 my-auto animate-in zoom-in-95 duration-200  font-sans">
        
        {/* Top Header Bar (Brand Royal Navy Blue #042C89) */}
        <div className="bg-[#042C89] text-white px-6 sm:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img src={map } alt="" className="w-4" />
            <span className="poppins text-white font-bold text-[15px] sm:text-[19px] tracking-wide uppercase">
              FIND YOUR NEAREST VENUE
            </span>
          </div>

          <div className="flex items-center space-x-3">
            {/* Country Badge */}
            <div className="bg-[#143B8A] text-white border border-white/20 px-3 py-2 rounded-full text-[14px] font-semibold flex items-center gap-1.5 shadow-inner">
              <svg className="w-4 h-3 rounded-xs shrink-0" viewBox="0 0 60 30">
                <clipPath id="s">
                  <path d="M0,0 v30 h60 v-30 z"/>
                </clipPath>
                <clipPath id="t">
                  <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/>
                </clipPath>
                <g clipPath="url(#s)">
                  <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
                  <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
                  <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4"/>
                  <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
                  <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
                </g>
              </svg>
              <span>United Kingdom</span>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1 text-white hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Section 1: Find by location */}
          <div className="space-y-3">
            <h3 className="font-bold text-[#042C89] text-[16px]">
              Find by location
            </h3>

            {/* Capsule Search Bar */}
            <form 
              onSubmit={handleSearchSubmit}
              className="bg-[#F6F8FC] rounded-full p-1.5 pl-6 flex items-center justify-between border border-[#E2E8F0] shadow-xs"
            >
              <input
                type="text"
                placeholder="Enter your postcode, area, or venue"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                className="bg-transparent text-[#042C89] placeholder-[#5F5F6D] text-[15px] sm:text-[16px] font-normal outline-none w-full py-1.5 mr-2"
              />

              <button
                type="submit"
                className="bg-[#00D084] hover:bg-[#00b875] text-white font-bold text-[13px] sm:text-[14px] px-6 sm:px-7 py-2.5 sm:py-3 rounded-full shadow-xs shrink-0 transition-all cursor-pointer whitespace-nowrap"
              >
                Find A Class
              </button>
            </form>

            {/* Use My Current Location Pill */}
            <div>
              <button
                type="button"
                onClick={handleUseCurrentLocation}
                disabled={isLocating}
                className="bg-white border border-[#CBD5E1] rounded-full px-4 py-2 text-[12px] sm:text-[14px] font-semibold text-[#17171A] hover:bg-[#F8FAFC] transition-colors flex items-center gap-1.5 shadow-xs inline-flex cursor-pointer mt-2 disabled:opacity-60"
              >
                {isLocating ? (
                  <Loader2 className="w-4 h-4 text-[#042C89] animate-spin" />
                ) : (
                  <ArrowUpRight className="w-4 h-4 text-[#17171A] stroke-[2.5]" />
                )}
                <span>{isLocating ? 'Locating nearest venue...' : 'Use my current location'}</span>
              </button>
            </div>
          </div>

          {/* Section 2: OR BROWSE BY REGION */}
          <div className="pt-5 border-t border-[#F1F5F9] space-y-2">
            <div>
              <span className="text-[11px] sm:text-[12px] font-bold uppercase tracking-[1%] text-[#6D6D72] block mb-1">
                OR BROWSE BY REGION
              </span>
              <h3 className="poppins font-bold text-[18px] sm:text-[20px] text-[#0F1A2A] tracking-[1%]">
                {postcode.trim()
                  ? `${filteredVenues.length} LOCATION${filteredVenues.length === 1 ? '' : 'S'} MATCHING`
                  : `${totalLocationCount} LOCATIONS AVAILABLE`}
              </h3>
            </div>

            {/* Loading Spinner */}
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-2 text-[#042C89]">
                <Loader2 className="w-7 h-7 animate-spin text-[#00D084]" />
                <span className="text-xs sm:text-sm font-semibold text-slate-500">
                  Loading nearest venues...
                </span>
              </div>
            ) : regions.length === 0 ? (
              <div className="py-8 text-center text-slate-500 text-sm">
                No venues found matching "{postcode}". Try another search term or clear the search.
              </div>
            ) : (
              /* Region List */
              <div className="divide-y divide-[#F1F5F9] pt-2 max-h-[350px] no-scrollbar overflow-y-auto pr-1">
                {regions.map((region, idx) => {
                  const isExpanded = expandedRegion === idx;
                  return (
                    <div key={idx} className="transition-colors">
                      <div
                        onClick={() => setExpandedRegion(isExpanded ? null : idx)}
                        className="flex items-center justify-between py-3.5 px-1 hover:bg-[#F8FAFC] rounded-xl transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="font-semibold text-[#17171A] text-[13px] sm:text-[14px] group-hover:text-[#00D084] transition-colors">
                            {region.name}
                          </span>
                          <span className="bg-[#FFDE14] text-[#042C89] font-bold text-[12px] sm:text-[13px] px-2.5 py-0.5 rounded-full min-w-[26px] text-center shadow-xs">
                            {region.count}
                          </span>
                        </div>

                        <div className="flex items-center">
                          <ChevronDown className={`w-4 h-4 text-[#94A3B8] transition-transform duration-200 ${isExpanded ? 'rotate-180 text-[#042C89]' : 'group-hover:text-[#042C89]'}`} />
                        </div>
                      </div>

                      {/* Expanded Sub-locations */}
                      {isExpanded && (
                        <div className="pl-3 sm:pl-4 pr-2 pb-3 pt-1.5 space-y-1.5 bg-[#F8FAFC] rounded-2xl mb-1 text-[13px] sm:text-[14px]">
                          {region.venues.map((v, vIdx) => {
                            const vName = v.venueName || v;
                            const address = v.address || (v.postal_code ? `Postal: ${v.postal_code}` : '');
                            return (
                              <div 
                                key={v.venueId || vIdx}
                                onClick={() => handleSelectVenue(vName, v)}
                                className="hover:text-[#00D084] text-[#042C89] cursor-pointer font-bold py-2.5 px-3 rounded-xl hover:bg-white flex items-center justify-between transition-colors shadow-2xs group/venue"
                              >
                                <div className="flex flex-col text-left pr-2">
                                  <span className="group-hover/venue:text-[#00D084] text-[13px] sm:text-[14px] font-bold text-[#042C89] transition-colors">
                                    {vName}
                                  </span>
                                  {address && (
                                    <span className="text-[11px] sm:text-[12px] text-slate-500 font-normal line-clamp-1">
                                      {address}
                                    </span>
                                  )}
                                </div>
                                <span className="text-[12px] text-[#64748B] group-hover/venue:text-[#00D084] font-semibold shrink-0">
                                  View sessions →
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}

export default VenueModal;
