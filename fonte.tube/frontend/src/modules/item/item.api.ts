import type { Item, ItemDraft } from "./item.types"

export async function listItems(): Promise<Item[]> {
  return []
}

export async function createItem(_draft: ItemDraft): Promise<Item | null> {
  void _draft
  return null
}
