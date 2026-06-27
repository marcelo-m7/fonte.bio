import { createJsonHandler } from "../_shared/handler.ts"
import { jsonResponse } from "../_shared/http.ts"

Deno.serve(
  createJsonHandler(["POST"], async () => {
    return jsonResponse({ status: "not_implemented", function: "publish-item" }, { status: 202 })
  })
)
