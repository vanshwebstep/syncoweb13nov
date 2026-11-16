import React from 'react';
import { Container } from '../components/common/Container';
import { CheckCircle2 } from 'lucide-react';
import { Philosophy } from './Home/components/Philosophy';

export function AboutPage() {
  const coaches = [
    {
      name: "Coach Alex Ferguson",
      role: "Head of Youth Academy (UEFA Pro)",
      img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "Coach Maria Santos",
      role: "Lead Performance & Tactics Coach",
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "Coach David Beckham",
      role: "Elite Technical & Free-Kick Specialist",
      img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400"
    }
  ];

  return (
    <div className="py-12 space-y-16">
      
      {/* Banner */}
      <section className="bg-brand-navy text-white py-16 relative overflow-hidden">
        <Container>
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-green bg-brand-green/10 px-3 py-1 rounded-full border border-brand-green/30">
              About PlayPro Academy
            </span>
            <h1 className="gasoek  text-4xl sm:text-5xl text-white ">
              Inspiring Champion Athletes On & Off The Pitch
            </h1>
            <p className="text-slate-300 text-base leading-relaxed">
              Founded with the mission to elevate grassroots football, PlayPro Academy merges international coaching methodologies with state-of-the-art turf facilities.
            </p>
          </div>
        </Container>
      </section>

      {/* Vision & Story */}
      <section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="gasoek  text-3xl text-slate-900">
                Our Story & Vision
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                PlayPro Sports Academy was established by former professional players and UEFA licensed coaches who recognized a gap in structured youth football development. We focus not just on ball technique, but on tactical intellect, mental toughness, and character building.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-slate-800 font-semibold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0" />
                  <span>Individual player growth tracking with video analysis.</span>
                </div>
                <div className="flex items-center gap-3 text-slate-800 font-semibold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0" />
                  <span>Direct scouting trials with domestic & international clubs.</span>
                </div>
                <div className="flex items-center gap-3 text-slate-800 font-semibold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0" />
                  <span>Inclusive environment for all age brackets from U-6 to Pro.</span>
                </div>
              </div>
            </div>

            <div>
              <img
                src="https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&q=80&w=800"
                alt="Youth Football Team"
                className="rounded-3xl shadow-xl border-4 border-white"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Philosophy Component */}
      <Philosophy />

      {/* Coaches Section */}
      <section className="bg-slate-100 py-16">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="gasoek  text-3xl text-slate-900">Meet Our Expert Coaching Staff</h2>
            <p className="text-slate-600 text-sm mt-2">UEFA certified mentors committed to unlocking player potential.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coaches.map((c, idx) => (
              <div key={idx} className="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-200 text-center p-6 space-y-4">
                <img src={c.img} alt={c.name} className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-brand-green/30" />
                <div>
                  <h3 className="font-bold text-lg text-slate-900">{c.name}</h3>
                  <p className="text-xs text-brand-blue font-semibold">{c.role}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

    </div>
  );
}
