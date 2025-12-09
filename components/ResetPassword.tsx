import React, { useState, useEffect } from 'react';
import { AuthLayout } from './ui/AuthLayout';
import { Button } from './ui/Button';
import { ViewState } from '../App';
import { supabase } from '../lib/supabase';
import { Loader2, Eye, EyeOff } from 'lucide-react';

interface ResetPasswordProps {
    setCurrentView: (view: ViewState) => void;
}

export const ResetPassword: React.FC<ResetPasswordProps> = ({ setCurrentView }) => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [verifying, setVerifying] = useState(false);

  // No longer need session check since we're using codes instead of URL tokens

  const validatePassword = (password: string): string | null => {
    if (password.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    if (!/(?=.*[a-z])/.test(password)) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!/(?=.*\d)/.test(password)) {
      return 'Password must contain at least one number';
    }
    return null;
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate password
    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      // First, verify the reset code
      const { data: resetData, error: verifyError } = await supabase
        .from('reset_codes')
        .select('*')
        .eq('email', email)
        .eq('code', code)
        .eq('used', false)
        .gt('expires_at', new Date().toISOString())
        .single();

      if (verifyError || !resetData) {
        throw new Error('Invalid or expired reset code');
      }

      // Call Edge Function to securely update the password
      const { data: updateData, error: updateError } = await supabase.functions.invoke('update-password', {
        body: {
          email,
          code,
          newPassword: password
        }
      });

      if (updateError) {
        console.error('Password update error:', updateError);
        throw new Error(updateError.message || 'Failed to update password');
      }

      setSuccess(true);
      setLoading(false);

    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  if (success) {
    return (
      <AuthLayout
        title="Code verified!"
        subtitle="Ready for password reset implementation"
        onBackToHome={() => setCurrentView('landing')}
      >
        <div className="text-center">
          <div className="mb-6">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-slate-600 mb-4">
              Your password has been successfully updated!
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-green-800">
                <strong>Success!</strong> You can now sign in with your new password.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              onClick={() => setCurrentView('login')}
              className="w-full"
            >
              Back to Sign In
            </Button>
            <button
              onClick={() => {
                setSuccess(false);
                setEmail('');
                setCode('');
                setPassword('');
                setConfirmPassword('');
              }}
              className="w-full text-sm text-slate-600 hover:text-slate-800 font-medium"
            >
              Try Again
            </button>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
        title="Reset your password"
        subtitle="Enter the 6-digit code from your email and your new password"
        onBackToHome={() => setCurrentView('landing')}
    >
        <form className="space-y-5" onSubmit={handleResetPassword}>
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
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Reset Code</label>
                <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                    maxLength={6}
                    className="w-full h-11 px-4 rounded-md border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-shadow font-mono text-center text-lg tracking-widest"
                    placeholder="123456"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">New Password</label>
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full h-11 px-4 pr-12 rounded-md border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-shadow"
                        placeholder="••••••••"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                    Password must be at least 8 characters with uppercase, lowercase, and number
                </p>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Confirm New Password</label>
                <div className="relative">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="w-full h-11 px-4 pr-12 rounded-md border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-shadow"
                        placeholder="••••••••"
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            <Button className="w-full h-12 text-base" disabled={loading}>
                {loading ? <Loader2 className="animate-spin" /> : 'Update Password'}
            </Button>

            <button
                type="button"
                onClick={() => setCurrentView('login')}
                className="w-full text-sm text-slate-600 hover:text-slate-800 font-medium"
            >
                Back to Sign In
            </button>
        </form>
    </AuthLayout>
  );
};
