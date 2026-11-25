import React, { useState, useEffect, useMemo } from 'react';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import { Container } from '../../../components/common/Container';
import { useModal } from '../../../context/ModalContext';
import findNearestBg from 'https://webstepdev.com/demo/syncoWebsiteImages/home/find-nearest.png';
import findNearestMobileBg from 'https://webstepdev.com/demo/syncoWebsiteImages/home/nearest_samba_mobile.png';
import { fetchVenues } from '../../../services/venueService';

export function QuickSearch() {
  const [postcode, setPostcode] = useState('');
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [venuesList, setVenuesList] = useState([]);
  const [loadingVenues, setLoadingVenues] = useState(true);
  const { openModal } = useModal();
  const navigate = useNavigate();

  useEffect(() => {
    fetchVenues()
      .then((data) => {
        if (Array.isArray(data)) {
          setVenuesList(data);
        }
      })
      .catch((err) => console.error('Error fetching venues in QuickSearch:', err))
      .finally(() => setLoadingVenues(false));
  }, []);

  const venueOptions = useMemo(() => {
  if (venuesList.length > 0) {
    return venuesList.map((v) => ({
      value: v.venueName,
      venueId: v.venueId,
      venueName: v.venueName,
      area: v.area?.trim() || '',
      address: v.address?.trim() || '',
      postalCode: v.postal_code || '',
      label: v.venueName, // control me yehi dikhega
      searchText: [v.venueName, v.area, v.address, v.postal_code].filter(Boolean).join(' ').toLowerCase(),
      venueData: v
    }));
  }
  return [
    { value: 'Central London', label: 'Central London', venueName: 'Central London' },
    { value: 'North London', label: 'North London', venueName: 'North London' },
    { value: 'South London', label: 'South London', venueName: 'South London' },
    { value: 'West London & Surrey', label: 'West London & Surrey', venueName: 'West London & Surrey' }
  ];
}, [venuesList]);

  const handleSearch = (e) => {
    e.preventDefault();
    const cleanPostcode = postcode?.trim();
    if (cleanPostcode) {
      navigate(`/find-a-class?postcode=${encodeURIComponent(cleanPostcode.toUpperCase())}`);
      return;
    }
    openModal('venue', {
      postcode: '',
      venue: selectedVenue?.value || '',
      venueId: selectedVenue?.venueId || null
    });
  };

  const customSelectStyles = {
    control: (base, state) => ({
      ...base,
      display: 'flex',
      flexWrap: 'nowrap',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#F1F4F9',
      border: 'none',
      borderRadius: '9px',
      minHeight: '52px',
      height: '52px',
      cursor: 'pointer',
      fontFamily: 'Poppins, sans-serif',
      fontSize: '0.875rem',
      transition: 'none',
      overflow: 'hidden',
      '&:hover': {
        borderColor: 'transparent'
      }
    }),
    valueContainer: (base) => ({
  ...base,
  display: 'grid',            // flex hata ke grid hi rakho
  alignItems: 'center',
  padding: '0 8px 0 16px',
  height: '52px',
  flex: '1 1 auto',
  minWidth: 0,
  overflow: 'hidden'
}),

    placeholder: (base) => ({
      ...base,
      color: '#5F5F6D',
      fontFamily: 'Poppins, sans-serif',
      fontSize: '0.875rem',
      fontWeight: 400,
      margin: 0,
      maxWidth: '100%',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }),
   singleValue: (base) => ({
  ...base,
  color: '#334155',
  fontFamily: 'Poppins, sans-serif',
  fontSize: '0.875rem',
  fontWeight: 400,
  margin: 0,
  maxWidth: '100%',
  minWidth: 0,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
}),
   input: (base) => ({
  ...base,
  color: '#1e293b',
  fontFamily: 'Poppins, sans-serif',
  fontSize: '0.875rem',
  margin: 0,
  padding: 0
}),
    indicatorsContainer: (base) => ({
      ...base,
      height: '52px',
      display: 'flex',
      alignItems: 'center',
      flexShrink: 0
    }),
    dropdownIndicator: (base, state) => ({
      ...base,
      color: '#64748b',
      padding: '0 12px 0 4px',
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      transition: 'transform 0.2s ease, color 0.2s ease',
      transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'none',
      '&:hover': {
        color: '#0DD180'
      }
    }),
    indicatorSeparator: () => ({
      display: 'none'
    }),
    clearIndicator: (base) => ({
      ...base,
      color: '#94a3b8',
      cursor: 'pointer',
      padding: '0 4px',
      display: 'flex',
      alignItems: 'center',
      '&:hover': {
        color: '#64748b'
      }
    }),
    menu: (base) => ({
      ...base,
      borderRadius: '12px',
      backgroundColor: '#ffffff',
      border: '1px solid #E2E8F0',
      marginTop: '8px',
      padding: '6px',
      zIndex: 9999,
      overflow: 'hidden'
    }),
    menuPortal: (base) => ({
      ...base,
      zIndex: 9999
    }),
    menuList: (base) => ({
      ...base,
      padding: '4px',
      maxHeight: '260px'
    }),
    option: (base, state) => ({
      ...base,
      borderRadius: '8px',
      padding: '10px 14px',
      fontSize: '0.875rem',
      fontFamily: 'Poppins, sans-serif',
      cursor: 'pointer',
      backgroundColor: state.isSelected
        ? '#0DD180'
        : state.isFocused
        ? '#E8FAF2'
        : 'transparent',
      color: state.isSelected
        ? '#ffffff'
        : state.isFocused
        ? '#042C89'
        : '#334155',
      fontWeight: state.isSelected ? 600 : 400,
      transition: 'background-color 0.15s ease, color 0.15s ease',
      '&:active': {
        backgroundColor: '#0DD180',
        color: '#ffffff'
      }
    }),
    noOptionsMessage: (base) => ({
      ...base,
      fontFamily: 'Poppins, sans-serif',
      fontSize: '0.875rem',
      color: '#64748b'
    })
  };

  return (
    <section className="-mt-20 relative z-20 pb-12 md:px-0 px-3 touch-manipulation">
      <Container>
        <div 
          className="relative md:rounded-[53px] rounded-[30px] bg-[#0DD180] overflow-hidden p-5 py-12 sm:p-10 md:p-7 md:py-8 min-[900px]:p-9 lg:p-10 xl:p-12 2xl:p-[80px]"
        >
          {/* Mobile background image */}
          <img 
            src={findNearestMobileBg} 
            alt="Find Nearest Background" 
            className="block md:hidden absolute inset-0 w-full h-full object-cover object-center pointer-events-none z-0" 
          />

          {/* Desktop background image */}
          <img 
            src={findNearestBg} 
            alt="Find Nearest Background" 
            className="hidden md:block absolute inset-0 w-full h-full object-cover object-center pointer-events-none z-0" 
          />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-5 lg:gap-8">
            
            {/* Left Big Heading */}
            <div className="text-white lg:ps-10 space-y-1 md:text-left lg:text-left gasoek">
              <h2 className="gasoek text-[43px] font-regular sm:text-5xl md:text-[38px] min-[900px]:text-[44px] lg:text-[50px] xl:text-[75px] 2xl:text-[77px] tracking-[1.5px] leading-[107%] text-white">
                Find your <br />
                nearest <br />
               <span className="text-[#042C89]">
                 Samba
                </span>
              </h2>
            </div>

            {/* Right White Form Box */}
            <div className="bg-white rounded-[30px] p-4 sm:py-10 sm:px-8 md:py-7 md:px-6 lg:py-8 lg:px-7 xl:py-9 xl:px-7 2xl:py-10 2xl:px-8 shadow-2xl w-full md:w-[410px] min-[900px]:w-[550px]  min-[1100px]:w-[700px] xl:max-w-[560px] 2xl:max-w-[602px] border border-slate-100 shrink-0">
              <h3 className="text-[#042C89] md:text-center md:text-[20px] lg:text-[21px] xl:text-[24px] text-[20px] recline mb-4 md:mb-4 lg:mb-5">
                Enter your postcode or choose a venue.
              </h3>

              <form onSubmit={handleSearch} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Postcode Input */}
                  <div>
                    <input
                      type="text"
                      id="postcode-search-input"
                      name="postcode"
                      autoComplete="postal-code"
                      autoCapitalize="characters"
                      spellCheck="false"
                      placeholder="Enter your postcode"
                      value={postcode}
                      onChange={(e) => {
                        setPostcode(e.target.value);
                        if (e.target.value.trim() && selectedVenue) {
                          setSelectedVenue(null);
                        }
                      }}
                      className="w-full h-[52px] bg-[#F1F4F9] poppins placeholder:text-[#5F5F6D] text-slate-800 placeholder-slate-400 text-[16px] sm:text-sm font-normal rounded-[9px] px-4 border-none outline-none focus:outline-none transition-shadow"
                    />
                  </div>

                  {/* Venue Dropdown */}
                  <div className="w-full">
                    <Select
  value={selectedVenue}
  onChange={(option) => {
    setSelectedVenue(option);
    if (option && postcode) {
      setPostcode('');
    }
  }}
  options={venueOptions}
  placeholder="Or choose a venue"
  isClearable
  isSearchable
  isLoading={loadingVenues}
  menuPortalTarget={typeof document !== 'undefined' ? document.body : null}
  menuPosition="fixed"
  styles={customSelectStyles}
  aria-label="Choose a venue"
  filterOption={(option, input) =>
    !input || (option.data.searchText || option.label.toLowerCase()).includes(input.toLowerCase())
  }
  formatOptionLabel={(option, { context }) => {
    if (context === 'value') return option.venueName || option.label;
    const subtitle = [option.area, option.postalCode].filter(Boolean).join(' • ');
    return (
      <div>
        <div style={{ color: '#042C89', fontWeight: 600, fontSize: '14px', lineHeight: 1.3, textTransform: 'capitalize' }}>
          {option.venueName}
        </div>
        {subtitle && (
          <div style={{ color: '#6B7280', fontSize: '12px', lineHeight: 1.3, marginTop: 2 }}>
            {subtitle}
          </div>
        )}
      </div>
    );
  }}
/>
                  </div>
                </div>

                {/* Mint Green Search Button */}
                <button
                  type="submit"
                  className="w-full bg-[#90f2cb] hover:bg-[#0dd17f] text-white font-bold text-[18px] md:text-[16px] lg:text-[18px] poppins py-2 md:py-2.5  rounded-full shadow-sm transition-all cursor-pointer text-center block"
                >
                  Search
                </button>
              </form>
            </div>

          </div>

        </div>
      </Container>
    </section>
  );
}

export default QuickSearch;
