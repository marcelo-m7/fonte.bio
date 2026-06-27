import { useEffect, useState } from "react"

import { getDashboardOverview } from "@/lib/api/dashboard"
import type { DashboardOverview } from "@/lib/api/types"

type DashboardState = {
  data: DashboardOverview | null
  isLoading: boolean
  error: string | null
}

export function useDashboardOverview() {
  const [state, setState] = useState<DashboardState>({
    data: null,
    isLoading: true,
    error: null,
  })

  useEffect(() => {
    let cancelled = false

    async function loadOverview() {
      try {
        const data = await getDashboardOverview()
        if (cancelled) return

        setState({
          data,
          isLoading: false,
          error: null,
        })
      } catch (error) {
        if (cancelled) return

        setState({
          data: null,
          isLoading: false,
          error: error instanceof Error ? error.message : "Falha ao carregar dashboard.",
        })
      }
    }

    loadOverview()

    return () => {
      cancelled = true
    }
  }, [])

  return state
}
