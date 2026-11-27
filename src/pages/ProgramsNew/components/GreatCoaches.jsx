import React from 'react';
import { Container } from '../../../components/common/Container';
import imgSkills from 'https://webstepdev.com/demo/syncoWebsiteImages/skills-image.png';
import imgSkillsMobile from 'https://webstepdev.com/demo/syncoWebsiteImages/roadtorio/skills-image-mobile.png';
import BgMaster from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/GreatCoachesbg.png';
import BgMasterMobile from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/GreatCoachesbg-mobile.png';
import yellowVector from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/yellowvector.png';

export function GreatCoaches() {
    return (
        <section className="pt-0 pb-24 sm:py-16 lg:py-8 xl:pb-[4rem] bg-white relative overflow-hidden font-sans">
            {/* Mobile background image */}
            <img
                src={BgMasterMobile}
                alt=""
                aria-hidden="true"
                className="block md:hidden absolute inset-0 w-full h-full object-fill pointer-events-none z-0"
            />

            {/* Desktop background image */}
            <img
                src={BgMaster}
                alt=""
                aria-hidden="true"
                className="hidden md:block absolute inset-0 w-full h-full object-cover object-center pointer-events-none z-0"
            />

            <Container className="relative z-10 px-6 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-12 items-center">

                    {/* Images */}
                    <div className="md:col-span-5 lg:col-span-5 flex items-center justify-center">
                        <div className="block md:hidden -mx-6 w-[calc(100%+3rem)]">
                            <img
                                src={imgSkillsMobile}
                                alt="Samba Coaches"
                                className="w-full h-auto object-contain"
                            />
                        </div>

                        <div className="hidden md:block w-full max-w-[360px] lg:max-w-[420px] xl:max-w-[460px] mx-auto md:mx-0">
                            <img
                                src={imgSkills}
                                alt="Samba Coaches"
                                className="w-full h-auto object-contain drop-shadow-2xl"
                            />
                        </div>
                    </div>

                    {/* Text */}
                    <div className="md:col-span-7 lg:col-span-7 space-y-3.5 lg:space-y-5">
                        <h2 className="recline font-extrabold text-[#042C89] text-[35.18px] md:text-[34px] min-[900px]:text-[42px] lg:text-[48px] xl:text-[51.93px] leading-[1.1] md:leading-[1.05] xl:leading-[1.05]">
                            <span>Great skills need</span>
                            <br className="block" />
                            <span className="font-normal relative inline-block gasoek text-[#0DD180] mt-1 md:mt-0 text-[43.97px] md:text-[40px] min-[900px]:text-[50px] lg:text-[57px] xl:text-[61.38px] leading-[1.1]">
                                great coaches.
                                <img
                                    className="absolute -bottom-1 md:-bottom-2 left-0 w-full h-3.5 md:h-3.5 lg:h-4 xl:h-[18px] object-fill pointer-events-none"
                                    src={yellowVector}
                                    alt=""
                                />
                            </span>
                        </h2>

                        <p className="poppins font-medium text-[#34353B] text-[18px] md:text-[14px] min-[900px]:text-[16px] lg:text-[18px] xl:text-[20.6px] leading-[28px] md:leading-[24px] lg:leading-[28px] xl:leading-[32px] pt-1 sm:pt-4 max-w-[560px]">
                            Our Samba Star coaches break each move down, help children master the technique, then encourage them to try it for themselves.
                        </p>

                        {/* Pills */}
                        <div className="flex flex-wrap items-center gap-3 md:gap-4 md:my-4">
                            <span className="poppins font-semibold rounded-full px-6 py-4 bg-[#0DD180] text-[#042C89] text-[14px] md:text-[13px] min-[900px]:text-[14px] lg:text-[15px] xl:text-[16.52px] leading-none">
                                They teach
                            </span>
                            <span className="poppins font-semibold rounded-full px-6 py-4 bg-[#00A6E3] text-white text-[14px] md:text-[13px] min-[900px]:text-[14px] lg:text-[15px] xl:text-[16.52px] leading-none">
                                They challenge
                            </span>
                            <span className="poppins font-semibold rounded-full px-6 py-4 bg-[#FFDE14] text-[#042C89] text-[14px] md:text-[13px] min-[900px]:text-[14px] lg:text-[15px] xl:text-[16.52px] leading-none">
                                They inspire
                            </span>
                        </div>

                        <p className="text-[#00A6E3] font-semibold recline text-[25px] md:text-[16px] min-[900px]:text-[19px] lg:text-[21px] xl:text-[23.61px] leading-[1.2] pt-1">
                            And yes, occasionally they dance too.
                        </p>
                    </div>

                </div>
            </Container>
        </section>
    );
}
export default GreatCoaches;