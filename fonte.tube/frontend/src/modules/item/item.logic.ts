import type { ItemDraft, ItemType, Visibility } from "./item.types"

export function normalizeItemTitle(title: string) {
  return title.trim().replace(/\s+/g, " ")
}

export function deriveItemTypeFromMimeType(mimeType: string | null | undefined): ItemType {
  if (!mimeType) return "unknown"

  const normalizedMimeType = mimeType.toLowerCase()

  if (normalizedMimeType.startsWith("video/")) return "video"
  if (normalizedMimeType.startsWith("audio/")) return "audio"
  if (normalizedMimeType.startsWith("image/")) return "image"
  if (normalizedMimeType === "application/pdf" || normalizedMimeType.startsWith("text/")) {
    return "document"
  }

  return "unknown"
}

export function buildItemDraft(input: {
  title: string
  mimeType?: string | null
  type?: ItemType
  visibility?: Visibility
  sourceId?: string | null
  collectionIds?: string[]
}): ItemDraft {
  return {
    title: normalizeItemTitle(input.title),
    type: input.type ?? deriveItemTypeFromMimeType(input.mimeType),
    visibility: input.visibility ?? "private",
    sourceId: input.sourceId ?? null,
    collectionIds: input.collectionIds ?? [],
  }
}
