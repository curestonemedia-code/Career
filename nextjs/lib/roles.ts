import "server-only";
import { connectDB } from "@/lib/db/connect";
import { RoleModel } from "@/lib/db/models/Role";
import { DEFAULT_ROLE_ICON_KEY, type RoleIconKey } from "@/lib/role-icons";
import type { SkillSection } from "@/lib/apply-form-data";

// Re-exported for convenience on the server; Client Components must import
// this directly from "@/lib/format-salary" instead (see that file for why).
export { formatSalary } from "@/lib/format-salary";

// The single source of truth for every job posting. Backed by MongoDB so
// roles can be created/edited/closed from the admin panel without a
// redeploy. Homepage listing, per-role detail pages, the apply form's role
// selector, and every JobPosting schema all read through this module.

export type RoleStatus = "draft" | "published" | "closed";

export type Role = {
  id: string;
  slug: string;
  title: string;
  identifier: string;
  icon: RoleIconKey;
  employmentType: "FULL_TIME" | "PART_TIME" | "INTERN";
  employmentLabel: string;
  schedule: string;
  tagline: string;
  description: string;
  datePosted: string;
  validThrough: string;
  salary: { currency: "INR"; min: number; max: number; unit: "MONTH" };
  salaryDisclosed: boolean;
  responsibilities: string[];
  requirements: string[];
  bonusSkills?: string[];
  equipment?: { title: string; body: string };
  status: RoleStatus;
  skillSections: SkillSection[];
};

// Mongoose's lean() strips the Document wrapper but leaves BSON types
// (ObjectId, Date) in place — those aren't safely serializable across the
// Server -> Client Component boundary, so every read goes through here.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toPlainRole(doc: any): Role {
  return {
    id: String(doc._id),
    slug: doc.slug,
    title: doc.title,
    identifier: doc.identifier,
    icon: (doc.icon as RoleIconKey) ?? DEFAULT_ROLE_ICON_KEY,
    employmentType: doc.employmentType,
    employmentLabel: doc.employmentLabel,
    schedule: doc.schedule,
    tagline: doc.tagline,
    description: doc.description,
    datePosted: new Date(doc.datePosted).toISOString().slice(0, 10),
    validThrough: new Date(doc.validThrough).toISOString().slice(0, 10),
    salary: {
      currency: doc.salary.currency,
      min: doc.salary.min,
      max: doc.salary.max,
      unit: doc.salary.unit,
    },
    salaryDisclosed: doc.salaryDisclosed ?? true,
    responsibilities: doc.responsibilities ?? [],
    requirements: doc.requirements ?? [],
    bonusSkills: doc.bonusSkills ?? undefined,
    equipment: doc.equipment ?? undefined,
    status: doc.status,
    skillSections: doc.skillSections ?? [],
  };
}

/** Publicly visible roles only — homepage, sitemap, footer, apply-form picker. */
export async function getPublishedRoles(): Promise<Role[]> {
  await connectDB();
  const docs = await RoleModel.find({ status: "published" }).sort({ createdAt: -1 }).lean();
  return docs.map(toPlainRole);
}

/**
 * A single role by slug, regardless of status. Unfiltered so a "closed"
 * role can still render its own page (with applications disabled) instead
 * of 404ing a link that's already out in the world.
 */
export async function getRoleBySlug(slug: string): Promise<Role | undefined> {
  await connectDB();
  const doc = await RoleModel.findOne({ slug }).lean();
  return doc ? toPlainRole(doc) : undefined;
}

/** Every role regardless of status, for the admin jobs list. */
export async function getAllRolesAdmin(): Promise<Role[]> {
  await connectDB();
  const docs = await RoleModel.find({}).sort({ createdAt: -1 }).lean();
  return docs.map(toPlainRole);
}
