import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Phone, ChevronDown, ChevronRight, Check, MapPin, Star, User, CalendarDays, Sun, Gift } from 'lucide-react';
import { TOPBAR_CONFIG } from '../../../config/navigation';
import { useLanguage } from '../../../context/LanguageContext';

const menuMobileBg = 'https://webstepdev.com/demo/syncoWebsiteImages/mobilebgblue.png';
const logo = 'https://webstepdev.com/demo/syncoWebsiteImages/logo.png'; // <- apna Samba white logo URL yaha daalo
const sssLogo = 'https://webstepdev.com/demo/syncoWebsiteImages/samba-soccer-schools-logo.png';
const sssLogo2 = 'https://webstepdev.com/demo/syncoWebsiteImages/sss-logo-2.png';

const homeIcon = 'https://webstepdev.com/demo/syncoWebsiteImages/General.png';
const findClassIcon = 'https://webstepdev.com/demo/syncoWebsiteImages/Comunications.png';
const programmesIcon = 'https://webstepdev.com/demo/syncoWebsiteImages/program.png';
const whySambaIcon = 'https://webstepdev.com/demo/syncoWebsiteImages/samba.png';
const franchiseIcon = 'https://webstepdev.com/demo/syncoWebsiteImages/franchisee.png';
const contactIcon = 'https://webstepdev.com/demo/syncoWebsiteImages/contact.png';

const GREEN = '#0DD180';

function NavIcon({ src, active = false }) {
  return (
    <span
      aria-hidden="true"
      className={`w-[15px] h-[15px] shrink-0 inline-block transition-colors ${active ? 'bg-[#0DD180]' : 'bg-white'}`}
      style={{
        maskImage: `url(${src})`,
        WebkitMaskImage: `url(${src})`,
        maskSize: 'contain',
        WebkitMaskSize: 'contain',
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        maskPosition: 'center',
        WebkitMaskPosition: 'center',
      }}
    />
  );
}

const programmeItems = [
  { label: 'Weekly Classes', to: '/road-to-rio', Icon: CalendarDays },
  { label: 'Holiday Camps', to: '/holiday-camps', Icon: Sun },
  { label: 'Birthday Parties', to: '/birthday-parties', Icon: Gift },
  { label: 'One-to-One Coaching', to: '/one-to-one-coaching', Icon: User },
];

