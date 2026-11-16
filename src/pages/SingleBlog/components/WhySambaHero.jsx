import React from 'react';
import { Container } from '../../../components/common/Container';
import bannerPattern from 'https://webstepdev.com/demo/syncoWebsiteImages/blog/FeaturedBlogCard.png';
import hero from 'https://webstepdev.com/demo/syncoWebsiteImages/blog/hero.png';
import bannerPatternMobile from 'https://webstepdev.com/demo/syncoWebsiteImages/blog/blog_mobile.png';

export function HowToPlanBanner({ blog, loading }) {
  const title = blog?.title || '';
  const description = blog?.shortDescription || '';

  const formattedDate = blog?.publishDate
    ? new Date(blog.publishDate).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
    : '';

  const desktopImage = blog?.coverImage || bannerPattern;
  const mobileImage =
    blog?.mobileImage ||
    blog?.coverImageMobile ||
    blog?.mobileCoverImage ||
    bannerPatternMobile ||
    desktopImage;

  return (
<section
  className="w-full py-6 m-auto md:py-6 bg-cover bg-center bg-no-repeat"
  style={{ backgroundImage: hero ? `url(${hero})` : 'none' }}
>      <Container>
        <div className="max-w-[1240px] relative overflow-hidden rounded-[28px] md:rounded-[40px]">
          {(title || description || formattedDate) && (
            <div className="md:text-center py-6 md:py-10 max-w-[960px] mx-auto px-4">
              {formattedDate && (
                <p className="text-[#797A88] 2xl:text-[16px] text-[15px]  poppins pb-6 lg:pb-8">
                  Posted {formattedDate}
                </p>
              )}
              {title && (
                <h1 className="text-[28px] sm:text-[44px] md:text-[48px] 2xl:text-[52px] text-[#042C89] gasoek leading-tight">
                  {title}
                </h1>
              )}
              {description && (
                <p className="text-[#4B4B56]  font-medium text-[15px] xl-[16px] 2xl:text-[18px] leading-[1.6] pt-5 poppins">
                  {description}
                </p>
              )}
            </div>
          )}

          {(mobileImage || desktopImage) && (
            <picture>
              {desktopImage && <source media="(min-width: 768px)" srcSet={desktopImage} />}
              <img
                src={mobileImage || desktopImage}
                alt=""
                className="w-full  object-cover object-center  "
              />
            </picture>
          )}
        </div>
      </Container>
    </section>
  );
}