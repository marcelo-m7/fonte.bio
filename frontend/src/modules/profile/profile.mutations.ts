import { useMutation, useQueryClient } from "@tanstack/react-query"

import { updateCurrentProfile } from "./profile.api"
import { profileKeys } from "./profile.keys"

export function useUpdateProfile() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateCurrentProfile,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: profileKeys.all })
    },
  })
}
