import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ArrowUpRight, ChevronDown, Loader2 } from 'lucide-react';
import { fetchDynamicVenues, groupVenuesByArea, searchVenues, findNearestVenue } from '../../services/venueService';

export function VenueModal({ isOpen, onClose, postcode: initialPostcode, venue: initialVenue }) {
  const [postcode, setPostcode] = useState(initialPostcode || initialVenue || '');
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(false);
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

  // Load 100% original venues from API
  useEffect(() => {
    let isMounted = true;
    if (isOpen) {
      setLoading(true);
      fetchDynamicVenues()
        .then((data) => {
          if (isMounted) {
            setVenues(Array.isArray(data) ? data : []);
            setLoading(false);
          }
        })
        .catch((err) => {
          if (isMounted) {
            console.error('Error fetching venues in VenueModal:', err);
            setLoading(false);
          }
        });
    }
    return () => {
      isMounted = false;
    };
  }, [isOpen]);

  // Filter real venues by search query (name, area, address, postcode)
  const filteredVenues = useMemo(() => {
    return searchVenues(venues, postcode);
  }, [venues, postcode]);

  // Dynamically group real venues by area
  const regions = useMemo(() => {
    return groupVenuesByArea(filteredVenues);
  }, [filteredVenues]);

  // Auto-expand region if single matching region during active search
  useEffect(() => {
    if (postcode.trim() && regions.length === 1) {
      setExpandedRegion(regions[0].name);
    }
  }, [postcode, regions]);

  // Keyboard Escape listener and overflow lock
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
    const id = venueObj?.venueId || venueObj?.id;
    const idParam = id ? `&id=${id}` : '';
    navigate(`/venues?name=${encodeURIComponent(venueName)}${idParam}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const term = postcode.trim();
    if (!term) {
      if (venues.length > 0) {
        handleSelectVenue(venues[0].venueName || venues[0].name, venues[0]);
      } else {
        handleSelectVenue('London');
      }
      return;
    }

    if (filteredVenues.length > 0) {
      const topMatch = filteredVenues[0];
      handleSelectVenue(topMatch.venueName || topMatch.name || topMatch.area || term, topMatch);
    } else {
      handleSelectVenue(term);
    }
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      if (venues.length > 0) {
        handleSelectVenue(venues[0].venueName || venues[0].name, venues[0]);
      }
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
          handleSelectVenue(nearest.venueName || nearest.name, nearest);
        } else if (venues.length > 0) {
          handleSelectVenue(venues[0].venueName || venues[0].name, venues[0]);
        }
      },
      (err) => {
        setIsLocating(false);
        console.warn('Geolocation denied / error:', err);
        if (venues.length > 0) {
          handleSelectVenue(venues[0].venueName || venues[0].name, venues[0]);
        }
      },
      { timeout: 8000 }
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Dark Translucent Backdrop */}
      <div 
        className="fixed inset-0 bg-[#0B1527]/75 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Dialog Container */}
      <div className="relative w-full max-w-[620px] bg-white rounded-[22px] shadow-2xl overflow-hidden z-10 my-auto animate-in zoom-in-95 duration-200 font-sans">
        
        {/* Top Header Bar (Royal Navy Blue #042C89) */}
        <div className="bg-[#042C89] text-white px-6 sm:px-7 py-4.5 flex items-center justify-between">
          
          {/* Header Title with Custom Teardrop Pin */}
          <div className="flex items-center gap-2.5">
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="white" />
              <circle cx="12" cy="9" r="2.5" fill="#042C89" />
            </svg>
            <h2 className="text-white font-bold text-[18px] sm:text-[20px] poppins tracking-tight">
              Our Venues
            </h2>
          </div>

          <div className="flex items-center space-x-2.5 sm:space-x-3">
            {/* Country Badge */}
            <div className="bg-white/10 hover:bg-white/15 border border-white/20 text-white px-3 py-1.5 rounded-full text-[13px] font-semibold flex items-center gap-1.5 shadow-inner transition-colors">
              <svg className="w-4 h-3 rounded-xs shrink-0" viewBox="0 0 60 30">
                <clipPath id="uk-clip-s">
                  <path d="M0,0 v30 h60 v-30 z"/>
                </clipPath>
                <clipPath id="uk-clip-t">
                  <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/>
                </clipPath>
                <g clipPath="url(#uk-clip-s)">
                  <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
                  <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
                  <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#uk-clip-t)" stroke="#C8102E" strokeWidth="4"/>
                  <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
                  <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
                </g>
              </svg>
              <span>United Kingdom</span>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1 text-white/90 hover:text-white hover:bg-white/15 rounded-full transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7 space-y-5">
          
          {/* Section 1: Find by location / Search bar */}
          <div className="space-y-3">
            <h3 className="font-bold text-[#111827] text-[17px] sm:text-[18px] poppins">
              Find your nearest venue
            </h3>

            {/* Search Input Bar */}
            <form 
              onSubmit={handleSearchSubmit}
              className="bg-[#F4F6F9] rounded-full p-1.5 pl-5 sm:pl-6 flex items-center justify-between border border-[#E5E7EB] focus-within:border-[#00D084] focus-within:ring-2 focus-within:ring-[#00D084]/20 transition-all shadow-xs"
            >
              <input
                type="text"
                placeholder="Enter your post code"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                className="bg-transparent text-[#111827] placeholder-[#6B7280] text-[14px] sm:text-[15px] font-medium outline-none w-full py-1.5 mr-2"
              />

              <button
                type="submit"
                className="bg-[#00D084] hover:bg-[#00b875] text-white font-bold text-[13px] sm:text-[14px] px-6 sm:px-7 py-2.5 sm:py-3 rounded-full shadow-xs shrink-0 transition-all cursor-pointer whitespace-nowrap"
              >
                Find A Venue
              </button>
            </form>

            {/* Use My Current Location Pill */}
            <div>
              <button
                type="button"
                onClick={handleUseCurrentLocation}
                disabled={isLocating || loading}
                className="bg-white border border-[#D1D5DB] rounded-full px-4 py-2 text-[13px] sm:text-[14px] font-semibold text-[#111827] hover:bg-[#F9FAFB] transition-colors flex items-center gap-1.5 shadow-xs inline-flex cursor-pointer disabled:opacity-60"
              >
                {isLocating ? (
                  <Loader2 className="w-4 h-4 text-[#042C89] animate-spin" />
                ) : (
                  <ArrowUpRight className="w-4 h-4 text-[#111827] stroke-[2.5]" />
                )}
                <span>{isLocating ? 'Locating nearest venue...' : 'Use my current location'}</span>
              </button>
            </div>
          </div>

          {/* Section 2: OR BROWSE BY REGION */}
          <div className="pt-5 border-t border-[#E5E7EB] space-y-2">
            <div>
              <span className="text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.05em] text-[#6B7280] block mb-1">
                OR BROWSE BY REGION
              </span>
              <h3 className="poppins font-bold text-[18px] sm:text-[20px] text-[#111827]">
                {loading ? (
                  <span className="inline-flex items-center gap-2 text-slate-500 text-[16px] font-normal">
                    <Loader2 className="w-4 h-4 animate-spin text-[#00D084]" /> Loading venues...
                  </span>
                ) : postcode.trim() ? (
                  `${filteredVenues.length} VENUE${filteredVenues.length === 1 ? '' : 'S'} MATCHING`
                ) : (
                  `${venues.length} VENUES AVAILABLE`
                )}
              </h3>
            </div>

            {/* Loading Indicator */}
            {loading ? (
              <div className="flex flex-col items-center justify-center py-10 space-y-2">
                <Loader2 className="w-7 h-7 animate-spin text-[#00D084]" />
                <span className="text-xs sm:text-sm font-semibold text-slate-500">
                  Loading live venues from API...
                </span>
              </div>
            ) : regions.length === 0 ? (
              <div className="py-8 text-center text-slate-500 text-sm">
                No venues found matching &quot;{postcode}&quot;. Try another postcode or area.
              </div>
            ) : (
              /* Dynamic Region List Accordion */
              <div className="divide-y divide-[#F1F5F9] pt-1 max-h-[360px] no-scrollbar overflow-y-auto pr-1">
                {regions.map((region, idx) => {
                  const isExpanded = expandedRegion === region.name;
                  return (
                    <div key={region.name || idx} className="transition-colors">
                      <div
                        onClick={() => setExpandedRegion(isExpanded ? null : region.name)}
                        className="flex items-center justify-between py-3.5 px-2 hover:bg-[#F8FAFC] rounded-xl transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="font-bold text-[#111827] text-[15px] group-hover:text-[#00D084] transition-colors">
                            {region.name}
                          </span>
                          <span className="bg-[#FFDE14] text-[#042C89] font-bold text-[12px] px-2.5 py-0.5 rounded-full min-w-[28px] h-[22px] inline-flex items-center justify-center text-center shadow-2xs">
                            {region.count}
                          </span>
                        </div>

                        <div className="flex items-center">
                          <ChevronDown 
                            className={`w-4 h-4 text-[#94A3B8] transition-transform duration-200 ${
                              isExpanded ? 'rotate-180 text-[#042C89]' : 'group-hover:text-[#042C89]'
                            }`} 
                          />
                        </div>
                      </div>

                      {/* Expanded Sub-locations / Venues */}
                      {isExpanded && (
                        <div className="pl-3 sm:pl-4 pr-2 pb-3 pt-1.5 space-y-1.5 bg-[#F8FAFC] rounded-2xl mb-1 text-[13px] sm:text-[14px]">
                          {region.venues.map((v, vIdx) => {
                            const vName = v.venueName || v.name || 'Samba Soccer School';
                            const addressParts = [v.address, v.postal_code].filter(Boolean).join(', ');
                            return (
                              <div 
                                key={v.venueId || v.id || vIdx}
                                onClick={() => handleSelectVenue(vName, v)}
                                className="hover:text-[#00D084] text-[#042C89] cursor-pointer font-bold py-2.5 px-3 rounded-xl hover:bg-white flex items-center justify-between transition-colors shadow-2xs group/venue"
                              >
                                <div className="flex flex-col text-left pr-2">
                                  <span className="group-hover/venue:text-[#00D084] text-[13px] sm:text-[14px] font-bold text-[#042C89] transition-colors">
                                    {vName}
                                  </span>
                                  {addressParts && (
                                    <span className="text-[11px] sm:text-[12px] text-slate-500 font-normal line-clamp-1">
                                      {addressParts}
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
