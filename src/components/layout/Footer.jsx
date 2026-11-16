import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, MapPin, Mail, ChevronDown } from 'lucide-react';
import { FOOTER_LINKS, MOBILE_FOOTER_LINKS, TOPBAR_CONFIG } from '../../config/navigation';
import { Container } from '../common/Container';
import { useToast } from '../common/Toaster';
import './footer-translated.css';

const sssLogo = 'https://webstepdev.com/demo/syncoWebsiteImages/footerLogo.png';
const sssLogo2 = 'https://webstepdev.com/demo/syncoWebsiteImages/sss-logo.png';
const coaching = 'https://webstepdev.com/demo/syncoWebsiteImages/coaching.png';

const facebookIcon = 'https://webstepdev.com/demo/syncoWebsiteImages/Facebook.png';
const instagramIcon = 'https://webstepdev.com/demo/syncoWebsiteImages/Instagram.png';
const twitterIcon = 'https://webstepdev.com/demo/syncoWebsiteImages/Twitter.png';
const youtubeIcon = 'https://webstepdev.com/demo/syncoWebsiteImages/YouTube.png';
const linkedinIcon = 'https://webstepdev.com/demo/syncoWebsiteImages/LinkendIn.png';

const ENDPOINT = '/api/open/join-our-mailing-list';

