import React, { useState, useMemo, useEffect } from 'react';
import { Check, ArrowRight, ArrowLeft, Ruler, MapPin, Truck, Sparkles } from 'lucide-react';
import { KitSizeGuideModal } from './KitSizeGuideModal';
import { ChildAvatar } from './ChildAvatar';

const YELLOW_SPLASH = 'https://webstepdev.com/demo/syncoWebsiteImages/find-a-class/yellow.png';
const STARTER_BOX_IMG = '/images/find-a-class/starter-box.png';

const Tick = () => (
  <span className="w-4 h-4 rounded-full bg-[#00D084] flex items-center justify-center shrink-0 mt-0.5">
    <Check className="w-2.5 h-2.5 text-white" strokeWidth={3.5} />
  </span>
);

const SIZES = [
  { id: 'S', label: 'S', age: '4–5 yrs', name: 'Small' },
  { id: 'M', label: 'M', age: '6–7 yrs', name: 'Medium' },
  { id: 'L', label: 'L', age: '8–9 yrs', name: 'Large' },
  { id: 'XL', label: 'XL', age: '10–12 yrs', name: 'X-Large' },
  { id: 'XXL', label: 'XXL', age: '13–14 yrs', name: 'XX-Large' }
];

function getRecommendedSize(age) {
  const num = Number(age) || 5;
  if (num <= 5) return 'S';
  if (num <= 7) return 'M';
  if (num <= 9) return 'L';
  if (num <= 12) return 'XL';
  return 'XXL';
}

function getBookLevel(age) {
  const num = Number(age) || 5;
  if (num <= 5) return { level: 'Beginners', bracket: '4–5s' };
  if (num <= 8) return { level: 'Intermediate', bracket: '6–8s' };
  return { level: 'Advanced', bracket: '9–12s' };
}

