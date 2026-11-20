import React from 'react';
import { VenueProvider } from '../Venues/VenueContext';

// 15 Sections for Skills Accelerator Holiday Camps
import {
  HeroBanner,
  Section2,
  Section3,
  Section4,
  Section5,
  Section6,
  Section7,
  Section8,
  Section9,
  Section10,
  Section11,
  Section12,
  Section13,
  Section14,
  Section15,
} from './components';
import './holiday-camps-translated.css';

export function HolidayCamps() {
  return (
    <VenueProvider>
      <div className="holiday-camps-page-container w-full">
        {/* Section 1 - Hero Banner */}
        <HeroBanner />

        {/* Section 2 */}
        <Section2 />

        {/* Section 3 */}
        <Section3 />

        {/* Section 4 */}
        <Section4 />

        {/* Section 5 */}
        <Section5 />

        {/* Section 6 */}
        <Section6 />

        {/* Section 7 */}
        <Section7 />

        {/* Section 8 */}
        <Section8 />

        {/* Section 9 */}
        <Section9 />

        {/* Section 10 */}
        <Section10 />

        {/* Section 11 */}
        {/* <Section11 /> */}

        {/* Section 12 */}
        <Section12 />

        {/* Section 13 */}
        <Section13 />

        {/* Section 14 */}
        {/* <Section14 /> */}

        {/* Section 15 */}
        <Section15 />
      </div>
    </VenueProvider>
  );
}

export default HolidayCamps;
