import React, { useState } from 'react';
import { MessageSquare, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from './ui/Button';
import { Sidebar } from './Sidebar';
import { supabase } from '../lib/supabase';
import { fetchShopInfo, ShopInfo } from '../lib/billing';
import { Session } from '@supabase/supabase-js';

interface FeedbackProps {
  setCurrentView: (view: import('../App').ViewState) => void;
  currentView: import('../App').ViewState;
  session: Session | null;
  shop: ShopInfo | null;
}

type FeedbackType = 'bug' | 'feature' | 'analytics' | 'question' | 'other';

export const Feedback: React.FC<FeedbackProps> = ({ setCurrentView, currentView, session, shop }) => {
  const [formData, setFormData] = useState({
    type: 'bug' as FeedbackType,
    title: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const feedbackTypes = [
    { value: 'bug', label: 'Bug Report', description: 'Report a bug or issue' },
    { value: 'feature', label: 'Feature Request', description: 'Suggest a new feature' },
    { value: 'analytics', label: 'Analytics Plot', description: 'Request a new chart or metric' },
    { value: 'question', label: 'Question', description: 'Ask a question or get help' },
    { value: 'other', label: 'Other', description: 'Something else' }
  ] as const;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted');
    console.log('Session:', session);
    console.log('Shop:', shop);
    console.log('Form data:', formData);

    if (!session?.user?.id || !shop?.id) {
      console.log('Missing session or shop data');
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      console.log('Attempting to insert feedback...');
      const { data, error } = await supabase
        .from('feedback')
        .insert({
          shop_id: shop.id,
          user_id: session.user.id,
          type: formData.type,
          title: formData.title.trim(),
          description: formData.description.trim()
        });

      console.log('Insert result:', { data, error });

      if (error) throw error;

      setSubmitStatus('success');
      setFormData({ type: 'bug', title: '', description: '' });
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.title.trim() && formData.description.trim();

  return (
    <div className="flex min-h-[calc(100vh-72px)] pt-[72px]">
      <Sidebar
        currentView={currentView}
        setCurrentView={setCurrentView}
        headingName="Feedback"
        headingSub="Share your thoughts"
      />

      <div className="flex-1 lg:ml-64 bg-slate-50 min-h-full">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-slate-900">Feedback</h1>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-500">
            <MessageSquare size={18} className="text-slate-400" />
            Help us improve
          </div>
        </header>

        <div className="p-8 max-w-4xl mx-auto space-y-8">
          {/* Introduction */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-2">Share Your Feedback</h2>
              <p className="text-slate-600">
                Help us improve SimpliParts! Whether you've found a bug, have a feature idea, want to see new analytics,
                or just have a question, we'd love to hear from you.
              </p>
            </div>
          </div>

          {/* Feedback Form */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/60">
              <h3 className="font-semibold text-slate-900">Submit Feedback</h3>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Feedback Type */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  What type of feedback is this?
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {feedbackTypes.map((type) => (
                    <label
                      key={type.value}
                      className={`relative flex cursor-pointer rounded-lg border p-4 focus:outline-none ${
                        formData.type === type.value
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="type"
                        value={type.value}
                        checked={formData.type === type.value}
                        onChange={(e) => handleInputChange('type', e.target.value)}
                        className="sr-only"
                      />
                      <div className="flex-1">
                        <div className="flex items-center">
                          <div className="text-sm">
                            <div className="font-medium text-slate-900">{type.label}</div>
                            <div className="text-slate-500">{type.description}</div>
                          </div>
                        </div>
                      </div>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        formData.type === type.value
                          ? 'border-blue-600 bg-blue-600'
                          : 'border-slate-300'
                      }`}>
                        {formData.type === type.value && (
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Brief summary of your feedback"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Please provide details about your feedback..."
                  rows={6}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                  required
                />
              </div>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-md">
                  <CheckCircle size={18} className="text-green-600" />
                  <span className="text-sm text-green-800">Thank you! Your feedback has been submitted successfully.</span>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-md">
                  <AlertCircle size={18} className="text-red-600" />
                  <span className="text-sm text-red-800">Sorry, there was an error submitting your feedback. Please try again.</span>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className="gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Submit Feedback
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};