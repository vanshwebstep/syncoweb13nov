import React from 'react';
import { Container } from '../../../components/common/Container';
import bannerBg from 'https://webstepdev.com/demo/syncoWebsiteImages/why-samba/beauty_banner.png';
import cyanLayer from 'https://webstepdev.com/demo/syncoWebsiteImages/why-samba/beautyLayer.png';
import cyanLayerMobile from 'https://webstepdev.com/demo/syncoWebsiteImages/why-samba/yellow-top-layer-mobile.png';
import beautyHeroImg from 'https://webstepdev.com/demo/syncoWebsiteImages/why-samba/putting_beauty.png';
import beautyHeroImgMobile from 'https://webstepdev.com/demo/syncoWebsiteImages/why-samba/putting_beauty_mobile.png';
import icongreen1 from 'https://webstepdev.com/demo/syncoWebsiteImages/why-samba/Group 1000002718.png';
import iconyellow from 'https://webstepdev.com/demo/syncoWebsiteImages/why-samba/Group 1000002719.png';
import iconblue from 'https://webstepdev.com/demo/syncoWebsiteImages/why-samba/Group 1000002720.png';
import iconwhite from 'https://webstepdev.com/demo/syncoWebsiteImages/why-samba/Group 1000002721.png';
import icongreen from 'https://webstepdev.com/demo/syncoWebsiteImages/why-samba/Group 1000002722.png';
import swooshicon from 'https://webstepdev.com/demo/syncoWebsiteImages/why-samba/Swoosh.png';

export function EveryAdventure() {
    return (
        <section
            className="pt-[140px] pb-[40px] sm:py-20 px-1 md:px-0  text-white relative overflow-hidden font-sans"
            style={{
                backgroundImage: `url(${bannerBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'top',
                backgroundColor: '#042C89'
            }}
        >
            {/* Cyan bottom-right wave accent from media_1789366116377.png */}
            <div className="absolute -bottom-1 -right-1 w-48 sm:w-72 lg:w-96 pointer-events-none z-0">
                <img src={cyanLayer} alt="" className="w-full h-auto object-contain " />
            </div>
            <div className="absolute -top-1 block md:hidden -right-1 w-50 pointer-events-none z-0">
                <img src={cyanLayerMobile} alt="" className="w-full h-auto object-contain " />
            </div>

            <Container className="relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-12 relative items-center">
                    {/* Left Column: Heading, 3 Star Bullets & Copy */}
                    <div className="md:col-span-6 lg:col-span-6 space-y-4 lg:space-y-6">
                        {/* Heading */}
                        <div>
                            <h2 className="font-['Recline',sans-serif] font-bold text-[61px] md:text-[30px] lg:text-[35px] xl:text-[40px] text-white leading-[1.08] ">
                                Putting beauty 
                                back in  <br />
                                <span className="font-['Gasoek_One',sans-serif] font-normal text-[61px] md:text-[30px] lg:text-[40px] xl:text-[48px] text-[#0DD180] leading-none block mt-1">
                                 the   beautiful game
                                </span>
                            </h2>
                        </div>

                        {/* 3 Star Bullet Items */}
                      <ul className="space-y-4 pt-2">
    {/* The Skill */}
    <li className="flex items-center gap-3 text-white">
        <img
            src={icongreen1}
            alt=""
            className="w-[44px] h-[44px] object-contain shrink-0"
        />
        <div className="flex flex-col gap-0.5">
            <span className="font-['Poppins',sans-serif] text-[15px] sm:text-[18px] md:text-[14px] lg:text-[16px] xl:text-[17px] font-semibold leading-tight">
                The skill
            </span>
            <span className="text-white text-[14.5px] font-light leading-tight">
                to take someone on
            </span>
        </div>
    </li>

    {/* The Flair */}
    <li className="flex items-center gap-3 text-white">
        <img
            src={iconyellow}
            alt=""
            className="w-[44px] h-[44px] object-contain shrink-0"
        />
        <div className="flex flex-col gap-0.5">
            <span className="font-['Poppins',sans-serif] text-[15px] sm:text-[18px] md:text-[14px] lg:text-[16px] xl:text-[17px] font-semibold leading-tight">
                The flair
            </span>
            <span className="text-white text-[14.5px] font-light leading-tight">
                to try something unexpected
            </span>
        </div>
    </li>

    {/* The Creativity */}
    <li className="flex items-center gap-3 text-white">
        <img
            src={iconblue}
            alt=""
            className="w-[44px] h-[44px] object-contain shrink-0"
        />
        <div className="flex flex-col gap-0.5">
            <span className="font-['Poppins',sans-serif] text-[15px] sm:text-[18px] md:text-[14px] lg:text-[16px] xl:text-[17px] font-semibold leading-tight">
                The creativity
            </span>
            <span className="text-white text-[14.5px] font-light leading-tight">
                to see another way
            </span>
        </div>
    </li>

    {/* The Freedom */}
    <li className="flex items-center gap-3 text-white">
        <img
            src={iconwhite}
            alt=""
            className="w-[44px] h-[44px] object-contain shrink-0"
        />
        <div className="flex flex-col gap-0.5">
            <span className="font-['Poppins',sans-serif] text-[15px] sm:text-[18px] md:text-[14px] lg:text-[16px] xl:text-[17px] font-semibold leading-tight">
                The freedom
            </span>
            <span className="text-white text-[14.5px] font-light leading-tight">
                to make their own decisions
            </span>
        </div>
    </li>

    {/* The Joy */}
    <li className="flex items-center gap-3 text-white">
        <img
            src={icongreen}
            alt=""
            className="w-[44px] h-[44px] object-contain shrink-0"
        />
        <div className="flex flex-col gap-0.5">
            <span className="font-['Poppins',sans-serif] text-[15px] sm:text-[18px] md:text-[14px] lg:text-[16px] xl:text-[17px] font-semibold leading-tight">
                The joy
            </span>
            <span className="text-white text-[14.5px] font-light leading-tight">
                that makes them fall in love with football
            </span>
        </div>
    </li>
</ul>

                        {/* Paragraph Copy */}
                        <div className="space-y-3 lg:space-y-4 pt-2 lg:pt-3 font-['recline',sans-serif] text-[#FFDE14] font-normal text-[20px] sm:text-[18px] md:text-[20px] lg:text-[22px] leading-relaxed md:max-w-xl">
                           
                            <p>
                                We found it in Brazil. We built it into Samba. Now we <br className='hidden md:block' /> want to give it back.
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Organic Cutout Photo with Border & 3D Character */}
                    <div className="md:col-span-6 lg:col-span-6 flex justify-center items-center">
                        <div className="w-full max-w-[360px] lg:max-w-xl">
                            <img
                                src={beautyHeroImg}
                                alt="Putting beauty back in the beautiful game"
                                className="w-full hidden md:block h-auto object-contain transition-transform duration-500 hover:scale-[1.02]"
                            />
                            <img
                                src={beautyHeroImgMobile}
                                alt="Putting beauty back in the beautiful game"
                                className="w-full block md:hidden h-auto object-contain transition-transform duration-500 hover:scale-[1.02]"
                            />
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}

export default EveryAdventure;
