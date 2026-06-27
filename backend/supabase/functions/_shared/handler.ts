import { jsonResponse, methodNotAllowed } from "./http.ts"

type Handler = (request: Request) => Response | Promise<Response>

export function createJsonHandler(allowedMethods: string[], handler: Handler) {
  return async (request: Request) => {
    if (!allowedMethods.includes(request.method)) {
      return methodNotAllowed(allowedMethods)
    }

    try {
      return await handler(request)
    } catch (error) {
      return jsonResponse(
        {
          error: "internal_error",
          message: error instanceof Error ? error.message : "Unexpected error",
        },
        { status: 500 }
      )
    }
  }
}
