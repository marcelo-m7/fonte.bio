export function normalizeSourceName(name: string) {
  return name.trim().replace(/\s+/g, " ")
}

export function normalizeSourceUrl(url: string | null | undefined) {
  const normalizedUrl = url?.trim()
  return normalizedUrl ? normalizedUrl : null
}
