import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Phone, ChevronDown, Check } from 'lucide-react';
import { TOPBAR_CONFIG } from '../../../config/navigation';
import { useModal } from '../../../context/ModalContext';
import { useLanguage } from '../../../context/LanguageContext';
const menuMobileBg = 'https://webstepdev.com/demo/syncoWebsiteImages/MenuMobile.png';
const map = 'https://webstepdev.com/demo/syncoWebsiteImages/locate.png';
const user = 'https://webstepdev.com/demo/syncoWebsiteImages/user.png';

const homeIcon = 'https://webstepdev.com/demo/syncoWebsiteImages/General.png';
const findClassIcon = 'https://webstepdev.com/demo/syncoWebsiteImages/Comunications.png';
const programmesIcon = 'https://webstepdev.com/demo/syncoWebsiteImages/program.png';
const whySambaIcon = 'https://webstepdev.com/demo/syncoWebsiteImages/samba.png';
const franchiseIcon = 'https://webstepdev.com/demo/syncoWebsiteImages/franchisee.png';
const contactIcon = 'https://webstepdev.com/demo/syncoWebsiteImages/contact.png';

function NavIcon({ src, active = false, className = "w-6 h-6 mb-1" }) {
  return (
    <span
      aria-hidden="true"
      className={`${className} ${active ? 'bg-[#0DD180]' : 'bg-white group-hover:bg-[#0DD180]'
        } shrink-0 inline-block transition-colors`}
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

export function MobileNav({ isOpen, onClose }) {
  const location = useLocation();
  const { openModal } = useModal();
  const { selectedLanguage, setSelectedLanguage, availableLanguages } = useLanguage();
  const [isLangOpen, setIsLangOpen] = useState(false);

  if (!isOpen) return null;

  const isFranchiseActive = location.pathname === '/contact' && location.search.includes('franchise');
  const isContactActive = location.pathname === '/contact' && !location.search.includes('franchise');

  const navItems = [
    { label: 'Home', to: '/', icon: homeIcon, active: location.pathname === '/' },
    { label: 'Find a Class', to: '/find-a-class', icon: findClassIcon, active: location.pathname === '/find-a-class' || location.pathname === '/find-class' || location.pathname === '/venues' },
    { label: 'Programmes', to: '/road-to-rio', icon: programmesIcon, active: location.pathname === '/road-to-rio' || location.pathname === '/programs' },
    { label: 'Why Samba', to: '/why-samba', icon: whySambaIcon, active: location.pathname === '/why-samba' || location.pathname === '/about' },
    { label: 'Franchise', to: '/contact?type=franchise', icon: franchiseIcon, active: isFranchiseActive },
    { label: 'Contact', to: '/contact', icon: contactIcon, active: isContactActive },
  ];

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer with MenuMobile background */}

      <div
        style={{
          backgroundImage: `url(${menuMobileBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'bottom',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'local',
          backgroundColor: '#042C89',
        }}
        className="relative w-full sm:max-w-sm h-full shadow-2xl p-8 px-10 py-6 sm:p-7 flex flex-col justify-between no-scrollbar overflow-y-auto border-l border-white/10 z-10 animate-in slide-in-from-right duration-300"
      >



        {/* Top Section */}
        <div className="pb-[200px]">
          {/* Close button top-right */}
          <div className="flex items-center justify-end pt-4">
            <button
              onClick={onClose}
              aria-label="Close Menu"
              className="p-1.5 text-white hover:text-slate-300 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links with Icons & Recline Font */}
          <nav className="space-y-4 pt-3">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                onClick={onClose}
                className={`flex items-center gap-4 py-1 ${item.active ? 'text-[#0DD180]' : 'text-white hover:text-[#0DD180]'
                  } font-bold text-[18px] recline  tracking-wide transition-colors group`}
              >
                <NavIcon src={item.icon} active={item.active} />
                <span>{item.label}</span>
              </Link>
            ))}

            {/* 7. PHONE */}
            <a
              href={`tel:${TOPBAR_CONFIG.phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-5 py-1 text-white hover:text-[#0DD180] font-bold text-[18px] recline tracking-wide transition-colors group"
            >
              <Phone className="w-5 h-5 mb-1 text-white group-hover:text-[#0DD180] shrink-0 transition-colors" />
              <span>{TOPBAR_CONFIG.phoneFormatted || TOPBAR_CONFIG.phone}</span>
            </a>

          </nav>
        </div>

        {/* Bottom Action Buttons */}
        <div className="pt-[180px] pb-[20px] space-y-3.5">

          {/* Find Your Child's Class - Green Outline Pill */}
          <Link
            to="/find-a-class"
            onClick={onClose}
            className="w-full border border-[#0DD180] bg-transparent hover:bg-[#0DD180]/10 text-white font-bold recline text-[18px] py-3 rounded-full text-center transition-all cursor-pointer block"
          >
            Find Your Child’s Class
          </Link>

          {/* Book A FREE Trial - Solid Green Pill */}
          <Link
            to="/book-trial"
            onClick={onClose}
            className="w-full bg-[#0DD180] hover:bg-[#00c853] text-white font-bold recline text-[18px] py-3 rounded-full shadow-md text-center transition-all cursor-pointer block"
          >
            Book A FREE Trial
          </Link>

          {/* Parent Login - Deep Navy Blue Pill */}
          <Link
          target='_blank'
            to={TOPBAR_CONFIG.memberPortalUrl}
            onClick={onClose}
            className="bg-[#042C89] w-full flex gap-2.5 items-center text-white recline text-[18px] py-3 rounded-full inline-flex items-center justify-center whitespace-nowrap transition-colors"
          >
            <img src={user} alt="Phone" className="w-[17px] mb-[1px]" />
            Parent Login
          </Link>

          {/* Location / Language Selector */}
          <div className="relative w-max m-auto">
            <button
              type="button"
              onClick={() => setIsLangOpen((prev) => !prev)}
              aria-label={`Language selector (Current: ${selectedLanguage.label})`}
              aria-expanded={isLangOpen}
              className="flex items-center w-max m-auto gap-[12px] bg-white/20 hover:bg-white/30 p-2.5 px-8 rounded-full text-white font-semibold text-[18px] backdrop-blur-sm cursor-pointer transition-colors"
            >
              <img src={map} alt="Location" className="w-[16px] mb-0.5 object-contain" />
              <span className="poppins font-bold uppercase">{selectedLanguage.code}</span>
              <ChevronDown className={`w-4 h-4 text-white/80 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
            </button>

            {isLangOpen && (
              <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-64 bg-[#042C89] border border-white/20 rounded-2xl shadow-2xl py-2 z-50 backdrop-blur-md overflow-hidden max-h-[60vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
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
                        isSelected
                          ? 'bg-white/20 text-white font-bold'
                          : 'text-white/80 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-base">{lang.flag}</span>
                        <span>{lang.label}</span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="text-xs uppercase text-white/60">{lang.code}</span>
                        {isSelected && <Check className="w-4 h-4 text-[#0DD180]" />}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>


        </div>

      </div>
    </div>
  );
}
