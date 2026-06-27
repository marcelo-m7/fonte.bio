import { listTimelineEvents } from "./timeline.api"

export function createTimelineQueryOptions(itemId: string) {
  return {
    queryKey: ["timeline", "item", itemId],
    queryFn: () => listTimelineEvents(itemId),
  }
}
