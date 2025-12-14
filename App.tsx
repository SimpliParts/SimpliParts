import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { RoiCalculator } from './components/RoiCalculator';
import { Workflow } from './components/Workflow';
import { Trust } from './components/Trust';
import { Pricing } from './components/Pricing';
import { Footer } from './components/Footer';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { ForgotPassword } from './components/ForgotPassword';
import { ResetPassword } from './components/ResetPassword';
import { Dashboard } from './components/Dashboard';
import { ShopSettings } from './components/ShopSettings';
import { Support } from './components/Support';
import { UploadFiles } from './components/UploadFiles';
import { ROAudit } from './components/ROAudit';
import { RODetail } from './components/RODetail';
import { AskAI } from './components/AskAI';
import { Feedback } from './components/Feedback';
import { supabase } from './lib/supabase';
import { Session } from '@supabase/supabase-js';
import { MaintenanceGate } from './components/MaintenanceGate';
import { Analytics } from '@vercel/analytics/react';
import { fetchShopInfo, ShopInfo } from './lib/billing';

export type ViewState =
  | 'landing'
  | 'login'
  | 'signup'
  | 'forgot-password'
  | 'reset-password'
  | 'dashboard'
  | 'shop-settings'
  | 'support'
  | 'feedback'
  | 'upload-files'
  | 'ro-audit'
  | 'ro-detail'
  | 'ask-ai';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [maintenanceUnlocked, setMaintenanceUnlocked] = useState(false);
  const [shop, setShop] = useState<ShopInfo | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const maintenanceEnabled = import.meta.env.VITE_MAINTENANCE_MODE === 'true';
  const previewPassword = import.meta.env.VITE_PREVIEW_PASSWORD || '';

  useEffect(() => {
    // Check persisted maintenance bypass
    const storedBypass = localStorage.getItem('simpli:maintenance:unlock');
    if (storedBypass === 'true') {
      setMaintenanceUnlocked(true);
    }

    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        setCurrentView((prev) =>
          prev === 'landing' ? 'dashboard' : prev
        );
      }
      setLoading(false);
    }).catch((err) => {
      // Gracefully handle missing keys or network errors
      console.warn("Supabase session check failed (likely missing API keys):", err);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);

      // Fetch shop info when user signs in
      if (session?.user?.id) {
        try {
          const shopInfo = await fetchShopInfo(session.user.id);
          setShop(shopInfo);
        } catch (err) {
          console.error('Failed to load shop info', err);
          setShop(null);
        }
      } else {
        setShop(null);
      }

      setCurrentView((prev) => {
        if (session) {
          // Only redirect to dashboard from public/auth views
          return (prev === 'landing' || prev === 'login' || prev === 'signup' || prev === 'forgot-password' || prev === 'reset-password')
            ? 'dashboard'
            : prev;
        }

        // On sign-out, return to landing from protected views
        if (prev === 'dashboard' || prev === 'shop-settings' || prev === 'support' || prev === 'feedback' || prev === 'upload-files' || prev === 'ro-audit' || prev === 'ro-detail' || prev === 'ask-ai') {
          return 'landing';
        }

        return prev;
      });
    });

    return () => subscription.unsubscribe();
  }, []);

  const navigateToSignup = () => {
    setCurrentView('signup');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    const headerOffset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
  };

  const handleUnlock = () => {
    setMaintenanceUnlocked(true);
    localStorage.setItem('simpli:maintenance:unlock', 'true');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (maintenanceEnabled && !maintenanceUnlocked) {
    return <MaintenanceGate onUnlock={handleUnlock} previewPassword={previewPassword} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden selection:bg-blue-100 selection:text-blue-900">
      {/* Background Pattern */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.4]" 
           style={{
             backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
             backgroundSize: '32px 32px'
           }}>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header currentView={currentView} setCurrentView={setCurrentView} session={session} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
        
        <main className="flex-grow">
          {currentView === 'landing' && (
            <>
              <Hero 
                onGetStarted={navigateToSignup}
                onSeeHowItWorks={() => scrollToSection('workflow')}
              />
              <Trust />
              <Workflow />
              <RoiCalculator />
              <Pricing onStart={navigateToSignup} />
            </>
          )}
          
          {currentView === 'login' && <Login setCurrentView={setCurrentView} />}
          {currentView === 'signup' && <Signup setCurrentView={setCurrentView} />}
          {currentView === 'forgot-password' && <ForgotPassword setCurrentView={setCurrentView} />}
          {currentView === 'reset-password' && <ResetPassword setCurrentView={setCurrentView} />}
          {currentView === 'dashboard' && <Dashboard session={session} setCurrentView={setCurrentView} currentView={currentView} shop={shop} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />}
          {currentView === 'shop-settings' && <ShopSettings session={session} setCurrentView={setCurrentView} currentView={currentView} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />}
          {currentView === 'support' && <Support setCurrentView={setCurrentView} currentView={currentView} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />}
          {currentView === 'feedback' && <Feedback setCurrentView={setCurrentView} currentView={currentView} session={session} shop={shop} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />}
          {currentView === 'upload-files' && <UploadFiles setCurrentView={setCurrentView} currentView={currentView} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />}
          {currentView === 'ro-audit' && <ROAudit setCurrentView={setCurrentView} currentView={currentView} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />}
          {currentView === 'ro-detail' && <RODetail setCurrentView={setCurrentView} currentView={currentView} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />}
          {currentView === 'ask-ai' && <AskAI setCurrentView={setCurrentView} currentView={currentView} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />}
        </main>

        {currentView === 'landing' && <Footer />}
      </div>

      <Analytics />
    </div>
  );
};

export default App;