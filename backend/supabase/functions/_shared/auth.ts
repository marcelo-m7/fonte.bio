export type AuthContext = {
  authorization: string | null
  hasBearerToken: boolean
}

export function getAuthContext(request: Request): AuthContext {
  const authorization = request.headers.get("authorization")

  return {
    authorization,
    hasBearerToken: Boolean(authorization?.toLowerCase().startsWith("bearer ")),
  }
}
