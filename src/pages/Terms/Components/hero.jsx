// LegalBanner.jsx
import React from "react";
import { Container } from "../../../components/common/Container";

/* ====== ASSETS ====== */
const BG = "https://webstepdev.com/demo/syncoWebsiteImages/legalpage/hero.png";
const WHITE_LINE = "https://webstepdev.com/demo/syncoWebsiteImages/roadtorio/whiteline.png";
const ICON_CAL = "https://webstepdev.com/demo/syncoWebsiteImages/icons/calyellow.png";
const ICON_CLOCK = "https://webstepdev.com/demo/syncoWebsiteImages/icons/clockyellow.png";
const HOME = "https://webstepdev.com/demo/syncoWebsiteImages/icons/homewhite.png";
/* ==================== */

const HomeIcon = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#C9D3F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 10.5 12 3l9 7.5" />
        <path d="M5 9.5V21h14V9.5" />
    </svg>
);

const Chevron = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C9D3F0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m9 6 6 6-6 6" />
    </svg>
);

const Pill = ({ icon, children }) => (
    <span className="poppins inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-2 text-[13px] font-semibold leading-none text-[#C9D3F0]">
        <img src={icon} alt="" className="h-[13px] w-[13px] object-contain" />
        {children}
    </span>
);

const Herobanner = ({
    title1 = "Terms &",
    title2 = "Conditions.",
    lastUpdated = "4 November 2026",
    readTime = "14 min read",
}) => {
    return (
        <section
            className="relative isolate w-full overflow-hidden bg-cover bg-bottom bg-no-repeat pt-10 pb-28 sm:pt-12 sm:pb-32 md:pt-14 md:pb-36 lg:pt-16 lg:pb-40"
            style={{ backgroundImage: `url(${BG})` }}
        >
            <Container className="relative z-10">
                {/* BREADCRUMB */}
                <nav className="poppins mb-5 flex flex-wrap items-center gap-2 text-[13px] font-semibold text-[#C9D3F0]">
                    <a href="/" className="inline-flex items-center gap-1.5 hover:text-white transition">
                         <img src={HOME} alt="" className="h-[13px] w-[13px] mb-1 object-contain" />
                        Home
                    </a>
                    <Chevron />
                    <a href="#" className="hover:text-white transition">Legal</a>
                    <Chevron />
                    <span className="text-white">Terms &amp; Conditions</span>
                </nav>

                {/* HEADING */}
                <h1 className="recline font-bold text-white leading-[1.1]">
                    <span className="block text-[36px] sm:text-[42px] md:text-[50px]">{title1}</span>

                    <span className="gasoek font-normal relative mt-1 inline-block text-[44px] sm:text-[52px] md:text-[64px] text-[#FFDE14]"
                        style={{ textShadow: "2px 2px 0 #042C89, -1px -1px 0 #042C89, 1px -1px 0 #042C89, -1px 1px 0 #042C89" }}
                    >
                        {title2}
                        <img
                            src={WHITE_LINE}
                            alt=""
                            className="pointer-events-none absolute left-0 -bottom-0 w-full h-auto"
                        />
                    </span>
                </h1>

                {/* DESCRIPTION */}
                <p className="poppins mt-8 max-w-[640px] text-[15px] sm:text-[17px] leading-[1.5] text-white">
                    The agreement between you and Samba when you book a trial, membership, camp or event.
                </p>

                {/* META PILLS */}
                <div className="mt-4 flex flex-wrap items-center gap-3">
                    <Pill icon={ICON_CAL}>Last updated {lastUpdated}</Pill>
                    <Pill icon={ICON_CLOCK}>{readTime}</Pill>
                </div>
            </Container>
        </section>
    );
};

export default Herobanner;