import React, { useState } from 'react';

const IMAGE_BASE = 'https://webstepdev.com/demo/syncoWebsiteImages/contact';
const facebookIcon = `${IMAGE_BASE}/Facebook.png`;
const instagramIcon = `${IMAGE_BASE}/Instagram.png`;
const youtubeIcon = `${IMAGE_BASE}/YouTube.png`;
const linkedinIcon = `${IMAGE_BASE}/LinkendIn.png`;
const twitterIcon = `${IMAGE_BASE}/Twitter.png`;
const facebookIcon1 = `${IMAGE_BASE}/Facebook_1.png`;
const instagramIcon1 = `${IMAGE_BASE}/Instagram_1.png`;
const youtubeIcon1 = `${IMAGE_BASE}/YouTube_1.png`;
const linkedinIcon1 = `${IMAGE_BASE}/LinkendIn_1.png`;
const twitterIcon1 = `${IMAGE_BASE}/Twitter_1.png`;
const shoppingCartIcon = `${IMAGE_BASE}/cart.png`;



 const socialLinks = [
    { name: 'Facebook', icon: facebookIcon, href: 'https://facebook.com' },
    { name: 'Instagram', icon: instagramIcon, href: 'https://instagram.com' },
    { name: 'YouTube', icon: youtubeIcon, href: 'https://youtube.com' },
    { name: 'LinkedIn', icon: linkedinIcon, href: 'https://linkedin.com' },
    { name: 'Twitter', icon: twitterIcon, href: 'https://twitter.com' },
  ];
 const socialLinksMb = [
    { name: 'Facebook', icon: facebookIcon1, href: 'https://facebook.com' },
    { name: 'Instagram', icon: instagramIcon1, href: 'https://instagram.com' },
    { name: 'YouTube', icon: youtubeIcon1, href: 'https://youtube.com' },
    { name: 'LinkedIn', icon: linkedinIcon1, href: 'https://linkedin.com' },
    { name: 'Twitter', icon: twitterIcon1, href: 'https://twitter.com' },
  ];

function SocialFooterBar() {
  return (
    <div
      className="relative bannerFooter footer-bottom-bar overflow-hidden bg-cover bg-center w-full m-auto"
    >
      <div className="relative max-w-[1340px] m-auto flex flex-col items-start justify-between gap-6 sm:gap-8 px-6 sm:px-8 lg:px-10 xl:px-12 py-8 sm:py-10 md:py-8 lg:py-8 2xl:py-12 pb-6 md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl sm:text-3xl lg:text-[30px] xl:text-[33px] 2xl:text-[36px] gasoek tracking-[0.2px] text-white">Let's be friends</h2>
          <p className="mt-1.5 sm:mt-2 max-w-sm text-[14px] sm:text-[15px] xl:text-[16px] 2xl:text-[18px] font-semibold text-white">
            If we are not playing football you can <br className='hidden lg:block' /> find us socialising on...
          </p>
        </div>

        <div className="hidden md:flex items-center gap-2.5 sm:gap-3">
          {socialLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.name}
              className="hover:scale-110 transition-transform duration-150"
            >
              <img
                src={item.icon}
                alt={item.name}
                className="w-[36px] h-[36px] lg:w-[40px] lg:h-[40px] xl:w-[42px] 2xl:w-[47px] xl:h-[42px] 2xl:h-[47px] object-contain"
              />
            </a>
          ))}
        </div>

        <a
          href="#shop"
          className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-white px-5 sm:px-6 py-2.5 sm:py-3 text-[14px] sm:text-[15px] xl:text-[16px] 2xl:text-[18px] font-semibold text-[#00A6E3] transition-colors hover:bg-white/90 shadow-sm"
        >
          <img src={shoppingCartIcon} alt="Shopping Cart" className="h-4 w-4" strokeWidth={2.5} />
          Shop Online
        </a>

        <div className="flex items-center md:hidden gap-3 pt-2">
          {socialLinksMb.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.name}
              className="hover:scale-110 transition-transform duration-150"
            >
              <img
                src={item.icon}
                alt={item.name}
                className="w-[36px] h-[36px] sm:w-[40px] sm:h-[40px] object-contain"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export function FooterBottom() {
  return (
    
      <div className=" ">
        <SocialFooterBar />
      </div>
  );
}