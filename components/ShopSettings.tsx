import React, { useState, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import { Settings, Key, Building, Save, Trash2, Plus, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Button } from './ui/Button';
import { Sidebar } from './Sidebar';
import { openBillingPortal, startCheckout } from '../lib/billing';

interface ShopSettingsProps {
  session: Session | null;
  setCurrentView: (view: import('../App').ViewState) => void;
  currentView: import('../App').ViewState;
}

interface Integration {
  id: string;
  provider_name: string;
  api_key: string;
  store_id: string | null;
  status: string;
}

interface Shop {
  id: string;
  name: string;
  subscription_status: string;
}

export const ShopSettings: React.FC<ShopSettingsProps> = ({ session, setCurrentView, currentView }) => {
  const [shop, setShop] = useState<Shop | null>(null);
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showApiKeys, setShowApiKeys] = useState<{[key: string]: boolean}>({});
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [successMessage, setSuccessMessage] = useState('');
  const [billingLoading, setBillingLoading] = useState(false);
  const [billingError, setBillingError] = useState<string | null>(null);

  // Form states for integrations
  const [partsTechForm, setPartsTechForm] = useState({
    api_key: '',
    store_id: '',
    isNew: true
  });

  const [tekmetricForm, setTekmetricForm] = useState({
    api_key: '',
    store_id: '',
    isNew: true
  });

  // Form state for shop info
  const [shopForm, setShopForm] = useState({
    name: ''
  });

  useEffect(() => {
    if (session?.user?.id) {
      fetchShopData();
      fetchIntegrations();
    }
  }, [session]);

  const fetchShopData = async () => {
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('shop_id')
        .eq('id', session?.user?.id)
        .single();

      if (profile?.shop_id) {
        const { data: shopData } = await supabase
          .from('shops')
          .select('*')
          .eq('id', profile.shop_id)
          .single();

        if (shopData) {
          setShop(shopData);
          setShopForm({ name: shopData.name });
        }
      }
    } catch (error) {
      console.error('Error fetching shop data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchIntegrations = async () => {
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('shop_id')
        .eq('id', session?.user?.id)
        .single();

      if (profile?.shop_id) {
        const { data: integrationsData } = await supabase
          .from('integrations')
          .select('*')
          .eq('shop_id', profile.shop_id)
          .in('provider_name', ['partstech', 'tekmetric']);

        if (integrationsData) {
          setIntegrations(integrationsData);

          // Populate forms with existing data
          const partsTech = integrationsData.find(i => i.provider_name === 'partstech');
          const tekmetric = integrationsData.find(i => i.provider_name === 'tekmetric');

          if (partsTech) {
            setPartsTechForm({
              api_key: partsTech.api_key,
              store_id: partsTech.store_id || '',
              isNew: false
            });
          }

          if (tekmetric) {
            setTekmetricForm({
              api_key: tekmetric.api_key,
              store_id: tekmetric.store_id || '',
              isNew: false
            });
          }
        }
      }
    } catch (error) {
      console.error('Error fetching integrations:', error);
    }
  };

  const getShopId = async () => {
    const { data: profile } = await supabase
      .from('profiles')
      .select('shop_id')
      .eq('id', session?.user?.id)
      .single();

    return profile?.shop_id;
  };

  const saveIntegration = async (provider: 'partstech' | 'tekmetric', formData: any) => {
    if (!formData.api_key.trim()) {
      setErrors({ [`${provider}_api_key`]: 'API Key is required' });
      return;
    }

    setSaving(true);
    setErrors({});
    setSuccessMessage('');

    try {
      const shopId = await getShopId();
      if (!shopId) return;

      if (formData.isNew) {
        // Create new integration
        const { error } = await supabase
          .from('integrations')
          .insert({
            shop_id: shopId,
            provider_name: provider,
            api_key: formData.api_key,
            store_id: formData.store_id || null,
            status: 'active'
          });

        if (error) throw error;
      } else {
        // Update existing integration
        const existing = integrations.find(i => i.provider_name === provider);
        if (existing) {
          const { error } = await supabase
            .from('integrations')
            .update({
              api_key: formData.api_key,
              store_id: formData.store_id || null
            })
            .eq('id', existing.id);

          if (error) throw error;
        }
      }

      setSuccessMessage(`${provider === 'partstech' ? 'PartsTech' : 'Tekmetric'} integration saved successfully!`);
      await fetchIntegrations(); // Refresh data
    } catch (error: any) {
      setErrors({ [`${provider}_general`]: error.message || 'Failed to save integration' });
    } finally {
      setSaving(false);
    }
  };

  const deleteIntegration = async (provider: 'partstech' | 'tekmetric') => {
    const existing = integrations.find(i => i.provider_name === provider);
    if (!existing) return;

    if (!confirm(`Are you sure you want to remove the ${provider === 'partstech' ? 'PartsTech' : 'Tekmetric'} integration?`)) {
      return;
    }

    setSaving(true);
    try {
      const { error } = await supabase
        .from('integrations')
        .delete()
        .eq('id', existing.id);

      if (error) throw error;

      setSuccessMessage(`${provider === 'partstech' ? 'PartsTech' : 'Tekmetric'} integration removed successfully!`);

      // Reset form
      if (provider === 'partstech') {
        setPartsTechForm({ api_key: '', store_id: '', isNew: true });
      } else {
        setTekmetricForm({ api_key: '', store_id: '', isNew: true });
      }

      await fetchIntegrations();
    } catch (error: any) {
      setErrors({ [`${provider}_general`]: error.message || 'Failed to delete integration' });
    } finally {
      setSaving(false);
    }
  };

  const saveShopInfo = async () => {
    if (!shopForm.name.trim()) {
      setErrors({ shop_name: 'Shop name is required' });
      return;
    }

    setSaving(true);
    setErrors({});
    setSuccessMessage('');

    try {
      const { error } = await supabase
        .from('shops')
        .update({ name: shopForm.name })
        .eq('id', shop?.id);

      if (error) throw error;

      setSuccessMessage('Shop information updated successfully!');
      await fetchShopData();
    } catch (error: any) {
      setErrors({ shop_general: error.message || 'Failed to update shop information' });
    } finally {
      setSaving(false);
    }
  };

  const handleUpgrade = async () => {
    try {
      setBillingLoading(true);
      setBillingError(null);
      const { url } = await startCheckout();
      if (url) window.location.href = url;
    } catch (error: any) {
      setBillingError(error.message || 'Could not start checkout');
    } finally {
      setBillingLoading(false);
    }
  };

  const handleManageBilling = async () => {
    try {
      setBillingLoading(true);
      setBillingError(null);
      const { url } = await openBillingPortal();
      if (url) window.location.href = url;
    } catch (error: any) {
      setBillingError(error.message || 'Could not open billing portal');
    } finally {
      setBillingLoading(false);
    }
  };

  const toggleApiKeyVisibility = (provider: string) => {
    setShowApiKeys(prev => ({
      ...prev,
      [provider]: !prev[provider]
    }));
  };

  return (
    <div className="flex min-h-[calc(100vh-72px)] pt-[72px]">
      <Sidebar
        currentView={currentView}
        setCurrentView={setCurrentView}
        headingName={shop?.name || 'My Shop'}
        headingSub="Settings"
      />

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 bg-slate-50 min-h-full">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm">
          <h1 className="text-xl font-bold text-slate-900">Shop Settings</h1>
          {loading && (
            <div className="text-xs text-slate-500 flex items-center gap-2 px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-full">
              <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
              Loading shop data...
            </div>
          )}
          {successMessage && (
            <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-4 py-2 rounded-lg border border-emerald-200">
              <CheckCircle size={16} />
              <span className="text-sm font-medium">{successMessage}</span>
            </div>
          )}
        </header>

        <div className="p-8 max-w-4xl mx-auto space-y-8">
          {/* Shop Information */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                <Building size={20} className="text-slate-600" />
                Shop Information
              </h3>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Shop Name
                  </label>
                  <input
                    type="text"
                    value={shopForm.name}
                    onChange={(e) => setShopForm({ ...shopForm, name: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your shop name"
                  />
                  {errors.shop_name && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.shop_name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Subscription Status
                  </label>
                  <div className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-slate-600">
                    {shop?.subscription_status === 'active' ? 'Active' :
                     shop?.subscription_status === 'past_due' ? 'Past Due' :
                     'Free Tier'}
                  </div>
                  {shop && (
                    <p className="text-xs text-slate-500 mt-1">
                      Free credits remaining: {shop.free_credits_remaining ?? 0}
                    </p>
                  )}
                </div>
              </div>

              {billingError && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {billingError}
                </p>
              )}

              {errors.shop_general && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.shop_general}
                </p>
              )}

              <div className="flex flex-wrap gap-3 justify-end">
                {shop?.subscription_status === 'active' ? (
                  <Button
                    variant="outline"
                    onClick={handleManageBilling}
                    disabled={billingLoading}
                    className="flex items-center gap-2"
                  >
                    Manage Billing
                  </Button>
                ) : (
                  <Button
                    onClick={handleUpgrade}
                    disabled={billingLoading}
                    className="flex items-center gap-2"
                  >
                    Upgrade
                  </Button>
                )}
                <Button
                  onClick={saveShopInfo}
                  disabled={saving}
                  className="flex items-center gap-2"
                >
                  <Save size={16} />
                  {saving ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </div>
          </div>

          {/* PartsTech Integration */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                <Key size={20} className="text-slate-600" />
                PartsTech Integration
              </h3>
              <p className="text-sm text-slate-500 mt-1">Configure your PartsTech API credentials for automated parts pricing</p>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    API Key
                  </label>
                  <div className="relative">
                    <input
                      type={showApiKeys.partstech ? "text" : "password"}
                      value={partsTechForm.api_key}
                      onChange={(e) => setPartsTechForm({ ...partsTechForm, api_key: e.target.value })}
                      className="w-full px-3 py-2 pr-10 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your PartsTech API key"
                    />
                    <button
                      type="button"
                      onClick={() => toggleApiKeyVisibility('partstech')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showApiKeys.partstech ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {errors.partstech_api_key && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.partstech_api_key}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Store ID <span className="text-slate-400">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={partsTechForm.store_id}
                    onChange={(e) => setPartsTechForm({ ...partsTechForm, store_id: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your store ID"
                  />
                </div>
              </div>

              {errors.partstech_general && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.partstech_general}
                </p>
              )}

              <div className="flex justify-between items-center">
                <div className="text-sm text-slate-500">
                  {!partsTechForm.isNew && (
                    <span className="flex items-center gap-1 text-emerald-600">
                      <CheckCircle size={14} />
                      Connected
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  {!partsTechForm.isNew && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteIntegration('partstech')}
                      disabled={saving}
                      className="flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50"
                    >
                      <Trash2 size={14} />
                      Remove
                    </Button>
                  )}

                  <Button
                    onClick={() => saveIntegration('partstech', partsTechForm)}
                    disabled={saving || !partsTechForm.api_key.trim()}
                    className="flex items-center gap-2"
                  >
                    <Save size={16} />
                    {saving ? 'Saving...' : partsTechForm.isNew ? 'Connect' : 'Update'}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Tekmetric Integration */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                <Key size={20} className="text-slate-600" />
                Tekmetric Integration
              </h3>
              <p className="text-sm text-slate-500 mt-1">Configure your Tekmetric API credentials for automated repair order processing</p>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    API Key
                  </label>
                  <div className="relative">
                    <input
                      type={showApiKeys.tekmetric ? "text" : "password"}
                      value={tekmetricForm.api_key}
                      onChange={(e) => setTekmetricForm({ ...tekmetricForm, api_key: e.target.value })}
                      className="w-full px-3 py-2 pr-10 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your Tekmetric API key"
                    />
                    <button
                      type="button"
                      onClick={() => toggleApiKeyVisibility('tekmetric')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showApiKeys.tekmetric ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {errors.tekmetric_api_key && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.tekmetric_api_key}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Store ID <span className="text-slate-400">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={tekmetricForm.store_id}
                    onChange={(e) => setTekmetricForm({ ...tekmetricForm, store_id: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your store ID"
                  />
                </div>
              </div>

              {errors.tekmetric_general && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.tekmetric_general}
                </p>
              )}

              <div className="flex justify-between items-center">
                <div className="text-sm text-slate-500">
                  {!tekmetricForm.isNew && (
                    <span className="flex items-center gap-1 text-emerald-600">
                      <CheckCircle size={14} />
                      Connected
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  {!tekmetricForm.isNew && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteIntegration('tekmetric')}
                      disabled={saving}
                      className="flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50"
                    >
                      <Trash2 size={14} />
                      Remove
                    </Button>
                  )}

                  <Button
                    onClick={() => saveIntegration('tekmetric', tekmetricForm)}
                    disabled={saving || !tekmetricForm.api_key.trim()}
                    className="flex items-center gap-2"
                  >
                    <Save size={16} />
                    {saving ? 'Saving...' : tekmetricForm.isNew ? 'Connect' : 'Update'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
