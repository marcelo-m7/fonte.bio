import type { Collection, CollectionDraft } from "./collection.types"

export async function listCollections(): Promise<Collection[]> {
  return []
}

export async function createCollection(_draft: CollectionDraft): Promise<Collection | null> {
  void _draft
  return null
}
