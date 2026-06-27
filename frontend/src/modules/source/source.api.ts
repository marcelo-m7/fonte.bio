import type { IngestionJob, IngestionJobStatus, Source, SourceDraft } from "./source.types"

import { appEnv } from "@/lib/env"
import { getSupabaseClient } from "@/lib/supabase/client"
import type { Database } from "@/shared/types/supabase.generated"

type SourceRow = Database["public"]["Tables"]["sources"]["Row"]

type IngestionJobResponse = {
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

type IngestSourceResponse = {
  job?: IngestionJobResponse
  jobs?: IngestionJobResponse[]
  error?: string
  message?: string
}

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

async function invokeIngestSource(body: Record<string, unknown>): Promise<IngestSourceResponse | null> {
  const supabase = getSupabaseClient()

  if (!supabase || !appEnv.supabaseUrl || !appEnv.supabaseAnonKey) {
    return null
  }

  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession()

  if (sessionError) {
    throw sessionError
  }

  if (!session) {
    return null
  }

  const response = await fetch(`${appEnv.supabaseUrl}/functions/v1/ingest-source`, {
    method: "POST",
    headers: {
      apikey: appEnv.supabaseAnonKey,
      Authorization: `Bearer ${session.access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
  const data = (await response.json()) as IngestSourceResponse

  if (!response.ok) {
    throw new Error(data.message ?? data.error ?? `Ingest source failed with ${response.status}`)
  }

  return data
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

export async function listIngestionJobs(): Promise<IngestionJob[]> {
  const data = await invokeIngestSource({ action: "list" })

  return data?.jobs ?? []
}

export async function createIngestionJob(sourceId: string): Promise<IngestionJob | null> {
  const data = await invokeIngestSource({ action: "enqueue", sourceId })

  return data?.job ?? null
}
