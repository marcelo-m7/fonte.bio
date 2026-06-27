import { useMutation, useQueryClient } from "@tanstack/react-query"

import { createCollection } from "./collection.api"
import { collectionKeys } from "./collection.keys"

export function createCollectionMutationOptions() {
  return {
    mutationFn: createCollection,
  }
}

export function useCreateCollection() {
  const queryClient = useQueryClient()

  return useMutation({
    ...createCollectionMutationOptions(),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: collectionKeys.all })
      void queryClient.invalidateQueries({ queryKey: ["dashboard"] })
    },
  })
}
