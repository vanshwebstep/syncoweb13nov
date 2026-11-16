import React from 'react';
import { Container } from '../../../components/common/Container';
import imgSkills from 'https://webstepdev.com/demo/syncoWebsiteImages/skills-image.png';
import BgMaster from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/GreatCoachesbg.png';
import BgMasterMobile from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/GreatCoachesbg-mobile.png';
import yellowVector from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/yellowvector.png';

export function GreatCoaches() {
    return (
        <section className="pt-8 pb-24 sm:py-16 lg:py-8 xl:pb-[4rem] bg-white relative overflow-hidden font-sans">
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

                    {/* Top on Mobile / Left on Desktop: Tilted Images Illustration */}
                    <div className="md:col-span-5 lg:col-span-5 flex items-center justify-center">
                        <div className="w-full max-w-[280px] sm:max-w-[340px] md:max-w-[360px] lg:max-w-[420px] xl:max-w-[460px] mx-auto md:mx-0">
                            <img
                                src={imgSkills}
                                alt="Samba Coaches"
                                className="w-full h-auto object-contain drop-shadow-2xl"
                            />
                        </div>
                    </div>

                    {/* Bottom on Mobile / Right on Desktop: Text */}
                    <div className="md:col-span-7 lg:col-span-7 space-y-3.5 lg:space-y-5">
                        <h2 className="text-[34px] sm:text-[40px] md:text-[34px] min-[900px]:text-[42px] lg:text-[50px] xl:text-[66px] 2xl:text-[74px] recline font-extrabold leading-[1.1] md:leading-[1.05] lg:leading-[1.0] xl:leading-[0.9] text-[#042C89]">
                            <span>Great skills</span>
                            <span className="hidden md:inline"> need</span>
                            <br className="hidden md:block" />
                            <span className="md:hidden block">
                                need{' '}
                                <span className="font-normal relative inline-block text-[42px] sm:text-[48px] gasoek text-[#0DD180]">
                                    great
                                    <img
                                        className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-3.5 sm:h-4 object-contain pointer-events-none"
                                        src={yellowVector}
                                        alt=""
                                    />
                                </span>
                            </span>
                            <span className="hidden md:inline-block font-normal relative text-[34px] min-[900px]:text-[42px] lg:text-[50px] xl:text-[66px] 2xl:text-[74px] gasoek text-[#0DD180]">
                                great
                                <img
                                    className="absolute -bottom-2 lg:-bottom-3 xl:-bottom-4 left-0 w-full md:h-3.5 lg:h-4 xl:h-5 object-contain pointer-events-none"
                                    src={yellowVector}
                                    alt=""
                                />
                            </span>{' '}
                            <span className="block md:inline">coaches</span>
                        </h2>

                        <p className="poppins font-medium text-[#042C89] text-[14px] sm:text-[15px] md:text-[14px] min-[900px]:text-[15px] lg:text-[16px] xl:text-[16.5px] leading-[22px] md:leading-[24px] lg:leading-[28px] xl:leading-[32px] pt-1 sm:pt-4 max-w-[540px]">
                            Our Samba Star coaches break each move down, help children master the technique, then encourage them to try it for themselves.
                        </p>

                        <div className="flex items-start gap-3 sm:gap-4 md:my-4 ">
                            <div className="w-[3px] sm:w-[4px] bg-[#0DD180] rounded-full self-stretch min-h-[50px] lg:min-h-[58px]"></div>
                            <div className="space-y-1 sm:space-y-1">
                                <p className="text-[#042C89] font-bold recline text-[15px] sm:text-[16px] md:text-[15px] min-[900px]:text-[17px] lg:text-[18px] xl:text-[20px] leading-tight">They teach.</p>
                                <p className="text-[#042C89] font-bold recline text-[15px] sm:text-[16px] md:text-[15px] min-[900px]:text-[17px] lg:text-[18px] xl:text-[20px] leading-tight">They challenge.</p>
                                <p className="text-[#042C89] font-bold recline text-[15px] sm:text-[16px] md:text-[15px] min-[900px]:text-[17px] lg:text-[18px] xl:text-[20px] leading-tight">They inspire.</p>
                            </div>
                        </div>

                        <p className="text-[#00A6E3] font-semibold recline text-[16px] sm:text-[18px] md:text-[16px] min-[900px]:text-[18px] lg:text-[19px] xl:text-[20px] pt-1">
                            And yes, occasionally they dance too.
                        </p>
                    </div>

                </div>
            </Container>
        </section>
    );
}
export default GreatCoaches;