export function Footer() {
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isProgrammesOpen, setIsProgrammesOpen] = useState(true);
  const [isMobileProgrammesOpen, setIsMobileProgrammesOpen] = useState(true);

  const handleSubscribe = async (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      toast.error('Email is required');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      toast.error('Enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      const rawBase = import.meta.env.VITE_API_BASE_URL || 'https://api.grabbite.com';
      const baseUrl = rawBase.replace(/\/+$/, '');
      const apiUrl = `${baseUrl}${ENDPOINT}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: trimmedEmail }),
      });

      let data = null;
      try {
        data = await response.json();
      } catch {
        // Non-JSON response
      }

      if (response.ok && data?.status !== false) {
        toast.success(data?.message || 'Thank you for joining our mailing list!');
        setEmail('');
      } else {
        const errorMsg = data?.message || 'Something went wrong. Please try again.';
        toast.error(errorMsg);
      }
    } catch (error) {
      console.error('Mailing list subscription error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { name: 'Facebook', icon: facebookIcon, url: 'https://facebook.com/sambasoccerschools' },
    { name: 'Instagram', icon: instagramIcon, url: 'https://instagram.com/sambasoccerschools' },
    { name: 'YouTube', icon: youtubeIcon, url: 'https://youtube.com/@sambasoccerschools' },
    { name: 'LinkedIn', icon: linkedinIcon, url: 'https://linkedin.com/company/sambasoccerschools' },
    { name: 'Twitter', icon: twitterIcon, url: 'https://twitter.com/sambasoccerschools' }
  ];

  return (
    <footer
      style={{
        backgroundImage: `url(${coaching})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'soft-light'
      }}
      className="site-footer text-white text-sm relative overflow-hidden pt-12 pb-8 sm:pt-14 sm:pb-10 font-sans"
    >
      <Container className="relative z-10">

        {/* --- DESKTOP LAYOUT (lg:grid) --- */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 max-w-[1260px] items-start mb-10">

          {/* Left Column: Logo + Contacts */}
          <div className="lg:col-span-4 space-y-8">
            <Link to="/" className="inline-block group">
              <img
                src={sssLogo}
                alt="Samba Soccer Schools"
                className="max-w-[130px] w-auto object-contain brightness-0 invert transition-transform group-hover:scale-105"
              />
            </Link>

            {/* Contacts */}
            <div className="space-y-3.5 pt-1">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0DD180] flex items-center justify-center shrink-0 shadow-sm">
                  <Smartphone className="w-5 h-5 text-[#042C89]" />
                </div>
                <a href={`tel:${(TOPBAR_CONFIG.phone || '').replace(/\s+/g, '')}`} className="text-white text-[16px] recline hover:underline">
                  {TOPBAR_CONFIG.phoneFormatted || TOPBAR_CONFIG.phone}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0DD180] flex items-center justify-center shrink-0 shadow-sm">
                  <MapPin className="w-5 h-5 text-[#042C89]" />
                </div>
                <a
                  href={TOPBAR_CONFIG.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-[16px] recline hover:underline"
                >
                  Find us on Google Maps
                </a>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0DD180] flex items-center justify-center shrink-0 shadow-sm">
                  <Mail className="w-5 h-5 text-[#042C89]" />
                </div>
                <a href={`mailto:${TOPBAR_CONFIG.email}`} className="text-white text-[16px] recline hover:underline">
                  {TOPBAR_CONFIG.email}
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Nav Links + Mailing List + Socials */}
          <div className="lg:col-span-8 space-y-8">

            {/* 3 Nav Columns */}
            <div className="grid grid-cols-3 gap-6">

              {/* EXPLORE */}
              <div className="space-y-3">
                <h4 className="text-[18px] poppins font-extrabold uppercase text-[#0DD180]">
                  EXPLORE
                </h4>
                <ul className="space-y-2.5 pt-3">
                  <li>
                    <Link
                      to="/find-a-class"
                      className="transition-colors text-[15px] poppins text-white hover:text-[#0DD180] block"
                    >
                      Find a Class
                    </Link>
                  </li>
                  <li>
                    <Link to="/programs" className="transition-colors text-[15px] poppins text-white hover:text-[#0DD180] block">
                      Weekly Classes
                    </Link>
                  </li>
                  <li>
                    <Link to="/birthday-party" className="transition-colors text-[15px] poppins text-white hover:text-[#0DD180] block">
                      Birthday Parties
                    </Link>
                  </li>
                  <li>
                    <Link to="/holiday-camps" className="transition-colors text-[15px] poppins text-white hover:text-[#0DD180] block">
                      Holiday Camps
                    </Link>
                  </li>
                  <li>
                    <Link to="/one-to-one" className="transition-colors text-[15px] poppins text-white hover:text-[#0DD180] block">
                      One-to-One
                    </Link>
                  </li>
                </ul>
              </div>

              {/* ABOUT US */}
              <div className="space-y-3">
                <h4 className="text-[18px] poppins font-extrabold uppercase text-[#0DD180]">
                  ABOUT US
                </h4>
                <ul className="space-y-2.5 pt-3">
                  {FOOTER_LINKS.aboutUs.map((link, idx) => (
                    <li key={idx}>
                      <Link to={link.path} className="text-white hover:text-[#0DD180] transition-colors text-[15px] poppins">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CUSTOMER SERVICE */}
              <div className="space-y-3">
                <h4 className="text-[18px] poppins font-extrabold uppercase text-[#0DD180]">
                  CUSTOMER SERVICE
                </h4>
                <ul className="space-y-2.5 pt-3">
                  {FOOTER_LINKS.customerService.map((link, idx) => (
                    <li key={idx}>
                      <Link to={link.path} className="text-white hover:text-[#0DD180] transition-colors text-[15px] poppins">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Mailing List Banner */}
            <form
              onSubmit={handleSubscribe}
              className="bg-[#e1ecff33] rounded-[24px] xl:rounded-full px-4 sm:px-6 py-3.5 xl:py-5 flex flex-wrap min-[1180px]:flex-nowrap items-center justify-between gap-3 max-w-full"
            >
              <span className="text-white font-extrabold text-[17px] min-[1180px]:text-[18px] xl:text-[22px] recline px-1 xl:px-2 shrink min-w-0">
                Join our Mailing List
              </span>

              <div className="flex items-center poppins gap-2 shrink-0 max-w-full">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your Email"
                  className="bg-white text-slate-800 placeholder:text-[#9E9FAA] text-[13px] sm:text-[14px] xl:text-[15px] poppins rounded-full px-4 py-2.5 xl:py-3 outline-none w-[170px] sm:w-[200px] xl:w-[250px] 2xl:w-[280px] shadow-inner"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`bg-[#0DD180] hover:bg-[#00c853] text-white font-bold text-[13px] sm:text-[14px] xl:text-[15px] px-5 xl:px-6 py-2.5 xl:py-3 rounded-full transition-all shadow-md shrink-0 cursor-pointer whitespace-nowrap ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                >
                  {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                </button>
              </div>
            </form>

            {/* Social Icons */}
            <div className="flex items-center gap-3.5 sm:gap-4">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="transition-transform duration-200 hover:scale-110 flex items-center justify-center"
                >
                  <img
                    src={social.icon}
                    alt={social.name}
                    className="w-12 h-12 object-contain"
                  />
                </a>
              ))}
            </div>

          </div>

        </div>

        {/* --- MOBILE LAYOUT (block lg:hidden) matching Figma --- */}
        <div className="block lg:hidden space-y-7 pb-4">

          {/* 1. Logo */}
          <div>
            <Link to="/" className="inline-block">
              <img
                src={sssLogo2}
                alt="Samba Soccer Schools"
                className="max-w-[130px] w-auto object-contain brightness-0 invert"
              />
            </Link>
          </div>

          {/* 2. Links Grid: 2 columns on mobile, 3 columns on tablet */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-1">

            {/* Column 1: EXPLORE */}
            <div className="space-y-2">
              <h4 className="text-[17px] poppins font-extrabold uppercase text-[#0DD180]">
                EXPLORE
              </h4>
              <ul className="space-y-2 pt-1">
                <li>
                  <Link to="/find-a-class" className="text-white hover:text-[#0DD180] transition-colors text-[15px] poppins block">
                    Find a Class
                  </Link>
                </li>
                <li>
                  <Link to="/programs" className="text-white hover:text-[#0DD180] transition-colors text-[15px] poppins block">
                    Weekly Classes
                  </Link>
                </li>
                <li>
                  <Link to="/birthday-party" className="text-white hover:text-[#0DD180] transition-colors text-[15px] poppins block">
                    Birthday Parties
                  </Link>
                </li>
                <li>
                  <Link to="/holiday-camps" className="text-white hover:text-[#0DD180] transition-colors text-[15px] poppins block">
                    Holiday Camps
                  </Link>
                </li>
                <li>
                  <Link to="/one-to-one" className="text-white hover:text-[#0DD180] transition-colors text-[15px] poppins block">
                    One-to-One
                  </Link>
                </li>
              </ul>
            </div>

         

            {/* Column 2: ABOUT US */}
            <div className="space-y-2">
              <h4 className="text-[17px] poppins font-extrabold uppercase text-[#0DD180]">
                ABOUT US
              </h4>
              <ul className="space-y-2 pt-1">
                {MOBILE_FOOTER_LINKS.aboutUs.map((link, idx) => (
                  <li key={idx}>
                    <Link to={link.path} className="text-white hover:text-[#0DD180] transition-colors text-[15px] poppins">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: CUSTOMER SERVICE */}
            <div className="col-span-2 md:col-span-1 space-y-2 pt-1 md:pt-0">
              <h4 className="text-[17px] poppins font-extrabold uppercase text-[#0DD180]">
                CUSTOMER SERVICE
              </h4>
              <ul className="space-y-2 pt-1">
                {MOBILE_FOOTER_LINKS.customerService.map((link, idx) => (
                  <li key={idx}>
                    <Link to={link.path} className="text-white hover:text-[#0DD180] transition-colors text-[15px] poppins">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* 4. Contact Details & Socials */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-2">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#0DD180] flex items-center justify-center shrink-0 shadow-sm">
                  <Smartphone className="w-4 h-4 text-[#042C89]" />
                </div>
                <a href={`tel:${(TOPBAR_CONFIG.phone || '').replace(/\s+/g, '')}`} className="text-white text-[15px] recline hover:underline">
                  {TOPBAR_CONFIG.phoneFormatted || TOPBAR_CONFIG.phone}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#0DD180] flex items-center justify-center shrink-0 shadow-sm">
                  <MapPin className="w-4 h-4 text-[#042C89]" />
                </div>
                <a
                  href={TOPBAR_CONFIG.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-[16px] recline hover:underline"
                >
                  Find us on Google Maps
                </a>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#0DD180] flex items-center justify-center shrink-0 shadow-sm">
                  <Mail className="w-4 h-4 text-[#042C89]" />
                </div>
                <a href={`mailto:${TOPBAR_CONFIG.email}`} className="text-white text-[16px] recline hover:underline">
                  {TOPBAR_CONFIG.email}
                </a>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 sm:gap-3.5 pt-2 md:pt-0">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="transition-transform duration-200 hover:scale-110 flex items-center justify-center"
                >
                  <img
                    src={social.icon}
                    alt={social.name}
                    className="w-10 h-10 object-contain"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* 6. Join our Mailing List Card */}
          <form
            onSubmit={handleSubscribe}
            className="bg-[#fefefe1f] rounded-[20px] md:rounded-full p-5 sm:p-6 md:py-3.5 md:px-6 space-y-3.5 md:space-y-0 md:flex md:items-center md:justify-between md:gap-4 mt-4"
          >
            <h3 className="text-white font-bold text-[20px] xl:text-[22px] recline whitespace-nowrap">
              Join our Mailing List
            </h3>

            <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full md:w-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your Email"
                className="bg-[#F0F2F5] text-slate-800 placeholder:text-[#9E9FAA] text-[15px] poppins rounded-full px-5 py-3.5 w-full sm:w-[260px] outline-none"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full sm:w-auto bg-[#0DD180] hover:bg-[#00c853] text-white font-bold text-[16px] px-6 py-3.5 rounded-full transition-all shadow-md text-center cursor-pointer whitespace-nowrap ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>
            </div>
          </form>

        </div>

        {/* Bottom Horizontal Line & Copyright Text */}
        <div className="pt-6 border-t border-white/20 text-center">
          <p className="text-white/80 text-[12px] leading-relaxed break-words px-4">
            © 2026, Samba Soccer Schools Global Ltd | All Rights Reserved.
          </p>
        </div>

      </Container>
    </footer>
  );
}

export default Footer;
