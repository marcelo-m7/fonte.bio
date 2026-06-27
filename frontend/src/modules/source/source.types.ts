export type SourceKind = "youtube" | "rss" | "website" | "file" | "manual"

export type IngestionJobStatus = "queued" | "running" | "succeeded" | "failed" | "cancelled"

export type IngestionJob = {
  id: string
  sourceId: string | null
  status: IngestionJobStatus
  input: Record<string, unknown>
  result: Record<string, unknown> | null
  errorMessage: string | null
  createdAt: string
  updatedAt: string
  startedAt: string | null
  finishedAt: string | null
}

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
