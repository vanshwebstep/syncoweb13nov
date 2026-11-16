import React from 'react';
import { 
  MapPin, 
  Calendar as CalendarIcon, 
  User, 
  Check, 
  MessageCircle
} from 'lucide-react';

export function BookingSidebar({
  venue,
  selectedDate,
  childrenCount,
  childrenData = [],
  currentStep = 1,
  onChangeVenue
}) {
  const childrenList = Array.from({ length: childrenCount }).map((_, idx) => {
    return childrenData[idx] || null;
  });

  // Date is confirmed once user passes Step 2 (Pick a date) or if selectedDate exists and currentStep > 2
  const isDateConfirmed = currentStep !== 1 && currentStep !== 2 && Boolean(selectedDate);

  // Determine whether child at idx has had their details completed in previous steps
  const isChildCompleted = (idx) => {
    if (currentStep === 1 || currentStep === 2) return false;
    if (typeof currentStep === 'string' && currentStep.startsWith('child-')) {
      const activeChildIdx = parseInt(currentStep.split('-')[1], 10);
      return idx < activeChildIdx;
    }
    // 'parent', 'account', 'success'
    return true;
  };

  const IMG_BASE = 'https://webstepdev.com/demo/syncoWebsiteImages/find-a-class';

const map = `${IMG_BASE}/map_3.png`;
const calc = `${IMG_BASE}/calc_2.png`;
const user = `${IMG_BASE}/user.png`;
const chat = `${IMG_BASE}/chat.png`;

  return (
    <aside className="w-full">
      <div className="bg-white rounded-[24px] shadow-sm border border-[#E2E8F0] overflow-hidden">
        {/* Navy Header */}
        <div className="bg-[#002B9A] p-5 sm:p-8 text-white">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[#FFDE14] text-[11px] font-bold uppercase ">
              YOUR FREE TRIAL
            </span>
            <button
              type="button"
              onClick={onChangeVenue}
              className="text-white hover:underline text-[13px] font-bold transition-all cursor-pointer"
            >
              Change
            </button>
          </div>

          <h3 className="text-[18px] sm:text-[20px] font-bold text-white  leading-tight">
            {venue?.name || 'Chelsea Academy'}
          </h3>

          <div className="flex items-center gap-1.5 text-[#C9D3F0] text-[13px] mt-2">
            <img src={map} alt="map " className="w-3" />
            <span className="truncate">{venue?.address || 'Lots Road, London SW10 0AB'}</span>
          </div>
        </div>

        {/* White Summary Body */}
        <div className="p-5 sm:p-6 space-y-4 bg-white">
          {/* Picked Date Row */}
          <div className="flex items-center gap-3 pb-3  text-xs sm:text-sm">
            <div className="w-7 h-7 rounded-full bg-[#EBF7FC] text-[#00A3E0] flex items-center justify-center shrink-0">
              <img src={calc} alt="test " className="w-3" />
            </div>
            <div>
              {isDateConfirmed && selectedDate ? (
                <span className="font-bold text-[#797A88] text-[15px]">
                  {selectedDate.fullDate || selectedDate.date || 'Saturday 24 October'}
                </span>
              ) : (
                <span className="text-[#797A88] font-bold text-[15px]">
                  Pick a date
                </span>
              )}
            </div>
          </div>

          {/* Children List Status */}
          <div className="space-y-3 pb-6 border-b border-[#E2E8F0]">
            {childrenList.map((child, idx) => {
              const childNumber = idx + 1;
              const childCompleted = isChildCompleted(idx);
              const hasData = childCompleted && child && child.firstName;
              const letter = hasData ? child.firstName.charAt(0).toUpperCase() : null;

              return (
                <div key={idx} className="flex items-center gap-3">
                  {hasData ? (
                    <div className="w-7 h-7 rounded-full bg-[#00A3E0] text-white font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
                      {letter}
                    </div>
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-[#F1F5F9] text-[#94A3B8] flex items-center justify-center shrink-0">
              <img src={user} alt="test " className="w-3" />
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    {hasData ? (
                      <>
                        <div className="font-bold text-[#797A88] text-[15px] sm:text-[15px] leading-tight truncate">
                          {child.firstName}
                        </div>
                        <div className="text-[12px] text-[#797A88] font-regular leading-none mt-0.5 truncate">
                          {child.ageGroupText || `${child.age || '5'} Years · 7:15 – 8:15am`}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="font-bold text-[#797A88] text-[15px] sm:text-[15px] leading-tight">
                          Child {childNumber}
                        </div>
                        <div className="text-[12px] text-[#797A88] font-normal leading-none mt-0.5">
                          Details next
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Value Checklist */}
          <ul className="space-y-2.5 text-[12px] sm:text-[14px] font-bold text-[#34353B] pt-1">
            <li className="flex items-center gap-2.5">
              <span className="w-4 h-4 rounded-full text-[#0DD180] flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[3.5]" />
              </span>
              <span>First session is FREE</span>
            </li>
            <li className="flex items-center gap-2.5">
              <span className="w-4 h-4 rounded-full text-[#0DD180] flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[3.5]" />
              </span>
              <span>No payment or card needed</span>
            </li>
            <li className="flex items-center gap-2.5">
              <span className="w-4 h-4 rounded-full text-[#0DD180] flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[3.5]" />
              </span>
              <span>Coach feedback on their level</span>
            </li>
          </ul>
        </div>
      </div>

      {/* WhatsApp Help Row */}
      <div className="mt-6 flex items-center justify-between text-[14px] px-2">
        <a
          href="https://wa.me/442072052723"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 font-bold text-[#042C89] hover:text-[#00D084] transition-colors"
        >
          <img src={chat} alt="whatsapp for chat" className="w-4 " />
          <span>Questions? WhatsApp us</span>
        </a>

        <a 
          href="tel:02072052723"
          className="text-[#797A88] hover:text-[#797A88] font-bold text-[13px] transition-colors"
        >
          020 7205 2723
        </a>
      </div>
    </aside>
  );
}

export default BookingSidebar;
