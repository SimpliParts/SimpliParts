import React, { useState } from 'react';
import { DollarSign, Clock, TrendingUp, Sparkles } from 'lucide-react';

export const RoiCalculator: React.FC = () => {
  const [spend, setSpend] = useState<number>(45000);
  
  // Logic: 20% savings on parts spend
  const savingRate = 0.20;
  const subscriptionCost = 1200;
  const monthlySavings = Math.round(spend * savingRate);
  const hoursSaved = Math.round(spend / 1000); // 1 hour per $1k
  const yearlySavings = monthlySavings * 12;

  // Dynamic ROI Days Calculation
  // Daily Savings = Monthly Savings / 30
  // Days to ROI = Subscription Cost / Daily Savings
  const dailySavings = monthlySavings / 30;
  const daysToRoi = dailySavings > 0 ? (subscriptionCost / dailySavings) : 30;
  const daysToRoiFormatted = daysToRoi < 1 ? "less than 24 hours" : `${daysToRoi.toFixed(1)} days`;

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpend(Number(e.target.value));
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <section id="roi" className="py-24 bg-slate-50 border-y border-slate-200 scroll-mt-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
           <h2 className="text-3xl font-bold text-slate-900 mb-4">
             Calculate Your Potential Recovery
           </h2>
           <p className="text-slate-500">
             See the impact of 20% margin recovery on your bottom line.
           </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
           <div className="grid md:grid-cols-2">
              
              {/* Input Section */}
              <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-slate-100 flex flex-col justify-center">
                <label className="block text-sm font-semibold text-slate-500 uppercase tracking-wide mb-6">
                  Monthly Parts Spend
                </label>
                
                <div className="flex items-baseline gap-2 mb-10">
                    <span className="text-5xl font-bold text-slate-900">{formatCurrency(spend)}</span>
                    <span className="text-slate-400 font-medium">/ month</span>
                </div>
                
                <div className="relative mb-6">
                   <input
                    type="range"
                    min="10000"
                    max="150000"
                    step="5000"
                    value={spend}
                    onChange={handleSliderChange}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 hover:accent-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all"
                  />
                  <div className="flex justify-between mt-3 text-xs font-medium text-slate-400 font-mono">
                    <span>$10k</span>
                    <span>$150k+</span>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 flex gap-3 items-start transition-all duration-300">
                    <Sparkles className="text-blue-600 mt-0.5 shrink-0" size={16} />
                    <p className="text-sm text-blue-800 leading-snug">
                        Most shops recover their subscription cost in <span className="font-bold">{daysToRoiFormatted}</span> at this volume.
                    </p>
                </div>
              </div>

              {/* Output Section */}
              <div className="bg-slate-50/50 p-8 md:p-12 flex flex-col justify-center space-y-6">
                 
                 {/* Metric 1 */}
                 <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-slate-200">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                            <DollarSign size={20} />
                        </div>
                        <span className="font-medium text-slate-600">Monthly Savings</span>
                    </div>
                    <span className="text-2xl font-bold text-emerald-600">{formatCurrency(monthlySavings)}</span>
                 </div>

                 {/* Metric 2 */}
                 <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-slate-200">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                            <TrendingUp size={20} />
                        </div>
                        <span className="font-medium text-slate-600">Annual Value</span>
                    </div>
                    <span className="text-2xl font-bold text-slate-900">{formatCurrency(yearlySavings)}</span>
                 </div>

                 {/* Metric 3 */}
                 <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-slate-200">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                            <Clock size={20} />
                        </div>
                        <span className="font-medium text-slate-600">Admin Hours Saved</span>
                    </div>
                    <span className="text-2xl font-bold text-slate-900">{hoursSaved} <span className="text-sm text-slate-400 font-normal">hrs/mo</span></span>
                 </div>

              </div>
           </div>
        </div>
      </div>
    </section>
  );
};