export function MobileNav({ isOpen, onClose }) {
  const location = useLocation();
  const { selectedLanguage, setSelectedLanguage, availableLanguages } = useLanguage();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const path = location.pathname;

  const isProgrammeRoute = ['/road-to-rio', '/programs', '/holiday-camps', '/birthday-parties', '/one-to-one-coaching'].includes(path);
  const [isProgOpen, setIsProgOpen] = useState(isProgrammeRoute);

  if (!isOpen) return null;

  const isFranchiseActive = path === '/contact' && location.search.includes('franchise');
  const isContactActive = path === '/contact' && !location.search.includes('franchise');

  const rowBase = 'flex items-center gap-3.5 w-full py-[13px] font-bold text-[16.5px] recline tracking-wide transition-colors';

  const NavLink = ({ label, to, icon, active }) => (
    <Link
      to={to}
      onClick={onClose}
      className={`${rowBase} ${active ? 'text-[#0DD180]' : 'text-white hover:text-[#0DD180]'}`}
    >
      <NavIcon src={icon} active={active} />
      <span>{label}</span>
    </Link>
  );

  const progActive = isProgOpen || isProgrammeRoute;

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onClose} />

      {/* Drawer */}
      <div
        style={{
          backgroundImage: `url(${menuMobileBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'bottom',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#042C89',
        }}
        className="relative z-10 w-full sm:max-w-sm h-full shadow-2xl flex flex-col border-l border-white/10 animate-in slide-in-from-right duration-300"
      >
        {/* ===== TOP INFO BAR ===== */}
        <div className="flex items-center justify-between px-5 py-2.5 bg-white/[0.08] shrink-0">
          <div className="flex items-center gap-1.5 text-white">
            <Star className="w-3.5 h-3.5 fill-[#FFC83D] text-[#FFC83D]" />
            <span className="text-[13px] font-bold poppins">4.8</span>
            <span className="text-[11.5px] poppins">Google Rating</span>
          </div>

          <div className="flex items-center gap-2 relative">
            <a
              href={TOPBAR_CONFIG.memberPortalUrl}
              target="_blank"
              rel="noreferrer"
              onClick={onClose}
              className="flex items-center gap-1.5 bg-white/[0.12] hover:bg-white/20 text-white text-[11px] font-semibold poppins px-3 py-1.5 rounded-full transition-colors"
            >
              <User className="w-3 h-3" />
              Parent Login
            </a>

            <button
              type="button"
              onClick={() => setIsLangOpen((p) => !p)}
              aria-expanded={isLangOpen}
              aria-label={`Language selector (Current: ${selectedLanguage.label})`}
              className="flex items-center gap-1 bg-white/[0.12] hover:bg-white/20 text-white text-[11px] font-semibold poppins uppercase px-3 py-1.5 rounded-full transition-colors cursor-pointer"
            >
              <MapPin className="w-3 h-3" />
              {selectedLanguage.code}
            </button>

            {isLangOpen && (
              <div className="absolute top-full right-0 mt-2 w-60 bg-[#042C89] border border-white/20 rounded-2xl shadow-2xl py-2 z-50 backdrop-blur-md max-h-[60vh] overflow-y-auto">
                <div className="px-4 py-1 text-[11px] uppercase font-bold text-white/50 tracking-wider border-b border-white/10 mb-1">
                  Select Language
                </div>
                {availableLanguages.map((lang) => {
                  const isSelected = selectedLanguage.code === lang.code;
                  return (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => {
                        setSelectedLanguage(lang);
                        setIsLangOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-left flex items-center justify-between text-sm transition-colors cursor-pointer ${
                        isSelected ? 'bg-white/20 text-white font-bold' : 'text-white/80 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-base">{lang.flag}</span>
                        <span>{lang.label}</span>
                      </span>
                      {isSelected && <Check className="w-4 h-4 text-[#0DD180]" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* ===== LOGO + CLOSE ===== */}
        <div className="flex items-center justify-between px-5 pt-5 pb-2 shrink-0">
         
           <Link to="/" onClick={onClose} className="flex items-center gap-3 sm:gap-2 group shrink-0">
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
          <button
            onClick={onClose}
            aria-label="Close Menu"
            className="w-[40px] h-[40px] rounded-full bg-white/[0.12] hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ===== SCROLLABLE NAV ===== */}
        <div className="flex-1 overflow-y-auto no-scrollbar">
          <nav className="pt-2">
            <div className="px-5">
              <NavLink label="Home" to="/" icon={homeIcon} active={path === '/'} />
              <NavLink
                label="Find a Class"
                to="/find-a-class"
                icon={findClassIcon}
                active={['/find-a-class', '/find-class', '/venues'].includes(path)}
              />
            </div>

            {/* Programmes accordion */}
            <div className={`transition-colors ${isProgOpen ? 'bg-white/[0.08]' : ''}`}>
              <button
                type="button"
                onClick={() => setIsProgOpen((p) => !p)}
                aria-expanded={isProgOpen}
                className={`${rowBase} px-5 cursor-pointer justify-between ${progActive ? 'text-[#0DD180]' : 'text-white'}`}
              >
                <span className="flex items-center gap-3.5">
                  <NavIcon src={programmesIcon} active={progActive} />
                  <span>Programmes</span>
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isProgOpen ? 'rotate-180' : ''}`} />
              </button>

              {isProgOpen && (
                <div className="bg-black/10 pb-1.5">
                  {programmeItems.map(({ label, to, Icon }) => {
                    const active = path === to;
                    return (
                      <Link
                        key={label}
                        to={to}
                        onClick={onClose}
                        className="flex items-center justify-between px-5 py-2.5 group"
                      >
                        <span className="flex items-center gap-3">
                          <span
                            className="w-[30px] h-[30px] rounded-lg flex items-center justify-center shrink-0"
                            style={{ backgroundColor: active ? GREEN : 'rgba(255,255,255,0.12)' }}
                          >
                            <Icon className="w-[15px] h-[15px]" style={{ color: active ? '#042C89' : '#fff' }} />
                          </span>
                          <span
                            className="text-[14px] font-bold recline"
                            style={{ color: active ? GREEN : '#fff' }}
                          >
                            {label}
                          </span>
                        </span>
                        <ChevronRight className="w-4 h-4" style={{ color: active ? GREEN : 'rgba(255,255,255,0.6)' }} />
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="px-5">
              <NavLink
                label="Why Samba"
                to="/why-samba"
                icon={whySambaIcon}
                active={path === '/why-samba' || path === '/about'}
              />
              <NavLink label="Franchise" to="/contact?type=franchise" icon={franchiseIcon} active={isFranchiseActive} />
              <NavLink label="Contact" to="/contact" icon={contactIcon} active={isContactActive} />

              {/* Phone */}
              <a
                href={`tel:${TOPBAR_CONFIG.phone.replace(/\s+/g, '')}`}
                className={`${rowBase} text-[#0DD180]`}
              >
                <Phone className="w-[15px] h-[15px] shrink-0" />
                <span>{TOPBAR_CONFIG.phoneFormatted || TOPBAR_CONFIG.phone}</span>
              </a>
            </div>
          </nav>

          {/* ===== "NOT SURE" BOX ===== */}
          <div className="px-5 pt-5 pb-4">
            <div className="bg-white/[0.11] border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
              <h4 className="text-white text-[15px] font-bold recline leading-tight">Not sure where to start?</h4>
              <p className="text-white/70 text-[12.5px] font-normal poppins mt-1.5 leading-snug">
                Most families begin with a free trial at a weekly class.
              </p>
            </div>

            <div className="flex items-center gap-1.5 mt-3.5 px-1 text-white">
              <Star className="w-3 h-3 fill-[#FFC83D] text-[#FFC83D]" />
              <span className="text-[12.5px] font-bold poppins">4.8</span>
              <span className="text-[12px] poppins text-white/80">· 182 Google reviews →</span>
            </div>
          </div>
        </div>

        {/* ===== BOTTOM BUTTONS ===== */}
        <div className="shrink-0 flex items-center gap-3 px-5 py-4">
          <Link
            to="/venues"
            onClick={onClose}
            className="flex-1 flex items-center justify-center gap-2 border-[1.5px] border-white bg-transparent hover:bg-white/10 text-white font-bold poppins text-[13.5px] py-3 rounded-full transition-all cursor-pointer whitespace-nowrap"
          >
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            Our Venues
          </Link>

          <Link
            to="/book-trial"
            onClick={onClose}
            className="flex-1 flex items-center justify-center bg-[#0DD180] hover:bg-[#00A6E3] hover:text-white text-[#042C89] font-bold poppins text-[13.5px] py-3 rounded-full shadow-md transition-all duration-300 cursor-pointer whitespace-nowrap"
          >
            Book a FREE Trial
          </Link>
        </div>
      </div>
    </div>
  );
}