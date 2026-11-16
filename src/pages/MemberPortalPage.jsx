import React from 'react';
import { Container } from '../components/common/Container';
import { User, Lock, Trophy, ArrowRight } from 'lucide-react';
import { Button } from '../components/common/Button';

export function MemberPortalPage() {
  return (
    <div className="py-16 bg-slate-900 text-white min-h-[70vh] flex items-center">
      <Container>
        <div className="max-w-md mx-auto bg-slate-800 border border-slate-700/80 rounded-3xl p-8 shadow-2xl space-y-6">
          
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-brand-blue rounded-2xl flex items-center justify-center mx-auto border border-brand-green/30">
              <User className="w-6 h-6 text-brand-green" />
            </div>
            <h1 className="gasoek  text-2xl text-white">Member Portal Access</h1>
            <p className="text-xs text-slate-400">Log in to view attendance, performance reports, and schedule.</p>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="text-xs font-bold uppercase text-slate-300">Player ID or Parent Email</label>
              <input type="text" placeholder="e.g. PP-88912" className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-green" />
            </div>

            <div>
              <label className="text-xs font-bold uppercase text-slate-300">Password</label>
              <input type="password" placeholder="••••••••" className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-green" />
            </div>

            <Button variant="primary" size="md" className="w-full justify-center shadow-glow-green" icon={ArrowRight} iconPosition="right">
              Sign In To Portal
            </Button>
          </form>

          <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-700">
            Don't have a player account yet? <a href="/programs" className="text-brand-green font-bold hover:underline">Enroll Here</a>
          </div>

        </div>
      </Container>
    </div>
  );
}
