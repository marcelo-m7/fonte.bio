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
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/modules/auth"
import { buildCollectionSlug, collectionDraftSchema, useCollections, useCreateCollection } from "@/modules/collection"
import type { Visibility } from "@/modules/item"

const visibilityOptions: Array<{ value: Visibility; label: string }> = [
  { value: "private", label: "Privada" },
  { value: "workspace", label: "Workspace" },
  { value: "public", label: "Publica" },
]

export function CollectionsPage() {
  const { user } = useAuth()
  const { data: collections = [], isLoading } = useCollections()
  const createCollection = useCreateCollection()
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [visibility, setVisibility] = useState<Visibility>("private")
  const [formError, setFormError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError(null)

    const parsed = collectionDraftSchema.safeParse({
      name,
      slug: buildCollectionSlug(name),
      description: description.trim() || null,
      visibility,
    })

    if (!parsed.success) {
      setFormError(parsed.error.issues[0]?.message ?? "Colecao invalida.")
      return
    }

    const collection = await createCollection.mutateAsync(parsed.data)
    if (!collection) {
      setFormError("Entre para criar colecoes.")
      return
    }

    setName("")
    setDescription("")
    setVisibility("private")
    toast.success("Colecao criada.")
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Colecoes"
        description="Agrupe conhecimento em colecoes reutilizaveis para estudo e operacao."
      />

      {!user ? (
        <Card>
          <CardHeader>
            <CardTitle>Entre para criar colecoes</CardTitle>
            <CardDescription>Colecoes organizam itens por tema, trilha ou projeto.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link to="/auth">Entrar</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Nova colecao</CardTitle>
            <CardDescription>Use colecoes como playlists, trilhas ou agrupamentos editoriais.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_180px]">
                <div className="space-y-2">
                  <Label htmlFor="collection-name">Nome</Label>
                  <Input id="collection-name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Tecnologia com proposito" />
                </div>
                <div className="space-y-2">
                  <Label>Visibilidade</Label>
                  <Select value={visibility} onValueChange={(value) => setVisibility(value as Visibility)}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {visibilityOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="collection-description">Descricao</Label>
                <Textarea id="collection-description" value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Videos, fontes e notas para estudar um tema sem se perder no feed." />
              </div>
              {formError ? <p className="text-sm text-destructive">{formError}</p> : null}
              <Button type="submit" disabled={createCollection.isPending}>
                Criar colecao
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Colecoes do acervo</CardTitle>
          <CardDescription>{collections.length} colecao(oes) cadastrada(s).</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : collections.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nenhuma colecao criada ainda.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Visibilidade</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {collections.map((collection) => (
                  <TableRow key={collection.id}>
                    <TableCell className="font-medium">{collection.name}</TableCell>
                    <TableCell className="text-muted-foreground">{collection.slug}</TableCell>
                    <TableCell><Badge variant="outline">{collection.visibility}</Badge></TableCell>
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
