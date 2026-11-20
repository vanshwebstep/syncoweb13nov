import React from 'react';
import { Container } from '../../../components/common/Container';
import textureBg from 'https://webstepdev.com/demo/syncoWebsiteImages/bluetexturebg.png';
import { useVenue } from '../../Venues/VenueContext';

import blobHeroPhoto from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/kit-image.png';
import blobHeroPhotoMobile from 'https://webstepdev.com/demo/syncoWebsiteImages/programs/kit-image-mobile.png';
import kitImg from 'https://webstepdev.com/demo/syncoWebsiteImages/play-cta-kids-smiling.png';
import ballImg from 'https://webstepdev.com/demo/syncoWebsiteImages/play-cta-kid-running.png';
import trackerImg from 'https://webstepdev.com/demo/syncoWebsiteImages/book.png';
import bagImg from 'https://webstepdev.com/demo/syncoWebsiteImages/bag.png';
import blue from 'https://webstepdev.com/demo/syncoWebsiteImages/flying-ball-motion-trail.png';

export function RightKitSection() {
  const { venue } = useVenue();

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
      desc: <>Their Road to <br /> Rio, in their <br /> hands.</>,
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
      className="py-16 pb-12 md:pb-16 bg-[#f8fafc] text-slate-800 relative overflow-hidden font-sans "
      style={{
        backgroundImage: `url(${textureBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'multiply'
      }}
    >
      <Container className="relative z-10">

        {/* Top Split: Title Copy (Left) + Organic Blob Photo (Right) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-10 items-center mb-8">

          {/* Left Column: Heading & Paragraph */}
          <div className="md:col-span-6 lg:col-span-6 space-y-4 lg:space-y-6">
            <div className=" w-full block md:hidden max-w-[700px] mb-8 overflow-hidden ">

              <img
                src={blobHeroPhotoMobile}
                alt="Samba kids team"
                className="w-full h-full object-cover"
              />


            </div>

            {/* Header Titles */}
            <div>
              <h2 className="recline font-extrabold text-[69px] sm:text-[40px] md:text-[34px] min-[900px]:text-[42px] lg:text-[48px] xl:text-[54px] 2xl:text-[61px] text-[#FFFFFF] md:leading-[1.05] leading-[1.1] tracking-[1.5px]">
                Every adventure <br />
                needs the right{' '}
                <span className="relative gasoek text-[69px] sm:text-[40px] md:text-[34px] min-[900px]:text-[42px] lg:text-[48px] xl:text-[54px] 2xl:text-[61px] text-[#0DD180] font-normal leading-[1.2] tracking-[1.5px] mt-1">
                  Kit
                  <img
                    className="absolute -bottom-4 left-0 w-full md:h-5 h-4 object-contain"
                    src={blue}
                    alt=""
                  />
                </span>
              </h2>

            </div>

            {/* Paragraph Copy */}
            <p className="text-[#FFFFFF] poppins font-semibold text-[20px] sm:text-[16px] md:text-[14px] min-[900px]:text-[16px] lg:text-[18px] xl:text-[19px] 2xl:text-[20px] leading-relaxed max-w-xl pt-2 lg:pt-5">
              Every new Samba player receives their very own Starter Pack, with everything they need to play, practise and follow their Road to Rio.
            </p>

          </div>

          {/* Right Column: Large Organic Wave Blob Photo */}
          <div className="md:col-span-6 lg:col-span-6 hidden relative md:flex justify-center">
            <div className="w-full max-w-[340px] min-[900px]:max-w-[400px] lg:max-w-[480px] xl:max-w-[580px] 2xl:max-w-[700px] -mt-0 lg:-mt-[40px] overflow-hidden">

              <img
                src={blobHeroPhoto}
                alt="Samba kids team"
                className="w-full h-full object-cover"
              />


            </div>
          </div>

        </div>

        {/* Bottom 4 Starter Pack Cards Row */}
        <div className="flex md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 xl:gap-6 overflow-x-auto md:overflow-visible flex-nowrap md:flex-wrap pb-3 md:pb-0 scrollbar-hide">
          {starterPackItems.map((item, idx) => (
            <div
              key={idx}
              className={`starter-pack-card ${item.bgColor} 
        min-w-[260px] sm:min-w-[280px] md:min-w-0 
        w-[260px] sm:w-[280px] md:w-auto
        rounded-3xl p-4 sm:p-5 lg:p-3.5 xl:p-5 2xl:p-6 text-white relative 
        flex items-center justify-between 
        hover:-translate-y-1.5 transition-all duration-300 
        border border-white/20 min-h-[145px] lg:min-h-[155px] xl:min-h-[160px] flex-shrink-0 md:flex-shrink`}
            >
              {/* Left Text */}
              <div
                className={`starter-pack-text space-y-1 ${idx === 2 ? "max-w-[55%] lg:max-w-[50%] xl:max-w-[58%]" : "max-w-[58%] lg:max-w-[54%] xl:max-w-[62%]"
                  } z-10`}
              >
                <h4 className="gasoek text-[18px] md:text-[18px] min-[900px]:text-[19px] lg:text-[17px] xl:text-[21px] 2xl:text-[24px] text-[#FFDE14] tracking-[1px] leading-tight">
                  {item.title}
                </h4>

                <p className="text-[13px] md:text-[13px] min-[900px]:text-[13.5px] lg:text-[12px] xl:text-[14px] 2xl:text-[16px] font-semibold poppins text-white leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {/* Right Image */}
              <div
                className={`starter-pack-image w-[7rem] lg:w-[5.5rem] xl:w-[7.5rem] 2xl:w-[10rem] h-full z-10 ${idx === 0 || idx === 2
                    ? "absolute right-[-10px] top-0"
                    : "absolute right-[-24px] lg:right-[-20px] xl:right-[-35px] 2xl:right-[-40px] top-0"
                  }`}
              >
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
export default RightKitSection;
