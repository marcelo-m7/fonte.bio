export function normalizeCollectionName(name: string) {
  return name.trim().replace(/\s+/g, " ")
}

export function buildCollectionSlug(name: string) {
  return normalizeCollectionName(name)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}
