import { EmptyState } from "@/components/empty-state"
import { PageHeader } from "@/components/page-header"

export function LibraryPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Biblioteca"
        description="Central de conteudo indexado para consulta rapida e curadoria."
      />
      <EmptyState
        title="Biblioteca aguardando conexao"
        description="Assim que a integracao de dados entrar, os itens da biblioteca aparecerao aqui."
        ctaLabel="Explorar acervo"
      />
    </div>
  )
}
