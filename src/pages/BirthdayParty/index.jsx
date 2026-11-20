import React from 'react';
import { VenueProvider } from '../Venues/VenueContext';

// 15 Sections for Birthday Party
import {
  HeroBanner,
  PlentyOfSamba,
  MomentOfTheDay,
  OrganiseSection,
  VenueParentsAllRoadsSection,
  PickAParty,
  ReadyToStart,
  SambaApplication,
  BirthdayFAQ
} from './components';
import './birthday-party-translated.css';

export function BirthdayParty() {
  return (
    <VenueProvider>
      <div className="birthday-party-page-container w-full">
        {/* Section 1 - Hero Banner */}
        <HeroBanner />

        {/* Section 2 - Plenty of Samba */}
        <PlentyOfSamba />

        {/* Section 3 - Moment of the Day */}
        <MomentOfTheDay />

        {/* Section 4 - Organise */}
        <OrganiseSection />

        {/* Section 5 - Parties */}

        {/* Section 6 - Pick a Party */}
        <PickAParty />
        <VenueParentsAllRoadsSection />

        {/* Section 7 - Ready to Start */}
        <ReadyToStart />

        {/* Section 8 - Samba Application */}
        <SambaApplication />

        {/* Section 9 - Birthday FAQ */}
        <BirthdayFAQ />

      </div>
    </VenueProvider>
  );
}

export default BirthdayParty;
