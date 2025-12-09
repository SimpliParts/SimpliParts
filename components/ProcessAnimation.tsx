import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScanLine, Search, CheckCircle2, ArrowRight, TrendingUp } from 'lucide-react';

export const ProcessAnimation: React.FC = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 1750); // 1.75 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative mx-auto w-full h-[280px] md:h-[340px] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col items-center justify-center p-6">
        
        {/* Grid Background */}
        <div className="absolute inset-0 opacity-[0.03]" 
           style={{
             backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
             backgroundSize: '40px 40px'
           }}>
        </div>

        <div className="relative z-10 w-full max-w-5xl flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10 px-4 md:px-12">
            
            {/* Step 1: The Document (RO) */}
            <div className="relative flex flex-col items-center gap-4 shrink-0">
                <motion.div 
                    className="w-20 h-28 bg-white rounded border border-slate-200 shadow-lg relative overflow-hidden flex flex-col p-2 gap-1.5"
                    initial={{ scale: 0.9, opacity: 0.5 }}
                    animate={{ 
                        scale: step === 0 ? 1.5 : 1,
                        opacity: step === 0 ? 1 : 0.6,
                        boxShadow: step === 0 ? "0 25px 30px -5px rgb(0 0 0 / 0.15)" : "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                        zIndex: step === 0 ? 20 : 0
                    }}
                    transition={{ duration: 0.4 }}
                >
                    {/* Fake Text Lines */}
                    <div className="w-1/2 h-1.5 bg-slate-200 rounded"></div>
                    <div className="w-full h-1 bg-slate-100 rounded"></div>
                    <div className="w-full h-1 bg-slate-100 rounded"></div>
                    
                    {/* The "Part" Line */}
                    <motion.div 
                        className="w-full h-5 bg-blue-50 border border-blue-100 rounded mt-1 flex items-center px-1"
                        animate={{ backgroundColor: step >= 1 ? '#eff6ff' : '#f8fafc', borderColor: step >= 1 ? '#bfdbfe' : '#f1f5f9' }}
                    >
                        <div className="w-full h-1 bg-blue-200 rounded opacity-50"></div>
                    </motion.div>
                    
                    {/* Scan Line Effect */}
                    {step === 0 && (
                        <motion.div 
                            className="absolute top-0 left-0 w-full h-0.5 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] z-10"
                            initial={{ top: "0%" }}
                            animate={{ top: "100%" }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        />
                    )}
                </motion.div>
                <motion.div 
                    className={`text-sm md:text-lg font-bold transition-colors duration-500 ${step === 0 ? 'text-blue-600' : 'text-slate-400'}`}
                    animate={{ y: step === 0 ? 35 : 0 }}
                    transition={{ duration: 0.4 }}
                >
                    Ingest RO
                </motion.div>
            </div>

            <ArrowRight className="text-slate-200 hidden md:block shrink-0" />

            {/* Step 2: Extraction */}
            <div className="relative flex flex-col items-center gap-4 shrink-0">
                 <motion.div 
                    className="w-24 h-24 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center relative overflow-hidden"
                    animate={{ 
                        scale: step === 1 ? 1.5 : 1,
                        borderColor: step === 1 ? '#3b82f6' : '#e2e8f0',
                        backgroundColor: step === 1 ? '#ffffff' : '#f8fafc',
                        boxShadow: step === 1 ? "0 20px 25px -5px rgba(59, 130, 246, 0.15)" : "none",
                        zIndex: step === 1 ? 20 : 0
                    }}
                    transition={{ duration: 0.4 }}
                >
                    {/* Inactive State: Icon */}
                    <motion.div 
                        className="absolute inset-0 flex items-center justify-center"
                        animate={{ opacity: step === 1 ? 0 : 1, scale: step === 1 ? 0.8 : 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ScanLine className="text-slate-300" size={24} />
                    </motion.div>

                    {/* Active State: Content */}
                    <AnimatePresence>
                        {step === 1 && (
                            <motion.div 
                                key="extracting"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="flex flex-col items-center justify-center w-full h-full relative z-10"
                            >
                                <ScanLine className="text-blue-500 mb-1" size={24} />
                                <motion.span 
                                  initial={{ width: 0, opacity: 0 }}
                                  animate={{ width: "auto", opacity: 1 }}
                                  className="text-[10px] font-mono text-blue-700 bg-blue-50 px-1 rounded whitespace-nowrap overflow-hidden"
                                >
                                  PN: 8492-B
                                </motion.span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                 </motion.div>
                 <motion.div 
                    className={`text-sm md:text-lg font-bold transition-colors duration-500 ${step === 1 ? 'text-blue-600' : 'text-slate-400'}`}
                    animate={{ y: step === 1 ? 35 : 0 }}
                    transition={{ duration: 0.4 }}
                 >
                    AI Match
                 </motion.div>
            </div>

            <ArrowRight className="text-slate-200 hidden md:block shrink-0" />

            {/* Step 3: Market Search */}
            <div className="relative flex flex-col items-center gap-4 shrink-0">
                 <motion.div 
                    className="w-40 h-28 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center relative overflow-hidden"
                    animate={{ 
                        scale: step === 2 ? 1.5 : 1,
                        borderColor: step === 2 ? '#3b82f6' : '#e2e8f0',
                        backgroundColor: step === 2 ? '#ffffff' : '#f8fafc',
                        boxShadow: step === 2 ? "0 20px 25px -5px rgba(59, 130, 246, 0.15)" : "none",
                        zIndex: step === 2 ? 20 : 0
                    }}
                    transition={{ duration: 0.4 }}
                >
                    {/* Inactive State: Icon */}
                    <motion.div 
                        className="absolute inset-0 flex items-center justify-center"
                        animate={{ opacity: step === 2 ? 0 : 1, scale: step === 2 ? 0.8 : 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Search className="text-slate-300" size={28} />
                    </motion.div>

                    {/* Active State: Content */}
                    <AnimatePresence>
                        {step === 2 && (
                            <motion.div 
                                className="flex flex-col gap-1.5 w-full px-3 relative z-10" 
                                initial={{opacity: 0}} 
                                animate={{opacity: 1}}
                                exit={{opacity: 0}}
                                transition={{ duration: 0.3 }}
                            >
                                {/* Competitor 1 */}
                                <motion.div 
                                  initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }}
                                  className="flex justify-between items-center text-[10px] bg-slate-50 p-1.5 rounded border border-slate-100"
                                >
                                  <span className="text-slate-500 font-medium">NAPA</span>
                                  <span className="text-slate-400 strike-through line-through decoration-red-400">$105.00</span>
                                </motion.div>
                                {/* Competitor 2 (Winner) */}
                                <motion.div 
                                  initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }}
                                  className="flex justify-between items-center text-[11px] bg-emerald-50 p-2 rounded border border-emerald-200 shadow-sm"
                                >
                                  <span className="font-bold text-emerald-700">WorldPac</span>
                                  <span className="font-bold text-emerald-700">$84.50</span>
                                </motion.div>
                                {/* Competitor 3 */}
                                <motion.div 
                                  initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5 }}
                                  className="flex justify-between items-center text-[10px] bg-slate-50 p-1.5 rounded border border-slate-100"
                                >
                                  <span className="text-slate-500 font-medium">O'Reilly</span>
                                  <span className="text-slate-400 line-through decoration-red-400">$98.00</span>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                 </motion.div>
                 <motion.div 
                    className={`text-sm md:text-lg font-bold transition-colors duration-500 ${step === 2 ? 'text-blue-600' : 'text-slate-400'}`}
                    animate={{ y: step === 2 ? 35 : 0 }}
                    transition={{ duration: 0.4 }}
                 >
                    Compare
                 </motion.div>
            </div>

            <ArrowRight className="text-slate-200 hidden md:block shrink-0" />

             {/* Step 4: Result */}
             <div className="relative flex flex-col items-center gap-4 shrink-0">
                 <motion.div 
                    className="w-44 h-28 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center p-3 shadow-sm relative overflow-hidden"
                    animate={{ 
                        borderColor: step === 3 ? '#10b981' : '#e2e8f0',
                        backgroundColor: step === 3 ? '#ffffff' : '#f8fafc',
                        scale: step === 3 ? 1.5 : 1,
                        boxShadow: step === 3 ? "0 25px 30px -5px rgb(16 185 129 / 0.2)" : "none",
                        zIndex: step === 3 ? 20 : 0
                    }}
                    transition={{ duration: 0.4 }}
                >
                    {/* Inactive State: Icon */}
                    <motion.div 
                        className="absolute inset-0 flex items-center justify-center"
                        animate={{ opacity: step === 3 ? 0 : 1, scale: step === 3 ? 0.8 : 1 }}
                        transition={{ duration: 0.3 }}
                    >
                         <TrendingUp className="text-slate-200" size={32} />
                    </motion.div>

                    {/* Active State: Content */}
                    <AnimatePresence>
                        {step === 3 && (
                            <motion.div 
                                key="result"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="text-center w-full relative z-10"
                            >
                                <div className="flex items-center justify-center gap-1.5 text-emerald-600 mb-2">
                                    <CheckCircle2 size={18} />
                                    <span className="text-xs font-bold uppercase tracking-wider">Profit Found</span>
                                </div>
                                <div className="text-3xl font-bold text-slate-900 tracking-tight">$84.50</div>
                                
                                {/* Floating Savings Particles */}
                                <motion.div
                                  initial={{ y: 0, opacity: 1 }}
                                  animate={{ y: -40, opacity: 0 }}
                                  transition={{ duration: 1.5, ease: "easeOut" }}
                                  className="absolute top-0 right-4 text-sm font-bold text-emerald-500"
                                >
                                  +$20
                                </motion.div>
                                <motion.div
                                  initial={{ y: 0, opacity: 1 }}
                                  animate={{ y: -30, opacity: 0 }}
                                  transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
                                  className="absolute top-2 left-4 text-sm font-bold text-emerald-500"
                                >
                                  +$15
                                </motion.div>

                            </motion.div>
                        )}
                     </AnimatePresence>
                 </motion.div>
                 <motion.div 
                    className={`text-sm md:text-lg font-bold transition-colors duration-500 ${step === 3 ? 'text-emerald-600' : 'text-slate-400'}`}
                    animate={{ y: step === 3 ? 35 : 0 }}
                    transition={{ duration: 0.4 }}
                 >
                    Better Margin
                 </motion.div>
            </div>

        </div>

        {/* Progress Bar at Bottom */}
        <div className="absolute bottom-0 left-0 h-1 bg-slate-50 w-full">
            <motion.div 
                className="h-full bg-gradient-to-r from-blue-500 to-emerald-500"
                animate={{ width: `${((step + 1) / 4) * 100}%` }}
                transition={{ duration: 0.5 }}
            />
        </div>
    </div>
  );
};