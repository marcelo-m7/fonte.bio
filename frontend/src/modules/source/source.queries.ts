import { useQuery } from "@tanstack/react-query"

import { listSources } from "./source.api"
import { sourceKeys } from "./source.keys"

export function createSourcesQueryOptions() {
  return {
    queryKey: sourceKeys.lists(),
    queryFn: listSources,
  }
}

export function useSources() {
  return useQuery(createSourcesQueryOptions())
}
