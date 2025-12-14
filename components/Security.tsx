import React, { useEffect } from 'react';
import { Shield, Lock, Eye, Server, Users, AlertTriangle } from 'lucide-react';
import { ViewState } from '../App';

interface SecurityProps {
  setCurrentView: (view: ViewState) => void;
}

export const Security: React.FC<SecurityProps> = ({ setCurrentView }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);
  return (
    <div className="min-h-[calc(100vh-72px)] pt-[72px] bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Shield className="w-16 h-16 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Security & Trust Center</h1>
          <p className="text-lg text-slate-600">Your Data. Secured.</p>
          <p className="text-slate-700 mt-4 max-w-3xl mx-auto">
            At SimpliParts, we treat your financial data with the same rigor as a bank. Being founded by a shop owner, we know that your vendor list and margins are your trade secrets.
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-6">1. Encryption Everywhere</h2>

            <div className="text-slate-700 leading-relaxed space-y-4">
              <p><strong>At Rest:</strong> All databases and file storage buckets are encrypted using AES-256 standards.</p>
              <p><strong>In Transit:</strong> All data moving between your browser, our servers, and our integration partners is encrypted via TLS 1.2+.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-6">2. Tenant Isolation</h2>

            <p className="text-slate-700 leading-relaxed">
              We utilize strict Row Level Security (RLS) in our database architecture. This ensures that your Shop's data is logically isolated. Even if a software error occurred, the database engine itself prevents Shop A from querying Shop B's records.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-6">3. API Security</h2>

            <p className="text-slate-700 leading-relaxed">
              Your credentials for Tekmetric and PartsTech are encrypted using industry-standard signing keys before being stored. We never display these keys in plain text on the dashboard.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-6">4. Reliability</h2>

            <p className="text-slate-700 leading-relaxed">
              Our infrastructure is hosted on Vercel and Supabase, leveraging the global redundancy of the AWS and Google Cloud networks to ensure high availability.
            </p>
          </section>

          <section>
            <div className="text-center border-t border-slate-200 pt-8">
              <p className="text-slate-600">
                <strong>Last updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <p className="text-slate-500 mt-2">
                This security overview is regularly updated to reflect our current security measures and practices.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};