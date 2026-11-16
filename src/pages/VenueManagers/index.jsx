import React from "react";
import "./venue-managers-translated.css";
import Banner from "./Components/Banner";
import { FooterBottom } from "../Contact/components";
import RunningAVenue from "./Components/RunningAVenue";
import { YourRun } from "./Components/YourRun";
import ToolsToLead from "./Components/ToolsToLead";
import LeadSambaVenue from "./Components/LeadSambaVenue";
import WhatWePay from "./Components/WhatWePay";
import WhatHappensNext from "./Components/WhatHappensNext";
import ReadyToBecomeCoach from "./Components/ReadyToBecomeCoach";

const VenueManagersPage = () => {
    return (
        <div className="venue-managers-page-container">
            <main className="w-full overflow-x-hidden">
                <Banner />
                <RunningAVenue />
                <YourRun />
                <ToolsToLead />
                <LeadSambaVenue />
                <WhatWePay />
                <WhatHappensNext />
                <ReadyToBecomeCoach />
                <FooterBottom />
            </main>
        </div>
    );
};

export default VenueManagersPage;