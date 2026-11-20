import React, { useState } from 'react';
import { Home, ChevronRight, Calendar, Clock, Facebook, MessageCircle, Link2 } from 'lucide-react';
import { Container } from '../../../components/common/Container';
import hero from 'https://webstepdev.com/demo/syncoWebsiteImages/blog/hero.png';

export function HowToPlanBanner({ blog }) {
  const [copied, setCopied] = useState(false);

  const title = blog?.title || '';
  const words = title.split(' ');
  const cut = words.length > 4 ? 4 : Math.ceil(words.length / 2);
  const line1 = words.slice(0, cut).join(' ');
  const line2 = words.slice(cut).join(' ');

  const category = Array.isArray(blog?.tags) && blog.tags.length ? blog.tags[0] : blog?.category || 'Blog';
  const author = blog?.authorName || blog?.author || 'Ethan';
  const authorRole = blog?.authorRole || 'Head coach, Samba Soccer Schools';
  const authorImg = blog?.authorImage || blog?.authorAvatar;
  const readTime = blog?.readTime || blog?.readingTime || '6 min read';
  const date = blog?.publishDate
    ? new Date(blog.publishDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    : '';
  const cover = blog?.coverImage || blog?.mobileImage || '';

  const url = typeof window !== 'undefined' ? window.location.href : '';
  const share = [
    { Icon: Facebook, label: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
    { Icon: MessageCircle, label: 'WhatsApp', href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}` },
  ];
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <div className="relative">
      <section
        className="w-full bg-[#042C89] bg-cover bg-bottom bg-no-repeat pt-6 pb-[150px] md:pb-[220px]"
        style={{ backgroundImage: `url(${hero})` }}
      >
        <Container>
          {/* Breadcrumb */}
          <div className="poppins flex items-center gap-2 text-[11px] font-semibold text-white">
            <Home className="h-3 w-3" />
            <span>Home</span>
            <ChevronRight className="h-3 w-3" />
            <span>Blog</span>
            <ChevronRight className="h-3 w-3" />
            <span>{category}</span>
          </div>

          <span className="poppins mt-6 inline-block rounded-full bg-[#E3F1FC] px-3 py-1 text-[10px] font-bold text-[#042C89]">
            {category}
          </span>

          {title && (
            <h1 className="mt-3 max-w-[900px]">
              <span className="recline block text-[28px] leading-[1.2] text-white md:text-[34px]">{line1}</span>
              {line2 && (
                <span className="gasoek block text-[28px] leading-[1.2] text-[#FFDE14] md:text-[36px]">{line2}</span>
              )}
            </h1>
          )}

          {/* Meta row */}
          <div className="poppins mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <div className="flex items-center gap-3">
              {authorImg ? (
                <img src={authorImg} alt={author} className="h-[26px] w-[26px] rounded-full object-cover md:h-[26px] md:w-[26px]" />
              ) : (
                <span className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-[#FFDE14] text-[11px] font-bold text-[#042C89]">
                  {author[0]}
                </span>
              )}
              <div>
                <p className="text-[11px] font-bold leading-tight text-white">{author}</p>
                <p className="text-[10px] font-normal text-white/80">{authorRole}</p>
              </div>
            </div>

            <span className="hidden h-8 w-px bg-white/20 md:block" />

            {date && (
              <div className="flex items-center gap-2 text-[11px] font-bold text-white">
                <Calendar className="h-3 w-3 text-[#FFDE14]" /> {date}
              </div>
            )}
            <div className="flex items-center gap-2 text-[11px] font-bold text-white">
              <Clock className="h-3 w-3 text-[#FFDE14]" /> {readTime}
            </div>

            <div className="flex items-center gap-2 md:ml-auto">
              <span className="mr-1 text-[10px] font-semibold text-white">Share</span>
              {share.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/30"
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
              <button
                onClick={copyLink}
                aria-label="Copy link"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/30"
              >
                {copied ? <span className="text-[9px] font-bold">OK</span> : <Link2 className="h-3.5 w-3.5" />}
              </button>
            </div>
          </div>
        </Container>
      </section>

      {/* Cover image: hero wave pe overlap */}
      {cover && (
        <Container>
          <div className="relative z-10 -mt-[110px] md:-mt-[170px]">
            <img
              src={cover}
              alt={title}
              className="aspect-[16/8] w-full rounded-tl-[20px] rounded-tr-[48px] rounded-b-[24px] object-cover md:aspect-[16/7.5]"
            />
          </div>
        </Container>
      )}
    </div>
  );
}