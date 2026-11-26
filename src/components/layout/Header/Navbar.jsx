import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ChevronDown, 
  Menu, 
  ArrowRight, 
  MapPin, 
  Calendar, 
  Sun, 
  Gift, 
  User, 
  Compass 
} from 'lucide-react';
import { NAV_LINKS } from '../../../config/navigation';
import { Container } from '../../common/Container';
import { useModal } from '../../../context/ModalContext';

const sssLogo = 'https://webstepdev.com/demo/syncoWebsiteImages/samba-soccer-schools-logo.png';
const sssLogo2 = 'https://webstepdev.com/demo/syncoWebsiteImages/sss-logo-2.png';
const bg = 'https://webstepdev.com/demo/syncoWebsiteImages/bottomNav.png';

const PROGRAMMES_MEGA_ITEMS = [
  {
    title: 'Weekly Classes',
    desc: 'Term-time coaching, every week.',
    action: 'Road to Rio syllabus',
    path: '/road-to-rio',
    icon: Calendar,
    isPrimary: true
  },
  {
    title: 'Holiday Camps',
    desc: 'Half-term and school holidays.',
    action: 'Skills Accelerator',
    path: '/holiday-camps',
    icon: Sun,
    isPrimary: false
  },
  {
    title: 'Birthday Parties',
    desc: '90 minutes, fully hosted.',
    action: 'We run it. You enjoy it.',
    path: '/birthday-party',
    icon: Gift,
    isPrimary: false
  },
  {
    title: 'One-to-One Coaching',
    desc: 'Targeted, personal development.',
    action: 'One child. One coach. One hour.',
    path: '/one-to-one',
    icon: User,
    isPrimary: false
  }
];

