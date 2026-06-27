import { createClient } from "https://esm.sh/@supabase/supabase-js@2.108.2"

import { getAuthContext } from "../_shared/auth.ts"
import { getRequiredEnv } from "../_shared/env.ts"
import { createJsonHandler } from "../_shared/handler.ts"
import { jsonResponse } from "../_shared/http.ts"

type IngestSourceRequest = {
  action?: "enqueue" | "list"
  sourceId?: string
}

type IngestionJobRow = {
  id: string
  source_id: string | null
  status: string
  input: Record<string, unknown>
  result: Record<string, unknown> | null
  error_message: string | null
  created_at: string
  updated_at: string
  started_at: string | null
  finished_at: string | null
}

function mapJob(row: IngestionJobRow) {
  return {
    id: row.id,
    sourceId: row.source_id,
    status: row.status,
    input: row.input,
    result: row.result,
    errorMessage: row.error_message,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    startedAt: row.started_at,
    finishedAt: row.finished_at,
  }
}

async function readBody(request: Request): Promise<IngestSourceRequest> {
  try {
    return (await request.json()) as IngestSourceRequest
  } catch {
    return { action: "list" }
  }
}

Deno.serve(
  createJsonHandler(["POST"], async (request) => {
    const auth = getAuthContext(request)

    if (!auth.authorization || !auth.hasBearerToken) {
      return jsonResponse({ error: "missing_authorization" }, { status: 401 })
    }

    const supabaseUrl = getRequiredEnv("SUPABASE_URL")
    const supabaseAnonKey = getRequiredEnv("SUPABASE_ANON_KEY")
    const supabaseServiceRoleKey = getRequiredEnv("SUPABASE_SERVICE_ROLE_KEY")
    const userClient = createClient(supabaseUrl, supabaseAnonKey)
    const serviceClient = createClient(supabaseUrl, supabaseServiceRoleKey)
    const accessToken = auth.authorization.replace(/^bearer\s+/i, "")

    const {
      data: { user },
      error: userError,
    } = await userClient.auth.getUser(accessToken)

    if (userError || !user) {
      return jsonResponse({ error: "invalid_authorization" }, { status: 401 })
    }

    const body = await readBody(request)
    const action = body.action ?? (body.sourceId ? "enqueue" : "list")

    if (action === "list") {
      const { data, error } = await serviceClient
        .rpc("fonte_list_ingestion_jobs", { p_owner_id: user.id })

      if (error) {
        return jsonResponse({ error: "jobs_query_failed", message: error.message }, { status: 500 })
      }

      return jsonResponse({ jobs: (data ?? []).map((job) => mapJob(job as IngestionJobRow)) })
    }

    if (!body.sourceId) {
      return jsonResponse({ error: "source_id_required" }, { status: 400 })
    }

    const { data: job, error: jobError } = await serviceClient
      .rpc("fonte_enqueue_ingestion_job", { p_owner_id: user.id, p_source_id: body.sourceId })

    if (jobError) {
      if (jobError.code === "P0002" || jobError.message.includes("source_not_found")) {
        return jsonResponse({ error: "source_not_found" }, { status: 404 })
      }

      return jsonResponse({ error: "job_create_failed", message: jobError.message }, { status: 500 })
    }

    return jsonResponse({ job: mapJob((job?.[0] ?? job) as IngestionJobRow) }, { status: 202 })
  })
)
