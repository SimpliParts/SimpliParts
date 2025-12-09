import React, { useState } from 'react';
import { AuthLayout } from './ui/AuthLayout';
import { Button } from './ui/Button';
import { ViewState } from '../App';
import { supabase } from '../lib/supabase';
import { Loader2 } from 'lucide-react';

interface LoginProps {
    setCurrentView: (view: ViewState) => void;
}

export const Login: React.FC<LoginProps> = ({ setCurrentView }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        setError(error.message);
        setLoading(false);
    } else {
        // App.tsx auth state listener will handle redirection
        // But we can clean up locally
    }
  };

  return (
    <AuthLayout 
        title="Welcome back" 
        subtitle="Sign in to your SimpliParts dashboard to continue auditing."
        onBackToHome={() => setCurrentView('landing')}
    >
        <form className="space-y-5" onSubmit={handleLogin}>
            {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-600">
                    {error}
                </div>
            )}
            
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Email address</label>
                <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full h-11 px-4 rounded-md border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-shadow"
                    placeholder="shop@example.com"
                />
            </div>
            
            <div>
                <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-sm font-medium text-slate-700">Password</label>
                    <button
                        type="button"
                        onClick={() => setCurrentView('forgot-password')}
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                        Forgot password?
                    </button>
                </div>
                <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full h-11 px-4 rounded-md border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-shadow"
                    placeholder="••••••••"
                />
            </div>

            <Button className="w-full h-12 text-base" disabled={loading}>
                {loading ? <Loader2 className="animate-spin" /> : 'Sign In'}
            </Button>
        </form>
    </AuthLayout>
  );
};