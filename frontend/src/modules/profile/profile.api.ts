import type { Profile, ProfileUpdateDraft } from "./profile.types"

import { getSupabaseClient } from "@/lib/supabase/client"
import type { Database } from "@/shared/types/supabase.generated"

type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"]

function mapProfile(row: ProfileRow): Profile {
  return {
    id: row.id,
    displayName: row.display_name,
    avatarUrl: row.avatar_url,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

export async function getCurrentProfile(): Promise<Profile | null> {
  const supabase = getSupabaseClient()

  if (!supabase) {
    return null
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError) {
    throw userError
  }

  if (!user) {
    return null
  }

  const { data, error } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle()

  if (error) {
    throw error
  }

  if (data) {
    return mapProfile(data)
  }

  const fallbackDisplayName = user.email?.split("@")[0] ?? null
  const { data: createdProfile, error: createError } = await supabase
    .from("profiles")
    .insert({ id: user.id, display_name: fallbackDisplayName })
    .select()
    .single()

  if (createError) {
    throw createError
  }

  return mapProfile(createdProfile)
}

export async function updateCurrentProfile(draft: ProfileUpdateDraft): Promise<Profile | null> {
  const supabase = getSupabaseClient()

  if (!supabase) {
    return null
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError) {
    throw userError
  }

  if (!user) {
    return null
  }

  const { data, error } = await supabase
    .from("profiles")
    .update({ display_name: draft.displayName, avatar_url: draft.avatarUrl })
    .eq("id", user.id)
    .select()
    .single()

  if (error) {
    throw error
  }

  return mapProfile(data)
}
