import { useMutation, useQueryClient } from "@tanstack/react-query"

import { createItem } from "./item.api"
import { itemKeys } from "./item.keys"

export function createItemMutationOptions() {
  return {
    mutationFn: createItem,
  }
}

export function useCreateItem() {
  const queryClient = useQueryClient()

  return useMutation({
    ...createItemMutationOptions(),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: itemKeys.all })
      void queryClient.invalidateQueries({ queryKey: ["dashboard"] })
    },
  })
}
