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
    "bg-[#00A6E3] text-white", // blue
    "bg-[#FFDE14] text-[#042C89]", // yellow
    "bg-[#042C89] text-white", // navy
];

const SUMMARY = [
    "Your first session is a FREE trial. You only pay if you choose a plan.",
    "Choose a 12-month plan (38 sessions) or a 6-month plan (19 sessions). Both include the compulsory starter pack and are paid monthly by Direct Debit.",
    "Prices are set by your local Samba franchise, so check the price for your class on our website before you book.",
    "You have 14 days after joining to change your mind. After that, plans run for their full term.",
    "You can freeze for 1 month at a time, up to twice a year. Payments carry on and your plan is extended.",
    "Missed sessions aren’t refunded or credited, unless you provide a doctor’s note. If we cancel a session, we’ll make it up.",
];

/* block types: p | ul | note | table */
const SECTIONS = [
    {
        title: "About us and these terms",
        blocks: [
            { t: "p", text: "These terms are an agreement between you and Samba Soccer Schools Global Ltd (“Samba”, “we”, “us”), a company registered in England and Wales (company number [00000000]) with its registered office at [registered office address]." },
            { t: "p", text: "They apply to everything you book with us, on our website or in Samba Connect: free trials, weekly memberships, holiday camps, the Copa de Samba and other events. Please read them together with our Privacy Policy and Safeguarding Policy." },
            { t: "note", text: "Some Samba venues are run by licensed Samba franchise partners. Your booking confirmation will tell you who runs your venue. These terms apply in the same way at every venue." },
        ],
    },
    {
        title: "Who can take part",
        blocks: [
            { t: "p", text: "Our classes are for children aged 4 to 12. Bookings must be made by a parent or legal guardian aged 18 or over, who agrees to these terms on behalf of the child." },
        ],
    },
    {
        title: "Free trials",
        blocks: [
            { t: "p", text: "Every new child can book one FREE trial session. No payment details are needed." },
            {
                t: "ul",
                items: [
                    "Please arrive 10 minutes early so the coach can meet your child.",
                    "After the trial we’ll tell you which group suits them best.",
                    "We hold their place for 24 hours. Join within 24 hours and you’ll get a reduced price on the starter pack.",
                ],
            },
        ],
    },
    {
        title: "Booking and your contract",
        blocks: [
            { t: "p", text: "Your contract with us starts when we send you a booking confirmation by email. Places are limited and offered on a first-come, first-served basis." },
            { t: "p", text: "Please make sure the details you give us are accurate and keep them up to date in Samba Connect, especially medical needs and emergency contacts." },
        ],
    },
    {
        title: "Membership plans: 12 months and 6 months",
        blocks: [
            { t: "p", text: "We offer two membership plans. Both cover one weekly class at one venue during school term time, and both include the compulsory starter pack." },
            {
                t: "table",
                rows: [
                    ["12-month plan", "38 sessions over 12 months"],
                    ["6-month plan", "19 sessions over 6 months"],
                    ["How you pay", "Your first month’s remaining sessions and the starter pack by card when you join, then a fixed monthly Direct Debit on the 1st"],
                    ["Monthly fee", "The total cost of your plan split into equal monthly payments. You pay the same each month, including months with fewer or no sessions"],
                    ["Starter pack", "Included and compulsory for every new member (see Starter pack and kit)"],
                    ["Copa de Samba", "Members only. 12-month members get priority booking"],
                ],
            },
            { t: "note", text: "Prices are set by the Samba franchise that runs your venue, so they can differ from area to area. Please check the price for your class on our website (Find a Class) or in Samba Connect before you book. Your booking confirmation shows exactly what you’ll pay." },
            { t: "p", text: "Discounts for siblings or for more than one class a week may apply and are shown when you book. Only one offer can be used per booking unless we say otherwise." },
        ],
    },
    {
        title: "When your plan ends",
        blocks: [
            { t: "p", text: "Both plans renew automatically unless you tell us at least 1 month before the end of your term." },
            {
                t: "table",
                rows: [
                    ["12-month plan", "After 12 months, it continues on a rolling monthly plan"],
                    ["6-month plan", "After 6 months, it renews for a further 6 months, then continues on a rolling monthly plan"],
                    ["Rolling monthly plan", "2 months’ notice to cancel. Full monthly payments are taken during the notice period"],
                ],
            },
        ],
    },
    {
        title: "Payments",
        blocks: [
            { t: "p", text: "When you join, you pay by card today for the sessions left that month, plus the starter pack. From the 1st of the next month, your plan is paid monthly by Direct Debit, collected by GoCardless and protected by the Direct Debit Guarantee." },
            { t: "p", text: "If a payment fails, we’ll text and email you and retry it automatically in 3 to 5 days. If it fails a second time, a £5 late payment fee is added. If it fails a third time, the membership is suspended until the payment is made, and if it isn’t resolved within 30 days the membership is cancelled. We’ll contact you at every step." },
            { t: "p", text: "Cancelling your Direct Debit with your bank doesn’t cancel your membership. If you do this without telling us, a £50 administration fee applies and the fees you owe are still due." },
            { t: "note", text: "Card payments are processed securely by Stripe. We never see or store your full card or bank details." },
        ],
    },
    {
        title: "Your 14-day right to cancel",
        blocks: [
            { t: "p", text: "If you change your mind, you can cancel within 14 days of joining. We’ll refund what you’ve paid, minus the cost of any sessions your child has attended and any starter pack items that have been used or worn. Contact us in Samba Connect or by email to cancel." },
        ],
    },
    {
        title: "Cancelling your plan",
        blocks: [
            { t: "p", text: "After the first 14 days, your plan runs for its full term." },
            {
                t: "ul",
                items: [
                    "You can submit a cancellation at any time in Samba Connect. Your plan won’t renew and ends automatically at the end of its term.",
                    "If you want to leave before the end of your term, the remaining monthly payments are still due. For example, if you leave a 12-month plan after 9 months, the last 3 payments are due.",
                    `To cancel, use Samba Connect, email ${EMAIL} or call ${PHONE}. Telling a coach or missing sessions doesn’t cancel your membership.`,
                ],
            },
            { t: "p", text: "If something serious changes, such as moving away or a long-term injury, email us. We review exceptional circumstances fairly and reply within 7 working days." },
        ],
    },
    {
        title: "Freezing your membership",
        blocks: [
            { t: "p", text: "You can freeze your membership for 1 month at a time, up to twice in any 12 months, in Samba Connect." },
            { t: "note", text: "Freezing doesn’t skip a payment. Your Direct Debit carries on and we add the frozen month to the end of your plan." },
        ],
    },
    {
        title: "Changing class or venue",
        blocks: [
            { t: "p", text: "You can transfer to another class, day or venue in Samba Connect, subject to availability. Your plan and price stay the same." },
        ],
    },
    {
        title: "Missed and cancelled sessions",
        blocks: [
            { t: "p", text: "If your child can’t make a session, please let the coach know in Samba Connect." },
            { t: "note", text: "Missed sessions aren’t refunded or credited. We only add a credit when a doctor’s note is provided." },
            { t: "p", text: "If we have to cancel a session, for example because of severe weather or the venue being unavailable, we’ll let you know as soon as we can by text and email, and offer a replacement session or a credit. If we move indoors, we’ll tell you before the session." },
        ],
    },
    {
        title: "Starter pack and kit",
        blocks: [
            { t: "p", text: "The starter pack is included in both plans and is compulsory for every new member. It contains:" },
            {
                t: "ul",
                items: [
                    "The Samba uniform: T-shirt, shorts and socks",
                    "A Samba skills ball (one per family)",
                    "A Skills Tracker book",
                    "A drawstring bag",
                ],
            },
            { t: "p", text: "The starter pack price is shown when you book and is set by your local franchise. It’s reduced if you join within 24 hours of your free trial, and a discounted rate applies for each extra child. A Royal Mail delivery fee applies. We aim to deliver within 5 working days, and if anything arrives faulty or damaged, we’ll replace it." },
            { t: "p", text: "The Samba T-shirt, shorts and socks must be worn at every session. Extra kit is available from our online shop." },
        ],
    },
    {
        title: "Holiday camps",
        blocks: [
            { t: "p", text: "Camps are paid in full when you book. You can cancel free of charge up to 14 days before the camp starts. After that, we offer camp credit instead of a refund. The Samba uniform must be worn at camp." },
        ],
    },
    {
        title: "The Copa de Samba and events",
        blocks: [
            { t: "p", text: "The Copa de Samba is our end-of-year tournament for members only. 12-month members get priority booking, but we can’t guarantee a place. Places are limited and offered on a first-come, first-served basis, and tournament places are non-refundable. Each age group has its own date and time, shown when you book." },
        ],
    },
    {
        title: "Health, medical needs and injuries",
        blocks: [
            { t: "p", text: "Please tell us about any medical, physical or additional needs when you book, and keep them up to date. This helps us keep your child safe." },
            // TODO: screenshot me ye paragraph adhoora tha, original wording se replace kar lena
            { t: "p", text: "Football is an active sport and minor bumps and falls can happen. Our coaches are first aid trained and we hold Public Liability Insurance. We don’t provide personal accident insurance, so you may wish to arrange your own cover." },
        ],
    },
    {
        // TODO: section 17 screenshot me nahi tha, real content se replace kar lena
        title: "Safeguarding, drop-off and pick-up",
        blocks: [
            { t: "p", text: "The safety of every child is our priority. Parents and guardians must stay at the venue unless we’ve agreed otherwise, and children must be handed to and collected by an authorised adult. Please see our Safeguarding Policy for more." },
        ],
    },
    {
        title: "Behaviour",
        blocks: [
            { t: "p", text: "We expect players and parents to be respectful to coaches, other children and families. If behaviour puts others at risk or repeatedly disrupts sessions, we’ll talk to you first. If it continues, we may suspend or end the membership." },
        ],
    },
    {
        title: "Inclusion and reasonable adjustments",
        blocks: [
            { t: "p", text: "We want every child to enjoy Samba. Sessions are group coaching, and we’ll talk with you about reasonable adjustments to help your child take part safely. We can’t provide one-to-one supervision or specialist support." },
        ],
    },
    {
        title: "Photos and videos",
        blocks: [
            { t: "p", text: "We only use photos or videos of your child in our marketing if you’ve given consent, which you can change at any time in Samba Connect. Parents may photograph their own child, but please don’t share images that show other children." },
        ],
    },
    {
        title: "Lost property",
        blocks: [
            { t: "p", text: "Please label your child’s kit and leave valuables at home. We can’t accept responsibility for lost or damaged belongings." },
        ],
    },
    {
        title: "Our responsibility to you",
        blocks: [
            { t: "p", text: "We don’t exclude liability for death or personal injury caused by our negligence, for fraud, or for anything else the law doesn’t allow us to exclude. Otherwise, our liability is limited to the amount you’ve paid for the service concerned. Nothing in these terms affects your statutory rights under the Consumer Rights Act 2015." },
        ],
    },
    {
        title: "Events outside our control",
        blocks: [
            { t: "p", text: "We’re not responsible for delays or cancellations caused by events outside our reasonable control, such as extreme weather, venue closures or public health restrictions. If this happens we’ll offer replacement sessions or credit where we can." },
        ],
    },
    {
        title: "Complaints",
        blocks: [
            { t: "p", text: `If something isn’t right, please tell us at ${EMAIL}. We’ll acknowledge your complaint within 5 working days and aim to resolve it within 14 days.` },
        ],
    },
    {
        title: "Changes to these terms",
        blocks: [
            { t: "p", text: "We may update these terms from time to time. We’ll email you at least 30 days before any important change, and at least 31 days before any price change to an existing plan." },
        ],
    },
    {
        title: "General",
        blocks: [
            { t: "p", text: "These terms are governed by the law of England and Wales. If any part of them can’t be enforced, the rest still applies. You can’t transfer your contract to someone else without our agreement." },
        ],
    },
].map((s, i) => ({ ...s, id: `sec-${i + 1}`, num: i + 1 }));

