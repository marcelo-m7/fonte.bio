export type MetricCard = {
  label: string
  value: string
  trend: string
}

export type DashboardOverview = {
  metrics: MetricCard[]
  healthScore: number
  backendMode: "mock" | "supabase"
}
