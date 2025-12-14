import React, { useEffect } from 'react';
import { ViewState } from '../App';

interface TermsOfServiceProps {
  setCurrentView: (view: ViewState) => void;
}

export const TermsOfService: React.FC<TermsOfServiceProps> = ({ setCurrentView }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);
  return (
    <div className="min-h-[calc(100vh-72px)] pt-[72px] bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Master Subscription Agreement</h1>
          <p className="text-lg text-slate-600">Effective Date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">1. Definitions</h2>
            <div className="text-slate-700 leading-relaxed space-y-4">
              <p><strong>"Service"</strong> means the SimpliParts software-as-a-service platform.</p>
              <p><strong>"Shop Data"</strong> means the electronic data (invoices, repair orders, customer details) submitted by you to the Service.</p>
              <p><strong>"Aggregated Data"</strong> means Shop Data that has been anonymized and combined with other data to create benchmarks or improve algorithms.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">2. Access and Use</h2>

            <h3 className="text-xl font-medium text-slate-900 mb-3">2.1 Provision of Service</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              Subject to payment of applicable fees, SimpliParts LLC grants you a non-exclusive, non-transferable right to access and use the Service for your internal business operations.
            </p>

            <h3 className="text-xl font-medium text-slate-900 mb-3">2.2 Restrictions</h3>
            <p className="text-slate-700 leading-relaxed">
              You shall not: (a) reverse engineer the Service; (b) use the Service to build a competitive product; or (c) use the Service to harass or exploit third-party vendors.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">3. Data Rights & Ownership</h2>

            <h3 className="text-xl font-medium text-slate-900 mb-3">3.1 Your Ownership</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              You own all right, title, and interest in your Shop Data. We claim no ownership over your specific invoices or customer lists.
            </p>

            <h3 className="text-xl font-medium text-slate-900 mb-3">3.2 License to Host</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              You grant us a worldwide, royalty-free license to access, use, process, copy, and display Shop Data solely to provide the Service to you (e.g., to run the price audits).
            </p>

            <h3 className="text-xl font-medium text-slate-900 mb-3">3.3 Aggregated Statistics</h3>
            <p className="text-slate-700 leading-relaxed">
              You acknowledge that we may monitor your use of the Service and use Shop Data in an aggregate and anonymous manner to compile statistical and performance information (e.g., "Industry Average Brake Pad Price"). We retain all rights to such Aggregated Data, provided it does not identify you or your individual customers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">4. Third-Party Integrations</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              The Service relies on interoperability with third-party platforms (e.g., Tekmetric, PartsTech).
            </p>
            <div className="text-slate-700 leading-relaxed space-y-4">
              <p><strong>No Warranty:</strong> We do not warrant the availability or accuracy of data provided by these third parties.</p>
              <p><strong>API Changes:</strong> If a third party (e.g., PartsTech) changes their API in a way that breaks the Service, we will use commercially reasonable efforts to fix it, but we are not liable for downtime caused by third-party changes.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">5. Fees and Payment</h2>
            <div className="text-slate-700 leading-relaxed space-y-4">
              <p><strong>Billing:</strong> Fees are billed monthly in advance via Stripe.</p>
              <p><strong>Price Changes:</strong> We may increase fees upon 30 days' notice.</p>
              <p><strong>No Refunds:</strong> Payments are non-refundable, even if you stop using the Service mid-month.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">6. Disclaimers</h2>
            <p className="text-slate-700 leading-relaxed">
              SimpliParts is an analytics tool, not a parts supplier. We do not guarantee that the prices identified in our audits will be available at the time of purchase. Vendor inventory and pricing fluctuate in real-time. We are not responsible for any "lost savings" or purchasing errors.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">7. Limitation of Liability</h2>
            <p className="text-slate-700 leading-relaxed">
              To the maximum extent permitted by law, our liability is limited to the amount you paid us in the twelve (12) months preceding the incident. We are not liable for lost profits or data loss.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">8. Governing Law</h2>
            <p className="text-slate-700 leading-relaxed">
              This Agreement is governed by the laws of the State of Illinois.
            </p>
          </section>
        </div>
        </div>
      </div>
  );
};