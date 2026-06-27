export function getRequiredEnv(name: string) {
  const value = Deno.env.get(name)

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }

  return value
}

export function getOptionalEnv(name: string) {
  return Deno.env.get(name) ?? null
}
