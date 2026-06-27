import { useState, type FormEvent } from "react"
import { Link } from "react-router-dom"
import { toast } from "sonner"

import { PageHeader } from "@/components/page-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useAuth } from "@/modules/auth"
import { normalizeSourceName, normalizeSourceUrl, sourceDraftSchema, type SourceKind, useCreateSource, useSources } from "@/modules/source"

const sourceKindOptions: Array<{ value: SourceKind; label: string }> = [
  { value: "youtube", label: "YouTube" },
  { value: "rss", label: "RSS" },
  { value: "website", label: "Website" },
  { value: "file", label: "Arquivo" },
  { value: "manual", label: "Manual" },
]

const ingestionSuggestions = [
  { name: "Tube O2 - Videos", kind: "website" as const, url: "https://tube.open2.tech/videos", tag: "catalogo" },
  { name: "Tube O2 - Playlists", kind: "website" as const, url: "https://tube.open2.tech/playlists", tag: "trilhas" },
  { name: "Tube O2 - Submissoes", kind: "website" as const, url: "https://tube.open2.tech/submissions", tag: "curadoria" },
  { name: "Tube O2 - Enviar video", kind: "website" as const, url: "https://tube.open2.tech/submit", tag: "entrada" },
]

export function SourcesPage() {
  const { user } = useAuth()
  const { data: sources = [], isLoading } = useSources()
  const createSource = useCreateSource()
  const [name, setName] = useState("")
  const [kind, setKind] = useState<SourceKind>("website")
  const [url, setUrl] = useState("")
  const [formError, setFormError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError(null)

    const parsed = sourceDraftSchema.safeParse({
      name: normalizeSourceName(name),
      kind,
      url: normalizeSourceUrl(url),
    })

    if (!parsed.success) {
      setFormError(parsed.error.issues[0]?.message ?? "Fonte invalida.")
      return
    }

    const source = await createSource.mutateAsync(parsed.data)
    if (!source) {
      setFormError("Entre para cadastrar fontes.")
      return
    }

    setName("")
    setKind("website")
    setUrl("")
    toast.success("Fonte cadastrada.")
  }

  function applySuggestion(suggestion: (typeof ingestionSuggestions)[number]) {
    setName(suggestion.name)
    setKind(suggestion.kind)
    setUrl(suggestion.url)
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Fontes"
        description="Gerencie canais, RSS, playlists e outras fontes de ingestao de conteudo."
      />

      {!user ? (
        <Card>
          <CardHeader>
            <CardTitle>Entre para cadastrar fontes</CardTitle>
            <CardDescription>Fontes ficam vinculadas ao seu usuario e protegidas por RLS.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link to="/auth">Entrar</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
          <Card>
            <CardHeader>
              <CardTitle>Cadastrar fonte</CardTitle>
              <CardDescription>Comece por links que possam virar itens, trilhas e curadoria.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="source-name">Nome</Label>
                  <Input id="source-name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Tube O2 - Playlists" />
                </div>
                <div className="grid gap-4 sm:grid-cols-[180px_1fr]">
                  <div className="space-y-2">
                    <Label>Tipo</Label>
                    <Select value={kind} onValueChange={(value) => setKind(value as SourceKind)}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {sourceKindOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="source-url">URL</Label>
                    <Input id="source-url" type="url" value={url} onChange={(event) => setUrl(event.target.value)} placeholder="https://tube.open2.tech/videos" />
                  </div>
                </div>
                {formError ? <p className="text-sm text-destructive">{formError}</p> : null}
                <Button type="submit" disabled={createSource.isPending}>
                  Adicionar fonte
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sugestoes Tube O2</CardTitle>
              <CardDescription>Entradas uteis para alimentar catalogo, playlists e curadoria.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {ingestionSuggestions.map((suggestion) => (
                <button
                  key={suggestion.url}
                  type="button"
                  className="flex w-full items-center justify-between gap-3 rounded-md border p-3 text-left text-sm transition-colors hover:bg-muted"
                  onClick={() => applySuggestion(suggestion)}
                >
                  <span className="min-w-0">
                    <span className="block truncate font-medium">{suggestion.name}</span>
                    <span className="block truncate text-muted-foreground">{suggestion.url}</span>
                  </span>
                  <Badge variant="secondary">{suggestion.tag}</Badge>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Fontes cadastradas</CardTitle>
          <CardDescription>{sources.length} fonte(s) no acervo.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : sources.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nenhuma fonte cadastrada ainda.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>URL</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sources.map((source) => (
                  <TableRow key={source.id}>
                    <TableCell className="font-medium">{source.name}</TableCell>
                    <TableCell><Badge variant="outline">{source.kind}</Badge></TableCell>
                    <TableCell className="max-w-80 truncate text-muted-foreground">{source.url ?? "-"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
