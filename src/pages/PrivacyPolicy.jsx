// PrivacyPolicy.jsx  (banner + content, ek hi file me)
import React, { useEffect, useState } from "react";
import { Container } from "../components/common/Container";

/* ====== ASSETS ====== */
const ASSET = "https://webstepdev.com/demo/syncoWebsiteImages";
const BG = `${ASSET}/legalpage/hero.png`;
const WHITE_LINE = `${ASSET}/roadtorio/whiteline.png`;
const ICON_CAL = `${ASSET}/icons/calyellow.png`;
const ICON_CLOCK = `${ASSET}/icons/clockyellow.png`;
const ICON_DOC_SKY = `${ASSET}/icons/docsky.png`;
const ICON_DOC_YELLOW = `${ASSET}/icons/docyellow.png`;
const CTA_BG = `${ASSET}/venues/rectanglebg.png`;
/* ==================== */
const HOME = "https://webstepdev.com/demo/syncoWebsiteImages/icons/homewhite.png";

const EMAIL = "admin@sambasoccerschools.com";
const PHONE = "020 7205 2723";

const BADGE = [
    "bg-[#0DD180] text-[#042C89]",
    "bg-[#00A6E3] text-white",
    "bg-[#FFDE14] text-[#042C89]",
    "bg-[#042C89] text-white",
];

const SUMMARY = [
    "We collect only what we need to run your child’s classes, camps and bookings.",
    "We never sell your information.",
    "Medical details are only shared with the coaches running your child’s sessions.",
    "Photos and videos are only used in marketing with your consent.",
    "You can see, change or delete your information at any time.",
];

