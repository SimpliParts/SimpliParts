import React from 'react';
import { motion } from 'framer-motion';
import { ScanSearch, MousePointerClick, ScanBarcode } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'Smart Sourcing',
    description: 'Enter an RO number. Our AI identifies parts added by your technician and immediately shops them across all your connected vendors for the best price.',
    icon: ScanSearch,
    color: 'bg-blue-100 text-blue-600',
  },
  {
    id: 2,
    title: 'One-Click Ordering',
    description: 'Review the best options. You decide what to add to Tekmetric. Simply click "Order" and we handle the procurement instantly.',
    icon: MousePointerClick,
    color: 'bg-purple-100 text-purple-600',
  },
  {
    id: 3,
    title: 'Automated Receiving',
    description: 'When parts arrive, simply scan the vendor invoice. We automatically check the parts in and notify your technician that their job is ready.',
    icon: ScanBarcode,
    color: 'bg-emerald-100 text-emerald-600',
  },
];

export const Workflow: React.FC = () => {
  return (
    <section id="workflow" className="py-24 bg-slate-50 relative scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Your New Standard Operating Procedure.
          </h2>
          <p className="text-lg text-slate-500">
            SimpliParts replaces chaotic browser tabs with a streamlined, intelligent workflow.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-slate-200 -z-10"></div>

          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow relative h-full flex flex-col"
            >
              <div className={`w-14 h-14 rounded-xl ${step.color} flex items-center justify-center mb-6 text-xl font-bold shadow-sm shrink-0`}>
                <step.icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
              <p className="text-slate-500 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};