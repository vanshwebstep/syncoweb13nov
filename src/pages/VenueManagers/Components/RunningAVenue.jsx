import React from 'react';
import { Container } from '../../../components/common/Container';
import textureBg from 'https://webstepdev.com/demo/syncoWebsiteImages/skill-tracker.png';

import handsLeft from 'https://webstepdev.com/demo/syncoWebsiteImages/venueManager/img_1.png';
import handsRight from 'https://webstepdev.com/demo/syncoWebsiteImages/venueManager/img_2.png';
import layer from 'https://webstepdev.com/demo/syncoWebsiteImages/venueManager/layer.png';
import handsLeftmb from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/hands_1_mobile.png';
import handsRightmb from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/hands_2_mobile.png';

export function RunningAVenue() {
    return (
        <section
            className="py-12 sm:py-16 md:py-20  bg-[#f8fafc] text-slate-800 relative overflow-hidden font-sans"
            style={{
                backgroundImage: `url(${textureBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <Container className="relative z-10">
                <div className="flex flex-col md:flex-row gap-6 md:gap-3 lg:gap-4 xl:gap-6 items-center justify-between mx-auto">

                    {/* Left Column: Curved Blob Photos */}
                    <div className="w-full max-w-[240px] sm:max-w-[260px] md:max-w-[160px] min-[900px]:max-w-[190px] lg:max-w-[220px] xl:max-w-[260px] 2xl:max-w-[300px] flex justify-center shrink-0">
                        <img
                            src={handsLeft}
                            alt="Kids celebrating with trophy"
                            className="w-full hidden md:block h-auto object-contain drop-shadow-xl"
                        />
                        <img
                            src={handsLeftmb}
                            alt="Kids celebrating with trophy"
                            className="w-full block md:hidden h-auto object-contain drop-shadow-xl"
                        />
                    </div>

                    {/* Center Column: Header Title & Copy */}
                    <div className="w-full flex-1 max-w-[560px] md:max-w-[380px] min-[900px]:max-w-[440px] lg:max-w-[480px] xl:max-w-[580px] 2xl:max-w-[660px] text-center space-y-4 sm:space-y-5 px-1 sm:px-2">

                        {/* Header Title */}
                        <div>
                            <h2 className="gasoek text-[24px] sm:text-[30px] md:text-[26px] min-[900px]:text-[30px] lg:text-[32px] xl:text-[38px] 2xl:text-[45px] leading-[1.15] md:leading-[1.08] uppercase">
                                <span className="block text-[#0DD180]">
                                    YOU&apos;RE NOT JUST
                                </span>
                                <span className="block text-[#0DD180]">
                                    RUNNING A VENUE.
                                </span>
                            </h2>

                            {/* Wavy Cyan Divider */}
                            <div className="flex justify-center my-2 sm:my-2.5">
                             <img src={layer} alt="" className='w-12 sm:w-14 md:w-12 lg:w-16' />
                            </div>

                            <h3 className="gasoek text-[24px] sm:text-[30px] md:text-[26px] min-[900px]:text-[30px] lg:text-[32px] xl:text-[38px] 2xl:text-[45px] leading-[1.15] md:leading-[1.08] uppercase">
                                <span className="block text-[#00A6E3]">
                                    YOU&apos;RE BRINGING THE MISSION TO LIFE.
                                </span>
                            </h3>
                        </div>

                        {/* Paragraph Copy */}
                        <div className="space-y-2.5 sm:space-y-3.5 pt-1 sm:pt-2">
                            <p className="text-[#042C89] poppins font-medium text-[12.5px] sm:text-[14px] md:text-[13px] min-[900px]:text-[14px] lg:text-[14px] xl:text-[17px] 2xl:text-[20px] leading-[1.6] mx-auto">
                                We&apos;re on a mission to bring back the skill, flair, creativity, freedom and fun that made us fall in love with football.
                            </p>

                            <p className="text-[#042C89] poppins font-medium text-[12.5px] sm:text-[14px] md:text-[13px] min-[900px]:text-[14px] lg:text-[14px] xl:text-[17px] 2xl:text-[20px] leading-[1.6] mx-auto">
                                As a Venue Manager, you&apos;re the person who makes sure Samba feels like Samba. The coaches. The energy. The families. The standards. The whole experience.
                            </p>

                            <p className="text-[#042C89] poppins font-bold text-[13.5px] sm:text-[15px] md:text-[14px] min-[900px]:text-[15px] lg:text-[15px] xl:text-[18px] 2xl:text-[20px] leading-[1.5] pt-1">
                                You make the mission real.
                            </p>
                        </div>

                    </div>

                    {/* Right Column: Curved Blob Photos */}
                    <div className="w-full max-w-[240px] sm:max-w-[260px] md:max-w-[160px] min-[900px]:max-w-[190px] lg:max-w-[220px] xl:max-w-[260px] 2xl:max-w-[310px] flex justify-center mt-4 sm:mt-6 md:mt-0 shrink-0">
                        <img
                            src={handsRight}
                            alt="Student tracking progress"
                            className="w-full hidden md:block h-auto object-contain drop-shadow-xl"
                        />
                        <img
                            src={handsRightmb}
                            alt="Student tracking progress"
                            className="w-full block md:hidden h-auto object-contain drop-shadow-xl"
                        />
                    </div>

                </div>
            </Container>
        </section>
    );
}
export default RunningAVenue;
