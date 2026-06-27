export type ApiResult<TData> =
  | { ok: true; data: TData }
  | { ok: false; error: string }

export * from "./query-client"
