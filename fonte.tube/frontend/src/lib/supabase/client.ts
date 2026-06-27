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
