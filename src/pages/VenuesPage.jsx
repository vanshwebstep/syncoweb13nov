import React from 'react';
import { Container } from '../components/common/Container';
import { MapPin, Phone, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from '../components/common/Button';

export function VenuesPage() {
  const venues = [
    {
      name: "Main Stadium Pitch & Arena",
      location: "Downtown Sports Complex, 5th Avenue",
      type: "FIFA Quality Pro 11v11 Turf & Floodlights",
      phone: "+1 (800) 555-PITCH1",
      image: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&q=80&w=600"
    },
    {
      name: "Eastside Sports Hub",
      location: "East Sector Park, Boulevard 12",
      type: "Indoor 5v5 & Outdoor 7v7 Turfs",
      phone: "+1 (800) 555-PITCH2",
      image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&q=80&w=600"
    },
    {
      name: "North Arena Football Pitch",
      location: "North Sports Park Way",
      type: "Professional Hybrid Grass Pitch",
      phone: "+1 (800) 555-PITCH3",
      image: "https://images.unsplash.com/photo-1489945052260-4f21c52268b9?auto=format&fit=crop&q=80&w=600"
    }
  ];

  return (
    <div className="py-12 space-y-12">
      <section className="bg-brand-navy text-white py-14">
        <Container>
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-green bg-brand-green/10 px-3 py-1 rounded-full border border-brand-green/30">
              Partner Turf Locations
            </span>
            <h1 className="gasoek  text-4xl text-white ">
              State-Of-The-Art Pitches & Venues
            </h1>
            <p className="text-slate-300 text-sm">
              All PlayPro venues feature FIFA-approved shock-absorbent synthetic turf, high-intensity LED floodlighting, changing facilities, and parent viewing lounges.
            </p>
          </div>
        </Container>
      </section>

      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {venues.map((v, idx) => (
            <div key={idx} className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-lg hover:shadow-xl transition-all space-y-4 p-6">
              <img src={v.image} alt={v.name} className="w-full h-48 object-cover rounded-2xl" />
              <div className="space-y-2">
                <h3 className="gasoek font-bold text-xl text-slate-900">{v.name}</h3>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <MapPin className="w-4 h-4 text-brand-blue shrink-0" />
                  <span>{v.location}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-brand-green-dark font-semibold">
                  <ShieldCheck className="w-4 h-4 text-brand-green shrink-0" />
                  <span>{v.type}</span>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                <span className="text-xs text-slate-500 font-semibold">{v.phone}</span>
                <Button variant="secondary" size="sm" icon={ArrowRight} iconPosition="right">
                  Book Turf
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
