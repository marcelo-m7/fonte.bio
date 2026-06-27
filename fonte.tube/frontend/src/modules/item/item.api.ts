import type { Item, ItemDraft } from "./item.types"

import { getSupabaseClient } from "@/lib/supabase/client"
import type { Database } from "@/shared/types/supabase.generated"

type ItemRow = Database["public"]["Tables"]["items"]["Row"]
type ItemWithCollections = ItemRow & {
  collection_items?: Array<{ collection_id: string }> | null
}

function mapItem(row: ItemWithCollections): Item {
  return {
    id: row.id,
    title: row.title,
    type: row.type,
    visibility: row.visibility,
    sourceId: row.source_id,
    collectionIds: row.collection_items?.map((collectionItem) => collectionItem.collection_id) ?? [],
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

export async function listItems(): Promise<Item[]> {
  const supabase = getSupabaseClient()

  if (!supabase) {
    return []
  }

  const { data, error } = await supabase
    .from("items")
    .select("*, collection_items(collection_id)")
    .order("created_at", { ascending: false })

  if (error) {
    throw error
  }

  return (data ?? []).map((row) => mapItem(row as ItemWithCollections))
}

export async function createItem(draft: ItemDraft): Promise<Item | null> {
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
    .from("items")
    .insert({
      owner_id: user.id,
      title: draft.title,
      type: draft.type,
      visibility: draft.visibility,
      source_id: draft.sourceId,
    })
    .select()
    .single()

  if (error) {
    throw error
  }

  if (draft.collectionIds.length > 0) {
    const { error: collectionItemsError } = await supabase.from("collection_items").insert(
      draft.collectionIds.map((collectionId) => ({
        collection_id: collectionId,
        item_id: data.id,
      })),
    )

    if (collectionItemsError) {
      throw collectionItemsError
    }
  }

  return mapItem({ ...data, collection_items: draft.collectionIds.map((collectionId) => ({ collection_id: collectionId })) })
}