/* block types: p | ul | note | table */
const SECTIONS = [
    {
        title: "Who we are",
        blocks: [
            { t: "p", text: "Samba Soccer Schools Global Ltd is the data controller for the information you give us. Where a venue is run by a licensed Samba franchise partner, they also act as a controller for bookings at that venue. We follow the UK GDPR and the Data Protection Act 2018." },
        ],
    },
    {
        title: "What we collect",
        blocks: [
            {
                t: "table",
                rows: [
                    ["About you", "Name, email, mobile, postcode, relationship to the child"],
                    ["About your child", "Name, date of birth, gender, class, level, attendance and progress"],
                    ["Health information", "Medical or additional needs you choose to share"],
                    ["Emergency contacts", "Names and numbers of adults who can collect"],
                    ["Payments", "Payment history (never full card or bank details)"],
                    ["Website and app", "Device, pages visited and cookies"],
                ],
            },
        ],
    },
    {
        title: "How we use it and why",
        blocks: [
            {
                t: "table",
                rows: [
                    ["Running bookings and classes", "To perform our contract with you"],
                    ["Taking payments", "To perform our contract with you"],
                    ["Keeping children safe", "Legal obligation and legitimate interests"],
                    ["Reminders and updates", "To perform our contract with you"],
                    ["Marketing emails and texts", "Your consent, which you can withdraw"],
                    ["Improving our service", "Legitimate interests"],
                ],
            },
        ],
    },
    {
        title: "Health information",
        blocks: [
            { t: "p", text: "Medical and additional needs information is special category data. We use it only to keep your child safe and to make reasonable adjustments, with your explicit consent." },
            { t: "note", text: "Health information is only shared with the coaches running your child’s sessions, and deleted when their membership ends." },
        ],
    },
    {
        title: "Children’s information",
        blocks: [
            { t: "p", text: "We take extra care with information about children. We collect it from parents and guardians, use it only to run sessions safely, and never use it for profiling or targeted advertising." },
        ],
    },
    {
        title: "Photos and videos",
        blocks: [
            { t: "p", text: "We ask for your consent at registration, with no box pre-ticked. Saying no never affects your child taking part. We never name children or share personal details alongside images, and we remove images within 30 days if you withdraw consent." },
        ],
    },
    {
        title: "Who we share it with",
        blocks: [
            { t: "p", text: "We only share information with people who help us run our service, under contracts that protect it:" },
            {
                t: "ul",
                items: [
                    "Your venue team and franchise partner, to run your child’s sessions.",
                    "Stripe and GoCardless, to process payments.",
                    "Our booking, email and text message providers.",
                    "Website analytics providers, only where you accept cookies.",
                    "The police or authorities, only where the law or a safeguarding concern requires it.",
                ],
            },
            { t: "note", text: "We never sell your information." },
        ],
    },
    {
        title: "International transfers",
        blocks: [
            { t: "p", text: "Some providers store data outside the UK. When they do, we make sure it is protected by UK adequacy regulations or approved contract clauses." },
        ],
    },
    {
        title: "How long we keep it",
        blocks: [
            {
                t: "table",
                rows: [
                    ["Account and booking details", "While you’re a member, then 3 years"],
                    ["Payment records", "6 years (legal requirement)"],
                    ["Health information", "Deleted when membership ends"],
                    ["Safeguarding records", "As long as legally required"],
                    ["Photo consent records", "Membership plus 5 years"],
                    ["Marketing preferences", "Until you unsubscribe"],
                ],
            },
        ],
    },
    {
        title: "Keeping it secure",
        blocks: [
            { t: "p", text: "Your information is encrypted, stored securely and only accessible to people who need it. Coaches only see the details they need for their sessions." },
        ],
    },
    {
        title: "Your rights",
        blocks: [
            { t: "p", text: "Under UK data protection law you can:" },
            {
                t: "ul",
                items: [
                    "See the information we hold about you.",
                    "Ask us to correct or delete it.",
                    "Object to or restrict how we use it.",
                    "Ask for a copy to take elsewhere.",
                    "Withdraw consent at any time.",
                ],
            },
            { t: "p", text: "Email us to make a request. We’ll respond within one month and there’s no fee." },
        ],
    },
    {
        title: "Marketing",
        blocks: [
            { t: "p", text: "We’ll only send you marketing if you’ve agreed. You can unsubscribe at any time from any email or text, or in Samba Connect." },
        ],
    },
    {
        title: "Cookies",
        blocks: [
            { t: "p", text: "We use essential cookies to make our website and Samba Connect work, and optional analytics and marketing cookies only if you accept them. You can change your choices at any time from the cookie banner." },
        ],
    },
    {
        title: "Complaints",
        blocks: [
            { t: "p", text: "If you’re unhappy with how we’ve handled your information, please contact us first. You also have the right to complain to the Information Commissioner’s Office at ico.org.uk or on 0303 123 1113." },
        ],
    },
    {
        title: "Changes to this policy",
        blocks: [
            { t: "p", text: "We’ll update this page when things change and email you about any important changes." },
        ],
    },
].map((s, i) => ({ ...s, id: `sec-${i + 1}`, num: i + 1 }));

const LEGAL_LINKS = [
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy", active: true },
    { label: "Safeguarding", href: "/safeguarding" },
    { label: "Accessibility", href: "/accessibility" },
];

/* ====== ICONS ====== */
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

/* ====== BANNER ====== */
const Pill = ({ icon, children }) => (
    <span className="poppins inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-2 text-[13px] font-semibold leading-none text-[#C9D3F0]">
        <img src={icon} alt="" className="h-[13px] w-[13px] object-contain" />
        {children}
    </span>
);

