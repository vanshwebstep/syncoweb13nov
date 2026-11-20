import React from 'react';
import { VenueProvider } from './VenueContext';
import { VenuesHero } from './components/VenuesHero';
import { VenueClassesInfo , VenueFirstSession } from './components/VenueClassesInfo';
import { VenueSubscriptionPlans } from './components/VenueSubscriptionPlans';
import { RioJourneyMapSection } from './components/RioJourneyMapSection';
import { WeeklyDestinationSection } from './components/WeeklyDestinationSection';
import { NewWeekSkillSection } from './components/NewWeekSkillSection';
import { MeetSambaStarsSection } from './components/MeetSambaStarsSection';
import { FiveWeeksLearnSection } from './components/FiveWeeksLearnSection';
import { RoadToRioInHandsSection } from './components/RoadToRioInHandsSection';
import { SambaWaySection } from './components/SambaWaySection';
import { RightChallengeSection } from './components/RightChallengeSection';
import { PackBagsRioSection } from './components/PackBagsRioSection';
import { VenueParentsAllRoadsSection } from './components/VenueParentsAllRoadsSection';
import { VenueBottomClassesInfo } from './components/VenueBottomClassesInfo';
import { AskVenueManagerSection } from './components/AskVenueManagerSection';
import { ReadyToBeginCTABanner } from './components/ReadyToBeginCTABanner';
import { VenueCard } from './components/VenueCard';
import { Container } from '../../components/common/Container';
import './venues-translated.css';

export function VenuesPage() {
  return (
    <VenueProvider>
      <div className="venues-page-container">
      {/* 1st Section: Hero Banner with Dynamic Venue Name & Breadcrumbs */}
      <VenuesHero />

      {/* 2nd Section: Map & Info Blocks (Classes at [Venue Name]) */}
      <VenueClassesInfo />
<VenueFirstSession />
      <NewWeekSkillSection />
      <RioJourneyMapSection />
      <RightChallengeSection />
      <MeetSambaStarsSection />

      <VenueParentsAllRoadsSection />
      {/* 3rd Section: Subscription Plan Filter & 3 Cards */}
      <VenueSubscriptionPlans />

      {/* 4th Section: Watch Their Journey Fill Up (Road to Rio Map) */}

      {/* 5th Section: Weekly Football / One Destination / One Great Adventure */}
      {/* <WeeklyDestinationSection /> */}

      {/* 6th Section: New week. New Skill. Another step forward */}

      {/* 7th Section: Meet the Samba Stars (Venue Manager Card) */}

      {/* 8th Section: Five weeks to learn. One week to bring it all together. */}
      {/* <FiveWeeksLearnSection /> */}

      {/* 9th Section: Their Road to Rio. In their hands. */}
      {/* <RoadToRioInHandsSection /> */}

      {/* 10th Section: The Samba Way (6 White Cards Grid) */}
      {/* <SambaWaySection /> */}

      {/* 11th Section: The right challenge at every stage */}

      {/* 12th Section: Pack your bags. We're going to Rio (4 Starter Pack Items) */}
      {/* <PackBagsRioSection /> */}

      {/* 13th Section: Parents at Samba [Location] know it best & All roads lead to Rio */}

      {/* 14th Section: Classes at [Venue Name] (Bottom Map & Details) */}
      <VenueBottomClassesInfo />

      {/* 15th Section: Got a question? Ask [venue manager] */}
      <AskVenueManagerSection />

      {/* 16th Section: The road begins in [location] but ends in Rio. Is your child ready to begin? */}
      {/* <ReadyToBeginCTABanner /> */}

      {/* 17th Section: Additional Venues Grid */}
      </div>
    </VenueProvider>
  );
}

export default VenuesPage;
