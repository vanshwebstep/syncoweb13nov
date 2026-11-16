import React from 'react';
import { BaseModal } from './BaseModal';
import { Button } from '../common/Button';
import { Trophy } from 'lucide-react';

export function TrialModal({ isOpen, onClose }) {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Register For Summer Selection Trials" maxWidth="max-w-md">
      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
        <div>
          <label className="text-xs font-bold text-slate-700 uppercase">Player Full Name</label>
          <input type="text" placeholder="e.g. Leo Messi" className="w-full mt-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm" />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-700 uppercase">Date of Birth</label>
          <input type="date" className="w-full mt-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm" />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-700 uppercase">Parent Contact Number</label>
          <input type="tel" placeholder="+1 (555) 000-0000" className="w-full mt-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm" />
        </div>
        <Button variant="primary" size="md" icon={Trophy} className="w-full justify-center shadow-glow-green">
          Submit Trial Registration
        </Button>
      </form>
    </BaseModal>
  );
}
