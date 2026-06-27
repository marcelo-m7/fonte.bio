export type JsonResponseInit = ResponseInit & {
  status?: number
}

export function jsonResponse(body: unknown, init: JsonResponseInit = {}) {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: {
      "content-type": "application/json; charset=utf-8",
      ...init.headers,
    },
  })
}

export function methodNotAllowed(allowedMethods: string[]) {
  return jsonResponse(
    { error: "method_not_allowed", allowedMethods },
    { status: 405, headers: { allow: allowedMethods.join(", ") } }
  )
}
