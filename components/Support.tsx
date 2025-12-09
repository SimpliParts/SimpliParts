import React from 'react';
import { HelpCircle, Mail, Phone, AlertTriangle, BookOpen } from 'lucide-react';
import { Button } from './ui/Button';
import { Sidebar } from './Sidebar';

interface SupportProps {
  setCurrentView: (view: import('../App').ViewState) => void;
  currentView: import('../App').ViewState;
}

export const Support: React.FC<SupportProps> = ({ setCurrentView, currentView }) => {
  const faqs = [
    {
      q: 'Why don’t I see any integrations?',
      a: 'Make sure your PartsTech or Tekmetric API keys are added in Shop Settings and are marked Active.'
    },
    {
      q: 'How do I reset my password?',
      a: 'Sign out, go to “Forgot password” on the login screen, and follow the email link.'
    },
    {
      q: 'Data looks out of date.',
      a: 'Retry the sync from Shop Settings. If it persists, contact support with your shop ID.'
    },
    {
      q: 'Still need help?',
      a: 'Email support@simpliparts.com with a brief summary, screenshots, and your shop ID.'
    }
  ];

  const troubleshooting = [
    'Confirm your internet connection and refresh the page.',
    'Re-enter API keys in Shop Settings and click Update.',
    'Ensure your browser allows third-party cookies for Supabase auth.',
    'Sign out and sign back in to refresh your session.',
  ];

  return (
    <div className="flex min-h-[calc(100vh-72px)] pt-[72px]">
      <Sidebar
        currentView={currentView}
        setCurrentView={setCurrentView}
        headingName="Support Center"
        headingSub="Help & FAQs"
      />

      <div className="flex-1 lg:ml-64 bg-slate-50 min-h-full">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-slate-900">Support</h1>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-500">
            <HelpCircle size={18} className="text-slate-400" />
            We’re here to help
          </div>
        </header>

        <div className="p-8 max-w-5xl mx-auto space-y-8">
          {/* Contact card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/60 flex items-center gap-2">
              <HelpCircle size={20} className="text-slate-600" />
              <h3 className="font-semibold text-slate-900">Get in touch</h3>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-start gap-3">
                <Mail size={18} className="text-blue-600 mt-0.5" />
                <div>
                  <div className="text-sm font-semibold text-slate-900">Email</div>
                  <a href="mailto:support@simpliparts.com" className="text-sm text-blue-600 hover:text-blue-800">support@simpliparts.com</a>
                  <p className="text-xs text-slate-500 mt-1">Typical response: <span className="font-medium text-slate-700">1 business day</span></p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={18} className="text-blue-600 mt-0.5" />
                <div>
                  <div className="text-sm font-semibold text-slate-900">Phone</div>
                  <p className="text-sm text-slate-700">(555) 123-4567</p>
                  <p className="text-xs text-slate-500 mt-1">Mon–Fri, 9am–6pm ET</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <BookOpen size={18} className="text-blue-600 mt-0.5" />
                <div>
                  <div className="text-sm font-semibold text-slate-900">Status & FAQ</div>
                  <p className="text-sm text-slate-700">Check system status and common answers.</p>
                  <p className="text-xs text-slate-500 mt-1">Docs coming soon.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Troubleshooting */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/60 flex items-center gap-2">
              <AlertTriangle size={20} className="text-amber-600" />
              <h3 className="font-semibold text-slate-900">Quick troubleshooting</h3>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {troubleshooting.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="text-sm font-semibold text-blue-600 mt-0.5">{idx + 1}.</span>
                  <p className="text-sm text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/60 flex items-center gap-2">
              <BookOpen size={20} className="text-slate-600" />
              <h3 className="font-semibold text-slate-900">FAQs</h3>
            </div>
            <div className="p-6 space-y-4">
              {faqs.map((item, idx) => (
                <div key={idx} className="border border-slate-100 rounded-lg p-4">
                  <div className="font-semibold text-slate-900">{item.q}</div>
                  <div className="text-sm text-slate-600 mt-1">{item.a}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

