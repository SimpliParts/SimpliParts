import React from 'react';
import { Sidebar } from './Sidebar';
import { Button } from './ui/Button';
import { ViewState } from '../App';
import { FileText, RefreshCw, ArrowUpRight, FileDown, CheckCircle2 } from 'lucide-react';

interface RODetailProps {
  setCurrentView: (view: ViewState) => void;
  currentView: ViewState;
}

/**
 * Placeholder for a single RO detail view.
 * Shows summary, audit history, and line-level outcomes.
 */
export const RODetail: React.FC<RODetailProps> = ({ setCurrentView, currentView }) => {
  return (
    <div className="flex min-h-[calc(100vh-72px)] pt-[72px]">
      <Sidebar
        currentView={currentView}
        setCurrentView={setCurrentView}
        headingName="RO Detail"
        headingSub="Single repair order"
      />

      <div className="flex-1 lg:ml-64 bg-slate-50 min-h-full">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm">
          <div>
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-[0.15em] mb-1">RO Detail</p>
            <h1 className="text-xl font-bold text-slate-900">RO #1094 — Ford F-150</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <FileDown size={16} />
              Download PDF
            </Button>
            <Button size="sm" className="gap-2">
              <RefreshCw size={16} />
              Re-run audit
            </Button>
          </div>
        </header>

        <div className="p-8 max-w-6xl mx-auto space-y-8">
          {/* Summary cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5 space-y-1">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Vehicle</div>
              <div className="text-sm font-semibold text-slate-900">2018 Ford F-150</div>
              <div className="text-xs text-slate-500">VIN: 1FTEW1EP0JKD12345</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5 space-y-1">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Vendor spend</div>
              <div className="text-2xl font-bold text-slate-900">$612.40</div>
              <div className="text-xs text-slate-500">Original invoice total</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5 space-y-1">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Potential savings</div>
              <div className="text-2xl font-bold text-emerald-700">+$86.40</div>
              <div className="text-xs text-slate-500">3 of 7 lines have alternatives</div>
            </div>
          </div>

          {/* Audit history */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">Audit history</h3>
              <Button variant="ghost" size="sm" className="gap-2 text-slate-600">
                <FileText size={16} />
                View full log
              </Button>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 mt-2 rounded-full bg-emerald-500"></div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-slate-900">Audit completed</div>
                  <div className="text-xs text-slate-500">Found 3 cheaper vendors on 7 line items.</div>
                </div>
                <span className="text-xs text-slate-500">Just now</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 mt-2 rounded-full bg-blue-500"></div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-slate-900">Fetched Tekmetric lines</div>
                  <div className="text-xs text-slate-500">RO retrieved with line codes and net costs.</div>
                </div>
                <span className="text-xs text-slate-500">1 min ago</span>
              </div>
            </div>
          </div>

          {/* Line items */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Line items</h3>
                <p className="text-sm text-slate-600">Original vs recommended vendors with savings.</p>
              </div>
              <Button size="sm" variant="outline" className="gap-2">
                <ArrowUpRight size={16} />
                Open in Tekmetric
              </Button>
            </div>

            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <div className="grid grid-cols-12 gap-4 px-4 py-2 bg-slate-50 text-xs font-semibold text-slate-500">
                <div className="col-span-4">Part</div>
                <div className="col-span-2">Paid</div>
                <div className="col-span-2">Recommended</div>
                <div className="col-span-2">Savings</div>
                <div className="col-span-2 text-right">Status</div>
              </div>

              {[1, 2, 3].map((i) => (
                <div key={i} className="grid grid-cols-12 gap-4 px-4 py-3 border-t border-slate-100 items-center">
                  <div className="col-span-4">
                    <div className="text-sm font-semibold text-slate-900">Brake Pads (Ceramic)</div>
                    <div className="text-xs text-slate-500">Part #BP-4431 • Line: BOS</div>
                  </div>
                  <div className="col-span-2 text-sm text-slate-800">$85.00</div>
                  <div className="col-span-2">
                    <div className="text-sm font-semibold text-slate-900">WorldPac</div>
                    <div className="text-xs text-slate-500">$72.60 • In stock</div>
                  </div>
                  <div className="col-span-2 text-sm font-semibold text-emerald-700">+$12.40</div>
                  <div className="col-span-2 flex items-center justify-end gap-1 text-sm text-emerald-700 font-semibold">
                    <CheckCircle2 size={16} />
                    Applied
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

