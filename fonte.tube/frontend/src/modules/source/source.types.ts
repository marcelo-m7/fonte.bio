export type SourceKind = "youtube" | "rss" | "website" | "file" | "manual"

export type IngestionJobStatus = "queued" | "running" | "succeeded" | "failed" | "cancelled"

export type Source = {
  id: string
  name: string
  kind: SourceKind
  url: string | null
  createdAt: string
  updatedAt: string
}

export type SourceDraft = {
  name: string
  kind: SourceKind
  url: string | null
}
