import React from 'react';
import { Container } from '../../../components/common/Container';
import texture1 from 'https://webstepdev.com/demo/syncoWebsiteImages/skill-tracker.png';
import diffWay from 'https://webstepdev.com/demo/syncoWebsiteImages/why-samba/diff_way.png';
import diffWayMobile from 'https://webstepdev.com/demo/syncoWebsiteImages/why-samba/diff_way_mobile.png';
import vector from 'https://webstepdev.com/demo/syncoWebsiteImages/why-samba/yellowdiff.png';

export function DiffrentWay() {
    return (
        <section className="md:pt-10 pt-20  md:min-h-0  lg:py-12 text-slate-800 relative overflow-hidden   font-sans">
            {/* Mobile background image */}

            {/* Desktop background image */}
            <img
                src={texture1}
                alt=""
                aria-hidden="true"
                className=" absolute inset-0 left-0 w-full h-full object-cover object-left pointer-events-none z-0"
            />
            <div className="hidden md:block mb-8 max-w-sm mx-auto">
                <img
                    src={diffWay}
                    alt="Brazilian football culture"
                    className="w-[360px] lg:w-[460px] xl:w-[650px] 2xl:w-[760px] h-auto object-contain absolute top-0 md:top-6 lg:top-0 left-0 pointer-events-none"
                />
            </div>

            <Container className="relative z-10">
                {/* Desktop illustration */}

                <div className="diff-way-grid grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-center">
                    {/* Left spacer on desktop: leaves room for the kids & parrot baked into difwaybg */}
                    <div className="diff-way-spacer hidden md:block md:col-span-5 lg:col-span-6 xl:col-span-6" />

                    {/* Right column: Heading, Story Copy, Quote & Signature */}
                    <div className="diff-way-text md:col-span-7 lg:col-span-6 xl:col-span-6 max-w-[620px] space-y-3.5 sm:space-y-5">
                        {/* Heading */}
                        <div className="flex flex-wrap text-center md:text-start md:justify-start justify-center items-baseline gap-3">
                            <h2 className="font-['Recline',sans-serif] font-bold text-[38px] md:text-[38px] lg:text-[52px] xl:text-[74px] text-[#042C89] leading-tight md:leading-[1.1] ">
                                A different
                            </h2>
                            <span className="font-['Gasoek_One',sans-serif] text-[40px] md:text-[40px] lg:text-[50px] xl:text-[70px] text-[#0DD180] leading-none relative inline-block">
                                way
                                <img
                                    src={vector}
                                    alt=""
                                    className="absolute bottom-[-18px] lg:bottom-[-24px] xl:bottom-[-30px] left-0 w-full h-auto object-contain pointer-events-none"
                                />
                            </span>
                        </div>

                        {/* Story Paragraphs */}
                        <div className="space-y-3 sm:space-y-6 font-['Poppins',sans-serif] text-[#042C89] font-medium text-[13px] md:text-[13.5px] lg:text-[18px] leading-relaxed pt-3 md:pt-2">
                            <p className="font-medium text-[#042C89]">
                                So in 2009, I went to Brazil looking for a different way.
                            </p>

                            <p className="font-medium text-[#042C89]">
                                I wanted to understand why Brazilian football produced so many skilful, creative players who played with such freedom.
                            </p>

                            <p className="font-medium text-[#042C89]">
                                What I discovered was <strong className="font-bold text-[#042C89]">ginga</strong>. More than a style of football, it was a way of life. Samba. Music. Happiness. Connection. Soul. All the ingredients that make football feel exciting, expressive and free.
                            </p>

                            <p className="font-semibold text-[#042C89]">
                                It was everything I felt the game back home was losing.
                            </p>

                            <p className="font-medium text-[#042C89]">
                                I travelled across Brazil, immersed myself in its football culture and eventually made my way to Rio.
                            </p>

                            <p className="font-medium recline text-[16px] md:text-[17px] lg:text-[20px] text-[#042C89]">
                                This was my <span className="text-[#00A6E3] font-bold">Road to Rio</span>.
                            </p>

                            {/* Green Border Highlight Quote Block */}
                            <div className="border-l-[4px] border-[#0DD180] pl-3.5 sm:pl-3 my-3">
                                <p className="font-medium text-[#042C89] text-[13.5px] md:text-[14px] lg:text-[18px] leading-snug">
                                    And I came home with a clear mission: to bring some of that Brazilian skill, flair and creativity into the English game.
                                </p>
                            </div>

                            {/* Cyan Punchline */}
                            <p className="text-[#00A6E3] font-bold recline text-[16px] sm:text-[18px] lg:text-[20px] pt-1">
                                To bring back the beautiful game.
                            </p>

                            {/* Signature / Author */}
                            <div className="">
                                <p className="font-bold recline text-[#042C89] text-[16px] md:text-[17px] lg:text-[20px] leading-snug">
                                    Coach Nilio
                                </p>
                                <p className="text-[#042C89] text-[12px] md:text-[13px] lg:text-[14px] font-medium leading-normal">
                                    Founder of Samba Soccer Schools
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            <div className="md:hidden block pt-8 max-w-sm mx-auto">
                <img
                    src={diffWayMobile}
                    alt="Brazilian football culture"
                    className="2xl:w-[760px] xl:w-[650px] lg:w-[650px] h-auto object-contain pointer-events-none"
                />
            </div>
        </section>
    );
}

export default DiffrentWay;





