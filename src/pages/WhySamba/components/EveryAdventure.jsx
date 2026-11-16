import React from 'react';
import { Container } from '../../../components/common/Container';
import bannerBg from 'https://webstepdev.com/demo/syncoWebsiteImages/why-samba/beauty_banner.png';
import cyanLayer from 'https://webstepdev.com/demo/syncoWebsiteImages/why-samba/beautyLayer.png';
import cyanLayerMobile from 'https://webstepdev.com/demo/syncoWebsiteImages/why-samba/yellow-top-layer-mobile.png';
import beautyHeroImg from 'https://webstepdev.com/demo/syncoWebsiteImages/why-samba/putting_beauty.png';
import beautyHeroImgMobile from 'https://webstepdev.com/demo/syncoWebsiteImages/why-samba/putting_beauty_mobile.png';
import starIcon from 'https://webstepdev.com/demo/syncoWebsiteImages/why-samba/Star.png';

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
                            <h2 className="font-['Recline',sans-serif] font-bold text-[38px] md:text-[38px] lg:text-[50px] xl:text-[61px] text-white leading-[1.08] ">
                                Putting beauty <br className='hidden md:block' />
                                back<br className='md:hidden block' /> in the <br />
                                <span className="font-['Gasoek_One',sans-serif] font-normal text-[38px] md:text-[38px] lg:text-[50px] xl:text-[61px] text-[#0DD180] leading-none block mt-1">
                                    beautiful game
                                </span>
                            </h2>
                        </div>

                        {/* 3 Star Bullet Items */}
                        <ul className="space-y-1.5 pt-2">
                            <li className="flex items-center gap-3 text-white font-['Recline',sans-serif] text-[15px] sm:text-[18px] md:text-[16px] lg:text-[19px] xl:text-[24px] font-semibold">
                                <img src={starIcon} alt="" className="w-4 h-4 lg:w-5 lg:h-5 object-contain shrink-0" />
                                <span>The <span className="text-[#0DD180] font-bold">skills</span> to take someone on.</span>
                            </li>
                            <li className="flex items-center gap-3 text-white font-['Recline',sans-serif] text-[15px] sm:text-[18px] md:text-[16px] lg:text-[19px] xl:text-[24px] font-semibold">
                                <img src={starIcon} alt="" className="w-4 h-4 lg:w-5 lg:h-5 object-contain shrink-0" />
                                <span>The <span className="text-[#0DD180] font-bold">flair</span> to try something unexpected.</span>
                            </li>
                            <li className="flex items-center gap-3 text-white font-['Recline',sans-serif] text-[15px] sm:text-[18px] md:text-[16px] lg:text-[19px] xl:text-[24px] font-semibold">
                                <img src={starIcon} alt="" className="w-4 h-4 lg:w-5 lg:h-5 object-contain shrink-0" />
                                <span>The <span className="text-[#0DD180] font-bold">creativity</span> to see another way.</span>
                            </li>
                        </ul>

                        {/* Paragraph Copy */}
                        <div className="space-y-3 lg:space-y-4 pt-2 lg:pt-3 font-['Poppins',sans-serif] text-white font-normal text-[13px] sm:text-[15px] md:text-[14px] lg:text-[18px] leading-relaxed md:max-w-xl">
                            <p>
                                The freedom to make their own decisions. And the joy <br className='hidden md:block' />
                                that makes children fall in love with football.
                            </p>
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
