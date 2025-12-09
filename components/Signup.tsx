import React, { useState } from 'react';
import { AuthLayout } from './ui/AuthLayout';
import { Button } from './ui/Button';
import { ViewState } from '../App';
import { supabase } from '../lib/supabase';
import { Loader2 } from 'lucide-react';

interface SignupProps {
    setCurrentView: (view: ViewState) => void;
}

export const Signup: React.FC<SignupProps> = ({ setCurrentView }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      shopName: '',
      password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({
          ...formData,
          [e.target.type === 'text' && e.target.placeholder === 'Jane' ? 'firstName' : 
           e.target.placeholder === 'Doe' ? 'lastName' :
           e.target.type === 'email' ? 'email' :
           e.target.placeholder === 'Downtown Automotive' ? 'shopName' : 'password']: e.target.value
      });
      // Note: The mapping above is a bit brittle due to reusing the existing layout structure
      // Proper mapping below for clarity:
  };
  
  // Handlers for specific fields to avoid index/placeholder guessing issues
  const setField = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
            data: {
                first_name: formData.firstName,
                last_name: formData.lastName,
                shop_name: formData.shopName,
            }
        }
    });

    if (error) {
        setError(error.message);
        setLoading(false);
    } else {
        // Successful signup usually triggers auto-login, which updates App.tsx state
        // If email confirmation is enabled, we might need to show a success message instead
        setLoading(false);
    }
  };

  return (
    <AuthLayout 
        title="Start recovering profit" 
        subtitle="Connect your shop management system and start auditing in minutes."
        onBackToHome={() => setCurrentView('landing')}
    >
        <form className="space-y-5" onSubmit={handleSignup}>
            {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-600">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">First name</label>
                    <input 
                        type="text" 
                        required
                        value={formData.firstName}
                        onChange={setField('firstName')}
                        className="w-full h-11 px-4 rounded-md border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-shadow"
                        placeholder="Jane"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Last name</label>
                    <input 
                        type="text" 
                        required
                        value={formData.lastName}
                        onChange={setField('lastName')}
                        className="w-full h-11 px-4 rounded-md border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-shadow"
                        placeholder="Doe"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Work Email</label>
                <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={setField('email')}
                    className="w-full h-11 px-4 rounded-md border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-shadow"
                    placeholder="shop@example.com"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Shop Name</label>
                <input 
                    type="text" 
                    required
                    value={formData.shopName}
                    onChange={setField('shopName')}
                    className="w-full h-11 px-4 rounded-md border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-shadow"
                    placeholder="Downtown Automotive"
                />
            </div>
            
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
                <input 
                    type="password" 
                    required
                    value={formData.password}
                    onChange={setField('password')}
                    className="w-full h-11 px-4 rounded-md border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-shadow"
                    placeholder="Create a strong password"
                />
            </div>

            <Button className="w-full h-12 text-base" disabled={loading}>
                {loading ? <Loader2 className="animate-spin" /> : 'Create Account'}
            </Button>
            
            <p className="text-xs text-slate-400 text-center mt-4">
                By creating an account, you agree to our <a href="#" className="underline hover:text-slate-600">Terms of Service</a> and <a href="#" className="underline hover:text-slate-600">Privacy Policy</a>.
            </p>
        </form>
    </AuthLayout>
  );
};