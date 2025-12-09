import React from 'react';
import { ViewState } from '../App';
import { LayoutDashboard, Settings, HelpCircle, UploadCloud, Search, MessageSquare } from 'lucide-react';

interface SidebarProps {
  currentView: ViewState;
  setCurrentView: (view: ViewState) => void;
  headingName?: string;
  headingSub?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  setCurrentView,
  headingName = 'My Shop',
  headingSub = 'Enterprise Plan',
}) => {
  const navItems: Array<{
    label: string;
    view: ViewState;
    Icon: React.FC<{ size?: number; className?: string }>;
  }> = [
    { label: 'Live Feed', view: 'dashboard', Icon: LayoutDashboard },
    { label: 'Upload Files', view: 'upload-files', Icon: UploadCloud },
    { label: 'Audit RO', view: 'ro-audit', Icon: Search },
    { label: 'Ask AI', view: 'ask-ai', Icon: MessageSquare },
    { label: 'Shop Settings', view: 'shop-settings', Icon: Settings },
    { label: 'Support', view: 'support', Icon: HelpCircle },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 hidden lg:flex flex-col fixed top-[72px] bottom-0 z-20">
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold border border-slate-200">
            {headingName?.charAt(0) || 'S'}
          </div>
          <div className="overflow-hidden">
            <div className="font-bold text-slate-900 truncate">{headingName}</div>
            <div className="text-xs text-slate-500 truncate">{headingSub}</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <div className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
          Platform
        </div>
        {navItems.map(({ label, view, Icon }) => {
          const active = currentView === view;
          return (
            <button
              key={view}
              onClick={() => setCurrentView(view)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md w-full text-left font-medium transition-colors ${
                active
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Icon
                size={20}
                className={active ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'}
              />
              {label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

