import { EmptyState } from "@/components/empty-state"
import { PageHeader } from "@/components/page-header"

export function SourcesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Fontes"
        description="Gerencie canais, RSS, playlists e outras fontes de ingestao de conteudo."
      />
      <EmptyState
        title="Nenhuma fonte configurada"
        description="Adicione fontes para iniciar a coleta e classificacao automatica de conhecimento."
        ctaLabel="Adicionar fonte"
      />
    </div>
  )
}
