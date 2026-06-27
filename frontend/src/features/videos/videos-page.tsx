import { EmptyState } from "@/components/empty-state"
import { PageHeader } from "@/components/page-header"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useItems } from "@/modules/item"

export function VideosPage() {
  const { data: items = [], isLoading } = useItems()
  const videos = items.filter((item) => item.type === "video")

  return (
    <div className="space-y-6">
      <PageHeader
        title="Videos"
        description="Acompanhe ingestao, transcricoes e classificacao dos videos."
      />
      {isLoading ? (
        <Card>
          <CardHeader>
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      ) : videos.length === 0 ? (
        <EmptyState
          title="Nenhum video importado"
          description="Crie itens do tipo video na Biblioteca para iniciar classificacao e curadoria."
          ctaLabel="Importar video"
        />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Videos catalogados</CardTitle>
            <CardDescription>{videos.length} video(s) pronto(s) para futuras etapas de ingestao.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Titulo</TableHead>
                  <TableHead>Visibilidade</TableHead>
                  <TableHead>Colecoes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {videos.map((video) => (
                  <TableRow key={video.id}>
                    <TableCell className="max-w-96 truncate font-medium">{video.title}</TableCell>
                    <TableCell><Badge variant="secondary">{video.visibility}</Badge></TableCell>
                    <TableCell className="text-muted-foreground">{video.collectionIds.length}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
