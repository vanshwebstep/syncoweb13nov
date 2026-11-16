import React, { useState } from 'react';
import { Facebook, Instagram, Youtube, Linkedin, Twitter, ShoppingCart } from 'lucide-react';

import { Container } from '../../../components/common/Container';
import joinmailinglist from 'https://webstepdev.com/demo/syncoWebsiteImages/blog/joinmailinglist.png';
import joinmailinglistMobile from 'https://webstepdev.com/demo/syncoWebsiteImages/blog/mailing_mobile.png';
import followoninstabg from 'https://webstepdev.com/demo/syncoWebsiteImages/blog/followoninstabg.png';
import followoninstabgMb from 'https://webstepdev.com/demo/syncoWebsiteImages/blog/faqBg.png';
import mobileImage from 'https://webstepdev.com/demo/syncoWebsiteImages/blog/img-kids-picture-2.png';

function MailingListBanner() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | success | error

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = /^\S+@\S+\.\S+$/.test(email);
    if (!isValid) {
      setStatus('error');
      return;
    }
    setStatus('success');
    setEmail('');
  };

  return (
    <div
      className="relative overflow-hidden rounded-[32px] bg-cover bg-center bg-no-repeat bg-[image:var(--bg-mobile)] md:bg-[image:var(--bg-desktop)]"
      style={{
        '--bg-mobile': `url(${joinmailinglistMobile})`,
        '--bg-desktop': `url(${joinmailinglist})`,
      }}
    >
      <div className="relative md:text-center lg:text-start flex flex-col items-start gap-6 px-6 py-6 lg:flex-row md:items-center lg:justify-between md:px-12">
        <div>
          <h2 className="text-[36px] gasoek tracking-[2px]  text-[#042C89] md:text-[38px]">
            Join our Mailing List
          </h2>
          <p className="mt-2 text-base font-bold text-[#042C89] tracking-[0.6px]  md:text-[18px]">
            Sign-up for the SSS Newsletter
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col gap-3 md:mt-0 mt-4 sm:flex-row sm:items-center md:w-auto"
        >
          <div className="flex flex-col">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status !== 'idle') setStatus('idle');
              }}
              placeholder="Enter your Email"
              className="w-full rounded-full bg-white/90 px-6 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#042C89] sm:w-72"
            />
            {status === 'error' && (
              <span className="mt-1 text-xs font-semibold text-red-700">
                Please enter a valid email
              </span>
            )}
            {status === 'success' && (
              <span className="mt-1 text-xs font-semibold text-[#042C89]">
                Thanks — you're subscribed!
              </span>
            )}
          </div>

          <button
            type="submit"
            className="whitespace-nowrap rounded-full bg-[#042C89] px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-[#0a1172]/90"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}

function InstagramSection() {
  return (
    <div
      className="instagram-banner-card relative overflow-hidden py-8 md:py-0 rounded-[32px] lg:ps-[80px] px-6 md:my-14 my-10 bg-cover bg-center bg-no-repeat bg-[image:var(--bg-mobile)] md:bg-[image:var(--bg-desktop)]"
      style={{
        '--bg-mobile': `url(${followoninstabgMb})`,
        '--bg-desktop': `url(${followoninstabg})`,
      }}
    >
      <div className="instagram-banner-copy relative flex h-full flex-col justify-center gap-4  md:py-8 md:w-[450px] lg:w-[510px] w-full md:gap-6  md:py-12">
        <h2 className="text-4xl gasoek leading-[1.2] text-white lg:text-[48px] tracking-[0.2px] ">
          Follow us
          <br />
          on <span className="text-[#FFDE14]">Instagram</span>
        </h2>

        <p className=" font-semibold tracking-[0.2px] leading-[24.5px] text-white/90  text-[12px] md:text-[13px] lg:text-[14px]">
          Relive every moment. Our photographers are always on the lookout for the best
          flicks, tricks <br className="block md:hidden" /> and celebrations so you can add it to the family album. Follow the
          action from our kids football training in London by subscribing to our Instagram.
        </p>

        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          className="instagram-banner-btn inline-flex md:w-fit w-full items-center justify-center gap-2 rounded-full bg-[#FFDE14] px-6 py-3 text-[14px] lg:text-[16px] font-semibold text-[#042C89] transition-colors hover:bg-yellow-300"
        >
          <Instagram className="h-5 w-5" strokeWidth={2.5} />
          Follow on Instagram
        </a>
      </div>
      <img src={mobileImage} className="block md:hidden pt-6" alt="Instagram" />
    </div>
  );
}


export function Community() {
  return (
    <section className="w-full pt-8 md:pt-12">
      <Container>
        <div className="flex flex-col md:gap-8">
          <MailingListBanner />
          <InstagramSection />
        </div>
      </Container>


    </section>
  );
}