import React from 'react';
import { ProcessAnimation } from '../ProcessAnimation';
import { Logo } from './Logo';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  onBackToHome: () => void;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle, onBackToHome }) => {
  return (
    <div className="min-h-screen w-full flex pt-[72px] md:pt-0">
      {/* Left Side - Visual */}
      <div className="hidden lg:flex w-[70%] bg-slate-900 relative overflow-hidden items-center justify-center">
        {/* Abstract Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-blue-950 z-0"></div>
        
        {/* Animated Background Content */}
        <div className="absolute inset-0 flex items-center justify-center opacity-40 scale-125 pointer-events-none blur-[6px] select-none z-0">
            <ProcessAnimation />
        </div>

        {/* FADE EFFECT: Gradient Overlay */}
        {/* z-20 sits on top of the animation (z-0) but below the content (z-30) */}
        <div className="absolute top-0 bottom-0 right-0 w-full bg-gradient-to-l from-white via-white/50 via-10% to-transparent z-20 pointer-events-none"></div>

        {/* Content Overlay */}
        {/* z-30 ensures this sits ON TOP of the gradient overlay so buttons are clickable */}
        <div className="relative z-30 p-12 text-white max-w-xl">
            {/* Logo Card */}
            <button 
                onClick={onBackToHome}
                className="mb-10 inline-block rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-white/10 shadow-2xl p-5 hover:bg-slate-900/60 transition-all cursor-pointer text-left group"
            >
                <Logo light={true} className="h-8 group-hover:opacity-90 transition-opacity" />
            </button>

            <h2 className="text-4xl font-bold mb-6 drop-shadow-lg text-white">Stop leaving profit on the table.</h2>
            <p className="text-slate-200 text-lg leading-relaxed drop-shadow-md font-medium">
                Join high-performing shops using SimpliParts to audit their parts orders, reduce slippage, and increase margins by an average of 20%.
            </p>
            
            <div className="mt-12 flex gap-4 text-sm text-slate-300 font-medium">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/60 border border-white/10 backdrop-blur-md shadow-lg">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.6)]"></div>
                    Tekmetric Ready
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/60 border border-white/10 backdrop-blur-md shadow-lg">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.6)]"></div>
                    PartsTech Ready
                </div>
            </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-[30%] bg-white flex flex-col justify-center px-6 lg:px-12 py-12 relative z-30">
        <div className="max-w-md w-full mx-auto">
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">{title}</h1>
                <p className="text-slate-500">{subtitle}</p>
            </div>
            {children}
        </div>
      </div>
    </div>
  );
};