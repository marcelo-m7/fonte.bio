import type { Visibility } from "@/modules/item"

export type Collection = {
  id: string
  name: string
  slug: string
  description: string | null
  visibility: Visibility
  createdAt: string
  updatedAt: string
}

export type CollectionDraft = {
  name: string
  slug: string
  description: string | null
  visibility: Visibility
}
