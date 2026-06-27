import { EmptyState } from "@/components/empty-state"
import { PageHeader } from "@/components/page-header"

export function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Definicoes"
        description="Preferencias de interface, importacao e comportamento do acervo."
      />
      <EmptyState
        title="Configuracoes em evolucao"
        description="As preferencias avancadas serao habilitadas conforme as proximas entregas."
        ctaLabel="Personalizar"
      />
    </div>
  )
}
