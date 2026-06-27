import { useMutation, useQueryClient } from "@tanstack/react-query"

import { createSource } from "./source.api"
import { sourceKeys } from "./source.keys"

export function createSourceMutationOptions() {
  return {
    mutationFn: createSource,
  }
}

export function useCreateSource() {
  const queryClient = useQueryClient()

  return useMutation({
    ...createSourceMutationOptions(),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: sourceKeys.all })
      void queryClient.invalidateQueries({ queryKey: ["dashboard"] })
    },
  })
}
