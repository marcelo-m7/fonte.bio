export const itemKeys = {
  all: ["items"] as const,
  lists: () => [...itemKeys.all, "list"] as const,
  detail: (id: string) => [...itemKeys.all, "detail", id] as const,
}
