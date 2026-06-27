export function deriveTimelineDate(input: {
  publishedAt?: string | null
  processedAt?: string | null
  createdAt: string
}) {
  return input.publishedAt ?? input.processedAt ?? input.createdAt
}
