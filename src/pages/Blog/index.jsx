import React from 'react';
import './blog-translated.css';
import { HowToPlanBanner } from './components/WhySambaHero';
import { VenueProvider } from '../Venues/VenueContext';
import { Category } from './components/Category';
import { Community } from './components/Community';
import { FooterBottom } from '../Contact/components';

export function Blog() {
  return (
    <VenueProvider>
      <div className="blog-page-container">
        {/* 1st Section - Hero Banner: Bring back the beautiful game */}
        <HowToPlanBanner />
        <Category />
        <Community />
        <FooterBottom />
      </div>
    </VenueProvider>
  );
}

export default Blog;
