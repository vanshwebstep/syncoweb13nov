import React from 'react';
import { VenueProvider } from '../Venues/VenueContext';

// 9 Sections for Birthday Party
import { HeroBanner } from './components/HeroBanner';
import { PlentyOfSamba } from './components/PlentyOfSamba';
import { StartWithOneSession } from './components/StartWithOneSession';
import { OrganiseSection } from './components/OrganiseSection';
import { PartiesSection } from './components/PartiesSection';
import { ReadyToStart } from './components/ReadyToStart';
import { SambaApplication } from './components/SambaApplication';
import { OnetoOneFAQ } from './components/OnetoOneFAQ';
import { FourLevelSection } from './components/FourLevelsSection';
import Building from './components/Building';
import './one-to-one-translated.css';

export function OnetoOne() {
  return (
    <VenueProvider>
      <div className="w-full overflow-x-hidden one-to-one-page-container">
        {/* Section 1 - Hero Banner */}
        <HeroBanner />
        <OrganiseSection />
        <FourLevelSection />
        {/* Section 2 - Plenty of Samba */}
        <PlentyOfSamba />

        {/* Section 3 - Moment of the Day */}
        <StartWithOneSession />

        {/* Section 4 - Organise */}
        <Building />
        {/* Section 5 - Parties */}
        <PartiesSection />

        {/* Section 6 - Pick a Party */}

        {/* Section 7 - Ready to Start */}
        <ReadyToStart />

        {/* Section 8 - Samba Application */}
        <SambaApplication />

        {/* Section 9 - FAQ */}
        <OnetoOneFAQ />
      </div>
    </VenueProvider>
  );
}

export default OnetoOne;
