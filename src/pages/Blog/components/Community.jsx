import React, { useState } from 'react';
import { Mail, Instagram } from 'lucide-react';
import { Container } from '../../../components/common/Container';

const IMG = 'https://webstepdev.com/demo/syncoWebsiteImages/blog';
const newsletterBg = `${IMG}/Newsletter.png`;
const kidsCelebrating = `${IMG}/Kidscelebrating.png`;
const clips = [1, 2, 3, 4, 5].map((n) => `${IMG}/clip${n}.png`);

function NewsletterBanner() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | success | error

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setStatus('error');
      return;
    }
    setStatus('success');
    setEmail('');
  };

  return (
    <div className="relative mt-6 md:mt-16">
      <div
        className="relative overflow-visible rounded-[28px] bg-[#0DD180] bg-cover bg-center bg-no-repeat md:min-h-[250px]"
        style={{ backgroundImage: `url(${newsletterBg})` }}
      >
        <div className="relative z-10 px-6 py-10 md:w-[68%] md:px-[40px] md:py-[50px] lg:px-[40px]">
          <h2 className="recline text-[24px] leading-[1.2] text-[#042C89] md:text-[30px]">
            Football tips for parents,
          </h2>
          <h2 className="gasoek mt-1 text-[30px] leading-[1.15] text-white md:text-[40px]">
            straight to your inbox.
          </h2>

          <p className="poppins mt-3 text-[13px] font-semibold leading-[1.5] text-[#042C89] md:text-[15px]">
            Two emails a month. New articles, drills to try at home and camp dates. No spam.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <div className="flex flex-col sm:w-[340px] lg:w-[400px]">
              <div className="flex items-center rounded-full bg-white px-5 py-3.5">
                <Mail className="h-4 w-4 shrink-0 text-[#042C89]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status !== 'idle') setStatus('idle');
                  }}
                  placeholder="Your email address"
                  className="poppins ml-3 w-full min-w-0 bg-transparent text-[15px] text-[#042C89] outline-none placeholder:text-[#64748B]"
                />
              </div>
              {status === 'error' && (
                <span className="poppins mt-1 pl-4 text-[12px] font-semibold text-red-700">
                  Please enter a valid email
                </span>
              )}
              {status === 'success' && (
                <span className="poppins mt-1 pl-4 text-[12px] font-semibold text-[#042C89]">
                  Thanks, you're subscribed!
                </span>
              )}
            </div>

            <button
              type="submit"
              className="poppins whitespace-nowrap rounded-full bg-[#042C89] px-10 py-3.5 text-[15px] font-bold text-white transition-colors hover:bg-[#031f63]"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Kids image: desktop pe card se bahar nikalti hui */}
        <img
          src={kidsCelebrating}
          alt="Kids celebrating"
          className="pointer-events-none absolute bottom-[-30px] right-[4%] z-10 hidden h-[125%] w-auto max-w-none md:block"
        />
      </div>

      {/* Mobile image */}
      <img
        src={kidsCelebrating}
        alt="Kids celebrating"
        className="mx-auto -mt-4 block w-[200px] md:hidden"
      />
    </div>
  );
}

function InstagramSection() {
  return (
    <div className="mt-10 md:mt-16">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="poppins text-[13px] font-bold uppercase tracking-wide text-[#0B8AD9]">
            @sambasoccerschools
          </p>
          <h2 className="recline mt-2 text-[28px] leading-[1.15] text-[#042C89] md:text-[34px]">
            Follow the fun
          </h2>
          <div className="relative inline-block">
            <span className="gasoek block text-[34px] leading-[1.15] text-[#0DD180] md:text-[42px]">
              on Instagram.
            </span>
            <svg
              className="absolute -bottom-1 left-0 w-full"
              height="8"
              viewBox="0 0 200 8"
              preserveAspectRatio="none"
            >
              <path
                d="M2 5 Q 50 1, 100 4 T 198 3"
                stroke="#FFDE14"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        <a
          href="https://instagram.com/sambasoccerschools"
          target="_blank"
          rel="noreferrer"
          className="poppins inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#042C89] px-9 py-3.5 text-[15px] font-bold text-white transition-colors hover:bg-[#031f63] sm:mb-2 sm:w-fit"
        >
          <Instagram className="h-4 w-4" strokeWidth={2.5} />
          Follow us
        </a>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 md:gap-4">
        {clips.map((src, i) => (
          <a
            key={src}
            href="https://instagram.com/sambasoccerschools"
            target="_blank"
            rel="noreferrer"
            className={`block overflow-hidden rounded-[20px] bg-gray-100 md:rounded-[24px] ${
              i === 4 ? 'col-span-2 sm:col-span-1' : ''
            }`}
          >
            <img
              src={src}
              alt={`Samba Instagram ${i + 1}`}
              className="aspect-square w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </a>
        ))}
      </div>
    </div>
  );
}

export function Community() {
  return (
    <section className="w-full pb-10 pt-8 md:pb-16 md:pt-12">
      <Container>
        <NewsletterBanner />
        <InstagramSection />
      </Container>
    </section>
  );
}