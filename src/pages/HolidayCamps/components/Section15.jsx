import React, { useState, useEffect } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Container } from '../../../components/common/Container';
import faqBg from 'https://webstepdev.com/demo/syncoWebsiteImages/texture.png';

const SWOOSH = 'https://webstepdev.com/demo/syncoWebsiteImages/roadtorio/Swoosh.png';
const FAQ_URL = 'https://api.grabbite.com/api/open/faqs?serviceType=holiday_camp';

// Screenshot wali FAQs. Answers API se auto-fill hote hain (question text match hone par).
const STATIC_FAQS = [
  {
    q: 'Does my child need to play football already?',
    a: 'No. Skills Accelerator has three ability levels, so children take part at the right level for their game.',
  },
  { q: 'What will they learn?', a: '' },
  { q: 'What is the Road to Rio Map?', a: '' },
  { q: 'What happens on the final day?', a: '' },
  { q: 'Can I book individual days?', a: '' },
  { q: 'What are drop-off and collection times?', a: '' },
  { q: 'Do they need to bring lunch?', a: '' },
  { q: 'What should they wear?', a: '' },
  { q: 'What if my child is a complete beginner?', a: '' },
];

const normalize = (s = '') => s.toLowerCase().replace(/[^a-z0-9]/g, '');

export function Section15() {
  const [faqs, setFaqs] = useState(STATIC_FAQS);
  const [openIdx, setOpenIdx] = useState(0); // null = sab band

  useEffect(() => {
    let isMounted = true;

    fetch(FAQ_URL, { method: 'GET', redirect: 'follow' })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`))))
      .then((result) => {
        const list =
          result?.data?.faqs ||
          result?.data ||
          result?.faqs ||
          (Array.isArray(result) ? result : []);
        if (!isMounted || !Array.isArray(list) || list.length === 0) return;

        const activeList = list
          .filter((item) => !item.status || item.status === 'active')
          .sort((a, b) => (Number(a.sortOrder) || 0) - (Number(b.sortOrder) || 0));

        const apiMap = {};
        activeList.forEach((item) => {
          const key = normalize(item.question || item.q);
          if (key) apiMap[key] = { q: item.question || item.q, a: item.answer || item.a || '' };
        });

        setFaqs(() => {
          // 1) static list me answers fill karo
          const merged = STATIC_FAQS.map((f) => ({
            ...f,
            a: apiMap[normalize(f.q)]?.a || f.a,
          }));
          // 2) API me jo extra questions hain (static me nahi), wo neeche add karo
          const staticKeys = new Set(STATIC_FAQS.map((f) => normalize(f.q)));
          const extras = Object.entries(apiMap)
            .filter(([key]) => !staticKeys.has(key))
            .map(([, v]) => v);
          return [...merged, ...extras];
        });
      })
      .catch((err) => console.warn('FAQ API failed, using static FAQs:', err));

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section
      className="relative overflow-hidden bg-white py-14 sm:py-16 lg:py-20"
      style={{
        backgroundImage: `url(${faqBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Container className="relative z-10">
        {/* ===== Heading ===== */}
        <div className="text-center">
          <p className="font-['Poppins',sans-serif] font-semibold text-[#00A6E3] text-[11px] lg:text-[13px] tracking-[0.06em] uppercase">
            FAQs
          </p>
          <h2 className="mt-3 leading-[1.1]">
            <span className="block font-['Recline',sans-serif] font-bold text-[#042C89] text-[30px] sm:text-[36px] lg:text-[44px]">
              Questions
            </span>
            <span className="relative inline-block font-['Gasoek_One',sans-serif] text-[#0DD180] text-[36px] sm:text-[44px] lg:text-[54px] mt-1">
              parents ask.
              <img src={SWOOSH} alt="" aria-hidden="true" className="absolute left-0 -bottom-2 w-full h-auto pointer-events-none select-none" />
            </span>
          </h2>
        </div>

        {/* ===== Accordion ===== */}
        <div className="mt-10 lg:mt-12 max-w-[880px] mx-auto space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={faq.q}
                className={`bg-white rounded-[18px] border shadow-[0_2px_10px_rgba(4,44,137,0.04)] transition-colors ${
                  isOpen ? 'border-[#00A6E3]' : 'border-[#E8ECF5]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 text-left px-5 sm:px-7 py-4 lg:py-[18px] cursor-pointer"
                >
                  <h3 className="font-['Poppins',sans-serif] font-bold text-[#042C89] text-[14px] sm:text-[15px] lg:text-[17px] leading-snug">
                    {faq.q}
                  </h3>
                  <span
                    className={`shrink-0 w-7 h-7 lg:w-8 lg:h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${
                      isOpen ? 'bg-[#042C89] text-white' : 'bg-[#EEF2FA] text-[#042C89]'
                    }`}
                  >
                    {isOpen ? <Minus className="w-4 h-4 stroke-[2.5]" /> : <Plus className="w-4 h-4 stroke-[2.5]" />}
                  </span>
                </button>

                {isOpen && faq.a && (
                  <div
                    className="px-5 sm:px-7 pb-5 -mt-1 font-['Poppins',sans-serif] font-normal text-[#4B5268] text-[13px] lg:text-[15px] leading-relaxed [&>p]:mb-1 [&>p:last-child]:mb-0"
                    dangerouslySetInnerHTML={{ __html: faq.a }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default Section15;