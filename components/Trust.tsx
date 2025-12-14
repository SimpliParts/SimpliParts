import React from 'react';

export const Trust: React.FC = () => {
  return (
    <section className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-10">
          Seamlessly Integrated With Your Stack
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24">
            {/* Stylized Text Logos */}
            <div className="flex items-center gap-2 group opacity-60 hover:opacity-100 transition-all duration-300">
                <div className="text-3xl md:text-4xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">Tekmetric</div>
            </div>
            
            <div className="h-12 w-px bg-slate-200 hidden sm:block"></div>

            <div className="flex items-center gap-2 group opacity-60 hover:opacity-100 transition-all duration-300">
                <div className="text-3xl md:text-4xl font-bold text-slate-800 italic group-hover:text-red-600 transition-colors">PartsTech</div>
            </div>
        </div>

        <div className="mt-20 max-w-4xl mx-auto bg-slate-50 rounded-2xl p-8 md:p-12 border border-slate-100 shadow-sm relative overflow-hidden">
          {/* Quote decoration */}
          <div className="absolute top-6 left-8 text-9xl text-slate-200 font-serif opacity-50 leading-none h-16 pointer-events-none">"</div>
          
          <blockquote className="text-xl md:text-2xl font-medium text-slate-800 mb-8 relative z-10 leading-relaxed">
            We thought we had our parts pricing under control. SimpliParts found us <span className="text-emerald-600 font-bold bg-emerald-50 px-1 rounded">$10,700 in lost margin</span> in the first month alone. It's a no-brainer for any shop doing volume.
          </blockquote>
          
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg border-2 border-white shadow-sm">
                JD
            </div>
            <div className="text-left">
              <div className="font-bold text-slate-900">Jason Davis</div>
              <div className="text-sm text-slate-500">Owner, Davis Automotive Group</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};