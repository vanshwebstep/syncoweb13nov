// Content.jsx
import React, { useEffect, useState } from "react";
import { Container } from "../../../components/common/Container";

/* ====== ASSETS ====== */
const ASSET = "https://webstepdev.com/demo/syncoWebsiteImages";
const ICON_DOC_SKY = `${ASSET}/icons/docsky.png`;
const ICON_DOC_YELLOW = `${ASSET}/icons/docyellow.png`;
const CTA_BG = `${ASSET}/venues/rectanglebg.png`;
/* ==================== */

const EMAIL = "admin@sambasoccerschools.com";
const PHONE = "020 7205 2723";

const BADGE = [
    "bg-[#0DD180] text-[#042C89]", // green
    "bg-[#00A6E3] text-white",     // blue
    "bg-[#FFDE14] text-[#042C89]", // yellow
    "bg-[#042C89] text-white",     // navy
];

const DEFAULT_LEGAL_LINKS = [
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Safeguarding", href: "/safeguarding" },
    { label: "Accessibility", href: "/accessibility" },
];

const mapSlugToHref = (slug) => {
    switch (slug) {
        case "terms-and-conditions":
            return "/terms";
        case "privacy-policy":
            return "/privacy";
        case "safeguarding-policy":
            return "/safeguarding";
        case "accessibility-statement":
            return "/accessibility";
        default:
            return `/${slug}`;
    }
};

const mapButtonUrl = (url) => {
    if (!url) return "#";
    if (url === "/contact-us") return "/contact";
    return url;
};

/* ====== SMALL PIECES ====== */
const InfoIcon = ({ size = 14 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9.5" />
        <path d="M12 11v5.5" />
        <circle cx="12" cy="7.6" r="0.6" fill="currentColor" />
    </svg>
);

const CheckIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#067A4B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="mt-[5px] shrink-0" aria-hidden="true">
        <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
);

const DownloadIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 4v11" />
        <path d="m7 11 5 5 5-5" />
        <path d="M5 20h14" />
    </svg>
);

const PrintIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M7 9V3h10v6" />
        <rect x="3" y="9" width="18" height="8" rx="2" />
        <path d="M7 14h10v7H7z" />
    </svg>
);

const MailIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3.5 7 8.5 6 8.5-6" />
    </svg>
);

const PhoneIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
    </svg>
);

const Note = ({ children }) => (
    <div className="poppins my-6 flex items-start gap-3 rounded-2xl bg-[#FFF4E0] px-5 py-4 text-[14.5px] font-bold leading-[1.55] text-[#9A5B00] print:my-3 print:rounded-lg print:border print:border-[#FDE047] print:bg-[#FEF9C3] print:text-[#854D0E] print:break-inside-avoid print:page-break-inside-avoid">
        <span className="mt-[3px] shrink-0 print:hidden">
            <InfoIcon />
        </span>
        <p>{children}</p>
    </div>
);

const Table = ({ headers, rows = [] }) => (
    <div className="my-6 rounded-2xl border border-[#E1E6F0] px-4 py-1 sm:px-5 print:my-3 print:rounded-lg print:border-gray-300 print:break-inside-avoid print:page-break-inside-avoid">
        {headers && headers.length > 0 && (
            <div className="poppins hidden sm:grid grid-cols-[210px_1fr] gap-6 border-b border-[#E1E6F0] py-3 text-[13px] font-bold uppercase tracking-wider text-[#00A6E3] print:grid print:grid-cols-[180px_1fr] print:py-2 print:border-gray-300 print:text-[#042C89]">
                {headers.map((h, i) => (
                    <span key={i}>{h}</span>
                ))}
            </div>
        )}
        {rows.map((row, i) => {
            const label = Array.isArray(row) ? row[0] : row?.label;
            const value = Array.isArray(row) ? row[1] : row?.value;
            return (
                <div
                    key={i}
                    className={`poppins grid grid-cols-1 gap-1 py-4 sm:grid-cols-[210px_1fr] sm:gap-6 print:grid-cols-[180px_1fr] print:py-2.5 print:gap-4 ${
                        i !== rows.length - 1 ? "border-b border-[#E1E6F0] print:border-gray-200" : ""
                    }`}
                >
                    <span className="text-[14px] font-bold text-[#042C89] print:text-[13px]">{label}</span>
                    <span className="text-[14.5px] leading-[1.55] text-[#34353B] print:text-[13px] print:text-gray-800">{value}</span>
                </div>
            );
        })}
    </div>
);

