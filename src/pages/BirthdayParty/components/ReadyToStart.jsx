import React from 'react';
import { Container } from '../../../components/common/Container';
import { useModal } from '../../../context/ModalContext';

// Images
import partyStartedImg from 'https://webstepdev.com/demo/syncoWebsiteImages/birthday-party/party_started.png';
import partyStartedImgbg from 'https://webstepdev.com/demo/syncoWebsiteImages/final-bg-yellow-green-texture.svg';

export function ReadyToStart() {
  const { openModal } = useModal();

  const handleEnquire = () => {
    const appSection = document.getElementById('samba-application');
    if (appSection) {
      appSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      openModal('booking');
    }
  };

  return (
    <section className="py-10 sm:py-18 lg:py-24 bg-[#FAFCFE] relative overflow-hidden">
      <Container>
        {/* Outer Vibrant Wavy Copacabana Banner Card */}
        <div
          style={{
            backgroundImage: `url(${partyStartedImgbg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          className="relative rounded-[30px] md:rounded-[44px] lg:rounded-[60px] p-3 py-4 sm:p-5 md:py-8 md:px-4 lg:px-8 lg:pe-12 xl:pe-16 lg:py-10 w-full mx-auto"
        >
          {/* Inner White Box Container */}
          <div className="birthday-cta-card relative w-full md:w-[92%] lg:w-[90%] xl:w-[88%] mx-auto z-10 bg-white rounded-[30px] md:rounded-[40px] lg:rounded-[50px] xl:rounded-[60px] shadow-xl px-4 pt-4 pb-7 sm:px-8 md:pl-[220px] lg:pl-[260px] min-[1150px]:pl-[290px] xl:pl-[320px] md:pr-6 md:py-7 lg:pr-8 lg:py-8 min-[1150px]:py-10 xl:pr-10 xl:py-12 flex flex-col md:flex-row items-center gap-0">
            {/* Left: Photo */}
            <div className="birthday-cta-photo w-full max-w-[320px] sm:max-w-[360px] md:max-w-none md:w-[200px] lg:w-[235px] min-[1150px]:w-[260px] xl:w-[285px] 2xl:w-[305px] md:absolute md:left-3 lg:left-4 xl:left-5 md:top-1/2 md:-translate-y-1/2 shrink-0 flex items-center justify-center">
              <img
                src={partyStartedImg}
                alt="Ready to get the party started"
                className="w-full h-auto md:max-h-[92%] object-contain drop-shadow-md block"
              />
            </div>

            {/* Right: Text & Call to Action */}
            <div className="birthday-cta-content w-full md:flex-1 flex flex-col items-start md:items-center justify-center text-left md:text-center mt-4 md:mt-0">
              {/* Cyan Heading */}
              <h2 className="gasoek text-[32px] sm:text-[40px] md:text-[24px] lg:text-[32px] min-[1150px]:text-[38px] xl:text-[44px] text-[#00A6E3] leading-[1.08] lg:leading-[1.12]">
                <span className="block">Ready to get</span>
                <span className="block md:hidden">the party</span>
                <span className="block md:hidden">started?</span>
                <span className="hidden md:block">the party started?</span>
              </h2>

              {/* Sub-text */}
              <div className="poppins font-normal text-[#475569] text-[14px] sm:text-[15px] md:text-[13px] lg:text-[14.5px] min-[1150px]:text-[16px] xl:text-[18px] leading-relaxed mt-3 md:mt-2 lg:mt-2.5 xl:mt-3 mb-5 md:mb-3.5 lg:mb-4 xl:mb-5">
                <p>
                  Tell us where, when and who's celebrating.<br className="hidden md:block" />{' '}
                  We'll take it from there.
                </p>
              </div>

              <button
                onClick={handleEnquire}
                className="bg-[#042C89] hover:bg-[#021840] text-white font-bold text-[13px] sm:text-[15px] md:text-[12.5px] lg:text-[14px] min-[1150px]:text-[16px] xl:text-[18px] md:w-max w-full whitespace-nowrap px-5 sm:px-7 md:px-5 lg:px-7 xl:px-8 py-4 sm:py-3.5 md:py-2.5 lg:py-3 xl:py-3.5 rounded-full hover:scale-105 active:scale-95 transition-all duration-200 poppins cursor-pointer text-center"
              >
                <span className="md:hidden">Enquire about a Samba birthday party</span>
                <span className="hidden md:inline">Enquire about a Samba birthday party</span>
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default ReadyToStart;