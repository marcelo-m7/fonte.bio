export type TimelineEventType = "created" | "updated" | "ingested" | "processed" | "published"

export type TimelineEvent = {
  id: string
  itemId: string
  type: TimelineEventType
  occurredAt: string
  label: string
}
