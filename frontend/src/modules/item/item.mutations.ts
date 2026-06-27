import { createItem } from "./item.api"

export function createItemMutationOptions() {
  return {
    mutationFn: createItem,
  }
}
