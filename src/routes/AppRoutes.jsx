import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/Home';
import VenuesPage from '../pages/Venues';
import FindAClassPage from '../pages/FindAClass';
import BookingFlowPage from '../pages/BookingFlow';
import BookMembershipPage from '../pages/FindAClass/components/Book a Membership';
import ProgramsNewPage from '../pages/ProgramsNew';
import WhySamba from '../pages/WhySamba';
import Blog from '../pages/Blog';
import SingleBlog from '../pages/SingleBlog';
import BirthdayPartyPage from '../pages/BirthdayPartyPage';
import HolidayCampsPage from '../pages/HolidayCampsPage';
import ContactPage from '../pages/ContactPage';
import OnetoOne from '../pages/OnetoOne';
import CoachPage from '../pages/Coaches';
import VenueManagersPage from '../pages/VenueManagers';
import Franchise  from "../pages/Franchise"
import Waitinglist from '../pages/Waitinglist';
import OfferPage from '../pages/Waitinglist/components/OfferPage';
import OfferExpired from '../pages/Waitinglist/components/OfferExpired';
import Terms from '../pages/Terms';
import  PrivacyPolicy from '../pages/PrivacyPolicy';
import SafeguardingPolicy from '../pages/Safeguarding';
import AccessibilityStatement from '../pages/Accessibility';
export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/find-a-class" element={<FindAClassPage />} />
      <Route path="/book-trial" element={<BookingFlowPage />} />
      <Route path="/book-free-trial" element={<BookingFlowPage />} />
      <Route path="/book-membership" element={<BookMembershipPage />} />
      <Route path="/book-a-membership" element={<BookMembershipPage />} />
      <Route path="/waiting-list" element={<Waitinglist />} />
      <Route path="/waitinglist" element={<Waitinglist />} />
      <Route path="/waiting-list/offer" element={<OfferPage />} />
      <Route path="/waitinglist/offer" element={<OfferPage />} />
      <Route path="/waiting-list/offer-expired" element={<OfferExpired />} />
      <Route path="/waitinglist/offer-expired" element={<OfferExpired />} />
      <Route path="/venues" element={<VenuesPage />} />
      <Route path="/road-to-rio" element={<ProgramsNewPage />} />
      <Route path="/programs" element={<ProgramsNewPage />} />
      <Route path="/why-samba" element={<WhySamba />} />
      <Route path="/about" element={<WhySamba />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<SingleBlog />} />
      <Route path="/birthday-party" element={<BirthdayPartyPage />} />
      <Route path="/birthday-parties" element={<Navigate to="/birthday-party" replace />} />
      <Route path="/holiday-camps" element={<HolidayCampsPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/one-to-one" element={<OnetoOne />} />
      <Route path="/coaches" element={<CoachPage />} />
      <Route path="/venue-managers" element={<VenueManagersPage />} />
      <Route path="/franchise" element={<Franchise />} />
      <Route path="/terms" element={<Terms />} />
 <Route path='/privacy' element={<PrivacyPolicy />} />
 <Route path='/safeguarding' element={<SafeguardingPolicy />} />
 <Route path="/accessibility" element={<AccessibilityStatement />} />

      <Route
        path="*"
        element={<div className="p-10">404 - Page Not Found</div>}
      />
    </Routes>
  );
}

export default AppRoutes;
