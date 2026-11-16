import React from 'react';
import { Clock } from 'lucide-react';
import { Container } from '../../../components/common/Container';

import bgPattern from 'https://webstepdev.com/demo/syncoWebsiteImages/one-to-one/building.jpg';
import bgPatternMobile from 'https://webstepdev.com/demo/syncoWebsiteImages/one-to-one/building_mobile.png';
import blueBall from 'https://webstepdev.com/demo/syncoWebsiteImages/one-to-one/blue_ball.png';
import greenBall from 'https://webstepdev.com/demo/syncoWebsiteImages/gold.png';

const PLANS = [
  {
    id: 'first',
    prefix: null,
    titleLines: ['FIRST', 'SESSION'],
    price: '£45',
    perSessionAmount: null,
    perSessionLabel: null,
    duration: '60 minutes',
    ball: null,
    description:
      <>See where they are now and <br className="hidden md:inline" /> get clear feedback on what comes next.</>,
    ctaDesktop: 'Book their initial session',
    ctaMobile: 'Book initial session',
    btnClassMobile: 'bg-[#0DD180] hover:bg-[#00c853]',
    cardBorderClass: 'border border-[#E2E8F0] md:border-transparent',
  },
  {
    id: 'five',
    prefix: '5-',
    titleLines: ['SESSION', 'BLOCK'],
    price: '£275',
    perSessionAmount: '£55',
    perSessionLabel: 'per session',
    duration: null,
    ball: greenBall,
    description:
      <>Five focused sessions <br className='hidden md:block' /> targeting the areas that need the most attention.</>,
    ctaDesktop: 'Book 5 sessions',
    ctaMobile: 'Book 5 sessions',
    btnClassMobile: 'bg-[#042C89] hover:bg-[#032066]',
    cardBorderClass: 'border-2 border-[#00A6E3] md:border-transparent',
  },
  {
    id: 'ten',
    prefix: '10-',
    titleLines: ['SESSION', 'BLOCK'],
    price: '£500',
    perSessionAmount: '£50',
    perSessionLabel: 'per session',
    duration: null,
    ball: blueBall,
    descriptionDesktop:
      'Ten sessions to build confidence, consistency and long-term progress.',
    descriptionMobile:
      'Ten sessions for more time to practise, progress and build on each session.',
    ctaDesktop: 'Book 10 sessions',
    ctaMobile: 'Book 10 sessions',
    btnClassMobile: 'bg-[#0DD180] hover:bg-[#00c853]',
    cardBorderClass: 'border border-[#E2E8F0] md:border-transparent',
  },
];

