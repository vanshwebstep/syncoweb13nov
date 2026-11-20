import React from 'react';
import { Container } from '../../../components/common/Container';
import textureBg from 'https://webstepdev.com/demo/syncoWebsiteImages/texture.png';

import imgLearn from 'https://webstepdev.com/demo/syncoWebsiteImages/tech1.png';
import imgMaster from 'https://webstepdev.com/demo/syncoWebsiteImages/tech2.png';
import imgTest from 'https://webstepdev.com/demo/syncoWebsiteImages/tech3.png';
import imgPlay from 'https://webstepdev.com/demo/syncoWebsiteImages/tech4.png';
import Rocket from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/Rocketicon.png';
import Cross from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/Cancel.png';
export function Everyweek() {
    const cards = [
        {
            title: "LEARN",
            desc: "A new skill every class, broken down step by step by their coach.",
            img: imgLearn,
            topSwooshColor: "#00A6E3",
            bottomSwooshColor: "#FFDE14"
        },
        {
            title: "PRACTICE",
            desc: "Repeat it. Refine it. Keep going until it starts to click.",
            img: imgMaster,
            topSwooshColor: "#FFDE14",
            bottomSwooshColor: "#0DD180"
        },
        {
            title: "MASTER",
            desc: "Add pressure. Make decisions. Try it against another player.",
            img: imgTest,
            topSwooshColor: "#FFDE14",
            bottomSwooshColor: "#0DD180"
        },
        {
            title: "APPLY",
            desc: "Now it's game time. The coach steps back and lets them get creative.",
            img: imgPlay,
            topSwooshColor: "#0DD180",
            bottomSwooshColor: "#FFDE14"
        }
    ];

    return (
        <section
            className="md:py-16 py-16 pb-16 md:pb-16 md:px-0 px-2 text-slate-800 relative overflow-hidden font-sans"
            style={{
                backgroundImage: `url(${textureBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundBlendMode: 'multiply'
            }}
        >
            <Container className="relative z-10">
                <div className="flex md:flex-row flex-col justify-between gap-8 lg:gap-10 xl:gap-12 items-start">

                    {/* Left Column: Heading & Paragraph */}
                    <div className="w-full md:w-[42%] lg:w-[40%] space-y-4 md:space-y-4 lg:space-y-6 md:mt-4 lg:mt-10 xl:mt-16">

                        {/* Header Titles */}
                        <div>
                            <h2 className="recline text-[48px] sm:text-[48px] md:text-[48px] min-[900px]:text-[48px] lg:text-[48px] xl:text-[52px] text-[#042C89] leading-[0.95]">
                                Every week a new {' '}
                                <span className="gasoek md:block text-[48px] sm:text-[48px] md:text-[48px] min-[900px]:text-[44px] lg:text-[50px] xl:text-[56px] font-normal text-[#0DD180] leading-[0.95] mt-1">
                                    skill to master
                                </span>
                            </h2>

                        </div>

                        {/* Paragraph Copy */}

                        <ul className="text-[#042C89] poppins font-semibold text-[15px] sm:text-[16px] md:text-[14px] min-[900px]:text-[16px] lg:text-[18px] xl:text-[20px] leading-relaxed max-w-md pt-1 lg:pt-2">
                            <li className="flex items-center gap-[5px]">
                                <img src={Cross} alt="" className="max-w-[20px]" />
                                No standing around.
                            </li>
                            <li className="flex items-center gap-[5px]" >
                                <img className="max-w-[20px]" src={Cross} alt="" />No endless drills.</li>
                        </ul>
                        <div className="poppins text-[#042C89] font-semibold flex items-center bg-[#0dd1802e] gap-3 lg:gap-4 p-[8px] md:p-[10px] text-[15px] sm:text-[16px] md:text-[13.5px] min-[900px]:text-[16px] lg:text-[18px] xl:text-[20px] rounded-[20px]">
                            <img src={Rocket} className="max-w-[36px] sm:max-w-[40px] lg:max-w-[45px]" alt="" />
                            <span>More touches. <br className="sm:hidden block" /> More learning. <br /> More mastery.</span>
                        </div>
                    </div>

                    {/* Right Column: 4 Skill Progress Cards (2x2 Grid) */}
                    <div className="w-full md:w-[58%] lg:w-[60%]">
                        <div className="grid grid-cols-1 sm:grid-cols-2 max-w-[691px] gap-4 lg:gap-6">
                            {cards.map((card, idx) => (
                                <div
                                    key={idx}
                                    className="bg-[#042C89] rounded-[20px] pb-6  overflow-hidden shadow-2xl text-white relative flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300 group"
                                >
                                    {/* Top Photo Frame Container with Corner Swoosh and Wave Bottom */}
                                    <div className="relative w-full overflow-hidden shrink-0">
                                        <img
                                            src={card.img}
                                            alt={card.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />

                                        {/* Top Right Curved Corner Accent */}
                                        <svg
                                            className="absolute top-0 right-0 w-[10rem] h-[10rem] pointer-events-none z-10"
                                            viewBox="0 0 120 120"
                                            fill="none"
                                        >
                                            <path
                                                d="M 35 0 C 65 15, 95 45, 120 75 L 120 0 Z"
                                                fill={card.topSwooshColor}
                                            />
                                        </svg>


                                    </div>

                                    {/* Card Content Area */}
                                    <div className="px-4 pb-4 lg:px-5 lg:pb-5 xl:px-6 xl:pb-6 pt-1 relative z-10 flex-1 flex flex-col justify-start">
                                        <h3 className="gasoek text-[20px] md:text-[19px] min-[900px]:text-[21px] lg:text-[23px] xl:text-[26px] text-white tracking-wider mb-1.5 md:mb-2 mt-2 lg:mt-3">
                                            {card.title}
                                        </h3>
                                        <p className="text-[14.5px] w-[50%] md:w-full md:text-[11.5px] min-[900px]:text-[12.5px] lg:text-[13px] xl:text-[14px] poppins font-medium text-white leading-relaxed">
                                            {card.desc}
                                        </p>
                                    </div>

                                    {/* Bottom Right Curved Accent Swoosh */}
                                    <svg
                                        className="absolute bottom-0 -right-[1px] w-full h-[130px] sm:h-[140px] pointer-events-none z-0"
                                        viewBox="0 0 340 140"
                                        fill="none"
                                        preserveAspectRatio="none"
                                    >
                                        <path
                                            d="M 140 140 C 220 95, 275 46, 340 46 L 340 140 Z"
                                            fill={card.bottomSwooshColor}
                                        />
                                    </svg>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </Container>
        </section>
    );
}
export default Everyweek;
