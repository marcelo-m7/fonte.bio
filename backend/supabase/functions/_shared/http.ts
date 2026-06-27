export type JsonResponseInit = ResponseInit & {
  status?: number
}

export const corsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-headers": "authorization, x-client-info, apikey, content-type",
  "access-control-allow-methods": "GET, POST, OPTIONS",
}

export function corsResponse() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  })
}

export function jsonResponse(body: unknown, init: JsonResponseInit = {}) {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: {
      ...corsHeaders,
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
