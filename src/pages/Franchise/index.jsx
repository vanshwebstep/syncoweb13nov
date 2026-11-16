import React from "react";
import Banner from "./Components/Banner";
import StatsBar from "./Components/StatsBar";
import CoachWall from "./Components/CoachWall";
import FounderStory from "./Components/FounderStory";
import FromCoachingToBusiness from "./Components/FromCoachingToBusiness";
import CoachesTestimonials from "./Components/CoachesTestimonials";
import JoyThroughBallMastery from "./Components/JoyThroughBallMastery";
import RoadToRioAdventure from "./Components/RoadToRioAdventure";
import ModelWorkingStats from "./Components/ModelWorkingStats";
import { FooterBottom } from "../Contact/components";

import BuiltVenueByVenue from "./Components/BuiltVenueByVenue";
import ReadProspectus from "./Components/ReadProspectus";
import SystemsBlueprint from "./Components/SystemsBlueprint";
import FinancialBlueprint from "./Components/FinancialBlueprint";
import FranchisePartnerProfile from "./Components/FranchisePartnerProfile";
import FirstCallToSession from "./Components/FirstCallToSession";
import RoadToOwnershipForm from "./Components/RoadToOwnershipForm";
import FranchiseFAQ from "./Components/FranchiseFAQ";
import FundingSupport from "./Components/FundingSupport";
import "./franchise-translated.css";

const Franchise = () => {
  return (
    <main className="w-full overflow-x-hidden franchise-page-container">
      {/* 1. Hero Banner */}
      <Banner />

      {/* 2. Key Stats Bar */}
      <StatsBar />

      {/* 3. Wall of Coaches */}
      <CoachWall />

      {/* 4. Founder Story (Coach Nilio) */}
      <FounderStory />

      {/* 5. From Coaching Sessions to Your Own Business */}
      <FromCoachingToBusiness />

      {/* 6. Coaches Testimonials (Franchise Partners) */}
      <CoachesTestimonials />

      {/* 7. Joy through Ball Mastery */}
      <JoyThroughBallMastery />

      {/* 8. Road to Rio - One Big Adventure */}
      <RoadToRioAdventure />

      {/* 9. A Model That's Already Working (15+ Years Proof) */}
      <ModelWorkingStats />

      {/* 10. The Business Model - Built Venue by Venue */}
      <BuiltVenueByVenue />

      {/* 11. Read The Prospectus Download Form */}
      <ReadProspectus />

      {/* 12. Systems Behind You - We've Built The Blueprint */}
      <SystemsBlueprint />

      {/* 13. Financial Blueprint & Investment */}
      <FinancialBlueprint />

      <FundingSupport />
      {/* 14. Could You Be Our Next Franchise Partner Profile */}
      {/* <FranchisePartnerProfile /> */}

      {/* 15. From First Call to First Session Journey */}
      <FirstCallToSession />

      {/* 16. Start Your Road to Ownership Multi-step Form */}
      <RoadToOwnershipForm />

      {/* 17. FAQs Accordion */}
      <FranchiseFAQ />
        <FooterBottom />
    </main>
  );
};

export default Franchise;