import { createSource } from "./source.api"

export function createSourceMutationOptions() {
  return {
    mutationFn: createSource,
  }
}
