import React, { useEffect } from 'react';
import { ViewState } from '../App';

interface PrivacyPolicyProps {
  setCurrentView: (view: ViewState) => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ setCurrentView }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);
  return (
    <div className="min-h-[calc(100vh-72px)] pt-[72px] bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Privacy Policy</h1>
          <p className="text-lg text-slate-600">Data Processing Addendum - Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">1. Data We Collect</h2>

            <h3 className="text-xl font-medium text-slate-900 mb-3">Shop Operational Data</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              Repair Order numbers, Part Numbers, Costs, Vendor names.
            </p>

            <h3 className="text-xl font-medium text-slate-900 mb-3">Vehicle Data</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              VINs, Year/Make/Model (extracted from invoices).
            </p>

            <h3 className="text-xl font-medium text-slate-900 mb-3">Consumer PII</h3>
            <p className="text-slate-700 leading-relaxed">
              While our focus is parts, your uploaded invoices may contain your customer's name/address. We process this data incidental to the service but do not use it for marketing.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">2. How We Use AI</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              We use third-party Large Language Models (LLMs), such as Google Gemini, to extract text from your PDF documents.
            </p>
            <div className="text-slate-700 leading-relaxed space-y-4">
              <p><strong>Data Isolation:</strong> Your data is sent via encrypted API.</p>
              <p><strong>No Training:</strong> We maintain agreements with providers ensuring your specific Shop Data is not used to train their public models.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">3. Data Retention</h2>
            <div className="text-slate-700 leading-relaxed space-y-4">
              <p><strong>Active Accounts:</strong> We retain history to provide you with year-over-year reporting.</p>
              <p><strong>Deleted Accounts:</strong> Upon cancellation, you may request deletion of your Shop Data. We may retain Aggregated Data (benchmarks) indefinitely.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">4. Sub-processors</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              We use the following trusted third parties to process data:
            </p>
            <div className="text-slate-700 leading-relaxed space-y-2">
              <p><strong>Supabase:</strong> Database & Auth (AWS/US-East).</p>
              <p><strong>Vercel:</strong> Application Hosting.</p>
              <p><strong>Stripe:</strong> Payment Processing.</p>
              <p><strong>Google Cloud / OpenAI:</strong> Document Intelligence.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};