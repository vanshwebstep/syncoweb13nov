import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../../../components/common/Container';
import { useModal } from '../../../context/ModalContext';
import waveBg from 'https://webstepdev.com/demo/syncoWebsiteImages/final-cta.png';
import expPhoto from 'https://webstepdev.com/demo/syncoWebsiteImages/why-samba/exp_it.png';

export function CopeDeSamba() {
  const { openModal } = useModal();

  return (
    <section className="py-10 bg-white">
      <Container>
        {/* Outer Banner with Blue/Green Waved Background */}
        <div
          className="rounded-[30px] md:rounded-[44px] lg:rounded-[60px] p-3 py-8 xs:p-3.5 sm:p-5 md:py-8 md:px-4 lg:px-8 lg:pe-12 xl:pe-16 lg:py-[60px] max-w-[340px] xs:max-w-[365px] sm:max-w-none mx-auto relative overflow-hidden shadow-xl"
          style={{
            backgroundImage: `url(${waveBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Inner White Container Card */}
          <div className="why-samba-cta-card bg-white relative rounded-[30px] md:rounded-[40px] lg:rounded-[50px] xl:rounded-[60px] w-full md:w-[86%] xl:w-[84%] md:ms-auto shadow-xl px-4 pt-4 pb-8 xs:px-5 xs:pt-4 xs:pb-7 sm:px-8 md:pl-0 md:pr-6 md:py-8 lg:pr-8 lg:py-10 min-[1150px]:py-12 xl:pr-10 xl:py-12 flex flex-col md:flex-row items-center gap-0">
            {/* Left Column: Photo of Coaches & Kids with Trophy */}
            <div className="why-samba-cta-photo w-full md:w-[240px] lg:w-[310px] min-[1150px]:w-[360px] xl:w-[320px] 2xl:w-[320px] md:mt-0 mt-[-30px] md:absolute md:-left-[12%] md:top-1/2 md:-translate-y-1/2 shrink-0">
              <img
                src={expPhoto}
                alt="Experience it for yourself, and your child"
                className="w-full h-auto object-contain drop-shadow-lg block"
              />
            </div>

            {/* Right Column: Headings, Subtitle & Free Trial Button */}
            <div className="why-samba-cta-content w-full md:w-[360px] lg:w-[570px] min-[1150px]:w-[520px] xl:w-[660px] 2xl:w-[700px] md:ms-auto flex flex-col items-center justify-center text-center">
              <div>
                <h2 className="font-['Gasoek_One',sans-serif] leading-tight text-[28px] sm:text-[34px] md:text-[30px] lg:text-[55px] min-[1150px]:text-[40px] xl:text-[48px] text-[#00A6E3]">
                  Experience it
                </h2>
                <h3 className="font-['Recline',sans-serif] font-bold text-[26px] sm:text-[32px] md:text-[24px] lg:text-[45px] min-[1150px]:text-[38px] xl:text-[46px] text-[#042C89] leading-[1.15] mt-1">
                  <span className="block">for yourself, and your child</span>
                </h3>
              </div>

              <p className="font-['Poppins',sans-serif] text-[#475569] font-normal text-[13px] sm:text-[15px] md:text-[16px] lg:text-[16px] min-[1150px]:text-[17.5px] xl:text-[20px] leading-relaxed mt-2.5 sm:mt-3 md:mt-2.5 lg:mt-3.5 xl:mt-4 mb-4 sm:mb-5 md:mb-4 lg:mb-5 xl:mb-6">
                You've heard our story, now come and see how it works.
              </p>

              <div>
                <Link
                  to="/book-trial"
                  className="bg-[#042C89] hover:bg-[#032066] text-white font-['Poppins',sans-serif] font-bold text-[12.5px] sm:text-[15px] md:text-[13px] lg:text-[15.5px] min-[1150px]:text-[17px] xl:text-[19px] md:w-max w-full px-5 sm:px-7 md:px-5 lg:px-7 xl:px-8 py-3 sm:py-3.5 md:py-2.5 lg:py-3.5 xl:py-4 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.03] active:scale-95 inline-block cursor-pointer text-center"
                >
                  Book a FREE Trial
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default CopeDeSamba;
