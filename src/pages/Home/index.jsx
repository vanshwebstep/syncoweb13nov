import React from 'react';
import { HeroSection } from './components/HeroSection';
import { QuickSearch } from './components/QuickSearch';
import { ProgramsGrid } from './components/ProgramsGrid';
import { PathwaySection } from './components/PathwaySection';
import { AdventureSection } from './components/AdventureSection';
import { Philosophy } from './components/Philosophy';
import { QuoteBanner } from './components/QuoteBanner';
import { Testimonials } from './components/Testimonials';
import { CoachingSection } from './components/CoachingSection';
import { RioRoadmapSection } from './components/RioRoadmapSection';
import { PlayCTA } from './components/PlayCTA';
import texture1 from 'https://webstepdev.com/demo/syncoWebsiteImages/skill-tracker.png';
import './home-translated.css';

export function HomePage() {
  return (
    <div className="home-page-container">
      {/* 1. Hero Banner */}
      <HeroSection />
      
      <div  style={{
             backgroundImage: `url(${texture1})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundBlendMode: 'soft-light'
            }}> 
        {/* 2. Quick Search Card */}
      <QuickSearch />

      {/* 3. Every child comes to football differently (6 Persona Cards) */}
      <ProgramsGrid />
      </div>

      {/* 4. Every child starts somewhere (4 Pathway Quadrants) */}
      <PathwaySection />

      {/* 5. One big adventure (Sticker Album Showcase) */}
      <AdventureSection />

      {/* 6. Joy through ball mastery (Philosophy & 8 Features) */}
      <Philosophy />

      {/* 7. Quote Banner Strip */}
      <QuoteBanner />

      {/* 8. 20,000 happy families and counting (Testimonials) */}
      <Testimonials />

      {/* 9. Coaching done differently */}
      <CoachingSection />

      {/* 10. My Road to Rio */}
      <RioRoadmapSection />

      {/* 11. Let's see what happens when you let them play (CTA) */}
      <PlayCTA />
    </div>
  );
}

export default HomePage;
