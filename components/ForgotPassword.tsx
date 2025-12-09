import React, { useState } from 'react';
import { AuthLayout } from './ui/AuthLayout';
import { Button } from './ui/Button';
import { ViewState } from '../App';
import { supabase } from '../lib/supabase';
import { Loader2, ArrowLeft } from 'lucide-react';

// Generate a 6-digit random code
const generateResetCode = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

interface ForgotPasswordProps {
    setCurrentView: (view: ViewState) => void;
}

export const ForgotPassword: React.FC<ForgotPasswordProps> = ({ setCurrentView }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Generate a 6-digit code
      const code = generateResetCode();

      // Calculate expiration time (15 minutes from now)
      const expiresAt = new Date();
      expiresAt.setMinutes(expiresAt.getMinutes() + 15);

      // Store the code in the database
      const { error: dbError } = await supabase
        .from('reset_codes')
        .insert({
          email,
          code,
          expires_at: expiresAt.toISOString(),
        });

      if (dbError) {
        throw dbError;
      }

      // Send email with the reset code using Supabase Edge Function
      const { data: emailData, error: emailError } = await supabase.functions.invoke('send-reset-email', {
        body: { email, code }
      });

      if (emailError) {
        console.error('Failed to send reset email:', emailError);
        // Continue anyway - in production you might want to show an error
      }

      setSuccess(true);
      setLoading(false);

      // Redirect to reset password page after a short delay
      setTimeout(() => {
        setCurrentView('reset-password');
      }, 3000);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  if (success) {
    return (
      <AuthLayout
        title="Check your email"
        subtitle="We've sent you a password reset code"
        onBackToHome={() => setCurrentView('landing')}
      >
        <div className="text-center">
          <div className="mb-6">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-slate-600 mb-4">
              We've sent a 6-digit reset code to <strong>{email}</strong>
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-blue-800">
                <strong>Check your email</strong> for the 6-digit reset code.
                The code will expire in 15 minutes.
              </p>
            </div>
            <p className="text-sm text-slate-500">
              Use the code to reset your password. Redirecting you now...
            </p>
          </div>

          <div className="space-y-3">
            <Button
              onClick={() => setCurrentView('reset-password')}
              className="w-full"
            >
              Go to Reset Password
            </Button>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
        title="Reset your password"
        subtitle="Enter your email address and we'll send you a reset link"
        onBackToHome={() => setCurrentView('landing')}
    >
        <form className="space-y-5" onSubmit={handleForgotPassword}>
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

            <Button className="w-full h-12 text-base" disabled={loading}>
                {loading ? <Loader2 className="animate-spin" /> : 'Send Reset Link'}
            </Button>

            <button
                type="button"
                onClick={() => setCurrentView('login')}
                className="w-full flex items-center justify-center gap-2 text-sm text-slate-600 hover:text-slate-800 font-medium"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Sign In
            </button>
        </form>
    </AuthLayout>
  );
};
