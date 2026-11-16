import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu } from 'lucide-react';
import { NAV_LINKS } from '../../../config/navigation';
import { Container } from '../../common/Container';
import { useModal } from '../../../context/ModalContext';

const sssLogo = 'https://webstepdev.com/demo/syncoWebsiteImages/samba-soccer-schools-logo.png';
const sssLogo2 = 'https://webstepdev.com/demo/syncoWebsiteImages/sss-logo-2.png';

export function Navbar({ onMobileMenuToggle }) {
  const location = useLocation();
  const { openModal } = useModal();

  return (
    <nav className="relative z-40 py-6 sm:py-4 xl:py-[20px] transition-all duration-300">
      <Container>
        <div className="flex items-center justify-between gap-2 xl:gap-4">
          
          {/* Samba Brand Logo */}
          <Link to="/" className="flex items-center gap-3 sm:gap-2 group shrink-0">
            <img 
              src={sssLogo2} 
              alt="Samba Soccer Schools" 
              className="w-5 sm:w-9 mt-1 xl:w-[37px] object-contain transition-transform group-hover:scale-105" 
            />
            <img 
              src={sssLogo} 
              alt="Samba Soccer Schools" 
              className="w-[80px] sm:w-[100px] xl:w-[112px] object-contain transition-transform group-hover:scale-105" 
            />
          </Link>

          {/* Desktop Navigation Links with Green Dot Separators */}
          <div className="hidden lg:flex items-center space-x-0.5 xl:space-x-1 font-sans shrink min-w-0 main-nav-links">
            {NAV_LINKS.map((link, idx) => {
              const isActive = location.pathname === link.path || (link.path === '/' && location.pathname === '/');
              const isFirst = idx === 0;

              return (
                <React.Fragment key={idx}>
                  {!isFirst && (
                    <span className="text-[#0DD180] font-extrabold select-none text-[10px] xl:text-xs main-nav-separator">•</span>
                  )}
                  <Link
                    to={link.path}
                    className={`px-0.5 xl:px-1.5 py-1 text-[11px] xl:text-[15px] 2xl:text-[17px] recline tracking-[0.1px] xl:tracking-[0.2px] font-extrabold transition-colors flex items-center gap-0.5 xl:gap-1 group whitespace-nowrap main-nav-link ${
                      isActive
                        ? 'text-[#0DD180]'
                        : 'text-white hover:text-[#0DD180]'
                    }`}
                  >
                    <span className="tracking-[0.1px] xl:tracking-[0.2px]">{link.label}</span>
                    {link.hasArrow && (
                      <ChevronDown className="w-3 h-3 xl:w-3.5 xl:h-3.5 text-slate-300 group-hover:text-[#0DD180] transition-colors" />
                    )}
                  </Link>
                </React.Fragment>
              );
            })}
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center space-x-1 sm:space-x-1.5 shrink-0 header-action-buttons">
            {/* Outline Pill Button: Find A Class */}
            <Link
              to="/find-a-class"
              className="hidden xl:flex items-center justify-center border poppins border-[#0DD180] text-white hover:bg-[#0DD180] hover:text-[#061838] font-bold text-[12px] xl:text-[13px] 2xl:text-[14px] px-3.5 xl:px-3.5 py-1.5 xl:py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap nav-outline-btn"
            >
              Find A Class
            </Link>

            {/* Solid Green Pill Button: Book A FREE Trial */}
            <Link
              to="/book-trial"
              className="hidden sm:flex bg-[#0DD180] hover:bg-[#00c853] text-white font-bold text-[11px] sm:text-[12px] xl:text-[13px] 2xl:text-[14px] px-3 sm:px-3.5 xl:px-4 py-1.5 xl:py-2 poppins rounded-full transition-all cursor-pointer whitespace-nowrap nav-solid-btn"
            >
              Book A FREE Trial
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={onMobileMenuToggle}
              aria-label="Toggle Menu"
              className="p-1.5 text-white lg:hidden hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
            >
              <Menu className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>
          </div>

        </div>
      </Container>
    </nav>
  );
}

export default Navbar;
