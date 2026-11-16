import React from "react";
import { Container } from "../../../components/common/Container";

export function FranchisePartnerProfile() {
  return (
    <section className="relative w-full py-16 md:py-24 bg-[#FAFAFA] overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Heading & Description */}
          <div className="lg:col-span-5 text-left">
            <h2 className="gasoek uppercase text-[#042C89] text-[34px] sm:text-[46px] lg:text-[54px] leading-[1.05] mb-6">
              Could you <br />
              be our next <br />
              <span className="text-[#0FCB7A]">Franchise <br />Partner?</span>
            </h2>

            <h3 className="poppins font-bold text-[#042C89] text-[17px] sm:text-[19px] mb-4">
              You know football. We'll teach you the business.
            </h3>

            <p className="poppins text-gray-600 text-[15px] sm:text-[16px] leading-[1.65]">
              We're looking for ambitious coaches with the drive, personality and
              determination to build something of their own.
            </p>
          </div>

          {/* Right Column: 4 Criteria Boxes (2x2) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5 text-left">
            {/* Box 1: What we look for */}
            <div className="bg-white rounded-[22px] p-6 border-2 border-[#00A3E8]/30 shadow-sm flex flex-col justify-between">
              <div>
                <span className="poppins text-[11px] font-black uppercase tracking-wider text-[#00A3E8] block mb-2">
                  CRITERIA 1
                </span>
                <h4 className="gasoek text-[#042C89] text-[20px] mb-4">
                  What we look for
                </h4>
                <ul className="space-y-2.5 poppins text-[13.5px] sm:text-[14px] text-gray-700">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0FCB7A]" />
                    Entrepreneurial mindset
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0FCB7A]" />
                    Driven to succeed
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0FCB7A]" />
                    Resilient and reliable
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0FCB7A]" />
                    Great with people
                  </li>
                </ul>
              </div>
            </div>

            {/* Box 2: What you'll bring */}
            <div className="bg-white rounded-[22px] p-6 border-2 border-[#0FCB7A]/30 shadow-sm flex flex-col justify-between">
              <div>
                <span className="poppins text-[11px] font-black uppercase tracking-wider text-[#0FCB7A] block mb-2">
                  CRITERIA 2
                </span>
                <h4 className="gasoek text-[#042C89] text-[20px] mb-4">
                  What you'll bring
                </h4>
                <ul className="space-y-2.5 poppins text-[13.5px] sm:text-[14px] text-gray-700">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFDD14]" />
                    A passion for football
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFDD14]" />
                    Great with children
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFDD14]" />
                    Ambition to grow
                  </li>
                </ul>
              </div>
            </div>

            {/* Box 3: Experience */}
            <div className="bg-white rounded-[22px] p-6 border-2 border-[#042C89]/20 shadow-sm flex flex-col justify-between">
              <div>
                <span className="poppins text-[11px] font-black uppercase tracking-wider text-[#042C89] block mb-2">
                  CRITERIA 3
                </span>
                <h4 className="gasoek text-[#042C89] text-[20px] mb-4">
                  Experience
                </h4>
                <ul className="space-y-2.5 poppins text-[13.5px] sm:text-[14px] text-gray-700">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#042C89]" />
                    3-5 years coaching children
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#042C89]" />
                    Experience leading coaches
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#042C89]" />
                    Comfortable with parents
                  </li>
                  <li className="flex items-center gap-2 text-gray-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00A3E8]" />
                    Business experience a bonus
                  </li>
                </ul>
              </div>
            </div>

            {/* Box 4: Your role (Green Highlighted Card) */}
            <div className="bg-[#0FCB7A] text-white rounded-[22px] p-6 shadow-md flex flex-col justify-between">
              <div>
                <span className="poppins text-[11px] font-black uppercase tracking-wider text-[#042C89] block mb-2">
                  CORE FOCUS
                </span>
                <h4 className="gasoek text-[#042C89] text-[20px] mb-4">
                  Your role
                </h4>
                <ul className="space-y-2.5 poppins text-[13.5px] sm:text-[14px] text-[#042C89] font-semibold">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    Build and lead your team
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    Grow venues and memberships
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    Maintain Samba standards
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    Take ownership of your territory
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default FranchisePartnerProfile;
