import { LogInIcon, LogOutIcon } from "lucide-react"
import { Link } from "react-router-dom"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useAuth, useSignOut } from "@/modules/auth"
import { useCurrentProfile } from "@/modules/profile"

export function AuthStatus() {
  const { isConfigured, isLoading, user } = useAuth()
  const { data: profile } = useCurrentProfile()
  const signOut = useSignOut()

  if (!isConfigured) {
    return <Badge variant="secondary">Local</Badge>
  }

  if (isLoading) {
    return <Skeleton className="h-9 w-24" />
  }

  if (!user) {
    return (
      <Button variant="outline" size="sm" asChild>
        <Link to="/auth">
          <LogInIcon data-icon="inline-start" />
          Entrar
        </Link>
      </Button>
    )
  }

  const label = profile?.displayName ?? user.email ?? "Conta"

  return (
    <div className="flex items-center gap-2">
      <div className="hidden min-w-0 text-right sm:block">
        <p className="max-w-40 truncate text-sm font-medium">{label}</p>
        {user.email ? <p className="max-w-40 truncate text-xs text-muted-foreground">{user.email}</p> : null}
      </div>
      <Button variant="outline" size="sm" onClick={() => signOut.mutate()} disabled={signOut.isPending}>
        <LogOutIcon data-icon="inline-start" />
        Sair
      </Button>
    </div>
  )
}
