import { mockDashboardOverview } from "@/lib/api/mock-data"
import type { DashboardOverview } from "@/lib/api/types"
import { getSupabaseClient } from "@/lib/supabase/client"
import { listCollections } from "@/modules/collection"
import { listItems } from "@/modules/item"
import { listSources } from "@/modules/source"

export const dashboardOverviewQueryKey = ["dashboard", "overview"] as const

async function getDashboardFromSupabase(): Promise<DashboardOverview | null> {
  const supabase = getSupabaseClient()

  if (!supabase) {
    return null
  }

  const [items, collections, sources] = await Promise.all([listItems(), listCollections(), listSources()])
  const videos = items.filter((item) => item.type === "video").length
  const totalRecords = items.length + collections.length + sources.length
  const healthScore = totalRecords === 0 ? 0 : Math.min(100, 40 + Math.min(totalRecords * 12, 60))

  return {
    backendMode: "supabase",
    healthScore,
    metrics: [
      {
        label: "Videos",
        value: String(videos),
        trend: items.length > 0 ? `${items.length} itens` : "Sem itens",
      },
      {
        label: "Colecoes",
        value: String(collections.length),
        trend: collections.length > 0 ? "Supabase" : "Sem colecoes",
      },
      {
        label: "Fontes",
        value: String(sources.length),
        trend: sources.length > 0 ? "Conectadas" : "Sem fontes",
      },
    ],
  }
}

export function createDashboardOverviewQueryOptions() {
  return {
    queryKey: dashboardOverviewQueryKey,
    queryFn: getDashboardOverview,
  }
}

export async function getDashboardOverview(): Promise<DashboardOverview> {
  const remote = await getDashboardFromSupabase()
  if (remote) {
    return { ...remote, backendMode: "supabase" }
  }

  return mockDashboardOverview
}
