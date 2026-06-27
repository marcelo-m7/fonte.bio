import { useState, type FormEvent } from "react"
import { Link } from "react-router-dom"
import { toast } from "sonner"

import { EmptyState } from "@/components/empty-state"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { useAuth } from "@/modules/auth"
import type { Profile } from "@/modules/profile"
import { useCurrentProfile, useUpdateProfile } from "@/modules/profile"

type ProfileFormProps = {
  email: string
  profile: Profile | null | undefined
}

function ProfileForm({ email, profile }: ProfileFormProps) {
  const updateProfile = useUpdateProfile()
  const [displayName, setDisplayName] = useState(profile?.displayName ?? "")
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatarUrl ?? "")

  async function handleProfileSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    await updateProfile.mutateAsync({
      displayName: displayName.trim() || null,
      avatarUrl: avatarUrl.trim() || null,
    })
    toast.success("Perfil atualizado.")
  }

  return (
    <form className="space-y-4" onSubmit={handleProfileSubmit}>
      <div className="space-y-2">
        <Label>Email</Label>
        <Input value={email} disabled />
      </div>
      <div className="space-y-2">
        <Label htmlFor="profile-display-name">Nome</Label>
        <Input id="profile-display-name" value={displayName} onChange={(event) => setDisplayName(event.target.value)} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="profile-avatar-url">Avatar URL</Label>
        <Input id="profile-avatar-url" type="url" value={avatarUrl} onChange={(event) => setAvatarUrl(event.target.value)} />
      </div>
      {updateProfile.error ? <p className="text-sm text-destructive">{updateProfile.error.message}</p> : null}
      <Button type="submit" disabled={updateProfile.isPending}>
        Salvar perfil
      </Button>
    </form>
  )
}

export function SettingsPage() {
  const { isConfigured, isLoading: isAuthLoading, user } = useAuth()
  const { data: profile, isLoading: isProfileLoading } = useCurrentProfile()

  return (
    <div className="space-y-6">
      <PageHeader
        title="Definicoes"
        description="Preferencias de interface, importacao e comportamento do acervo."
      />
      <Card>
        <CardHeader>
          <CardTitle>Conta</CardTitle>
          <CardDescription>Perfil conectado ao Supabase Auth.</CardDescription>
        </CardHeader>
        <CardContent>
          {!isConfigured ? (
            <p className="text-sm text-muted-foreground">Configure as variaveis publicas do Vite para habilitar login.</p>
          ) : isAuthLoading || isProfileLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : !user ? (
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">Entre para sincronizar perfil, itens, colecoes e fontes.</p>
              <Button asChild>
                <Link to="/auth">Entrar</Link>
              </Button>
            </div>
          ) : (
            <ProfileForm key={profile?.updatedAt ?? user.id} email={user.email ?? ""} profile={profile} />
          )}
        </CardContent>
      </Card>
      <EmptyState
        title="Configuracoes em evolucao"
        description="As preferencias avancadas serao habilitadas conforme as proximas entregas."
        ctaLabel="Personalizar"
      />
    </div>
  )
}
