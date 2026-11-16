import React from 'react';
import { Container } from '../../../components/common/Container';
import textureBg from 'https://webstepdev.com/demo/syncoWebsiteImages/skill-tracker.png';

import handsLeft from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/hands_1.png';
import handsRight from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/hands_2.png';
import handsLeftmb from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/hands_1_mobile.png';
import handsRightmb from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/hands_2_mobile.png';
import greenchek from "https://webstepdev.com/demo/syncoWebsiteImages/programs/greenchek.png"
export function RoadToRioHandsSection() {
    return (
        <section
            className="md:py-16 py-14 bg-[#f8fafc] text-slate-800 relative overflow-hidden font-sans"
            style={{
                backgroundImage: `url(${textureBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundBlendMode: 'multiply'
            }}
        >

            <Container className="relative z-10">
                <div className="flex flex-col md:flex-row gap-3 lg:gap-4 items-center justify-between mx-auto">

                    {/* Left Column: Curved Blob Photos */}
                    <div className="w-full md:w-[22%] lg:w-[24%] max-w-[200px] sm:max-w-[240px] md:max-w-[170px] min-[900px]:max-w-[190px] lg:max-w-[230px] xl:max-w-[280px] 2xl:max-w-[340px] flex justify-center">
                        <img
                            src={handsLeft}
                            alt="Kids celebrating with trophy and tracker"
                            className="w-full hidden md:block h-auto object-contain drop-shadow-xl"
                        />
                        <img
                            src={handsLeftmb}
                            alt="Kids celebrating with trophy and tracker"
                            className="w-full block md:hidden h-auto object-contain drop-shadow-xl"
                        />
                    </div>

                    {/* Center Column: Header Title, Copy & Button */}
                    <div className="w-full md:w-[56%] lg:w-[52%] max-w-[560px] md:text-center space-y-3 lg:space-y-4">

                        {/* Header Title */}
                        <div>
                            <h2 className="recline font-extrabold text-[30px] sm:text-[34px] md:text-[30px] min-[900px]:text-[36px] lg:text-[44px] xl:text-[54px] 2xl:text-[61px] text-[#042C89] leading-[1.1]">
                                Their {' '}
                                <span className="gasoek text-[30px] sm:text-[34px] md:text-[30px] min-[900px]:text-[36px] lg:text-[44px] xl:text-[54px] 2xl:text-[61px] text-[#0DD180] font-normal inline-block">
                                    Road to Rio.
                                </span>
                            </h2>

                            <h3 className="recline font-extrabold text-[30px] sm:text-[34px] md:text-[30px] min-[900px]:text-[36px] lg:text-[44px] xl:text-[54px] 2xl:text-[61px] text-[#042C89] leading-tight md:mt-1">
                                In their{' '}
                                <span className="gasoek text-[30px] sm:text-[34px] md:text-[30px] min-[900px]:text-[36px] lg:text-[44px] xl:text-[54px] 2xl:text-[61px] text-[#00A6E3] font-normal inline-block">
                                    hands.
                                </span>
                            </h3>
                        </div>

                        {/* Paragraph Copy */}
                        <p className="text-[#475569] poppins font-semibold text-[14px] sm:text-[15px] md:text-[13px] min-[900px]:text-[14.5px] lg:text-[17px] xl:text-[19px] 2xl:text-[20px] leading-[22px] lg:leading-[25px] mx-auto pt-1 lg:pt-2">
                            Every child gets their own Samba Skills Tracker, turning their progress into something they can see, collect and take home.
                        </p>

                        {/* Open A Sample Tracker Button */}
                        <ul className='w-full md:max-w-fit mx-auto pt-2.5 sm:pt-3 lg:pt-5 space-y-1'>
                            <li className="flex items-center text-[13.5px] sm:text-[15px] md:text-[13px] min-[900px]:text-[14px] lg:text-[16px] xl:text-[19px] 2xl:text-[20px] text-[#475569] font-semibold gap-[5px]">
                                <img src={greenchek} alt="" className="max-w-[16px] lg:max-w-[20px]" />
                                Skill Learnt
                            </li>
                            <li className="flex items-center text-[13.5px] sm:text-[15px] md:text-[13px] min-[900px]:text-[14px] lg:text-[16px] xl:text-[19px] 2xl:text-[20px] text-[#475569] font-semibold gap-[5px]">
                                <img src={greenchek} alt="" className="max-w-[16px] lg:max-w-[20px]" />
                                Star Added
                            </li>
                            <li className="flex items-center text-[13.5px] sm:text-[15px] md:text-[13px] min-[900px]:text-[14px] lg:text-[16px] xl:text-[19px] 2xl:text-[20px] text-[#475569] font-semibold gap-[5px]">
                                <img src={greenchek} alt="" className="max-w-[16px] lg:max-w-[20px]" />
                                Player Badge Collect
                            </li>
                            <li className="flex items-center text-[13.5px] sm:text-[15px] md:text-[13px] min-[900px]:text-[14px] lg:text-[16px] xl:text-[19px] 2xl:text-[20px] text-[#475569] font-semibold gap-[5px] ">
                                Next city….here we come!
                            </li>
                        </ul>
                        <p className="text-[#042C89] poppins font-semibold text-center md:text-center text-[13.5px] sm:text-[14px] md:text-[13px] min-[900px]:text-[14px] lg:text-[15px] xl:text-[16px] leading-[22px] lg:leading-[25px] md:mx-auto pt-1 lg:pt-2">
                            Scan a QR tutorial. Practise at home.
                        </p>

                        <div className="pt-0 md:block flex justify-center">
                            <button
                                onClick={() => window.open('#', '_blank')}
                                className="bg-[#042C89] hover:bg-[#03183d] text-white font-bold text-[13px] sm:text-[14px] md:text-[13px] min-[900px]:text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px] px-6 lg:px-8 py-3.5 md:py-3 lg:py-4 xl:py-5 rounded-[50px] shadow-xl transition-all cursor-pointer inline-block tracking-wider"
                            >
                                Open A Sample Tracker
                            </button>
                        </div>

                    </div>

                    {/* Right Column: Curved Blob Photos */}
                    <div className="w-full md:w-[22%] lg:w-[24%] max-w-[200px] sm:max-w-[240px] md:max-w-[170px] min-[900px]:max-w-[190px] lg:max-w-[230px] xl:max-w-[280px] 2xl:max-w-[340px] flex justify-center mt-6 md:mt-0">
                        <img
                            src={handsRight}
                            alt="Student tracking progress with stickers"
                            className="w-full hidden md:block h-auto object-contain drop-shadow-xl"
                        />
                        <img
                            src={handsRightmb}
                            alt="Student tracking progress with stickers"
                            className="w-full block md:hidden h-auto object-contain drop-shadow-xl"
                        />
                    </div>

                </div>
            </Container>
        </section>
    );
}
export default RoadToRioHandsSection;
