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
    <header className="sticky top-0 z-50 w-full  md:border-none transition-all duration-300">
      {/* Top utility bar */}
      <TopBar />

      {/* Main navigation container */}
      <div 
       style={{
              backgroundImage: `url(${bg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundBlendMode: 'soft-light'
            }}  className=''
        
      >
        <Navbar onMobileMenuToggle={toggle} isScrolled={isScrolled} />
      </div>

      {/* Mobile drawer navigation */}
      <MobileNav isOpen={isOpen} onClose={close} />
    </header>
  );
}
