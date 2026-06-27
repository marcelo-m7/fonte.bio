import { createCollection } from "./collection.api"

export function createCollectionMutationOptions() {
  return {
    mutationFn: createCollection,
  }
}
