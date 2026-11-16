import React from 'react';
import { Container } from '../components/common/Container';
import { QuickSearch } from './Home/components/QuickSearch';
import { Calendar, Sparkles, CheckCircle2 } from 'lucide-react';

export function BookingPage() {
  return (
    <div className="py-12 space-y-12 bg-slate-50">
      <section className="bg-brand-navy text-white py-14">
        <Container>
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-green bg-brand-green/10 px-3 py-1 rounded-full border border-brand-green/30">
              Online Pitch & Session Booking
            </span>
            <h1 className="gasoek  text-4xl text-white ">
              Reserve Your Pitch Or Training Session
            </h1>
            <p className="text-slate-300 text-sm">
              Instant pitch reservation with live availability tracking and immediate confirmation.
            </p>
          </div>
        </Container>
      </section>

      <Container>
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200 space-y-8">
          <h2 className="gasoek  text-2xl text-slate-900">Select Booking Details</h2>
          <QuickSearch />
        </div>
      </Container>
    </div>
  );
}
