import React, { useState } from 'react';
import { Mail, Facebook, Instagram, Youtube, Linkedin, Twitter, ShoppingCart } from 'lucide-react';
import { Container } from '../../../components/common/Container';
import letsbefriendsbg from 'https://webstepdev.com/demo/syncoWebsiteImages/letsbefriendsbg.png';

const IMG = 'https://webstepdev.com/demo/syncoWebsiteImages/blog';
const newsletterBg = `${IMG}/Newsletter.png`;
const kidsCelebrating = `${IMG}/Kidscelebrating.png`;

function NewsletterBanner() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return setStatus('error');
    setStatus('success');
    setEmail('');
  };

  return (
    <div className="relative mt-6 md:mt-20">
      <div
        className="relative rounded-[28px] bg-[#0DD180] bg-cover bg-center bg-no-repeat md:min-h-[230px]"
        style={{ backgroundImage: `url(${newsletterBg})` }}
      >
        <div className="relative z-10 px-6 py-10 md:w-[68%] md:px-[36px] md:py-[44px]">
          <h2 className="recline text-[20px] leading-[1.2] text-[#042C89] md:text-[24px]">Football tips for parents,</h2>
          <h2 className="gasoek mt-1 text-[26px] leading-[1.15] text-white md:text-[32px]">straight to your inbox.</h2>
          <p className="poppins mt-3 text-[11px] font-semibold leading-[1.5] text-[#042C89] md:text-[12px]">
            Two emails a month. New articles, drills to try at home and camp dates. No spam.
          </p>

          <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex flex-col sm:w-[300px]">
              <div className="flex items-center rounded-full bg-white px-5 py-3">
                <Mail className="h-3.5 w-3.5 shrink-0 text-[#042C89]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status !== 'idle') setStatus('idle');
                  }}
                  placeholder="Your email address"
                  className="poppins ml-3 w-full min-w-0 bg-transparent text-[12px] text-[#042C89] outline-none placeholder:text-[#64748B]"
                />
              </div>
              {status === 'error' && <span className="poppins mt-1 pl-4 text-[11px] font-semibold text-red-700">Please enter a valid email</span>}
              {status === 'success' && <span className="poppins mt-1 pl-4 text-[11px] font-semibold text-[#042C89]">Thanks, you're subscribed!</span>}
            </div>
            <button
              type="submit"
              className="poppins whitespace-nowrap rounded-full bg-[#042C89] px-9 py-3 text-[12px] font-bold text-white transition-colors hover:bg-[#031f63]"
            >
              Subscribe
            </button>
          </form>
        </div>

        <img
          src={kidsCelebrating}
          alt="Kids celebrating"
          className="pointer-events-none absolute bottom-[-24px] right-[3%] z-10 hidden h-[125%] w-auto max-w-none md:block"
        />
      </div>
      <img src={kidsCelebrating} alt="Kids celebrating" className="mx-auto -mt-4 block w-[200px] md:hidden" />
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
    <div className="relative m-auto w-full overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url(${letsbefriendsbg})` }}>
      <div className="relative m-auto flex max-w-[1340px] flex-col items-start justify-between gap-8 px-6 py-10 md:flex-row md:items-center md:px-12 md:py-12">
        <div>
          <h2 className="gasoek text-3xl text-white md:text-4xl">Let's be friends</h2>
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
    <section className="w-full">
      <Container>
        <NewsletterBanner />
      </Container>
      <div className="mt-10 md:mt-14">
        <SocialFooterBar />
      </div>
    </section>
  );
}