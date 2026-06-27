import { EmptyState } from "@/components/empty-state"
import { PageHeader } from "@/components/page-header"

export function CollectionsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Colecoes"
        description="Agrupe conhecimento em colecoes reutilizaveis para estudo e operacao."
      />
      <EmptyState
        title="Sem colecoes por enquanto"
        description="Crie sua primeira colecao para organizar o acervo por tema, projeto ou trilha."
        ctaLabel="Criar colecao"
      />
    </div>
  )
}
