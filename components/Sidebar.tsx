import React, { useState, useEffect } from 'react';
import { ViewState } from '../App';
import { LayoutDashboard, Settings, HelpCircle, UploadCloud, Search, MessageSquare, MessageCircle, X, Menu } from 'lucide-react';

interface SidebarProps {
  currentView: ViewState;
  setCurrentView: (view: ViewState) => void;
  headingName?: string;
  headingSub?: string;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  setCurrentView,
  headingName = 'My Shop',
  headingSub = 'Enterprise Plan',
  mobileMenuOpen,
  setMobileMenuOpen,
}) => {
  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [currentView, setMobileMenuOpen]);

  // Close mobile menu when clicking outside or on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (mobileMenuOpen && !target.closest('[data-sidebar]')) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('click', handleClickOutside);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen, setMobileMenuOpen]);

  const handleNavigation = (view: ViewState) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
  };
  const platformItems: Array<{
    label: string;
    view: ViewState;
    Icon: React.FC<{ size?: number; className?: string }>;
  }> = [
    { label: 'Live Feed', view: 'dashboard', Icon: LayoutDashboard },
    { label: 'Upload Files', view: 'upload-files', Icon: UploadCloud },
    { label: 'Audit RO', view: 'ro-audit', Icon: Search },
    { label: 'Ask AI', view: 'ask-ai', Icon: MessageSquare },
  ];

  const accountItems: Array<{
    label: string;
    view: ViewState;
    Icon: React.FC<{ size?: number; className?: string }>;
  }> = [
    { label: 'Shop Settings', view: 'shop-settings', Icon: Settings },
    { label: 'Support', view: 'support', Icon: HelpCircle },
    { label: 'Feedback', view: 'feedback', Icon: MessageCircle },
  ];

  const SidebarContent = () => (
    <>
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold border border-slate-200">
              {headingName?.charAt(0) || 'S'}
            </div>
            <div className="overflow-hidden">
              <div className="font-bold text-slate-900 truncate">{headingName}</div>
              <div className="text-xs text-slate-500 truncate">{headingSub}</div>
            </div>
          </div>
          {/* Mobile close button */}
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="lg:hidden p-2 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Close navigation menu"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto" role="navigation" aria-label="Main navigation">
        {/* Platform Section */}
        <div className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
          Platform
        </div>
        {platformItems.map(({ label, view, Icon }) => {
          const active = currentView === view;
          return (
            <button
              key={view}
              onClick={() => handleNavigation(view)}
              className={`flex items-center gap-3 px-3 py-3 rounded-md w-full text-left font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                active
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
              aria-current={active ? 'page' : undefined}
            >
              <Icon
                size={20}
                className={active ? 'text-blue-600' : 'text-slate-400'}
                aria-hidden="true"
              />
              {label}
            </button>
          );
        })}

        {/* Divider */}
        <div className="my-6 border-t border-slate-200" aria-hidden="true"></div>

        {/* Account Section */}
        <div className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
          Account
        </div>
        {accountItems.map(({ label, view, Icon }) => {
          const active = currentView === view;
          return (
            <button
              key={view}
              onClick={() => handleNavigation(view)}
              className={`flex items-center gap-3 px-3 py-3 rounded-md w-full text-left font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                active
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
              aria-current={active ? 'page' : undefined}
            >
              <Icon
                size={20}
                className={active ? 'text-blue-600' : 'text-slate-400'}
                aria-hidden="true"
              />
              {label}
            </button>
          );
        })}
      </nav>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className="w-64 bg-white border-r border-slate-200 hidden lg:flex flex-col fixed top-[72px] bottom-0 z-20"
        data-sidebar
        aria-label="Desktop navigation"
      >
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay - controlled by header hamburger on mobile */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40" aria-hidden="true">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" />
          <aside
            className="absolute left-0 top-0 bottom-0 w-64 bg-white border-r border-slate-200 flex flex-col shadow-2xl transform transition-transform duration-300 ease-in-out"
            data-sidebar
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            <SidebarContent />
          </aside>
        </div>
      )}
    </>
  );
};

