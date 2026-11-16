import React, { useMemo } from 'react';
import { Car, SquareParking, Clock, Bike, Info } from 'lucide-react';
import { ModalShell } from './ModalShell';

const ICONS = { none: Car, street: SquareParking, dropoff: Clock, bike: Bike };

export function ParkingModal({ isOpen, onClose, venue }) {
  const hasParking = venue?.hasParking ?? false;
  const isCongested = venue?.isCongested ?? false;
  const parkingNote = (venue?.parkingNote || '').trim();

  const items = useMemo(() => {
    const list = [];

    // 1. On-site Parking
    if (hasParking) {
      list.push({
        icon: 'street',
        tone: 'info',
        title: 'On-site parking available',
        text: parkingNote || 'Parking is available on site for members and visitors.'
      });
    } else {
      list.push({
        icon: 'none',
        tone: 'warn',
        title: 'No on-site parking',
        text: parkingNote || '-'
      });
    }

    // 2. Congestion Zone
    if (isCongested) {
      list.push({
        icon: 'none',
        tone: 'warn',
        title: 'Congestion Zone',
        text: 'This venue is located within a congestion charge zone.'
      });
    } else {
      list.push({
        icon: 'dropoff',
        tone: 'info',
        title: 'Outside Congestion Zone',
        text: 'This venue is outside the congestion charge zone.'
      });
    }

    // 3. Additional parking note if not already shown in On-site Parking
    if (hasParking && parkingNote && parkingNote !== 'Parking is available on site for members and visitors.') {
      list.push({
        icon: 'dropoff',
        tone: 'info',
        title: 'Parking details',
        text: parkingNote
      });
    }

    return list;
  }, [hasParking, isCongested, parkingNote]);

  const venueTitle = venue?.venueName || venue?.name || '-';

  if (!isOpen) return null;

  return (
    <ModalShell
      isOpen={isOpen}
      onClose={onClose}
      title="Parking"
      subtitle={venueTitle}
      maxWidth="max-w-[550px]"
      headerDivider={true}
    >
      <div className="space-y-3">
        {items.map((it, i) => {
          const Icon = ICONS[it.icon] || Info;
          const warn = it.tone === 'warn';
          return (
            <div
              key={i}
              className="border border-[#E2E8F0] rounded-[22px] sm:rounded-[24px] p-4 sm:p-4.5 flex items-center gap-4 bg-white hover:border-slate-300 transition-all shadow-sm"
            >
              <span
                className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                  warn ? 'bg-[#FEF6E6] text-[#9A5B00]' : 'bg-[#EBF7FC] text-[#042C89]'
                }`}
              >
                <Icon className="w-5 h-5 stroke-[3]" />
              </span>
              <div className="min-w-0">
                <p className="text-[15px] sm:text-[16px] font-bold text-[#042C89] leading-tight">
                  {it.title}
                </p>
                <p className="text-[13px] text-[#797A88] font-normal mt-0.5 leading-snug">
                  {it.text}
                </p>
              </div>
            </div>
          );
        })}

        <div className="bg-[#EEF2F6] rounded-[20px] p-4 flex items-center gap-3.5 mt-4">
          <span className="w-10 h-10 rounded-full bg-[#34353B] text-white flex items-center justify-center shrink-0 shadow-sm">
            <Info className="w-5 h-5 text-white stroke-[3]" />
          </span>
          <div>
            <p className="text-[13px] font-bold text-[#34353B] leading-tight">Venue Access</p>
            <p className="text-[13px] text-[#34353B] font-normal mt-0.5 leading-snug">
              {venue?.facility ? `${venue.facility} facility` : '-'} · {venue?.address || '-'}
            </p>
          </div>
        </div>
      </div>
    </ModalShell>
  );
}

export default ParkingModal;