const Block = ({ b }) => {
    if (!b) return null;
    const blockType = b.type || b.t;

    if (blockType === "paragraph" || blockType === "p") {
        return <p className="poppins mb-4 text-[15.5px] leading-[1.7] text-[#34353B] print:text-[13.5px] print:mb-3 print:text-gray-800 print:leading-relaxed">{b.text}</p>;
    }

    if (blockType === "callout" || blockType === "note") {
        return <Note>{b.text}</Note>;
    }

    if (blockType === "list" || blockType === "ul") {
        return (
            <ul className="mb-5 space-y-2.5 print:mb-3 print:space-y-1.5 print:break-inside-avoid">
                {(b.items || []).map((it, idx) => (
                    <li key={idx} className="poppins flex items-start gap-3 text-[15.5px] leading-[1.65] text-[#34353B] print:text-[13.5px] print:text-gray-800">
                        <span className="mt-[10px] h-[7px] w-[7px] shrink-0 rounded-full bg-[#0DD180] print:bg-[#042C89] print:mt-[7px]" />
                        <span>{it}</span>
                    </li>
                ))}
            </ul>
        );
    }

    if (blockType === "table") {
        return <Table headers={b.headers} rows={b.rows} />;
    }

    return null;
};

/* Skeleton Loader */
const ContentSkeleton = () => (
    <div className="animate-pulse">
        <div className="rounded-3xl bg-gray-100 p-6 sm:p-8">
            <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-gray-200 shrink-0" />
                <div className="w-full space-y-2">
                    <div className="h-5 w-32 rounded bg-gray-200" />
                    <div className="h-4 w-3/4 rounded bg-gray-200" />
                </div>
            </div>
            <div className="mt-6 space-y-3 sm:pl-14">
                <div className="h-4 w-5/6 rounded bg-gray-200" />
                <div className="h-4 w-4/6 rounded bg-gray-200" />
                <div className="h-4 w-3/4 rounded bg-gray-200" />
            </div>
        </div>

        <div className="mt-10 space-y-8">
            {[1, 2, 3, 4].map((n) => (
                <div key={n} className="border-t border-gray-100 py-8">
                    <div className="mb-4 flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-gray-200 shrink-0" />
                        <div className="h-6 w-48 rounded bg-gray-200" />
                    </div>
                    <div className="space-y-3">
                        <div className="h-4 w-full rounded bg-gray-200" />
                        <div className="h-4 w-11/12 rounded bg-gray-200" />
                        <div className="h-4 w-4/5 rounded bg-gray-200" />
                    </div>
                </div>
            ))}
        </div>
    </div>
);

