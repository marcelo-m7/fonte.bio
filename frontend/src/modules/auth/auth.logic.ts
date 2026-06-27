export function normalizeAuthEmail(email: string) {
  return email.trim().toLowerCase()
}

export function normalizeDisplayName(displayName: string | null | undefined) {
  const normalizedDisplayName = displayName?.trim().replace(/\s+/g, " ")
  return normalizedDisplayName ? normalizedDisplayName : null
}
