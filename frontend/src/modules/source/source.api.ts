import type { Source, SourceDraft } from "./source.types"

import { getSupabaseClient } from "@/lib/supabase/client"
import type { Database } from "@/shared/types/supabase.generated"

type SourceRow = Database["public"]["Tables"]["sources"]["Row"]

function mapSource(row: SourceRow): Source {
  return {
    id: row.id,
    name: row.name,
    kind: row.kind,
    url: row.url,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

export async function listSources(): Promise<Source[]> {
  const supabase = getSupabaseClient()

  if (!supabase) {
    return []
  }

  const { data, error } = await supabase.from("sources").select("*").order("created_at", { ascending: false })

  if (error) {
    throw error
  }

  return (data ?? []).map(mapSource)
}

export async function createSource(draft: SourceDraft): Promise<Source | null> {
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
    .from("sources")
    .insert({
      owner_id: user.id,
      name: draft.name,
      kind: draft.kind,
      url: draft.url,
    })
    .select()
    .single()

  if (error) {
    throw error
  }

  return mapSource(data)
}
