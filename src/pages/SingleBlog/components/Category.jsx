import React, { useEffect, useState } from 'react';
import { Lightbulb } from 'lucide-react';
import { Container } from '../../../components/common/Container';

export function Category({ blog }) {
  const sections = Array.isArray(blog?.sections) ? blog.sections : [];
  const hasContent = Boolean(blog?.content);
  const hasFaq = Array.isArray(blog?.faqs) && blog.faqs.length > 0;
  const [activeId, setActiveId] = useState('section-0');

  const items = [
    ...sections.map((s, i) => ({ id: `section-${i}`, label: `${i + 1}. ${s.heading || ''}` })),
    ...(hasFaq ? [{ id: 'faqs', label: `${sections.length + 1}. FAQs` }] : []),
  ];

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean);
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActiveId(e.target.id)),
      { rootMargin: '-20% 0px -65% 0px' }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
    // eslint-disable-next-line
  }, [sections.length, hasFaq]);

  const goTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  if (sections.length === 0 && !hasContent) return null;

  const intro = blog?.intro || blog?.shortDescription;

  return (
    <section id="article-content" className="w-full bg-white pt-10 pb-14 md:pt-24 lg:pb-20">
      <Container>
        <div className="mx-auto grid max-w-[1100px] gap-8 lg:grid-cols-[220px_1fr] lg:gap-14">
          {/* ===== Sidebar ===== */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-4">
              <nav className="rounded-[20px] bg-[#F4F6FC] p-4 pb-6">
                <p className="poppins mb-3 px-3 pt-2 text-[9px] font-bold uppercase tracking-wide text-[#0B8AD9]">
                  On this page
                </p>
                <ul className="space-y-1">
                  {items.map((it) => {
                    const on = activeId === it.id;
                    return (
                      <li key={it.id} className="relative">
                        {on && <span className="absolute left-[-16px] top-1/2 h-4 w-[3px] -translate-y-1/2 rounded bg-[#0DD180]" />}
                        <button
                          onClick={() => goTo(it.id)}
                          className={`poppins w-full rounded-lg px-3 py-2.5 text-left text-[11px] transition-colors ${
                            on ? 'bg-white font-bold text-[#042C89] shadow-sm' : 'font-normal text-[#34353B] hover:text-[#042C89]'
                          }`}
                        >
                          {it.label}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="rounded-[20px] bg-[#042C89] p-5">
                <p className="poppins text-[12px] font-semibold text-white">Want your child</p>
                <p className="gasoek mt-1 text-[15px] leading-[1.2] text-[#FFDE14]">coached like this?</p>
                <a
                  href="/book-a-free-trial"
                  className="poppins mt-4 block rounded-full bg-[#FFDE14] py-3 text-center text-[11px] font-bold text-[#042C89] transition-colors hover:bg-yellow-300"
                >
                  Book a FREE trial
                </a>
              </div>
            </div>
          </aside>

          {/* ===== Content ===== */}
          <div className="min-w-0">
            {intro && (
              <p className="poppins text-[15px] font-bold leading-[1.6] text-[#042C89] md:text-[16px]">{intro}</p>
            )}

            {sections.map((sec, idx) => {
              const tip = sec.tip || sec.coachTip || sec.coachesTip;
              return (
                <div key={idx} id={`section-${idx}`} className="scroll-mt-24 pt-8 md:pt-10">
                  {sec.heading && (
                    <div className="flex items-center gap-3">
                      <span
                        className={`poppins flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-white ${
                          idx % 2 === 0 ? 'bg-[#0DD180]' : 'bg-[#042C89]'
                        }`}
                      >
                        {idx + 1}
                      </span>
                      <h2 className="poppins text-[22px] font-bold leading-tight text-[#042C89]">{sec.heading}</h2>
                    </div>
                  )}

                  {sec.description && (
                    <p className="poppins mt-4 whitespace-pre-line text-[13px] leading-[1.7] text-[#34353B]">
                      {sec.description}
                    </p>
                  )}

                  {sec.image && (
                    <figure className="mt-5">
                      <img
                        src={sec.image}
                        alt={sec.heading || `Article image ${idx + 1}`}
                        className="max-h-[400px] w-full rounded-[24px] object-cover"
                      />
                      {sec.caption && (
                        <figcaption className="poppins mt-3 text-[10px] text-[#797A88]">{sec.caption}</figcaption>
                      )}
                    </figure>
                  )}

                  {sec.subDescription && (
                    <p className="poppins mt-5 whitespace-pre-line text-[13px] leading-[1.7] text-[#34353B]">
                      {sec.subDescription}
                    </p>
                  )}

                  {tip && (
                    <div className="mt-6 flex items-center gap-4 rounded-[14px] bg-[#E3F9EE] px-5 py-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0DD180] text-white">
                        <Lightbulb className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="poppins text-[8px] font-bold uppercase tracking-wide text-[#067A4A]">Coach’s tip</p>
                        <p className="poppins text-[12px] font-bold leading-[1.5] text-[#065F3B]">{tip}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {sections.length === 0 && blog?.content && (
              <div
                className="poppins text-[13px] leading-[1.7] text-[#34353B] [&>h2]:mt-8 [&>h2]:mb-3 [&>h2]:text-[22px] [&>h2]:font-bold [&>h2]:text-[#042C89] [&>p]:mb-4"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Category;