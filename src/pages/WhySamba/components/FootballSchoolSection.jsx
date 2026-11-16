import React from 'react';
import { Container } from '../../../components/common/Container';
import bgTexture from 'https://webstepdev.com/demo/syncoWebsiteImages/why-samba/founder-web.png';
import Journey from 'https://webstepdev.com/demo/syncoWebsiteImages/Journey.png';
import bottomWave from 'https://webstepdev.com/demo/syncoWebsiteImages/why-samba/scholllayer.png';
import topLayer from 'https://webstepdev.com/demo/syncoWebsiteImages/why-samba/football-top-layer.png';
import topRightLayer from 'https://webstepdev.com/demo/syncoWebsiteImages/why-samba/top-right.png';
import bottomWaveMobile from 'https://webstepdev.com/demo/syncoWebsiteImages/why-samba/football_mobile_layer.png';
import coachCollageImg from 'https://webstepdev.com/demo/syncoWebsiteImages/why-samba/s_schools.png';

export function FootballSchoolSection() {
  return (
    <section


      style={{
        backgroundImage: `url(${bgTexture})`,
        backgroundSize: 'cover',
        backgroundPosition: 'top',
      }}
      className="relative w-full overflow-hidden font-sans  text-white pb-10 sm:py-20 lg:py-28"

    >
      <img
        src={topLayer}
        alt=""
        aria-hidden="true"
        className=" object-cover image1 hidden absolute md:block w-[60.3%] z-[9] top-[-4px] left-0  object-bottom "
      />
      <img
        src={topRightLayer}
        alt=""
        aria-hidden="true"
        className=" object-cover image2 hidden md:block absolute w-[42.6%] z-[9] right-0 top-[-4px]  "
      />

      <img
        src={Journey}
        alt=""
        aria-hidden="true"
        className=" block md:hidden absolute inset-0 left-0 w-full h-full object-top object-cover pointer-events-none z-0"
      />
      <Container className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 xl:gap-14 items-center">

          {/* Left Column: Heading & Story Copy */}
          <div className="md:col-span-7 lg:col-span-7 space-y-3 lg:space-y-4 max-w-[640px]">

            {/* Main Headings */}
            <div>
              <h2 className="recline text-white font-bold text-[38px] md:text-[38px] lg:text-[48px] xl:text-[61px] leading-tight">
                The football school {' '}
                <span className="gasoek text-[#FFDE14] font-normal md:block text-[36px] md:text-[36px] lg:text-[48px] xl:text-[61px] leading-[1.05] mt-1 mb-3 lg:mb-6">
                  I wish I'd had
                </span>
              </h2>
            </div>

            {/* Paragraph 1 */}
            <p className="poppins text-slate-100 lg:text-[18px] text-[13px] md:text-[13.5px]">
              As a child, I loved football. Nothing was more exciting to me than the skilful, creative, attack-minded game played by the Brazilians.
            </p>

            {/* Highlight 1 - Yellow */}
            <p className="poppins text-[#FFDE14] font-medium lg:text-[18px] text-[13px] md:text-[13.5px] pt-1">
              My dream was to make it. Until I got coached out of it.
            </p>

            {/* Paragraph 2 */}
            <p className="poppins text-slate-100 lg:text-[18px] text-[13px] md:text-[13.5px] pt-1">
              Ronaldinho was my hero. I tried to play like him. The tricks. The flair. The freedom. Spectators enjoyed it. My parents loved it. And most importantly, I was having the time of my life.
            </p>

            {/* Paragraph 3 */}
            <p className="poppins text-slate-100 lg:text-[18px] text-[13px] md:text-[13.5px] pt-1">
              But my coaches saw things differently. Try something creative and the shouting started.
            </p>

            {/* Quote Line - Green */}
            <p className="poppins text-[#0DD180] font-bold italic lg:text-[18px] text-[13px] md:text-[13.5px] py-1">
              “Go long!” “Get rid of it!” “Box it in!”
            </p>

            {/* Paragraph 4 */}
            <p className="poppins text-slate-100 lg:text-[18px] text-[13px] md:text-[13.5px]">
              Results mattered more than development. Training became predictable. Mistakes were punished. So I learned to play safe.
            </p>

            {/* Paragraph 5 */}
            <p className="poppins text-slate-100 lg:text-[18px] text-[13px] md:text-[13.5px] pt-1">
              My confidence dropped. I started doubting myself. Eventually, I quit.
            </p>

            {/* Paragraph 6 */}
            <p className="poppins text-slate-100 lg:text-[18px] text-[13px] md:text-[13.5px] pt-1">
              As I got older, I realised it wasn’t just me. Football was becoming more structured, more predictable and more afraid of mistakes.
            </p>

            {/* Closing Statement */}
            <div className="pt-2 lg:text-[18px] text-[13px] md:text-[13.5px]">
              <span className="poppins text-white font-bold block">
                Kids were being coached out of their creativity.
              </span>
              <span className="poppins text-[#FFDE14] font-bold block md:mt-0.5 mt-2">
                I wanted to do something about it.
              </span>
            </div>

          </div>

          {/* Right Column: Circular Overlapping Coach Photo Collage */}
          <div className="md:col-span-5 lg:col-span-5 flex justify-center lg:justify-end items-center relative">
            <div className="w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[540px]">
              <img
                src={coachCollageImg}
                alt="Samba Soccer Schools Coaches and Kids"
                className="w-full h-auto object-contain drop-shadow-2xl"
              />
            </div>
          </div>

        </div>
      </Container>

      {/* Bottom Cyan Wave Layer */}
      <div className="absolute md:bottom-0 bottom-16 w-full md:h-auto md:w-[85%] right-0  pointer-events-none z-0">
        <img
          src={bottomWave}
          alt=""
          aria-hidden="true"
          className=" object-cover hidden md:block w-full h-full object-bottom translate-y-1"
        />
        <img
          src={bottomWaveMobile}
          alt=""
          aria-hidden="true"
          className=" object-cover block md:hidden w-full h-full object-bottom translate-y-1"
        />
      </div>
    </section>
  );
}

export default FootballSchoolSection;