const PrivacyBanner = ({
    title1 = "Privacy",
    title2 = "Policy.",
    lastUpdated = "1 November 2026",
    readTime = "9 min read",
}) => (
    <section
        className="relative isolate w-full overflow-hidden bg-cover bg-bottom bg-no-repeat pt-10 pb-28 sm:pt-12 sm:pb-32 md:pt-14 md:pb-36 lg:pt-16 lg:pb-40"
        style={{ backgroundImage: `url(${BG})` }}
    >
        <Container className="relative z-10">
            <nav className="poppins mb-5 flex flex-wrap items-center gap-2 text-[13px] font-semibold text-[#C9D3F0]">
                <a href="/" className="inline-flex items-center gap-1.5 transition hover:text-white">
                     <img src={HOME} alt="" className="h-[13px] w-[13px] mb-1 object-contain" />
                        Home
                </a>
                <Chevron />
                <a href="#" className="transition hover:text-white">Legal</a>
                <Chevron />
                <span className="text-white">Privacy Policy</span>
            </nav>

            <h1 className="recline font-bold leading-[1.1] text-white">
                <span className="block text-[36px] sm:text-[42px] md:text-[50px]">{title1}</span>
                                    <span className="gasoek font-normal relative mt-1 inline-block text-[44px] sm:text-[52px] md:text-[64px] text-[#FFDE14]"
                        style={{ textShadow: "2px 2px 0 #042C89, -1px -1px 0 #042C89, 1px -1px 0 #042C89, -1px 1px 0 #042C89" }}
                    >
                    {title2}
                    <img src={WHITE_LINE} alt="" className="pointer-events-none absolute -bottom-0 left-0 h-auto w-full" />
                </span>
            </h1>

            <p className="poppins mt-8 max-w-[640px] text-[15px] leading-[1.5] text-white sm:text-[17px]">
                How we collect, use and protect your family’s information.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3">
                <Pill icon={ICON_CAL}>Last updated {lastUpdated}</Pill>
                <Pill icon={ICON_CLOCK}>{readTime}</Pill>
            </div>
        </Container>
    </section>
);

/* ====== CONTENT PIECES ====== */
const Note = ({ children }) => (
    <div className="poppins my-6 flex items-start gap-3 rounded-2xl bg-[#FFF4E0] px-5 py-4 text-[14.5px] font-bold leading-[1.55] text-[#9A5B00]">
        <span className="mt-[3px] shrink-0">
            <InfoIcon />
        </span>
        <p>{children}</p>
    </div>
);

const Table = ({ rows }) => (
    <div className="my-6 rounded-2xl border border-[#E1E6F0] px-4 py-1 sm:px-5">
        {rows.map(([label, value], i) => (
            <div
                key={label}
                className={`poppins grid grid-cols-1 gap-1 py-4 sm:grid-cols-[210px_1fr] sm:gap-6 ${i !== rows.length - 1 ? "border-b border-[#E1E6F0]" : ""}`}
            >
                <span className="text-[14px] font-bold text-[#042C89]">{label}</span>
                <span className="text-[14.5px] leading-[1.55] text-[#34353B]">{value}</span>
            </div>
        ))}
    </div>
);

const Block = ({ b }) => {
    if (b.t === "p") return <p className="poppins mb-4 text-[15.5px] leading-[1.7] text-[#34353B]">{b.text}</p>;
    if (b.t === "ul")
        return (
            <ul className="mb-5 space-y-2.5">
                {b.items.map((it) => (
                    <li key={it} className="poppins flex items-start gap-3 text-[15.5px] leading-[1.65] text-[#34353B]">
                        <span className="mt-[10px] h-[7px] w-[7px] shrink-0 rounded-full bg-[#0DD180]" />
                        <span>{it}</span>
                    </li>
                ))}
            </ul>
        );
    if (b.t === "note") return <Note>{b.text}</Note>;
    if (b.t === "table") return <Table rows={b.rows} />;
    return null;
};

