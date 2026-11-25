import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { HowToPlanBanner } from './components/WhySambaHero';
import { VenueProvider } from '../Venues/VenueContext';
import { Category } from './components/Category';
import { Community } from './components/Community';
import { Faq } from './components/Faq';
import { MorePosts } from './components/Morepost';
import textureBg from 'https://webstepdev.com/demo/syncoWebsiteImages/texture.png';
import { FooterBottom } from '../Contact/components';
import { PageMeta } from '../../components/common/PageMeta';
import './single-blog-translated.css';

export function SingleBlog() {
  const { slug: routeSlug } = useParams();
  const [searchParams] = useSearchParams();
  const querySlug = searchParams.get('slug');
  const queryId = searchParams.get('id');

  const slug =
    routeSlug && routeSlug !== 'singleblog'
      ? routeSlug
      : querySlug || queryId || 'how-to-plan-football-sessions-for-children';

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const fetchBlogDetails = async () => {
      setLoading(true);
      try {
        const url = `https://api.grabbite.com/api/open/blogs/${encodeURIComponent(slug)}`;
        const res = await fetch(url, {
          method: 'GET',
          redirect: 'follow',
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const json = await res.json();
        const data = json?.data || json;

        if (isMounted && data) {
          setBlog(data);
        }
      } catch (err) {
        console.error('Error fetching blog details from live endpoint:', err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchBlogDetails();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 animate-spin text-[#042C89]" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="py-24 text-center">
        <h2 className="text-2xl font-bold text-[#042C89] gasoek">Blog post not found</h2>
        <p className="mt-2 text-gray-600 poppins">The requested article could not be found.</p>
      </div>
    );
  }

  return (
    <VenueProvider>
      <PageMeta 
        title={blog?.title ? `${blog.title} | Samba Soccer Schools` : "Blog Article | Samba Soccer Schools"}
        description={blog?.excerpt || blog?.summary || blog?.description || (blog?.title ? `Read ${blog.title} on Samba Soccer Schools blog.` : undefined)}
        keywords={blog?.tags?.join(', ') || "samba soccer blog, kids football coaching"}
        ogType="article"
      />
      <div className="single-blog-page-container" style={{
        backgroundImage: `url(${textureBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        {/* 1st Section - Hero Banner */}
       {/* 1st Section - Hero Banner */}
<HowToPlanBanner blog={blog} loading={loading} />

{/* 2nd Section - Blog Content */}
<Category blog={blog} loading={loading} />

{/* 3rd Section - FAQs */}
<Faq faqs={blog?.faqs} blogTitle={blog?.title} highlight="planning sessions." />

{/* 4th Section - More posts */}
<MorePosts currentSlug={slug} category={blog?.tags?.[0] || blog?.category} />

{/* 5th Section - Newsletter + social bar */}
<Community />

<FooterBottom />

      </div>
    </VenueProvider>
  );
}

export default SingleBlog;
