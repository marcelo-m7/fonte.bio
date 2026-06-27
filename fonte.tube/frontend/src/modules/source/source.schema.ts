import { z } from "zod"

export const sourceKindSchema = z.enum(["youtube", "rss", "website", "file", "manual"])
export const ingestionJobStatusSchema = z.enum(["queued", "running", "succeeded", "failed", "cancelled"])

export const sourceDraftSchema = z.object({
  name: z.string().trim().min(1, "Source name is required"),
  kind: sourceKindSchema.default("manual"),
  url: z.string().url().nullable().default(null),
})

export const sourceSchema = sourceDraftSchema.extend({
  id: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
})