/* ====== CONTENT ====== */
const PrivacyContent = () => {
    const [active, setActive] = useState(SECTIONS[0].id);
    const [tocOpen, setTocOpen] = useState(false);

    useEffect(() => {
        const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean);
        const io = new IntersectionObserver(
            (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
            { rootMargin: "-15% 0px -75% 0px" }
        );
        els.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, []);

    const goTo = (e, id) => {
        e.preventDefault();
        setActive(id);
        setTocOpen(false);
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <section className="relative w-full bg-white py-10 md:py-14 lg:py-16">
            <Container>
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-[270px_minmax(0,1fr)] xl:grid-cols-[290px_minmax(0,1fr)] xl:gap-12">
                    {/* ========== LEFT (desktop) ========== */}
                    <aside className="hidden lg:block">
                        <div className="space-y-5">
                            <div className="rounded-3xl bg-[#F6F8FC] px-3 py-6">
                                <p className="poppins mb-4 px-3 text-[13px] font-bold tracking-wide text-[#00A6E3]">ON THIS PAGE</p>
                                <ul className="space-y-0.5">
                                    {SECTIONS.map((s) => {
                                        const isActive = active === s.id;
                                        return (
                                            <li key={s.id}>
                                                <a
                                                    href={`#${s.id}`}
                                                    onClick={(e) => goTo(e, s.id)}
                                                    className={`poppins relative block truncate rounded-lg px-3 py-2.5 text-[13px] leading-none transition ${
                                                        isActive
                                                            ? "bg-white font-bold text-[#042C89] shadow-sm"
                                                            : "font-medium text-[#34353B] hover:text-[#042C89]"
                                                    }`}
                                                >
                                                    {isActive && (
                                                        <span className="absolute -left-3 top-1/2 h-[18px] w-[3px] -translate-y-1/2 rounded-full bg-[#0DD180]" />
                                                    )}
                                                    {s.num}. {s.title}
                                                </a>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>

                            <div className="rounded-3xl border border-[#E1E6F0] bg-white px-3 py-5">
                                <p className="poppins mb-3 px-3 text-[13px] font-bold tracking-wide text-[#00A6E3]">LEGAL</p>
                                <ul className="space-y-1">
                                    {LEGAL_LINKS.map((l) => (
                                        <li key={l.label}>
                                            <a
                                                href={l.href}
                                                className={`poppins flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-[13px] font-semibold leading-none transition ${
                                                    l.active ? "bg-[#042C89] text-white" : "text-[#042C89] hover:bg-[#F6F8FC]"
                                                }`}
                                            >
                                                <img src={l.active ? ICON_DOC_YELLOW : ICON_DOC_SKY} alt="" className="h-[13px] w-[13px] object-contain" />
                                                {l.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-4 flex items-center gap-5 border-t border-[#E1E6F0] px-3 pt-4">
                                    <a href="#" className="poppins inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-[#00A6E3] transition hover:text-[#042C89]">
                                        <DownloadIcon />
                                        Download PDF
                                    </a>
                                    <button
                                        type="button"
                                        onClick={() => window.print()}
                                        className="poppins inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-[#00A6E3] transition hover:text-[#042C89]"
                                    >
                                        <PrintIcon />
                                        Print
                                    </button>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* ========== RIGHT ========== */}
                    <div className="min-w-0">
                        {/* MOBILE: legal pills + collapsible TOC */}
                        <div className="mb-6 lg:hidden">
                            <div className="-mx-1 flex gap-2.5 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                                {LEGAL_LINKS.map((l) => (
                                    <a
                                        key={l.label}
                                        href={l.href}
                                        className={`poppins shrink-0 whitespace-nowrap rounded-full border px-5 py-2.5 text-[13px] font-bold leading-none transition ${
                                            l.active ? "border-[#042C89] bg-[#042C89] text-white" : "border-[#C9D3F0] bg-white text-[#042C89]"
                                        }`}
                                    >
                                        {l.label}
                                    </a>
                                ))}
                            </div>

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
                                    <span className="poppins text-[15px] font-bold text-[#042C89]">On this page</span>
                                    <span className="poppins ml-auto text-[12.5px] font-semibold text-[#6B7280]">{SECTIONS.length} sections</span>
                                    <svg
                                        width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#042C89" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                                        className={`transition-transform ${tocOpen ? "rotate-180" : ""}`}
                                        aria-hidden="true"
                                    >
                                        <path d="m6 9 6 6 6-6" />
                                    </svg>
                                </button>

                                {tocOpen && (
                                    <ul className="max-h-[320px] space-y-0.5 overflow-y-auto px-2 pb-3">
                                        {SECTIONS.map((s) => (
                                            <li key={s.id}>
                                                <a
                                                    href={`#${s.id}`}
                                                    onClick={(e) => goTo(e, s.id)}
                                                    className={`poppins block rounded-lg px-3 py-2.5 text-[13.5px] leading-snug ${
                                                        active === s.id ? "bg-white font-bold text-[#042C89]" : "font-medium text-[#34353B]"
                                                    }`}
                                                >
                                                    {s.num}. {s.title}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>

                        {/* IN SHORT */}
                        <div className="rounded-3xl bg-[#E8F8F1] p-5 sm:p-7">
                            <div className="flex items-start gap-3">
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0DD180] text-[#042C89]">
                                    <InfoIcon size={18} />
                                </span>
                                <div>
                                    <h2 className="poppins text-[19px] font-bold leading-tight text-[#042C89]">In short</h2>
                                    <p className="poppins mt-1 text-[13px] leading-snug text-[#34353B]">
                                        The key points, in plain English. The full wording follows below.
                                    </p>
                                </div>
                            </div>

                            <ul className="mt-5 space-y-3.5 sm:pl-[52px]">
                                {SUMMARY.map((t) => (
                                    <li key={t} className="poppins flex items-start gap-3 text-[15px] font-medium leading-[1.55] text-[#042C89]">
                                        <CheckIcon />
                                        <span>{t}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* SECTIONS */}
                        <div className="mt-10">
                            {SECTIONS.map((s, i) => (
                                <article key={s.id} id={s.id} className="scroll-mt-24 border-t border-[#E1E6F0] py-9">
                                    <div className="mb-4 flex items-center gap-3.5">
                                        <span className={`poppins flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[13px] font-bold ${BADGE[i % 4]}`}>
                                            {s.num}
                                        </span>
                                        <h2 className="poppins text-[19px] font-bold leading-tight text-[#042C89] sm:text-[22px]">{s.title}</h2>
                                    </div>
                                    {s.blocks.map((b, bi) => (
                                        <Block key={bi} b={b} />
                                    ))}
                                </article>
                            ))}
                        </div>

                        {/* CTA */}
                        <div
                            className="relative mt-4 overflow-hidden rounded-[28px] bg-[#042C89] bg-cover bg-right bg-no-repeat px-6 py-8 sm:px-9 sm:py-10"
                            style={{ backgroundImage: `url(${CTA_BG})` }}
                        >
                            <div className="relative z-10">
                                <h3 className="recline text-[26px] font-bold leading-tight text-white">Any questions?</h3>
                                <p className="poppins mt-2 max-w-[460px] text-[15px] leading-[1.5] text-white/90">
                                    Email us or give us a call, and we’ll be happy to help.
                                </p>

                                <div className="mt-6 flex flex-wrap items-center gap-3">
                                    <a
                                        href={`mailto:${EMAIL}`}
                                        className="poppins inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#FFDE14] px-6 py-4 text-[13.5px] font-bold leading-none text-[#042C89] transition hover:brightness-95 sm:w-auto sm:py-3"
                                    >
                                        <MailIcon />
                                        <span className="sm:hidden">Email us</span>
                                        <span className="hidden sm:inline">{EMAIL}</span>
                                    </a>
                                    <a
                                        href={`tel:${PHONE.replace(/\s/g, "")}`}
                                        className="poppins inline-flex w-full items-center justify-center gap-2 rounded-full border border-white px-6 py-4 text-[13.5px] font-bold leading-none text-white transition hover:bg-white/10 sm:w-auto sm:py-3"
                                    >
                                        <PhoneIcon />
                                        {PHONE}
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* MOBILE: download */}
                        <a
                            href="#"
                            className="poppins mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#E6F4FB] px-6 py-4 text-[13.5px] font-bold text-[#042C89] lg:hidden"
                        >
                            <DownloadIcon />
                            Download as PDF
                        </a>
                    </div>
                </div>
            </Container>
        </section>
    );
};

/* ====== PAGE ====== */
const PrivacyPolicy = () => (
    <>
        <PrivacyBanner />
        <PrivacyContent />
    </>
);

export default PrivacyPolicy;