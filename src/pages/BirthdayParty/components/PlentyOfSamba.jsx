import React from 'react';
import { Container } from '../../../components/common/Container';
import bgTexture from 'https://webstepdev.com/demo/syncoWebsiteImages/birthday-party/what_happend_banner.png';

const BASE = 'https://webstepdev.com/demo/syncoWebsiteImages/birthday-party';
const img = (name, ext = 'png') => `${BASE}/${encodeURIComponent(name)}.${ext}`;
const SWOOSH = 'https://webstepdev.com/demo/syncoWebsiteImages/roadtorio/Swoosh.png';

// Folder screenshot ke hisaab se file names (extension bina). Alag ho to yahin badal lena.
const STEPS = [
  {
    time: '0 min',
    title: '1. Kick-off',
    desc: 'Samba music on and everyone welcomes the birthday star.',
    photo: 'Clippathgroup1',
    icon: 'ClipIIcongroup1',
  },
  {
    time: '15 min',
    title: '2. Ball mastery',
    desc: 'Everyone gets a ball and learns a Samba trick or two.',
    photo: 'Clippathgroup2',
    icon: 'ClipIIcongroup2',
  },
  {
    time: '35 min',
    title: '3. Challenges',
    desc: 'Fun games and skills challenges that get everyone involved.',
    photo: 'Clippathgroup3',
    icon: 'ClipIIcongroup3',
  },
  {
    time: '55 min',
    title: '4. Tournament',
    desc: 'Teams, a mini World Cup and a medal for the birthday star.',
    photo: 'Clippathgroup4',
    icon: 'ClipIIcongroup4',
  },
];

export function PlentyOfSamba() {
  return (
    <section
      style={{
        backgroundImage: `url(${bgTexture})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className="relative overflow-hidden py-12 sm:py-20 lg:py-24 md:-mt-[130px] md:pt-[200px] lg:pt-[230px]"
    >
      <Container className="relative z-10">
        {/* ===== Heading ===== */}
        <div className="text-left lg:text-center max-w-[760px] mx-auto">
          <h2 className="leading-[1.1]">
            <span className="block font-['Recline',sans-serif] font-bold text-[#042C89] text-[28px] sm:text-[36px] lg:text-[44.49px]">
              Football. Friends.
            </span>
            <span className="relative inline-block font-['Gasoek_One',sans-serif] text-[#0DD180] text-[32px] sm:text-[44px] lg:text-[55.62px] mt-1">
              Plenty of Samba.
              <img src={SWOOSH} alt="" className="absolute left-0 bottom-0 w-full h-auto pointer-events-none" />
            </span>
          </h2>

          <p className="mt-5 lg:mt-6 font-['Poppins',sans-serif] font-medium text-[#042C89] text-[14px] lg:text-[20px] leading-relaxed">
            From the first touch to the final whistle, we keep
            <br className="hidden sm:inline" /> everyone involved, moving and having fun.
          </p>
        </div>

        {/* ===== Steps ===== */}
        <div className="relative mt-8 lg:mt-14">
          {/* dotted connector (desktop) */}
          <div
            className="hidden lg:block absolute left-[12.5%] right-[12.5%] border-t-2 border-dotted border-[#C9D3E3] z-0 pointer-events-none"
            style={{ top: '298px' }}
          />

          {/* vertical timeline line (mobile/tablet) */}
          <div className="lg:hidden absolute left-[17px] top-4 bottom-4 w-[2px] bg-[#0DD180]/60 z-0 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-y-8 lg:gap-y-10 lg:gap-x-6">
            {STEPS.map((s) => (
              <div
                key={s.title}
                className="relative z-10 flex flex-col items-start lg:items-center text-left lg:text-center pl-[52px] lg:pl-0"
              >
                {/* Photo */}
                <div className="relative w-full rounded-[22px] lg:rounded-[26px] overflow-hidden shadow-[0_6px_20px_rgba(4,44,137,0.10)]">
                  <img
                    src={img(s.photo)}
                    alt={s.title}
                    className="w-full h-[170px] sm:h-[230px] lg:h-[250px] object-cover"
                  />
                  <span className="absolute top-3 left-3 bg-white text-[#042C89] font-['Poppins',sans-serif] font-semibold text-[10px] lg:text-[11px] px-3 py-1 rounded-full shadow-sm">
                    {s.time}
                  </span>
                </div>

                {/* Icon: mobile = timeline dot on the line, desktop = below photo */}
                <img
                  src={img(s.icon)}
                  alt=""
                  className="absolute left-0 top-[46px] w-[36px] h-[36px] rounded-full bg-white object-contain lg:static lg:top-auto lg:-mt-2 lg:w-[56px] lg:h-[56px] lg:bg-transparent lg:rounded-none z-10"
                />

                {/* Text */}
                <h3 className="mt-3 lg:mt-4 font-['Poppins',sans-serif] font-bold text-[#042C89] text-[16px] lg:text-[20px]">
                  {s.title}
                </h3>
                <p className="mt-1.5 lg:mt-2 max-w-[260px] lg:max-w-[260px] font-['Poppins',sans-serif] text-[#5B6B7C] text-[13px] lg:text-[14.5px] leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ===== Footnote ===== */}
        <p className="mt-10 lg:mt-14 text-left lg:text-center font-['Poppins',sans-serif] text-[#797A88] text-[12px] lg:text-[15.5px]">
          Timings shown for a 75-minute Silver party. Gold adds more games and a longer tournament.
        </p>
      </Container>
    </section>
  );
}

export default PlentyOfSamba;