import { useQuery } from "@tanstack/react-query"

import { getCurrentProfile } from "./profile.api"
import { profileKeys } from "./profile.keys"

import { useAuth } from "@/modules/auth"

export function createCurrentProfileQueryOptions() {
  return {
    queryKey: profileKeys.current(),
    queryFn: getCurrentProfile,
  }
}

export function useCurrentProfile() {
  const { isConfigured, user } = useAuth()

  return useQuery({
    ...createCurrentProfileQueryOptions(),
    enabled: isConfigured && Boolean(user),
  })
}
