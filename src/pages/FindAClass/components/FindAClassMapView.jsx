
import React from 'react';
import { MapPin, List, Map as MapIcon } from 'lucide-react';
import { VenueCardCompact } from './VenueCardCompact';
import { VenueMap } from './VenueMap';

export function FindAClassMapView({
  venues,
  postcode,
  ageLabel,            // e.g. "4–5s & 6–7s"
  viewMode,            // 'list' | 'map'
  onChangeView,
  selectedVenueId,
  onSelectVenue,
  onEditSearch,
  onBookTrial,
  onBookMembership,
  onJoinWaitingList,
  userLocation
}) {
  return (
    <div className="w-full">
      {/* Compact search summary bar */}
      <div className="bg-white border border-[#CFE3F5] rounded-2xl sm:rounded-full px-4 py-2 flex items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2 min-w-0">
          <MapPin className="w-3.5 h-3.5 text-[#00A3E0] shrink-0" />
          <span className="text-xs font-extrabold text-[#061838] whitespace-nowrap">{postcode}</span>
          <span className="text-[11px] text-slate-400 truncate">· {ageLabel}</span>
        </div>
        <button
          type="button"
          onClick={onEditSearch}
          className="bg-[#E3F0FB] hover:bg-[#D2E7F8] text-[#0B2A8A] font-extrabold text-[11px] h-8 px-4 rounded-full transition-all cursor-pointer shrink-0"
        >
          Edit search
        </button>
      </div>

      {/* Heading + view toggle */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h2 className="recline text-lg sm:text-xl font-black text-[#061838] tracking-tight leading-tight">
            {venues.length} venues for {ageLabel}
          </h2>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Near {postcode} · Nearest first
          </p>
        </div>

        <div className="flex items-center bg-white border border-slate-200 rounded-full p-0.5 shrink-0">
          <button
            type="button"
            onClick={() => onChangeView('list')}
            className={`h-8 px-3.5 rounded-full text-[11px] font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              viewMode === 'list' ? 'bg-[#0B2A8A] text-white' : 'text-[#061838]'
            }`}
          >
            <List className="w-3 h-3" />
            <span>List</span>
          </button>
          <button
            type="button"
            onClick={() => onChangeView('map')}
            className={`h-8 px-3.5 rounded-full text-[11px] font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              viewMode === 'map' ? 'bg-[#0B2A8A] text-white' : 'text-[#061838]'
            }`}
          >
            <MapIcon className="w-3 h-3" />
            <span>Map</span>
          </button>
        </div>
      </div>

      {/* Split: cards (left) + map (right) */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 lg:h-[440px]">
        <div className="lg:col-span-2 space-y-3 lg:overflow-y-auto lg:pr-1 order-2 lg:order-1">
          {venues.map((venue) => (
            <VenueCardCompact
              key={venue.id}
              venue={venue}
              isSelected={venue.id === selectedVenueId}
              onSelect={() => onSelectVenue(venue.id)}
              onBookTrial={onBookTrial}
              onBookMembership={onBookMembership}
              onJoinWaitingList={onJoinWaitingList}
            />
          ))}
        </div>

        <div className="lg:col-span-3 h-[340px] lg:h-full order-1 lg:order-2">
          <VenueMap
            venues={venues}
            selectedId={selectedVenueId}
            onSelect={(v) => onSelectVenue(v.id)}
            userLocation={userLocation}
            className="h-full w-full"
          />
        </div>
      </div>
    </div>
  );
}

export default FindAClassMapView;