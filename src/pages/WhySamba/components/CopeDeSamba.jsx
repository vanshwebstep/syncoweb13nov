import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../../../components/common/Container';
import waveBg from 'https://webstepdev.com/demo/syncoWebsiteImages/final-cta.png';
import expPhoto from 'https://webstepdev.com/demo/syncoWebsiteImages/why-samba/exp_it.png';
import kidsPhoto from 'https://webstepdev.com/demo/syncoWebsiteImages/why-samba/experienceboys.png';

const stats = [
  { value: '2009', label: 'Year we started', bg: '#FFDE14' },
  { value: '15+', label: 'Years of Samba', bg: '#E7FAF2' },
  { value: '20,000+', label: 'Children coached', bg: '#E6F4FB' },
  { value: '4.8', label: 'Google rating', bg: '#FFF1E3' },
];

export function CopeDeSamba() {
  return (
    <section className="py-10 bg-white">
      <Container>
        {/* ===== Stats Bar ===== */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 lg:mb-12">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-[18px] sm:rounded-[22px] px-4 py-4 sm:px-6 sm:py-5"
              style={{ backgroundColor: s.bg }}
            >
              <h3 className="font-['Gasoek_One',sans-serif] font-normal text-[28px] sm:text-[36px] lg:text-[44px] leading-tight text-[#042C89]">
                {s.value}
              </h3>
              <p className="font-['Poppins',sans-serif] font-semibold text-[13px] sm:text-[15px] text-[#34353B] mt-1">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* ===== MOBILE CTA (screenshot jaisa) ===== */}
        <div
          className="md:hidden rounded-[30px] bg-cover bg-center p-4"
          style={{ backgroundImage: `url(${waveBg})` }}
        >
          <div className="rounded-[32px] bg-white px-5 pt-5 pb-8 text-center shadow-xl">
            <img
              src={expPhoto}
              alt="Experience it for yourself, and your child"
              className="block w-full h-auto rounded-[24px] object-cover"
            />

            <h2 className="mt-6 leading-[1.15]">
              <span className="gasoek block text-[40px] text-[#0B9AE0]">Experience it</span>
              <span className="recline mt-1 block text-[34px] text-[#042C89]">
                for yourself, and your child
              </span>
            </h2>

            <p className="poppins mt-4 text-[18px] leading-[1.5] text-[#475569]">
              You've heard our story, now come and see how it works.
            </p>

            <Link
              to="/book-trial"
              className="poppins mt-6 flex w-full items-center justify-center rounded-full bg-[#042C89] px-6 py-4 text-[16px] font-bold text-white shadow-md transition-all active:scale-95"
            >
              Book a FREE trial
            </Link>
          </div>
        </div>

        {/* ===== DESKTOP CTA (same as before) ===== */}
        <div
          className="hidden md:block relative rounded-[44px] lg:rounded-[60px] overflow-hidden mx-auto md:min-h-[400px] lg:min-h-[480px]"
          style={{
            backgroundImage: `url(${waveBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 flex items-center">
            <div className="absolute left-[4%] top-1/2 -translate-y-1/2 z-20 w-[28%] lg:w-[27%]">
              <img
                src={expPhoto}
                alt="Experience it for yourself, and your child"
                className="w-full h-auto object-contain rounded-[24px] lg:rounded-[32px] drop-shadow-lg block"
              />
            </div>

            <div className="absolute z-10 left-[26%] right-[5%] top-1/2 -translate-y-1/2 bg-white rounded-[44px] lg:rounded-[56px] shadow-xl pt-8 pb-8 pl-[8%] pr-6 lg:py-12 lg:pl-[9%] lg:pr-10">
              <p className="font-['Poppins',sans-serif] font-medium text-[#042C89] text-[14px] lg:text-[16px]">
                You've heard our story.
              </p>

              <h2 className="font-['Gasoek_One',sans-serif] font-normal text-[#042C89] leading-[1.15] text-[26px] lg:text-[44px] xl:text-[52px] mt-2">
                Now come and <br />
                experience it.
              </h2>

              <p className="font-['Poppins',sans-serif] text-[#34353B] text-[14px] lg:text-[15px] mt-3 mb-5 lg:mb-6">
                Bring your child to a free trial and see how it works.
              </p>

              <div className="flex flex-row gap-3">
                <Link
                  to="/book-trial"
                  className="inline-flex items-center justify-center gap-2 bg-[#042C89] hover:bg-[#032066] text-white font-['Poppins',sans-serif] font-semibold text-[13px] lg:text-[16px] px-6 lg:px-12 py-3 lg:py-3.5 rounded-full shadow-md transition-all duration-300 hover:scale-[1.03] active:scale-95 whitespace-nowrap"
                >
                  Book a FREE trial <span aria-hidden>→</span>
                </Link>
                <Link
                  to="/find-a-class"
                  className="inline-flex items-center justify-center bg-white border-[1.5px] border-[#042C89] text-[#042C89] hover:bg-[#042C89] hover:text-white font-['Poppins',sans-serif] font-semibold text-[13px] lg:text-[16px] px-6 lg:px-12 py-3 lg:py-3.5 rounded-full transition-all duration-300 whitespace-nowrap"
                >
                  Find a class
                </Link>
              </div>
            </div>

            <div className="absolute z-20 right-[-2%] bottom-0 w-[33%]">
              <img src={kidsPhoto} alt="Samba kids" className="w-full h-auto object-contain block" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default CopeDeSamba;