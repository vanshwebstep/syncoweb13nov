import React, { useState, useEffect } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Container } from '../../../components/common/Container';

const swoosh = 'https://webstepdev.com/demo/syncoWebsiteImages/roadtorio/Swoosh.png';
const FAQ_URL = 'https://api.grabbite.com/api/open/faqs?serviceType=birthday_party';

// Screenshot wali FAQs. Sirf pehle ka answer screenshot me dikh raha tha,
// baaki ke answers yahan likh do ya API se auto-match ho jayenge (question text same hona chahiye).
const FAQS = [
  {
    q: 'What ages are Samba parties for?',
    a: 'Our parties are for children aged 4–12, with activities adapted to different abilities.',
  },
  { q: 'Does everyone need to play football already?', a: '' },
  { q: 'Where can we hold the party?', a: '' },
  { q: 'What does Samba provide?', a: '' },
  { q: 'What do we need to provide?', a: '' },
  { q: 'Who runs the party?', a: '' },
  { q: 'Can more friends come?', a: '' },
  { q: 'What happens if it rains?', a: '' },
  { q: 'How far will Samba travel?', a: '' },
];

const normalize = (s = '') => s.toLowerCase().replace(/[^a-z0-9]/g, '');

export function BirthdayFAQ() {
  const [faqs, setFaqs] = useState(FAQS);
  const [openIdx, setOpenIdx] = useState(0); // null = sab band

  // API se answers fill karo (question text match hone par)
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

        const apiMap = {};
        list.forEach((item) => {
          const key = normalize(item.question || item.q);
          if (key) apiMap[key] = item.answer || item.a || '';
        });

        setFaqs((prev) =>
          prev.map((f) => ({
            ...f,
            a: apiMap[normalize(f.q)] || f.a,
          }))
        );
      })
      .catch((err) => console.warn('FAQ API failed, using static FAQs:', err));

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="relative bg-white py-14 sm:py-16 lg:py-20 overflow-hidden">
      <Container className="relative z-10">
        {/* ===== Heading ===== */}
        <div className="text-left md:text-center">
          <p className="font-['Poppins',sans-serif] font-semibold text-[#00A6E3] text-[11px] lg:text-[13px] tracking-[0.06em] uppercase">
            FAQs
          </p>
          <h2 className="mt-3 leading-[1.1]">
            <span className="block font-['Recline',sans-serif] font-bold text-[#042C89] text-[30px] sm:text-[36px] lg:text-[40px]">
              Birthday party
            </span>
            <span className="relative inline-block font-['Gasoek_One',sans-serif] text-[#0DD180] text-[38px] sm:text-[44px] lg:text-[50px] mt-1">
              questions.
              <img src={swoosh} alt="" aria-hidden="true" className="absolute left-0 -bottom-2 w-full h-auto pointer-events-none select-none" />
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
                className="bg-white border border-[#E8ECF5] rounded-[18px] shadow-[0_2px_10px_rgba(4,44,137,0.04)]"
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
                    className="px-5 sm:px-7 pb-5 -mt-1 font-['Poppins',sans-serif] text-[#34353B] text-[13px] lg:text-[15px] leading-relaxed [&>p]:mb-1 [&>p:last-child]:mb-0"
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

export default BirthdayFAQ;