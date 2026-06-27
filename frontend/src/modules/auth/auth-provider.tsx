import { useQueryClient } from "@tanstack/react-query"
import { useEffect, useState, type ReactNode } from "react"

import { AuthContext } from "./auth.context"
import type { AuthState } from "./auth.types"

import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase/client"

type AuthProviderProps = {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const queryClient = useQueryClient()
  const [state, setState] = useState<AuthState>({
    isConfigured: isSupabaseConfigured(),
    isLoading: isSupabaseConfigured(),
    session: null,
    user: null,
  })

  useEffect(() => {
    const supabase = getSupabaseClient()

    if (!supabase) {
      return undefined
    }

    const client = supabase
    let active = true

    async function loadSession() {
      const { data, error } = await client.auth.getSession()

      if (!active) return
      if (error) {
        setState({ isConfigured: true, isLoading: false, session: null, user: null })
        return
      }

      setState({ isConfigured: true, isLoading: false, session: data.session, user: data.session?.user ?? null })
    }

    loadSession()

    const { data } = client.auth.onAuthStateChange((_event, session) => {
      setState({ isConfigured: true, isLoading: false, session, user: session?.user ?? null })
      void queryClient.invalidateQueries()
    })

    return () => {
      active = false
      data.subscription.unsubscribe()
    }
  }, [queryClient])

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
}
