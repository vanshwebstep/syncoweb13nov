import React from 'react';
import { Container } from '../../../components/common/Container';

const BASE = 'https://webstepdev.com/demo/syncoWebsiteImages/roadtorio';
const img = (name, ext = 'png') => `${BASE}/${encodeURIComponent(name)}.${ext}`;

const POINTS = ['38 weeks of Samba', 'One unforgettable finale', 'Medals for every player'];

export function CopeDeSamba() {
  return (
    <section className="relative overflow-hidden bg-[#042C89] font-sans">
      {/* Background (blue + green wave) */}
      <img
        src={img('everythingleadbg')}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none z-0"
      />

      {/* Macaw */}
      <img
        src={img('Macaw')}
        alt=""
        aria-hidden="true"
        className="absolute z-10 top-3 right-3 w-[90px] sm:w-[110px] lg:top-6 lg:right-[3%] lg:w-[150px] xl:w-[170px] h-auto pointer-events-none"
      />

      <Container className="relative z-10 py-14 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* ===== Left: Photo ===== */}
          <div className="flex justify-center lg:justify-start order-2 lg:order-1">
            <img
              src={img('THEFINALE')}
              alt="Copa de Samba finale"
              className="w-full max-w-[420px] lg:max-w-[560px] h-auto object-contain drop-shadow-xl"
            />
          </div>

          {/* ===== Right: Content ===== */}
          <div className="text-white order-1 lg:order-2">
            <p className="font-['Poppins',sans-serif] font-bold text-[#FFDE14] text-[11px] lg:text-[13px] tracking-[0.06em] uppercase">
              The finale
            </p>

            <h2 className="mt-3 leading-[1.15]">
              <span className="block font-['Recline',sans-serif] font-bold text-white text-[32px] sm:text-[38px] lg:text-[42px]">
                Everything leads
              </span>
              <span className="relative inline-block font-['Gasoek_One',sans-serif] text-[#FFDE14] text-[34px] sm:text-[40px] lg:text-[46px] mt-1">
                to Copa de Samba.
                <img src={img('Swoosh')} alt="" className="absolute left-0 -bottom-2 w-full h-auto pointer-events-none" />
              </span>
            </h2>

            <p className="mt-6 max-w-[520px] font-['Poppins',sans-serif] text-white text-[14px] lg:text-[17px] leading-relaxed">
              Our end-of-year football festival. Samba players pull on the colours of Brazilian legends, take a year of
              skills into real games and play for their team.
            </p>

            <ul className="mt-6 space-y-3">
              {POINTS.map((p) => (
                <li key={p} className="flex items-center gap-3">
                  <img src={img('Group 1000002744')} alt="" className="w-[22px] h-[22px] object-contain shrink-0" />
                  <span className="font-['Poppins',sans-serif] font-bold text-white text-[14px] lg:text-[16px]">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default CopeDeSamba;