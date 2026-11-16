import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../../../components/common/Container';
import { ArrowUpRight } from 'lucide-react';
import hero from 'https://webstepdev.com/demo/syncoWebsiteImages/blog/afterfaq.png';

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  } catch {
    return dateStr;
  }
};

export function MorePosts({ currentSlug }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchRecentBlogs = async () => {
      try {
        const res = await fetch('https://api.grabbite.com/api/open/blogs', {
          method: 'GET',
          redirect: 'follow',
        });
        if (res.ok) {
          const json = await res.json();
          const blogList =
            json?.data?.blogs || json?.data || json?.blogs || (Array.isArray(json) ? json : []);
          if (isMounted && Array.isArray(blogList) && blogList.length > 0) {
            const filtered = blogList
              .filter(
                (p) =>
                  p.slug !== currentSlug &&
                  String(p.id) !== String(currentSlug)
              )
              .slice(0, 3);
            if (filtered.length > 0) {
              setPosts(filtered);
            }
          }
        }
      } catch (err) {
        console.warn('Error fetching recent blogs:', err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchRecentBlogs();

    return () => {
      isMounted = false;
    };
  }, [currentSlug]);

  if (!loading && posts.length === 0) {
    return null;
  }

  return (
    <section className="w-full py-8 md:py-12"  style={{ backgroundImage: hero ? `url(${hero})` : 'none' }}
    >
      <Container>
        <h2 className="mb-6 text-xl font-semibold text-[#042C89] xl:text-[28px] md:py-10 2xl:text-[32px]">Recent posts</h2>

        {posts.length === 0 ? null : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => {
              const banner = post.coverImage || post.mobileImage || post.banner || '';
              const author = post.authorName || post.author || 'Alan Whitten';
              const date = formatDate(post.publishDate || post.date);
              const excerpt = post.shortDescription || post.excerpt || '';
              const tags =
                Array.isArray(post.tags) && post.tags.length > 0
                  ? post.tags
                  : post.category
                  ? [post.category]
                  : ['General'];

              return (
                <div
                  key={post.id}
                  className="p-5 rounded-[20px] bg-white shadow-[0px_15.72px_25.54px_0px_rgba(20,37,63,0.051)] flex flex-col justify-between"
                >
                  <div>
                    <div className=" w-full overflow-hidden rounded-2xl bg-gray-100">
                      <img
                        src={banner}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>

                    <div className="pt-4">
                      <p className="text-xs text-gray-500">
                        {author} • {date}
                      </p>

                      <Link
                        to={`/blog/singleblog?slug=${post.slug || post.id}`}
                        className="mt-1 inline-flex items-start gap-1 text-[16px] py-1.5 font-semibold text-blue-900 hover:underline"
                      >
                        {post.title}
                        <span className="mt-1 text-[10px]"><ArrowUpRight size={20}/></span>
                      </Link>

                      <p className="mt-2 text-[14px] text-gray-600 line-clamp-2">{excerpt}</p>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className={`rounded-full px-3 py-1 text-[12px] font-medium ${
                          tag === 'Parents'
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
      </Container>
    </section>
  );
}

export default MorePosts;
