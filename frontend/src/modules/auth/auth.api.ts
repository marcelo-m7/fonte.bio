import type { AuthCredentials, SignUpCredentials } from "./auth.types"
import { normalizeAuthEmail, normalizeDisplayName } from "./auth.logic"

import { requireSupabaseClient } from "@/lib/supabase/client"

export async function signInWithPassword(credentials: AuthCredentials) {
  const supabase = requireSupabaseClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email: normalizeAuthEmail(credentials.email),
    password: credentials.password,
  })

  if (error) {
    throw error
  }

  return data
}

export async function signUpWithPassword(credentials: SignUpCredentials) {
  const supabase = requireSupabaseClient()

  const { data, error } = await supabase.auth.signUp({
    email: normalizeAuthEmail(credentials.email),
    password: credentials.password,
    options: {
      data: {
        display_name: normalizeDisplayName(credentials.displayName),
      },
    },
  })

  if (error) {
    throw error
  }

  return data
}

export async function signOut() {
  const supabase = requireSupabaseClient()
  const { error } = await supabase.auth.signOut()

  if (error) {
    throw error
  }
}
