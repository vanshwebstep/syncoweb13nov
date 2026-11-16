import React, { useState } from 'react';
import { Facebook, Instagram, Youtube, Linkedin, Twitter, ShoppingCart } from 'lucide-react';

import { Container } from '../../../components/common/Container';
import joinmailinglist from 'https://webstepdev.com/demo/syncoWebsiteImages/blog/joinmailinglist.png';
import followoninstabg from 'https://webstepdev.com/demo/syncoWebsiteImages/blog/followoninstabg.png';
import letsbefriendsbg from 'https://webstepdev.com/demo/syncoWebsiteImages/letsbefriendsbg.png';

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
      className="relative overflow-hidden rounded-3xl bg-cover bg-center"
      style={{ backgroundImage: `url(${joinmailinglist})` }}
    >
      <div className="relative flex flex-col items-start gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-12 md:py-12">
        <div>
          <h2 className="text-3xl gasoek  text-[#0a1172] md:text-4xl">
            Join our Mailing List
          </h2>
          <p className="mt-2 text-base font-bold text-[#0a1172] md:text-lg">
            Sign-up for the SSS Newsletter
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col gap-3 sm:flex-row sm:items-center md:w-auto"
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
              className="w-full rounded-full bg-white/90 px-6 py-3 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0a1172] sm:w-72"
            />
            {status === 'error' && (
              <span className="mt-1 text-xs font-semibold text-red-700">
                Please enter a valid email
              </span>
            )}
            {status === 'success' && (
              <span className="mt-1 text-xs font-semibold text-[#0a1172]">
                Thanks — you're subscribed!
              </span>
            )}
          </div>

          <button
            type="submit"
            className="whitespace-nowrap rounded-full bg-[#0a1172] px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-[#0a1172]/90"
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
      className="instagram-banner-card relative overflow-hidden rounded-3xl bg-cover bg-center min-h-[320px] md:min-h-[420px]"
      style={{ backgroundImage: `url(${followoninstabg})` }}
    >
      <div className="instagram-banner-copy relative flex h-full flex-col justify-center gap-4 px-6 py-10 md:w-1/2 md:gap-6 md:px-12 md:py-16">
        <h2 className="text-4xl gasoek leading-tight text-white md:text-5xl">
          Follow us
          <br />
          on <span className="text-yellow-400">Instagram</span>
        </h2>

        <p className="max-w-md text-sm font-medium text-white/90 md:text-base">
          Relive every moment. Our photographers are always on the lookout for the best
          flicks, tricks and celebrations so you can add it to the family album. Follow the
          action from our kids football training in London by subscribing to our Instagram.
        </p>

        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          className="instagram-banner-btn inline-flex w-fit items-center gap-2 rounded-full bg-yellow-400 px-6 py-3 text-sm font-bold text-[#0a1172] transition-colors hover:bg-yellow-300"
        >
          <Instagram className="h-5 w-5" strokeWidth={2.5} />
          Follow on Instagram
        </a>
      </div>
    </div>
  );
}

const socials = [
  { Icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { Icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { Icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
  { Icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { Icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
];

function SocialFooterBar() {
  return (
    <div
      className="relative overflow-hidden bg-cover bg-center w-full m-auto"
      style={{ backgroundImage: `url(${letsbefriendsbg})` }}
    >
      <div className="relative max-w-[1340px] m-auto flex flex-col items-start justify-between gap-8 px-6 py-10 md:flex-row md:items-center md:px-12 md:py-12">
        <div>
          <h2 className="text-3xl gasoek text-white md:text-4xl">Let's be friends</h2>
          <p className="mt-2 max-w-sm text-sm font-semibold text-white/90 md:text-base">
            If we are not playing football you can find us socialising on...
          </p>
        </div>

        <div className="flex items-center gap-3">
          {socials.map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-emerald-500 transition-transform hover:scale-105"
            >
              <Icon className="h-5 w-5" strokeWidth={2} />
            </a>
          ))}
        </div>

        <a
          href="#shop"
          className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-white px-6 py-3 text-sm font-bold text-[#00A6E3] transition-colors hover:bg-white/90"
        >
          <ShoppingCart className="h-4 w-4" strokeWidth={2.5} />
          Shop Online
        </a>
      </div>
    </div>
  );
}

export function Community() {
  return (
    <section className="w-full ">
  

      <div className="mt-8">
        <SocialFooterBar />
      </div>
    </section>
  );
}