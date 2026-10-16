import { z } from "zod";

const ToolUsage = z.object({ name: z.string().min(1), proficiency: z.string().min(1) });

// Accepts a JSON-encoded array (sent as a plain string field in FormData)
// and safely defaults to an empty array on anything malformed, rather than
// failing the whole submission over a client-side serialization bug.
function jsonArray<T extends z.ZodTypeAny>(itemSchema: T) {
  return z.string().transform((value, ctx) => {
    if (!value) return [] as z.infer<T>[];
    try {
      const parsed = JSON.parse(value);
      const result = z.array(itemSchema).safeParse(parsed);
      return result.success ? result.data : [];
    } catch {
      ctx.addIssue({ code: "custom", message: "Invalid JSON" });
      return [] as z.infer<T>[];
    }
  });
}

// Validates the non-file fields of an application submission before any
// external call (Drive upload, Mongo write) happens. Field names match the
// <input name="..."> attributes in components/ApplyForm.tsx.
export const ApplySchema = z.object({
  roleSlug: z.string().trim().min(1),
  name: z.string().trim().min(1),
  phone: z.string().trim().min(1),
  email: z.string().trim().email(),
  city: z.string().trim().optional(),

  // Required only when the role discloses salary — validated against the
  // fetched role in app/api/apply/route.ts, since zod alone can't see it.
  cur_sal: z.string().trim().optional(),
  exp_sal: z.string().trim().optional(),
  notice: z.string().trim().optional(),

  resume_link: z.string().trim().optional(),
  portfolio: z.string().trim().optional(),
  social: z.string().trim().optional(),
  samples: z.string().trim().optional(),

  experience: z.string().trim().min(1),
  employment_type: z.string().trim().optional(),
  content_types: jsonArray(z.string()),

  video_tools: jsonArray(ToolUsage),
  video_other: z.string().trim().optional(),
  photo_tools: jsonArray(ToolUsage),
  photo_other: z.string().trim().optional(),
  ai_tools: jsonArray(ToolUsage),
  ai_other: z.string().trim().optional(),
  seo_tools: jsonArray(ToolUsage),
  seo_other: z.string().trim().optional(),

  proud: z.string().trim().optional(),
  source: z.string().trim().optional(),
});

export type ApplyInput = z.infer<typeof ApplySchema>;
