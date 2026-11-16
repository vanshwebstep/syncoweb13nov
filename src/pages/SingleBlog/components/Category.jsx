import React from 'react';
import { Container } from '../../../components/common/Container';
import hero from 'https://webstepdev.com/demo/syncoWebsiteImages/blog/blog.png';

export function Category({ blog, loading }) {
  const sections = Array.isArray(blog?.sections) ? blog.sections : [];
  const hasContent = Boolean(blog?.content);

  if (sections.length === 0 && !hasContent) {
    return null;
  }

  return (
    <section id="article-content" className="w-full py-8 lg:pt-24 lg:pb-14"
    
    style={{ backgroundImage: hero ? `url(${hero})` : 'none' }}>
      <Container>
        <div className="max-w-[900px] md:rounded-[40px] rounded-[20px] shadow-[0px_4px_17.8px_0px_rgba(0,0,0,0.07)] p-5 py-8 md:p-10 bg-white  m-auto">
          {sections.map((sec, idx) => (
            <div key={idx} className={idx > 0 ? 'pt-10 md:pt-20 border-t-2 md:border-t-0 border-[#CBD4E1]' : 'md:pb-0 pb-10'}>
              {sec.heading && (
                <h2 className="text-[24px] md:text-[32px] text-[#042C89] tracking-[2%] gasoek leading-tight text-left mb-5">
                  {sec.heading}
                </h2>
              )}

              {sec.description && (
                <p className="text-[#4B4B56] text-[13px] md:text-[15px] leading-[1.7] pt-0 poppins whitespace-pre-line">
                  {sec.description}
                </p>
              )}

              {sec.image && (
                <img
                  src={sec.image}
                  alt={sec.heading || `Article image ${idx + 1}`}
                  className="w-full h-auto mt-6 rounded-[24px] md:rounded-[36px] object-cover max-h-[480px]"
                />
              )}

              {sec.subDescription && (
                <p className="text-[#4B4B56] text-[13px] md:text-[15px] leading-[1.7] pt-6 md:pt-8 poppins whitespace-pre-line">
                  {sec.subDescription}
                </p>
              )}
            </div>
          ))}

          {/* If rich HTML content is present and no sections were returned */}
          {(!blog?.sections || blog.sections.length === 0) && blog?.content && (
            <div
              className="mt-8 text-[#4B4B56] text-[15px] leading-[1.7] poppins [&>h2]:text-[28px] [&>h2]:md:text-[32px] [&>h2]:text-[#042C89] [&>h2]:gasoek [&>h2]:mt-10 [&>h2]:mb-4 [&>p]:mb-4"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          )}
        </div>
      </Container>
    </section>
  );
}

export default Category;
