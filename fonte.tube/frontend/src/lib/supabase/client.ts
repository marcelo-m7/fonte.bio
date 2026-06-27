import { createClient, type SupabaseClient } from "@supabase/supabase-js"

import { appEnv } from "@/lib/env"

let supabase: SupabaseClient | null = null

if (appEnv.hasSupabaseConfig && appEnv.supabaseUrl && appEnv.supabaseAnonKey) {
  supabase = createClient(appEnv.supabaseUrl, appEnv.supabaseAnonKey)
}

export function getSupabaseClient() {
  return supabase
}
