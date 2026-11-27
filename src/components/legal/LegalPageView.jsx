import React, { useEffect, useState } from "react";
import Banner from "../../pages/Terms/Components/hero.jsx";
import Content from "../../pages/Terms/Components/content.jsx";
import PageMeta from "../common/PageMeta.jsx";

const BASE_API_URL = "https://api.grabbite.com/api/open/legal-pages";

const requestOptions = {
    method: "GET",
    redirect: "follow"
};

const SLUG_CONFIG = {
    "terms-and-conditions": {
        title1: "Terms &",
        title2: "Conditions.",
        breadcrumb: "Terms & Conditions",
        eyebrow: "LEGAL DOCUMENT",
        defaultSubtitle: "The agreement between you and Samba when you book a trial, membership, camp or event."
    },
    "privacy-policy": {
        title1: "Privacy",
        title2: "Policy.",
        breadcrumb: "Privacy Policy",
        eyebrow: "LEGAL DOCUMENT",
        defaultSubtitle: "How Samba Soccer Schools collects, uses, stores, and protects personal data."
    },
    "safeguarding-policy": {
        title1: "Safeguarding",
        title2: "Policy.",
        breadcrumb: "Safeguarding Policy",
        eyebrow: "CHILD WELFARE",
        defaultSubtitle: "Our commitment to child protection, safe recruitment, and welfare procedures at every venue."
    },
    "accessibility-statement": {
        title1: "Accessibility",
        title2: "Statement.",
        breadcrumb: "Accessibility Statement",
        eyebrow: "INCLUSION & ACCESS",
        defaultSubtitle: "How we make Samba Soccer Schools websites, portals, and coaching venues accessible to all."
    }
};

export const LegalPageView = ({ slug = "terms-and-conditions", defaultTitle = "Legal" }) => {
    const [pageData, setPageData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const slugConfig = SLUG_CONFIG[slug] || {
        title1: defaultTitle,
        title2: "",
        breadcrumb: defaultTitle,
        eyebrow: "LEGAL DOCUMENT",
        defaultSubtitle: ""
    };

    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        setError(null);
        setPageData(null); // Reset pageData so previous page's data does not linger

        window.scrollTo({ top: 0, behavior: "smooth" });

        fetch(`${BASE_API_URL}/${slug}`, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch legal page (${slug}): ${response.status} ${response.statusText}`);
                }
                return response.json();
            })
            .then((result) => {
                if (isMounted) {
                    if (result?.status && result?.data) {
                        setPageData(result.data);
                    } else if (result?.data) {
                        setPageData(result.data);
                    } else if (result?.sections) {
                        setPageData(result);
                    }
                    setLoading(false);
                }
            })
            .catch((err) => {
                console.error(`Error loading legal page [${slug}]:`, err);
                if (isMounted) {
                    setError(err.message || `Failed to load ${defaultTitle}`);
                    setLoading(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, [slug, defaultTitle]);

    const title1 = pageData?.title || slugConfig.title1;
    const title2 = pageData?.highlightTitle || slugConfig.title2;
    const breadcrumbLabel =
        pageData?.title && pageData?.highlightTitle
            ? `${pageData.title} ${pageData.highlightTitle}`.replace(/\.$/, "").trim()
            : slugConfig.breadcrumb;
    const eyebrow = pageData?.eyebrow || slugConfig.eyebrow;
    const subtitle = pageData?.subtitle || slugConfig.defaultSubtitle;
    const lastUpdated = pageData?.lastUpdatedText || "";
    const version = pageData?.version || "";

    return (
        <div className="venue-managers-page-container">
            {pageData?.seoMeta && (
                <PageMeta
                    title={pageData.seoMeta.metaTitle}
                    description={pageData.seoMeta.metaDescription}
                />
            )}
            <main className="w-full overflow-x-hidden">
                <Banner
                    breadcrumbLabel={breadcrumbLabel}
                    title1={title1}
                    title2={title2}
                    subtitle={subtitle}
                    lastUpdated={lastUpdated}
                    version={version}
                    eyebrow={eyebrow}
                    loading={loading}
                />
                <Content
                    currentSlug={slug}
                    sections={pageData?.sections || []}
                    summaryBox={pageData?.summaryBox}
                    ctaBox={pageData?.ctaBox}
                    otherPages={pageData?.otherPages || []}
                    loading={loading}
                    error={error}
                />
            </main>
        </div>
    );
};

export default LegalPageView;
