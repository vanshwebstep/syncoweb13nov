import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MapPin, List, Map as MapIcon, Loader2, RefreshCw } from 'lucide-react';
import { Container } from '../../components/common/Container';
import { VENUES_DATA, AGE_GROUPS } from '../../data/findAClassData';
import { fetchDynamicVenues, fetchClassById, searchVenues } from '../../services/venueService';
import { FindAClassHero } from './components/FindAClassHero';
import { VenueCardList } from './components/VenueCardList';
import { VenueCardCompact } from './components/VenueCardCompact';
import { VenueMap } from './components/VenueMap';
import { PricesModal } from './components/PricesModal';
import { TermDatesModal } from './components/TermDatesModal';
import { DirectionsModal } from './components/DirectionsModal';
import { ParkingModal } from './components/ParkingModal';
import { WaitingListModal } from './components/WaitingListModal';
import './find-a-class-translated.css';

const INITIAL_VISIBLE = 3;

export function FindAClassPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Dynamic venues state from live API
  const [venues, setVenues] = useState(VENUES_DATA);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  const [postcode, setPostcode] = useState('SW10 0AB');
  const [selectedAges, setSelectedAges] = useState(['4-5', '6-7']);
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'map'
  const [selectedVenueId, setSelectedVenueId] = useState('5');
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const [showEditSearchCard, setShowEditSearchCard] = useState(false);

  const [activeModalVenue, setActiveModalVenue] = useState(null);
  const [activeModalClass, setActiveModalClass] = useState(null);
  const [modalType, setModalType] = useState(null);
  const list_active='https://webstepdev.com/demo/syncoWebsiteImages/find-a-class/list_2.png';
  const list_2= 'https://webstepdev.com/demo/syncoWebsiteImages/find-a-class/list_blue.png';
  const map_2 = 'https://webstepdev.com/demo/syncoWebsiteImages/find-a-class/map_2.png';
  const map_active = 'https://webstepdev.com/demo/syncoWebsiteImages/find-a-class/map_white.png';
  const pin = 'https://webstepdev.com/demo/syncoWebsiteImages/find-a-class/pin_blue.png';

  // 1. Fetch live dynamic venues from /api/open/find-class
  const loadVenues = async (force = false) => {
    setIsLoading(true);
    setFetchError(null);
    try {
      const liveVenues = await fetchDynamicVenues(force);
      console.log('Dynamic venues fetched successfully:', liveVenues);
      if (Array.isArray(liveVenues) && liveVenues.length > 0) {
        setVenues(liveVenues);
        setSelectedVenueId((prevId) => {
          const exists = liveVenues.some((v) => String(v.id) === String(prevId));
          return exists ? prevId : String(liveVenues[0].id);
        });
      }
    } catch (err) {
      console.error('Error loading dynamic venues:', err);
      setFetchError(err.message || 'Failed to load live venues.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadVenues();
  }, []);

  // 2. Fetch class by ID if ?classId=... is provided in URL
  const classIdParam = searchParams.get('classId');
  useEffect(() => {
    if (!classIdParam) return;

    fetchClassById(classIdParam)
      .then((classData) => {
        console.log('Class fetched by ID (' + classIdParam + '):', classData);
        if (classData) {
          const targetVenueId = String(classData.venueId || classData.venue?.id || '');
          if (targetVenueId) {
            setSelectedVenueId(targetVenueId);
          }
        }
      })
      .catch((err) => {
        console.error('Error fetching class by ID (' + classIdParam + '):', err);
      });
  }, [classIdParam]);

  // Filter venues by search query and age groups
  const filteredVenues = useMemo(() => {
    let list = venues;

    if (postcode && postcode.trim()) {
      const searched = searchVenues(list, postcode.trim());
      if (searched.length > 0) {
        list = searched;
      }
    }

    // Filter by selected ages
    if (selectedAges.length > 0 && selectedAges.length < AGE_GROUPS.length) {
      list = list.filter((venue) => {
        const classes = venue.schedule?.classes || [];
        return classes.some((c) => selectedAges.includes(c.ageId));
      });
    }

    return list;
  }, [venues, selectedAges, postcode]);

  // Filter ya venues change hone par wapas default 3 pe reset
  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE);
  }, [selectedAges, venues]);

  const visibleVenues = useMemo(
    () => filteredVenues.slice(0, visibleCount),
    [filteredVenues, visibleCount]
  );

  const headingAgeLabel = useMemo(() => {
    if (selectedAges.length === 0 || selectedAges.length === AGE_GROUPS.length) return 'all ages';
    return selectedAges
      .map((id) => {
        const match = AGE_GROUPS.find((g) => g.id === id);
        return match ? `${match.label.replace('-', '–')}s` : id;
      })
      .join(' & ');
  }, [selectedAges]);

  const activeVenue = useMemo(() => {
    return (
      filteredVenues.find(
        (v) => String(v.id) === String(selectedVenueId) || String(v.venueId) === String(selectedVenueId)
      ) ||
      filteredVenues[0] ||
      venues[0]
    );
  }, [filteredVenues, venues, selectedVenueId]);

  const openModal = (type) => (venue, cls) => {
    setActiveModalVenue(venue);
    setActiveModalClass(cls || null);
    setModalType(type);
  };

  const handleBookTrial = (venue, cls) => {
    const vId = venue?.venueId != null ? venue.venueId : (venue?.id || '');
    const cId = cls?.classScheduleId || cls?.classId || cls?.id || '';
    navigate(`/book-trial?venue=${vId}${cId ? `&classId=${cId}` : ''}`);
  };

  const handleBookMembership = (venue, cls) => {
    const vId = venue?.venueId != null ? venue.venueId : (venue?.id || '');
    const cId = cls?.classScheduleId || cls?.classId || cls?.id || '';
    navigate(`/book-membership?venue=${vId}${cId ? `&classId=${cId}` : ''}`);
  };

  const handleJoinWaitingList = (venue, cls) => {
    const vId = venue?.venueId != null ? venue.venueId : (venue?.id || '');
    const cId = cls?.classScheduleId || cls?.classId || cls?.id || '';
    navigate(`/waiting-list?venue=${vId}${cId ? `&classId=${cId}` : ''}`);
  };

  const handleCloseModal = () => {
    setModalType(null);
    setActiveModalVenue(null);
    setActiveModalClass(null);
  };

  const ViewToggle = (
    <div className="self-start bg-white border border-[#C9D3F0] p-1 sm:p-1.5 rounded-full flex items-center shrink-0 shadow-2xs">
      {[
        {
          id: 'list',
          label: 'List',
          img: list_2,
          activeImg: list_active
        },
        {
          id: 'map',
          label: 'Map',
          img: map_2,
          activeImg: map_active
        }
      ].map(({ id, label, img, activeImg }) => (
        <button
          key={id}
          type="button"
          onClick={() => setViewMode(id)}
          className={`h-9 sm:h-10 px-3.5 sm:px-4 rounded-full text-[12px] sm:text-[14px] font-bold flex items-center gap-1.5 transition-all cursor-pointer ${viewMode === id
              ? 'bg-[#042C89] text-white shadow-xs'
              : 'text-[#042C89] hover:bg-slate-100'
            }`}
        >
          <img
            src={viewMode === id ? activeImg : img}
            alt=""
            className="md:h-3 md:w-3 w-2.5"
          />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );

  const Heading = (
    <div className="flex items-start justify-between gap-3 mb-4 sm:mb-5">
      <div>
        <h2 className="poppins text-[16px] sm:text-[22px] font-bold text-[#042C89] flex items-center gap-2 leading-tight">
          <span>
            {filteredVenues.length} venue{filteredVenues.length === 1 ? '' : 's'} for {headingAgeLabel}
          </span>
          {isLoading && <Loader2 className="w-4 h-4 text-[#00A3E0] animate-spin inline-block" />}
        </h2>
        <p className="text-[#797A88] text-[12px] sm:text-[14px] font-medium md:font-normal mt-0.5">
          Near {postcode} · Nearest first
        </p>
      </div>
      {ViewToggle}
    </div>
  );

  return (
    <div className="find-a-class-page-container bg-[#F3F6FB] pb-12 poppins text-slate-800">
      {viewMode === 'list' ? (
        <FindAClassHero
          postcode={postcode}
          setPostcode={setPostcode}
          selectedAges={selectedAges}
          setSelectedAges={setSelectedAges}
          venues={venues}
          onSearch={() => {
            const el = document.getElementById('search-results');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      ) : (
        <div className="md:pt-8 pt-6 md:pb-1">
          <Container>
            {/* Desktop / Tablet Search Pill */}
            <div className="hidden md:flex bg-white rounded-full border border-[#CFE3F5] py-3 px-4 sm:px-5 items-center poppins justify-between gap-3">
              <div className="flex items-center gap-2 text-xs min-w-0 ps-3">
                <img src={pin} className="w-3" alt="" />
                <span className="font-bold text-[#042C89] text-[16px] whitespace-nowrap">{postcode}</span>
                <span className="text-[15px] font-regular text-[#797A88] truncate">· {headingAgeLabel}</span>
              </div>
              <button
                type="button"
                onClick={() => setShowEditSearchCard(!showEditSearchCard)}
                className="bg-[#E6F4FB] hover:bg-[#D2E7F8] text-[#042C89] font-bold text-[14px] h-[48px] px-6 rounded-full transition-all shrink-0 cursor-pointer"
              >
                {showEditSearchCard ? 'Close search' : 'Edit search'}
              </button>
            </div>

            {/* Mobile Search Pill */}
            <div className="flex md:hidden bg-white rounded-full border border-[#CFE3F5] py-3.5 px-4 items-center poppins justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-2.5 text-xs min-w-0">
                <MapPin className="w-4 h-4 text-[#00A3E0] shrink-0 stroke-[2.5]" />
                <span className="font-bold text-[#042C89] text-[15px] whitespace-nowrap">{postcode}</span>
                <span className="text-[14px] font-medium text-[#797A88] truncate">· {headingAgeLabel}</span>
              </div>
              <button
                type="button"
                onClick={() => setShowEditSearchCard(!showEditSearchCard)}
                className="text-[#00A3E0] font-bold text-[15px] px-2 py-1 hover:underline transition-all shrink-0 cursor-pointer"
              >
                {showEditSearchCard ? 'Close' : 'Edit'}
              </button>
            </div>

            {showEditSearchCard && (
              <div className="mt-3 bg-white rounded-2xl p-4 shadow-lg border border-slate-200">
                <div className="flex flex-col md:flex-row items-stretch md:items-end gap-4">
                  <div className="flex-1">
                    <label className="text-[11px] font-extrabold text-[#061838] block mb-1.5">
                      Postcode
                    </label>
                    <input
                      type="text"
                      value={postcode}
                      onChange={(e) => setPostcode(e.target.value.toUpperCase())}
                      className="w-full h-11 border border-slate-200 rounded-xl px-3.5 text-sm font-bold text-[#061838] outline-none uppercase focus:border-[#00A3E0]"
                    />
                  </div>
                  <div className="flex-1">
                    <span className="text-[11px] font-extrabold text-[#061838] block mb-1.5">
                      Child's age
                    </span>
                    <div className="flex gap-2">
                      {AGE_GROUPS.map((g) => {
                        const active = selectedAges.includes(g.id);
                        return (
                          <button
                            key={g.id}
                            type="button"
                            onClick={() =>
                              setSelectedAges(
                                active
                                  ? selectedAges.filter((x) => x !== g.id)
                                  : [...selectedAges, g.id]
                              )
                            }
                            className={`flex-1 h-11 text-[13px] font-bold rounded-full border transition-all cursor-pointer ${active
                                ? 'bg-[#0B2A8A] text-white border-[#0B2A8A]'
                                : 'bg-white border-slate-200 text-[#061838]'
                              }`}
                          >
                            {g.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowEditSearchCard(false)}
                    className="h-11 bg-[#0DD180] hover:bg-[#0BBF74] text-white font-extrabold text-sm px-6 rounded-full cursor-pointer"
                  >
                    Update
                  </button>
                </div>
              </div>
            )}
          </Container>
        </div>
      )}

      <section
        id="search-results"
        className={viewMode === 'list' ? 'pt-8 sm:pt-[110px] bg-[#F6F8FC]' : 'md:pt-10 pt-5 bg-[#F6F8FC]'}
      >
        <Container>
          {viewMode === 'list' ? (
            <div className="py-3 sm:py-4 md:py-5">
              {Heading}

              {/* Loading State */}
              {isLoading && venues.length === 0 && (
                <div className="py-16 text-center">
                  <Loader2 className="w-8 h-8 text-[#00A3E0] animate-spin mx-auto mb-3" />
                  <p className="text-sm font-bold text-slate-500">
                    Loading live venues &amp; class schedules...
                  </p>
                </div>
              )}

              {/* Error Notice */}
              {fetchError && (
                <div className="mb-4 p-3.5 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-between text-xs text-amber-800">
                  <span>Using cached venues. ({fetchError})</span>
                  <button
                    type="button"
                    onClick={() => loadVenues(true)}
                    className="flex items-center gap-1 font-bold text-[#0B2A8A] hover:underline cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Retry</span>
                  </button>
                </div>
              )}

              {/* Dynamic Venues List */}
              <div className="space-y-4">
                {visibleVenues.map((venue) => (
                  <VenueCardList
                    key={venue.id}
                    venue={venue}
                    selectedAges={selectedAges}
                    onOpenPrices={(v) => openModal('prices')(v)}
                    onOpenTermDates={(v) => openModal('terms')(v)}
                    onOpenDirections={(v) => openModal('directions')(v)}
                    onOpenParking={(v) => openModal('parking')(v)}
                    onBookTrial={(v, c) => handleBookTrial(v, c)}
                    onJoinWaitingList={(v, c) => handleJoinWaitingList(v, c)}
                    onBookMembership={(v, c) => handleBookMembership(v, c)}
                  />
                ))}
              </div>

              {visibleVenues.length === 0 && !isLoading && (
                <div className="py-12 text-center text-slate-400">
                  <p className="font-bold text-sm">No venues found for the selected filters.</p>
                  <button
                    type="button"
                    onClick={() => setSelectedAges(AGE_GROUPS.map((g) => g.id))}
                    className="mt-3 text-xs font-bold text-[#0B2A8A] underline cursor-pointer"
                  >
                    Reset age filters
                  </button>
                </div>
              )}

              {visibleCount < filteredVenues.length && (
                <div className="text-center pt-12 pb-1">
                  <button
                    type="button"
                    onClick={() => setVisibleCount(filteredVenues.length)}
                    className=" border border-[#042C89] hover:bg-slate-50 text-[#042C89] font-bold text-[15px] h-[48px] px-[80px] rounded-full transition-all cursor-pointer inline-flex items-center justify-center active:scale-95"
                  >
                    Show {filteredVenues.length - visibleCount} more{' '}
                    {filteredVenues.length - visibleCount === 1 ? 'venue' : 'venues'}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="py-3 sm:py-4 md:py-5 md:pt-1">
              {Heading}

              {/* Mobile View: Map on top, active venue card sheet below */}
              <div className="lg:hidden space-y-3">
                <div className="h-[360px] sm:h-[400px] w-full isolate">
                  <VenueMap
                    venues={filteredVenues}
                    selectedId={selectedVenueId}
                    selectedVenue={activeVenue}
                    onSelect={(v) => setSelectedVenueId(String(v.id))}
                    className="h-full w-full"
                  />
                </div>
                {activeVenue && (
                  <VenueCardCompact
                    venue={activeVenue}
                    isSelected={true}
                    onSelect={(v) => setSelectedVenueId(String((v || activeVenue).id))}
                    onBookTrial={(v, c) => handleBookTrial(v, c)}
                    onJoinWaitingList={(v, c) => handleJoinWaitingList(v, c)}
                    onBookMembership={(v, c) => handleBookMembership(v, c)}
                    onOpenDetails={(v) => openModal('prices')(v)}
                  />
                )}
              </div>

              {/* Desktop View: Venues list on left, Map on right */}
              <div className="hidden lg:grid lg:grid-cols-5 gap-3 lg:h-[480px]">
                <div className="lg:col-span-2 space-y-3 lg:overflow-y-auto no-scrollbar lg:pr-1">
                  {filteredVenues.map((venue) => (
                    <VenueCardCompact
                      key={venue.id}
                      venue={venue}
                      isSelected={String(selectedVenueId) === String(venue.id)}
                      onSelect={(v) => setSelectedVenueId(String((v || venue).id))}
                      onBookTrial={(v, c) => handleBookTrial(v, c)}
                      onJoinWaitingList={(v, c) => handleJoinWaitingList(v, c)}
                      onBookMembership={(v, c) => handleBookMembership(v, c)}
                      onOpenDetails={(v) => openModal('prices')(v)}
                    />
                  ))}
                </div>

                <div className="lg:col-span-3 lg:h-full isolate">
                  <VenueMap
                    venues={filteredVenues}
                    selectedId={selectedVenueId}
                    selectedVenue={activeVenue}
                    onSelect={(v) => setSelectedVenueId(String(v.id))}
                    className="h-full w-full"
                  />
                </div>
              </div>
            </div>
          )}
        </Container>
      </section>

      {/* Dynamic Modals */}
      <PricesModal
        isOpen={modalType === 'prices'}
        onClose={handleCloseModal}
        venue={activeModalVenue}
      />
      <TermDatesModal
        isOpen={modalType === 'terms'}
        onClose={handleCloseModal}
        venue={activeModalVenue}
      />
      <DirectionsModal
        isOpen={modalType === 'directions'}
        onClose={handleCloseModal}
        venue={activeModalVenue}
        userPostcode={postcode}
      />
      <ParkingModal
        isOpen={modalType === 'parking'}
        onClose={handleCloseModal}
        venue={activeModalVenue}
      />
      <WaitingListModal
        isOpen={modalType === 'waiting'}
        onClose={handleCloseModal}
        venue={activeModalVenue}
        selectedClass={activeModalClass}
      />
    </div>
  );
}

export default FindAClassPage;