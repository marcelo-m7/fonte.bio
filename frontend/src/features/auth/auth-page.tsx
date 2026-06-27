import { useState, type FormEvent } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { toast } from "sonner"

import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth, useSignInWithPassword, useSignUpWithPassword } from "@/modules/auth"

export function AuthPage() {
  const navigate = useNavigate()
  const { isConfigured, isLoading, user } = useAuth()
  const signIn = useSignInWithPassword()
  const signUp = useSignUpWithPassword()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [displayName, setDisplayName] = useState("")

  if (user) {
    return <Navigate to="/dashboard" replace />
  }

  async function handleSignIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    await signIn.mutateAsync({ email, password })
    toast.success("Sessao iniciada.")
    navigate("/dashboard")
  }

  async function handleSignUp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const result = await signUp.mutateAsync({ email, password, displayName })

    if (result.session) {
      toast.success("Conta criada.")
      navigate("/dashboard")
      return
    }

    toast.success("Conta criada. Verifique seu email para confirmar o acesso.")
  }

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-6">
      <PageHeader title="Entrar" description="Acesse o acervo com Supabase Auth." />

      {!isConfigured ? (
        <Card>
          <CardHeader>
            <CardTitle>Supabase nao configurado</CardTitle>
            <CardDescription>Configure as variaveis publicas do Vite para habilitar login.</CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <Tabs defaultValue="sign-in">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="sign-in">Entrar</TabsTrigger>
            <TabsTrigger value="sign-up">Criar conta</TabsTrigger>
          </TabsList>
          <TabsContent value="sign-in">
            <Card>
              <CardHeader>
                <CardTitle>Entrar</CardTitle>
                <CardDescription>Use email e senha para acessar sua biblioteca.</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={handleSignIn}>
                  <div className="space-y-2">
                    <Label htmlFor="sign-in-email">Email</Label>
                    <Input id="sign-in-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sign-in-password">Senha</Label>
                    <Input id="sign-in-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
                  </div>
                  {signIn.error ? <p className="text-sm text-destructive">{signIn.error.message}</p> : null}
                  <Button type="submit" className="w-full" disabled={isLoading || signIn.isPending}>
                    Entrar
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="sign-up">
            <Card>
              <CardHeader>
                <CardTitle>Criar conta</CardTitle>
                <CardDescription>Crie um perfil para organizar suas fontes e itens.</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={handleSignUp}>
                  <div className="space-y-2">
                    <Label htmlFor="sign-up-name">Nome</Label>
                    <Input id="sign-up-name" value={displayName} onChange={(event) => setDisplayName(event.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sign-up-email">Email</Label>
                    <Input id="sign-up-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sign-up-password">Senha</Label>
                    <Input id="sign-up-password" type="password" minLength={6} value={password} onChange={(event) => setPassword(event.target.value)} required />
                  </div>
                  {signUp.error ? <p className="text-sm text-destructive">{signUp.error.message}</p> : null}
                  <Button type="submit" className="w-full" disabled={isLoading || signUp.isPending}>
                    Criar conta
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
