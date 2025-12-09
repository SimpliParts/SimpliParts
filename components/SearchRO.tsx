import React from 'react';
import { Sidebar } from './Sidebar';
import { Search, Clock3, Info } from 'lucide-react';
import { Button } from './ui/Button';

interface SearchROProps {
  setCurrentView: (view: import('../App').ViewState) => void;
  currentView: import('../App').ViewState;
}

export const SearchRO: React.FC<SearchROProps> = ({ setCurrentView, currentView }) => {
  return (
    <div className="flex min-h-[calc(100vh-72px)] pt-[72px]">
      <Sidebar
        currentView={currentView}
        setCurrentView={setCurrentView}
        headingName="Search RO"
        headingSub="Find repair orders"
      />

      <div className="flex-1 lg:ml-64 bg-slate-50 min-h-full">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm">
          <h1 className="text-xl font-bold text-slate-900">Search RO Number</h1>
          <div className="text-sm text-slate-500 flex items-center gap-2">
            <Info size={16} className="text-blue-500" />
            Search by RO number or vendor reference.
          </div>
        </header>

        <div className="p-8 max-w-4xl mx-auto space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-4">
            <label className="block text-sm font-medium text-slate-700">RO number</label>
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
                <Search size={18} className="text-slate-400" />
                <input
                  type="text"
                  placeholder="e.g., RO-1094"
                  className="flex-1 outline-none text-sm text-slate-900 placeholder:text-slate-400"
                />
              </div>
              <Button className="md:w-36">Search</Button>
            </div>
            <p className="text-xs text-slate-500 flex items-center gap-1">
              <Clock3 size={14} className="text-slate-400" />
              Recent ROs shown below. Full-text search coming soon.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
            <h3 className="text-sm font-semibold text-slate-900 mb-2">Recent repair orders</h3>
            <p className="text-sm text-slate-500">No recent results yet. Upload files to start seeing ROs here.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

