import { useQuery } from "@tanstack/react-query"

import { listItems } from "./item.api"
import { itemKeys } from "./item.keys"

export function createItemsQueryOptions() {
  return {
    queryKey: itemKeys.lists(),
    queryFn: listItems,
  }
}

export function useItems() {
  return useQuery(createItemsQueryOptions())
}
