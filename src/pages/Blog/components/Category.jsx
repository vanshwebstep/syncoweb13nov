import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Loader2, ArrowRight, ChevronDown } from 'lucide-react';
import { Container } from '../../../components/common/Container';
import blogpic1 from 'https://webstepdev.com/demo/syncoWebsiteImages/blog/img-blog-1.png';

const DEFAULT_CATEGORIES = ['All', 'Parents', 'Skills & drills', 'Coaching', 'Holiday camps', 'Franchise', 'News'];
const PER_LOAD = 6;

const TAG_STYLES = {
  'Skills & drills': 'bg-[#DDF7E8] text-[#042C89]',
  Parents: 'bg-[#DCEEFB] text-[#042C89]',
  Coaching: 'bg-[#FFF3B0] text-[#042C89]',
  'Holiday camps': 'bg-[#FFE7CC] text-[#C2410C]',
  News: 'bg-[#FFE0E3] text-[#D6293E]',
  Franchise: 'bg-[#E6E0FF] text-[#042C89]',
};

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
};

export function Category() {
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const [active, setActive] = useState('All');
  const [sort, setSort] = useState('newest');
  const [visible, setVisible] = useState(PER_LOAD);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Categories
  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const res = await fetch('https://api.grabbite.com/api/open/blogs/categories', { redirect: 'follow' });
        if (res.ok) {
          const json = await res.json();
          const list = Array.isArray(json?.data) ? json.data : Array.isArray(json) ? json : [];
          if (isMounted && list.length > 0) setCategories(['All', ...list]);
        }
      } catch (err) {
        console.warn('Error fetching categories, using default:', err);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  // Blogs
  useEffect(() => {
    let isMounted = true;
    (async () => {
      setLoading(true);
      try {
        const query = active !== 'All' ? `?category=${encodeURIComponent(active)}` : '';
        const res = await fetch(`https://api.grabbite.com/api/open/blogs${query}`, { redirect: 'follow' });
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const result = await res.json();
        const list =
          result?.data?.blogs || result?.data || result?.blogs || (Array.isArray(result) ? result : []);
        if (isMounted) setPosts(Array.isArray(list) ? list : []);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        if (isMounted) setPosts([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [active]);

  const handleClick = (cat) => {
    setActive(cat);
    setVisible(PER_LOAD);
  };

  const sortedPosts = useMemo(() => {
    const getTime = (p) => new Date(p.publishDate || p.date || p.createdAt || 0).getTime();
    const arr = [...posts];
    arr.sort((a, b) => (sort === 'newest' ? getTime(b) - getTime(a) : getTime(a) - getTime(b)));
    return arr;
  }, [posts, sort]);

  const shown = sortedPosts.slice(0, visible);
  const total = sortedPosts.length;

  return (
    <section className="w-full py-8 lg:py-12">
      <Container>
        {/* ===== Filters row ===== */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-1 gap-2 overflow-x-auto no-scrollbar md:flex-wrap md:overflow-visible">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleClick(cat)}
                className={`poppins shrink-0 whitespace-nowrap rounded-full border px-5 py-2 text-[14px] font-semibold transition-colors ${
                  active === cat
                    ? 'border-[#042C89] bg-[#042C89] text-white'
                    : 'border-[#D9E2F3] bg-white text-[#042C89] hover:bg-[#F1F5FD]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative hidden shrink-0 md:block">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="poppins cursor-pointer appearance-none rounded-full border border-[#D9E2F3] bg-white py-2 pl-5 pr-10 text-[14px] font-semibold text-[#042C89] outline-none"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#042C89]" />
          </div>
        </div>

        {/* ===== Heading ===== */}
        <div className="mt-10 flex items-baseline gap-3">
          <h2 className="recline text-[24px] font-bold text-[#042C89]">Latest articles</h2>
          <span className="poppins text-[14px] font-bold text-[#64748B]">{total} articles</span>
        </div>

        {/* ===== Grid ===== */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-[#042C89]" />
          </div>
        ) : shown.length === 0 ? (
          <p className="poppins py-12 text-center text-[14px] text-gray-500">No posts found in this category.</p>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {shown.map((post) => {
              const banner = post.coverImage || post.banner || blogpic1;
              const excerpt = post.shortDescription || post.excerpt || '';
              const tag = Array.isArray(post.tags) && post.tags.length > 0 ? post.tags[0] : post.category || 'General';
              const date = formatDate(post.publishDate || post.date);
              const readTime = post.readTime || post.readingTime || '4 min read';
              const link = `/blog/singleblog?id=${post.id}&slug=${post.slug || ''}`;

              return (
                <article
                  key={post.id}
                  className="poppins flex flex-col rounded-[20px] border border-[#EAEFF7] bg-white p-3.5 shadow-[0px_8px_24px_0px_rgba(20,37,63,0.04)]"
                >
                  <Link to={link} className="block overflow-hidden rounded-[14px] bg-gray-100">
                    <img
                      src={banner}
                      alt={post.title}
                      className="aspect-[16/9] w-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </Link>

                  <div className="flex flex-1 flex-col px-1.5 pt-4">
                    <Link
                      to={link}
                      className="text-[19px] font-bold leading-[1.3] text-[#042C89] hover:underline"
                    >
                      {post.title}
                    </Link>

                    <p className="mt-2 line-clamp-2 text-[14px] font-normal leading-[1.5] text-[#475569]">
                      {excerpt}
                    </p>

                    <div className="mt-auto flex items-center justify-between gap-2 border-t border-[#EAEFF7] pt-4 mt-5">
                      <div className="flex min-w-0 flex-wrap items-center gap-2">
                        <span
                          className={`rounded-full px-3 py-1 text-[11.5px] font-semibold ${
                            TAG_STYLES[tag] || 'bg-[#DDF7E8] text-[#042C89]'
                          }`}
                        >
                          {tag}
                        </span>
                        <span className="text-[12.5px] font-medium text-[#64748B]">
                          {date} · {readTime}
                        </span>
                      </div>

                      <Link
                        to={link}
                        aria-label={`Read ${post.title}`}
                        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#DCEEFB] text-[#042C89] transition-colors hover:bg-[#042C89] hover:text-white"
                      >
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* ===== Load more ===== */}
        {!loading && total > 0 && (
          <div className="mt-10 flex flex-col items-center gap-3">
            {visible < total && (
              <button
                onClick={() => setVisible((v) => v + PER_LOAD)}
                className="poppins rounded-full bg-[#E3F1FC] px-12 py-3 text-[15px] font-semibold text-[#042C89] transition-colors hover:bg-[#D2E8F9]"
              >
                Load more articles
              </button>
            )}
            <p className="poppins text-[13px] font-medium text-[#64748B]">
              Showing {Math.min(visible, total)} of {total}
            </p>
          </div>
        )}
      </Container>
    </section>
  );
}