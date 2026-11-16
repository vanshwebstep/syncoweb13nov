import React, { useMemo, useRef, useState, useEffect } from 'react';
import { Link, } from 'react-router-dom';
import { Loader2, ArrowUpRight } from 'lucide-react';
import { Container } from '../../../components/common/Container';
import blogpic1 from 'https://webstepdev.com/demo/syncoWebsiteImages/blog/img-blog-1.png';
import blogpic2 from 'https://webstepdev.com/demo/syncoWebsiteImages/blog/img-blog-2.png';
import blogpic3 from 'https://webstepdev.com/demo/syncoWebsiteImages/blog/img-blog-3.png';
import blogpic4 from 'https://webstepdev.com/demo/syncoWebsiteImages/blog/img-blog-4.png';
import { ChevronDown } from 'lucide-react';

// Component ke andar (categories, active, handleClick ke saath):



const DEFAULT_CATEGORIES = ['All', 'Parents', 'Skills', 'General', 'Franchise', 'Coaches', 'Services'];
const POSTS_PER_PAGE = 4;
const categoryToTag = { Parets: 'Parents' };

const formatDate = (dateStr) => {
  if (!dateStr) return 'Jul 17';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  } catch {
    return dateStr;
  }
};

export function Category() {

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const handleMobileSelect = (cat) => {
    handleClick(cat);
    setOpen(false);
  };
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const [active, setActive] = useState('All');
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch dynamic categories from API
  useEffect(() => {
    let isMounted = true;
    const fetchCategories = async () => {
      try {
        const res = await fetch('https://api.grabbite.com/api/open/blogs/categories', {
          method: 'GET',
          redirect: 'follow',
        });
        if (res.ok) {
          const json = await res.json();
          const list = Array.isArray(json?.data) ? json.data : (Array.isArray(json) ? json : []);
          if (isMounted && list.length > 0) {
            setCategories(['All', ...list]);
          }
        }
      } catch (err) {
        console.warn('Error fetching dynamic categories, using default:', err);
      }
    };

    fetchCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleClick = (cat) => {
    setActive(cat);
    setPage(1);
  };

  useEffect(() => {
    let isMounted = true;

    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const selectedTag = categoryToTag[active] || active;
        const query = active !== 'All' ? `?category=${encodeURIComponent(selectedTag)}` : '';
        const url = `https://api.grabbite.com/api/open/blogs${query}`;

        const requestOptions = {
          method: 'GET',
          redirect: 'follow',
        };

        const res = await fetch(url, requestOptions);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const result = await res.json();
        const blogList =
          result?.data?.blogs ||
          result?.data ||
          result?.blogs ||
          (Array.isArray(result) ? result : []);

        if (isMounted) {
          if (Array.isArray(blogList) && blogList.length > 0) {
            setPosts(blogList);
          } else if (active === 'All') {
            setPosts([]);
          } else {
            setPosts([]);
          }
        }
      } catch (err) {
        console.error('Error fetching blogs from live endpoint:', err);
        if (isMounted) {
          // Fallback to base demo posts on error
          const selectedTag = categoryToTag[active] || active;
          if (active === 'All') {
            setPosts([]);
          } else {
            setPosts([]);
          }
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchBlogs();

    return () => {
      isMounted = false;
    };
  }, [active]);

  const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);

  const paginatedPosts = posts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const goToPage = (p) => {
    if (p < 1 || p > totalPages || p === currentPage) return;
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Builds the "1 2 3 ... 8 9 10" style page list with ellipses.
  const pageItems = useMemo(() => {
    const items = [];
    const add = (v) => items.push(v);

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) add(i);
      return items;
    }

    add(1);
    add(2);
    add(3);
    if (currentPage > 5) add('...');

    const midStart = Math.max(4, currentPage - 1);
    const midEnd = Math.min(totalPages - 3, currentPage + 1);
    for (let i = midStart; i <= midEnd; i++) {
      if (i > 3 && i < totalPages - 2) add(i);
    }

    if (currentPage < totalPages - 4) add('...');
    add(totalPages - 2);
    add(totalPages - 1);
    add(totalPages);

    return [...new Set(items)];
  }, [currentPage, totalPages]);

  return (
    <section className="w-full py-8 lg:py-12">
      <Container>


        <div className="py-6 m-auto md:py-10 pb-[60px] lg:pb-[100px]">
          <div className="flex items-center justify-between gap-4 rounded-[20px] bg-[#042C89] px-6 py-5 md:px-10 lg:py-8">
            <h2 className="text-[18px] md:text-[22px] font-bold text-white lg:text-[28px] poppins whitespace-nowrap">
              Browse by Category
            </h2>

            {/* Mobile dropdown */}
            <div ref={dropdownRef} className="relative md:hidden">
              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-haspopup="listbox"
                aria-expanded={open}
                className="flex min-w-[96px] items-center justify-between gap-3 rounded-full bg-white px-5 py-2.5 text-[14px] font-bold text-[#042C89] poppins"
              >
                <span className="truncate">{active}</span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                />
              </button>

              {open && (
                <ul
                  role="listbox"
                  className="absolute right-0 top-full z-20 mt-2 max-h-[260px] min-w-[180px] no-scrollbar overflow-y-auto rounded-[16px] bg-white py-2 shadow-[0px_12px_40px_0px_rgba(4,6,15,0.1216)]"
                >
                  {categories.map((cat) => (
                    <li key={cat} role="option" aria-selected={active === cat}>
                      <button
                        type="button"
                        onClick={() => handleMobileSelect(cat)}
                        className={`w-full px-5 py-2.5 text-left text-[14px] poppins transition-colors ${active === cat
                            ? 'bg-emerald-400/20 font-bold text-[#042C89]'
                            : 'font-semibold text-[#042C89] hover:bg-slate-100'
                          }`}
                      >
                        {cat}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Desktop buttons */}
            <div className="hidden flex-wrap gap-2 md:flex md:gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleClick(cat)}
                  className={`rounded-full px-5 py-2 text-[14px] transition-colors duration-200 ${active === cat
                      ? 'bg-emerald-400 text-[#0a1172] font-bold'
                      : 'bg-white/10 border border-white/10 font-semibold text-white hover:bg-blue-800/70'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <h2 className="lg:mb-16 mb-10 text-xl font-semibold text-[#34353B] md:text-[24px] lg:text-[32px]">All blog posts</h2>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-[#042C89]" />
          </div>
        ) : paginatedPosts.length === 0 ? (
          <p className="py-12 text-center text-gray-500">No posts found in this category.</p>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {paginatedPosts.map((post) => {
              const banner = post.coverImage || post.banner || blogpic1;
              const author = post.authorName || post.author || 'Alan Whitten';
              const date = formatDate(post.publishDate || post.date);
              const excerpt = post.shortDescription || post.excerpt || '';
              const tags = Array.isArray(post.tags) && post.tags.length > 0
                ? post.tags
                : (post.category ? [post.category] : ['General']);

              return (
                <div key={post.id} className="md:p-6 p-4 py-6 rounded-[24px] md:rounded-[32px] poppins bg-white shadow-[0px_24px_39px_0px_rgba(20,37,63,0.051)] flex flex-col justify-between">
                  <div>
                    <div className=" w-full overflow-hidden rounded-[24px] lg:rounded-[32px] bg-gray-100">
                      <img
                        src={banner}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>

                    <div className="pt-6">
                      <p className="lg:text-[16px] text-[14px] text-[#5F5F6D] poppins">
                        {author} • {date}
                      </p>

                      <Link
                        to={`/blog/singleblog?id=${post.id}&slug=${post.slug || ''}`}
                        className="mt-1 inline-flex items-start gap-1 text-[18px] 2xl:text-[24px] xl:text-[20px] font-semibold py-2 text-blue-900 hover:underline"
                      >
                        {post.title}
                        <span className="mt-1 text-sm"><ArrowUpRight /></span>
                      </Link>

                      <p className="md:mt-1 text-[14px] 2xl:text-[16px] text-[#475569] line-clamp-2">{excerpt}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className={`rounded-full px-3 py-1 text-[12px] 2xl:text-[14px] font-medium ${tag === 'Parents'
                            ? 'bg-yellow-200 text-[#042C89]'
                            : 'bg-emerald-200 text-[#042C89]'
                          }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-between">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`flex items-center gap-1 text-sm font-medium ${currentPage === 1
                  ? 'cursor-not-allowed text-gray-300'
                  : 'text-gray-600 hover:text-blue-900'
                }`}
            >
              ← Previous
            </button>

            <div className="flex items-center gap-1 md:gap-2">
              {pageItems.map((item, idx) =>
                item === '...' ? (
                  <span key={`ellipsis-${idx}`} className="px-2 text-sm text-gray-400">
                    ...
                  </span>
                ) : (
                  <button
                    key={item}
                    onClick={() => goToPage(item)}
                    className={`flex h-8 w-8 items-center justify-center rounded-md text-sm font-semibold transition-colors duration-200 ${item === currentPage
                        ? 'bg-emerald-400 text-[#0a1172]'
                        : 'text-blue-900 hover:bg-gray-100'
                      }`}
                  >
                    {item}
                  </button>
                )
              )}
            </div>

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`flex items-center gap-1 text-sm font-medium ${currentPage === totalPages
                  ? 'cursor-not-allowed text-gray-300'
                  : 'text-blue-900 hover:text-blue-700'
                }`}
            >
              Next →
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}