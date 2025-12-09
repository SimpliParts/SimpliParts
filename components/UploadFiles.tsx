import React from 'react';
import { UploadCloud, FileText, AlertCircle } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { Button } from './ui/Button';

interface UploadFilesProps {
  setCurrentView: (view: import('../App').ViewState) => void;
  currentView: import('../App').ViewState;
}

export const UploadFiles: React.FC<UploadFilesProps> = ({ setCurrentView, currentView }) => {
  return (
    <div className="flex min-h-[calc(100vh-72px)] pt-[72px]">
      <Sidebar
        currentView={currentView}
        setCurrentView={setCurrentView}
        headingName="Uploads"
        headingSub="Import repair orders"
      />

      <div className="flex-1 lg:ml-64 bg-slate-50 min-h-full">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm">
          <h1 className="text-xl font-bold text-slate-900">Upload Files</h1>
          <div className="text-sm text-slate-500 flex items-center gap-2">
            <AlertCircle size={16} className="text-amber-500" />
            PDF invoices supported; CSV coming soon.
          </div>
        </header>

        <div className="p-8 max-w-4xl mx-auto space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                <UploadCloud size={24} />
              </div>
              <div className="space-y-4 flex-1">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Drag & drop files</h3>
                  <p className="text-sm text-slate-600">Upload repair order PDFs to process line items automatically.</p>
                </div>
                <div className="flex flex-col md:flex-row gap-3">
                  <label className="flex-1 border-2 border-dashed border-slate-200 rounded-lg p-6 text-center cursor-pointer hover:border-blue-200 hover:bg-blue-50/40 transition-colors">
                    <input type="file" multiple className="hidden" />
                    <div className="flex flex-col items-center gap-2 text-slate-600">
                      <FileText size={20} className="text-slate-400" />
                      <span className="text-sm">Drop files here or click to browse</span>
                      <span className="text-xs text-slate-400">PDF up to 20MB each</span>
                    </div>
                  </label>
                  <Button className="md:w-40">Start Upload</Button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
            <h3 className="text-sm font-semibold text-slate-900 mb-2">Recent uploads</h3>
            <p className="text-sm text-slate-500">No uploads yet. Your latest files will appear here.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

