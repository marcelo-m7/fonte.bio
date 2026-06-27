import type { Collection, CollectionDraft } from "./collection.types"

import { getSupabaseClient } from "@/lib/supabase/client"
import type { Database } from "@/shared/types/supabase.generated"

type CollectionRow = Database["public"]["Tables"]["collections"]["Row"]

function mapCollection(row: CollectionRow): Collection {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    visibility: row.visibility,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

export async function listCollections(): Promise<Collection[]> {
  const supabase = getSupabaseClient()

  if (!supabase) {
    return []
  }

  const { data, error } = await supabase.from("collections").select("*").order("created_at", { ascending: false })

  if (error) {
    throw error
  }

  return (data ?? []).map(mapCollection)
}

export async function createCollection(draft: CollectionDraft): Promise<Collection | null> {
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
    .from("collections")
    .insert({
      owner_id: user.id,
      name: draft.name,
      slug: draft.slug,
      description: draft.description,
      visibility: draft.visibility,
    })
    .select()
    .single()

  if (error) {
    throw error
  }

  return mapCollection(data)
}
