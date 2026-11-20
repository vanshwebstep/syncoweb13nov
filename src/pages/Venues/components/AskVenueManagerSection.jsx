import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Container } from '../../../components/common/Container';
import { useVenue } from '../VenueContext';

const DEFAULT_FAQS = [
  {
    q: 'Is the first session really free?',
    a: 'Yes. Book a FREE trial, no card needed. If they love it, choose a plan afterwards.',
  },
  {
    q: 'What should my child wear?',
    a: 'Comfortable sportswear, trainers and shin pads. Bring a water bottle too.',
  },
  {
    q: 'Can I stay and watch?',
    a: 'Absolutely. Parents are welcome to stay and watch from the viewing area.',
  },
  {
    q: 'What if my child is shy or a total beginner?',
    a: 'No problem at all. Our coaches keep every session friendly and fun, and children are grouped by level so they feel confident from day one.',
  },
  {
    q: 'How do the monthly payments work?',
    a: 'Your first month is pro-rata. After that, you pay monthly by Direct Debit on the 1st.',
  },
  {
    q: 'Can siblings come to the same class?',
    a: 'Yes. Siblings can join the same class and you will get a sibling discount on your plan.',
  },
];

export function AskVenueManagerSection() {
  const { venue } = useVenue();
  const [openIndex, setOpenIndex] = useState(0);

  // Dynamic: use API faqs if available, else defaults
  const apiFaqs = Array.isArray(venue?.faqs)
    ? venue.faqs
        .map((f) => ({
          q: f.question || f.q || f.title,
          a: f.answer || f.a || f.description,
        }))
        .filter((f) => f.q && f.a)
    : [];
  const faqs = apiFaqs.length > 0 ? apiFaqs : DEFAULT_FAQS;

  return (
    <section className="py-12 sm:py-16 bg-white poppins">
      <Container>
        <div className="max-w-[760px] mx-auto">
          {/* Heading */}
          <div className="text-center">
            <span className="block text-[13px] font-semibold uppercase tracking-wider text-[#00A6E3]">
              FAQs
            </span>
            <h2 className="recline font-extrabold text-[40px] leading-none text-[#042C89] mt-3">
              Questions
            </h2>
            <div className="relative inline-block mt-2">
              <span
                className="absolute left-0 right-0 bottom-1 h-[6px] bg-[#FFE600] rounded-full"
                aria-hidden="true"
              />
              <span className="gasoek relative text-[50px] leading-none text-[#0DD180]">
                parents ask.
              </span>
            </div>
          </div>

          {/* Accordion */}
          <div className="mt-10 space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white border border-slate-200 rounded-[22px] px-6 transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 py-5 text-left cursor-pointer"
                  >
                    <span className="text-[17px] font-bold text-[#042C89] leading-snug">
                      {faq.q}
                    </span>
                    <span
                      className={`w-[30px] h-[30px] rounded-full flex items-center justify-center shrink-0 transition-colors ${
                        isOpen ? 'bg-[#042C89] text-white' : 'bg-[#EEF3FB] text-[#042C89]'
                      }`}
                    >
                      {isOpen ? (
                        <Minus className="w-4 h-4" strokeWidth={3} />
                      ) : (
                        <Plus className="w-4 h-4" strokeWidth={3} />
                      )}
                    </span>
                  </button>

                  {isOpen && (
                    <p className="text-[15px] text-slate-700 font-medium leading-relaxed pb-8">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}