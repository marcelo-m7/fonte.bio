import { EmptyState } from "@/components/empty-state"
import { PageHeader } from "@/components/page-header"

export function VideosPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Videos"
        description="Acompanhe ingestao, transcricoes e classificacao dos videos." 
      />
      <EmptyState
        title="Nenhum video importado"
        description="Use o fluxo de importacao para trazer videos para o acervo inteligente."
        ctaLabel="Importar video"
      />
    </div>
  )
}
