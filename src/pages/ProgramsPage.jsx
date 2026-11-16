import React, { useState } from 'react';
import { Container } from '../components/common/Container';
import { ProgramsGrid } from './Home/components/ProgramsGrid';
import { Check, Filter, Shield, Calendar, ArrowRight } from 'lucide-react';
import { Button } from '../components/common/Button';

export function ProgramsPage() {
  const [filter, setFilter] = useState('all');

  return (
    <div className="py-12 space-y-12">
      
      {/* Header */}
      <section className="bg-brand-navy text-white py-14">
        <Container>
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-green bg-brand-green/10 px-3 py-1 rounded-full border border-brand-green/30">
              Academy Pathways
            </span>
            <h1 className="gasoek  text-4xl text-white ">
              All Football & Sports Programs
            </h1>
            <p className="text-slate-300 text-sm">
              Structured age-group curriculums designed to elevate technical skills, speed of play, tactical IQ, and athletic potential.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Grid */}
      <ProgramsGrid />

      {/* Additional Registration Info Banner */}
      <Container>
        <div className="bg-gradient-to-r from-brand-blue to-brand-navy-dark rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-brand-green/30">
          <div className="space-y-2">
            <h3 className="gasoek  text-2xl">Need Assistance Choosing A Program?</h3>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
              Book a complimentary 1-on-1 assessment session with our UEFA Academy Directors to determine your athlete's optimal entry level.
            </p>
          </div>
          <Button variant="primary" size="md" className="shrink-0 shadow-glow-green">
            Schedule Free Assessment
          </Button>
        </div>
      </Container>

    </div>
  );
}
