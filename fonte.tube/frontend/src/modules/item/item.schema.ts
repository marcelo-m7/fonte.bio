import { z } from "zod"

export const itemTypeSchema = z.enum(["video", "audio", "document", "image", "link", "unknown"])
export const visibilitySchema = z.enum(["private", "workspace", "public"])

export const itemDraftSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  type: itemTypeSchema.default("unknown"),
  visibility: visibilitySchema.default("private"),
  sourceId: z.string().uuid().nullable().default(null),
  collectionIds: z.array(z.string().uuid()).default([]),
})

export const itemSchema = itemDraftSchema.extend({
  id: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
})
