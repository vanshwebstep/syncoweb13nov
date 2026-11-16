import React from 'react';
import { HeroSection, LocationSection, MapSection,FooterBottom } from './components';
import './contact-translated.css';

export function ContactPage() {
  return (
    <div className="contact-page-container w-full">
      {/* Section 1: Hero Section */}
      <HeroSection />

      {/* Section 2: Location & Contact Form Section */}
      <LocationSection />

        {/* Section 3: Map Section */}
        <MapSection />
        <FooterBottom />
    </div>
  );
}



export default ContactPage;
