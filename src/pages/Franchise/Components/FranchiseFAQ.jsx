import React, { useState } from "react";
import { Container } from "../../../components/common/Container";
import { useModal } from "../../../context/ModalContext";

const faqs = [
  {
    question: "Do I need coaching experience?",
    answer:
      "Coaching experience is valuable, especially working with children aged 4–12, but your passion for player development and leadership ability are what matter most. We provide complete training in the Samba Method and football operations.",
  },
  {
    question: "How much of my time will it take?",
    answer:
      "In the initial phase, launching your first venues will take around 15–20 hours a week. As your memberships and coaching team grow, you can scale into a full-time business or lead as a managing director.",
  },
  {
    question: "How big is a territory?",
    answer:
      "Every Samba franchise territory is completely exclusive and mapped around viable school catchments, venue density, and child demographics, typically encompassing a population of 100,000 to 150,000 residents.",
  },
  {
    question: "Can I get funding?",
    answer:
      "Yes. Samba Soccer Schools is eligible for government-backed Start Up Loans of up to £25,000 per partner at favorable fixed interest rates, alongside various asset finance options.",
  },
  {
    question: "How long until I launch?",
    answer:
      "From signing your franchise agreement and completing initial training, most partners launch their first venues and welcome their first cohort of children within 6 to 8 weeks.",
  },
  {
    question: "What ongoing fees are there?",
    answer:
      "We operate on a transparent model: a low management services fee (10% to 15% depending on territory tier) which covers continuous technology, marketing assets, venue support, and curriculum updates.",
  },
];

export function FranchiseFAQ() {
  const { openModal } = useModal();
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => setOpenIndex(openIndex === idx ? -1 : idx);

  const handleBooking = () => {
    const el = document.getElementById("samba-application");
    if (el) el.scrollIntoView({ behavior: "smooth" });
    else openModal("booking");
  };

  return (
    <section className="relative w-full py-16 md:py-24 bg-[#F6F8FC] overflow-hidden text-left">
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 lg:gap-10">
          {/* Left */}
          <div className="w-full lg:flex-1 lg:min-w-0">
            <span className="poppins block text-[#0DD180] font-semibold text-[14px] tracking-wide uppercase mb-4">
              FAQs
            </span>

            <h2 className="mb-5">
              <span className="recline text-[#042C89] block text-[34px] sm:text-[44px] lg:text-[52px] leading-[1.1]">
                Questions?
              </span>
              <span className="gasoek text-[#0DD180] md:block text-[32px] sm:text-[40px] lg:text-[46px] leading-[1.1]">
                We’ve got
              </span>
              <span className="gasoek text-[#0DD180] md:block text-[32px] sm:text-[40px] lg:text-[46px] leading-[1.1]">
                answers.
              </span>
            </h2>

            <p className="poppins text-[#475569] text-[14px] sm:text-[18px] leading-[1.5] max-w-[300px] md:mb-8">
              Still unsure? We’re happy to talk it through on a call.
            </p>

            <button
              onClick={handleBooking}
              className="poppins hidden md:inline-flex items-center gap-2 bg-[#FFDE14] hover:bg-[#ffe338] text-[#042C89] font-bold text-[17px] px-8 py-3.5 rounded-full hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              Book a discovery call
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </div>

          {/* Right: Accordion */}
          <div className="w-full lg:w-[720px] lg:max-w-[720px] lg:shrink-0 space-y-3.5">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={faq.question}
                  className={`rounded-[20px] bg-white overflow-hidden transition-all duration-200 ${
                    isOpen ? "border-2 border-[#0DD180]" : "border border-[#E5EAF3]"
                  }`}
                >
                  <button
                    onClick={() => toggle(idx)}
                    className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left cursor-pointer"
                  >
                    <span className="recline text-[#042C89] font-bold text-[19px] leading-snug">
                      {faq.question}
                    </span>
                    <span
                      className={`w-[32px] h-[32px] rounded-full flex items-center justify-center shrink-0 transition-colors ${
                        isOpen ? "bg-[#0DD180] text-white" : "bg-[#F6F8FC] text-[#042C89]"
                      }`}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                        {isOpen ? <path d="M5 12h14" /> : <path d="M12 5v14M5 12h14" />}
                      </svg>
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 -mt-1">
                      <p className="poppins text-[#475569] text-[16px] leading-[1.5] pr-10">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

           <button
              onClick={handleBooking}
              className="poppins block md:hidden w-full inline-flex items-center justify-center gap-2 bg-[#FFDE14] hover:bg-[#ffe338] text-[#042C89] font-bold text-[17px] px-8 py-3.5 rounded-full hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              Book a discovery call
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
        </div>
      </Container>
    </section>
  );
}

export default FranchiseFAQ;