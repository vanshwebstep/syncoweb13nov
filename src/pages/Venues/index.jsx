import React from 'react';
import { VenueProvider } from './VenueContext';
import { VenuesHero } from './components/VenuesHero';
import { VenueClassesInfo, VenueFirstSession } from './components/VenueClassesInfo';
import { VenueSubscriptionPlans } from './components/VenueSubscriptionPlans';
import { RioJourneyMapSection } from './components/RioJourneyMapSection';
import { NewWeekSkillSection } from './components/NewWeekSkillSection';
import { MeetSambaStarsSection } from './components/MeetSambaStarsSection';
import { RightChallengeSection } from './components/RightChallengeSection';
import { VenueParentsAllRoadsSection } from './components/VenueParentsAllRoadsSection';
import { VenueBottomClassesInfo } from './components/VenueBottomClassesInfo';
import { AskVenueManagerSection } from './components/AskVenueManagerSection';
import { OtherVenuesSection } from './components/OtherVenuesSection';
import './venues-translated.css';

export function VenuesPage() {
  return (
    <VenueProvider>
      <div className="venues-page-container">
        {/* 1st Section: Hero Banner with Dynamic Venue Name, Selector & Breadcrumbs */}
        <VenuesHero />

        {/* 2nd Section: Timetable & Classes at [Venue Name] */}
        <VenueClassesInfo />

        {/* 3rd Section: How the free trial works */}
        <VenueFirstSession />

        {/* 4th Section: New Week New Skill */}
        <NewWeekSkillSection />

        {/* 5th Section: Road to Rio Map */}
        <RioJourneyMapSection />

        {/* 6th Section: The right challenge at every stage */}
        <RightChallengeSection />

        {/* 7th Section: Meet your venue manager */}
        <MeetSambaStarsSection />

        {/* 8th Section: Parents know it best */}
        <VenueParentsAllRoadsSection />

        {/* 9th Section: Simple Prices & Plans */}
        <VenueSubscriptionPlans />

        {/* 10th Section: Finding us (Clean Interactive Map & Venue info) */}
        <VenueBottomClassesInfo />

        {/* 11th Section: FAQs */}
        <AskVenueManagerSection />

        {/* 12th Section: Explore other Samba venues */}
        <OtherVenuesSection />
      </div>
    </VenueProvider>
  );
}

export default VenuesPage;
