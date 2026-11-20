import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Container } from '../../../components/common/Container';

const TAG_STYLES = {
  'Skills & drills': 'bg-[#DDF7E8] text-[#042C89]',
  Parents: 'bg-[#DCEEFB] text-[#042C89]',
  Coaching: 'bg-[#FFF3B0] text-[#042C89]',
  'Holiday camps': 'bg-[#FFE7CC] text-[#C2410C]',
  News: 'bg-[#FFE0E3] text-[#D6293E]',
  Franchise: 'bg-[#E6E0FF] text-[#042C89]',
};
const FALLBACK = [
  'bg-[#DDF7E8] text-[#042C89]',
  'bg-[#DCEEFB] text-[#042C89]',
  'bg-[#FFF3B0] text-[#042C89]',
  'bg-[#FFE7CC] text-[#C2410C]',
  'bg-[#FFE0E3] text-[#D6293E]',
  'bg-[#E6E0FF] text-[#042C89]',
];
const getTagStyle = (t) =>
  TAG_STYLES[t] || FALLBACK[[...t].reduce((s, c) => s + c.charCodeAt(0), 0) % FALLBACK.length];

const formatDate = (d) => {
  if (!d) return '';
  const x = new Date(d);
  return isNaN(x.getTime()) ? d : x.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
};

export function MorePosts({ currentSlug, category }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const q = category ? `?category=${encodeURIComponent(category)}` : '';
        const res = await fetch(`https://api.grabbite.com/api/open/blogs${q}`, { redirect: 'follow' });
        if (!res.ok) return;
        const json = await res.json();
        const list = json?.data?.blogs || json?.data || json?.blogs || (Array.isArray(json) ? json : []);
        if (!isMounted || !Array.isArray(list)) return;
        const filtered = list
          .filter((p) => p.slug !== currentSlug && String(p.id) !== String(currentSlug))
          .slice(0, 3);
        setPosts(filtered);
      } catch (err) {
        console.warn('Error fetching recent blogs:', err);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [currentSlug, category]);

  if (posts.length === 0) return null;

  return (
    <section className="w-full bg-white pt-10 pb-6 md:pt-14">
      <Container>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="poppins text-[11px] font-bold uppercase tracking-wide text-[#0B8AD9]">Keep reading</p>
            <h2 className="recline mt-2 text-[26px] leading-[1.15] text-[#042C89] md:text-[30px]">More for</h2>
            <div className="relative inline-block">
              <span className="gasoek block text-[28px] leading-[1.15] text-[#0DD180] md:text-[34px]">
                {(category || 'you').toLowerCase()}.
              </span>
              <svg className="absolute -bottom-1 left-0 w-full" height="8" viewBox="0 0 200 8" preserveAspectRatio="none">
                <path d="M2 5 Q 50 1, 100 4 T 198 3" stroke="#042C89" strokeWidth="3" fill="none" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          <Link
            to="/blog"
            className="poppins rounded-full bg-[#E3F1FC] px-8 py-3 text-[12px] font-bold text-[#042C89] transition-colors hover:bg-[#D2E8F9]"
          >
            All articles
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => {
            const banner = post.coverImage || post.mobileImage || post.banner || '';
            const excerpt = post.shortDescription || post.excerpt || '';
            const tag = Array.isArray(post.tags) && post.tags.length > 0 ? post.tags[0] : post.category || 'General';
            const readTime = post.readTime || post.readingTime || '4 min read';
            const link = `/blog/singleblog?slug=${post.slug || post.id}`;

            return (
              <article
                key={post.id}
                className="poppins flex flex-col rounded-[20px] border border-[#EAEFF7] bg-white p-3.5 shadow-[0px_8px_24px_0px_rgba(20,37,63,0.04)]"
              >
                <Link to={link} className="block overflow-hidden rounded-[14px] bg-gray-100">
                  <img src={banner} alt={post.title} className="aspect-[16/9] w-full object-cover transition-transform duration-300 hover:scale-105" />
                </Link>

                <div className="flex flex-1 flex-col px-1.5 pt-4">
                  <Link to={link} className="text-[16px] font-bold leading-[1.3] text-[#042C89] hover:underline">
                    {post.title}
                  </Link>
                  <p className="mt-2 line-clamp-2 text-[12px] leading-[1.5] text-[#475569]">{excerpt}</p>

                  <div className="mt-auto flex items-center justify-between gap-2 border-t border-[#EAEFF7] pt-4 mt-5">
                    <div className="flex min-w-0 flex-wrap items-center gap-2">
                      <span className={`rounded-full px-3 py-1 text-[10px] font-semibold ${getTagStyle(tag)}`}>{tag}</span>
                      <span className="text-[10.5px] font-medium text-[#64748B]">
                        {formatDate(post.publishDate || post.date)} · {readTime}
                      </span>
                    </div>
                    <Link
                      to={link}
                      aria-label={`Read ${post.title}`}
                      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#DCEEFB] text-[#042C89] transition-colors hover:bg-[#042C89] hover:text-white"
                    >
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default MorePosts;