export function Navbar({ onMobileMenuToggle }) {
  const location = useLocation();
  const { openModal } = useModal();
  const [isProgramsOpen, setIsProgramsOpen] = useState(false);
  const navContainerRef = useRef(null);
  const hoverTimeoutRef = useRef(null);

  // Close dropdown on outside click or escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navContainerRef.current && !navContainerRef.current.contains(event.target)) {
        setIsProgramsOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsProgramsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  // Close dropdown on route changes
  useEffect(() => {
    setIsProgramsOpen(false);
  }, [location.pathname]);

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setIsProgramsOpen(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsProgramsOpen(false);
    }, 200);
  };

  return (
    <nav 
      ref={navContainerRef}
      className="relative z-[999] py-6 sm:py-4 xl:py-[20px] transition-all duration-300"
      onMouseLeave={handleMouseLeave}
    >
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
              const isProgramsLink = link.label === "Programmes" || link.hasDropdown;
              const isProgramsActive = 
                location.pathname === '/road-to-rio' ||
                location.pathname === '/programs' ||
                location.pathname === '/holiday-camps' ||
                location.pathname === '/birthday-party' ||
                location.pathname === '/one-to-one';

              const isActive = isProgramsLink 
                ? isProgramsActive 
                : (location.pathname === link.path || (link.path === '/' && location.pathname === '/'));
              
              const isFirst = idx === 0;

              return (
                <React.Fragment key={idx}>
                  {!isFirst && (
                    <span className="text-[#0DD180] font-extrabold select-none text-[10px] xl:text-xs main-nav-separator">•</span>
                  )}

                  {isProgramsLink ? (
                    /* Programmes Nav Item with Mega Menu Trigger */
                    <div 
                      className="relative py-1 flex flex-col items-center"
                      onMouseEnter={handleMouseEnter}
                    >
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setIsProgramsOpen((prev) => !prev);
                        }}
                        aria-expanded={isProgramsOpen}
                        className={`px-0.5 xl:px-1.5 py-1 text-[11px] xl:text-[15px] 2xl:text-[17px] recline tracking-[0.1px] xl:tracking-[0.2px] font-extrabold transition-colors flex items-center gap-0.5 xl:gap-1 group whitespace-nowrap main-nav-link cursor-pointer ${
                          isActive || isProgramsOpen
                            ? 'text-[#0DD180]'
                            : 'text-white hover:text-[#0DD180]'
                        }`}
                      >
                        <span className="tracking-[0.1px] xl:tracking-[0.2px] transition-colors">{link.label}</span>
                        <ChevronDown 
                          className={`w-3 h-3 xl:w-3.5 xl:h-3.5 transition-transform duration-300 ${
                            isProgramsOpen ? 'rotate-180 text-[#0DD180]' : 'text-slate-300 group-hover:text-[#0DD180]'
                          }`} 
                        />
                      </button>

                      {/* Green Horizontal Indicator Bar under Programmes */}
                      {isProgramsOpen && (
                        <span className="absolute -bottom-2.5 xl:-bottom-3.5 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#0DD180] rounded-full animate-in fade-in zoom-in-75 duration-200 pointer-events-none" />
                      )}
                    </div>
                  ) : (
                    /* Standard Nav Link */
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
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0 header-action-buttons">
            {/* Outline Pill Button: Our Venues */}
            <Link
              to="/venues"
              className="hidden xl:inline-flex items-center justify-center gap-1.5 border-[1.5px] border-white bg-transparent hover:bg-white/10 text-white font-bold text-[12px] xl:text-[13px] 2xl:text-[14px] px-3.5 xl:px-4 py-1.5 xl:py-2 rounded-full poppins transition-all duration-200 cursor-pointer whitespace-nowrap text-center shadow-sm hover:scale-[1.02] nav-outline-btn"
            >
              <MapPin className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-white shrink-0" />
              <span>Our Venues</span>
            </Link>

            {/* Solid Green Pill Button: Book A FREE Trial */}
            <Link
              to="/find-a-class"
              className="hidden sm:inline-flex items-center justify-center bg-[#0DD180] hover:bg-[#00A6E3] hover:text-white hover:shadow-[0_0_20px_rgba(0,166,227,0.7)] text-[#042C89] font-bold text-[11px] sm:text-[12px] xl:text-[13px] 2xl:text-[14px] px-3.5 sm:px-4 xl:px-5 py-1.5 xl:py-2 poppins rounded-full transition-all duration-300 cursor-pointer whitespace-nowrap hover:scale-[1.02] nav-solid-btn"
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

      {/* =========================================================================
          PROGRAMMES MEGA MENU DROPDOWN PANEL
          Matches exact Figma specs (gradient #003288 -> #005498, white 15% fill cards)
          ========================================================================= */}
      {isProgramsOpen && (
        <div 
          className="absolute top-full left-0 w-full z-50 -pt-1 animate-in fade-in slide-in-from-top-0 duration-300"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div 
            className="w-full border-t border-b border-white/[0.18] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] py-7 lg:py-8 backdrop-blur-xl"
            style={{
              backgroundImage: `linear-gradient(90deg, rgba(0, 50, 136, 0.96) 0%, rgba(0, 84, 152, 0.96) 100%), url(${bg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <Container>
              {/* 1. Header Tag: PROGRAMMES (11px) • Four ways to enjoy Samba (11.5px) */}
              <div className="flex items-center gap-2 mb-5">
                <span className="text-[#0DD180] font-extrabold text-[11px] tracking-[0.1em] uppercase poppins">
                  PROGRAMMES
                </span>
                <span className="text-white/40 text-[10px]">•</span>
                <span className="text-[#9CC6EC] text-[11.5px] poppins font-medium">
                  Four ways to enjoy Samba
                </span>
              </div>

              {/* 2. Four Interactive Cards Grid (18px radius, white 15% fill, white 26% border) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-5">
                {PROGRAMMES_MEGA_ITEMS.map((item, idx) => {
                  const Icon = item.icon;
                  const isCurrent = location.pathname === item.path;

                  return (
                    <Link
                      key={idx}
                      to={item.path}
                      onClick={() => setIsProgramsOpen(false)}
                      className={`group relative bg-white/[0.15] hover:bg-white/[0.22] border rounded-[18px] p-[20px] pb-[18px] min-h-[180px] flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer ${
                        isCurrent 
                          ? 'border-[#0DD180] shadow-lg' 
                          : 'border-white/[0.26] hover:border-[#0DD180]/60'
                      }`}
                    >
                      <div>
                        {/* Icon Badge */}
                        <div 
                          className={`w-11 h-11 rounded-[12px] flex items-center justify-center mb-4 transition-transform group-hover:scale-105 ${
                            item.isPrimary 
                              ? 'bg-[#0DD180] text-[#042C89]' 
                              : 'bg-white/[0.15] text-white group-hover:bg-[#0DD180]/20 group-hover:text-[#0DD180]'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>

                        {/* Title: 17px */}
                        <h3 className="text-white font-semibold text-[17px] poppins leading-snug group-hover:text-[#0DD180] transition-colors">
                          {item.title}
                        </h3>

                        {/* Description: 12.5px, #9CC6EC */}
                        <p className="text-[#9CC6EC] font-semibold text-[12.5px] poppins mt-1.5 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>

                      {/* Action Link Footer: 11.5px */}
                      <div className="mt-4 pt-2 flex items-center gap-1.5 text-[11.5px] font-medium poppins transition-colors">
                        <span className={item.isPrimary ? 'text-[#0DD180]' : 'text-[#9CC6EC] group-hover:text-[#0DD180]'}>
                          {item.action}
                        </span>
                        <ArrowRight 
                          className={`w-3 h-3 group-hover:translate-x-1 transition-transform ${
                            item.isPrimary ? 'text-[#0DD180]' : 'text-[#9CC6EC] group-hover:text-[#0DD180]'
                          }`} 
                        />
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* 3. Bottom Strip: Message (13.5px) + Action Buttons */}
              <div className="mt-7 pt-5 border-t border-white/[0.18] flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Left Helper Message: 13.5px */}
                <div className="flex items-center gap-2 text-white text-[13.5px] poppins">
                  <span className="w-6 h-6 rounded-full  flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-[#0DD180]" />
                  </span>
                  <span>
                    Not sure where to start? Most families begin with a free trial
                    at a weekly class.
                  </span>
                </div>

                {/* Right Action Buttons */}
                <div className="flex items-center gap-3 shrink-0">
                  {/* Our Venues Button */}
                  <Link
                    to="/venues"
                    onClick={() => setIsProgramsOpen(false)}
                    className="inline-flex items-center justify-center border-[1.5px] border-white bg-transparent hover:bg-white/10 text-white font-bold text-[12.5px] xl:text-[13.5px] px-5 py-2 rounded-full poppins transition-all duration-200 shadow-sm cursor-pointer whitespace-nowrap hover:scale-[1.02]"
                  >
                    Our Venues
                  </Link>

                  {/* Book A FREE Trial Button */}
                  <Link
                    to="/find-a-class"
                    onClick={() => setIsProgramsOpen(false)}
                    className="inline-flex items-center justify-center gap-1.5 bg-[#0DD180] hover:bg-[#00A6E3] hover:text-white hover:shadow-[0_0_20px_rgba(0,166,227,0.7)] text-[#042C89] font-bold text-[12.5px] xl:text-[13.5px] px-5 py-2 rounded-full poppins transition-all duration-300 shadow-md cursor-pointer whitespace-nowrap hover:scale-[1.02]"
                  >
                    <span>Book A FREE Trial</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

            </Container>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
