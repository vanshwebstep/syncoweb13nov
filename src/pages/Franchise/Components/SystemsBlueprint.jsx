import React from "react";
import { Container } from "../../../components/common/Container";

const BASE = "https://webstepdev.com/demo/syncoWebsiteImages/franchise";
const MAIN_IMAGE = `${BASE}/blueprintmainpic.png`;
const ONGOING_ICON = `${BASE}/ongoingicongreen.png`;

const knowHowSteps = [
  { num: "01", title: "Foundation", desc: "Territory, venues and market", bg: "#042C89" },
  { num: "02", title: "Infrastructure", desc: "Systems, technology and set-up", bg: "#00A6E3" },
  { num: "03", title: "Football", desc: "Methodology, curriculum, coaches", bg: "#0DD180" },
  { num: "04", title: "People", desc: "Recruitment, HR and team", bg: "#042C89" },
  { num: "05", title: "Growth", desc: "Marketing, sales and customers", bg: "#00A6E3" },
  { num: "06", title: "Launch ready", desc: "Financial and operational readiness", bg: "#0DD180" },
];


const techEcosystem = [
  { name: "Samba", desc: "Customer booking system", bg: "#00A6E3", text: "#FFFFFF" },
  { name: "ParentConnect", desc: "Parent app", bg: "#0DD180", text: "#042C89" },
  { name: "Synco", desc: "Operations platform", bg: "#FFDE14", text: "#042C89" },
  { name: "CoachPro", desc: "Coach app", bg: "#042C89", text: "#FFFFFF" },
];

export function SystemsBlueprint() {
  return (
    <section className="relative w-full py-12 md:py-24 bg-white overflow-hidden">
      <Container>
        {/* Header */}
        <div className="text-center max-w-[1000px] mx-auto mb-8 sm:mb-16">
          <span className="poppins block text-[#0DD180] font-semibold text-[14px] tracking-wide uppercase mb-4">
            The systems behind you
          </span>

          <h2 className="text-[38px] sm:text-[42px] lg:text-[52px] leading-[1.1] mb-5">
            <span className="recline text-[#042C89] block">Don’t know where to start?</span>
            <span className="gasoek text-[#0DD180] block">We’ve built  <br className="md:hidden block"/> the blueprint.</span>
          </h2>

          <p className="poppins text-[#042C89] font-semibold text-[15px] sm:text-[19px] leading-[1.5]">
            15+ years of experience, training, technology and support to help you
            build your Samba business.
          </p>
        </div>

        {/* Mockup + Know-how */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-center mb-14">
          <div className="lg:col-span-8 flex justify-center">
            <img
              src={MAIN_IMAGE}
              alt="Synco dashboard and apps"
              className="w-full h-auto object-contain"
            />
          </div>

          <div className="lg:col-span-4 text-left">
            <span className="poppins text-[13px] font-bold uppercase tracking-wide text-[#0DD180] block mb-5">
              Transfer the know-how
            </span>

            <div className="relative">
              {/* Dashed connector */}
              <div className="absolute left-[18px] top-5 bottom-5 border-l-2 border-dashed border-[#C9D3F0]" />

              <div className="space-y-5">
                {knowHowSteps.map((step) => (
                  <div key={step.num} className="relative flex items-center gap-4">
                    <span
                      className="poppins relative z-10 w-[38px] h-[38px] shrink-0 rounded-full flex items-center justify-center text-white text-[13px] font-semibold"
                      style={{ backgroundColor: step.bg }}
                    >
                      {step.num}
                    </span>
                    <div>
                      <h3 className="recline text-[#042C89] text-[20px] font-bold leading-tight">
                        {step.title}
                      </h3>
                      <p className="poppins text-[#475569] text-[14px] leading-snug">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Systems boxes */} 
        <div className="grid grid-cols-2 md:grid-cols-4 justify-center gap-3 md:gap-5 mb-8">
          {techEcosystem.map((tech) => (
            <div
              key={tech.name}
              className="w-full  md:h-[140px] h-[100px] rounded-[22px] flex flex-col items-center justify-center text-center px-2 md:px-4"
              style={{ backgroundColor: tech.bg, color: tech.text }}
            >
              <h3 className="recline text-[21px] md:text-[28px] leading-tight mb-1">{tech.name}</h3>
              <p className="poppins font-semibold text-[10px] md:text-[13px] leading-tight">{tech.desc}</p>
            </div>
          ))}
        </div>

        {/* Ongoing support */}
        <div className="bg-[#F6F8FC] rounded-[24px] sm:rounded-full p-5 sm:px-6 md:py-4 flex flex-col sm:flex-row items-center sm:items-center gap-4 text-center sm:text-left">
          <div className="w-[44px] hidden md:block h-[44px] shrink-0 rounded-full bg-[#0DD180] flex items-center md:justify-center">
            <img src={ONGOING_ICON} alt="" className="w-full h-full object-contain" />
          </div>
          <div className="text-start md:text-center">
            <h4 className="recline text-[#042C89] text-[16px] md:text-[18px] font-bold leading-tight mb-0.5">
              Ongoing support, every step of the way.
            </h4>
            <p className="poppins text-[#475569] text-[12px] md:text-[15px] leading-snug">
              Regular business reviews, coaching support and guidance to help you
              stay on track and keep growing.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default SystemsBlueprint;