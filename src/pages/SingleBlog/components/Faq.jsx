import React, { useState } from 'react';
import { Container } from '../../../components/common/Container';
import faqBg from 'https://webstepdev.com/demo/syncoWebsiteImages/blog/faqBg.png';



function FaqItem({ item, isOpen, onToggle }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm px-5 py-4 md:px-6 md:py-8">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between text-left"
      >
        <span className={`text-[15px] md:text-[16px] font-medium text-[#000] ${isOpen ? 'pb-3' : ''} `}>
          {item.question}
        </span>
        <span
          className={`ml-4 shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 9l6 6 6-6"
              stroke="#1a1a2e"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <hr className="border-[#9E9FAA] mb-3" />
          {typeof item.answer === 'string' ? (
            <div
              className="text-[13px] md:text-[16px] text-gray-500 leading-relaxed [&>a]:text-[#0DD180] [&>a]:underline"
              dangerouslySetInnerHTML={{ __html: item.answer }}
            />
          ) : (
            <div className="text-[13px] md:text-[14px] text-gray-500 leading-relaxed">
              {item.answer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function Faq({ faqs, blogTitle }) {
  const [openIndex, setOpenIndex] = useState(0);

  const items = Array.isArray(faqs) ? faqs : [];

  if (items.length === 0) {
    return null;
  }

  const handleToggle = (idx) => {
    setOpenIndex((prev) => (prev === idx ? -1 : idx));
  };

  return (
    <section
      className="w-full py-3 md:py-12"
      style={{
        backgroundImage: `url(${faqBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Container>
        <div className="max-w-[1240px] relative overflow-hidden rounded-[28px] md:rounded-[40px]">
          <div className="text-center py-8 lg:py-12">
            <h1 className="text-[28px] sm:text-[44px] lg:text-[48px] 2xl:text-[52px] text-[#fff] gasoek leading-tight px-4">
              <span className="text-[#0DD180] gasoek">FAQs</span>
              {blogTitle ? ` About ${blogTitle}` : ''}
            </h1>
          </div>

          <div className="max-w-[760px] mx-auto flex flex-col gap-4 pb-10 md:pb-16 px-4">
            {items.map((item, idx) => (
              <FaqItem
                key={idx}
                item={item}
                isOpen={openIndex === idx}
                onToggle={() => handleToggle(idx)}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Faq;
