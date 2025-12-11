import React, { useState } from 'react';
import { Logo } from './ui/Logo';
import { supabase } from '../lib/supabase';
import { Mail, Lock, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

interface MaintenanceGateProps {
  onUnlock: () => void;
  previewPassword?: string;
}

export const MaintenanceGate: React.FC<MaintenanceGateProps> = ({
  onUnlock,
  previewPassword = '',
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailStatus, setEmailStatus] = useState<'idle' | 'success' | 'error' | 'loading'>('idle');
  const [emailMessage, setEmailMessage] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handleNotify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setEmailStatus('error');
      setEmailMessage('Please enter an email.');
      return;
    }

    setEmailStatus('loading');
    setEmailMessage(null);

    try {
      const { error } = await supabase
        .from('waitlist_interest')
        .insert({ email });

      if (error) {
        // Supabase uses Postgres codes; 23505 is unique_violation
        if ((error as any)?.code === '23505') {
          setEmailStatus('success');
          setEmailMessage('You are already on the list. Thanks for your interest!');
          setEmail('');
          return;
        }
        throw error;
      }

      setEmailStatus('success');
      setEmailMessage('Thanks! We will notify you when we open access.');
      setEmail('');
    } catch (err) {
      console.warn('Failed to save waitlist email', err);
      setEmailStatus('error');
      setEmailMessage('Unable to save right now. Please try again soon.');
    }
  };

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!previewPassword) {
      onUnlock();
      return;
    }

    if (password.trim() === previewPassword) {
      localStorage.setItem('simpli:maintenance:unlock', 'true');
      setPasswordError(null);
      onUnlock();
    } else {
      setPasswordError('Incorrect password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col items-center justify-center px-4">
      <div className="absolute inset-0 pointer-events-none opacity-[0.25]"
        style={{
          backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
          backgroundSize: '28px 28px'
        }}
      />

      <div className="relative z-10 w-full max-w-3xl bg-white border border-slate-200 rounded-2xl shadow-2xl p-8 md:p-10 flex flex-col gap-8">
        <div className="flex items-center justify-between gap-4">
          <Logo showText />
          <span className="text-xs font-semibold tracking-wide text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Private Preview
          </span>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">We&apos;re not quite ready yet</h1>
          <p className="text-slate-600 leading-relaxed">
            We&apos;re polishing the experience. Leave your email and we&apos;ll notify you when we launch,
            or enter the preview password if you were invited.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <form onSubmit={handleNotify} className="p-5 border border-slate-200 rounded-xl bg-slate-50/60 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Mail size={18} className="text-blue-600" />
              <span>Join the waitlist</span>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase font-semibold text-slate-500 tracking-wide">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
                placeholder="you@example.com"
                required
              />
            </div>
            <button
              type="submit"
              disabled={emailStatus === 'loading'}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 transition disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {emailStatus === 'loading' ? 'Saving...' : 'Notify me'}
              <ArrowRight size={16} className="shrink-0" />
            </button>
            {emailMessage && (
              <div className={`flex items-start gap-2 text-sm ${emailStatus === 'success' ? 'text-emerald-700' : 'text-amber-700'}`}>
                {emailStatus === 'success' ? <CheckCircle2 size={16} className="text-emerald-600 mt-0.5" /> : <AlertCircle size={16} className="text-amber-600 mt-0.5" />}
                <span>{emailMessage}</span>
              </div>
            )}
          </form>

          <form onSubmit={handleUnlock} className="p-5 border border-blue-100 rounded-xl bg-blue-50 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-blue-800">
              <Lock size={18} className="text-blue-700" />
              <span>Preview access</span>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase font-semibold text-blue-700 tracking-wide">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
                placeholder="Enter preview password"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-700 text-white font-semibold shadow-md hover:bg-blue-800 transition"
            >
              Enter preview
              <ArrowRight size={16} className="shrink-0" />
            </button>
            {passwordError && (
              <div className="flex items-start gap-2 text-sm text-amber-700">
                <AlertCircle size={16} className="text-amber-600 mt-0.5" />
                <span>{passwordError}</span>
              </div>
            )}
            {!previewPassword && (
              <p className="text-xs text-blue-900/80">
                Tip: Set <code className="bg-white/70 px-1 rounded border border-blue-100">VITE_PREVIEW_PASSWORD</code> to require a password.
              </p>
            )}
          </form>
        </div>

        <div className="text-xs text-slate-500">
          Access is restricted while we finish the experience. If you think you should have access, contact us and we&apos;ll send the preview password.
        </div>
      </div>
    </div>
  );
};

