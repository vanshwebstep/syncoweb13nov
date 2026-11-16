import React from 'react';
import { Container } from '../../../components/common/Container';
import bannerPattern from 'https://webstepdev.com/demo/syncoWebsiteImages/blog/FeaturedBlogCard.png';
import bannerPatternMobile from 'https://webstepdev.com/demo/syncoWebsiteImages/blog/blog_mobile.png';
// repeating soccer-ball squiggle texture (green-on-green)

export function HowToPlanBanner() {
  return (
    <section className=" w-full py-6 m-auto md:py-4">
      <Container>
        <div
          className="  relative w-full overflow-hidden rounded-[28px] md:rounded-[40px]">
          <div className='text-center py-4 md:py-10'>
            <h1 className='text-[44px] md:text-[54px] lg:text-[64px] leading-[1.1] md:leading-[1.3] text-[#042C89] recline'>Check out our <span className=" text-[#0DD180] gasoek">blogs</span></h1>
            <p className='text-[#475569] md:text-[#042C89] text-[14.5px] sm:text-[18px] leading-[1.5] poppins font-medium'>Check out our blogs to stay updated with the latest news about <br className="hidden md:block" /> our football training for kids in London.</p>
          </div>
          <div
            className="shadow-[0px_12px_40px_0px_rgba(4,6,15,0.1216)] bg-cover bg-center bg-no-repeat rounded-[32px] bg-[image:var(--bg-mobile)] md:bg-[image:var(--bg-desktop)]"
            style={{
              '--bg-mobile': `url(${bannerPatternMobile})`,
              '--bg-desktop': `url(${bannerPattern})`,

              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}>
            <div className="featured-blog-card-flex relative z-10 flex flex-col md:flex-row items-center">
              {/* Left: copy */}
                <div className="featured-blog-copy w-full px-6 md:w-[100%] sm:px-10 lg:pl-24 py-10 lg:py-28">
                  <h2 className="gasoek text-white text-[40px] sm:text-[52px] leading-[1.15] mb-1">
                    How to Plan
                  </h2>
                  <h2 className="recline text-[#042C89] text-[40px] lg:text-[52px] leading-[1.15] mb-6">
                    Football Sessions <br className='hidden md:block'/> for Children?
                  </h2>
                  <button className="poppins font-bold bg-[#042C89] text-white text-[16px] lg:text-[20px] px-6 py-3 rounded-full hover:bg-[#031f63] transition-colors">
                    Read More
                  </button>
                </div>

              {/* Right: photo, blob-clipped, bleeding off the edge */}
              <div className="relative w-full md:w-[54%] h-[220px] sm:h-[280px] md:h-[340px]">
                <div
                  className="absolute inset-0 md:-right-6"
                  style={{
                    clipPath:
                      'path("M0,0 C0,0 60,0 220,0 C420,0 520,90 520,170 C520,250 420,340 220,340 C60,340 0,340 0,340 Z")',
                  }}
                >
                  {/* <img
                        src={bannerKids}
                        alt="Kids in a Samba football training session"
                        className="w-full h-full object-cover"
                      /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}