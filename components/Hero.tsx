import React from 'react';
import { Button } from './ui/Button';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { ProcessAnimation } from './ProcessAnimation';

interface HeroProps {
  onGetStarted: () => void;
  onSeeHowItWorks: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onGetStarted, onSeeHowItWorks }) => {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-medium mb-8"
        >
          <span className="flex h-2 w-2 rounded-full bg-blue-600"></span>
          Now integrating with Tekmetric & PartsTech
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-6 max-w-5xl"
        >
          The Pricing Intelligence Layer for <span className="text-blue-600">Tekmetric</span> & <span className="text-red-500">PartsTech</span>.
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-slate-500 mb-10 max-w-2xl leading-relaxed"
        >
          Stop parts slippage. We audit your Repair Orders against the live PartsTech marketplace to uncover hidden margin opportunities instantly.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 mb-20"
        >
          <Button size="lg" className="group" onClick={onGetStarted}>
            Start Free Audit
            <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button variant="outline" size="lg" className="group" onClick={onSeeHowItWorks}>
            <PlayCircle size={18} className="mr-2 text-slate-400 group-hover:text-blue-600 transition-colors" />
            See How it Works
          </Button>
        </motion.div>

        <div className="w-full max-w-5xl">
            <ProcessAnimation />
        </div>
        
      </div>
    </section>
  );
};