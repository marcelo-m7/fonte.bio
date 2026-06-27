import { useQuery } from "@tanstack/react-query"

import { listIngestionJobs, listSources } from "./source.api"
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

export function createIngestionJobsQueryOptions() {
  return {
    queryKey: sourceKeys.ingestionJobs(),
    queryFn: listIngestionJobs,
  }
}

export function useIngestionJobs() {
  return useQuery(createIngestionJobsQueryOptions())
}
