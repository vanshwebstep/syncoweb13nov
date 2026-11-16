import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, Phone, ChevronDown, Check } from 'lucide-react';
import { TOPBAR_CONFIG } from '../../../config/navigation';
import { Container } from '../../common/Container';
import { useLanguage, LANGUAGES } from '../../../context/LanguageContext';

const sssLogo = 'https://webstepdev.com/demo/syncoWebsiteImages/topbar.png';
const phone = 'https://webstepdev.com/demo/syncoWebsiteImages/phone.png';
const map = 'https://webstepdev.com/demo/syncoWebsiteImages/locate.png';
const user = 'https://webstepdev.com/demo/syncoWebsiteImages/user.png';

export function TopBar() {
  const languageCtx = useLanguage();
  const [localLang, setLocalLang] = useState(() => {
    const defaultCode = (TOPBAR_CONFIG.location || 'UK').toUpperCase();
    return (
      LANGUAGES.find((l) => l.code === defaultCode || l.langCode === defaultCode.toLowerCase() || (defaultCode === 'EN' && l.code === 'UK')) ||
      LANGUAGES[0]
    );
  });
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedLanguage = languageCtx?.selectedLanguage || localLang;

  const handleSelectLanguage = (lang) => {
    if (languageCtx?.setSelectedLanguage) {
      languageCtx.setSelectedLanguage(lang);
    }
    setLocalLang(lang);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div
      style={{
        backgroundImage: `url(${sssLogo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'soft-light'
      }}
      className="text-white text-xs py-3 sm:py-2 relative z-[60]"
    >
      <Container>
        <div className="flex justify-between items-center gap-2">

          {/* Left: Star Rating */}
          <div className="flex items-center gap-1.5 font-sans shrink-0">
            <Star className="w-3.5 h-3.5 xl:w-4 xl:h-4 mb-[5px] me-0.5 text-[#FFDE14] fill-[#FFDE14] recline" />
            <span dir="ltr" translate="no" className="notranslate font-extrabold text-[#FFDE14] recline text-[15px] xl:text-[17px]">{TOPBAR_CONFIG.rating}</span>
            <span className="text-white text-[10px] sm:text-[12px] poppins font-semibold whitespace-nowrap">{TOPBAR_CONFIG.ratingText}</span>
          </div>

          {/* Center: Tagline Announcement */}
          <div className="hidden lg:block font-semibold text-white poppins text-[11px] xl:text-[12px] tracking-wide text-center truncate px-2 topbar-tagline">
            {TOPBAR_CONFIG.announcement}
          </div>

          {/* Right: Phone, Location Badge & Parent Login */}
          <div className="topbar-right-group flex items-center gap-2.5 sm:gap-3 xl:gap-4 shrink-0">
            {/* Phone */}
            <a
              href={`tel:${TOPBAR_CONFIG.phone}`}
              dir="ltr"
              className="md:flex hidden items-center gap-1.5 hover:text-white/80 transition-colors text-white font-medium"
            >
              <img src={phone} alt="Phone" className="w-2.5 xl:w-[10px] object-contain" />
              <span dir="ltr" translate="no" className="notranslate recline text-[12px] xl:text-[14px] tracking-[6%] whitespace-nowrap leading-none">{TOPBAR_CONFIG.phone}</span>
            </a>

            <Link
              target='_blank'
              to={TOPBAR_CONFIG.memberPortalUrl}
              className="bg-[#042C89] flex gap-2 items-center text-white poppins text-[8px] sm:text-[11.5px] font-bold px-3.5 xl:px-4 py-[6px] xl:py-[7px] rounded-full inline-flex items-center justify-center whitespace-nowrap transition-colors topbar-parent-btn"
            >
              <img src={user} alt="Parent" className="w-2 xl:w-[10px] mb-[1px]" />
              Parent Login
            </Link>

            {/* Language Selector */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                translate="no"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen((prev) => !prev);
                }}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                aria-label={`Selected language: ${selectedLanguage.label}. Click to change language.`}
                data-testid="language-selector"
                className="notranslate flex items-center gap-1 xl:gap-1.5 bg-white/20 hover:bg-white/30 px-2.5 xl:px-3 py-0.5 xl:ps-3.5 xl:py-1.5 rounded-full text-white font-semibold text-[10px] xl:text-[11px] backdrop-blur-sm cursor-pointer transition-colors focus:outline-none focus:ring-1 focus:ring-white/40 select-none"
              >
                <img src={map} alt="" className="w-[7px] sm:w-[9px] mb-0.5 object-contain" />
                <span translate="no" className="notranslate poppins text-[8px] md:text-[11px] xl:text-[13px] font-bold uppercase">
                  {selectedLanguage.code}
                </span>
                <ChevronDown
                  className={`w-2.5 h-2.5 sm:w-3 sm:h-3 text-white/80 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Accessible hidden select for screen readers / automated tests */}
              <select
                aria-label="Change language"
                data-testid="language-select"
                value={selectedLanguage.code}
                onChange={(e) => {
                  const found = LANGUAGES.find((l) => l.code === e.target.value);
                  if (found) handleSelectLanguage(found);
                }}
                className="sr-only"
                tabIndex={-1}
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.label} ({lang.code})
                  </option>
                ))}
              </select>

              {/* Dropdown Menu */}
              {isOpen && (
                <div
                  role="listbox"
                  translate="no"
                  aria-label="Languages"
                  data-testid="language-dropdown"
                  className="notranslate absolute right-0 top-full mt-2 w-56 sm:w-60 bg-[#042C89] border border-white/20 rounded-xl shadow-2xl py-1.5 z-[100] backdrop-blur-md overflow-hidden max-h-[80vh] overflow-y-auto"
                >
                  <div className="px-3 py-1 text-[10px] uppercase font-bold text-white/50 tracking-wider border-b border-white/10 mb-1">
                    Select Language
                  </div>
                  {LANGUAGES.map((lang) => {
                    const isSelected = selectedLanguage.code === lang.code;
                    return (
                      <button
                        key={lang.code}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        data-testid={`language-option-${lang.code.toLowerCase()}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectLanguage(lang);
                        }}
                        className={`w-full px-3 py-1.5 text-left flex items-center justify-between text-[11px] sm:text-xs transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-white/20 text-white font-bold'
                            : 'text-white/80 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-sm leading-none">{lang.flag}</span>
                          <span className="poppins">{lang.label}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] uppercase tracking-wider text-white/60 font-mono">
                            {lang.code}
                          </span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-[#0DD180]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Parent Login Button */}
          </div>

        </div>
      </Container>
    </div>
  );
}
