import React, { useState, useEffect } from 'react';
import { Button } from './ui/Button';
import { Menu, X, LogOut } from 'lucide-react';
import { Logo } from './ui/Logo';
import { ViewState } from '../App';
import { supabase } from '../lib/supabase';
import { Session } from '@supabase/supabase-js';

interface HeaderProps {
  currentView: ViewState;
  setCurrentView: (view: ViewState) => void;
  session?: Session | null;
}

export const Header: React.FC<HeaderProps> = ({ currentView, setCurrentView, session }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMobileNav = () => {
    setMobileMenuOpen(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setCurrentView('landing');
    setMobileMenuOpen(false);
  };


  const isAppView = currentView !== 'landing';
  const isDashboardView = ['dashboard', 'shop-settings', 'support', 'feedback', 'upload-files', 'ro-audit', 'ro-detail', 'ask-ai'].includes(currentView);

  const dashboardNavItems = [
    { label: 'Dashboard', view: 'dashboard' as const },
    { label: 'Upload Files', view: 'upload-files' as const },
    { label: 'Audit RO', view: 'ro-audit' as const },
    { label: 'Ask AI', view: 'ask-ai' as const },
    { label: 'Shop Settings', view: 'shop-settings' as const },
    { label: 'Support', view: 'support' as const },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    handleMobileNav();
    
    if (currentView !== 'landing') {
      setCurrentView('landing');
      // Wait for render then scroll
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    }
  };

  const navigateTo = (view: ViewState) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 min-h-[72px] ${
        scrolled || isAppView
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/60 shadow-[0_1px_0_rgba(15,23,42,0.06)] py-4'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo Logic: 
              - Landing/Dashboard: Show Logo, clickable to Home/Dashboard
              - Login/Signup: Hide Logo visually to keep layout but cleaner look
          */}
          {currentView === 'landing' || currentView === 'dashboard' ? (
            <button 
              onClick={() => currentView === 'dashboard' ? null : window.scrollTo({ top: 0, behavior: 'smooth' })}
              className={`block hover:opacity-80 transition-opacity cursor-pointer ${currentView === 'dashboard' ? 'cursor-default' : ''}`}
            >
              <Logo />
            </button>
          ) : (
             // Placeholder for Auth pages
             <div className="invisible" aria-hidden="true">
               <Logo />
             </div>
          )}

          {currentView === 'landing' ? (
            <nav className="hidden md:flex items-center gap-8">
              <a href="#workflow" onClick={(e) => scrollToSection(e, 'workflow')} className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">How it Works</a>
              <a href="#roi" onClick={(e) => scrollToSection(e, 'roi')} className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">ROI Calculator</a>
              <a href="#pricing" onClick={(e) => scrollToSection(e, 'pricing')} className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Pricing</a>
            </nav>
          ) : (
            <div className="hidden md:block flex-1"></div>
          )}

          <div className="hidden md:flex items-center gap-4">
            {currentView === 'landing' && !session && (
              <>
                 <button onClick={() => navigateTo('login')} className="text-sm font-medium text-slate-600 hover:text-slate-900">Log in</button>
                 <Button size="sm" onClick={() => navigateTo('signup')}>Get Started</Button>
              </>
            )}


            {/* Dashboard & Settings Views - Show Sign Out */}
            {(currentView === 'dashboard' || currentView === 'shop-settings' || currentView === 'support' || currentView === 'upload-files' || currentView === 'ro-audit' || currentView === 'ro-detail' || currentView === 'ask-ai') && (
              <Button variant="outline" size="sm" onClick={handleSignOut} className="gap-2">
                <LogOut size={14} />
                Sign Out
              </Button>
            )}

            {currentView === 'login' && (
              <span className="text-sm text-slate-500">Don't have an account? <button onClick={() => navigateTo('signup')} className="font-semibold text-blue-600 hover:underline">Sign up</button></span>
            )}
            {currentView === 'signup' && (
              <span className="text-sm text-slate-500">Already have an account? <button onClick={() => navigateTo('login')} className="font-semibold text-blue-600 hover:underline">Log in</button></span>
            )}
          </div>

          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-slate-600">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-200 p-4 shadow-xl animate-in slide-in-from-top-2 duration-200 max-h-[calc(100vh-72px)] overflow-y-auto">
          <nav className="flex flex-col gap-4">
            {currentView === 'landing' && (
              <>
                <a href="#workflow" onClick={(e) => scrollToSection(e, 'workflow')} className="text-sm font-medium text-slate-600 block py-2">How it Works</a>
                <a href="#roi" onClick={(e) => scrollToSection(e, 'roi')} className="text-sm font-medium text-slate-600 block py-2">ROI Calculator</a>
                <a href="#pricing" onClick={(e) => scrollToSection(e, 'pricing')} className="text-sm font-medium text-slate-600 block py-2">Pricing</a>
                <hr className="border-slate-100" />
              </>
            )}

            {session && isDashboardView && (
              <>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider py-2">Navigation</div>
                {dashboardNavItems.map((item) => (
                  <button
                    key={item.view}
                    onClick={() => navigateTo(item.view)}
                    className={`text-sm font-medium py-2 text-left transition-colors ${
                      currentView === item.view
                        ? 'text-blue-600 font-semibold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                <hr className="border-slate-100" />
              </>
            )}

            {!session && (
                <>
                    <button onClick={() => navigateTo('login')} className="text-sm font-medium text-slate-600 py-2 text-left">Log in</button>
                    <Button className="w-full" onClick={() => navigateTo('signup')}>Get Started</Button>
                </>
            )}


            {session && (
                <Button variant="outline" className="w-full justify-center" onClick={handleSignOut}>Sign Out</Button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};