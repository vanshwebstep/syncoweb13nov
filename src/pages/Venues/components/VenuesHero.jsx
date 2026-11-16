import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home, MapPin } from 'lucide-react';
import { Container } from '../../../components/common/Container';
import { useModal } from '../../../context/ModalContext';
import textureBg from 'https://webstepdev.com/demo/syncoWebsiteImages/venues/hero.png';
import texture from 'https://webstepdev.com/demo/syncoWebsiteImages/skill-tracker.png';

import { useVenue } from '../VenueContext';

export function VenuesHero() {
  const { venue, venueName, area } = useVenue();
  const { openModal } = useModal();

  return (
    <div className="w-full  font-sans relative z-[9999]">
      
      {/* Modern Breadcrumb Navigation Bar */}
      <div className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs py-2.5 sm:py-3 transition-all relative z-20">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            {/* Breadcrumb Hierarchy */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 sm:gap-2 flex-wrap text-slate-500 font-medium">
              <Link 
                to="/" 
                className="inline-flex items-center gap-1.5 py-1 px-2 rounded-lg text-slate-600 hover:text-[#0DD180] hover:bg-slate-100/80 transition-all font-medium group"
              >
                <Home className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0DD180] transition-colors" />
                <span>Home</span>
              </Link>

              <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />

              <button
                type="button"
                onClick={() => openModal('venue')}
                className="inline-flex items-center gap-1 py-1 px-2 rounded-lg text-slate-600 hover:text-[#0DD180] hover:bg-slate-100/80 transition-all cursor-pointer font-medium"
              >
                Venues
              </button>

              {area && (
                <>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                  <span className="text-slate-500 font-medium px-1">
                    {area}
                  </span>
                </>
              )}

              <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />

              {/* Active Venue Badge */}
              <span className="inline-flex items-center gap-1.5 bg-[#05255C]/5 border border-[#05255C]/15 text-[#05255C] font-bold px-2.5 py-1 rounded-full text-xs shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0DD180] animate-pulse"></span>
                <span className="truncate max-w-[200px] sm:max-w-[320px]">{venueName}</span>
              </span>
            </nav>

            {/* Change Venue Action Button */}
            <button
              type="button"
              onClick={() => openModal('venue')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#05255C] hover:text-[#0DD180] bg-slate-50 hover:bg-white border border-slate-200 hover:border-[#0DD180]/40 px-3 py-1.5 rounded-full shadow-2xs transition-all cursor-pointer group shrink-0"
              title="Change venue location"
            >
              <MapPin className="w-3.5 h-3.5 text-[#0DD180] group-hover:scale-110 transition-transform" />
              <span>Change Venue</span>
            </button>
          </div>
        </Container>
      </div>

      {/* First Hero Section Matching Reference Image */}
      <section 
        className=" text-[#042C89] ng-transparent relative overflow-hidden py-12 lg:pt-[100px] pb-[200px]"
        style={{
          backgroundImage: `url(${textureBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'bottom',
          backgroundBlendMode: 'multiply'
        }}
      >
        
      
        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Headline */}
              <div>
                <h1 className="recline font-extrabold text-4xl sm:text-[77px] md:text-[54px] lg:text-[66px] xl:text-[77px] text-[#042C89] leading-tight md:leading-[1.05] lg:leading-[1.1] xl:leading-[0.6]">
                  Football classes
                </h1>
                <div className="gasoek text-5xl sm:text-7xl md:text-[54px] lg:text-[72px] xl:text-[101px] text-[#00A6E3] leading-none mt-1">
                  in {venueName}
                </div>
              </div>

              {/* Paragraphs */}
              <div className="space-y-4 text-[#042C89] poppins font-semibold text-sm sm:text-[22px] leading-relaxed max-w-2xl pt-2">
                <p>
                  Brazilian-inspired weekly football classes for children <br /> aged 4–12 — building brilliant skills through a year-long adventure all the way to Rio.
                </p>

                <p className="pt-1">
                  The journey ends in Rio de Janeiro, but it begins in<br />  {venueName}
                </p>
              </div>

              {/* CTA Button */}
              <div className="pt-3">
                <button
                  onClick={() => openModal('booking', { venue: venueName })}
                  className="bg-[#042C89] poppins hover:bg-[#03183d] text-white font-bold text-xs sm:text-[20px] px-7 py-5 rounded-full transition-all cursor-pointer inline-flex items-center justify-center uppercase"
                >
                  BOOK A FREE SKILLS DISCOVERY
                </button>
              </div>

            </div>

        

          </div>
        </Container>
      </section>

    </div>
  );
}
