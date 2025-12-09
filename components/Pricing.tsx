import React from 'react';
import { Button } from './ui/Button';
import { Check, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-24 bg-white relative overflow-hidden scroll-mt-28">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-slate-50 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Simple, transparent pricing.
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
             For high-volume shops, the ROI is typically realized within the first week of operation.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden relative"
        >
            <div className="bg-slate-900 p-8 sm:p-10 text-center relative overflow-hidden">
                 {/* Glow effect */}
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-blue-900/20 to-transparent pointer-events-none"></div>
                 
                 <h3 className="text-2xl font-bold text-white mb-2 relative z-10">All-Access Platform</h3>
                 <p className="text-slate-400 mb-8 relative z-10">Complete automation for high-performing shops.</p>
                 
                 <div className="flex items-baseline justify-center gap-1 relative z-10">
                    <span className="text-6xl font-bold text-white tracking-tight">$1,200</span>
                    <span className="text-xl text-slate-400 font-medium">/month</span>
                 </div>
            </div>

            <div className="p-8 sm:p-12">
                <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 mb-10">
                    <div className="space-y-4">
                         <div className="flex items-start gap-3">
                            <div className="p-1 bg-emerald-100 rounded text-emerald-600 mt-0.5">
                                <Check size={16} strokeWidth={3} />
                            </div>
                            <div>
                                <span className="block font-semibold text-slate-900">Unlimited Audits</span>
                                <span className="text-sm text-slate-500">Process unlimited Repair Orders</span>
                            </div>
                         </div>
                         <div className="flex items-start gap-3">
                            <div className="p-1 bg-emerald-100 rounded text-emerald-600 mt-0.5">
                                <Check size={16} strokeWidth={3} />
                            </div>
                            <div>
                                <span className="block font-semibold text-slate-900">Real-time Slippage Alerts</span>
                                <span className="text-sm text-slate-500">Browser extension & email alerts</span>
                            </div>
                         </div>
                         <div className="flex items-start gap-3">
                            <div className="p-1 bg-emerald-100 rounded text-emerald-600 mt-0.5">
                                <Check size={16} strokeWidth={3} />
                            </div>
                            <div>
                                <span className="block font-semibold text-slate-900">Dedicated Success Manager</span>
                                <span className="text-sm text-slate-500">Weekly performance reviews</span>
                            </div>
                         </div>
                    </div>

                    <div className="space-y-4">
                         <div className="flex items-start gap-3">
                            <div className="p-1 bg-emerald-100 rounded text-emerald-600 mt-0.5">
                                <Check size={16} strokeWidth={3} />
                            </div>
                            <div>
                                <span className="block font-semibold text-slate-900">Vendor Scorecards</span>
                                <span className="text-sm text-slate-500">Negotiate better terms with data</span>
                            </div>
                         </div>
                         <div className="flex items-start gap-3">
                            <div className="p-1 bg-emerald-100 rounded text-emerald-600 mt-0.5">
                                <Check size={16} strokeWidth={3} />
                            </div>
                            <div>
                                <span className="block font-semibold text-slate-900">Marketplace Access</span>
                                <span className="text-sm text-slate-500">PartsTech, WorldPac, & more</span>
                            </div>
                         </div>
                         <div className="flex items-start gap-3">
                            <div className="p-1 bg-emerald-100 rounded text-emerald-600 mt-0.5">
                                <Check size={16} strokeWidth={3} />
                            </div>
                            <div>
                                <span className="block font-semibold text-slate-900">Multi-User Access</span>
                                <span className="text-sm text-slate-500">For all your service advisors</span>
                            </div>
                         </div>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <Button size="lg" className="w-full text-lg h-14 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20">
                        Start Recovering Lost Profit
                    </Button>
                    <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
                        <ShieldCheck size={16} className="text-slate-400" />
                        <span>Secure integration. Cancel anytime.</span>
                    </div>
                </div>
            </div>
        </motion.div>
      </div>
    </section>
  );
};