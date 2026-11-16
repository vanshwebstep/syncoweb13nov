import React from 'react';
import { VenueProvider } from '../Venues/VenueContext';

// 11 Sequential Sections for Road to Rio
import { RoadToRioHero } from './components/RoadToRioHero';
import { RoadToRioCombine } from './components/RoadToRioHeroCombine';

import { WeeklyClassesSection } from './components/WeeklyClassesSection';
import { Everyweek } from './components/Everyweek';
import { GreatCoaches } from './components/GreatCoaches';
import { ShowcaseWeek } from './components/ShowcaseWeekSection';
import { RoadToRioHandsSection } from './components/RoadRioHands';
import { FourLevelSection } from './components/FourLevelsSection';
import { JoyThroughSection } from './components/JoyThroughSection';
import { RightKitSection } from './components/RightKitSection';
import { CopeDeSamba } from './components/CopeDeSamba';
import { ReadyToStart } from './components/ReadyToStartSection';
import './programs-translated.css';

export function ProgramsNewPage() {
  return (
    <VenueProvider>
      <div className="programs-page-container">
        {/* Section 1 - Hero: Your Child's Road to Rio */}
        <div>



        <RoadToRioCombine />

        {/* Section 2 - Weekly classes done differently (Brazil Map + Select Level) */}
        {/* <WeeklyClassesSection /> */}
        </div>

        {/* Section 3 - Every week a new skill to master (Learn, Practice, Master, Apply) */}
        <Everyweek />

        {/* Section 4 - Great skills need great coaches */}
        <GreatCoaches />

        {/* Section 5 - Showcase Week */}
        <ShowcaseWeek />

        {/* Section 6 - Their Road to Rio. In their hands. */}
        <RoadToRioHandsSection />

        {/* Section 7 - Four levels. Four roads to Rio */}
        <FourLevelSection />

        {/* Section 8 - The Samba Way (6 Ingredient Cards) */}
        <JoyThroughSection />

        {/* Section 9 - Every adventure needs the right kit */}
        <RightKitSection />

        {/* Section 10 - Cope de Samba: Everything leads here */}
        <CopeDeSamba />

        {/* Section 11 - Ready to start their Road to Rio? */}
        <ReadyToStart />
      </div>
    </VenueProvider>
  );
}

export default ProgramsNewPage;
