import { listCollections } from "./collection.api"

export function createCollectionsQueryOptions() {
  return {
    queryKey: ["collections"],
    queryFn: listCollections,
  }
}
