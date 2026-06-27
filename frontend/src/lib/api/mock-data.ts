import type { DashboardOverview } from "@/lib/api/types"

export const mockDashboardOverview: DashboardOverview = {
  metrics: [
    { label: "Videos catalogados", value: "1.284", trend: "+12%" },
    { label: "Fontes verificadas", value: "326", trend: "+4%" },
    { label: "Colecoes ativas", value: "48", trend: "+9%" },
  ],
  healthScore: 78,
  backendMode: "mock",
}
