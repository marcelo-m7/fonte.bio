import { useQuery } from "@tanstack/react-query"

import { createDashboardOverviewQueryOptions } from "@/lib/api/dashboard"

export function useDashboardOverview() {
  const query = useQuery(createDashboardOverviewQueryOptions())

  return {
    data: query.data ?? null,
    isLoading: query.isLoading,
    error: query.error instanceof Error ? query.error.message : query.error ? "Falha ao carregar dashboard." : null,
  }
}
