import React from "react";
import { Container } from "../../../components/common/Container";
import { useModal } from "../../../context/ModalContext";
import textureBg from 'https://webstepdev.com/demo/syncoWebsiteImages/texture.png';

const BASE = "https://webstepdev.com/demo/syncoWebsiteImages/franchise";
const RIO_IMAGE = `${BASE}/onebigadventuremainpic.png`;
const BLUE_LINE = `${BASE}/adventureblueline.png`;

export function RoadToRioAdventure() {
  const { openModal } = useModal();

  const handleBooking = () => {
    const el = document.getElementById("samba-application");
    if (el) el.scrollIntoView({ behavior: "smooth" });
    else openModal("booking");
  };

  return (
    <section style={{
            backgroundImage: `url(${textureBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundBlendMode: 'multiply'
          }}
          className="relative w-full py-16 md:py-36 bg-white overflow-hidden">
      <Container>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-2">
          {/* Left Image */}
          <div className="w-full lg:w-[46%] flex justify-center">
            <img
              src={RIO_IMAGE}
              alt="Road to Rio Adventure"
              className="w-full max-w-full h-auto object-contain"
            />
          </div>

          {/* Right Text Column */}
          <div className="w-full lg:w-[50%] text-left">
            <span className="hidden md:block poppins block text-[#042C89] font-semibold text-[14px] mb-3">
              Weekly Classes: Road to Rio
            </span>

            {/* Heading + Calendar badge */}
            <div className="flex flex-col sm:flex-row sm:items-start gap-6 mb-6">
              <div className="flex-1">
                <h2 className="road-to-rio-adventure-heading text-[44px] text-center md:text-left sm:text-[56px] lg:text-[70.2px] leading-[1.05]">
                  <span className="recline text-[#042C89] block">One big</span>
                  <span className="gasoek text-[#0DD180] relative inline-block">
                    adventure
                    <img
                      src={BLUE_LINE}
                      alt=""
                      className="adventure-blue-line absolute -bottom-3 left-0 w-full h-auto pointer-events-none"
                    />
                  </span>
                </h2>
              </div>

              {/* Calendar badge */}
              <div className="road-to-rio-badge bg-[#0DD180] absolute max-[340px]:right-[5px] max-[340px]:top-[-50px] top-[27px] right-6 md:relative rounded-[22px] md:rounded-[24px] lg:rounded-[28px] xl:rounded-[34px] 2xl:rounded-[38px] gasoek p-2.5 md:p-3 xl:p-4 2xl:p-5 text-center shrink-0 min-w-[110px] md:min-w-[115px] lg:min-w-[125px] xl:min-w-[135px] 2xl:min-w-[150px]">
                <span className="road-to-rio-badge-top block text-white text-[10px] md:text-[12px] lg:text-[14px] xl:text-[18px] 2xl:text-[22px] uppercase">
                  ROAD TO RIO
                </span>
                <span className="road-to-rio-badge-number block tracking-[1px] xl:tracking-[2px] text-[30px] md:text-[38px] lg:text-[48px] xl:text-[68px] 2xl:text-[80px] text-[#FFDE14] font-bold leading-none my-0.5 xl:my-1">
                  38
                </span>
                <span className="road-to-rio-badge-bottom block text-[#042C89] text-[16px] md:text-[17px] lg:text-[20px] xl:text-[26px] 2xl:text-[32px] lowercase">
                  sessions
                </span>
              </div>
            </div>

            <p className="poppins font-bold text-[#042C89] text-[18px] sm:text-[20px] mb-4">
              This is what makes Samba different.
            </p>

            <div className="space-y-5 poppins text-[#042C89] font-medium text-[16px] sm:text-[20px] leading-[1.5] mb-6 ">
              <p>
                Road to Rio turns weekly classes into a year-long adventure
                through Brazil. Six cities, six football legends and new skills
                to master along the way.
              </p>
              <p>
                Children collect Player Stars, earn badges and build towards the
                Copa de Samba, our huge end-of-year tournament.
              </p>
            </div>

            {/* Callout */}
            
            <div className=" pl-3 mb-8 flex gap-2">
                <div className="w-[4px] h-[60px] md:h-[50px] rounded-full bg-[#0DD180] shrink-0" />

              <p className="poppins italic font-semibold text-[#00A6E3] text-[15px] sm:text-[18px] leading-[1.4]">
                A programme children love. <br />
                A reason for families to keep coming back.
              </p>
            </div>

            <button
              onClick={handleBooking}
              className="poppins inline-flex items-center bg-[#042C89] hover:bg-[#071d63] text-white font-bold text-[20px] px-8 py-3.5 rounded-full hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              Book A Discovery Call
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default RoadToRioAdventure;