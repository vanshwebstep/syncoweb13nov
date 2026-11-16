import React, { useState, useEffect } from 'react';
import { Container } from '../../../components/common/Container';
import { ChevronUp, Loader2 } from 'lucide-react';
import faqBg from 'https://webstepdev.com/demo/syncoWebsiteImages/faqbg.png';


export function OnetoOneFAQ() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIdx, setActiveIdx] = useState(0);
  const [collapsedIndices, setCollapsedIndices] = useState({});

  useEffect(() => {
    let isMounted = true;
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };

    const fetchFaqs = async () => {
      setLoading(true);
      try {
        const localUrl = "https://api.grabbite.com/api/open/faqs?serviceType=one_to_one";
        let response;
        try {
          response = await fetch(localUrl, requestOptions);
        } catch (localErr) {
          // If local server is not reachable, fallback to live endpoint
          console.warn("Localhost fetch failed, falling back to live endpoint:", localErr);
          response = await fetch("https://api.grabbite.com/api/open/faqs?serviceType=one_to_one", requestOptions);
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        const list =
          result?.data?.faqs ||
          result?.data ||
          result?.faqs ||
          (Array.isArray(result) ? result : []);

        if (isMounted && Array.isArray(list) && list.length > 0) {
          // Filter active FAQs if status is provided, then sort by sortOrder
          const activeList = list
            .filter((item) => !item.status || item.status === 'active')
            .sort((a, b) => (Number(a.sortOrder) || 0) - (Number(b.sortOrder) || 0));

          setFaqs(activeList.length > 0 ? activeList : list);
        }
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchFaqs();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleRowClick = (idx) => {
    if (activeIdx === idx) {
      setCollapsedIndices((prev) => ({
        ...prev,
        [idx]: !prev[idx]
      }));
    } else {
      setActiveIdx(idx);
      setCollapsedIndices((prev) => ({
        ...prev,
        [idx]: false
      }));
    }
  };

  return (
    <section
      style={{
        backgroundImage: `url(${faqBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className="py-14 sm:py-[120px] md:py-20 lg:py-[120px] relative overflow-hidden"
    >
      <Container className="relative z-10">
        <div className="text-center mb-10 sm:mb-14 md:mb-12 lg:mb-14">
          <h2 className="gasoek text-3xl sm:text-4xl md:text-5xl lg:text-[61px] text-[#0DD180]">
            One-to-One FAQs
          </h2>
        </div>

        {/* Outer Frame with Thick Blue Border matching screenshot */}
        <div className="w-full max-w-[702px] grid gap-1 m-auto rounded-[30px] sm:rounded-[24px] p-3 md:p-4 lg:p-5 bg-[#F6F8FC] border-t-[4px] border-l-[4px] border-r-[10px] border-b-[10px] sm:border-t-[6px] sm:border-l-[6px] sm:border-r-[14px] sm:border-b-[14px] border-[#009FE3]">
          {loading ? (
            <div className="flex justify-center items-center py-10">
              <Loader2 className="w-8 h-8 animate-spin text-[#009FE3]" />
            </div>
          ) : (
            faqs.map((faq, idx) => {
              const isActive = activeIdx === idx;
              const isCollapsed = Boolean(collapsedIndices[idx]);
              const isBlue = idx % 2 === 0;
              const question = faq.question || faq.q || '';
              const answer = faq.answer || faq.a || '';

              return (
                <div
                  key={faq.id || idx}
                  onClick={() => handleRowClick(idx)}
                  className="w-full text-left px-4 sm:px-9 md:px-7 lg:px-9 py-3 sm:py-6 md:py-4 lg:py-6 bg-[#FDFDFF] rounded-[12px] flex items-center justify-between gap-4 sm:gap-6 cursor-pointer select-none"
                >
                  {/* Left Number + Middle Content */}
                  <div className="flex items-center gap-5 sm:gap-10 md:gap-7 lg:gap-10 flex-1 min-w-0">
                    <span
                      className={`gasoek text-2xl sm:text-3xl md:text-[28px] lg:text-[32px] leading-none select-none shrink-0 w-7 sm:w-9 text-center ${
                        isBlue ? 'text-[#009FE3]' : 'text-[#00C853]'
                      }`}
                    >
                      {idx + 1}
                    </span>

                    <div className="flex-1 min-w-0 md:pr-2">
                      <h3 className="poppins font-bold text-[#042C89] text-[16px] sm:text-[18px] md:text-[18px] lg:text-[19.5px] leading-snug">
                        {question}
                      </h3>
                      {!isCollapsed && (
                        <div
                          className="mt-1 text-[#475569] text-[13px] sm:text-[14px] font-normal poppins leading-relaxed [&>p]:mb-1 [&>p:last-child]:mb-0"
                          dangerouslySetInnerHTML={{ __html: answer }}
                        />
                      )}
                    </div>
                  </div>

                  {/* Right Arrow (ChevronUp on active item, matching screenshot) */}
                    {isActive && (
                  <div className="shrink-0 w-6 md:flex hidden justify-end">
                      <ChevronUp
                        className={`w-5 h-5 text-[#0A2558] stroke-[2.5] transition-transform duration-200 ${
                          isCollapsed ? 'rotate-180' : 'rotate-0'
                        }`}
                      />
                  </div>
                    )}
                </div>
              );
            })
          )}
        </div>
      </Container>
    </section>
  );
}

export default OnetoOneFAQ;

