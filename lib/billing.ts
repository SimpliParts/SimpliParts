import { supabase } from "./supabase";

export interface ShopInfo {
  id: string;
  name: string;
  subscription_status: string | null;
  free_credits_remaining: number | null;
  subscription_current_period_end?: string | null;
  stripe_customer_id?: string | null;
  notification_emails?: string[];
}

export async function fetchShopInfo(userId?: string) {
  if (!userId) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("shop_id")
    .eq("id", userId)
    .single();

  if (!profile?.shop_id) return null;

  const { data: shop } = await supabase
    .from("shops")
    .select("id, name, subscription_status, free_credits_remaining, subscription_current_period_end, stripe_customer_id, notification_emails")
    .eq("id", profile.shop_id)
    .single();

  return shop as ShopInfo | null;
}

export async function startCheckout() {
  const { data, error } = await supabase.functions.invoke("billing-checkout");
  if (error) throw error;
  return data as { url?: string };
}

export async function openBillingPortal() {
  const { data, error } = await supabase.functions.invoke("billing-portal");
  if (error) throw error;
  return data as { url?: string };
}

export async function guardUsage() {
  const { data, error, status } = await supabase.functions.invoke("usage-guard");
  return { data, error, status };
}