export function Step6StarterPack({
  childrenData = [],
  kitsData = [],
  setKitsData,
  kitSize,
  setKitSize,
  deliveryAddress,
  setDeliveryAddress,
  isTransfer = false,
  onContinue,
  onBack
}) {
  const [activeChildIdx, setActiveChildIdx] = useState(0);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [postcodeInput, setPostcodeInput] = useState(deliveryAddress?.postcode || 'SW19 1AB');
  const [addressLine, setAddressLine] = useState(deliveryAddress?.street || '12 Merton Road');
  const [cityLine, setCityLine] = useState(deliveryAddress?.city || 'London SW19 1AB');

  const totalChildren = childrenData.length || 1;

  // Initialize kitsData if empty or length mismatch
  useEffect(() => {
    if (!setKitsData) return;
    if (!kitsData || kitsData.length !== totalChildren) {
      const initialKits = childrenData.map((c, i) => {
        const cAge = Number(c.age) || 5;
        const rec = getRecommendedSize(cAge);
        const book = getBookLevel(cAge);
        return {
          childIndex: i,
          kitSize: (i === 0 && kitSize) ? kitSize : rec,
          bookLevel: book.level,
          bracket: book.bracket
        };
      });
      setKitsData(initialKits);
    }
  }, [childrenData, totalChildren, kitsData, setKitsData, kitSize]);

  // Current active child
  const currentChild = childrenData[activeChildIdx] || childrenData[0] || {};
  const currentName = currentChild.firstName || `Child ${activeChildIdx + 1}`;
  const currentAge = Number(currentChild.age) || 5;
  const currentGender = (currentChild.gender || '').toLowerCase();
  const pronoun = currentGender.includes('girl') || currentGender.includes('female') ? 'her' : 'his';

  const bookInfo = useMemo(() => getBookLevel(currentAge), [currentAge]);
  const recSize = useMemo(() => getRecommendedSize(currentAge), [currentAge]);
  const recSizeObj = SIZES.find((s) => s.id === recSize) || SIZES[0];

  // Active child's selected kit size
  const activeKitSize = (kitsData?.[activeChildIdx]?.kitSize) || (activeChildIdx === 0 ? kitSize : recSize) || recSize;

  const handleSelectSize = (sizeId) => {
    if (activeChildIdx === 0 && setKitSize) {
      setKitSize(sizeId);
    }
    if (setKitsData) {
      setKitsData((prev) => {
        const updated = [...(prev || [])];
        if (!updated[activeChildIdx]) {
          updated[activeChildIdx] = {
            childIndex: activeChildIdx,
            kitSize: sizeId,
            bookLevel: bookInfo.level,
            bracket: bookInfo.bracket
          };
        } else {
          updated[activeChildIdx] = {
            ...updated[activeChildIdx],
            kitSize: sizeId
          };
        }
        return updated;
      });
    }
  };

  // Delivery calculation based on children count
  const deliveryCharge = totalChildren === 1 ? '4.99' : (4.99 + (totalChildren - 1) * 2.0).toFixed(2);

  const handleSaveAddress = (e) => {
    if (e) e.preventDefault();
    setDeliveryAddress({
      postcode: postcodeInput,
      street: addressLine,
      city: cityLine
    });
    setIsEditingAddress(false);
  };

  return (
    <div className="space-y-6 sm:space-y-7 animate-badge-fade-in">
      {/* Step Heading */}
      <div className="pb-2">
        <h1 className="text-[32px] sm:text-[36px] lg:text-[42px] font-bold text-[#042C89] leading-[1.05] recline">
          {totalChildren > 1 ? 'Select starter packs' : `${currentName}’s`} <br />
          <span className="relative text-[44px] sm:text-[50px] gasoek font-normal inline-block text-[#0DD180] mt-1">
            starter pack.
            <img
              src={YELLOW_SPLASH}
              alt=""
              className="absolute -bottom-2 left-0 w-[98%] object-fill pointer-events-none"
            />
          </span>
        </h1>

        <p className="text-[#797A88] font-bold text-[14px] sm:text-[16px] mt-4 sm:mt-5">
          We aim to deliver all kit boxes before {totalChildren > 1 ? 'their' : pronoun} first session.
        </p>
      </div>

      {/* Transfer Information Banner */}
      {isTransfer && (
        <div className="bg-[#E6F4FB] border border-[#00A6E3] rounded-2xl p-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#00A6E3] text-white flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <p className="font-bold text-[#042C89] text-[14px]">
              Transfer Booking · £0 Starter Pack
            </p>
            <p className="text-[12px] text-[#555660]">
              As an existing Samba student transferring classes, your current uniform and skills tracker book carry over. No new starter pack charge applies.
            </p>
          </div>
        </div>
      )}

      {/* Multi-Child Tab Selector (Shown if 2+ children) */}
      {totalChildren > 1 && (
        <div className="bg-[#EEF1F8] p-1.5 rounded-2xl">
          <p className="text-xs font-bold text-[#042C89] px-2 py-1 mb-1">
            Select kit size for each child ({totalChildren} children):
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
            {childrenData.map((child, idx) => {
              const isSelected = activeChildIdx === idx;
              const chName = child.firstName || `Child ${idx + 1}`;
              const chKit = kitsData?.[idx]?.kitSize || getRecommendedSize(child.age);

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveChildIdx(idx)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white shadow-xs border border-[#042C89] text-[#042C89]'
                      : 'bg-transparent hover:bg-white/50 text-[#64748B]'
                  }`}
                >
                  <ChildAvatar
                    firstName={chName}
                    lastName={child.lastName}
                    size="sm"
                    bgColor={isSelected ? 'bg-[#002B9A]' : 'bg-slate-400'}
                  />
                  <div className="min-w-0">
                    <span className="text-xs font-bold block truncate leading-tight">{chName}</span>
                    <span className="text-[10px] text-[#00A3E0] font-bold block mt-0.5">
                      Size: {chKit}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Starter Box Card */}
      <div className="bg-white rounded-[24px] border border-[#E2E8F0] p-5 sm:p-7 shadow-2xs">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
          {/* Box Image */}
          <div className="shrink-0 w-[170px] sm:w-[190px]">
            <img
              src={STARTER_BOX_IMG}
              alt="Starter Kit Box"
              className="w-full object-contain drop-shadow-sm"
            />
          </div>

          {/* Checklist */}
          <div className="flex-1 w-full space-y-3 pt-1">
            <div className="flex items-center justify-between pb-1">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#002B9A] bg-[#EBF7FC] px-2.5 py-1 rounded-full">
                For {currentName} (Age {currentAge})
              </span>
            </div>

            <div className="flex items-start gap-3 text-[14px] sm:text-[15px] font-bold text-[#0B2A8A]">
              <Tick />
              <span>Full kit: shirt, shorts, socks</span>
            </div>
            <div className="flex items-start gap-3 text-[14px] sm:text-[15px] font-bold text-[#0B2A8A]">
              <Tick />
              <span>Samba skills ball</span>
            </div>
            <div className="flex items-start gap-3 text-[14px] sm:text-[15px] font-bold text-[#0B2A8A]">
              <Tick />
              <span>
                Skills Tracker book:{' '}
                <strong className="text-[#00D084]">{bookInfo.level}</strong>
              </span>
            </div>
            <div className="flex items-start gap-3 text-[14px] sm:text-[15px] font-bold text-[#0B2A8A]">
              <Tick />
              <span>Samba string bag (one size)</span>
            </div>
          </div>
        </div>
      </div>

      <p className="text-[12px] sm:text-[13px] text-[#64748B] -mt-2">
        Skills Tracker book automatically selected by age ({bookInfo.bracket}: {bookInfo.level}).
      </p>

      {/* Kit Size Selection */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <label className="text-[16px] sm:text-[17px] font-bold text-[#042C89]">
            Kit size for {currentName}
          </label>
          <button
            type="button"
            onClick={() => setIsSizeGuideOpen(true)}
            className="flex items-center gap-1.5 text-[13px] font-bold text-[#00A3E0] hover:underline cursor-pointer"
          >
            <Ruler className="w-3.5 h-3.5" />
            <span>Size guide</span>
          </button>
        </div>

        {/* 5 Size Tiles */}
        <div className="grid grid-cols-5 gap-2 sm:gap-3">
          {SIZES.map((s) => {
            const isSelected = activeKitSize === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => handleSelectSize(s.id)}
                className={`rounded-[18px] sm:rounded-[20px] py-3.5 sm:py-4 px-2 text-center transition-all cursor-pointer ${
                  isSelected
                    ? 'border-2 border-[#0B2A8A] bg-[#E8F3FA] shadow-xs'
                    : 'border border-[#CBD5E1] bg-white hover:border-slate-400'
                }`}
              >
                <div className="text-[17px] sm:text-[20px] font-black text-[#0B2A8A] leading-tight">
                  {s.label}
                </div>
                <div className="text-[11px] sm:text-[12px] font-medium text-[#64748B] mt-0.5 whitespace-nowrap">
                  {s.age}
                </div>
              </button>
            );
          })}
        </div>

        {/* Recommended note */}
        <p className="text-[12px] sm:text-[13px] font-bold text-[#0D7A4A] mt-1.5 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#00D084]" />
          <span>Recommended for {currentName} (age {currentAge}): {recSizeObj.name} ({recSize}).</span>
        </p>
      </div>

      {/* All Children Kit Summary Review (if multi-child) */}
      {totalChildren > 1 && (
        <div className="bg-white border border-[#E2E8F0] rounded-[20px] p-4 space-y-2">
          <h4 className="text-xs font-bold text-[#042C89] uppercase tracking-wider">
            Starter Packs Summary ({totalChildren} children)
          </h4>
          <div className="divide-y divide-[#F1F5F9] text-xs">
            {childrenData.map((c, i) => {
              const k = kitsData?.[i]?.kitSize || getRecommendedSize(c.age);
              const b = getBookLevel(c.age);
              return (
                <div key={i} className="py-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ChildAvatar firstName={c.firstName || `Child ${i + 1}`} lastName={c.lastName} size="xs" />
                    <span className="font-bold text-[#042C89]">{c.firstName || `Child ${i + 1}`} (Age {c.age || 5})</span>
                  </div>
                  <span className="text-[#64748B] font-medium">
                    Kit Size: <strong className="text-[#042C89]">{k}</strong> · Book: <strong className="text-[#042C89]">{b.level}</strong>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Delivery Address Section */}
      <div className="space-y-3 pt-4 border-t border-[#E2E8F0]">
        <label className="block text-[16px] sm:text-[17px] font-bold text-[#042C89]">
          Delivery address
        </label>

        {isEditingAddress ? (
          <div className="bg-white rounded-[20px] border border-[#C9D3F0] p-4 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#64748B] mb-1">Street address</label>
                <input
                  type="text"
                  value={addressLine}
                  onChange={(e) => setAddressLine(e.target.value)}
                  placeholder="e.g. 12 Merton Road"
                  className="w-full h-11 px-3 rounded-xl border border-slate-300 text-sm font-medium outline-none focus:border-[#0B2A8A]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#64748B] mb-1">Postcode / City</label>
                <input
                  type="text"
                  value={postcodeInput}
                  onChange={(e) => setPostcodeInput(e.target.value)}
                  placeholder="e.g. SW19 1AB"
                  className="w-full h-11 px-3 rounded-xl border border-slate-300 text-sm font-medium outline-none focus:border-[#0B2A8A]"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setIsEditingAddress(false)}
                className="px-4 py-2 text-xs font-bold text-[#64748B] hover:text-[#0B2A8A]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveAddress}
                className="px-5 py-2 text-xs font-bold bg-[#0B2A8A] text-white rounded-full hover:bg-[#001f70]"
              >
                Save address
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white rounded-[20px] border border-[#E2E8F0] p-4 sm:px-5 sm:py-4">
            <div className="flex items-center gap-3.5">
              <div className="w-8 h-8 rounded-full bg-[#E8F3FA] flex items-center justify-center shrink-0 text-[#00A3E0]">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[14px] sm:text-[15px] font-bold text-[#0B2A8A] leading-tight">
                  {addressLine}
                </p>
                <p className="text-[12px] sm:text-[13px] text-[#64748B] mt-0.5">
                  {cityLine || postcodeInput}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsEditingAddress(true)}
              className="text-[#00A3E0] hover:underline font-bold text-[13px] self-start sm:self-center cursor-pointer"
            >
              Change
            </button>
          </div>
        )}

        {/* Royal Mail Delivery badge */}
        <div className="flex items-center gap-2 text-[12px] sm:text-[13px] font-bold text-[#00A3E0] pt-1">
          <Truck className="w-4 h-4 shrink-0" />
          <span>
            Delivery by Royal Mail · £{deliveryCharge} {totalChildren > 1 && `(combined for ${totalChildren} children)`} · 3–5 working days
          </span>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-6 border-t border-[#E2E8F0]">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-[#002B9A] hover:underline font-bold text-xs sm:text-[13px] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          type="button"
          onClick={onContinue}
          className="bg-[#002B9A] hover:bg-[#001f70] text-white font-bold text-xs sm:text-[14px] px-7 sm:px-8 py-3 rounded-full flex items-center gap-2 shadow-sm transition-all cursor-pointer active:scale-95"
        >
          <span>Continue</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Size Guide Modal */}
      <KitSizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />
    </div>
  );
}

export default Step6StarterPack;
