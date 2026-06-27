export const sourceKeys = {
  all: ["sources"] as const,
  lists: () => [...sourceKeys.all, "list"] as const,
  detail: (id: string) => [...sourceKeys.all, "detail", id] as const,
}
