import React from "react";
import { Container } from "../../../components/common/Container";
import { useModal } from "../../../context/ModalContext";

const BASE = "https://webstepdev.com/demo/syncoWebsiteImages/franchise";
const BG_IMAGE = `${BASE}/abusinessoftheirownbg.png`;
const BG_IMAGE_MOBILE = `${BASE}/fourbg_mb.png`;

// DEMO IMAGES (replace with original coach photos later)
const DEMO_PLACEHOLDER = null;

const partners = [
  {
    location: "Dartford & Kent",
    name: "George Trinnamen",
    role: "Dartford & Kent Partner",
    quote:
      "I wanted to build something for my family's future. What excited me about Samba was knowing I wouldn't be doing it alone.",
    image: `${BASE}/georgeTrinnamen.png`,
    color: "#0DD180", // green
  },
  {
    location: "Leeds",
    name: "Aaron Cunningham",
    role: "Leeds and Bradford Partner",
    quote:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
    image: DEMO_PLACEHOLDER,
    color: "#FFDE14", // yellow
  },
  {
    location: "Manchester",
    name: "Samuel Talmoke",
    role: "Territory · Partner since 20XX",
    quote:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
    image: DEMO_PLACEHOLDER,
    color: "#00A6E3", // light blue
  },
];

export function CoachesTestimonials() {
  const { openModal } = useModal();

  return (
    <section
      className="relative w-full pt-0 py-14 md:py-24 bg-[#00A6E3] bg-cover bg-center bg-no-repeat overflow-hidden text-center
             bg-[image:var(--bg-mobile)] md:bg-[image:var(--bg-desktop)]"
      style={{
        "--bg-mobile": `url(${BG_IMAGE_MOBILE})`,
        "--bg-desktop": `url(${BG_IMAGE})`,
        backgroundPosition: "center top",
      }}
    >
      <Container className="relative z-10">
        {/* Label */}
        <div className="poppins text-white font-semibold text-[14px] tracking-wide uppercase mb-3">
          Franchise partners
        </div>

        {/* Heading */}
        <h2 className="text-[34px] sm:text-[44px] lg:text-[54px] leading-[1.1] max-w-[900px] mx-auto mb-4">
          <span className="recline text-white block">Coaches who built</span>
          <span className="gasoek text-[#FFDE14] block">a business of their own.</span>
        </h2>

        {/* Description */}
        <p className="poppins text-white text-[16px] sm:text-[19px] max-w-[680px] mx-auto mb-12">
          They started with a passion for football. Now they're building Samba
          businesses of their own.
        </p>

        {/* Cards */}
        <div className="grid md:grid-cols-3 grid-cols-1 justify-center gap-6 lg:gap-8 mx-auto">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="bg-white rounded-[28px] p-3 w-full max-w-[380px] lg:min-h-[480px] flex flex-col text-left shadow-xl"
            >
              {/* Photo box with colored border */}
              <div className="relative">
                <div
                  className="w-full aspect-[16/9] rounded-[22px] overflow-hidden bg-[#DCE3EE] border-[5px]"
                  style={{ borderColor: partner.color }}
                >
                  {partner.image && (
                    <img
                      src={partner.image}
                      alt={partner.name}
                      className="w-full h-full object-cover object-top"
                    />
                  )}
                </div>

                {/* Location pill */}
                <span className="poppins absolute left-3 -bottom-4 bg-[#042C89] text-white text-[13px] font-semibold px-4 py-1.5 rounded-full text-center min-w-[110px]">
                  {partner.location}
                </span>
              </div>

              <div className="px-3 pt-8 pb-3 flex flex-col flex-1">
                {/* Quote mark */}
                {/* Quote mark: Gasoek One 64px */}
                <span
                  className="gasoek block text-[64px] leading-[0.7] h-[34px] mb-3 select-none"
                  style={{ color: partner.color }}
                  aria-hidden="true"
                >
                  “
                </span>

                {/* Quote */}
                <p className="poppins text-[#042C89] font-medium text-[14.5px] md:text-[16px] leading-[1.5] mb-5">
                  {partner.quote}
                </p>

                {/* Name block */}
                <div className="mt-auto pt-4 border-t border-gray-200">
                  <h3 className="recline text-[#042C89] font-bold text-[21px] leading-tight">
                    {partner.name}
                  </h3>
                  <p className="poppins text-[#475569] text-[14px] md:mt-1">
                    {partner.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12">
          <button
            onClick={() => {
              const el = document.getElementById("samba-application");
              if (el) el.scrollIntoView({ behavior: "smooth" });
              else openModal("booking");
            }}
            className="poppins inline-flex items-center justify-center gap-2 bg-[#FFDE14] hover:bg-[#ffe338] text-[#042C89] font-bold text-[17px] px-8 py-3.5 rounded-full hover:scale-105 active:scale-95 transition-all w-full md:w-max cursor-pointer"
          >
            Book a discovery call
            <svg width="22" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </Container>
    </section>
  );
}

export default CoachesTestimonials;