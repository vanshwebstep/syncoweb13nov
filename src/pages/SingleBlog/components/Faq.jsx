import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Container } from '../../../components/common/Container';
import faqBg from 'https://webstepdev.com/demo/syncoWebsiteImages/blog/faqBg.png';

function FaqItem({ item, isOpen, onToggle }) {
  return (
    <div className="rounded-[20px] bg-white px-6 py-5">
      <button onClick={onToggle} className="flex w-full items-center justify-between gap-4 text-left">
        <span className="poppins text-[13px] font-bold text-[#042C89]">{item.question}</span>
        <span
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-colors ${
            isOpen ? 'bg-[#042C89] text-white' : 'bg-[#F1F4FB] text-[#042C89]'
          }`}
        >
          {isOpen ? <Minus className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
        </span>
      </button>

      <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'mt-2 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          {typeof item.answer === 'string' ? (
            <div
              className="poppins pr-8 text-[12px] leading-[1.6] text-[#34353B] [&>a]:text-[#0DD180] [&>a]:underline"
              dangerouslySetInnerHTML={{ __html: item.answer }}
            />
          ) : (
            <div className="poppins pr-8 text-[12px] leading-[1.6] text-[#34353B]">{item.answer}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export function Faq({ faqs, blogTitle, highlight }) {
  const [openIndex, setOpenIndex] = useState(0);
  const items = Array.isArray(faqs) ? faqs : [];
  if (items.length === 0) return null;

  // highlight prop do ("planning sessions.") warna blogTitle use hoga
  const hl = highlight || blogTitle || '';

  return (
    <section
      id="faqs"
      className="w-full bg-[#042C89] bg-cover bg-center bg-no-repeat py-12 md:py-16"
      style={{ backgroundImage: `url(${faqBg})` }}
    >
      <Container>
        <div className="mb-8 text-center">
          <p className="poppins text-[10px] font-bold uppercase tracking-wide text-[#FFDE14]">FAQs</p>
          <h2 className="recline mt-3 text-[26px] leading-[1.2] text-white md:text-[28px]">Questions about</h2>
          {hl && (
            <div className="relative inline-block">
              <span className="gasoek block text-[30px] leading-[1.2] text-[#0DD180] md:text-[34px]">{hl}</span>
              <svg className="absolute -bottom-1 left-0 w-full" height="8" viewBox="0 0 200 8" preserveAspectRatio="none">
                <path d="M2 5 Q 50 1, 100 4 T 198 3" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" />
              </svg>
            </div>
          )}
        </div>

        <div className="mx-auto flex max-w-[535px] flex-col gap-3">
          {items.map((item, idx) => (
            <FaqItem
              key={idx}
              item={item}
              isOpen={openIndex === idx}
              onToggle={() => setOpenIndex((p) => (p === idx ? -1 : idx))}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Faq;