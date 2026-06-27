export type ItemType = "video" | "audio" | "document" | "image" | "link" | "unknown"

export type Visibility = "private" | "workspace" | "public"

export type Item = {
  id: string
  title: string
  type: ItemType
  visibility: Visibility
  sourceId: string | null
  collectionIds: string[]
  createdAt: string
  updatedAt: string
}

export type ItemDraft = {
  title: string
  type: ItemType
  visibility: Visibility
  sourceId: string | null
  collectionIds: string[]
}
