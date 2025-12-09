import React from 'react';
import { Sidebar } from './Sidebar';
import { Button } from './ui/Button';
import { ViewState } from '../App';
import { Search, Clock3, Activity, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

interface ROAuditProps {
  setCurrentView: (view: ViewState) => void;
  currentView: ViewState;
}

/**
 * Placeholder audit workbench that mirrors the intended flow:
 * 1) Search RO (Tekmetric) -> fetch line items
 * 2) Query PartsTech for replacements
 * 3) Review savings + push to Tekmetric
 */
export const ROAudit: React.FC<ROAuditProps> = ({ setCurrentView, currentView }) => {
  return (
    <div className="flex min-h-[calc(100vh-72px)] pt-[72px]">
      <Sidebar
        currentView={currentView}
        setCurrentView={setCurrentView}
        headingName="RO Audit"
        headingSub="Search • Audit • Replace"
      />

      <div className="flex-1 lg:ml-64 bg-slate-50 min-h-full">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm">
          <div>
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-[0.15em] mb-1">Audit & Replace</p>
            <h1 className="text-xl font-bold text-slate-900">Search RO, audit parts, push replacements</h1>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Activity size={16} />
            Re-run last audit
          </Button>
        </header>

        <div className="p-8 max-w-6xl mx-auto space-y-8">
          {/* Step 1: Search */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-[0.15em]">Step 1</div>
                <h3 className="text-lg font-semibold text-slate-900">Find a repair order (Tekmetric)</h3>
                <p className="text-sm text-slate-600">Enter RO # to fetch parts and line codes before shopping PartsTech.</p>
              </div>
              <div className="hidden md:flex items-center gap-2 text-xs text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full">
                <Clock3 size={14} />
                <span>Live fetch</span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent bg-slate-50/50">
                <Search size={18} className="text-slate-400" />
                <input
                  type="text"
                  placeholder="RO number (e.g., 1094) or vendor ref"
                  className="flex-1 outline-none text-sm text-slate-900 placeholder:text-slate-400 bg-transparent"
                />
              </div>
              <Button className="md:w-44 gap-2">
                Run audit
                <ArrowRight size={16} />
              </Button>
            </div>
            <p className="text-xs text-slate-500">We’ll pull Tekmetric line items, then query PartsTech for price/availability.</p>
          </div>

          {/* Step 2: Progress */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-[0.15em]">Step 2</div>
                <h3 className="text-lg font-semibold text-slate-900">Audit progress</h3>
                <p className="text-sm text-slate-600">Track Tekmetric fetch and PartsTech comparisons.</p>
              </div>
              <div className="text-xs text-slate-500 bg-emerald-50 text-emerald-700 border border-emerald-100 px-3 py-1.5 rounded-full">
                Live status stream
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/40">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Tekmetric</div>
                <div className="text-lg font-bold text-slate-900">RO #1094</div>
                <p className="text-sm text-slate-600">Fetched 7 line items with line codes.</p>
              </div>
              <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/40">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">PartsTech</div>
                <div className="text-lg font-bold text-slate-900">5 matched</div>
                <p className="text-sm text-slate-600">Queries running for availability and net cost.</p>
              </div>
              <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/40">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Potential savings</div>
                <div className="text-lg font-bold text-emerald-700">+$86.40</div>
                <p className="text-sm text-slate-600">Based on best available vendor options.</p>
              </div>
            </div>
          </div>

          {/* Step 3: Results */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-[0.15em]">Step 3</div>
                <h3 className="text-lg font-semibold text-slate-900">Review and push replacements</h3>
                <p className="text-sm text-slate-600">Approve items to write back to Tekmetric.</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  Export report
                </Button>
                <Button size="sm" className="gap-2">
                  Apply all to Tekmetric
                </Button>
              </div>
            </div>

            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <div className="grid grid-cols-12 gap-4 px-4 py-2 bg-slate-50 text-xs font-semibold text-slate-500">
                <div className="col-span-3">Line item</div>
                <div className="col-span-2">Paid</div>
                <div className="col-span-2">Best vendor</div>
                <div className="col-span-2">Savings</div>
                <div className="col-span-3 text-right">Actions</div>
              </div>

              {[1, 2, 3].map((i) => (
                <div key={i} className="grid grid-cols-12 gap-4 px-4 py-3 border-t border-slate-100 items-center">
                  <div className="col-span-3">
                    <div className="text-sm font-semibold text-slate-900">Alternator (Reman)</div>
                    <div className="text-xs text-slate-500">GL-8722-RM • Line: RAY</div>
                  </div>
                  <div className="col-span-2 text-sm text-slate-800">$166.50</div>
                  <div className="col-span-2">
                    <div className="text-sm font-semibold text-slate-900">WorldPac</div>
                    <div className="text-xs text-slate-500">$142.00 • In stock</div>
                  </div>
                  <div className="col-span-2 text-sm font-semibold text-emerald-700">+$24.50</div>
                  <div className="col-span-3 flex items-center justify-end gap-2">
                    <Button size="sm" variant="outline" className="gap-2">
                      <CheckCircle2 size={16} />
                      Use part
                    </Button>
                    <Button size="sm" variant="ghost" className="text-slate-500 gap-1">
                      <AlertTriangle size={16} className="text-amber-500" />
                      Ignore
                    </Button>
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

