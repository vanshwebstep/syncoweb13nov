import React from 'react';
import { MapPin, ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from '../../../components/common/Button';

export function VenueCard({ venue }) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-lg hover:shadow-xl transition-all space-y-4 p-6 flex flex-col justify-between">
      <div className="space-y-4">
        <img src={venue.image} alt={venue.name} className="w-full h-48 object-cover rounded-2xl" />
        <div className="space-y-2">
          <h3 className="gasoek font-bold text-xl text-slate-900">{venue.name}</h3>
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <MapPin className="w-4 h-4 text-brand-blue shrink-0" />
            <span>{venue.location}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-brand-green-dark font-semibold">
            <ShieldCheck className="w-4 h-4 text-brand-green shrink-0" />
            <span>{venue.type}</span>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
        <span className="text-xs text-slate-500 font-semibold">{venue.phone}</span>
        <Button variant="secondary" size="sm" icon={ArrowRight} iconPosition="right">
          Book Turf
        </Button>
      </div>
    </div>
  );
}
