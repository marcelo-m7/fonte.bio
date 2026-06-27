import { createClient, type SupabaseClient } from "@supabase/supabase-js"

import { appEnv } from "@/lib/env"
import type { Database } from "@/shared/types/supabase.generated"

export type FonteSupabaseClient = SupabaseClient<Database>

let supabase: FonteSupabaseClient | null = null

if (appEnv.hasSupabaseConfig && appEnv.supabaseUrl && appEnv.supabaseAnonKey) {
  supabase = createClient<Database>(appEnv.supabaseUrl, appEnv.supabaseAnonKey)
}

export function getSupabaseClient() {
  return supabase
}

export function isSupabaseConfigured() {
  return Boolean(supabase)
}

export function requireSupabaseClient() {
  if (!supabase) {
    throw new Error("Supabase is not configured for this environment.")
  }

  return supabase
}
