import { listItems } from "./item.api"

export function createItemsQueryOptions() {
  return {
    queryKey: ["items"],
    queryFn: listItems,
  }
}
