"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { verifySession } from "@/lib/auth/dal";
import { connectDB } from "@/lib/db/connect";
import { RoleModel } from "@/lib/db/models/Role";
import { roleIconKeys } from "@/lib/role-icons";
import { slugify } from "@/lib/slugify";

const RoleSchema = z
  .object({
    id: z.string().optional(),
    slug: z.string().trim().min(1, "Slug is required"),
    title: z.string().trim().min(1, "Title is required"),
    identifier: z.string().trim().min(1),
    icon: z.enum(roleIconKeys as [string, ...string[]]),
    employmentType: z.enum(["FULL_TIME", "PART_TIME", "INTERN"]),
    employmentLabel: z.string().trim().min(1),
    schedule: z.string().trim().min(1),
    tagline: z.string().trim().min(1),
    description: z.string().trim().min(1),
    datePosted: z.string().trim().min(1),
    validThrough: z.string().trim().min(1),
    salaryMin: z.coerce.number().min(0),
    salaryMax: z.coerce.number().min(0),
    status: z.enum(["draft", "published", "closed"]),
    responsibilities: z.array(z.string().trim().min(1)).min(1, "Add at least one responsibility"),
    requirements: z.array(z.string().trim().min(1)).min(1, "Add at least one requirement"),
    bonusSkills: z.array(z.string().trim().min(1)).optional(),
    equipmentTitle: z.string().trim().optional(),
    equipmentBody: z.string().trim().optional(),
  })
  .refine((data) => data.salaryMax >= data.salaryMin, {
    message: "Maximum salary must be greater than or equal to minimum salary",
    path: ["salaryMax"],
  });

export type RoleFormState = { error?: string; fieldErrors?: Record<string, string> } | undefined;

function nonEmptyList(formData: FormData, key: string): string[] {
  return formData
    .getAll(key)
    .map((v) => String(v).trim())
    .filter(Boolean);
}

export async function saveRole(_prevState: RoleFormState, formData: FormData): Promise<RoleFormState> {
  await verifySession();

  const rawSlug = String(formData.get("slug") ?? "").trim();
  const rawTitle = String(formData.get("title") ?? "").trim();

  const parsed = RoleSchema.safeParse({
    id: formData.get("id") || undefined,
    slug: rawSlug || slugify(rawTitle),
    title: rawTitle,
    identifier: formData.get("identifier"),
    icon: formData.get("icon"),
    employmentType: formData.get("employmentType"),
    employmentLabel: formData.get("employmentLabel"),
    schedule: formData.get("schedule"),
    tagline: formData.get("tagline"),
    description: formData.get("description"),
    datePosted: formData.get("datePosted"),
    validThrough: formData.get("validThrough"),
    salaryMin: formData.get("salaryMin"),
    salaryMax: formData.get("salaryMax"),
    status: formData.get("status"),
    responsibilities: nonEmptyList(formData, "responsibilities"),
    requirements: nonEmptyList(formData, "requirements"),
    bonusSkills: nonEmptyList(formData, "bonusSkills"),
    equipmentTitle: formData.get("equipmentTitle") || undefined,
    equipmentBody: formData.get("equipmentBody") || undefined,
  });

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { error: "Please fix the errors below.", fieldErrors };
  }

  const data = parsed.data;
  await connectDB();

  const doc = {
    slug: data.slug,
    title: data.title,
    identifier: data.identifier,
    icon: data.icon,
    employmentType: data.employmentType,
    employmentLabel: data.employmentLabel,
    schedule: data.schedule,
    tagline: data.tagline,
    description: data.description,
    datePosted: new Date(data.datePosted),
    validThrough: new Date(data.validThrough),
    salary: { currency: "INR", min: data.salaryMin, max: data.salaryMax, unit: "MONTH" },
    status: data.status,
    responsibilities: data.responsibilities,
    requirements: data.requirements,
    bonusSkills: data.bonusSkills && data.bonusSkills.length > 0 ? data.bonusSkills : undefined,
    equipment:
      data.equipmentTitle && data.equipmentBody
        ? { title: data.equipmentTitle, body: data.equipmentBody }
        : undefined,
  };

  try {
    if (data.id) {
      await RoleModel.updateOne({ _id: data.id }, { $set: doc, $unset: sparseUnsets(doc) });
    } else {
      await RoleModel.create(doc);
    }
  } catch (err) {
    if (isDuplicateKeyError(err)) {
      return { error: "That slug is already in use.", fieldErrors: { slug: "Already in use" } };
    }
    return { error: "Something went wrong saving this role. Please try again." };
  }

  revalidatePath("/admin/jobs");
  revalidatePath("/");
  revalidatePath(`/careers/${data.slug}`);
  redirect("/admin/jobs");
}

// Mongoose's $set won't clear fields that are now absent (e.g. bonusSkills
// removed entirely) unless we explicitly $unset them.
function sparseUnsets(doc: Record<string, unknown>) {
  const unset: Record<string, ""> = {};
  if (doc.bonusSkills === undefined) unset.bonusSkills = "";
  if (doc.equipment === undefined) unset.equipment = "";
  return unset;
}

function isDuplicateKeyError(err: unknown): boolean {
  return typeof err === "object" && err !== null && "code" in err && (err as { code?: number }).code === 11000;
}

export async function setRoleStatus(id: string, status: "draft" | "published" | "closed") {
  await verifySession();
  await connectDB();
  const role = await RoleModel.findByIdAndUpdate(id, { $set: { status } }, { new: true }).lean();

  revalidatePath("/admin/jobs");
  revalidatePath("/");
  if (role && "slug" in role) {
    revalidatePath(`/careers/${role.slug}`);
  }
}
