import type { Source, SourceDraft } from "./source.types"

export async function listSources(): Promise<Source[]> {
  return []
}

export async function createSource(_draft: SourceDraft): Promise<Source | null> {
  void _draft
  return null
}
