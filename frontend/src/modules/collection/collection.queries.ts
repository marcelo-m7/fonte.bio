import { useQuery } from "@tanstack/react-query"

import { listCollections } from "./collection.api"
import { collectionKeys } from "./collection.keys"

export function createCollectionsQueryOptions() {
  return {
    queryKey: collectionKeys.lists(),
    queryFn: listCollections,
  }
}

export function useCollections() {
  return useQuery(createCollectionsQueryOptions())
}
