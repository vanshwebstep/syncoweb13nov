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

const Chevron = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C9D3F0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m9 6 6 6-6 6" />
    </svg>
);

const Pill = ({ icon, children, className = "" }) => (
    <span className={`poppins inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-2 text-[13px] font-semibold leading-none text-[#C9D3F0] ${className}`}>
        <img src={icon} alt="" className="h-[13px] w-[13px] object-contain" />
        {children}
    </span>
);

const Herobanner = ({
    breadcrumbLabel = "Legal",
    title1 = "",
    title2 = "",
    subtitle = "",
    lastUpdated = "",
    version = "",
    readTime = "",
    eyebrow = "",
    loading = false,
}) => {
    const formattedLastUpdated = lastUpdated
        ? lastUpdated.toLowerCase().startsWith("last updated")
            ? lastUpdated
            : `Last updated: ${lastUpdated}`
        : "";

    const displayBreadcrumb = breadcrumbLabel || `${title1} ${title2}`.replace(/\.$/, "").trim() || "Legal";

    return (
        <>
            {/* ========================================================================= */}
            {/* 1. PRINT-ONLY OFFICIAL LEGAL HEADER (Clean, white background, no clutter) */}
            {/* ========================================================================= */}
            <div className="hidden print:block w-full pt-2 pb-4 mb-4 border-b-2 border-[#042C89] bg-white font-sans">
                {/* Brand & Organization Top Row */}
                <div className="flex justify-between items-start pb-3 mb-3 border-b border-gray-200">
                    <div>
                        <h1 className="text-[20pt] font-black text-[#042C89] tracking-wider uppercase font-sans leading-none m-0">
                            SAMBA SOCCER SCHOOLS
                        </h1>
                        <span className="block text-[8.5pt] text-gray-500 font-semibold tracking-wider uppercase mt-1">
                            Official Legal Documentation
                        </span>
                    </div>
                    <div className="text-right text-[8.5pt] text-gray-600 leading-tight">
                        <span className="font-bold text-[#042C89] block text-[10pt]">{displayBreadcrumb}</span>
                        <span>sambasoccerschools.com</span>
                        <span className="block text-gray-400">Tel: 020 7205 2723</span>
                    </div>
                </div>

                {/* Document Title & Subtitle */}
                <div className="pt-1">
                    {eyebrow && (
                        <span className="inline-block text-[8pt] font-bold uppercase tracking-wider text-[#067A4B] bg-[#E8F8F1] border border-[#0DD180] px-2 py-0.5 rounded mb-1.5">
                            {eyebrow}
                        </span>
                    )}
                    <h2 className="text-[22pt] font-black text-[#042C89] tracking-tight leading-tight m-0 font-sans">
                        {title1} {title2}
                    </h2>
                    {subtitle && (
                        <p className="text-[10pt] text-gray-600 mt-1.5 leading-normal max-w-3xl">
                            {subtitle}
                        </p>
                    )}

                    {/* Metadata Line */}
                    <div className="flex items-center gap-5 text-[8.5pt] text-gray-600 mt-3 pt-2 border-t border-gray-100 font-medium">
                        {formattedLastUpdated && (
                            <span>
                                <strong className="text-gray-900 font-semibold">Last Updated:</strong>{" "}
                                {formattedLastUpdated.replace(/^last updated:\s*/i, "")}
                            </span>
                        )}
                        {version && (
                            <span>
                                <strong className="text-gray-900 font-semibold">Version:</strong> {version}
                            </span>
                        )}
                        <span>
                            <strong className="text-gray-900 font-semibold">Jurisdiction:</strong> England &amp; Wales
                        </span>
                    </div>
                </div>
            </div>

            {/* ========================================================================= */}
            {/* 2. WEB SCREEN HERO (Unchanged on web, but 100% hidden in print / PDF)     */}
            {/* ========================================================================= */}
            <section
                className="relative isolate w-full overflow-hidden bg-cover bg-bottom bg-no-repeat pt-10 pb-28 sm:pt-12 sm:pb-32 md:pt-14 md:pb-36 lg:pt-16 lg:pb-40 print:hidden"
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
                        <span className="hover:text-white transition">Legal</span>
                        <Chevron />
                        <span className="text-white">{displayBreadcrumb}</span>
                    </nav>

                    {/* EYEBROW */}
                    {eyebrow && (
                        <div className="mb-3">
                            <span className="poppins inline-block rounded-full bg-white/10 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#0DD180]">
                                {eyebrow}
                            </span>
                        </div>
                    )}

                    {/* HEADING */}
                    <h1 className="recline font-bold text-white leading-[1.1]">
                        {title1 && <span className="block text-[36px] sm:text-[42px] md:text-[50px]">{title1}</span>}

                        {title2 && (
                            <span
                                className="gasoek font-normal relative mt-1 inline-block text-[44px] sm:text-[52px] md:text-[64px] text-[#FFDE14]"
                                style={{ textShadow: "2px 2px 0 #042C89, -1px -1px 0 #042C89, 1px -1px 0 #042C89, -1px 1px 0 #042C89" }}
                            >
                                {title2}
                                <img
                                    src={WHITE_LINE}
                                    alt=""
                                    className="pointer-events-none absolute left-0 -bottom-0 w-full h-auto"
                                />
                            </span>
                        )}
                    </h1>

                    {/* DESCRIPTION */}
                    {loading && !subtitle ? (
                        <div className="mt-8 max-w-[640px] space-y-2 animate-pulse">
                            <div className="h-4 w-3/4 rounded bg-white/20" />
                            <div className="h-4 w-1/2 rounded bg-white/20" />
                        </div>
                    ) : subtitle ? (
                        <p className="poppins mt-8 max-w-[640px] text-[15px] sm:text-[17px] leading-[1.5] text-white">
                            {subtitle}
                        </p>
                    ) : null}

                    {/* META PILLS */}
                    {loading && !formattedLastUpdated && !version ? (
                        <div className="mt-4 flex flex-wrap items-center gap-3 animate-pulse">
                            <div className="h-7 w-40 rounded-full bg-white/15" />
                            <div className="h-7 w-24 rounded-full bg-white/15" />
                        </div>
                    ) : (
                        <div className="mt-4 flex flex-wrap items-center gap-3">
                            {formattedLastUpdated && <Pill icon={ICON_CAL}>{formattedLastUpdated}</Pill>}
                            {version ? (
                                <Pill icon={ICON_CLOCK}>{version}</Pill>
                            ) : readTime ? (
                                <Pill icon={ICON_CLOCK}>{readTime}</Pill>
                            ) : null}
                        </div>
                    )}
                </Container>
            </section>
        </>
    );
};

export default Herobanner;
