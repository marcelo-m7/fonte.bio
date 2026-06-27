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
import { useCollections } from "@/modules/collection"
import { buildItemDraft, itemDraftSchema, type ItemType, type Visibility, useCreateItem, useItems } from "@/modules/item"
import { useSources } from "@/modules/source"

const itemTypeOptions: Array<{ value: ItemType; label: string }> = [
  { value: "video", label: "Video" },
  { value: "audio", label: "Audio" },
  { value: "document", label: "Documento" },
  { value: "image", label: "Imagem" },
  { value: "link", label: "Link" },
  { value: "unknown", label: "Indefinido" },
]

const visibilityOptions: Array<{ value: Visibility; label: string }> = [
  { value: "private", label: "Privado" },
  { value: "workspace", label: "Workspace" },
  { value: "public", label: "Publico" },
]

export function LibraryPage() {
  const { user } = useAuth()
  const { data: items = [], isLoading: isItemsLoading } = useItems()
  const { data: sources = [] } = useSources()
  const { data: collections = [] } = useCollections()
  const createItem = useCreateItem()
  const [title, setTitle] = useState("")
  const [type, setType] = useState<ItemType>("video")
  const [visibility, setVisibility] = useState<Visibility>("private")
  const [sourceId, setSourceId] = useState("none")
  const [collectionIds, setCollectionIds] = useState<string[]>([])
  const [formError, setFormError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError(null)

    const draft = buildItemDraft({
      title,
      type,
      visibility,
      sourceId: sourceId === "none" ? null : sourceId,
      collectionIds,
    })
    const parsed = itemDraftSchema.safeParse(draft)

    if (!parsed.success) {
      setFormError(parsed.error.issues[0]?.message ?? "Item invalido.")
      return
    }

    const item = await createItem.mutateAsync(parsed.data)
    if (!item) {
      setFormError("Entre para criar itens.")
      return
    }

    setTitle("")
    setType("video")
    setVisibility("private")
    setSourceId("none")
    setCollectionIds([])
    toast.success("Item criado.")
  }

  function toggleCollection(collectionId: string) {
    setCollectionIds((currentIds) =>
      currentIds.includes(collectionId)
        ? currentIds.filter((currentId) => currentId !== collectionId)
        : [...currentIds, collectionId],
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Biblioteca"
        description="Central de conteudo indexado para consulta rapida e curadoria."
      />

      {!user ? (
        <Card>
          <CardHeader>
            <CardTitle>Entre para catalogar itens</CardTitle>
            <CardDescription>Itens privados ficam vinculados ao seu usuario.</CardDescription>
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
            <CardTitle>Novo item</CardTitle>
            <CardDescription>Registre um video, documento ou link para organizar depois em colecoes.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="item-title">Titulo</Label>
                <Input id="item-title" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Open Source Observability Explained - The Grafana Stack" />
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label>Tipo</Label>
                  <Select value={type} onValueChange={(value) => setType(value as ItemType)}>
                    <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {itemTypeOptions.map((option) => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Visibilidade</Label>
                  <Select value={visibility} onValueChange={(value) => setVisibility(value as Visibility)}>
                    <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {visibilityOptions.map((option) => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Fonte</Label>
                  <Select value={sourceId} onValueChange={setSourceId}>
                    <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Sem fonte</SelectItem>
                      {sources.map((source) => <SelectItem key={source.id} value={source.id}>{source.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {collections.length > 0 ? (
                <div className="space-y-2">
                  <Label>Colecoes</Label>
                  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {collections.map((collection) => (
                      <label key={collection.id} className="flex items-center gap-2 rounded-md border p-2 text-sm">
                        <input type="checkbox" checked={collectionIds.includes(collection.id)} onChange={() => toggleCollection(collection.id)} />
                        <span className="truncate">{collection.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ) : null}
              {formError ? <p className="text-sm text-destructive">{formError}</p> : null}
              <Button type="submit" disabled={createItem.isPending}>
                Criar item
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Itens catalogados</CardTitle>
          <CardDescription>{items.length} item(ns) no acervo.</CardDescription>
        </CardHeader>
        <CardContent>
          {isItemsLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : items.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nenhum item catalogado ainda.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Titulo</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Visibilidade</TableHead>
                  <TableHead>Colecoes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="max-w-96 truncate font-medium">{item.title}</TableCell>
                    <TableCell><Badge variant="outline">{item.type}</Badge></TableCell>
                    <TableCell><Badge variant="secondary">{item.visibility}</Badge></TableCell>
                    <TableCell className="text-muted-foreground">{item.collectionIds.length}</TableCell>
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
