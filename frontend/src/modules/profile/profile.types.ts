export type Profile = {
  id: string
  displayName: string | null
  avatarUrl: string | null
  createdAt: string
  updatedAt: string
}

export type ProfileUpdateDraft = {
  displayName: string | null
  avatarUrl: string | null
}