/* ====== MAIN CONTENT COMPONENT ====== */
const Content = ({
    currentSlug = "terms-and-conditions",
    sections = [],
    summaryBox = null,
    ctaBox = null,
    otherPages = [],
    loading = false,
    error = null,
}) => {
    const [active, setActive] = useState(sections[0]?.id || "");
    const [tocOpen, setTocOpen] = useState(false);

    // Update active section when sections change or user scrolls
    useEffect(() => {
        if (!sections || sections.length === 0) return;

        if (!active || !sections.some((s) => s.id === active)) {
            setActive(sections[0]?.id || "");
        }

        const els = sections
            .map((s) => document.getElementById(s.id))
            .filter(Boolean);

        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        setActive(e.target.id);
                    }
                });
            },
            { rootMargin: "-15% 0px -75% 0px" }
        );

        els.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, [sections]);

    const goTo = (e, id) => {
        e.preventDefault();
        setActive(id);
        setTocOpen(false);
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    // Prepare legal navigation links (dynamic or fallback)
    const legalLinks =
        otherPages && otherPages.length > 0
            ? otherPages.map((page) => ({
                  label: `${page.title || ""} ${page.highlightTitle || ""}`
                      .trim()
                      .replace(/\.$/, ""),
                  href: mapSlugToHref(page.slug),
                  active: page.slug === currentSlug,
              }))
            : DEFAULT_LEGAL_LINKS.map((l) => ({
                  ...l,
                  active: mapSlugToHref(currentSlug) === l.href,
              }));

    // CTA values
    const ctaTitle = ctaBox?.title || "Any questions?";
    const ctaDescription =
        ctaBox?.description || "Email us or give us a call, and we’ll be happy to help.";
    const primaryLabel = ctaBox?.primaryButton?.label || EMAIL;
    const primaryUrl = mapButtonUrl(ctaBox?.primaryButton?.url) || `mailto:${EMAIL}`;
    const secondaryLabel = ctaBox?.secondaryButton?.label || PHONE;
    const secondaryUrl = ctaBox?.secondaryButton?.url || `tel:${PHONE.replace(/\s/g, "")}`;

    return (
        <section className="relative w-full bg-white py-10 md:py-14 lg:py-16 print:py-0 print:bg-white">
            <Container className="print:max-w-none print:px-0">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-[270px_minmax(0,1fr)] xl:grid-cols-[290px_minmax(0,1fr)] xl:gap-12 print:block print:w-full">
                    {/* ========== LEFT (DESKTOP ASIDE) - HIDDEN IN PRINT ========== */}
                    <aside className="hidden lg:block print:hidden">
                        <div className="sticky top-24 space-y-5">
                            {/* ON THIS PAGE */}
                            <div className="rounded-3xl bg-[#F6F8FC] px-3 py-6 max-h-[calc(100vh-140px)] overflow-y-auto">
                                <p className="poppins mb-4 px-3 text-[13px] font-bold tracking-wide text-[#00A6E3]">
                                    ON THIS PAGE
                                </p>
                                <ul className="space-y-0.5">
                                    {sections.map((s, idx) => {
                                        const isActive = active === s.id;
                                        const num = s.number || s.num || idx + 1;
                                        return (
                                            <li key={s.id || idx}>
                                                <a
                                                    href={`#${s.id}`}
                                                    onClick={(e) => goTo(e, s.id)}
                                                    className={`poppins relative block truncate rounded-lg px-3 py-2.5 text-[13px] leading-none transition ${
                                                        isActive
                                                            ? "bg-white font-bold text-[#042C89] shadow-sm"
                                                            : "font-medium text-[#34353B] hover:text-[#042C89]"
                                                    }`}
                                                    title={`${num}. ${s.title}`}
                                                >
                                                    {isActive && (
                                                        <span className="absolute -left-3 top-1/2 h-[18px] w-[3px] -translate-y-1/2 rounded-full bg-[#0DD180]" />
                                                    )}
                                                    {num}. {s.title}
                                                </a>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>

                            {/* LEGAL LINKS */}
                            <div className="rounded-3xl border border-[#E1E6F0] bg-white px-3 py-5">
                                <p className="poppins mb-3 px-3 text-[13px] font-bold tracking-wide text-[#00A6E3]">
                                    LEGAL
                                </p>
                                <ul className="space-y-1">
                                    {legalLinks.map((l) => (
                                        <li key={l.label}>
                                            <a
                                                href={l.href}
                                                className={`poppins flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-[13px] font-semibold leading-none transition ${
                                                    l.active
                                                        ? "bg-[#042C89] text-white"
                                                        : "text-[#042C89] hover:bg-[#F6F8FC]"
                                                }`}
                                            >
                                                <img
                                                    src={l.active ? ICON_DOC_YELLOW : ICON_DOC_SKY}
                                                    alt=""
                                                    className="h-[13px] w-[13px] object-contain"
                                                />
                                                {l.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-4 flex items-center gap-5 border-t border-[#E1E6F0] px-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => window.print()}
                                        className="poppins inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-[#00A6E3] hover:text-[#042C89] transition"
                                    >
                                        <DownloadIcon />
                                        Download PDF
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => window.print()}
                                        className="poppins inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-[#00A6E3] hover:text-[#042C89] transition"
                                    >
                                        <PrintIcon />
                                        Print
                                    </button>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* ========== RIGHT CONTENT ========== */}
                    <div className="min-w-0 print:w-full">
                        {/* MOBILE: Legal Pills + Collapsible Table of Contents - HIDDEN IN PRINT */}
                        <div className="mb-6 lg:hidden print:hidden">
                            <div className="-mx-1 flex gap-2.5 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                                {legalLinks.map((l) => (
                                    <a
                                        key={l.label}
                                        href={l.href}
                                        className={`poppins shrink-0 whitespace-nowrap rounded-full border px-5 py-2.5 text-[13px] font-bold leading-none transition ${
                                            l.active
                                                ? "border-[#042C89] bg-[#042C89] text-white"
                                                : "border-[#C9D3F0] bg-white text-[#042C89]"
                                        }`}
                                    >
                                        {l.label}
                                    </a>
                                ))}
                            </div>

                            {sections.length > 0 && (
                                <div className="mt-4 overflow-hidden rounded-2xl bg-[#F2F5FB]">
                                    <button
                                        type="button"
                                        onClick={() => setTocOpen((v) => !v)}
                                        aria-expanded={tocOpen}
                                        className="flex w-full items-center gap-3 px-4 py-4 text-left"
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00A6E3" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
                                            <path d="M9 6h11M9 12h11M9 18h11" />
                                            <circle cx="4.5" cy="6" r="0.8" fill="#00A6E3" />
                                            <circle cx="4.5" cy="12" r="0.8" fill="#00A6E3" />
                                            <circle cx="4.5" cy="18" r="0.8" fill="#00A6E3" />
                                        </svg>
                                        <span className="poppins text-[15px] font-bold text-[#042C89]">
                                            On this page
                                        </span>
                                        <span className="poppins ml-auto text-[12.5px] font-semibold text-[#6B7280]">
                                            {sections.length} sections
                                        </span>
                                        <svg
                                            width="14"
                                            height="14"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="#042C89"
                                            strokeWidth="3"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className={`transition-transform ${tocOpen ? "rotate-180" : ""}`}
                                            aria-hidden="true"
                                        >
                                            <path d="m6 9 6 6 6-6" />
                                        </svg>
                                    </button>

                                    {tocOpen && (
                                        <ul className="max-h-[320px] space-y-0.5 overflow-y-auto px-2 pb-3">
                                            {sections.map((s, idx) => {
                                                const num = s.number || s.num || idx + 1;
                                                return (
                                                    <li key={s.id || idx}>
                                                        <a
                                                            href={`#${s.id}`}
                                                            onClick={(e) => goTo(e, s.id)}
                                                            className={`poppins block rounded-lg px-3 py-2.5 text-[13.5px] leading-snug ${
                                                                active === s.id
                                                                    ? "bg-white font-bold text-[#042C89]"
                                                                    : "font-medium text-[#34353B]"
                                                            }`}
                                                        >
                                                            {num}. {s.title}
                                                        </a>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Error Message if API fails and no sections */}
                        {error && sections.length === 0 && (
                            <div className="mb-6 rounded-2xl bg-red-50 p-5 text-red-700 print:hidden">
                                <p className="font-semibold">Unable to load terms and conditions right now.</p>
                                <p className="text-sm mt-1">{error}</p>
                            </div>
                        )}

                        {/* Loading Skeleton */}
                        {loading && sections.length === 0 ? (
                            <ContentSkeleton />
                        ) : (
                            <>
                                {/* SUMMARY BOX ("In short") */}
                                {summaryBox && (
                                    <div className="rounded-3xl bg-[#E8F8F1] p-5 sm:p-7 print:rounded-xl print:border print:border-[#0DD180] print:p-4 print:my-3 print:bg-[#F0FDF4] print:break-inside-avoid print:page-break-inside-avoid">
                                        <div className="flex items-start gap-3">
                                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0DD180] text-[#042C89] print:h-7 print:w-7 print:text-[12px]">
                                                <InfoIcon size={16} />
                                            </span>
                                            <div>
                                                <h2 className="poppins text-[19px] font-bold leading-tight text-[#042C89] print:text-[16px]">
                                                    {summaryBox.badge || "In short"}
                                                </h2>
                                                <p className="poppins mt-1 text-[13px] leading-snug text-[#34353B] print:text-[12px] print:text-gray-700">
                                                    {summaryBox.title || "The key points, in plain English. The full wording follows below."}
                                                </p>
                                            </div>
                                        </div>

                                        {summaryBox.bullets && summaryBox.bullets.length > 0 && (
                                            <ul className="mt-5 space-y-3.5 sm:pl-[52px] print:mt-3 print:space-y-2 print:pl-9">
                                                {summaryBox.bullets.map((t, idx) => (
                                                    <li
                                                        key={idx}
                                                        className="poppins flex items-start gap-3 text-[15px] font-medium leading-[1.55] text-[#042C89] print:text-[13px] print:text-gray-900"
                                                    >
                                                        <CheckIcon />
                                                        <span>{t}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                )}

                                {/* SECTIONS */}
                                <div className="mt-10 print:mt-4">
                                    {sections.map((s, i) => {
                                        const num = s.number || s.num || i + 1;
                                        return (
                                            <article
                                                key={s.id || i}
                                                id={s.id}
                                                className="scroll-mt-24 border-t border-[#E1E6F0] py-9 first:mt-0 print:py-4 print:border-gray-200 print:break-inside-avoid print:page-break-inside-avoid"
                                            >
                                                <div className="mb-4 flex items-center gap-3.5 print:mb-2 print:gap-2.5">
                                                    <span
                                                        className={`poppins flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[13px] font-bold ${
                                                            BADGE[i % 4]
                                                        } print:h-7 print:w-7 print:text-[11px] print:border print:border-gray-300`}
                                                    >
                                                        {num}
                                                    </span>
                                                    <h2 className="poppins text-[19px] font-bold leading-tight text-[#042C89] sm:text-[22px] print:text-[16px] print:text-[#042C89] print:break-after-avoid">
                                                        {s.title}
                                                    </h2>
                                                </div>

                                                {(s.blocks || []).map((b, bi) => (
                                                    <Block key={bi} b={b} />
                                                ))}
                                            </article>
                                        );
                                    })}
                                </div>
                            </>
                        )}

                        {/* CTA BOX - HIDDEN IN PRINT / PDF */}
                        <div
                            className="relative mt-4 overflow-hidden rounded-[28px] bg-[#042C89] bg-cover bg-right bg-no-repeat px-6 py-8 sm:px-9 sm:py-10 print:hidden"
                            style={{ backgroundImage: `url(${CTA_BG})` }}
                        >
                            <div className="relative z-10">
                                <h3 className="recline text-[26px] font-bold leading-tight text-white">
                                    {ctaTitle}
                                </h3>
                                <p className="poppins mt-2 max-w-[460px] text-[15px] leading-[1.5] text-white/90">
                                    {ctaDescription}
                                </p>

                                <div className="mt-6 flex flex-wrap items-center gap-3">
                                    <a
                                        href={primaryUrl}
                                        className="poppins inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#FFDE14] px-6 py-4 sm:w-auto sm:py-3 text-[13.5px] font-bold leading-none text-[#042C89] transition hover:brightness-95"
                                    >
                                        <MailIcon />
                                        <span>{primaryLabel}</span>
                                    </a>
                                    <a
                                        href={secondaryUrl}
                                        className="poppins inline-flex w-full items-center justify-center gap-2 rounded-full border border-white px-6 py-4 sm:w-auto sm:py-3 text-[13.5px] font-bold leading-none text-white transition hover:bg-white/10"
                                    >
                                        <PhoneIcon />
                                        <span>{secondaryLabel}</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* MOBILE: DOWNLOAD AS PDF - HIDDEN IN PRINT */}
                        <button
                            type="button"
                            onClick={() => window.print()}
                            className="poppins mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#E6F4FB] px-6 py-4 text-[13.5px] font-bold text-[#042C89] lg:hidden print:hidden"
                        >
                            <DownloadIcon />
                            Download as PDF
                        </button>

                        {/* PRINT ONLY: OFFICIAL DOCUMENT FOOTER */}
                        <div className="hidden print:block mt-8 pt-4 border-t border-gray-300 text-center text-[10px] text-gray-500 font-sans print:break-inside-avoid">
                            <p className="font-semibold text-gray-700">© 2026 Samba Soccer Schools Global Ltd • All Rights Reserved.</p>
                            <p className="mt-0.5">Official legal documentation • For parent support contact 020 7205 2723 or admin@sambasoccerschools.com</p>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default Content;
