import React from 'react';
import { Star } from 'lucide-react';
import { Container } from '../../../components/common/Container';
import textureBg from 'https://webstepdev.com/demo/syncoWebsiteImages/venues/allroads.png';
import proofBg from 'https://webstepdev.com/demo/syncoWebsiteImages/venues/proof.png';
import { useVenue } from '../VenueContext';

import avatar1 from 'https://webstepdev.com/demo/syncoWebsiteImages/venues/testimonial-avatar-parent-1.png';
import avatar2 from 'https://webstepdev.com/demo/syncoWebsiteImages/venues/testimonial-avatar-parent-2.png';
import avatar3 from 'https://webstepdev.com/demo/syncoWebsiteImages/venues/testimonial-avatar-parent-3.png';
import vector from 'https://webstepdev.com/demo/syncoWebsiteImages/yellow-vector.png';
import blue from 'https://webstepdev.com/demo/syncoWebsiteImages/bluevector.png';
import trophyTeamPhoto from 'https://webstepdev.com/demo/syncoWebsiteImages/venues/philosophy-ball-mastery-blob.png';

export function VenueParentsAllRoadsSection() {
  const { venue, venueName, area } = useVenue();

  return (
    <div className="">

      {/* 1. Top Green Section: Parents at Samba [Location] know it best */}
      <section
        className="py-16 sm:py-20  text-white relative overflow-hidden "
        style={{
          backgroundImage: `url(${proofBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'soft-light'
        }}
      >
        <Container className="relative z-10 text-center">

          {/* Header */}
          <div className="mb-12 space-y-1">
            <h2 className="recline font-extrabold text-3xl sm:text-[64px] text-white leading-tight">
              Parents at Samba {venueName}
            </h2>
            <h3 className="gasoek text-4xl sm:text-[64px] text-white ">
              know it best
            </h3>
          </div>

          {/* 3 Testimonials Grid */}
          <div className="grid grid-cols-1 poppins lg:grid-cols-12 gap-6 mt-[80px] items-stretch">

            {/* Left Column (col-span-6): 2 Stacked Horizontal Cards */}
            <div className="lg:col-span-6 flex flex-col gap-6 justify-between">

              {/* Top Left Card: Cyan Background */}
              <div className="bg-[#00A6E3] rounded-3xl p-6 sm:p-8  flex flex-col sm:flex-row items-center gap-5 border border-white/20 hover:-translate-y-1 transition-all duration-300">
                <div className="w-24 h-24 sm:w-[150px] sm:h-[150px] rounded-full overflow-hidden shrink-0  ">
                  <img src={avatar3} alt="Parent & Student" className="w-full h-full object-cover" />
                </div>
                <div className="space-y-2 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-7 h-7 fill-[#FFDE14] text-[#FFDE14]" />
                    ))}
                  </div>
                  <p className="text-[#042C89] font-semibold text-[22px] leading-snug">
                    “Every Tuesday my son is excited to attend his session to learn new skills and listen to loud samba music!”
                  </p>
                  <span className="text-[#042C89] italic text-[15px] font-bold block pt-1">
                    Parents
                  </span>
                </div>
              </div>

              {/* Bottom Left Card: Yellow Background */}
              <div className="bg-[#FFDE14] rounded-3xl p-6 sm:p-8  flex flex-col sm:flex-row items-center gap-5 border border-white/20 hover:-translate-y-1 transition-all duration-300">
                <div className="w-24 h-24 sm:w-[150px] sm:h-[150px] rounded-full   shrink-0">
                  <img src={avatar2} alt="Parent & Student" className="w-full h-full object-cover" />
                </div>
                <div className="space-y-2 text-center sm:text-left poppins">
                  <div className="flex items-center justify-center sm:justify-start gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-7 h-7 fill-white text-white" />
                    ))}
                  </div>
                  <p className="text-[#042C89] font-semibold text-[22px] leading-snug">
                    “The coaches are fantastic with the kids. My daughter has grown so much in confidence since joining!”
                  </p>
                  <span className="text-[#042C89] italic text-[15px] font-bold block pt-1">
                    Parents
                  </span>
                </div>
              </div>

            </div>

            {/* Right Column (col-span-6): 1 Tall Vertical Green Card */}
            <div className="lg:col-span-6">
              <div className="bg-white rounded-3xl p-8 sm:p-10  flex flex-col items-center justify-center text-center h-full border border-white/20 hover:-translate-y-1 transition-all duration-300 space-y-4">

                {/* Large Circular Avatar with Yellow Border */}
                <div className="w-32 h-32 sm:w-[150px] sm:h-[150px] rounded-full overflow-hidden  shrink-0  mb-2">
                  <img src={avatar1} alt="Parent & Student" className="w-full h-full object-cover" />
                </div>

                {/* 5 Yellow Stars */}
                <div className="flex items-center gap-1 poppins">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-7 h-7 fill-[#FFDE14] text-[#FFDE14]" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-[#042C89] font-semibold text-[22px] leading-relaxed max-w-sm my-2">
                  “My son used to be shy and hesitant on the pitch. Now he's doing step-overs and smiling all the way home!”
                </p>

                {/* Author */}
                <span className="text-[#042C89] italic text-[15px] font-bold block pt-1">
                  Parents
                </span>

              </div>
            </div>

          </div>

        </Container>
      </section>

      {/* 2. Bottom Curved White Section: All roads lead to Rio */}
      <section
        className="py-16 sm:py-24 text-[#042C89]   "
        style={{
          backgroundImage: `url(${textureBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'multiply'
        }}
      >

        <Container className="relative z-10 text-center">

          {/* Top Trophy Celebrating Kids Graphic */}
          <div className="relative mx-auto mb-8 flex justify-center items-center">
            <div className="w-[600px] ">
              <img
                src={trophyTeamPhoto}
                alt="Copa de Samba Finale"
                className="w-full h-full"
              />
            </div>


          </div>

          {/* Headline */}
          <div className="space-y-1 mb-6">
            <h2 className="text-[70px] recline leading-none text-[#042C89] ">
              All roads lead
              <span className="text-[70px] block leading-none gasoek text-[#0DD180] relative">
                <div className="flex items-center justify-center gap-3">
                  <img src={vector} alt="" className="w-[45px] rotate-[175deg]" />
                  to rio
                  <img src={vector} alt="" className="w-[45px] " />
                </div>

                <img src={blue} alt="" className="w-[170px] -mt-3 m-auto" />
              </span>
            </h2>
          </div>

          {/* Paragraph Copy */}
          <p className="text-[#042C89] font-medium poppins text-xs sm:text-[22px] leading-relaxed max-w-xl mx-auto mb-6">
            Every skill, every player and every week brings them one step closer to the Copa de Samba — the grand finale of their Road to Rio.
          </p>

          {/* Cyan Highlighting Lines */}
          <p className="recline text-[#00A6E3] leading-[30px] font-bold text-sm sm:text-[24px] space-y-1 my-6">
            Brazilian colours. <br />
            Samba music. Families watching. <br />
            One massive stage.
          </p>

          {/* Bottom Summary Lines */}
          <div className="text-[#042C89] font-medium poppins text-sm sm:text-[22px] space-y-1 pt-2">
            <p>The road ends in Rio.</p>
            <p>The football stays with them.</p>
          </div>

        </Container>
      </section>

    </div>
  );
}
