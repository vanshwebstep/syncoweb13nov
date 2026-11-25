import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Star, Phone, User, MapPin } from 'lucide-react';
import { Container } from '../../../components/common/Container';

const sssLogo = 'https://webstepdev.com/demo/syncoWebsiteImages/samba-soccer-schools-logo.png';
const sssLogo2 = 'https://webstepdev.com/demo/syncoWebsiteImages/sss-logo-2.png';
const topbarBg = 'https://webstepdev.com/demo/syncoWebsiteImages/TopNavMain.png';
const bottomNavBg = 'https://webstepdev.com/demo/syncoWebsiteImages/MenuNavDesktopMain.png';

export function BookingHeader({ onExit }) {
  const navigate = useNavigate();

  const handleExit = () => {
    if (onExit) {
      onExit();
    } else {
      navigate('/find-a-class');
    }
  };

  return (
    <header className="w-full text-white">
      {/* Top Utility Bar */}
      <div 
        style={{
          backgroundImage: `url(${topbarBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'soft-light'
        }}
        className="border-b border-white/10 py-1.5 text-[11px] sm:text-xs"
      >
        <Container>
          <div className="flex items-center justify-between">
            {/* Left Rating & Trust */}
            <div className="flex items-center gap-3 sm:gap-6 font-medium text-white/90">
              <div className="flex items-center gap-1.5 font-bold">
                <Star className="w-3.5 h-3.5 fill-[#FFE600] text-[#FFE600]" />
                <span className="text-[#FFE600] font-black">4.8</span>
                <span className="text-white font-bold">Google Rating</span>
              </div>
              <span className="hidden sm:inline text-white/40">·</span>
              <span className="hidden sm:inline text-white/90 font-medium">
                Trusted by families since 2009
              </span>
            </div>

            {/* Right Contact & Portal */}
            <div className="flex items-center gap-2 sm:gap-4 font-medium">
              <a 
                href="tel:02072052723" 
                className="hidden md:flex hover:text-white items-center gap-1.5 text-white transition-colors"
              >
                <Phone className="w-3 h-3 text-[#00D084]" />
                <span>020 72052723</span>
              </a>

              <a
                href="https://parent-dash.netlify.app/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-white bg-white/10 hover:bg-white/20 px-2.5 sm:px-3 py-1 rounded-full transition-all text-[11px] font-bold"
              >
                <User className="w-3 h-3" />
                <span>Parent Login</span>
              </a>

              <div className="flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-full text-[11px] font-bold text-white">
                <MapPin className="w-3 h-3 text-[#00A3E0]" />
                <span>UK</span>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Bar with Logo & Exit Button */}
      <div 
        style={{
          backgroundImage: `url(${bottomNavBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'soft-light'
        }}
        className="py-3 sm:py-4"
      >
        <Container>
          <div className="flex items-center justify-between">
            {/* Samba Brand Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <img 
                src={sssLogo2} 
                alt="Samba Soccer Schools" 
                className="w-7 sm:w-8 object-contain" 
              />
              <img 
                src={sssLogo} 
                alt="Samba Soccer Schools" 
                className="w-[95px] sm:w-[115px] object-contain" 
              />
            </Link>

            {/* Exit Booking Button */}
            <button
              type="button"
              onClick={handleExit}
              className="bg-white hover:bg-slate-100 text-[#061838] font-bold text-xs sm:text-sm p-2 sm:px-5 sm:py-2 rounded-full flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer active:scale-95"
            >
              <X className="w-4 h-4 stroke-[2.5]" />
              <span className="hidden sm:inline">Exit booking</span>
            </button>
          </div>
        </Container>
      </div>
    </header>
  );
}

export default BookingHeader;