const LEGAL_LINKS = [
    { label: "Terms & Conditions", href: "/terms", active: true },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Safeguarding", href: "/safeguarding" },
    { label: "Accessibility", href: "/accessibility" },
];

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
                className={`poppins grid grid-cols-1 gap-1 py-4 sm:grid-cols-[170px_1fr] sm:gap-6 ${i !== rows.length - 1 ? "border-b border-[#E1E6F0]" : ""}`}
            >
                <span className="text-[14px] font-bold text-[#042C89]">{label}</span>
                <span className="text-[14.5px] leading-[1.55] text-[#34353B]">{value}</span>
            </div>
        ))}
    </div>
);

const Block = ({ b }) => {
    if (b.t === "p")
        return <p className="poppins mb-4 text-[15.5px] leading-[1.7] text-[#34353B]">{b.text}</p>;
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

/* ====== PAGE ====== */
const Content = () => {
    const [active, setActive] = useState(SECTIONS[0].id);
    const [tocOpen, setTocOpen] = useState(false);

    useEffect(() => {
        const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean);
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) setActive(e.target.id);
                });
            },
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
                    {/* ========== LEFT ========== */}
                    <aside className="hidden lg:block">
                        <div className="space-y-5">
                            {/* ON THIS PAGE */}
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

                            {/* LEGAL */}
                            <div className="rounded-3xl border border-[#E1E6F0] bg-white px-3 py-5">
                                <p className="poppins mb-3 px-3 text-[13px] font-bold tracking-wide text-[#00A6E3]">LEGAL</p>
                                <ul className="space-y-1">
                                    {LEGAL_LINKS.map((l) => (
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
                                    <a href="#" className="poppins inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-[#00A6E3] hover:text-[#042C89] transition">
                                        <DownloadIcon />
                                        Download PDF
                                    </a>
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
                                            l.active
                                                ? "border-[#042C89] bg-[#042C89] text-white"
                                                : "border-[#C9D3F0] bg-white text-[#042C89]"
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
                                <article
                                    key={s.id}
                                    id={s.id}
                                    className="scroll-mt-24 border-t border-[#E1E6F0] py-9 first:mt-0"
                                >
                                    <div className="mb-4 flex items-center gap-3.5">
                                        <span
                                            className={`poppins flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[13px] font-bold ${BADGE[i % 4]}`}
                                        >
                                            {s.num}
                                        </span>
                                        <h2 className="poppins text-[19px] font-bold leading-tight text-[#042C89] sm:text-[22px]">
                                            {s.title}
                                        </h2>
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
                                        className="poppins inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#FFDE14] px-6 py-4 sm:w-auto sm:py-3 text-[13.5px] font-bold leading-none text-[#042C89] transition hover:brightness-95"
                                    >
                                        <MailIcon />
                                        <span className="sm:hidden">Email us</span>
                                        <span className="hidden sm:inline">{EMAIL}</span>
                                    </a>
                                    <a
                                        href={`tel:${PHONE.replace(/\s/g, "")}`}
                                        className="poppins inline-flex w-full items-center justify-center gap-2 rounded-full border border-white px-6 py-4 sm:w-auto sm:py-3 text-[13.5px] font-bold leading-none text-white transition hover:bg-white/10"
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

export default Content;