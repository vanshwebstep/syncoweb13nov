import React from 'react';
import { Container } from '../../../components/common/Container';
import imgPitch from 'https://webstepdev.com/demo/syncoWebsiteImages/card1.png';
import imgSambaMusic from 'https://webstepdev.com/demo/syncoWebsiteImages/feature-samba-music.png';
import imgSkillsBall from 'https://webstepdev.com/demo/syncoWebsiteImages/card3.png';
import imgRoadToRio from 'https://webstepdev.com/demo/syncoWebsiteImages/Frame 1000004801.png';
import imgSkillsTracker from 'https://webstepdev.com/demo/syncoWebsiteImages/feature-skills-tracker.png';
import imgVenueManager from 'https://webstepdev.com/demo/syncoWebsiteImages/feature-venue-manager.png';
import vector from 'https://webstepdev.com/demo/syncoWebsiteImages/why-samba/yellowdiff.png';
import sambaWay from 'https://webstepdev.com/demo/syncoWebsiteImages/why-samba/samba_way_mobile.png';
import textureMask from 'https://webstepdev.com/demo/syncoWebsiteImages/skill-tracker.png';

export function SambaWay() {
    const ingredients = [
        {
            title: "Ball mastery",
            desc: "More touches. More technique. More ways to use the ball.",
            img: imgPitch,
            bgAccent: "bg-[#FFDE14]",
            rotation: "-rotate-[2deg]"
        },
        {
            title: "Samba Music",
            desc: "Energy and Brazilian spirit from the moment they arrive.",
            img: imgSambaMusic,
            bgAccent: "bg-[#0DD180]",
            rotation: "rotate-[2deg]"
        },
        {
            title: "Samba Skills Ball",
            desc: "Smaller. Weighted. More touches. Better control.",
            img: imgSkillsBall,
            bgAccent: "bg-[#FFDE14]",
            rotation: "-rotate-[2deg]"
        },
        {
            title: "Road to Rio",
            desc: "New skills, heroes and challenges across a year-long adventure.",
            img: imgRoadToRio,
            bgAccent: "bg-[#0DD180]",
            rotation: "rotate-[2deg]"
        },
        {
            title: "Skills Tracker",
            desc: "Skills learned. Progress tracked. Badges earned.",
            img: imgSkillsTracker,
            bgAccent: "bg-[#FFDE14]",
            rotation: "-rotate-[2deg]"
        },
        {
            title: "Venue Manager",
            desc: "Every session supported. Every coach accountable. Every week.",
            img: imgVenueManager,
            bgAccent: "bg-[#0DD180]",
            rotation: "rotate-[2deg]"
        }
    ];

    return (
        <section style={{
            backgroundImage: `url(${textureMask})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
        }} className="py-16 relative px-2 md:px-0  overflow-hidden font-sans">
            {/* Subtle background leopard texture overlay */}

            <Container className="relative z-10 ">
                {/* Header Title & Subtitle */}
                <div className=" mx-auto md:text-center block md:hidden space-y-4 mb-14">
                    <img
                        className="w-full mb-10"
                        src={sambaWay}
                        alt=""
                    />
                    <h2 className="md:text-center font-['Gasoek_One',sans-serif] text-[58px] md:text-[64px] md:leading-tight leading-[60px]">
                        <span className="text-[#042C89]">The Samba </span>
                        <span className="text-[#0DD180] relative inline-block">
                            Way
                            <img
                                className="  w-[120px] mt-2 h-5 pointer-events-none"
                                src={vector}
                                alt=""
                            />
                        </span>
                    </h2>

                    <div className="font-['Poppins',sans-serif] text-[#042C89] font-medium text-[18px] sm:text-[20px] leading-[28px]  md:space-y-1 space-y-5">
                        <p>We took what we learned in Brazil and built it into the way we coach.</p>
                        <p>Six ingredients designed to develop skill, encourage creativity and keep children loving football.</p>
                    </div>
                </div>

                {/* 6 Ingredient Cards Grid (3 cols x 2 rows) */}
                <div className="grid grid-cols-1 md:grid-cols-2 pt-6 lg:grid-cols-3 gap-6  mx-auto">
                    {ingredients.map((item, idx) => (
                        <div key={idx} className="relative group flex h-full">
                            {/* Rotated background accent card */}
                            <div
                                className={`absolute inset-0 rounded-[28px] ${item.bgAccent} ${item.rotation} transform transition-transform duration-300 group-hover:scale-105 z-0`}
                            />

                            {/* White main card */}
                            <div className="bg-white w-[95%] m-auto  rounded-[28px] p-[18px] shadow-[0_8px_24px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all duration-300 relative z-10 flex flex-col justify-between min-h-[190px]">
                                {/* Icon */}
                                <div className="h-14 flex items-center justify-start mb-3">
                                    <img
                                        src={item.img}
                                        alt={item.title}
                                        className="h-12 w-auto max-w-[65px] object-contain transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>

                                {/* Text */}
                                <div className="space-y-2">
                                    <h3 className="font-['Poppins',sans-serif] font-black text-[24px] text-[#0DD180] leading-snug">
                                        {item.title}
                                    </h3>
                                    <p className="font-['Poppins',sans-serif] font-medium text-[16px] text-[#475569] leading-[24px]">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}

export default SambaWay;