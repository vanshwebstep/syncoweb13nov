import React from 'react';
import { Container } from '../../../components/common/Container';
import textureBg from 'https://webstepdev.com/demo/syncoWebsiteImages/texture.png';
import { useVenue } from '../VenueContext';

import blobHeroPhoto from 'https://webstepdev.com/demo/syncoWebsiteImages/venues/picture2.png';
import kitImg from 'https://webstepdev.com/demo/syncoWebsiteImages/play-cta-kids-smiling.png';
import ballImg from 'https://webstepdev.com/demo/syncoWebsiteImages/play-cta-kid-running.png';
import trackerImg from 'https://webstepdev.com/demo/syncoWebsiteImages/book.png';
import bagImg from 'https://webstepdev.com/demo/syncoWebsiteImages/bag.png';

export function PackBagsRioSection() {
  const { venue } = useVenue();
  const starterPrice = venue?.starterPacks?.[0]?.price ? ` (£${venue.starterPacks[0].price})` : '';

  const starterPackItems = [
    {
      title: "Samba Kit",
      desc: <>Shirt. Shorts. <br /> Socks. Welcome to the team.</>,
      bgColor: "bg-[#0DD180]",
      img: kitImg
    },
    {
      title: "Samba Skills Ball",
      desc: "Their own ball for practising between sessions.",
      bgColor: "bg-[#00A6E3]",
      img: ballImg
    },
    {
      title: "Skills Tracker",
      desc: <>Their Road to <br/> Rio, in their hands.</>,
        bgColor: "bg-[#0DD180]",
        img: trackerImg
    },
        {
          title: "Samba Bag",
        desc: "Pack it up. Bring it back next week. Carry it all the way to Rio",
        bgColor: "bg-[#00A6E3]",
        img: bagImg
    }
        ];

        return (
        <section
          className="py-16 sm:py-20 bg-[#f8fafc] text-slate-800 relative overflow-hidden font-sans "
          style={{
            backgroundImage: `url(${textureBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundBlendMode: 'multiply'
          }}
        >
          <Container className="relative z-10">

            {/* Top Split: Title Copy (Left) + Organic Blob Photo (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">

              {/* Left Column: Heading & Paragraph */}
              <div className="lg:col-span-6 space-y-6">

                {/* Header Titles */}
                <div>
                  <h2 className="recline font-extrabold text-4xl sm:text-5xl lg:text-[52px] xl:text-[61px] text-[#042C89] leading-tight">
                    Pack your bags.
                  </h2>
                  <h3 className="gasoek text-4xl sm:text-5xl lg:text-[52px] xl:text-[61px] text-[#0DD180] leading-[1.2] mt-1">
                    We're going <br />
                    to Rio
                  </h3>
                </div>

                {/* Paragraph Copy */}
                <p className="text-[#042C89] poppins font-medium text-sm sm:text-[20px] leading-relaxed max-w-xl pt-2">
                  Every new Samba player gets their Starter Pack{starterPrice} — everything they need to play, practise and follow their Road to Rio.
                </p>

              </div>

              {/* Right Column: Large Organic Wave Blob Photo */}
              <div className="lg:col-span-6 relative flex justify-center">
                <div className="relative w-full max-w-xl  overflow-hidden ">

                  <img
                    src={blobHeroPhoto}
                    alt="Samba kids team"
                    className="w-full h-full object-cover"
                  />


                </div>
              </div>

            </div>

            {/* Bottom 4 Starter Pack Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-6">
              {starterPackItems.map((item, idx) => (
                <div
                  key={idx}
                  className={`${item.bgColor} rounded-3xl p-4 sm:p-6 text-white relative flex items-center justify-between hover:-translate-y-1.5 transition-all duration-300 border border-white/20 min-h-[160px] overflow-hidden`}
                >
                  {/* Left Text */}
                  <div className={`space-y-1 ${idx == 2 ? "max-w-[55%] xl:max-w-[60%]" : "max-w-[58%] xl:max-w-[65%]"} z-10`}>
                    <h4 className="gasoek text-[18px] sm:text-[20px] xl:text-[24px] text-[#FFDE14] tracking-[1px] leading-tight">
                      {item.title}
                    </h4>
                    <p className="text-[13px] sm:text-[14px] xl:text-[16px] font-semibold poppins text-white leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  {/* Right Image */}
                  <div className={`w-[7.5rem] xl:w-[10rem] ${idx === 0 || idx == 2 ? 'absolute right-[-10px] top-[0px]' : 'absolute right-[-30px] xl:right-[-40px] top-[0px]'} h-full z-[9999]`}>
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-contain"
                    />
                  </div>

                </div>
              ))}
            </div>

          </Container>
        </section>
        );
}
