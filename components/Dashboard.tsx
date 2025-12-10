import React, { useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { ViewState } from '../App';
import { Bell, ArrowUpRight, Check, UploadCloud, Compass, LineChart, BarChart3 } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { Button } from './ui/Button';
import { fetchShopInfo, openBillingPortal, ShopInfo, startCheckout } from '../lib/billing';

interface DashboardProps {
  session: Session | null;
  setCurrentView: (view: ViewState) => void;
  currentView: ViewState;
}

export const Dashboard: React.FC<DashboardProps> = ({ session, setCurrentView, currentView }) => {
  // Get user details (fallback if metadata is missing)
  const firstName = session?.user?.user_metadata?.first_name || 'Partner';
  const shopName = session?.user?.user_metadata?.shop_name || 'My Shop';
  const [shop, setShop] = useState<ShopInfo | null>(null);
  const [billingLoading, setBillingLoading] = useState(false);
  const [billingError, setBillingError] = useState<string | null>(null);

  useEffect(() => {
    if (session?.user?.id) {
      fetchShopInfo(session.user.id).then(setShop).catch((err) => {
        console.error('Failed to load shop info', err);
      });
    }
  }, [session?.user?.id]);

  const handleUpgrade = async () => {
    try {
      setBillingLoading(true);
      setBillingError(null);
      const { url } = await startCheckout();
      if (url) window.location.href = url;
    } catch (err: any) {
      setBillingError(err.message || 'Could not start checkout');
    } finally {
      setBillingLoading(false);
    }
  };

  const handleManageBilling = async () => {
    try {
      setBillingLoading(true);
      setBillingError(null);
      const { url } = await openBillingPortal();
      if (url) window.location.href = url;
    } catch (err: any) {
      setBillingError(err.message || 'Could not open billing portal');
    } finally {
      setBillingLoading(false);
    }
  };

  const isActive = shop?.subscription_status === 'active';
  const credits = shop?.free_credits_remaining ?? 0;

  return (
    <div className="flex min-h-[calc(100vh-72px)] pt-[72px]">
      <Sidebar
        currentView={currentView}
        setCurrentView={setCurrentView}
        headingName={shop?.name || shopName}
        headingSub={isActive ? 'Active' : 'Free Tier'}
      />

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 bg-slate-50 min-h-full">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm">
           <div>
             <p className="text-xs font-semibold text-blue-600 uppercase tracking-[0.15em] mb-1">Analytics</p>
             <h1 className="text-xl font-bold text-slate-900">Performance overview</h1>
           </div>
           <div className="flex items-center gap-4">
              <div className="flex flex-col items-end mr-4">
                  <span className="text-xs text-slate-500">Hi, {firstName}</span>
                  <span className="text-lg font-bold text-emerald-600">+$248.50 today</span>
              </div>
              <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-blue-600 hover:bg-slate-50 transition-colors relative">
                 <Bell size={20} />
                 <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-red-500 border border-white"></span>
              </button>
           </div>
        </header>

        <div className="p-8 max-w-6xl mx-auto">
             {/* Billing status */}
             <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5 mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
               <div>
                 <div className="text-xs font-semibold text-slate-500 uppercase tracking-[0.15em]">Account</div>
                 <h3 className="text-lg font-semibold text-slate-900">
                   {isActive ? 'Subscription active' : 'Free tier'}
                 </h3>
                 <p className="text-sm text-slate-600">
                   {isActive
                     ? 'Unlimited audits and queries are enabled.'
                     : `You have ${credits} free queries remaining.`}
                 </p>
                 {billingError && (
                   <p className="text-sm text-red-600 mt-2">{billingError}</p>
                 )}
               </div>
               <div className="flex flex-wrap gap-3">
                 {isActive ? (
                   <Button variant="outline" onClick={handleManageBilling} disabled={billingLoading}>
                     Manage billing
                   </Button>
                 ) : (
                   <Button onClick={handleUpgrade} disabled={billingLoading}>
                     {billingLoading ? 'Redirecting...' : 'Upgrade'}
                   </Button>
                 )}
               </div>
             </div>
             
             {/* Quick Actions */}
             <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-[0.15em]">Workspace</div>
                  <h2 className="text-lg font-semibold text-slate-900">Pick a workflow</h2>
                  <p className="text-sm text-slate-600">Upload new RO PDFs or launch a live audit against Tekmetric.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button onClick={() => setCurrentView('upload-files')} className="gap-2">
                    <UploadCloud size={16} />
                    Upload RO
                  </Button>
                  <Button variant="outline" onClick={() => setCurrentView('ro-audit')} className="gap-2">
                    <Compass size={16} />
                    Audit RO
                  </Button>
                </div>
             </div>
             
             {/* Stats Cards */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                 <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="text-slate-500 text-sm font-medium mb-1">Total Savings (MTD)</div>
                    <div className="text-3xl font-bold text-slate-900">$2,840.50</div>
                    <div className="text-emerald-600 text-sm font-medium mt-2 flex items-center gap-1">
                        <ArrowUpRight size={14} /> +12% vs last month
                    </div>
                 </div>
                 <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="text-slate-500 text-sm font-medium mb-1">Parts Audited</div>
                    <div className="text-3xl font-bold text-slate-900">482</div>
                    <div className="text-blue-600 text-sm font-medium mt-2">
                        100% Coverage
                    </div>
                 </div>
                 <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="text-slate-500 text-sm font-medium mb-1">Active Slippage</div>
                    <div className="text-3xl font-bold text-slate-900">2.4%</div>
                    <div className="text-emerald-600 text-sm font-medium mt-2 flex items-center gap-1">
                        <Check size={14} /> Target achieved
                    </div>
                 </div>
             </div>

             {/* Savings trend + category mix */}
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 lg:col-span-2">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-xs font-semibold text-slate-500 uppercase tracking-[0.15em]">Trend</div>
                      <h3 className="text-lg font-semibold text-slate-900">Missed savings vs captured</h3>
                      <p className="text-sm text-slate-600">Last 8 weeks across all vendors.</p>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                      <LineChart size={18} />
                    </div>
                  </div>
                  <div className="h-48 rounded-lg bg-gradient-to-b from-slate-50 to-white border border-dashed border-slate-200 flex items-center justify-center text-slate-400 text-sm">
                    Chart placeholder (hook to savings trend data)
                  </div>
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="p-3 rounded-lg border border-slate-100 bg-slate-50/50">
                      <div className="text-xs text-slate-500">Captured</div>
                      <div className="text-lg font-bold text-emerald-700">$8,420</div>
                    </div>
                    <div className="p-3 rounded-lg border border-slate-100 bg-slate-50/50">
                      <div className="text-xs text-slate-500">Missed</div>
                      <div className="text-lg font-bold text-amber-600">$2,130</div>
                    </div>
                    <div className="p-3 rounded-lg border border-slate-100 bg-slate-50/50">
                      <div className="text-xs text-slate-500">Coverage</div>
                      <div className="text-lg font-bold text-slate-900">92%</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-xs font-semibold text-slate-500 uppercase tracking-[0.15em]">Mix</div>
                      <h3 className="text-lg font-semibold text-slate-900">Category breakdown</h3>
                      <p className="text-sm text-slate-600">Top audited categories.</p>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                      <BarChart3 size={18} />
                    </div>
                  </div>
                  <div className="space-y-3">
                    {[
                      { label: 'Brakes', value: 38, color: 'bg-blue-500' },
                      { label: 'Suspension', value: 24, color: 'bg-emerald-500' },
                      { label: 'Engine', value: 18, color: 'bg-amber-500' },
                      { label: 'HVAC', value: 12, color: 'bg-slate-400' },
                    ].map((item) => (
                      <div key={item.label} className="space-y-1">
                        <div className="flex items-center justify-between text-sm text-slate-700">
                          <span>{item.label}</span>
                          <span className="text-xs text-slate-500">{item.value}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-slate-100">
                          <div className={`h-2 rounded-full ${item.color}`} style={{ width: `${item.value}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
             </div>

             {/* Vendor scorecard */}
             <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-8">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div>
                      <div className="text-xs font-semibold text-slate-500 uppercase tracking-[0.15em]">Vendors</div>
                      <h3 className="font-semibold text-slate-900">Vendor scorecard</h3>
                      <p className="text-sm text-slate-600">Fill rates, avg savings, and response time.</p>
                    </div>
                </div>
                <div className="divide-y divide-slate-100">
                  {[
                    { vendor: 'WorldPac', savings: '$32.10', fill: '94%', eta: '45m', color: 'text-emerald-700' },
                    { vendor: 'NAPA', savings: '$18.40', fill: '91%', eta: '50m', color: 'text-emerald-700' },
                    { vendor: 'O\'Reilly', savings: '$12.80', fill: '88%', eta: '55m', color: 'text-amber-600' },
                    { vendor: 'AutoZone', savings: '$9.10', fill: '85%', eta: '60m', color: 'text-amber-600' },
                  ].map((row) => (
                    <div key={row.vendor} className="px-6 py-3 grid grid-cols-4 gap-4 text-sm text-slate-800">
                      <div className="font-semibold text-slate-900">{row.vendor}</div>
                      <div className={row.color}>{row.savings} avg</div>
                      <div className="text-slate-700">{row.fill} fill</div>
                      <div className="text-slate-500">{row.eta} avg ETA</div>
                    </div>
                  ))}
                </div>
             </div>

             {/* Pipeline + opportunities */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-4">
                 <div>
                   <div className="text-xs font-semibold text-slate-500 uppercase tracking-[0.15em]">Pipeline</div>
                   <h3 className="text-lg font-semibold text-slate-900">RO pipeline</h3>
                   <p className="text-sm text-slate-600">What’s processed, in audit, and awaiting upload.</p>
                 </div>
                 <div className="space-y-3">
                   {[
                     { label: 'Processed', value: 68, total: 92, color: 'bg-emerald-500' },
                     { label: 'In audit', value: 18, total: 92, color: 'bg-blue-500' },
                     { label: 'Awaiting upload', value: 6, total: 92, color: 'bg-slate-400' },
                   ].map((row) => {
                     const pct = Math.round((row.value / row.total) * 100);
                     return (
                       <div key={row.label} className="space-y-1">
                         <div className="flex items-center justify-between text-sm text-slate-700">
                           <span>{row.label}</span>
                           <span className="text-xs text-slate-500">{pct}%</span>
                         </div>
                         <div className="h-2 rounded-full bg-slate-100">
                           <div className={`h-2 rounded-full ${row.color}`} style={{ width: `${pct}%` }}></div>
                         </div>
                       </div>
                     );
                   })}
                 </div>
               </div>

               <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-4">
                 <div className="flex items-center justify-between">
                   <div>
                     <div className="text-xs font-semibold text-slate-500 uppercase tracking-[0.15em]">Opportunities</div>
                     <h3 className="text-lg font-semibold text-slate-900">Top savings candidates</h3>
                     <p className="text-sm text-slate-600">High-dollar ROs to prioritize.</p>
                   </div>
                   <Button variant="outline" size="sm">View all</Button>
                 </div>
                 <div className="divide-y divide-slate-100">
                   {[
                     { ro: '#1101', vehicle: '2020 Ram 1500', savings: '$64.20' },
                     { ro: '#1100', vehicle: '2019 Honda Accord', savings: '$41.80' },
                     { ro: '#1099', vehicle: '2017 Ford Escape', savings: '$33.40' },
                   ].map((item) => (
                     <div key={item.ro} className="py-3 flex items-center justify-between">
                       <div>
                         <div className="text-sm font-semibold text-slate-900">{item.ro}</div>
                         <div className="text-xs text-slate-500">{item.vehicle}</div>
                       </div>
                       <div className="text-sm font-bold text-emerald-700">{item.savings}</div>
                     </div>
                   ))}
                 </div>
               </div>
             </div>
        </div>
      </div>
    </div>
  );
};