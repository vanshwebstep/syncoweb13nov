import React from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { ToastProvider } from './components/common/Toaster';
import { ModalProvider } from './context/ModalContext';
import { LanguageProvider } from './context/LanguageContext';
import { ModalContainer } from './components/modals';
import { Header } from './components/layout/Header/Header';
import { Footer } from './components/layout/Footer';
import { AppRoutes } from './routes/AppRoutes';

function AppContent() {
  const location = useLocation();
  const isBookingFlow = 
    location.pathname.startsWith('/book-trial') || 
    location.pathname.startsWith('/book-free-trial') ||
    location.pathname.startsWith('/book-membership') ||
    location.pathname.startsWith('/book-a-membership');

  return (
    <div className="min-h-screen flex flex-col">
      {/* Sticky Header (suppressed on dedicated booking flow) */}
      {!isBookingFlow && <Header />}

      {/* Dynamic Route Pages */}
      <main className="flex-grow">
        <AppRoutes />
      </main>

      {/* Global Modal Overlay Container */}
      <ModalContainer />

      {/* Universal Footer (suppressed on dedicated booking flow) */}
      {!isBookingFlow && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ToastProvider>
        <LanguageProvider>
          <ModalProvider>
            <AppContent />
          </ModalProvider>
        </LanguageProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}
