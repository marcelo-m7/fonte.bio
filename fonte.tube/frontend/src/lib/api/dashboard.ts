import { mockDashboardOverview } from "@/lib/api/mock-data"
import type { DashboardOverview } from "@/lib/api/types"
import { getSupabaseClient } from "@/lib/supabase/client"

async function getDashboardFromSupabase(): Promise<DashboardOverview | null> {
  const supabase = getSupabaseClient()

  if (!supabase) {
    return null
  }

  // Placeholder query path for future backend integration.
  // Keep returning null for now so the app remains API-independent.
  await Promise.resolve()
  return null
}

export async function getDashboardOverview(): Promise<DashboardOverview> {
  const remote = await getDashboardFromSupabase()
  if (remote) {
    return { ...remote, backendMode: "supabase" }
  }

  return mockDashboardOverview
}
