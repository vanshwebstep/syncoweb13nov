import React, { useState } from 'react';
import { Crosshair, ArrowRight, Loader2 } from 'lucide-react';
import { Container } from '../../../components/common/Container';
import { AGE_GROUPS } from '../../../data/findAClassData';
import { findNearestVenue } from '../../../services/venueService';

export function FindAClassHero({
  postcode,
  setPostcode,
  selectedAges,
  setSelectedAges,
  onSearch,
  venues = []
}) {
  const [isLocating, setIsLocating] = useState(false);

  const toggleAge = (ageId) => {
    if (selectedAges.includes(ageId)) {
      setSelectedAges(selectedAges.filter((id) => id !== ageId));
    } else {
      setSelectedAges([...selectedAges, ageId]);
    }
  };

  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      if (venues.length > 0) {
        const p = venues[0]?.postal_code || venues[0]?.postcode;
        if (p) setPostcode(p);
      }
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords?.latitude;
        const lng = pos.coords?.longitude;
        if (lat && lng && venues.length > 0) {
          const nearest = findNearestVenue(venues, lat, lng);
          const p = nearest?.postal_code || nearest?.postcode;
          if (p) setPostcode(p);
        }
        setIsLocating(false);
      },
      () => {
        if (venues.length > 0) {
          const p = venues[0]?.postal_code || venues[0]?.postcode;
          if (p) setPostcode(p);
        }
        setIsLocating(false);
      },
      { timeout: 5000 }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch();
  };

  const hero = 'https://webstepdev.com/demo/syncoWebsiteImages/find-a-class/Hero_Image.png';
  const heroMb = 'https://webstepdev.com/demo/syncoWebsiteImages/find-a-class/Hero-mobile.png';
  const Swoosh = 'https://webstepdev.com/demo/syncoWebsiteImages/find-a-class/Swoosh.png';
  const arrow = 'https://webstepdev.com/demo/syncoWebsiteImages/find-a-class/arrow-blue.png';
  const locate = 'https://webstepdev.com/demo/syncoWebsiteImages/find-a-class/locate.png';

  return (
    <>
      {/* ============================================================== */}
      {/* DESKTOP & TABLET VIEW (md and up) - EXACT ORIGINAL CODE        */}
      {/* ============================================================== */}
      <section
        className="find-a-class-hero-desktop hidden md:block relative w-full text-white py-10 md:py-16 bg-cover bg-right bg-no-repeat"
        style={{ backgroundImage: `url(${hero})` }}
      >
        <Container className="relative z-10">
          {/* Top: copy + kids */}
          <div className="find-a-class-hero-grid grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left */}
            <div className="find-a-class-hero-text lg:col-span-7 z-20">
              <span className="text-[#FFDE14] font-bold text-[12px] sm:text-[10px] tracking-[0.08em] uppercase block mb-4">
                WEEKLY CLASSES · AGES 4–12
              </span>

              <h1 className="recline text-[40px] sm:text-[46px] font-bold text-white leading-[1]">
                Find a class <br />
                <span className="relative gasoek font-normal inline-block text-[#FFE600]">
                  near you.
                  <img src={Swoosh} className="absolute -bottom-5 left-0 w-full" alt="" />
                </span>
              </h1>

              <p className="font-bold text-white text-[15px] sm:text-[17px] leading-snug mt-8">
                Pick a class and try your first session FREE, or book a membership today.
              </p>
            </div>

            {/* Right: kids */}
          </div>
          <div className="find-a-class-hero-kids absolute hidden lg:block right-[140px] -top-16 z-10">
            <div className="w-full max-w-[400px] lg:max-w-[380px] lg:-mr-4">
              <img
                src="/images/find-a-class/hero-kids.png"
                alt="Kids playing Samba football with cones and balls"
                className="w-full h-auto object-contain select-none pointer-events-none"
                loading="eager"
              />
            </div>
          </div>

          {/* Floating Search Card */}
          <div className="mt-6 sm:mt-8 -mb-32 sm:-mb-28 lg:-mb-[150px] relative z-30">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl sm:rounded-[28px] border border-[#042C89]/10 p-4 sm:p-6 sm:pb-10 sm:pt-7 mx-auto"
            >
              <div className="flex flex-col lg:flex-row justify-between poppins items-stretch lg:items-end gap-4">
                {/* Postcode */}
                <div className="flex-1 max-w-[400px]">
                  <label
                    htmlFor="postcode-input-desktop"
                    className="text-[14px] font-bold text-[#042C89] mb-1.5 block"
                  >
                    Postcode
                  </label>
                  <div className="h-[54px] border border-[#C9D3F0] rounded-xl px-3.5 flex items-center justify-between bg-white transition-all">
                    <input
                      id="postcode-input-desktop"
                      type="text"
                      value={postcode}
                      onChange={(e) => setPostcode(e.target.value.toUpperCase())}
                      placeholder="Enter postcode"
                      className="text-[16px] font-regular text-[#282829] placeholder:text-slate-300 outline-none w-full uppercase bg-transparent"
                    />
                    <button
                      type="button"
                      onClick={handleUseLocation}
                      disabled={isLocating}
                      className="text-[#00A6E3] hover:text-[#0B2A8A] font-bold text-[12px] flex items-center gap-1 whitespace-nowrap pl-2 transition-colors cursor-pointer shrink-0"
                    >
                      {isLocating ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <img src={locate} className="w-3 h-3" alt="" />
                      )}
                      <span>Use my location</span>
                    </button>
                  </div>
                </div>

                {/* Child's age */}
                <div className="max-w-[410px]">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[14px] font-bold text-[#042C89]">
                      Child's age
                    </span>
                    <span className="text-[12px] font-regular text-[#797A88]">
                      Tap all that apply
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {AGE_GROUPS.map((group) => {
                      const isSelected = selectedAges.includes(group.id);

                      return (
                        <button
                          key={group.id}
                          type="button"
                          onClick={() => toggleAge(group.id)}
                          className={`flex-1 h-[54px] min-w-[96px] px-3 rounded-full text-xs sm:text-[15px] font-bold transition-all text-center whitespace-nowrap border cursor-pointer ${
                            isSelected
                              ? 'bg-[#042C89] text-white border-[#0B2A8A]'
                              : 'bg-white border-[#C9D3F0] text-[#282829] hover:border-slate-300'
                          }`}
                        >
                          {group.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Search */}
                <div className="shrink-0">
                  <button
                    type="submit"
                    className="w-full min-w-[250px] lg:w-auto h-[54px] text-[#042C89] bg-[#0DD180] font-bold text-[16px] px-12 rounded-full flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                  >
                    <span>Search classes</span>
                    <img src={arrow} className="w-3 h-3" alt="" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Container>
      </section>

      {/* ============================================================== */}
      {/* MOBILE VIEW (only on < md) - MATCHES SCREENSHOT 1               */}
      {/* ============================================================== */}
      <section
        className="block md:hidden relative w-full text-white pt-6 pb-16 bg-cover bg-right bg-no-repeat overflow-visible"
        style={{
          backgroundImage: `url(${heroMb})`,
          backgroundColor: '#00A6E3'
        }}
      >
        <Container className="relative z-10 px-4">
          {/* Top: copy + kids image */}
          <div className="relative flex items-center justify-between min-h-[190px]">
            {/* Left copy */}
            <div className="find-a-class-hero-mobile-copy z-20 max-w-[62%]">
              <span className="text-[#FFDE14] font-bold text-[11px] tracking-[0.06em] uppercase block mb-2">
                WEEKLY CLASSES · AGES 4–12
              </span>

              <h1 className="recline text-[34px] font-bold text-white leading-[0.9]">
                Find a class <br />
                <span className="relative gasoek font-normal inline-block text-[#FFE600] mt-1">
                  near you.
                  <img src={Swoosh} className="absolute -bottom-3 left-0 w-full pointer-events-none" alt="" />
                </span>
              </h1>

              <p className="font-semibold text-white text-[13px] leading-snug mt-5 max-w-[340px]">
                Try your first session FREE,<br /> or book a membership today.
              </p>
            </div>
          </div>
        </Container>
      </section>
      <div className="max-w-[90%] m-auto -mt-12 block md:hidden relative z-30">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-[26px] border border-[#042C89]/10 p-6 mx-auto"
        >
          <div className="flex flex-col poppins items-stretch gap-3.5">
            {/* Postcode */}
            <div className="w-full">
              <label
                htmlFor="postcode-input-mobile"
                className="text-[13px] font-bold text-[#042C89] mb-1.5 block"
              >
                Postcode
              </label>
              <div className="h-12 border border-[#C9D3F0] rounded-xl px-3.5 flex items-center justify-between bg-white transition-all focus-within:border-[#042C89]">
                <input
                  id="postcode-input-mobile"
                  type="text"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value.toUpperCase())}
                  placeholder="Enter postcode"
                  className="text-[15px] font-normal text-[#282829] placeholder:text-slate-400 outline-none w-full uppercase bg-transparent"
                />
                <button
                  type="button"
                  onClick={handleUseLocation}
                  disabled={isLocating}
                  className="text-[#00A6E3] hover:text-[#042C89] font-bold text-[12px] flex items-center gap-1.5 whitespace-nowrap pl-2 transition-colors cursor-pointer shrink-0"
                >
                  {isLocating ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <img src={locate} className="w-3" alt="" />
                  )}
                  <span>Use my location</span>
                </button>
              </div>
            </div>

            {/* Child's age */}
            <div className="w-full mt-2">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[14px] font-bold text-[#042C89]">
                  Child’s age
                </span>
                <span className="text-[12px] font-normal text-[#797A88]">
                  Tap all that apply
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {AGE_GROUPS.map((group) => {
                  const isSelected = selectedAges.includes(group.id);
                  const formattedLabel = group.label.replace('-', '–');

                  return (
                    <button
                      key={group.id}
                      type="button"
                      onClick={() => toggleAge(group.id)}
                      className={`h-[46px] rounded-full text-[13px] font-bold transition-all text-center whitespace-nowrap flex items-center justify-center cursor-pointer ${
                        isSelected
                          ? 'bg-[#042C89] text-white border-2 border-[#042C89] shadow-xs'
                          : 'bg-white border border-[#C9D3F0] text-[#042C89] hover:border-slate-400'
                      }`}
                    >
                      {formattedLabel}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Search button */}
            <div className="w-full mt-1">
              <button
                type="submit"
                className="w-full h-[50px] text-[#042C89] bg-[#00D084] hover:bg-[#00BD77] font-bold text-[15px] px-8 rounded-full flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap transition-all shadow-sm active:scale-98"
              >
                <span>Search classes</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default FindAClassHero;
