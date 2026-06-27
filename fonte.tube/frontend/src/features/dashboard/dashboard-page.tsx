import { ArrowRightIcon, ImportIcon, PlusIcon, SparklesIcon, VideoIcon } from "lucide-react"

import { EmptyState } from "@/components/empty-state"
import { PageHeader } from "@/components/page-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { useDashboardOverview } from "@/hooks/use-dashboard-overview"

export function DashboardPage() {
  const { data, error, isLoading } = useDashboardOverview()

  return (
    <div className="space-y-6">
      <PageHeader
        title="Fonte Tube"
        description="Acervo inteligente para videos, fontes, colecoes e conhecimento estruturado."
        actions={
          <>
            <Button>
              Explorar acervo
              <ArrowRightIcon data-icon="inline-end" />
            </Button>
            <Button variant="secondary">
              <ImportIcon data-icon="inline-start" />
              Importar video
            </Button>
            <Button variant="outline">
              <PlusIcon data-icon="inline-start" />
              Criar colecao
            </Button>
          </>
        }
      />

      <Card>
        <CardHeader>
          <Badge variant="secondary" className="w-fit">
            {data?.backendMode === "supabase" ? "Supabase" : "Mock data"}
          </Badge>
          <CardTitle className="text-3xl">Seu hub de conteudo tecnico</CardTitle>
          <CardDescription>
            Organize fontes, videos e colecoes em fluxos prontos para evoluir com Supabase.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {isLoading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-8 w-20" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-5 w-14" />
                    </CardContent>
                  </Card>
                ))
              : data?.metrics.map((metric) => (
                  <Card key={metric.label}>
                    <CardHeader className="pb-2">
                      <CardDescription>{metric.label}</CardDescription>
                      <CardTitle className="text-2xl">{metric.value}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Badge>{metric.trend}</Badge>
                    </CardContent>
                  </Card>
                ))}
          </div>
          <Separator className="my-6" />
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Saude do acervo</span>
              <span className="font-medium">{data?.healthScore ?? 0}%</span>
            </div>
            <Progress value={data?.healthScore ?? 0} />
            {error ? <p className="text-sm text-destructive">{error}</p> : null}
          </div>
        </CardContent>
        <CardFooter className="text-sm text-muted-foreground">
          <SparklesIcon data-icon="inline-start" />
          Preparado para fase de integracao de dados e automacoes.
        </CardFooter>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <EmptyState
          title="Sem importacoes recentes"
          description="Conecte seu pipeline para iniciar ingestao automatica de videos e metadados."
          ctaLabel="Importar video"
        />
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <VideoIcon className="size-5" />
              Proximas evolucoes
            </CardTitle>
            <CardDescription>Roadmap inicial para o frontend Fonte Tube.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>- Integracao com Supabase para leitura/escrita de acervo.</p>
            <p>- Busca semantica e filtros combinados para videos/fontes.</p>
            <p>- Colecoes colaborativas com trilhas de conhecimento.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