export function Building() {
  const handleBook = () => {
    const appSection = document.getElementById('samba-application');
    if (appSection) {
      appSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      className="relative w-full overflow-hidden py-12 sm:py-16 lg:py-20"

    >
      <img
        src={bgPattern}
        alt="Samba Soccer One-to-One"
        className="hidden md:block absolute inset-0 w-full h-full object-cover object-top lg:object-top pointer-events-none select-none z-0"
      />
      <img
        src={bgPatternMobile}
        alt="Samba Soccer One-to-One"
        className="md:hidden block absolute inset-0 w-full h-full object-cover object-top lg:object-top pointer-events-none select-none z-0"
      />
      <Container className="relative z-10">
        {/* Heading */}
        <div className="text-center  mx-auto">
          <h2 className="gasoek text-[#042C89] text-[34px] sm:text-[46px] md:text-[67px] leading-[1.05]">
            Keep building
          </h2>
          <p className="poppins font-semibold text-[#64748B] text-[13.5px] xs:text-[14px] sm:text-[22px] leading-[1.4] sm:leading-[1.5] mt-3 sm:mt-8">
            Start with one session. Then, if they’d benefit from
            more <br className="hidden sm:inline" />individual coaching, choose how far you
            want to take it.
          </p>
        </div>

        {/* Cards: 1 column on mobile, 3 columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8 md:max-w-[854px] mx-auto mt-7 sm:mt-10 items-stretch">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`onetoone-plan-card relative bg-white rounded-[20px] shadow-[0_4px_24px_rgba(0,0,0,0.04)] px-5 pt-5 pb-5 md:pt-12 md:pb-5 flex flex-col justify-between ${plan.cardBorderClass}`}
            >
              {/* Ball image (desktop only) */}
              {plan.ball && (
                <img
                  src={plan.ball}
                  alt=""
                  aria-hidden="true"
                  className="onetoone-plan-ball hidden md:block absolute top-2 sm:top-5 right-2 sm:right-5 w-[66px] sm:w-[72px] lg:w-[76px] h-auto object-contain pointer-events-none select-none z-10"
                />
              )}

              {/* Top content area */}
              <div className="pb-3">
                {/* Title */}
                <h3 className="gasoek">
                  {/* Mobile title layout */}
                  <div className="md:hidden">
                    {plan.id === 'first' && (
                      <span className="block text-[#0DD180] text-[21px] xs:text-[23px] leading-tight">
                        FIRST SESSION
                      </span>
                    )}
                    {plan.id !== 'first' && (
                      <>
                        <span className="block text-[#0DD180] text-[20px] xs:text-[28px] leading-[1.2]">
                          {plan.prefix}
                        </span>
                        <span className="block text-[#042C89] text-[15px]  leading-[1.2]">
                          SESSION BLOCK
                        </span>
                      </>
                    )}
                  </div>

                  {/* Desktop title layout */}
                  <div className="onetoone-plan-title hidden md:block text-[22px] sm:text-[25px] lg:text-[32px] leading-[1.1]">
                    {plan.prefix ? (
                      <span className="onetoone-plan-prefix block text-[#042C89] pb-4">{plan.prefix}</span>
                    ) : (
                      <span className="block invisible select-none pb-4" aria-hidden="true">
                        &nbsp;
                      </span>
                    )}
                    <span className="onetoone-plan-line block text-[#0DD180] uppercase">{plan.titleLines[0]}</span>
                    <span className="onetoone-plan-line block text-[#0DD180] uppercase pt-1">{plan.titleLines[1]}</span>
                  </div>
                </h3>

                {/* Price */}
                <p
                  translate="no"
                  className="notranslate onetoone-plan-price gasoek text-[#00A6E3] text-[36px] xs:text-[44px] md:text-[44px] lg:text-[64px] leading-tight mt-2 sm:mt-2.5"
                >
                  {plan.price}
                </p>

                {/* Per session / duration */}
                {plan.perSessionAmount && (
                  <p className="font-bold text-[#00A6E3] text-[14px] xs:text-[15px] md:text-[22px] lg:text-[24px] recline leading-none mt-1 sm:mt-1.5">
                    <span translate="no" className="notranslate">{plan.perSessionAmount}</span>{' '}
                    <span>{plan.perSessionLabel}</span>
                  </p>
                )}
                {plan.duration && (
                  <div className="hidden md:flex items-center gap-1.5 text-[#042C89] mt-1.5 min-h-[28px] sm:min-h-[32px]">
                    <Clock className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span className="poppins font-medium text-[13px] sm:text-[14px] leading-none">
                      {plan.duration}
                    </span>
                  </div>
                )}

                {/* Description */}
                <p className="poppins text-[#64748B] font-medium text-[12.5px] xs:text-[13px] sm:text-[13.5px] leading-[1.5] mt-3.5 md:mb-5 md:min-h-[64px]">
                  {plan.id === 'ten' ? (
                    <>
                      <span className="md:hidden">{plan.descriptionMobile}</span>
                      <span className="hidden md:inline">{plan.descriptionDesktop}</span>
                    </>
                  ) : (
                    plan.description
                  )}
                </p>
              </div>

              {/* CTA Button */}
              <button
                type="button"
                onClick={handleBook}
                className={`w-full ${plan.btnClassMobile} md:bg-[#042C89] md:hover:bg-[#032066] active:scale-[0.99] text-white poppins font-semibold text-[13px] md:text-[12.5px] py-2.5 sm:py-3 px-3 rounded-full transition-all duration-200 cursor-pointer text-center`}
              >
                <span className="md:hidden">{plan.ctaMobile}</span>
                <span className="hidden md:inline">{plan.ctaDesktop}</span>
              </button>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Building;