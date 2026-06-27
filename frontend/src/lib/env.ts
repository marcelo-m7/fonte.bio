import { z } from "zod"

const optionalEnvValue = z.preprocess((value) => {
  if (typeof value === "string" && value.trim() === "") {
    return undefined
  }

  return value
}, z.string().optional())

const envSchema = z.object({
  VITE_SUPABASE_URL: optionalEnvValue.pipe(z.string().url().optional()),
  VITE_SUPABASE_ANON_KEY: optionalEnvValue,
})

const parsedEnv = envSchema.safeParse(import.meta.env)

if (!parsedEnv.success) {
  console.warn("Invalid frontend env configuration.", parsedEnv.error.flatten().fieldErrors)
}

const env = parsedEnv.success
  ? parsedEnv.data
  : {
      VITE_SUPABASE_URL: undefined,
      VITE_SUPABASE_ANON_KEY: undefined,
    }

export const appEnv = {
  supabaseUrl: env.VITE_SUPABASE_URL,
  supabaseAnonKey: env.VITE_SUPABASE_ANON_KEY,
  hasSupabaseConfig: Boolean(env.VITE_SUPABASE_URL && env.VITE_SUPABASE_ANON_KEY),
}
