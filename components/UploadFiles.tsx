import React, { useState } from 'react';
import { UploadCloud, FileText, AlertCircle } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { Button } from './ui/Button';
import { guardUsage, startCheckout } from '../lib/billing';

interface UploadFilesProps {
  setCurrentView: (view: import('../App').ViewState) => void;
  currentView: import('../App').ViewState;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const UploadFiles: React.FC<UploadFilesProps> = ({ setCurrentView, currentView, mobileMenuOpen, setMobileMenuOpen }) => {
  const [usageMessage, setUsageMessage] = useState<string | null>(null);
  const [usageError, setUsageError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const checkAccess = async () => {
    try {
      setLoading(true);
      setUsageError(null);
      const { data, error, status } = await guardUsage();
      if (error) {
        setUsageError(error.message || 'Unable to check access');
        return;
      }
      if (status === 402 || data?.allowed === false) {
        setUsageError('No free credits left. Please upgrade to continue.');
        return;
      }
      if (data?.allowed) {
        const remaining = data.remaining_credits ?? 'unlimited';
        setUsageMessage(
          data.reason === 'active_subscription'
            ? 'Subscription active — upload enabled.'
            : `Free credit used. ${remaining} credits remaining.`
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpgrade = async () => {
    try {
      setLoading(true);
      const { url } = await startCheckout();
      if (url) window.location.href = url;
    } catch (err: any) {
      setUsageError(err.message || 'Could not start checkout');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-72px)] pt-[72px]">
      <Sidebar
        currentView={currentView}
        setCurrentView={setCurrentView}
        headingName="Uploads"
        headingSub="Import repair orders"
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
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
                  <Button className="md:w-40" onClick={checkAccess} disabled={loading}>
                    {loading ? 'Checking...' : 'Start Upload'}
                  </Button>
                  <Button variant="outline" className="md:w-36" onClick={handleUpgrade} disabled={loading}>
                    Upgrade
                  </Button>
                </div>
                {usageMessage && (
                  <p className="text-sm text-emerald-600">{usageMessage}</p>
                )}
                {usageError && (
                  <p className="text-sm text-red-600">{usageError}</p>
                )}
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

