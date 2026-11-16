import React from 'react';
import { BaseModal } from './BaseModal';
import { Button } from '../common/Button';
import { Calendar, Users, MapPin, Sparkles } from 'lucide-react';

export function BookingModal({ isOpen, onClose }) {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Quick Session Booking" maxWidth="max-w-md">
      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 uppercase flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-brand-blue" />
            Age Group
          </label>
          <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm font-semibold">
            <option>Junior Grassroots (U-6 to U-10)</option>
            <option>Youth Competitive (U-11 to U-15)</option>
            <option>Pro Pathway (U-16 to U-19)</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 uppercase flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-brand-green-dark" />
            Select Venue
          </label>
          <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm font-semibold">
            <option>Main Stadium Pitch (Downtown)</option>
            <option>Eastside Turf Arena</option>
            <option>North Football Complex</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 uppercase flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-brand-yellow" />
            Session Date
          </label>
          <input type="date" defaultValue="2026-09-05" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm font-semibold" />
        </div>

        <Button variant="primary" size="md" icon={Sparkles} className="w-full justify-center shadow-glow-green mt-2">
          Confirm Reservation
        </Button>
      </form>
    </BaseModal>
  );
}
