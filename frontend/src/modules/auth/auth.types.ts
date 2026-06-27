import type { Session, User } from "@supabase/supabase-js"

export type AuthCredentials = {
  email: string
  password: string
}

export type SignUpCredentials = AuthCredentials & {
  displayName?: string | null
}

export type AuthState = {
  isConfigured: boolean
  isLoading: boolean
  session: Session | null
  user: User | null
}
