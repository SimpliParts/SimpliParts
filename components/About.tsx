import React, { useEffect } from 'react';
import { ViewState } from '../App';

interface AboutProps {
  setCurrentView: (view: ViewState) => void;
}

export const About: React.FC<AboutProps> = ({ setCurrentView }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);
  return (
    <div className="min-h-[calc(100vh-72px)] pt-[72px] bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">About Us</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            The story behind SimpliParts and our mission to help independent repair shops keep the profit they've earned.
          </p>
        </div>

        {/* The Mission Section */}
        <section className="mb-16">
          <div className="bg-blue-50 rounded-lg shadow-sm p-8 md:p-12 border border-blue-100">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">The Mission</h2>

            <div className="prose prose-lg max-w-none text-blue-900">
              <p className="text-center mb-6 text-lg">
                We created SimpliParts to act as the "Digital CFO" for independent repair shops. We use modern AI to read the invoices you don't have time to read and verify the prices you don't have time to check.
              </p>

              <p className="text-center font-semibold text-xl">
                Our goal is simple: To help independent shop owners keep the profit they've actually earned.
              </p>
            </div>
          </div>
        </section>

        {/* The Story Section */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-sm p-8 md:p-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">The Story</h2>

            <div className="prose prose-lg max-w-none text-slate-700">
              <p className="text-xl font-medium text-slate-900 mb-6 text-center">
                SimpliParts wasn't built in a boardroom by people who have never held a wrench. It was built because we were tired of losing money.
              </p>

              <p className="mb-6">
                We are two brothers from Illinois who combined our backgrounds—automotive operations and software engineering—to solve a problem that every shop owner faces but nobody talks about: Parts Slippage.
              </p>

              <p className="mb-6">
                We saw the daily chaos of the shop floor. Service Advisors are on the phone, cars are up on the lifts, and the priority is always speed. In that rush, there isn't time to check five different vendors for the best price on every filter and rotor. We realized that shops were bleeding thousands of dollars in margin simply because they lacked the time to audit their own purchasing.
              </p>

              <p className="mb-6">
                We knew the data existed—it was sitting in the invoices and the market listings—but there was no bridge connecting them. So we built one.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <div className="bg-slate-900 rounded-lg p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Stop Losing Money on Parts?</h3>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              Join the growing number of independent repair shops using SimpliParts to maximize their margins and keep more of the profit they've earned.
            </p>
            <button
              onClick={() => setCurrentView('signup')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Get Started Today
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};