import React from 'react';
import { Container } from '../../../components/common/Container';

const IMG = 'https://webstepdev.com/demo/syncoWebsiteImages/blog';
const heroBg = `${IMG}/Hero.png`;
const kidsCelebrating = `${IMG}/Kidscelebrating.png`;
const featuredPattern = `${IMG}/FeaturedBlogCard.png`;
const featuredKids = `${IMG}/featuredkids.png`; // <-- apni featured image ka sahi naam daal dena

export function HowToPlanBanner() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section
        className="relative w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <Container>
          <div className="relative min-h-[420px] md:min-h-[400px] pt-8 pb-24 md:pb-28">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-white text-[13px] font-semibold poppins">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M3 11l9-8 9 8v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1V11z" />
              </svg>
              <span>Home</span>
              <span className="opacity-70">›</span>
              <span>Blog</span>
            </div>

            {/* Text block */}
            <div className="relative z-10 mt-10 max-w-[520px]">
              <p className="text-[13px] font-bold uppercase text-[#FFD500] poppins tracking-wide">
                The Samba Blog
              </p>

              <h1 className="recline text-white text-[50px] leading-[1.1] mt-2">
                Tips, drills and
              </h1>

              <div className="inline-block relative">
                <span className="gasoek text-[#FFD500] text-[60px] leading-[1.1] block">
                  stories.
                </span>
                <svg
                  className="absolute left-0 -bottom-1 w-full"
                  height="8"
                  viewBox="0 0 200 8"
                  preserveAspectRatio="none"
                >
                  <path d="M2 5 Q 50 0, 100 4 T 198 3" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" />
                </svg>
              </div>

              <p className="poppins text-white text-[17px] leading-[1.5] mt-5">
                Advice for parents, skills to practise at home and news from our classes.
              </p>

              {/* Search */}
              <div className="mt-6 flex items-center bg-white rounded-full p-1.5 pl-5 max-w-[500px] shadow-lg">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#042C89" strokeWidth="2.5" className="shrink-0">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M21 21l-4.3-4.3" />
                </svg>
                <input
                  type="text"
                  placeholder="Search articles, e.g. “warm-up”"
                  className="poppins flex-1 min-w-0 bg-transparent outline-none px-3 text-[15px] text-[#042C89] placeholder:text-[#64748B]"
                />
                <button className="poppins bg-[#042C89] text-white text-[15px] font-semibold px-7 py-3 rounded-full hover:bg-[#031f63] transition-colors">
                  Search
                </button>
              </div>
            </div>

            {/* Kids image */}
            <img
              src={kidsCelebrating}
              alt="Kids celebrating"
              className="hidden md:block absolute right-0 bottom-0 w-[320px] max-w-none z-10 translate-y-6"
            />
          </div>
        </Container>
      </section>

      {/* ============ FEATURED CARD ============ */}
      <section className="w-full py-10">
        <Container>
          <div
            className="relative overflow-hidden rounded-[28px] md:rounded-[32px] bg-[#16D77F] bg-cover bg-center"
            style={{ backgroundImage: `url(${featuredPattern})` }}
          >
            <div className="relative z-10 flex flex-col md:flex-row md:items-stretch">
              {/* Left copy */}
              <div className="w-full md:w-[52%] px-6 sm:px-10 lg:pl-[30px] py-10 md:py-12 flex flex-col justify-center">
                <span className="poppins self-start bg-[#042C89] text-white text-[12px] font-bold uppercase tracking-wide px-4 py-1.5 rounded-full mb-5">
                  Featured
                </span>

                <h2 className="gasoek text-white text-[58px] leading-[1.05]">
                  How to plan
                </h2>
                <h2 className="recline text-[#042C89] text-[46px] leading-[1.15] mb-5">
                  football sessions <br className="hidden md:block" /> for children?
                </h2>

                <p className="poppins text-[#042C89] text-[16px] font-bold leading-[1.5] max-w-[360px]">
                  A simple plan for a fun, safe session: warm-up, drills, a match and a reward at the end.
                </p>

                <div className="mt-6 flex items-center gap-4 flex-wrap">
                  <button className="poppins inline-flex items-center gap-2 bg-[#042C89] text-white text-[15px] font-bold px-7 py-3.5 rounded-full hover:bg-[#031f63] transition-colors">
                    Read article <span>→</span>
                  </button>
                  <span className="poppins text-[#042C89] text-[13px] font-medium">
                    Ethan · 12 Oct 2026 · 6 min read
                  </span>
                </div>
              </div>

              {/* Right image */}
              <div className="relative w-full md:w-[48%] h-[260px] md:h-auto md:min-h-[340px]">
                <div className="absolute inset-0 md:-left-10 overflow-hidden rounded-tl-[40px] md:rounded-tl-[260px] md:rounded-bl-[40px]">
                 
                  {/* green blob bottom-right */}
                  <div className="absolute -bottom-16 -right-16 w-[180px] h-[180px] rounded-full bg-[#16D77F]" />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}