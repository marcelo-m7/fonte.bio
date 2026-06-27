import { useMutation, useQueryClient } from "@tanstack/react-query"

import { signInWithPassword, signOut, signUpWithPassword } from "./auth.api"

export function useSignInWithPassword() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: signInWithPassword,
    onSuccess: () => {
      void queryClient.invalidateQueries()
    },
  })
}

export function useSignUpWithPassword() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: signUpWithPassword,
    onSuccess: () => {
      void queryClient.invalidateQueries()
    },
  })
}

export function useSignOut() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      queryClient.clear()
    },
  })
}
