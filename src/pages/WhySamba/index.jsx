import React from 'react';
import { WhySambaHero } from './components/WhySambaHero';
import { FootballSchoolSection } from './components/FootballSchoolSection';
import { DiffrentWay } from './components/DiffrentWay';
import { SambaWay } from './components/SambaWay';
import { EveryAdventure } from './components/EveryAdventure';
import { CopeDeSamba } from './components/CopeDeSamba';
import { VenueProvider } from '../Venues/VenueContext';
import './why-samba-translated.css';

export function WhySamba() {
  return (
    <VenueProvider>
    <div className="why-samba-page-container">
      {/* 1st Section - Hero Banner: Bring back the beautiful game */}
      <WhySambaHero />
      {/* 2nd Section - The football school I wish I'd had */}
      <FootballSchoolSection />
      {/* 3rd Section - A Different Way */}
      <DiffrentWay />
      {/* 4th Section - The Samba Way */}
      <SambaWay />
      {/* 5th Section - Putting beauty back in the beautiful game */}
      <EveryAdventure />
      {/* 6th Section - Experience it for yourself, and your child */}
      <CopeDeSamba />
     

    </div>
    </VenueProvider>
  );
}

export default WhySamba;
