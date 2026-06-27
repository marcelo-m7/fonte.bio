export type RateLimitDecision = {
  allowed: boolean
  reason?: string
}

export function allowWithoutPersistentRateLimit(): RateLimitDecision {
  return { allowed: true }
}
