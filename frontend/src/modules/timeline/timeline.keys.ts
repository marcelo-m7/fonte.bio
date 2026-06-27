export const timelineKeys = {
  all: ["timeline"] as const,
  item: (itemId: string) => [...timelineKeys.all, "item", itemId] as const,
}
