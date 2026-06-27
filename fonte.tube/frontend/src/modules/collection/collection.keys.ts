export const collectionKeys = {
  all: ["collections"] as const,
  lists: () => [...collectionKeys.all, "list"] as const,
  detail: (id: string) => [...collectionKeys.all, "detail", id] as const,
}
