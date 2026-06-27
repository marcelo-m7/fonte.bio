import { z } from "zod"

import { visibilitySchema } from "@/modules/item"

export const collectionDraftSchema = z.object({
  name: z.string().trim().min(1, "Collection name is required"),
  slug: z.string().trim().min(1, "Collection slug is required"),
  description: z.string().trim().nullable().default(null),
  visibility: visibilitySchema.default("private"),
})

export const collectionSchema = collectionDraftSchema.extend({
  id: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
})
