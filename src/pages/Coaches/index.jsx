import React from "react";
import "./coaches-translated.css";

import StartWithCoach from "./Components/StartWithCoach";
import StarCoach from "./Components/StarCoach";
import WhyCoachWithSamba from "./Components/WhyCoachWithSamba";
import WhatWePay from "./Components/WhatWePay";
import WhatHappensNext from "./Components/WhatHappensNext";
import ReadyToBecomeCoach from "./Components/ReadyToBecomeCoach";
import Banner from "./Components/Banner";
import { FooterBottom } from "../Contact/components";

const CoachPage = () => {
  return (
    <div className="coaches-page-container">
      <main className="w-full overflow-x-hidden">
        <Banner />
        <StartWithCoach />
        <StarCoach />
        <WhyCoachWithSamba />
        <WhatWePay />
        <WhatHappensNext />
        <ReadyToBecomeCoach />
        <FooterBottom/>
      </main>
    </div>
  );
};

export default CoachPage;