import React from 'react';
import { TopBar } from './TopBar';
import { Navbar } from './Navbar';
import { MobileNav } from './MobileNav';
import { useScrollHeader } from '../../../hooks/useScrollHeader';
import { useMobileMenu } from '../../../hooks/useMobileMenu';
import './header-translated.css';

const bg = 'https://webstepdev.com/demo/syncoWebsiteImages/bottomNav.png';

export function Header() {
  const isScrolled = useScrollHeader(30);
  const { isOpen, toggle, close } = useMobileMenu();

  return (
    <>
      {/* Top utility bar - Normal document flow, NOT sticky (scrolls off-screen with page) */}
      <TopBar />

      {/* Main navigation header - STICKY at top-0, stays pinned when scrolling across the entire page */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled ? 'shadow-xl' : ''
        }`}
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <Navbar onMobileMenuToggle={toggle} isScrolled={isScrolled} />
      </header>

      {/* Mobile drawer navigation */}
      <MobileNav isOpen={isOpen} onClose={close} />
    </>
  );
}

export default Header;
