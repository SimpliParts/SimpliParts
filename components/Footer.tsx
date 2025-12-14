import React from 'react';
import { Twitter, Linkedin, Github } from 'lucide-react';
import { Logo } from './ui/Logo';
import { ViewState } from '../App';

interface FooterProps {
  setCurrentView: (view: ViewState) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentView }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="mb-6">
              <Logo light={true} />
            </div>
            <p className="text-sm text-slate-400 mb-4">
              The intelligence layer for modern auto repair shops.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors"><Twitter size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><Github size={20} /></a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => setCurrentView('about')} className="hover:text-blue-400 transition-colors text-left">About</button></li>
              <li><button onClick={() => setCurrentView('contact')} className="hover:text-blue-400 transition-colors text-left">Contact</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => setCurrentView('privacy-policy')} className="hover:text-blue-400 transition-colors text-left">Privacy Policy</button></li>
              <li><button onClick={() => setCurrentView('terms-of-service')} className="hover:text-blue-400 transition-colors text-left">Terms of Service</button></li>
              <li><button onClick={() => setCurrentView('security')} className="hover:text-blue-400 transition-colors text-left">Security</button></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <div>&copy; {new Date().getFullYear()} SimpliParts Inc. All rights reserved.</div>
          <div className="flex gap-6">
            <span>Made with <span className="text-red-500">♥</span> for Shop Owners</span>
          </div>
        </div>
      </div>
    </footer>
  );
};