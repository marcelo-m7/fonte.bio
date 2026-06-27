import { listSources } from "./source.api"

export function createSourcesQueryOptions() {
  return {
    queryKey: ["sources"],
    queryFn: listSources,
  }
}
